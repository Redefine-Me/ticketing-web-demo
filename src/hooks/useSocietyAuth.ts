"use client";

import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import type { SocietyAccountRow, SocietyRow, SocietyProfileRow } from "@/lib/supabase/types";
import { mockAccount } from "@/lib/mock-data";

interface SocietyAuth {
  user: null;
  account: SocietyAccountRow | null;
  society: SocietyRow | null;
  profile: SocietyProfileRow | null;
  permissions: string[];
  loading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

function clearSocietyCookies() {
  document.cookie = "rm_demo_society_id=; path=/; max-age=0";
  document.cookie = "rm_demo_society=; path=/; max-age=0";
}

function getSocietyFromCookie(): { id: string; name: string; imageUrl: string; university: string; instagram: string } | null {
  const raw = getCookie("rm_demo_society");
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function useSocietyAuth(): SocietyAuth {
  const router = useRouter();

  const cookieData = useMemo(() => getSocietyFromCookie(), []);

  const society: SocietyRow | null = useMemo(() => {
    if (!cookieData) return null;
    return {
      id: cookieData.id,
      name: cookieData.name,
      instagram_handle: cookieData.instagram || "",
      description: null,
      bio_url: null,
      university_id: "u-001",
      image_url: cookieData.imageUrl || null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }, [cookieData]);

  const profile: SocietyProfileRow | null = useMemo(() => {
    if (!cookieData) return null;
    return {
      id: `sp-${cookieData.id}`,
      society_id: cookieData.id,
      name: cookieData.name,
      handle: cookieData.instagram || "",
      description: null,
      image_url: cookieData.imageUrl || null,
      follow_count: 0,
      event_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }, [cookieData]);

  const signOut = useCallback(async () => {
    clearSocietyCookies();
    // Also clear cached events so next society starts fresh
    if (typeof window !== "undefined") {
      localStorage.removeItem("rm_shared_dashboard_events_v2");
    }
    router.push("/society");
  }, [router]);

  const refresh = useCallback(async () => {}, []);

  return {
    user: null,
    account: mockAccount,
    society,
    profile,
    permissions: ["event_management", "society_profile", "member_management", "view_analytics"],
    loading: false,
    signOut,
    refresh,
  };
}
