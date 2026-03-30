'use client';

import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import { TicketType, TicketPurchase, TicketedEventSummary, EventWithDetails } from '@/types';
import { mockTicketTypes, mockPurchases, ticketedEventIds } from '@/lib/mock-ticket-data';
import { getEventDate, getEventImageUrl } from '@/lib/helpers';
import { useEventStore } from '@/context/EventStore';

function buildSummary(
  event: EventWithDetails,
  ticketTypes: TicketType[],
  purchases: TicketPurchase[],
): TicketedEventSummary {
  const eventTicketTypes = ticketTypes.filter(tt => tt.eventId === event.id);
  const eventPurchases = purchases.filter(p => p.eventId === event.id);

  let totalRevenue = 0;
  let totalSold = 0;
  let totalAvailable = 0;

  for (const tt of eventTicketTypes) {
    const soldCount = eventPurchases.filter(p => p.ticketTypeId === tt.id).length;
    totalRevenue += soldCount * tt.price;
    totalSold += soldCount;
    totalAvailable += tt.totalAvailable;
  }

  const date = getEventDate(event);

  return {
    eventId: event.id,
    eventTitle: event.name,
    eventDate: date ? date.toISOString() : null,
    eventDescription: event.description ?? '',
    eventImageUrl: getEventImageUrl(event),
    ticketTypes: eventTicketTypes,
    purchases: eventPurchases,
    totalRevenue,
    totalSold,
    totalAvailable,
  };
}

// Build initial lookup from the array
function buildInitialConfigured(): Record<string, boolean> {
  const map: Record<string, boolean> = {};
  for (const id of ticketedEventIds) {
    map[id] = true;
  }
  return map;
}

interface TicketingContextType {
  ticketedEvents: TicketedEventSummary[];
  unticketedEvents: EventWithDetails[];
  loading: boolean;
  assignTickets: (eventId: string, newTypes: Omit<TicketType, 'id' | 'eventId'>[]) => void;
  updateTickets: (eventId: string, updatedTypes: TicketType[]) => void;
  markAttended: (purchaseId: string) => void;
  unmarkAttended: (purchaseId: string) => void;
  refundPurchase: (purchaseId: string) => void;
}

const TicketingContext = createContext<TicketingContextType | null>(null);

let nextTicketTypeId = 100;
function genTicketTypeId() {
  return `tt-gen-${nextTicketTypeId++}`;
}

export function TicketingProvider({ children }: { children: React.ReactNode }) {
  const { events: allEvents } = useEventStore();
  const [ticketTypes, setTicketTypes] = useState<TicketType[]>(mockTicketTypes);
  const [purchases, setPurchases] = useState<TicketPurchase[]>(mockPurchases);
  const [configuredMap, setConfiguredMap] = useState<Record<string, boolean>>(buildInitialConfigured);
  const [loading] = useState(false);

  const ticketedEvents = useMemo(() =>
    allEvents
      .filter(e => configuredMap[e.id])
      .map(e => buildSummary(e, ticketTypes, purchases)),
    [allEvents, configuredMap, ticketTypes, purchases]
  );

  const unticketedEvents = useMemo(() =>
    allEvents.filter(e => !configuredMap[e.id]),
    [allEvents, configuredMap]
  );

  const assignTickets = useCallback((eventId: string, newTypes: Omit<TicketType, 'id' | 'eventId'>[]) => {
    const created: TicketType[] = newTypes.map(t => ({
      ...t,
      id: genTicketTypeId(),
      eventId,
    }));
    setTicketTypes(prev => [...prev, ...created]);
    setConfiguredMap(prev => ({ ...prev, [eventId]: true }));
  }, []);

  const updateTickets = useCallback((eventId: string, updatedTypes: TicketType[]) => {
    setTicketTypes(prev => {
      const otherTypes = prev.filter(tt => tt.eventId !== eventId);
      return [...otherTypes, ...updatedTypes];
    });
  }, []);

  const markAttended = useCallback((purchaseId: string) => {
    setPurchases(prev =>
      prev.map(p =>
        p.id === purchaseId ? { ...p, attendedAt: new Date().toISOString() } : p
      )
    );
  }, []);

  const unmarkAttended = useCallback((purchaseId: string) => {
    setPurchases(prev =>
      prev.map(p => (p.id === purchaseId ? { ...p, attendedAt: null } : p))
    );
  }, []);

  const refundPurchase = useCallback((purchaseId: string) => {
    setPurchases(prev => prev.filter(p => p.id !== purchaseId));
  }, []);

  return (
    <TicketingContext.Provider
      value={{
        ticketedEvents,
        unticketedEvents,
        loading,
        assignTickets,
        updateTickets,
        markAttended,
        unmarkAttended,
        refundPurchase,
      }}
    >
      {children}
    </TicketingContext.Provider>
  );
}

export function useTicketing() {
  const ctx = useContext(TicketingContext);
  if (!ctx) throw new Error('useTicketing must be used within TicketingProvider');
  return ctx;
}
