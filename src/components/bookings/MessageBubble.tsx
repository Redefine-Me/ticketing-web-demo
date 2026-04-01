"use client";

import { cn } from "@/lib/utils";
import type { BookingMessage } from "@/lib/supabase/types";
import { format } from "date-fns";

export function MessageBubble({ msg }: { msg: BookingMessage }) {
  const isYou = msg.sender === "you";
  const time = format(new Date(msg.sentAt), "d MMM, h:mm a");

  return (
    <div className={cn("flex flex-col gap-0.5", isYou ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[75%] rounded-lg px-3 py-2 text-sm",
          isYou
            ? "bg-red-50 text-foreground"
            : "bg-muted/50 text-foreground",
        )}
      >
        {msg.message}
      </div>
      <span className="text-[11px] text-muted-foreground">
        {msg.senderName} &middot; {time}
      </span>
    </div>
  );
}
