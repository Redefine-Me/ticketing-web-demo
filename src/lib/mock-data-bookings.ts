import type {
  UniversityBuilding,
  NonUniversityVenue,
  Booking,
  RoomAvailabilitySlot,
} from "./supabase/types";

// ── University Buildings (real UoM) ──────────────────────────

export const universityBuildings: UniversityBuilding[] = [
  {
    id: "b-001",
    name: "Students' Union",
    address: "Oxford Road, Manchester M13 9PR",
    rooms: [
      { id: "r-001", name: "B1", capacity: 120 },
      { id: "r-002", name: "Bar One", capacity: 80 },
      { id: "r-003", name: "Meeting Room 1", capacity: 20 },
    ],
  },
  {
    id: "b-002",
    name: "University Place",
    address: "176 Oxford Road, Manchester M13 9QQ",
    rooms: [
      { id: "r-004", name: "Theatre A", capacity: 250 },
      { id: "r-005", name: "Theatre B", capacity: 150 },
      { id: "r-006", name: "Room 3.204", capacity: 40 },
      { id: "r-007", name: "Room 4.205", capacity: 60 },
    ],
  },
  {
    id: "b-003",
    name: "Samuel Alexander Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-008", name: "Lecture Theatre A", capacity: 200 },
      { id: "r-009", name: "Room A113", capacity: 35 },
    ],
  },
  {
    id: "b-005",
    name: "Roscoe Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-010", name: "Room 1.009", capacity: 50 },
      { id: "r-011", name: "Room 2.003", capacity: 30 },
    ],
  },
  {
    id: "b-008",
    name: "Kilburn Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-012", name: "LF15", capacity: 80 },
      { id: "r-013", name: "LF31", capacity: 40 },
      { id: "r-014", name: "Tootill 1", capacity: 200 },
      { id: "r-015", name: "LF25", capacity: 50 },
      { id: "r-016", name: "Collab 1", capacity: 30 },
    ],
  },
  {
    id: "b-009",
    name: "Alan Turing Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-017", name: "Frank Adams 1", capacity: 250 },
      { id: "r-018", name: "Frank Adams 2", capacity: 100 },
      { id: "r-019", name: "Room G.205", capacity: 30 },
    ],
  },
  {
    id: "b-010",
    name: "Engineering Building A",
    address: "Booth Street East, Manchester M13 9QS",
    rooms: [
      { id: "r-020", name: "Lecture Theatre C", capacity: 180 },
      { id: "r-021", name: "Room C16", capacity: 40 },
    ],
  },
  {
    id: "b-011",
    name: "Stopford Building",
    address: "Oxford Road, Manchester M13 9PT",
    rooms: [
      { id: "r-022", name: "Lecture Theatre 1", capacity: 300 },
      { id: "r-023", name: "Room 2.018", capacity: 50 },
    ],
  },
];

// ── Non-University Venues (real Manchester venues) ───────────

export const nonUniversityVenues: NonUniversityVenue[] = [
  {
    id: "v-001",
    name: "Kro Bar",
    address: "325 Oxford Road, Manchester M13 9PG",
    phone: "0161 274 3100",
    website: "https://www.kro.co.uk",
    description: "Independent bar and kitchen on Oxford Road. Function room available for private events, capacity 60.",
  },
  {
    id: "v-002",
    name: "Font Bar",
    address: "7-9 New Wakefield Street, Manchester M1 5NP",
    phone: "0161 236 0944",
    website: "https://www.fontbar.com",
    description: "Quirky cocktail bar near Oxford Road station. Downstairs area available for private hire, capacity 40.",
  },
  {
    id: "v-003",
    name: "Deaf Institute",
    address: "135 Grosvenor Street, Manchester M1 7HE",
    phone: "0161 276 9350",
    website: "https://www.thedeafinstitute.co.uk",
    description: "Music venue and bar in a converted institute building. Upstairs venue space seats 200.",
  },
  {
    id: "v-004",
    name: "Texture MCR",
    address: "10 Tib Lane, Manchester M2 4JB",
    phone: "0161 819 1010",
    website: "https://www.texturemcr.co.uk",
    description: "City centre bar and kitchen. Private dining room for 20, full venue hire for up to 120.",
  },
  {
    id: "v-005",
    name: "Whitworth Hall",
    address: "University of Manchester, Oxford Road, Manchester M13 9PL",
    phone: "0161 306 4006",
    website: "https://www.conference.manchester.ac.uk/venues/whitworth-hall",
    description: "Historic university hall. Available for large formal events. Capacity 700 standing, 350 seated.",
  },
  {
    id: "v-006",
    name: "256 Wilmslow Road",
    address: "256 Wilmslow Road, Manchester M14 6LB",
    phone: "0161 248 0256",
    website: "https://www.256.com",
    description: "Student bar and venue in Fallowfield. Main room capacity 200, function room capacity 50.",
  },
  {
    id: "v-007",
    name: "Kimpton Clocktower Hotel",
    address: "Oxford Street, Manchester M60 7HA",
    phone: "0161 835 9929",
    website: "https://www.kimptonclocktowerhotel.com",
    description: "Upscale hotel in the city centre. Ballroom capacity 500. Formal dining and event packages.",
  },
  {
    id: "v-008",
    name: "Impossible Manchester",
    address: "36 Peter Street, Manchester M2 5QR",
    phone: "0161 835 2526",
    website: "https://www.impossiblemanchester.com",
    description: "Multi-level bar, restaurant and live entertainment venue in the city centre. Capacity 600 across multiple floors.",
  },
];

// ── Lookup helpers ───────────────────────────────────────────

/** Combined building option for the location combobox dropdown. */
export interface BuildingOption {
  id: string;
  name: string;
  type: "university" | "non-university";
  google_maps_url: string | null;
}

export function getAllBuildingOptions(): BuildingOption[] {
  const uni: BuildingOption[] = universityBuildings.map((b) => ({
    id: b.id,
    name: b.name,
    type: "university",
    google_maps_url: null,
  }));
  const nonUni: BuildingOption[] = nonUniversityVenues.map((v) => ({
    id: v.id,
    name: v.name,
    type: "non-university",
    google_maps_url: null,
  }));
  return [...uni, ...nonUni];
}

export function findBuilding(id: string) {
  return universityBuildings.find((b) => b.id === id);
}

export function findVenue(id: string) {
  return nonUniversityVenues.find((v) => v.id === id);
}

export function isUniversityBuilding(id: string): boolean {
  return universityBuildings.some((b) => b.id === id);
}

// Also map existing mock-data building IDs to the venue list
// b-004 = "256 Wilmslow Road", b-006 = "Kimpton Clocktower Hotel", b-007 = "Kro Bar"
const legacyVenueMap: Record<string, string> = {
  "b-004": "v-006", // 256 Wilmslow Road
  "b-006": "v-007", // Kimpton Clocktower Hotel
  "b-007": "v-001", // Kro Bar
};

export function resolveVenueFromBuildingId(buildingId: string) {
  const venueId = legacyVenueMap[buildingId];
  return venueId ? findVenue(venueId) : null;
}

// ── Mock Bookings ────────────────────────────────────────────

export const mockBookings: Booking[] = [
  // e-002: The Simpsons Movie Screening — university booking at University Place Theatre A
  {
    id: "bk-001",
    type: "university",
    eventId: "e-002",
    scheduleIndex: 0,
    buildingId: "b-002",
    buildingName: "University Place",
    roomId: "r-004",
    roomName: "Theatre A",
    expectedAttendees: 64,
    status: "accepted",
    createdAt: "2025-09-20T10:00:00Z",
    messages: [
      {
        id: "m-001",
        sender: "you",
        senderName: "You",
        message: "Hi, we'd like to book Theatre A in University Place for our Simpsons Movie Screening on October 10, 7pm-9:30pm. Expecting around 64 attendees. We'll need the projector and sound system.",
        sentAt: "2025-09-20T10:30:00Z",
      },
      {
        id: "m-002",
        sender: "university",
        senderName: "University Timetabling",
        message: "Hello, Theatre A is available for that date. I've confirmed the booking. Ref: TB-2025-0891. AV equipment included.",
        sentAt: "2025-09-21T14:15:00Z",
      },
    ],
  },
  // e-003: Treehouse of Horror Marathon — university booking at Samuel Alexander
  {
    id: "bk-002",
    type: "university",
    eventId: "e-003",
    scheduleIndex: 0,
    buildingId: "b-003",
    buildingName: "Samuel Alexander Building",
    roomId: "r-008",
    roomName: "Lecture Theatre A",
    expectedAttendees: 73,
    status: "accepted",
    createdAt: "2025-10-05T09:00:00Z",
    messages: [
      {
        id: "m-003",
        sender: "you",
        senderName: "You",
        message: "Could we book Lecture Theatre A in Samuel Alexander for October 30, 6:30pm-11pm? It's our Treehouse of Horror marathon — expecting around 73 people.",
        sentAt: "2025-10-05T09:30:00Z",
      },
      {
        id: "m-004",
        sender: "university",
        senderName: "University Timetabling",
        message: "Confirmed for October 30, 18:30-23:00. Booking ref: TB-2025-0934. Please note the building closes at 11pm so the room must be cleared by then.",
        sentAt: "2025-10-06T10:00:00Z",
      },
      {
        id: "m-005",
        sender: "you",
        senderName: "You",
        message: "Perfect, we'll have everyone out by 11. Thanks!",
        sentAt: "2025-10-06T11:30:00Z",
      },
    ],
  },
  // e-004: Simpsons Trivia Night — non-university booking at 256 Wilmslow Road
  {
    id: "bk-003",
    type: "non-university",
    eventId: "e-004",
    scheduleIndex: 0,
    venueId: "v-006",
    venueName: "256 Wilmslow Road",
    phone: "0161 248 0256",
    website: "https://www.256.com",
    description: "Student bar and venue in Fallowfield. Main room capacity 200, function room capacity 50.",
    status: "accepted",
    createdAt: "2025-10-25T14:00:00Z",
    messages: [
      {
        id: "m-006",
        sender: "you",
        senderName: "You",
        message: "Called 256 to enquire about function room for Nov 14 trivia night. Spoke to manager — room available, capacity 60.",
        sentAt: "2025-10-25T14:00:00Z",
      },
      {
        id: "m-007",
        sender: "you",
        senderName: "You",
        message: "Confirmed function room booking. 7:30pm start, can access from 7pm for setup. Individual payments at the bar.",
        sentAt: "2025-10-26T11:15:00Z",
      },
      {
        id: "m-008",
        sender: "you",
        senderName: "You",
        message: "All confirmed. Quiz screens will be set up by venue. We just need to bring the question sheets.",
        sentAt: "2025-10-27T10:00:00Z",
      },
    ],
  },
  // e-009: American Studies Spring Ball — non-university booking at Kimpton Clocktower
  {
    id: "bk-004",
    type: "non-university",
    eventId: "e-009",
    scheduleIndex: 0,
    venueId: "v-007",
    venueName: "Kimpton Clocktower Hotel",
    phone: "0161 835 9929",
    website: "https://www.kimptonclocktowerhotel.com",
    description: "Upscale hotel in the city centre. Ballroom capacity 500. Formal dining and event packages.",
    status: "pending",
    createdAt: "2026-01-10T09:00:00Z",
    messages: [
      {
        id: "m-010",
        sender: "you",
        senderName: "You",
        message: "Emailed Kimpton events team to enquire about ballroom hire for Spring Ball on March 14. ~200 guests, formal dinner + DJ.",
        sentAt: "2026-01-10T09:00:00Z",
      },
      {
        id: "m-011",
        sender: "you",
        senderName: "You",
        message: "Received events brochure from Kimpton. Minimum spend £5,000 for Saturday evening ballroom hire. Within our budget.",
        sentAt: "2026-01-13T14:30:00Z",
      },
      {
        id: "m-012",
        sender: "you",
        senderName: "You",
        message: "Scheduled a call with their events coordinator for Wed Jan 22 at 2pm to discuss packages and confirm.",
        sentAt: "2026-01-15T10:15:00Z",
      },
    ],
  },
  // e-007: Simpsons vs Family Guy Debate Night — university booking at Roscoe Building, pending
  {
    id: "bk-005",
    type: "university",
    eventId: "e-007",
    scheduleIndex: 0,
    buildingId: "b-005",
    buildingName: "Roscoe Building",
    roomId: "r-010",
    roomName: "Room 1.009",
    expectedAttendees: 47,
    status: "pending",
    createdAt: "2026-01-05T13:00:00Z",
    messages: [
      {
        id: "m-013",
        sender: "you",
        senderName: "You",
        message: "Hi, could we book Room 1.009 in the Roscoe Building for January 22, 7pm-9pm? It's a debate night, expecting about 47 attendees.",
        sentAt: "2026-01-05T13:00:00Z",
      },
      {
        id: "m-014",
        sender: "university",
        senderName: "University Timetabling",
        message: "Room 1.009 has a provisional booking for that slot. I'll check if it can be moved and get back to you by end of week.",
        sentAt: "2026-01-06T11:00:00Z",
      },
    ],
  },
  // e-010: End of Year Simpsons Movie Night — university booking at University Place, rejected
  {
    id: "bk-006",
    type: "university",
    eventId: "e-010",
    scheduleIndex: 0,
    buildingId: "b-002",
    buildingName: "University Place",
    roomId: "r-004",
    roomName: "Theatre A",
    expectedAttendees: 29,
    status: "rejected",
    createdAt: "2026-03-15T09:30:00Z",
    messages: [
      {
        id: "m-015",
        sender: "you",
        senderName: "You",
        message: "Hi, could we book Theatre A for April 3, 7pm-9:30pm? End of year movie screening for about 30 students.",
        sentAt: "2026-03-15T09:30:00Z",
      },
      {
        id: "m-016",
        sender: "university",
        senderName: "University Timetabling",
        message: "Unfortunately Theatre A is booked for a departmental event on April 3 from 5pm-10pm. Would Theatre B work instead? It has capacity for 150.",
        sentAt: "2026-03-16T15:00:00Z",
      },
      {
        id: "m-017",
        sender: "you",
        senderName: "You",
        message: "Theatre B would work! Can we switch the booking to that?",
        sentAt: "2026-03-17T10:00:00Z",
      },
      {
        id: "m-018",
        sender: "university",
        senderName: "University Timetabling",
        message: "I'm sorry, Theatre B is also booked that evening for a postgraduate seminar. I'd suggest trying the Samuel Alexander Building — Lecture Theatre A may be available. Please submit a new request for that room.",
        sentAt: "2026-03-18T09:00:00Z",
      },
    ],
  },
];

// ── Mock Room Availability ───────────────────────────────────

export const mockAvailability: Record<string, RoomAvailabilitySlot[]> = {
  // University Place, Theatre A — week of 2025-10-06 (around Simpsons Movie Screening)
  "b-002_r-004": [
    { date: "2025-10-06", startTime: "09:00", endTime: "11:00", status: "booked", bookedBy: "Dept. of Politics — Lecture" },
    { date: "2025-10-06", startTime: "11:00", endTime: "13:00", status: "free" },
    { date: "2025-10-06", startTime: "13:00", endTime: "15:00", status: "booked", bookedBy: "Dept. of Economics — Seminar" },
    { date: "2025-10-06", startTime: "15:00", endTime: "21:00", status: "free" },
    { date: "2025-10-07", startTime: "09:00", endTime: "12:00", status: "booked", bookedBy: "Dept. of History — Lecture" },
    { date: "2025-10-07", startTime: "12:00", endTime: "14:00", status: "free" },
    { date: "2025-10-07", startTime: "14:00", endTime: "17:00", status: "booked", bookedBy: "Dept. of Languages — Exam" },
    { date: "2025-10-07", startTime: "17:00", endTime: "21:00", status: "free" },
    { date: "2025-10-08", startTime: "09:00", endTime: "21:00", status: "free" },
    { date: "2025-10-09", startTime: "09:00", endTime: "11:00", status: "free" },
    { date: "2025-10-09", startTime: "11:00", endTime: "13:00", status: "booked", bookedBy: "Dept. of Sociology — Workshop" },
    { date: "2025-10-09", startTime: "13:00", endTime: "21:00", status: "free" },
    { date: "2025-10-10", startTime: "09:00", endTime: "17:00", status: "free" },
    { date: "2025-10-10", startTime: "19:00", endTime: "21:30", status: "mine", bookedBy: "Your event: The Simpsons Movie Screening" },
    { date: "2025-10-11", startTime: "09:00", endTime: "21:00", status: "free" },
    { date: "2025-10-12", startTime: "09:00", endTime: "21:00", status: "free" },
  ],
  // Samuel Alexander, Lecture Theatre A
  "b-003_r-008": [
    { date: "2025-10-27", startTime: "09:00", endTime: "11:00", status: "booked", bookedBy: "Dept. of Philosophy — Lecture" },
    { date: "2025-10-27", startTime: "11:00", endTime: "21:00", status: "free" },
    { date: "2025-10-28", startTime: "09:00", endTime: "12:00", status: "free" },
    { date: "2025-10-28", startTime: "12:00", endTime: "14:00", status: "booked", bookedBy: "Dept. of English — Seminar" },
    { date: "2025-10-28", startTime: "14:00", endTime: "21:00", status: "free" },
    { date: "2025-10-30", startTime: "09:00", endTime: "16:00", status: "free" },
    { date: "2025-10-30", startTime: "18:30", endTime: "23:00", status: "mine", bookedBy: "Your event: Treehouse of Horror Marathon" },
  ],
  // Roscoe Building, Room 1.009
  "b-005_r-010": [
    { date: "2026-01-19", startTime: "09:00", endTime: "11:00", status: "booked", bookedBy: "Dept. of Physics — Lab" },
    { date: "2026-01-19", startTime: "11:00", endTime: "21:00", status: "free" },
    { date: "2026-01-20", startTime: "09:00", endTime: "21:00", status: "free" },
    { date: "2026-01-21", startTime: "09:00", endTime: "15:00", status: "booked", bookedBy: "Dept. of Maths — Tutorials" },
    { date: "2026-01-21", startTime: "15:00", endTime: "21:00", status: "free" },
    { date: "2026-01-22", startTime: "09:00", endTime: "17:00", status: "free" },
    { date: "2026-01-22", startTime: "19:00", endTime: "21:00", status: "mine", bookedBy: "Your event: Simpsons vs Family Guy Debate Night" },
  ],
};
