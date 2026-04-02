"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import type { AutoDetectedContext } from "@/lib/types/image-generation";

interface AutoContextProps {
  context: AutoDetectedContext;
}

function Row({ label, value }: { label: string; value: string | null }) {
  return (
    <div className="grid grid-cols-3 gap-2 rounded-md border border-border/60 p-2 text-xs">
      <span className="font-medium text-muted-foreground">{label}</span>
      <span className="col-span-2 text-foreground">{value || <span className="text-muted-foreground">Not set</span>}</span>
    </div>
  );
}

export function AutoContext({ context }: AutoContextProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-lg border bg-muted/20 p-2">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left text-xs font-medium"
        onClick={() => setOpen((prev) => !prev)}
      >
        <span>Auto-detected context from your event</span>
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="mt-3 space-y-2">
          <Row label="Event title" value={context.eventTitle} />
          <Row label="Event description" value={context.eventDescription} />
          <Row label="Category" value={context.categories.join(", ") || null} />
          <Row label="Visual direction" value={context.categoryVisualDirections.join(" | ") || null} />
          <Row label="Is online" value={context.isOnline ? "Yes" : "No"} />
          <Row label="Date and time" value={context.dateTime} />
          <Row label="Venue" value={context.venueName} />
          <Row label="Building" value={context.buildingName} />
          <Row label="Room" value={context.roomName} />
          <Row label="Society" value={context.societyName} />
          <Row label="Society description" value={context.societyDescription} />
          <Row label="Instagram" value={context.instagramHandle ? `@${context.instagramHandle}` : null} />
          <Row label="University" value={context.universityName} />
        </div>
      )}
    </div>
  );
}
