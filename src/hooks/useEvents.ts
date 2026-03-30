"use client";

import { useState, useCallback } from "react";
import type { DashboardEvent } from "@/lib/supabase/types";
import { events as webMockEvents } from "../../web/src/lib/mock-data";
import type { EventWithDetails } from "../../web/src/types";

const SHARED_EVENTS_STORAGE_KEY = "rm_shared_dashboard_events_v1";

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
    const raw = localStorage.getItem(SHARED_EVENTS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as DashboardEvent[]) : null;
  } catch {
    return null;
  }
}

function saveSharedEvents(events: DashboardEvent[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(SHARED_EVENTS_STORAGE_KEY, JSON.stringify(events));
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
      });
    }
  });

  return mapped;
}

function mobileEventToDashboardEvent(event: EventWithDetails): DashboardEvent {
  const startSchedule = event.schedule_entries.find((e) => !e.is_end_schedule);
  const schedules: DashboardEvent["schedules"] = event.schedule_entries
    .map((entry, index) => ({
      scheduledAt: entry.scheduled_at,
      isEnd: entry.is_end_schedule,
      order: entry.schedule_order ?? index,
      locationName: entry.location?.name ?? null,
      locationId: entry.location?.id ?? null,
      locationGoogleMapsUrl: entry.location?.google_maps_url ?? null,
      buildingName: entry.location?.name ?? null,
      buildingId: entry.location?.id ?? null,
      buildingGoogleMapsUrl: entry.location?.google_maps_url ?? null,
      roomName: null,
      roomId: null,
      description: null,
    }))
    .sort((a, b) => a.order - b.order);

  return {
    id: event.id,
    title: event.name,
    description: event.description ?? "",
    date: startSchedule?.scheduled_at ?? event.created_at ?? null,
    status: "live",
    source: "manual",
    likes: event.like_count,
    attending: event.attend_count,
    categories: event.categories.map((c) => c.name),
    imageUrl: event.images[0]?.full_url ?? null,
    registrationUrl: event.registration_url,
    isOnline: false,
    isFree: event.is_free,
    price: event.price == null ? null : `£${event.price}`,
    schedules,
  };
}

const sharedSeedEvents: DashboardEvent[] = webMockEvents.map(mobileEventToDashboardEvent);

export function useEvents(societyId: string | undefined) {
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async () => {
    if (!societyId) return;
    setLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise((r) => setTimeout(r, 200));

    const shared = loadSharedEvents();
    const next = shared ?? sharedSeedEvents;
    setEvents(next);
    if (!shared) {
      saveSharedEvents(next);
    }
    setLoading(false);
  }, [societyId]);

  const createEvent = async (formData: Record<string, unknown>, categoryIds?: string[]) => {
    const schedules = toDashboardSchedules(formData.schedules);
    const firstStart = schedules.find((s) => !s.isEnd)?.scheduledAt ?? null;

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
      imageUrl: null,
      registrationUrl: (formData.registrationUrl as string) || null,
      isOnline: Boolean(formData.isOnline),
      isFree: Boolean(formData.isFree),
      price: Boolean(formData.isFree)
        ? null
        : ((formData.price as string) || null),
      schedules,
    };

    setEvents((prev) => {
      const next = [newEvent, ...prev];
      saveSharedEvents(next);
      return next;
    });
    return { event_id: newEvent.id, status: "ingested" };
  };

  const updateEvent = async (
    eventId: string,
    formData: Record<string, unknown>,
    categoryIds?: string[]
  ) => {
    const schedules = toDashboardSchedules(formData.schedules);
    const firstStart = schedules.find((s) => !s.isEnd)?.scheduledAt ?? null;

    setEvents((prev) => {
      const next = prev.map((e) =>
        e.id === eventId
          ? {
              ...e,
              title: (formData.title as string) ?? e.title,
              description: (formData.description as string) ?? e.description,
              date: firstStart ?? e.date,
              categories: categoryIds ?? e.categories,
              registrationUrl:
                ((formData.registrationUrl as string) || null) ?? e.registrationUrl,
              isOnline:
                formData.isOnline == null ? e.isOnline : Boolean(formData.isOnline),
              isFree:
                formData.isFree == null ? e.isFree : Boolean(formData.isFree),
              price:
                formData.isFree == null
                  ? e.price
                  : Boolean(formData.isFree)
                    ? null
                    : ((formData.price as string) || null),
              schedules: schedules.length > 0 ? schedules : e.schedules,
            }
          : e
      );
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

  return { events, loading, error, fetchEvents, createEvent, updateEvent, deleteEvent };
}
