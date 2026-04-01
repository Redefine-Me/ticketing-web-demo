"use client";

import { useState, useCallback, useMemo } from "react";
import type {
  Booking,
  BookingStatus,
  BookingMessage,
  EventBookingSummary,
  RoomAvailabilitySlot,
  DashboardEvent,
} from "@/lib/supabase/types";
import {
  mockBookings,
  mockAvailability,
  findVenue,
} from "@/lib/mock-data-bookings";

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

  // Derive event booking summaries
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

  const addUniversityBooking = useCallback(
    async (
      eventId: string,
      scheduleIndex: number,
      buildingId: string,
      buildingName: string,
      roomId: string,
      roomName: string,
      expectedAttendees: number,
    ) => {
      await new Promise((r) => setTimeout(r, 150));
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        type: "university",
        eventId,
        scheduleIndex,
        buildingId,
        buildingName,
        roomId,
        roomName,
        expectedAttendees,
        status: "pending",
        messages: [],
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => {
        const next = [...prev, newBooking];
        saveBookings(next);
        return next;
      });
    },
    [],
  );

  const addNonUniversityBooking = useCallback(
    async (eventId: string, scheduleIndex: number, venueId: string) => {
      await new Promise((r) => setTimeout(r, 150));
      const venue = findVenue(venueId);
      if (!venue) return;
      const newBooking: Booking = {
        id: `bk-${Date.now()}`,
        type: "non-university",
        eventId,
        scheduleIndex,
        venueId,
        venueName: venue.name,
        phone: venue.phone,
        website: venue.website,
        description: venue.description,
        status: "pending",
        messages: [],
        createdAt: new Date().toISOString(),
      };
      setBookings((prev) => {
        const next = [...prev, newBooking];
        saveBookings(next);
        return next;
      });
    },
    [],
  );

  const removeBooking = useCallback(async (bookingId: string) => {
    await new Promise((r) => setTimeout(r, 150));
    setBookings((prev) => {
      const next = prev.filter((b) => b.id !== bookingId);
      saveBookings(next);
      return next;
    });
  }, []);

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

  const getRoomAvailability = useCallback(
    (buildingId: string, roomId: string): RoomAvailabilitySlot[] => {
      const key = `${buildingId}_${roomId}`;
      return mockAvailability[key] ?? [];
    },
    [],
  );

  return {
    bookings,
    eventBookings,
    loading,
    fetchBookings,
    addUniversityBooking,
    addNonUniversityBooking,
    removeBooking,
    updateBookingStatus,
    sendMessage,
    getBookingForSchedule,
    getRoomAvailability,
  };
}
