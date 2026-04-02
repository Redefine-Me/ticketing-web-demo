"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { EventBookingSummary, BookingStatus } from "@/lib/supabase/types";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { ScheduleBookingRow } from "./ScheduleBookingRow";

export function BookedEventCard({
  summary,
  onSendMessage,
  onStatusChange,
  defaultExpanded = false,
}: {
  summary: EventBookingSummary;
  onSendMessage: (bookingId: string, message: string) => void;
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
  defaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const dateStr = summary.eventDate
    ? format(new Date(summary.eventDate), "EEE d MMM yyyy, h:mm a")
    : "Date TBC";

  const { pending, accepted, rejected } = summary.statusCounts;

  return (
    <div
      className="rounded-xl border border-border bg-card/80 backdrop-blur-sm transition-shadow duration-[120ms] hover:shadow-[0_6px_24px_rgba(15,23,42,0.08)]"
      style={{ boxShadow: "0 4px 14px rgba(15,23,42,0.06)" }}
    >
      {/* Header */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-muted/30 transition-colors rounded-xl"
      >
        <div className="min-w-0">
          <p className="font-medium text-sm truncate">{summary.eventTitle}</p>
          <p className="text-xs text-muted-foreground">{dateStr}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {pending > 0 && <BookingStatusBadge status="pending" />}
          {accepted > 0 && <BookingStatusBadge status="accepted" />}
          {rejected > 0 && <BookingStatusBadge status="rejected" />}
          <ChevronDown
            className={cn(
              "h-4 w-4 text-muted-foreground transition-transform",
              expanded && "rotate-180",
            )}
          />
        </div>
      </button>

      {/* Expanded content */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-4 py-3 divide-y divide-border/60">
              {summary.schedules.map((sched, idx) => {
                const booking =
                  summary.bookings.find((b) => b.scheduleIndex === idx) ?? null;
                return (
                  <ScheduleBookingRow
                    key={idx}
                    schedule={sched}
                    booking={booking}
                    onSendMessage={onSendMessage}
                    onStatusChange={onStatusChange}
                  />
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
