"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import type { BookingStatus } from "@/lib/supabase/types";

const statusStyles: Record<BookingStatus, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  accepted: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<BookingStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  rejected: "Rejected",
};

const allStatuses: BookingStatus[] = ["pending", "accepted", "rejected"];

export function BookingStatusDropdown({
  status,
  onChange,
}: {
  status: BookingStatus;
  onChange: (status: BookingStatus) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

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
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={cn(
          "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-colors hover:opacity-80",
          statusStyles[status],
        )}
      >
        {statusLabels[status]}
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[120px] rounded-lg border border-border bg-popover p-1 shadow-md">
          {allStatuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                onChange(s);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-2 rounded-md px-2.5 py-1.5 text-xs transition-colors hover:bg-muted",
                s === status && "font-medium",
              )}
            >
              <span
                className={cn(
                  "h-2 w-2 rounded-full border",
                  statusStyles[s],
                )}
              />
              {statusLabels[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
