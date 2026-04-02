"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import type { Booking, BookingStatus, DashboardEvent } from "@/lib/supabase/types";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { UniversityBookingCard } from "./UniversityBookingCard";
import { NonUniversityBookingCard } from "./NonUniversityBookingCard";

export function ScheduleBookingRow({
  schedule,
  booking,
  onSendMessage,
  onStatusChange,
}: {
  schedule: DashboardEvent["schedules"][number];
  booking: Booking | null;
  onSendMessage: (bookingId: string, message: string) => void;
  onStatusChange: (bookingId: string, status: BookingStatus) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const dateStr = format(new Date(schedule.scheduledAt), "EEE d MMM, h:mm a");

  if (schedule.isEnd) {
    return (
      <div className="flex items-center gap-2 py-1.5 pl-2 text-sm text-muted-foreground">
        <Clock className="h-3.5 w-3.5" />
        <span>End time &middot; {dateStr}</span>
      </div>
    );
  }

  return (
    <div>
      <button
        type="button"
        onClick={() => booking && setExpanded(!expanded)}
        className={cn(
          "flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm transition-colors",
          booking && "hover:bg-muted/50 cursor-pointer",
          !booking && "cursor-default",
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Clock className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
          <span className="truncate">
            {dateStr}
            {schedule.buildingName && (
              <span className="text-muted-foreground">
                {" "}&middot; {schedule.buildingName}
                {schedule.roomName && `, ${schedule.roomName}`}
              </span>
            )}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {booking ? (
            <>
              <BookingStatusBadge status={booking.status} />
              <ChevronDown
                className={cn(
                  "h-4 w-4 text-muted-foreground transition-transform",
                  expanded && "rotate-180",
                )}
              />
            </>
          ) : (
            <span className="text-xs text-muted-foreground">No booking</span>
          )}
        </div>
      </button>

      <AnimatePresence>
        {expanded && booking && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border/50 px-3 py-3">
              {booking.type === "university" ? (
                <UniversityBookingCard
                  booking={booking}
                  onSendMessage={(msg) => onSendMessage(booking.id, msg)}
                />
              ) : (
                <NonUniversityBookingCard
                  booking={booking}
                  onSendMessage={(msg) => onSendMessage(booking.id, msg)}
                  onStatusChange={(status) => onStatusChange(booking.id, status)}
                />
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
