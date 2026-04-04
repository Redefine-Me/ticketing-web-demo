"use client";

import { createContext, useContext, useEffect } from "react";
import { useBookings } from "@/hooks/useBookings";
import { useEvents } from "@/hooks/useEvents";
import { useDashboardContext } from "@/components/dashboard/DashboardContext";

type BookingsContextValue = ReturnType<typeof useBookings>;

const BookingsContext = createContext<BookingsContextValue | null>(null);

export function BookingsProvider({ children }: { children: React.ReactNode }) {
  const { societyId } = useDashboardContext();
  const { events, fetchEvents } = useEvents(societyId);
  const bookingsValue = useBookings(events);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  useEffect(() => {
    bookingsValue.fetchBookings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BookingsContext.Provider value={bookingsValue}>
      {children}
    </BookingsContext.Provider>
  );
}

export function useBookingsContext() {
  const ctx = useContext(BookingsContext);
  if (!ctx) {
    throw new Error("useBookingsContext must be used within a BookingsProvider");
  }
  return ctx;
}
