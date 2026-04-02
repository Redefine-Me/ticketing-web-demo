"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useDashboardNav } from "@/hooks/useDashboardNav";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  CalendarDays,
  CalendarCheck,
  Users,
  UsersRound,
  PieChart,
  Settings,
} from "lucide-react";

const navItems = [
  { path: "/overview", label: "Overview", icon: LayoutDashboard },
  { path: "/events", label: "Events", icon: CalendarDays },
  { path: "/bookings", label: "Bookings", icon: CalendarCheck },
  { path: "/followers", label: "Followers", icon: Users },
  { path: "/committee", label: "Committee", icon: UsersRound },
  { path: "/audience", label: "Audience", icon: PieChart },
  { path: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const nav = useDashboardNav();

  return (
    <aside className="hidden md:flex md:w-64 md:flex-col md:border-r md:border-border bg-card/95 backdrop-blur-sm">
      <div className="flex h-16 items-center border-b border-border px-6">
        <Link href={nav.href("/overview")} className="flex items-center">
          <Image
            src="/logos/Redefine%20Me%20logo%20wno%20bg.png"
            alt="Redefine Me"
            width={320}
            height={72}
            className="h-10 w-auto"
            priority
          />
        </Link>
      </div>
      <div className="mx-4 mt-2 border-t border-border/60" />
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const href = nav.href(item.path);
          const isActive =
            pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={item.path}
              href={href}
              className={cn(
                "relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-[3px] rounded-full bg-primary" />
              )}
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-border/60 px-6 py-4">
        <p className="text-xs font-medium text-muted-foreground tracking-wide">Society Dashboard</p>
      </div>
    </aside>
  );
}
