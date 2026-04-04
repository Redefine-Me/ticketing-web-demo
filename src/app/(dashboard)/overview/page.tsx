"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function OverviewPage() {
  const router = useRouter();

  useEffect(() => {
    const society = localStorage.getItem("rm_demo_society");
    if (society) {
      router.replace(`/society/${society}/dashboard/overview`);
    } else {
      router.replace("/society");
    }
  }, [router]);

  return null;
}
