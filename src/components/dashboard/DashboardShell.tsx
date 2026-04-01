"use client";

import { DashboardProvider } from "./DashboardContext";
import { DashboardTabs } from "./DashboardTabs";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { BookingsProvider } from "@/contexts/BookingsContext";

export function DashboardShell({
  societyId,
  children,
}: {
  societyId: string;
  children: React.ReactNode;
}) {
  return (
    <DashboardProvider societyId={societyId}>
      <BookingsProvider>
        <TooltipProvider>
          <AuroraBackground opacity={12} showRadialGradient={false} className="h-screen !min-h-0">
            <div className="dashboard-scope flex h-screen">
              <Sidebar />
              <div className="flex flex-1 flex-col overflow-hidden">
                <Topbar />
                <DashboardTabs>{children}</DashboardTabs>
              </div>
            </div>
          </AuroraBackground>
          <Toaster />
        </TooltipProvider>
      </BookingsProvider>
    </DashboardProvider>
  );
}
