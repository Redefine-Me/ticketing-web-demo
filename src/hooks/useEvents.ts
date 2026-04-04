"use client";

import { useState, useCallback, useMemo } from "react";
import type { DashboardEvent } from "@/lib/supabase/types";
import { getClient } from "@/supabase_lib/client";

const DASHBOARD_EVENT_SELECT = `
  *,
  categories(id, name),
  event_societies!inner(society_id),
  event_images(post_id, image_index, post_images(full_url)),
  schedule_entries(id, scheduled_at, is_end_schedule, schedule_order, location_id, locations(id, name, google_maps_url))
`.trim();

interface RawScheduleEntry {
  id: string;
  scheduled_at: string;
  is_end_schedule: boolean;
  schedule_order: number;
  location_id: string | null;
  locations: { id: string; name: string; google_maps_url: string | null } | null;
}

interface RawRow {
  id: string;
  title: string;
  description: string;
  is_online: boolean;
  is_free: boolean;
  price: string | null;
  registration_url: string | null;
  likes: number;
  attending: number;
  categories: { id: string; name: string } | null;
  event_images: Array<{
    post_id: string | null;
    image_index: number | null;
    post_images: { full_url: string } | null;
  }>;
  schedule_entries: RawScheduleEntry[];
}

function toDashboardEvent(row: RawRow): DashboardEvent {
  const sortedSchedules = [...row.schedule_entries].sort(
    (a, b) => a.schedule_order - b.schedule_order
  );

  const firstStart = sortedSchedules.find((s) => !s.is_end_schedule);
  const imageUrls = row.event_images
    .map((img) => img.post_images?.full_url)
    .filter((url): url is string => !!url);

  return {
    id: row.id,
    title: row.title,
    description: row.description,
    date: firstStart?.scheduled_at ?? null,
    status: "live",
    source: "scraped",
    likes: row.likes,
    attending: row.attending,
    categories: row.categories ? [row.categories.name] : [],
    imageUrl: imageUrls[0] ?? null,
    imageUrls,
    registrationUrl: row.registration_url,
    isOnline: row.is_online,
    isFree: row.is_free,
    price: row.price,
    schedules: sortedSchedules.map((s) => ({
      scheduledAt: s.scheduled_at,
      isEnd: s.is_end_schedule,
      order: s.schedule_order,
      locationName: s.locations?.name ?? null,
      locationId: s.location_id,
      locationGoogleMapsUrl: s.locations?.google_maps_url ?? null,
      buildingName: null,
      buildingId: null,
      buildingGoogleMapsUrl: null,
      roomName: null,
      roomId: null,
      description: null,
      isUniversityVenue: false,
    })),
    isTicketed: false,
  };
}

/** Compute derived ticketing totals for a single event. */
function withTicketingTotals(event: DashboardEvent): DashboardEvent {
  if (!event.isTicketed || !event.ticketTypes) return event;
  const purchases = event.purchases ?? [];
  const totalAvailable = event.ticketTypes.reduce((sum, t) => sum + t.totalAvailable, 0);
  const totalSold = purchases.length;
  const totalRevenue = event.ticketTypes.reduce((sum, t) => {
    const sold = purchases.filter((p) => p.ticketTypeId === t.id).length;
    return sum + sold * t.price;
  }, 0);
  return { ...event, totalAvailable, totalSold, totalRevenue };
}

// WARNING: All mutations (createEvent, updateEvent, deleteEvent) are currently mock implementations
// that only modify local state. When replacing with real Supabase calls, ensure that:
// 1. Supabase RLS policies restrict writes to events owned by the caller's society
// 2. OR edge functions verify society ownership before performing mutations
// Do NOT rely solely on the client-side layout auth check for authorization.
export function useEvents(societyId: string | undefined) {
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compute ticketing totals on the fly
  const eventsWithTotals = useMemo(() => events.map(withTicketingTotals), [events]);

  const fetchEvents = useCallback(async () => {
    if (!societyId) return;

    setLoading(true);
    setError(null);

    try {
      const { data, error: queryError } = await getClient()
        .from("events")
        .select(DASHBOARD_EVENT_SELECT)
        .eq("event_societies.society_id", societyId);

      if (queryError) {
        console.error("[useEvents] fetchEvents error:", queryError.message);
        setError(queryError.message);
        return;
      }

      const dashboardEvents = (data as unknown as RawRow[]).map(toDashboardEvent);
      setEvents(dashboardEvents);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to fetch events";
      console.error("[useEvents] fetchEvents error:", message);
      setError(message);
    } finally {
      setLoading(false);
    }
  }, [societyId]);

  const createEvent = async (formData: Record<string, unknown>) => {
    const newEvent: DashboardEvent = {
      id: `e-${Date.now()}`,
      title: (formData.title as string) ?? "New Event",
      description: (formData.description as string) ?? "",
      date: new Date().toISOString(),
      status: "ingested",
      source: "manual",
      likes: 0,
      attending: 0,
      categories: [],
      imageUrl: null,
      imageUrls: [],
      registrationUrl: null,
      isOnline: false,
      isFree: true,
      price: null,
      schedules: [],
      isTicketed: false,
    };
    setEvents((prev) => [newEvent, ...prev]);
    return { event_id: newEvent.id, status: "ingested" };
  };

  const updateEvent = async (eventId: string, formData: Record<string, unknown>) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === eventId
          ? { ...e, ...(formData as Partial<DashboardEvent>) }
          : e
      )
    );
  };

  const deleteEvent = async (eventId: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== eventId));
  };

  // Ticketing actions

  const markAttended = (purchaseId: string) => {
    setEvents((prev) =>
      prev.map((e) => ({
        ...e,
        purchases: e.purchases?.map((p) =>
          p.id === purchaseId ? { ...p, attendedAt: new Date().toISOString() } : p,
        ),
      }))
    );
  };

  const unmarkAttended = (purchaseId: string) => {
    setEvents((prev) =>
      prev.map((e) => ({
        ...e,
        purchases: e.purchases?.map((p) =>
          p.id === purchaseId ? { ...p, attendedAt: null } : p,
        ),
      }))
    );
  };

  const refundPurchase = (purchaseId: string) => {
    setEvents((prev) =>
      prev.map((e) => ({
        ...e,
        purchases: e.purchases?.filter((p) => p.id !== purchaseId),
      }))
    );
  };

  return {
    events: eventsWithTotals,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    markAttended,
    unmarkAttended,
    refundPurchase,
  };
}
