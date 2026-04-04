"use client";

import { useRef, useEffect } from "react";
import type { BookingMessage } from "@/lib/supabase/types";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";

export function CommunicationHistory({
  messages,
  onSend,
}: {
  messages: BookingMessage[];
  onSend: (message: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Communication
      </p>
      <div
        ref={scrollRef}
        className="max-h-[300px] overflow-y-auto space-y-3 rounded-lg border border-border bg-background/50 p-3"
      >
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No messages yet
          </p>
        ) : (
          messages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)
        )}
      </div>
      <MessageInput onSend={onSend} />
    </div>
  );
}
