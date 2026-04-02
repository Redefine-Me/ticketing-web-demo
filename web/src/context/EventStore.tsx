'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { EventWithDetails, TicketType, TicketPurchase } from '@/types';
import { categories, events as mockEvents, societies } from '@/lib/mock-data';

interface EventStoreContextType {
  events: EventWithDetails[];
  likedEvents: EventWithDetails[];
  attendingEvents: EventWithDetails[];
  toggleLike: (id: string) => void;
  toggleAttending: (id: string) => void;
  getEvent: (id: string) => EventWithDetails | undefined;
}

const EventStoreContext = createContext<EventStoreContextType | null>(null);

const STORAGE_KEY = 'rm_event_interactions';
const SHARED_EVENTS_STORAGE_KEY = 'rm_shared_dashboard_events_v2';

interface SharedDashboardSchedule {
  scheduledAt: string;
  isEnd: boolean;
  order: number;
  locationName: string | null;
  locationId: string | null;
  locationGoogleMapsUrl: string | null;
  buildingName: string | null;
  buildingId: string | null;
  buildingGoogleMapsUrl: string | null;
  roomName: string | null;
  roomId: string | null;
  description: string | null;
}

interface SharedDashboardEvent {
  id: string;
  title: string;
  description: string;
  date: string | null;
  likes: number;
  attending: number;
  categories: string[];
  imageUrl: string | null;
  registrationUrl: string | null;
  schedules: SharedDashboardSchedule[];
  isTicketed?: boolean;
  ticketTypes?: TicketType[];
  purchases?: TicketPurchase[];
}

function makeCategory(name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return {
    id: `cat-${slug || 'general'}`,
    name: name.toLowerCase(),
    slug: slug || 'general',
  };
}

function mapCategoryNames(names: string[]) {
  return names.map((raw) => {
    const name = raw.trim();
    const found = categories.find(
      (c) => c.name.toLowerCase() === name.toLowerCase() || c.slug.toLowerCase() === name.toLowerCase()
    );
    return found ?? makeCategory(name);
  });
}

function mapSchedules(event: SharedDashboardEvent, fallback: EventWithDetails | undefined) {
  if (event.schedules.length === 0) {
    return fallback?.schedule_entries ?? [];
  }

  const locationName = (entry: SharedDashboardSchedule) =>
    entry.buildingName
      ? entry.roomName
        ? `${entry.buildingName} — ${entry.roomName}`
        : entry.buildingName
      : entry.locationName;

  return [...event.schedules]
    .sort((a, b) => a.order - b.order)
    .map((entry, index) => {
      const name = locationName(entry);
      return {
        id: `${event.id}-schedule-${index}`,
        event_id: event.id,
        location_id: entry.locationId,
        scheduled_at: entry.scheduledAt,
        is_end_schedule: entry.isEnd,
        schedule_order: entry.order ?? index,
        location: name
          ? {
              id: entry.locationId ?? `${event.id}-location-${index}`,
              name,
              street: null,
              postcode: null,
              google_maps_url: entry.buildingGoogleMapsUrl ?? entry.locationGoogleMapsUrl ?? null,
            }
          : null,
      };
    });
}

function dashboardToMobileEvents(
  sharedEvents: SharedDashboardEvent[],
  fallbackEvents: EventWithDetails[]
): EventWithDetails[] {
  const byId = new Map(fallbackEvents.map((e) => [e.id, e]));

  return sharedEvents.map((event, index) => {
    const fallback = byId.get(event.id);
    const mappedCategories = mapCategoryNames(event.categories ?? []);
    const primaryCategory =
      mappedCategories[0] ??
      fallback?.category ??
      categories[0] ??
      makeCategory('general');

    return {
      id: event.id,
      name: event.title,
      description: event.description ?? '',
      registration_url: event.registrationUrl,
      source_post_url: fallback?.source_post_url ?? null,
      like_count: event.likes,
      attend_count: event.attending,
      created_at: event.date ?? fallback?.created_at ?? new Date().toISOString(),
      category: primaryCategory,
      categories: mappedCategories.length > 0 ? mappedCategories : [primaryCategory],
      societies:
        fallback?.societies && fallback.societies.length > 0
          ? fallback.societies
          : [societies[index % societies.length]],
      images:
        fallback?.images && fallback.images.length > 0
          ? fallback.images
          : event.imageUrl
            ? [{ id: `${event.id}-image-0`, full_url: event.imageUrl, small_url: event.imageUrl }]
            : [],
      schedule_entries: mapSchedules(event, fallback),
      ticketTypes: event.isTicketed ? event.ticketTypes : undefined,
      isLiked: fallback?.isLiked ?? false,
      isAttending: fallback?.isAttending ?? false,
    };
  });
}

function loadSharedEvents(fallbackEvents: EventWithDetails[]): EventWithDetails[] {
  if (typeof window === 'undefined') return fallbackEvents;
  try {
    const raw = localStorage.getItem(SHARED_EVENTS_STORAGE_KEY);
    if (!raw) return fallbackEvents;
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return fallbackEvents;
    return dashboardToMobileEvents(parsed as SharedDashboardEvent[], fallbackEvents);
  } catch {
    return fallbackEvents;
  }
}

function loadInteractions(): Record<string, { isLiked: boolean; isAttending: boolean }> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function saveInteractions(events: EventWithDetails[]) {
  if (typeof window === 'undefined') return;
  const interactions: Record<string, { isLiked: boolean; isAttending: boolean }> = {};
  for (const e of events) {
    if (e.isLiked || e.isAttending) {
      interactions[e.id] = { isLiked: e.isLiked, isAttending: e.isAttending };
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(interactions));
}

function hydrateEvents(base: EventWithDetails[]): EventWithDetails[] {
  const interactions = loadInteractions();
  return base.map(e => {
    const saved = interactions[e.id];
    if (saved) {
      return { ...e, isLiked: saved.isLiked, isAttending: saved.isAttending };
    }
    return e;
  });
}

export function EventStoreProvider({ children }: { children: React.ReactNode }) {
  // Start with mock data (server-safe), then hydrate from localStorage in useEffect
  const [events, setEvents] = useState<EventWithDetails[]>(mockEvents);

  // Hydrate from localStorage after mount to avoid SSR/client mismatch
  useEffect(() => {
    setEvents(hydrateEvents(loadSharedEvents(mockEvents)));
  }, []);

  useEffect(() => {
    saveInteractions(events);
  }, [events]);

  useEffect(() => {
    const onStorage = (evt: StorageEvent) => {
      if (evt.key !== SHARED_EVENTS_STORAGE_KEY) return;
      const nextBase = loadSharedEvents(mockEvents);
      setEvents(hydrateEvents(nextBase));
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggleLike = useCallback((id: string) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === id
          ? {
              ...e,
              isLiked: !e.isLiked,
              like_count: e.isLiked ? e.like_count - 1 : e.like_count + 1,
            }
          : e
      )
    );
  }, []);

  const toggleAttending = useCallback((id: string) => {
    setEvents(prev =>
      prev.map(e =>
        e.id === id
          ? {
              ...e,
              isAttending: !e.isAttending,
              attend_count: e.isAttending ? e.attend_count - 1 : e.attend_count + 1,
            }
          : e
      )
    );
  }, []);

  const getEvent = useCallback(
    (id: string) => events.find(e => e.id === id),
    [events]
  );

  const likedEvents = events.filter(e => e.isLiked);
  const attendingEvents = events.filter(e => e.isAttending);

  return (
    <EventStoreContext.Provider
      value={{ events, likedEvents, attendingEvents, toggleLike, toggleAttending, getEvent }}
    >
      {children}
    </EventStoreContext.Provider>
  );
}

export function useEventStore() {
  const ctx = useContext(EventStoreContext);
  if (!ctx) throw new Error('useEventStore must be used within EventStoreProvider');
  return ctx;
}
