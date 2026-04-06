"use client";

import { useState, useCallback, useMemo } from "react";
import { createAuthBrowserClient } from "@/supabase_lib/auth/browser";
import { getEventsForSociety } from "@/supabase_lib/events";
import {
  createEvent as createEventEdge,
  updateEvent as updateEventEdge,
  deleteEvent as deleteEventEdge,
} from "@/supabase_lib/event-management";
import { formScheduleToPayload } from "@/utils/scheduleTransform";
import type { EventFormData } from "@/components/events/EventForm";
import type { DashboardEvent } from "@/lib/supabase/types";

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
      const supabase = createAuthBrowserClient();
      const data = await getEventsForSociety(supabase, societyId);
      setEvents(data);
    } catch (err) {
      console.error("[useEvents] fetchEvents error:", err);
      setError(err instanceof Error ? err.message : "Failed to load events");
    } finally {
      setLoading(false);
    }
  }, [societyId]);

  const createEvent = async (
    formData: EventFormData,
    categoryIds: string[]
  ) => {
    if (!societyId) throw new Error("No society selected");
    const supabase = createAuthBrowserClient();
    const schedule = formScheduleToPayload(formData.schedules);
    const result = await createEventEdge(supabase, {
      society_id: societyId,
      title: formData.title,
      description: formData.description,
      category_ids: categoryIds,
      schedule,
      is_online: formData.isOnline,
      is_free: !formData.isTicketed || formData.ticketTypes?.every((t) => t.price === 0),
      registration_url: formData.registrationUrl || undefined,
    });
    await fetchEvents();
    return result;
  };

  const updateEvent = async (
    eventId: string,
    formData: EventFormData,
    categoryIds: string[]
  ) => {
    const supabase = createAuthBrowserClient();
    const schedule = formScheduleToPayload(formData.schedules);
    await updateEventEdge(supabase, {
      event_id: eventId,
      title: formData.title,
      description: formData.description,
      category_ids: categoryIds,
      schedule,
      is_online: formData.isOnline,
      is_free: !formData.isTicketed || formData.ticketTypes?.every((t) => t.price === 0),
      registration_url: formData.registrationUrl || undefined,
    });
    await fetchEvents();
  };

  const deleteEvent = async (eventId: string) => {
    const supabase = createAuthBrowserClient();
    await deleteEventEdge(supabase, eventId);
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
