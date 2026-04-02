"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  DashboardPageHeader,
  DashboardSection,
} from "@/components/dashboard/DashboardMotion";
import { BookedEventsList } from "@/components/bookings/BookedEventsList";
import { useBookingsContext } from "@/contexts/BookingsContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Building2, MapPin } from "lucide-react";
import type { BookingStatus } from "@/lib/supabase/types";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type TypeFilter = "all" | "university" | "non-university";

const typeOptions: { label: string; value: TypeFilter; icon?: React.ElementType }[] = [
  { label: "All", value: "all" },
  { label: "University", value: "university", icon: Building2 },
  { label: "Non-University", value: "non-university", icon: MapPin },
];

export default function BookingsPage() {
  const { eventBookings, loading, sendMessage, updateBookingStatus } = useBookingsContext();
  const searchParams = useSearchParams();
  const expandEventId = searchParams.get("event");
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  const filteredBookings = useMemo(() => {
    return eventBookings.filter((summary) => {
      // Type filter
      if (typeFilter !== "all") {
        const hasMatchingType = summary.bookings.some((b) => b.type === typeFilter);
        if (!hasMatchingType) return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const hasMatch = summary.bookings.some((b) => {
          if (b.type === "university") {
            return (
              b.buildingName.toLowerCase().includes(q) ||
              b.roomName.toLowerCase().includes(q)
            );
          }
          return b.venueName.toLowerCase().includes(q);
        });
        if (!hasMatch) return false;
      }
      return true;
    });
  }, [eventBookings, searchQuery, typeFilter]);

  const hasBookings = eventBookings.length > 0;
  const isFiltered = searchQuery.trim() !== "" || typeFilter !== "all";

  function handleSendMessage(bookingId: string, message: string) {
    sendMessage(bookingId, message);
    toast.success("Note added");
  }

  function handleStatusChange(bookingId: string, status: BookingStatus) {
    updateBookingStatus(bookingId, status);
    toast.success(`Status updated to ${status}`);
  }

  return (
    <div className="space-y-6">
      <DashboardPageHeader>
        <div>
          <h1 className="text-2xl font-bold tracking-tight" style={{ letterSpacing: '-0.02em' }}>Bookings</h1>
          <p className="text-sm text-muted-foreground">
            Track and manage venue bookings for your events
          </p>
        </div>
      </DashboardPageHeader>

      {/* Filters */}
      {hasBookings && (
        <DashboardSection delay={0.05}>
          <div className="rounded-xl border border-border bg-card p-3">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Input
                placeholder="Search buildings or venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="max-w-xs"
              />
              <div className="flex gap-1">
                {typeOptions.map((opt) => {
                  const Icon = opt.icon;
                  const isActive = typeFilter === opt.value;
                  return (
                    <Button
                      key={opt.value}
                      variant={isActive ? "default" : "outline"}
                      size="sm"
                      onClick={() => setTypeFilter(opt.value)}
                      className={cn(
                        "text-xs",
                        isActive && "bg-dashboard-cta text-white hover:bg-dashboard-cta/90"
                      )}
                    >
                      {Icon && <Icon className="mr-1.5 h-3 w-3" />}
                      {opt.label}
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>
        </DashboardSection>
      )}

      <DashboardSection delay={0.1}>
        <BookedEventsList
          eventBookings={filteredBookings}
          loading={loading}
          onSendMessage={handleSendMessage}
          onStatusChange={handleStatusChange}
          expandEventId={expandEventId}
          emptyMessage={
            isFiltered && hasBookings
              ? "No bookings match your filters."
              : undefined
          }
        />
      </DashboardSection>
    </div>
  );
}
