"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  Booking,
  BookingStatus,
  BookingMessage,
  EventBookingSummary,
  DashboardEvent,
} from "@/lib/supabase/types";
import { mockBookings } from "@/lib/mock-data-bookings";

const BOOKINGS_STORAGE_KEY = "rm_dashboard_bookings_v1";

function loadBookings(): Booking[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(BOOKINGS_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as Booking[]) : null;
  } catch {
    return null;
  }
}

function saveBookings(bookings: Booking[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(bookings));
}

export function useBookings(events: DashboardEvent[]) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 200));
    const stored = loadBookings();
    const data = stored ?? mockBookings;
    setBookings(data);
    if (!stored) saveBookings(data);
    setLoading(false);
  }, []);

  const eventBookings = useMemo<EventBookingSummary[]>(() => {
    const eventsWithBookings = events.filter((e) =>
      bookings.some((b) => b.eventId === e.id)
    );
    return eventsWithBookings.map((event) => {
      const eventBks = bookings.filter((b) => b.eventId === event.id);
      const statusCounts = { pending: 0, accepted: 0, rejected: 0 };
      eventBks.forEach((b) => { statusCounts[b.status]++; });
      return {
        eventId: event.id,
        eventTitle: event.title,
        eventDate: event.date,
        schedules: event.schedules,
        bookings: eventBks,
        statusCounts,
      };
    });
  }, [events, bookings]);

  const updateBookingStatus = useCallback(
    (bookingId: string, status: BookingStatus) => {
      setBookings((prev) => {
        const next = prev.map((b) =>
          b.id === bookingId ? { ...b, status } : b,
        );
        saveBookings(next);
        return next;
      });
    },
    [],
  );

  const sendMessage = useCallback((bookingId: string, message: string) => {
    const newMsg: BookingMessage = {
      id: `m-${Date.now()}`,
      sender: "you",
      senderName: "You",
      message,
      sentAt: new Date().toISOString(),
    };
    setBookings((prev) => {
      const next = prev.map((b) =>
        b.id === bookingId
          ? { ...b, messages: [...b.messages, newMsg] }
          : b,
      );
      saveBookings(next);
      return next;
    });
  }, []);

  const getBookingForSchedule = useCallback(
    (eventId: string, scheduleIndex: number): Booking | null => {
      return bookings.find(
        (b) => b.eventId === eventId && b.scheduleIndex === scheduleIndex,
      ) ?? null;
    },
    [bookings],
  );

  return {
    bookings,
    eventBookings,
    loading,
    fetchBookings,
    updateBookingStatus,
    sendMessage,
    getBookingForSchedule,
  };
}
