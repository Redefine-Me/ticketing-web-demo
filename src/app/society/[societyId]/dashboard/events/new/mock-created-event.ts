import type { ScheduleEntry } from "@/components/events/ScheduleBuilder";
import type { ImageItem } from "@/components/events/ImageUploader";
import type { TicketType } from "@/lib/supabase/types";

/** Pre-filled data for the "THEYYAM — A Night of Kerala" showcase event. */
export const mockCreatedEvent: {
  title: string;
  description: string;
  categoryIds: string[];
  schedules: ScheduleEntry[];
  isOnline: boolean;
  registrationUrl?: string;
  images?: ImageItem[];
  isTicketed: boolean;
  ticketTypes: TicketType[];
} = {
  title: "THEYYAM — A Night of Kerala",
  description:
    "THE WAIT IS OVER 🔥🔥🔥\n\n" +
    "THEYYAM — A Night of Kerala is pulling up and it's going to be UNREAL 🫶🏽💫\n\n" +
    "We're starting things off at Uni Place with live performances, traditional dance, spoken word " +
    "and a whole cultural showcase that's gonna leave you speechless fr 😭✨ then we're moving the " +
    "vibes to Impossible for food, drinks and the afterparty because why would we stop there 😏🍛🪩\n\n" +
    "MEMBERS: £3 (you already know the perks 🤷🏽‍♀️)\n" +
    "NON-MEMBERS: £6\n\n" +
    "Tickets selling FAST so don't sleep on this one‼️‼️\n\n" +
    "📍 University Place → Impossible Manchester\n" +
    "📅 Saturday 11th April\n" +
    "🕖 7PM - 12AM",
  categoryIds: [
    "34b90440-c42d-443a-a45b-ecfc4751bb18", // cultural
    "a0c1db2b-ac6f-4192-a06e-00b5411a46e7", // music
    "13c25d72-1dcf-4417-9d74-ce94ac17805e", // social
  ],
  schedules: [
    {
      date: "2026-04-11",
      startTime: "19:00",
      endTime: "21:30",
      buildingName: "University Place",
      roomName: "Lecture Theatre A",
      description: "Cultural showcase — live performances, traditional dance, spoken word, and music",
    },
    {
      date: "2026-04-11",
      startTime: "21:30",
      endTime: "00:00",
      buildingName: "Impossible Manchester",
      roomName: "",
      description: "Afterparty — Kerala street food, drinks, music, and dancing",
    },
  ],
  isOnline: false,
  isTicketed: true,
  ticketTypes: [
    {
      id: "tt-theyyam-member",
      eventId: "evt-theyyam",
      name: "Member Ticket",
      price: 3,
      isMemberTicket: true,
      totalAvailable: 150,
    },
    {
      id: "tt-theyyam-nonmember",
      eventId: "evt-theyyam",
      name: "Non-Member Ticket",
      price: 6,
      isMemberTicket: false,
      totalAvailable: 100,
    },
  ],
};
