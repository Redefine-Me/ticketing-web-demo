"use client";

interface TicketedBadgeProps {
  sold: number;
  total: number;
}

export function TicketedBadge({ sold, total }: TicketedBadgeProps) {
  const colors =
    sold > 0
      ? "bg-indigo-100 text-indigo-700"
      : "bg-gray-100 text-gray-500";

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full ${colors}`}
    >
      {sold} / {total} sold
    </span>
  );
}
