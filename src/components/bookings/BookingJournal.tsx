"use client";

import { useState, useRef, useEffect } from "react";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import type { BookingMessage } from "@/lib/supabase/types";

const MAX_CHARS = 500;

export function BookingJournal({
  entries,
  onAddEntry,
}: {
  entries: BookingMessage[];
  onAddEntry: (message: string) => void;
}) {
  const [value, setValue] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries.length]);

  function handleAdd() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onAddEntry(trimmed);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAdd();
    }
  }

  return (
    <div className="space-y-2">
      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
        Booking Notes
      </p>
      <div
        ref={scrollRef}
        className="max-h-[300px] overflow-y-auto space-y-1.5 rounded-lg border border-border bg-background/50 p-3"
      >
        {entries.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No notes yet
          </p>
        ) : (
          entries.map((entry) => (
            <div key={entry.id} className="flex gap-2 text-sm">
              <span className="shrink-0 text-[11px] text-muted-foreground pt-0.5 w-[90px]">
                {format(new Date(entry.sentAt), "d MMM, h:mm a")}
              </span>
              <p className="text-foreground">{entry.message}</p>
            </div>
          ))
        )}
      </div>
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Input
            placeholder="Add a note..."
            value={value}
            onChange={(e) => setValue(e.target.value.slice(0, MAX_CHARS))}
            onKeyDown={handleKeyDown}
          />
          {value.length >= 400 && (
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
              {value.length}/{MAX_CHARS}
            </span>
          )}
        </div>
        <Button
          type="button"
          size="icon"
          variant="ghost"
          disabled={!value.trim()}
          onClick={handleAdd}
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
