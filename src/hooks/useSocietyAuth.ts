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

function getSocietyDirName(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("rm_demo_society");
}

export function useSocietyAuth(): SocietyAuth {
  const router = useRouter();

  const dirName = useMemo(() => getSocietyDirName(), []);
  const displayName = useMemo(
    () => (dirName ? dirName.replace(/_/g, " ") : null),
    [dirName]
  );

  const society: SocietyRow | null = useMemo(() => {
    if (!dirName || !displayName) return null;
    return {
      id: dirName,
      name: displayName,
      instagram_handle: "",
      description: null,
      bio_url: null,
      university_id: "u-001",
      image_url: null,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }, [dirName, displayName]);

  const profile: SocietyProfileRow | null = useMemo(() => {
    if (!dirName || !displayName) return null;
    return {
      id: `sp-${dirName}`,
      society_id: dirName,
      name: displayName,
      handle: "",
      description: null,
      image_url: null,
      follow_count: 0,
      event_count: 0,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };
  }, [dirName, displayName]);

  const signOut = useCallback(async () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("rm_demo_society");
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
