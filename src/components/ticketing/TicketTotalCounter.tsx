"use client";

interface TicketTotalCounterProps {
  total: number;
}

export function TicketTotalCounter({ total }: TicketTotalCounterProps) {
  return (
    <p className="text-sm text-muted-foreground font-medium">
      Total tickets: {total}
    </p>
  );
}
