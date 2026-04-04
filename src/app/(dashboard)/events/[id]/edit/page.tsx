"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";

export default function EditEventPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const society = localStorage.getItem("rm_demo_society");
    if (society) {
      router.replace(`/society/${society}/dashboard/events/${id}/edit`);
    } else {
      router.replace("/society");
    }
  }, [router, id]);

  return null;
}
