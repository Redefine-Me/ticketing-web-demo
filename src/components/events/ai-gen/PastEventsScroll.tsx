"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { DashboardEvent } from "@/lib/supabase/types";
import { mockPrimaryEventImages } from "@/lib/mock-data-images";

interface PastEventsScrollProps {
  events: DashboardEvent[];
  selectedEventIds: string[];
  onToggle: (eventId: string) => void;
}

function formatDate(date: string | null) {
  if (!date) return "Date not set";
  return new Date(date).toLocaleDateString();
}

export function PastEventsScroll({ events, selectedEventIds, onToggle }: PastEventsScrollProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-bold text-red-500">Select past events for style influence</h3>
      <div className="overflow-x-auto pb-2">
        <div className="flex min-w-max gap-3">
          {events.map((event) => {
            const selected = selectedEventIds.includes(event.id);
            const imageUrl = mockPrimaryEventImages[event.id] ?? null;

            return (
              <button
                type="button"
                key={event.id}
                className={cn(
                  "relative w-28 overflow-hidden rounded-lg border bg-background text-left transition-all",
                  selected ? "border-dashboard-cta ring-2 ring-dashboard-cta/40" : "border-border hover:border-muted-foreground/40"
                )}
                onClick={() => onToggle(event.id)}
              >
                <div className="relative h-16 w-full bg-muted">
                  {imageUrl ? (
                    <img src={imageUrl} alt={event.title} className="h-full w-full object-cover" loading="lazy" />
                  ) : (
                    <div className="flex h-full items-center justify-center px-2 text-center text-xs text-muted-foreground">{event.title}</div>
                  )}
                  {selected && (
                    <span className="absolute right-1.5 top-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-dashboard-cta text-white">
                      <Check className="h-3 w-3" />
                    </span>
                  )}
                </div>
                <div className="space-y-1 p-2">
                  <p className="line-clamp-2 text-xs font-medium">{event.title}</p>
                  <p className="text-[11px] text-muted-foreground">{formatDate(event.date)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
