"use client";

import { useDashboardContext } from "@/components/dashboard/DashboardContext";

export function useDashboardNav() {
  const { societyId } = useDashboardContext();
  const basePath = `/society/${societyId}/dashboard`;
  return { basePath, href: (path: string) => `${basePath}${path}` };
}
