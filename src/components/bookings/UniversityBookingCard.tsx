"use client";

import type { UniversityBooking } from "@/lib/supabase/types";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { CommunicationHistory } from "./CommunicationHistory";
import { Building2, Users } from "lucide-react";

export function UniversityBookingCard({
  booking,
  onSendMessage,
}: {
  booking: UniversityBooking;
  onSendMessage: (message: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Building2 className="h-3.5 w-3.5 text-muted-foreground" />
            {booking.buildingName}
          </div>
          <p className="text-sm text-muted-foreground pl-5.5">
            {booking.roomName}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            {booking.expectedAttendees}
          </span>
          <BookingStatusBadge status={booking.status} />
        </div>
      </div>
      <CommunicationHistory
        messages={booking.messages}
        onSend={onSendMessage}
      />
    </div>
  );
}
