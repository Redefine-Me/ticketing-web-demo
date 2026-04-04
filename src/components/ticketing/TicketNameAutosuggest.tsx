"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";

const SUGGESTIONS = [
  "VIP",
  "Member Price",
  "Non-Member Price",
  "Early Bird",
  "Standard",
  "General Admission",
];

interface TicketNameAutosuggestProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function TicketNameAutosuggest({
  value,
  onChange,
  disabled,
}: TicketNameAutosuggestProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const filtered = SUGGESTIONS.filter((s) =>
    s.toLowerCase().includes(value.toLowerCase()),
  );

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <Input
        placeholder="Ticket name"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        disabled={disabled}
      />
      {open && filtered.length > 0 && value.length > 0 && !disabled && (
        <div className="absolute top-full left-0 z-50 mt-1 w-full rounded-md border bg-background shadow-md">
          {filtered.map((s) => (
            <button
              key={s}
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors"
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
