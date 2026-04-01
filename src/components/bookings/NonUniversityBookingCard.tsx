"use client";

import type { NonUniversityBooking } from "@/lib/supabase/types";
import { BookingStatusBadge } from "./BookingStatusBadge";
import { CommunicationHistory } from "./CommunicationHistory";
import { MapPin, Phone, ExternalLink } from "lucide-react";

export function NonUniversityBookingCard({
  booking,
  onSendMessage,
}: {
  booking: NonUniversityBooking;
  onSendMessage: (message: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-sm font-medium">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            {booking.venueName}
          </div>
          <div className="flex items-center gap-3 pl-5.5 text-xs text-muted-foreground">
            <a
              href={`tel:${booking.phone}`}
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <Phone className="h-3 w-3" />
              {booking.phone}
            </a>
            <a
              href={booking.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
            >
              <ExternalLink className="h-3 w-3" />
              Website
            </a>
          </div>
          <p className="text-xs text-muted-foreground pl-5.5 line-clamp-3">
            {booking.description}
          </p>
        </div>
        <BookingStatusBadge status={booking.status} />
      </div>
      <CommunicationHistory
        messages={booking.messages}
        onSend={onSendMessage}
      />
    </div>
  );
}
