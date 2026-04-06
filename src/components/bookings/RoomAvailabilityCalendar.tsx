"use client";

import { useMemo } from "react";
import { format, addDays, startOfWeek } from "date-fns";
import { cn } from "@/lib/utils";
import type { RoomAvailabilitySlot } from "@/lib/supabase/types";

const HOURS_START = 8;
const HOURS_END = 22;
const SLOT_MINUTES = 60;
const TOTAL_SLOTS = (HOURS_END - HOURS_START) * (60 / SLOT_MINUTES);

function formatHour(hour: number) {
  return `${hour.toString().padStart(2, "0")}:00`;
}

export function RoomAvailabilityCalendar({
  slots,
  weekStart,
}: {
  slots: RoomAvailabilitySlot[];
  weekStart?: Date;
}) {
  const baseDate = weekStart ?? startOfWeek(new Date(), { weekStartsOn: 1 });
  const days = useMemo(
    () => Array.from({ length: 7 }, (_, i) => addDays(baseDate, i)),
    [baseDate],
  );

  // Build a lookup: "YYYY-MM-DD_HH:MM" -> slot
  const slotMap = useMemo(() => {
    const map = new Map<string, RoomAvailabilitySlot>();
    for (const slot of slots) {
      const startHour = parseInt(slot.startTime.split(":")[0], 10);
      const endHour = parseInt(slot.endTime.split(":")[0], 10);
      for (let h = startHour; h < endHour; h++) {
        map.set(`${slot.date}_${formatHour(h)}`, slot);
      }
    }
    return map;
  }, [slots]);

  if (slots.length === 0) {
    return (
      <p className="text-xs text-muted-foreground text-center py-3">
        No availability data for this room
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <div
        className="grid min-w-[400px]"
        style={{
          gridTemplateColumns: `48px repeat(7, 1fr)`,
          gridTemplateRows: `auto repeat(${TOTAL_SLOTS}, 20px)`,
        }}
      >
        {/* Header row: empty corner + day labels */}
        <div />
        {days.map((day) => (
          <div
            key={day.toISOString()}
            className="text-center text-[10px] font-medium text-muted-foreground pb-1 border-b border-border"
          >
            {format(day, "EEE d")}
          </div>
        ))}

        {/* Time rows */}
        {Array.from({ length: TOTAL_SLOTS }, (_, rowIdx) => {
          const hour = HOURS_START + rowIdx;
          return (
            <div key={`row-${rowIdx}`} className="contents">
              {/* Time label */}
              <div className="text-[10px] text-muted-foreground text-right pr-1.5 leading-[20px] border-r border-border">
                {formatHour(hour)}
              </div>
              {/* Day cells */}
              {days.map((day) => {
                const dateStr = format(day, "yyyy-MM-dd");
                const key = `${dateStr}_${formatHour(hour)}`;
                const slot = slotMap.get(key);
                const status = slot?.status ?? "free";
                return (
                  <div
                    key={key}
                    title={slot?.bookedBy ?? "Free"}
                    className={cn(
                      "border-r border-b border-border/50",
                      status === "free" && "bg-transparent",
                      status === "booked" && "bg-gray-200/60",
                      status === "mine" && "bg-red-100",
                    )}
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-2 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-transparent border border-border" />
          Free
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-gray-200/60" />
          Booked
        </span>
        <span className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-sm bg-red-100" />
          Your booking
        </span>
      </div>
    </div>
  );
}
