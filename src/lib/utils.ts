import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTimeRange(start: string, end?: string): string {
  const startDate = new Date(start);
  const startTime = startDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  if (!end) return startTime;

  const endDate = new Date(end);
  const endTime = endDate.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${startTime} – ${endTime}`;
}

/** Rewrite internal Supabase Docker URLs (http://kong:8000/…) to the public Supabase URL. */
export function fixStorageUrl(url: string | null | undefined): string {
  if (!url) return '';
  return url.replace(/^http:\/\/kong:8000\//, `${process.env.NEXT_PUBLIC_SUPABASE_URL}/`);
}

export function getEdgeFunctionUrl(functionName: string): string {
  return `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/${functionName}`;
}

export function getTimeRangeStart(range: "7d" | "30d" | "90d"): string {
  const now = new Date();
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  now.setDate(now.getDate() - days);
  return now.toISOString();
}

export function calculateGrowthPercent(
  current: number,
  previous: number
): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - previous) / previous) * 100);
}

