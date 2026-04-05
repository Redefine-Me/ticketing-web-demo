"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import type { SocietyAccountRow, SocietyRow, SocietyProfileRow } from "@/lib/supabase/types";
import { useDashboardContext } from "@/components/dashboard/DashboardContext";
import { createAuthBrowserClient } from "@/supabase_lib/auth/browser";
import { getCommitteePermissions } from "@/supabase_lib/societies";

interface SocietyAuth {
  user: User | null;
  account: SocietyAccountRow | null;
  society: SocietyRow | null;
  profile: SocietyProfileRow | null;
  permissions: string[];
  loading: boolean;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
}

export function useSocietyAuth(): SocietyAuth {
  const { societyId } = useDashboardContext();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [account, setAccount] = useState<SocietyAccountRow | null>(null);
  const [society, setSociety] = useState<SocietyRow | null>(null);
  const [profile, setProfile] = useState<SocietyProfileRow | null>(null);
  const [permissions, setPermissions] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const supabase = createAuthBrowserClient();

      const { data: { user: authUser } } = await supabase.auth.getUser();
      setUser(authUser);

      if (!authUser) {
        setLoading(false);
        return;
      }

      const [accountResult, societyResult, profileResult] = await Promise.all([
        supabase
          .from("society_accounts")
          .select("*, society_account_approval_status(name)")
          .eq("auth_user_id", authUser.id)
          .eq("society_id", societyId)
          .single(),
        supabase
          .from("societies")
          .select("*")
          .eq("id", societyId)
          .single(),
        supabase
          .from("society_profiles")
          .select("*")
          .eq("society_id", societyId)
          .single(),
      ]);

      // Map the joined status name onto the flat approval_status field consumers expect
      if (accountResult.data) {
        const raw = accountResult.data as Record<string, unknown>;
        const statusObj = raw.society_account_approval_status as { name: string } | null;
        setAccount({
          ...accountResult.data,
          approval_status: (statusObj?.name ?? "pending") as SocietyAccountRow["approval_status"],
        } as SocietyAccountRow);
      } else {
        setAccount(null);
      }

      setSociety((societyResult.data as SocietyRow) ?? null);
      setProfile((profileResult.data as SocietyProfileRow) ?? null);

      // Fetch permissions for the current user's society account
      if (accountResult.data?.id) {
        const perms = await getCommitteePermissions(supabase, [accountResult.data.id]);
        setPermissions(perms.map((p) => p.society_management_perms.name));
      } else {
        setPermissions([]);
      }
    } catch (err) {
      console.error("[useSocietyAuth] fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, [societyId]);

  const isMounted = useRef(false);
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      fetchData();
    }
  }, [fetchData]);

  const signOut = useCallback(async () => {
    const supabase = createAuthBrowserClient();
    await supabase.auth.signOut();
    router.push("/auth");
  }, [router]);

  const refresh = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  return {
    user,
    account,
    society,
    profile,
    permissions,
    loading,
    signOut,
    refresh,
  };
}
