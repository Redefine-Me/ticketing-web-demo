"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EventsPage() {
  const router = useRouter();

  useEffect(() => {
    const society = localStorage.getItem("rm_demo_society");
    if (society) {
      router.replace(`/society/${society}/dashboard/events`);
    } else {
      router.replace("/society");
    }
  }, [router]);

  return null;
}
