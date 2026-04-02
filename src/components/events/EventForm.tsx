"use client";

import { useState, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScheduleBuilder, type ScheduleEntry } from "@/components/events/ScheduleBuilder";
import { ImageUploader } from "@/components/events/ImageUploader";
import { CategorySelector } from "@/components/events/CategorySelector";
import { TicketConfigPanel } from "@/components/ticketing/TicketConfigPanel";
import type { TicketTypeFormData } from "@/components/ticketing/TicketTypeCard";
import { AlertTriangle, Loader2 } from "lucide-react";
import { APIProvider } from "@vis.gl/react-google-maps";
import type { Category } from "@/supabase_lib/types";
import type { TicketType, TicketPurchase } from "@/lib/supabase/types";

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? "";

const eventFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  categoryIds: z.array(z.string()).min(1, "Select at least 1 category").max(3, "Select up to 3 categories"),
  schedules: z
    .array(
      z.object({
        date: z.string().min(1, "Date is required"),
        startTime: z.string().min(1, "Start time is required"),
        endTime: z.string(),
        buildingName: z.string(),
        buildingId: z.string().optional(),
        buildingGoogleMapsUrl: z.string().nullish(),
        roomName: z.string(),
        roomId: z.string().optional(),
        description: z.string(),
      })
    )
    .min(1, "Add at least one schedule entry"),
  isOnline: z.boolean(),
  registrationUrl: z.string().url("Enter a valid URL").optional().or(z.literal("")),
});

export type EventFormData = z.infer<typeof eventFormSchema> & {
  isTicketed?: boolean;
  ticketTypes?: TicketType[];
};

interface EventFormProps {
  eventId?: string;
  initialData?: {
    title: string;
    description: string;
    categoryIds: string[];
    schedules: ScheduleEntry[];
    isOnline: boolean;
    registrationUrl?: string;
    images?: File[];
    isTicketed?: boolean;
    ticketTypes?: TicketType[];
    purchases?: TicketPurchase[];
  };
  isScraped?: boolean;
  onSubmit: (data: EventFormData & { images: File[] }) => Promise<void>;
  submitLabel?: string;
  categories: Category[];
  categoriesLoading?: boolean;
}

const defaultSchedule: ScheduleEntry = {
  date: "",
  startTime: "",
  endTime: "",
  buildingName: "",
  roomName: "",
  description: "",
};

export function EventForm({
  eventId,
  initialData,
  isScraped,
  onSubmit,
  submitLabel = "Create Event",
  categories,
  categoriesLoading,
}: EventFormProps) {
  const [images, setImages] = useState<File[]>(initialData?.images ?? []);
  const [submitting, setSubmitting] = useState(false);

  // Ticketing state (managed outside react-hook-form for simplicity)
  const [isTicketed, setIsTicketed] = useState(initialData?.isTicketed ?? false);
  const [ticketTypes, setTicketTypes] = useState<TicketTypeFormData[]>(
    initialData?.ticketTypes?.map((t) => ({
      id: t.id,
      name: t.name,
      price: t.price,
      isMemberTicket: t.isMemberTicket,
      totalAvailable: t.totalAvailable,
    })) ?? [{ name: "", price: 0, isMemberTicket: false, totalAvailable: 0 }],
  );
  const [ticketErrors, setTicketErrors] = useState<
    Record<number, { name?: string; price?: string; totalAvailable?: string }>
  >({});
  const [ticketGlobalError, setTicketGlobalError] = useState<string>();
  const [toggleWarning, setToggleWarning] = useState<string>();

  const purchases = initialData?.purchases ?? [];

  const totalSold = purchases.length;

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: initialData?.title ?? "",
      description: initialData?.description ?? "",
      categoryIds: initialData?.categoryIds ?? [],
      schedules: initialData?.schedules ?? [{ ...defaultSchedule }],
      isOnline: initialData?.isOnline ?? false,
      registrationUrl: initialData?.registrationUrl ?? "",
    },
  });

  const handleToggleTicketed = useCallback(
    (checked: boolean) => {
      if (!checked && totalSold > 0) {
        setToggleWarning(
          `Cannot disable ticketing — ${totalSold} ticket${totalSold !== 1 ? "s have" : " has"} been sold. Refund all ticket holders first.`,
        );
        setTimeout(() => setToggleWarning(undefined), 5000);
        return;
      }
      setToggleWarning(undefined);
      setIsTicketed(checked);
      if (checked && ticketTypes.length === 0) {
        setTicketTypes([{ name: "", price: 0, isMemberTicket: false, totalAvailable: 0 }]);
      }
    },
    [totalSold, ticketTypes.length],
  );

  function validateTickets(): boolean {
    if (!isTicketed) return true;

    const errs: typeof ticketErrors = {};
    let valid = true;

    if (ticketTypes.length === 0) {
      setTicketGlobalError("At least one ticket type is required");
      return false;
    }

    ticketTypes.forEach((tt, i) => {
      const fieldErrs: { name?: string; price?: string; totalAvailable?: string } = {};
      if (!tt.name.trim()) {
        fieldErrs.name = "Ticket name is required";
        valid = false;
      }
      if (tt.price < 0) {
        fieldErrs.price = "Price cannot be negative";
        valid = false;
      }
      if (tt.totalAvailable < 1) {
        fieldErrs.totalAvailable = "Must offer at least 1 ticket";
        valid = false;
      }
      // Check totalAvailable >= sold count
      if (tt.id) {
        const soldForType = purchases.filter((p) => p.ticketTypeId === tt.id).length;
        if (tt.totalAvailable < soldForType) {
          fieldErrs.totalAvailable = `${soldForType} tickets have been sold. Total available cannot be less than ${soldForType}.`;
          valid = false;
        }
      }
      if (Object.keys(fieldErrs).length > 0) errs[i] = fieldErrs;
    });

    setTicketErrors(errs);
    setTicketGlobalError(valid ? undefined : undefined);
    return valid;
  }

  async function handleFormSubmit(data: z.infer<typeof eventFormSchema>) {
    if (!validateTickets()) return;

    setSubmitting(true);
    try {
      const payload: EventFormData & { images: File[] } = {
        ...data,
        images,
        isTicketed,
        ticketTypes: isTicketed
          ? ticketTypes.map((t) => ({
              id: t.id ?? "",
              eventId: "",
              name: t.name,
              price: t.price,
              isMemberTicket: t.isMemberTicket,
              totalAvailable: t.totalAvailable,
            }))
          : undefined,
      };
      await onSubmit(payload);
    } finally {
      setSubmitting(false);
    }
  }

  const hasTicketValidationErrors =
    isTicketed &&
    (Object.keys(ticketErrors).length > 0 ||
      ticketTypes.some(
        (t) => !t.name.trim() || t.price < 0 || t.totalAvailable < 1,
      ));

  return (
    <APIProvider apiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      {isScraped && (
        <div className="flex items-start gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-sm text-yellow-800 dark:border-yellow-500/30 dark:bg-yellow-500/10 dark:text-yellow-200">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            This event was scraped from Instagram. Your edits will override the
            scraped data.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="title">Title</Label>
            <Input id="title" placeholder="Event title" {...register("title")} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe the event..."
              rows={8}
              {...register("description")}
            />
            {errors.description && (
              <p className="text-sm text-destructive">{errors.description.message}</p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Categories</Label>
            <Controller
              name="categoryIds"
              control={control}
              render={({ field }) => (
                <CategorySelector value={field.value} onChange={field.onChange} categories={categories} loading={categoriesLoading} />
              )}
            />
            {errors.categoryIds && (
              <p className="text-sm text-destructive">{errors.categoryIds.message}</p>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Controller
            name="schedules"
            control={control}
            render={({ field }) => (
              <ScheduleBuilder value={field.value} onChange={field.onChange} eventId={eventId} />
            )}
          />
          {errors.schedules && (
            <p className="mt-2 text-sm text-destructive">
              {errors.schedules.message ??
                errors.schedules.root?.message ??
                "Please fix schedule errors"}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Ticketing */}
      <Card>
        <CardHeader>
          <CardTitle>Ticketing</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="isTicketed">Ticket Event</Label>
              <p className="text-sm text-muted-foreground">
                Enable ticket sales for this event
              </p>
            </div>
            <Switch
              id="isTicketed"
              checked={isTicketed}
              onCheckedChange={handleToggleTicketed}
            />
          </div>

          {toggleWarning && (
            <p className="text-sm text-red-600">{toggleWarning}</p>
          )}

          <TicketConfigPanel
            open={isTicketed}
            ticketTypes={ticketTypes}
            onChange={(next) => {
              setTicketTypes(next);
              setTicketErrors({});
              setTicketGlobalError(undefined);
            }}
            purchases={purchases}
            errors={ticketErrors}
            globalError={ticketGlobalError}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="isOnline">Online event</Label>
            <Controller
              name="isOnline"
              control={control}
              render={({ field }) => (
                <Switch
                  id="isOnline"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              )}
            />
          </div>

          {!isTicketed && (
            <>
              <Separator />

              <div className="space-y-1.5">
                <Label htmlFor="registrationUrl">Registration URL</Label>
                <Input
                  id="registrationUrl"
                  type="url"
                  placeholder="https://..."
                  {...register("registrationUrl")}
                />
                {errors.registrationUrl && (
                  <p className="text-sm text-destructive">
                    {errors.registrationUrl.message}
                  </p>
                )}
              </div>
            </>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Images</CardTitle>
        </CardHeader>
        <CardContent>
          <ImageUploader images={images} onChange={setImages} />
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          disabled={submitting || !!hasTicketValidationErrors}
        >
          {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
          {submitLabel}
        </Button>
      </div>
    </form>
    </APIProvider>
  );
}
