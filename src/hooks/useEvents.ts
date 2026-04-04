"use client";

import { useState, useCallback, useMemo } from "react";
import type { DashboardEvent, TicketType, TicketPurchase } from "@/lib/supabase/types";
import { mockEvents, fetchMockEventsForSociety } from "@/lib/mock-data";
import { isUniversityBuilding } from "@/lib/mock-data-bookings";

function getStorageKey(): string {
  const society = typeof window !== "undefined"
    ? localStorage.getItem("rm_demo_society")
    : null;
  return society
    ? `rm_shared_dashboard_events_v2_${society}`
    : "rm_shared_dashboard_events_v2";
}

/** Convert a File to a base64 data URL for localStorage persistence. */
function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/** Extract persistable URL strings from the form's ImageItem array. */
async function resolveImageUrls(images: unknown[]): Promise<string[]> {
  const results: string[] = [];
  for (const item of images) {
    if (item instanceof File) {
      results.push(await fileToDataUrl(item));
    } else if (item && typeof item === "object" && "url" in item) {
      results.push((item as { url: string }).url);
    }
  }
  return results;
}

type FormSchedule = {
  date?: string;
  startTime?: string;
  endTime?: string;
  buildingName?: string;
  buildingId?: string;
  buildingGoogleMapsUrl?: string | null;
  roomName?: string;
  roomId?: string;
  description?: string;
};

function loadSharedEvents(): DashboardEvent[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(getStorageKey());
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DashboardEvent[]) : null;
  } catch {
    return null;
  }
}

function saveSharedEvents(events: DashboardEvent[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(getStorageKey(), JSON.stringify(events));
  // Notify same-tab listeners (storage event only fires cross-tab)
  window.dispatchEvent(new Event("rm_shared_events_changed"));
}

function toIsoDate(date?: string, time?: string) {
  if (!date || !time) return null;
  const d = new Date(`${date}T${time}`);
  return Number.isNaN(d.getTime()) ? null : d.toISOString();
}

function toDashboardSchedules(input: unknown) {
  const schedules = Array.isArray(input) ? (input as FormSchedule[]) : [];
  const mapped: DashboardEvent["schedules"] = [];

  schedules.forEach((entry, idx) => {
    const startIso = toIsoDate(entry.date, entry.startTime);
    const isUniVenue = entry.buildingId ? isUniversityBuilding(entry.buildingId) : false;

    if (startIso) {
      mapped.push({
        scheduledAt: startIso,
        isEnd: false,
        order: idx * 2,
        locationName: entry.buildingName || null,
        locationId: entry.buildingId || null,
        locationGoogleMapsUrl: entry.buildingGoogleMapsUrl || null,
        buildingName: entry.buildingName || null,
        buildingId: entry.buildingId || null,
        buildingGoogleMapsUrl: entry.buildingGoogleMapsUrl || null,
        roomName: entry.roomName || null,
        roomId: entry.roomId || null,
        description: entry.description || null,
        isUniversityVenue: isUniVenue,
      });
    }

    const endIso = toIsoDate(entry.date, entry.endTime);
    if (endIso) {
      mapped.push({
        scheduledAt: endIso,
        isEnd: true,
        order: idx * 2 + 1,
        locationName: null,
        locationId: null,
        locationGoogleMapsUrl: null,
        buildingName: null,
        buildingId: null,
        buildingGoogleMapsUrl: null,
        roomName: null,
        roomId: null,
        description: null,
        isUniversityVenue: isUniVenue,
      });
    }
  });

  return mapped;
}

async function getSeedEvents(): Promise<DashboardEvent[]> {
  const society = typeof window !== "undefined"
    ? localStorage.getItem("rm_demo_society")
    : null;
  if (society) {
    return fetchMockEventsForSociety(society);
  }
  return [];
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

export function useEvents(societyId: string | undefined) {
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compute ticketing totals on the fly
  const eventsWithTotals = useMemo(() => events.map(withTicketingTotals), [events]);

  const ticketedEvents = useMemo(
    () => eventsWithTotals.filter((e) => e.isTicketed),
    [eventsWithTotals],
  );
  const nonTicketedEvents = useMemo(
    () => eventsWithTotals.filter((e) => !e.isTicketed),
    [eventsWithTotals],
  );

  const fetchEvents = useCallback(async () => {
    if (!societyId) return;
    setLoading(true);
    setError(null);

    const stored = loadSharedEvents();
    const seed = await getSeedEvents();

    if (stored && stored.length > 0) {
      // Refresh imageUrls from mock data so stale localStorage doesn't show broken images
      const seedImageMap = new Map(seed.map((e) => [e.id, e.imageUrls]));
      const refreshed = stored.map((e) => {
        const freshUrls = seedImageMap.get(e.id);
        return freshUrls ? { ...e, imageUrls: freshUrls } : e;
      });
      setEvents(refreshed);
      saveSharedEvents(refreshed);
    } else {
      setEvents(seed);
      saveSharedEvents(seed);
    }
    setLoading(false);
  }, [societyId]);

  const createEvent = async (formData: Record<string, unknown>, categoryIds?: string[]) => {
    const schedules = toDashboardSchedules(formData.schedules);
    const firstStart = schedules.find((s) => !s.isEnd)?.scheduledAt ?? null;

    // Handle ticketing data from form
    const isTicketed = Boolean(formData.isTicketed);
    const ticketTypes: TicketType[] | undefined = isTicketed && Array.isArray(formData.ticketTypes)
      ? (formData.ticketTypes as Omit<TicketType, "id" | "eventId">[]).map((t, i) => ({
          ...t,
          id: `tt-${Date.now()}-${i}`,
          eventId: `e-${Date.now()}`,
        }))
      : undefined;

    // Convert uploaded Files to data URLs, pass URL items through
    const imageUrls = Array.isArray(formData.images)
      ? await resolveImageUrls(formData.images)
      : [];

    const newEvent: DashboardEvent = {
      id: `e-${Date.now()}`,
      title: (formData.title as string) ?? "New Event",
      description: (formData.description as string) ?? "",
      date: firstStart ?? new Date().toISOString(),
      status: "ingested",
      source: "manual",
      likes: 0,
      attending: 0,
      categories: categoryIds ?? [],
      imageUrls,
      registrationUrl: (formData.registrationUrl as string) || null,
      isOnline: Boolean(formData.isOnline),
      schedules,
      isTicketed,
      ticketTypes: ticketTypes
        ? ticketTypes.map((t) => ({ ...t, eventId: `e-${Date.now()}` }))
        : undefined,
      purchases: isTicketed ? [] : undefined,
    };

    // Fix eventId now that we have the real one
    if (newEvent.ticketTypes) {
      newEvent.ticketTypes = newEvent.ticketTypes.map((t) => ({
        ...t,
        eventId: newEvent.id,
      }));
    }

    // Read existing events outside the updater so it stays pure (StrictMode-safe)
    const base = events.length > 0 ? events : (loadSharedEvents() ?? []);
    const next = [newEvent, ...base];
    saveSharedEvents(next);
    setEvents(next);
    return { event_id: newEvent.id, status: "ingested" };
  };

  const updateEvent = async (
    eventId: string,
    formData: Record<string, unknown>,
    categoryIds?: string[]
  ) => {
    const schedules = toDashboardSchedules(formData.schedules);
    const firstStart = schedules.find((s) => !s.isEnd)?.scheduledAt ?? null;

    const isTicketed = formData.isTicketed != null ? Boolean(formData.isTicketed) : undefined;
    const rawTicketTypes = Array.isArray(formData.ticketTypes) ? formData.ticketTypes as TicketType[] : undefined;

    // Resolve images before the state updater (keeps it pure)
    const updatedImageUrls = Array.isArray(formData.images)
      ? await resolveImageUrls(formData.images)
      : undefined;

    setEvents((prev) => {
      const next = prev.map((e) => {
        if (e.id !== eventId) return e;

        const updatedTicketed = isTicketed ?? e.isTicketed;
        let updatedTicketTypes = e.ticketTypes;
        let updatedPurchases = e.purchases;

        if (isTicketed != null) {
          if (updatedTicketed && rawTicketTypes) {
            // Assign IDs to new ticket types, keep existing ones
            updatedTicketTypes = rawTicketTypes.map((t, i) => ({
              ...t,
              id: t.id || `tt-${Date.now()}-${i}`,
              eventId,
            }));
          } else if (!updatedTicketed) {
            updatedTicketTypes = undefined;
            updatedPurchases = undefined;
          }
        }

        return {
          ...e,
          title: (formData.title as string) ?? e.title,
          description: (formData.description as string) ?? e.description,
          date: firstStart ?? e.date,
          categories: categoryIds ?? e.categories,
          imageUrls: updatedImageUrls ?? e.imageUrls,
          registrationUrl:
            ((formData.registrationUrl as string) || null) ?? e.registrationUrl,
          isOnline:
            formData.isOnline == null ? e.isOnline : Boolean(formData.isOnline),
          schedules: schedules.length > 0 ? schedules : e.schedules,
          isTicketed: updatedTicketed,
          ticketTypes: updatedTicketTypes,
          purchases: updatedPurchases ?? e.purchases,
        };
      });
      saveSharedEvents(next);
      return next;
    });
  };

  const deleteEvent = async (eventId: string) => {
    setEvents((prev) => {
      const next = prev.filter((e) => e.id !== eventId);
      saveSharedEvents(next);
      return next;
    });
  };

  // ── Ticketing actions ──────────────────────────────────

  const assignTickets = async (
    eventId: string,
    ticketTypes: Omit<TicketType, "id" | "eventId">[],
  ) => {
    await new Promise((r) => setTimeout(r, 150));
    setEvents((prev) => {
      const next = prev.map((e) => {
        if (e.id !== eventId) return e;
        return {
          ...e,
          isTicketed: true,
          ticketTypes: ticketTypes.map((t, i) => ({
            ...t,
            id: `tt-${Date.now()}-${i}`,
            eventId,
          })),
          purchases: e.purchases ?? [],
        };
      });
      saveSharedEvents(next);
      return next;
    });
  };

  const updateTickets = async (eventId: string, ticketTypes: TicketType[]) => {
    await new Promise((r) => setTimeout(r, 150));
    setEvents((prev) => {
      const next = prev.map((e) =>
        e.id === eventId ? { ...e, ticketTypes } : e,
      );
      saveSharedEvents(next);
      return next;
    });
  };

  const removeTicketing = (eventId: string) => {
    setEvents((prev) => {
      const next = prev.map((e) => {
        if (e.id !== eventId) return e;
        const totalSold = (e.purchases ?? []).length;
        if (totalSold > 0) return e; // blocked
        return {
          ...e,
          isTicketed: false,
          ticketTypes: undefined,
          purchases: undefined,
        };
      });
      saveSharedEvents(next);
      return next;
    });
  };

  const markAttended = (purchaseId: string) => {
    setEvents((prev) => {
      const next = prev.map((e) => ({
        ...e,
        purchases: e.purchases?.map((p) =>
          p.id === purchaseId ? { ...p, attendedAt: new Date().toISOString() } : p,
        ),
      }));
      saveSharedEvents(next);
      return next;
    });
  };

  const unmarkAttended = (purchaseId: string) => {
    setEvents((prev) => {
      const next = prev.map((e) => ({
        ...e,
        purchases: e.purchases?.map((p) =>
          p.id === purchaseId ? { ...p, attendedAt: null } : p,
        ),
      }));
      saveSharedEvents(next);
      return next;
    });
  };

  const refundPurchase = (purchaseId: string) => {
    setEvents((prev) => {
      const next = prev.map((e) => ({
        ...e,
        purchases: e.purchases?.filter((p) => p.id !== purchaseId),
      }));
      saveSharedEvents(next);
      return next;
    });
  };

  const resetEvents = async () => {
    const seed = await getSeedEvents();
    setEvents(seed);
    saveSharedEvents(seed);
  };

  return {
    events: eventsWithTotals,
    loading,
    error,
    fetchEvents,
    resetEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    // Ticketing
    assignTickets,
    updateTickets,
    removeTicketing,
    markAttended,
    unmarkAttended,
    refundPurchase,
    ticketedEvents,
    nonTicketedEvents,
  };
}
