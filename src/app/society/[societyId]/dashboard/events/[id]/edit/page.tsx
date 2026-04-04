"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useDashboardNav } from "@/hooks/useDashboardNav";
import { useSocietyAuth } from "@/hooks/useSocietyAuth";
import { useEvents } from "@/hooks/useEvents";
import { EventForm, type EventFormData } from "@/components/events/EventForm";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function EditEventPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const nav = useDashboardNav();
  const { society } = useSocietyAuth();
  const { events, updateEvent } = useEvents(society?.id);

  const event = events.find((e) => e.id === params.id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-16">
        <p className="text-muted-foreground">Event not found.</p>
        <Button variant="outline" render={<Link href={nav.href("/events")} />}>
          Back to events
        </Button>
      </div>
    );
  }

  const isScraped = event.source === "scraped";

  const initialData = {
    title: event.title,
    description: event.description,
    categoryIds: [] as string[],
    schedules: event.schedules
      .filter((s) => !s.isEnd)
      .map((s) => ({
        date: s.scheduledAt.split("T")[0],
        startTime: new Date(s.scheduledAt).toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        endTime: "",
        locationName: s.locationName ?? "",
        locationId: s.locationId ?? undefined,
      })),
    isOnline: event.isOnline,
    isFree: event.isFree ?? true,
    price: event.price ?? "",
    registrationUrl: event.registrationUrl ?? "",
  };

  if (initialData.schedules.length === 0) {
    initialData.schedules = [
      { date: "", startTime: "", endTime: "", locationName: "", locationId: undefined },
    ];
  }

  const handleSubmit = async (formData: EventFormData & { images: File[] }) => {
    if (!params.id) return;

    try {
      const { images: _removed, ...eventData } = formData;
      await updateEvent(params.id, eventData);
      toast.success("Event updated successfully.");
      router.push(nav.href(`/events/${params.id}`));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to update event"
      );
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Edit Event</h1>
        <p className="text-muted-foreground">
          {isScraped
            ? "This event was scraped from Instagram. Your edits will override the scraped data."
            : "Update your event details below."}
        </p>
      </div>

      <EventForm
        initialData={initialData}
        isScraped={isScraped}
        onSubmit={handleSubmit}
        submitLabel="Save Changes"
      />
    </div>
  );
}
