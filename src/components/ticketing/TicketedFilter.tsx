"use client";

import { Button } from "@/components/ui/button";

export type TicketFilterValue = "all" | "ticketed" | "non-ticketed";

interface TicketedFilterProps {
  value: TicketFilterValue;
  onChange: (value: TicketFilterValue) => void;
}

const options: { label: string; value: TicketFilterValue }[] = [
  { label: "All", value: "all" },
  { label: "Ticketed", value: "ticketed" },
  { label: "Non-ticketed", value: "non-ticketed" },
];

export function TicketedFilter({ value, onChange }: TicketedFilterProps) {
  return (
    <div className="flex gap-1">
      {options.map((opt) => (
        <Button
          key={opt.value}
          variant={value === opt.value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(opt.value)}
          className="text-xs"
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
