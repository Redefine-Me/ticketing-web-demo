"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type TimeRange = "7d" | "30d" | "90d";

interface DateRangeFilterProps {
  value: TimeRange;
  onChange: (range: TimeRange) => void;
}

const ranges: { value: TimeRange; label: string }[] = [
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" },
  { value: "90d", label: "90 days" },
];

export function DateRangeFilter({ value, onChange }: DateRangeFilterProps) {
  return (
    <div className="flex gap-1 rounded-lg border border-border bg-muted p-1">
      {ranges.map((range) => (
        <Button
          key={range.value}
          variant="ghost"
          size="sm"
          className={cn(
            "min-h-[44px] px-3 text-sm",
            value === range.value &&
              "bg-card text-foreground shadow-sm"
          )}
          onClick={() => onChange(range.value)}
        >
          {range.label}
        </Button>
      ))}
    </div>
  );
}
