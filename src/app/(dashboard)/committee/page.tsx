"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CommitteePage() {
  const router = useRouter();

  useEffect(() => {
    const society = localStorage.getItem("rm_demo_society");
    if (society) {
      router.replace(`/society/${society}/dashboard/committee`);
    } else {
      router.replace("/society");
    }
  }, [router]);

  return null;
}
