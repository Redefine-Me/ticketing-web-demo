"use client";

import { useParams } from "next/navigation";
import { redirect } from "next/navigation";

export default function EditEventPage() {
  const { id } = useParams<{ id: string }>();
  redirect(`/society/s-001/dashboard/events/${id}/edit`);
}
