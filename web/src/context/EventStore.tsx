'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { EventWithDetails } from '@/types';
import { events as mockEvents } from '@/lib/mock-data';

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
  const [events, setEvents] = useState<EventWithDetails[]>(() => hydrateEvents(mockEvents));

  useEffect(() => {
    saveInteractions(events);
  }, [events]);

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
