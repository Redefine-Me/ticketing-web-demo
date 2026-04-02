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
    id: "b-020",
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
    id: "b-021",
    name: "Alan Turing Building",
    address: "Oxford Road, Manchester M13 9PL",
    rooms: [
      { id: "r-017", name: "Frank Adams 1", capacity: 250 },
      { id: "r-018", name: "Frank Adams 2", capacity: 100 },
      { id: "r-019", name: "Room G.205", capacity: 30 },
    ],
  },
  {
    id: "b-022",
    name: "Engineering Building A",
    address: "Booth Street East, Manchester M13 9QS",
    rooms: [
      { id: "r-020", name: "Lecture Theatre C", capacity: 180 },
      { id: "r-021", name: "Room C16", capacity: 40 },
    ],
  },
  {
    id: "b-023",
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
  {
    id: "v-009",
    name: "Armitage Sports Centre",
    address: "Fallowfield, Manchester M14 6FS",
    phone: "0161 275 4960",
    website: "https://www.sport.manchester.ac.uk",
    description: "UoM sports centre in Fallowfield with outdoor pitches, gym, and sports halls. Pitch hire available for student societies.",
  },
  {
    id: "v-010",
    name: "Bierkeller Manchester",
    address: "The Printworks, 27 Withy Grove, Manchester M4 2BS",
    phone: "0161 839 0845",
    website: "https://www.bierkeller.com/manchester",
    description: "Bavarian-themed bar in The Printworks with long tables, live music, and private event hire. Capacity 300.",
  },
  {
    id: "v-011",
    name: "Platt Fields Park",
    address: "Wilmslow Road, Fallowfield, Manchester M14 6LA",
    phone: "0161 224 2902",
    website: "https://www.manchester.gov.uk/plattfields",
    description: "Public park in Fallowfield with cricket pitches, football pitches, and a lake. Free to use for informal events, permit required for large gatherings.",
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

// Map event building IDs (from mock-data.ts) to the correct non-university venue
const legacyVenueMap: Record<string, string> = {
  "b-004": "v-006", // 256 Wilmslow Road
  "b-006": "v-007", // Kimpton Clocktower Hotel
  "b-007": "v-001", // Kro Bar
  "b-008": "v-009", // Armitage Sports Centre
  "b-009": "v-010", // Bierkeller Manchester
  "b-010": "v-011", // Platt Fields Park
  "b-011": "v-005", // Whitworth Hall
};

export function resolveVenueFromBuildingId(buildingId: string) {
  const venueId = legacyVenueMap[buildingId];
  return venueId ? findVenue(venueId) : null;
}

// ── Mock Bookings ────────────────────────────────────────────

export const mockBookings: Booking[] = [
  // ── University venue bookings ──────────────────────────────

  // e-001: Freshers Chai & Chill — Students' Union
  {
    id: "bk-001",
    type: "university",
    eventId: "e-001",
    scheduleIndex: 0,
    buildingId: "b-001",
    buildingName: "Students' Union",
    roomId: "r-001",
    roomName: "B1",
    expectedAttendees: 94,
    status: "accepted",
    createdAt: "2025-09-10T09:00:00Z",
    messages: [
      {
        id: "m-001",
        sender: "you",
        senderName: "You",
        message: "Hi, we'd like to book Room 1 (ground floor) in the SU for our Freshers Chai & Chill on September 25, 6pm-8:30pm. Expecting around 90 freshers.",
        sentAt: "2025-09-10T09:00:00Z",
      },
      {
        id: "m-002",
        sender: "university",
        senderName: "SU Room Bookings",
        message: "Room 1 is confirmed for September 25, 18:00-20:30. Ref: SU-2025-0134. Tea/coffee facilities available in the kitchen next door.",
        sentAt: "2025-09-11T10:00:00Z",
      },
    ],
  },
  // e-002: Onam Sadhya Night — Samuel Alexander Building
  {
    id: "bk-002",
    type: "university",
    eventId: "e-002",
    scheduleIndex: 0,
    buildingId: "b-003",
    buildingName: "Samuel Alexander Building",
    roomId: "r-009",
    roomName: "Room A113",
    expectedAttendees: 120,
    status: "accepted",
    createdAt: "2025-09-20T10:00:00Z",
    messages: [
      {
        id: "m-003",
        sender: "you",
        senderName: "You",
        message: "Hi, we'd like to book Room A101 in the Samuel Alexander Building for our Onam Sadhya Night on October 11, 6:30pm-10pm. It's a traditional feast so we'll need table space for 120 people.",
        sentAt: "2025-09-20T10:30:00Z",
      },
      {
        id: "m-004",
        sender: "university",
        senderName: "University Timetabling",
        message: "Room A101 is available. Confirmed for October 11, 18:30-22:00. Ref: TB-2025-0891. Please note food preparation must be done off-site — no cooking facilities in this room.",
        sentAt: "2025-09-21T14:15:00Z",
      },
    ],
  },
  // e-005: Kerala Film Screening — University Place, Theatre A
  {
    id: "bk-005",
    type: "university",
    eventId: "e-005",
    scheduleIndex: 0,
    buildingId: "b-002",
    buildingName: "University Place",
    roomId: "r-004",
    roomName: "Theatre A",
    expectedAttendees: 52,
    status: "pending",
    createdAt: "2025-10-28T11:00:00Z",
    messages: [
      {
        id: "m-011",
        sender: "you",
        senderName: "You",
        message: "Hi, could we book Theatre A in University Place for November 20, 7pm-9:30pm? We're screening a Kerala film with subtitles — expecting around 50 students. We'll need the projector and sound system.",
        sentAt: "2025-10-28T11:00:00Z",
      },
      {
        id: "m-012",
        sender: "university",
        senderName: "University Timetabling",
        message: "Theatre A has a provisional hold for a departmental event that evening. I'll confirm availability by end of week.",
        sentAt: "2025-10-29T09:30:00Z",
      },
    ],
  },
  // e-007: New Year New Soc — Welcome Back — Students' Union
  {
    id: "bk-007",
    type: "university",
    eventId: "e-007",
    scheduleIndex: 0,
    buildingId: "b-001",
    buildingName: "Students' Union",
    roomId: "r-003",
    roomName: "Meeting Room 1",
    expectedAttendees: 88,
    status: "accepted",
    createdAt: "2026-01-05T13:00:00Z",
    messages: [
      {
        id: "m-015",
        sender: "you",
        senderName: "You",
        message: "Hi, could we book Room 4 in the SU for January 22, 6pm-8pm? It's our Welcome Back event for semester 2, expecting around 88 people.",
        sentAt: "2026-01-05T13:00:00Z",
      },
      {
        id: "m-016",
        sender: "university",
        senderName: "SU Room Bookings",
        message: "Room 4 is available. Booking confirmed for Jan 22, 18:00-20:00. Ref: SU-2026-0018.",
        sentAt: "2026-01-06T11:00:00Z",
      },
    ],
  },
  // e-008: Blind Date Night — University Place, Theatre B
  {
    id: "bk-008",
    type: "university",
    eventId: "e-008",
    scheduleIndex: 0,
    buildingId: "b-002",
    buildingName: "University Place",
    roomId: "r-005",
    roomName: "Theatre B",
    expectedAttendees: 110,
    status: "accepted",
    createdAt: "2026-01-20T14:00:00Z",
    messages: [
      {
        id: "m-017",
        sender: "you",
        senderName: "You",
        message: "Hi, we'd like to book Theatre B in University Place for February 13, 7pm-10pm. It's a collab blind date event with Tamil Soc and Gujju Soc — expecting around 110 people. We'll need a mic and the projector.",
        sentAt: "2026-01-20T14:00:00Z",
      },
      {
        id: "m-018",
        sender: "university",
        senderName: "University Timetabling",
        message: "Theatre B is available. Booking confirmed for Feb 13, 19:00-22:00. Ref: TB-2026-0102. AV equipment included as standard.",
        sentAt: "2026-01-21T11:30:00Z",
      },
    ],
  },

  // ── Non-university venue bookings ──────────────────────────

  // e-003: Militants vs Medics Football — Armitage Sports Centre
  {
    id: "bk-003",
    type: "non-university",
    eventId: "e-003",
    scheduleIndex: 0,
    venueId: "v-009",
    venueName: "Armitage Sports Centre",
    phone: "0161 275 4960",
    website: "https://www.sport.manchester.ac.uk",
    description: "UoM sports centre in Fallowfield with outdoor pitches, gym, and sports halls. Pitch hire available for student societies.",
    status: "accepted",
    createdAt: "2025-10-10T09:00:00Z",
    messages: [
      {
        id: "m-005",
        sender: "you",
        senderName: "You",
        message: "Booked pitch 2 at Armitage for October 25, 2pm-4pm via the UoM Sport portal. Confirmation email received. No cost for SU-affiliated societies.",
        sentAt: "2025-10-10T09:00:00Z",
      },
      {
        id: "m-006",
        sender: "venue",
        senderName: "UoM Sport",
        message: "Pitch 2 confirmed for Oct 25, 14:00-16:00. Please bring your own bibs/cones. Changing rooms available from 13:30.",
        sentAt: "2025-10-11T10:00:00Z",
      },
    ],
  },
  // e-004: Diwali Rave — 256 Wilmslow Road
  {
    id: "bk-004",
    type: "non-university",
    eventId: "e-004",
    scheduleIndex: 0,
    venueId: "v-006",
    venueName: "256 Wilmslow Road",
    phone: "0161 248 0256",
    website: "https://www.256.com",
    description: "Student bar and venue in Fallowfield. Main room capacity 200, function room capacity 50.",
    status: "accepted",
    createdAt: "2025-10-15T14:00:00Z",
    messages: [
      {
        id: "m-007",
        sender: "you",
        senderName: "You",
        message: "Called 256 to enquire about main room hire for Nov 1 Diwali Rave. Collab with Tamil Soc MCR. Spoke to manager — available, capacity 200.",
        sentAt: "2025-10-15T14:00:00Z",
      },
      {
        id: "m-008",
        sender: "venue",
        senderName: "256 Events",
        message: "Main room confirmed for Nov 1, 9pm-2am. £500 hire fee, sound system and lighting rig included. Security provided by us.",
        sentAt: "2025-10-16T11:15:00Z",
      },
      {
        id: "m-009",
        sender: "you",
        senderName: "You",
        message: "Perfect. We'll bring our own LED sparklers and fairy lights for decoration. Setting up from 7pm if possible?",
        sentAt: "2025-10-17T10:00:00Z",
      },
      {
        id: "m-010",
        sender: "venue",
        senderName: "256 Events",
        message: "Setup from 7pm is fine. Just check in at the bar when you arrive. Looking forward to it!",
        sentAt: "2025-10-17T15:30:00Z",
      },
    ],
  },
  // e-006: Christmas Mixer — Bierkeller Manchester
  {
    id: "bk-006",
    type: "non-university",
    eventId: "e-006",
    scheduleIndex: 0,
    venueId: "v-010",
    venueName: "Bierkeller Manchester",
    phone: "0161 839 0845",
    website: "https://www.bierkeller.com/manchester",
    description: "Bavarian-themed bar in The Printworks with long tables, live music, and private event hire. Capacity 300.",
    status: "accepted",
    createdAt: "2025-11-10T10:00:00Z",
    messages: [
      {
        id: "m-013",
        sender: "you",
        senderName: "You",
        message: "Enquiring about private hire for Dec 6, 8pm-11:30pm for our Christmas Mixer collab with Gujju Soc. Expecting around 140 people.",
        sentAt: "2025-11-10T10:00:00Z",
      },
      {
        id: "m-014",
        sender: "venue",
        senderName: "Bierkeller Events",
        message: "We can do a reserved section on the mezzanine level for your group — no hire fee with a minimum bar spend of £800. Includes reserved tables and a dedicated bar area.",
        sentAt: "2025-11-11T14:00:00Z",
      },
    ],
  },
  // e-009: Militants Cricket Tournament — Platt Fields Park
  {
    id: "bk-009",
    type: "non-university",
    eventId: "e-009",
    scheduleIndex: 0,
    venueId: "v-011",
    venueName: "Platt Fields Park",
    phone: "0161 224 2902",
    website: "https://www.manchester.gov.uk/plattfields",
    description: "Public park in Fallowfield with cricket pitches, football pitches, and a lake. Free to use for informal events, permit required for large gatherings.",
    status: "accepted",
    createdAt: "2026-02-10T09:00:00Z",
    messages: [
      {
        id: "m-019",
        sender: "you",
        senderName: "You",
        message: "Applied for a parks permit for the cricket tournament on March 7, 11am-5pm at Platt Fields. Council website says 10 working days for approval.",
        sentAt: "2026-02-10T09:00:00Z",
      },
      {
        id: "m-020",
        sender: "venue",
        senderName: "Manchester City Council Parks",
        message: "Your permit for Platt Fields Park cricket pitch has been approved for March 7, 11:00-17:00. Permit ref: PFP-2026-0341. No amplified music without separate licence.",
        sentAt: "2026-02-21T10:30:00Z",
      },
    ],
  },
  // e-010: VAJRAM Annual Gala Night — Whitworth Hall
  {
    id: "bk-010",
    type: "non-university",
    eventId: "e-010",
    scheduleIndex: 0,
    venueId: "v-005",
    venueName: "Whitworth Hall",
    phone: "0161 306 4006",
    website: "https://www.conference.manchester.ac.uk/venues/whitworth-hall",
    description: "Historic university hall. Available for large formal events. Capacity 700 standing, 350 seated.",
    status: "pending",
    createdAt: "2026-01-15T09:00:00Z",
    messages: [
      {
        id: "m-021",
        sender: "you",
        senderName: "You",
        message: "Emailed UoM Conference & Events team to enquire about Whitworth Hall hire for VAJRAM 2026 on March 21. Expecting 250 guests, formal gala dinner with live performances.",
        sentAt: "2026-01-15T09:00:00Z",
      },
      {
        id: "m-022",
        sender: "venue",
        senderName: "UoM Conference & Events",
        message: "Thank you for your enquiry. Whitworth Hall is provisionally available for March 21. For a student society event of this scale we'd need to discuss catering, AV requirements, and insurance. Can we arrange a site visit?",
        sentAt: "2026-01-18T14:30:00Z",
      },
      {
        id: "m-023",
        sender: "you",
        senderName: "You",
        message: "That would be great! We're free any afternoon next week. We'll bring our event plan and technical rider.",
        sentAt: "2026-01-19T10:15:00Z",
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
