"use client";

import type { EventBookingSummary } from "@/lib/supabase/types";
import { BookedEventCard } from "./BookedEventCard";
import { Skeleton } from "@/components/ui/skeleton";
import { CalendarCheck } from "lucide-react";

export function BookedEventsList({
  eventBookings,
  loading,
  onSendMessage,
  emptyMessage,
}: {
  eventBookings: EventBookingSummary[];
  loading: boolean;
  onSendMessage: (bookingId: string, message: string) => void;
  emptyMessage?: string;
}) {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-xl border border-border bg-card/80 p-4 space-y-2">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        ))}
      </div>
    );
  }

  if (eventBookings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <CalendarCheck className="h-10 w-10 text-muted-foreground/50 mb-3" />
        <p className="text-sm text-muted-foreground">
          {emptyMessage ?? "No bookings yet. Add bookings to your events from the Events page."}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {eventBookings.map((summary) => (
        <BookedEventCard
          key={summary.eventId}
          summary={summary}
          onSendMessage={onSendMessage}
        />
      ))}
    </div>
  );
}
