"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Smartphone } from "lucide-react";

const tabs = [
  { id: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
  { id: "mobile" as const, label: "Mobile View", icon: Smartphone },
];

type TabId = (typeof tabs)[number]["id"];

export function DashboardTabs({ children }: { children: React.ReactNode }) {
  const [activeTab, setActiveTab] = useState<TabId>("dashboard");
  const mobilePreviewPath =
    process.env.NEXT_PUBLIC_MOBILE_PREVIEW_PATH || "/mobile";

  return (
    <div className="flex flex-1 flex-col overflow-hidden">
      {/* Tab bar */}
      <div className="flex-shrink-0 border-b border-border bg-card/80 backdrop-blur-sm px-4 md:px-6">
        <nav className="flex gap-1" aria-label="Tabs">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg transition-colors",
                  isActive
                    ? "text-dashboard-cta"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <tab.icon className="h-4 w-4" />
                {tab.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-dashboard-cta rounded-t-full" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Tab content */}
      {activeTab === "dashboard" ? (
        <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
      ) : (
        <div className="relative flex-1 overflow-hidden bg-[#0a0a0a]">
          <iframe
            src={mobilePreviewPath}
            className="absolute inset-0 h-full w-full border-0"
            title="Mobile App Preview"
          />
        </div>
      )}
    </div>
  );
}
