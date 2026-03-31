import type {
  SocietyAccountRow,
  SocietyRow,
  SocietyProfileRow,
  DashboardEvent,
  TicketType,
  TicketPurchase,
} from "@/lib/supabase/types";

// Mock society
export const mockSociety: SocietyRow = {
  id: "s-001",
  name: "American Studies Society",
  instagram_handle: "uomamericanstudies",
  description:
    "The American Studies Society at the University of Manchester. Film screenings, cultural events, trivia nights, and socials celebrating American culture.",
  bio_url: "https://linktr.ee/uomamericanstudies",
  university_id: "u-001",
  image_url: null,
  created_at: "2025-09-01T00:00:00Z",
  updated_at: "2026-03-01T00:00:00Z",
};

export const mockProfile: SocietyProfileRow = {
  id: "sp-001",
  society_id: "s-001",
  name: "American Studies Society",
  handle: "uomamericanstudies",
  description: mockSociety.description,
  image_url: null,
  follow_count: 312,
  event_count: 10,
  created_at: "2025-09-01T00:00:00Z",
  updated_at: "2026-03-01T00:00:00Z",
};

export const mockAccount: SocietyAccountRow = {
  id: "sa-001",
  auth_user_id: "auth-001",
  society_id: "s-001",
  approval_status: "trusted",
  created_at: "2025-09-01T00:00:00Z",
  updated_at: "2026-03-01T00:00:00Z",
};

// ── Mock ticket data ──────────────────────────────────────

const MOCK_FIRST_NAMES = ["James","Olivia","Liam","Emma","Noah","Ava","Ethan","Sophia","Mason","Isabella","Lucas","Mia","Oliver","Charlotte","Aiden","Amelia","Elijah","Harper","Logan","Evelyn","Jacob","Abigail","Michael","Emily","Daniel","Ella","Henry","Scarlett","Alexander","Grace","Sebastian","Lily","Jack","Aria","Owen","Chloe","Samuel","Zoey","Ryan","Penelope","Nathan","Layla","Leo","Riley","Adam","Nora","Dylan","Zara","Caleb","Hannah"];
const MOCK_LAST_NAMES = ["Smith","Jones","Taylor","Brown","Wilson","Evans","Thomas","Roberts","Johnson","Walker","Wright","Robinson","Thompson","White","Hughes","Edwards","Green","Hall","Lewis","Harris","Clarke","Jackson","Wood","Turner","Martin","Cooper","Hill","Ward","Morris","Moore","King","Baker","Harrison","Morgan","Allen","Young","Anderson","Mitchell","Campbell","Phillips"];

function mockPurchases(
  eventId: string,
  ticketTypeId: string,
  count: number,
  attendedCount: number,
  baseDateIso: string,
): TicketPurchase[] {
  const purchases: TicketPurchase[] = [];
  const baseDate = new Date(baseDateIso).getTime();
  for (let i = 0; i < count; i++) {
    const first = MOCK_FIRST_NAMES[i % MOCK_FIRST_NAMES.length];
    const last = MOCK_LAST_NAMES[i % MOCK_LAST_NAMES.length];
    const purchasedAt = new Date(baseDate + i * 3_600_000 * 3).toISOString();
    const attended = i < attendedCount;
    purchases.push({
      id: `tp-${eventId}-${ticketTypeId}-${i}`,
      ticketTypeId,
      eventId,
      buyerName: `${first} ${last}`,
      buyerEmail: `${first.toLowerCase()}.${last.toLowerCase()}@student.manchester.ac.uk`,
      purchasedAt,
      attendedAt: attended ? new Date(baseDate + 86_400_000 * 30 + i * 60_000).toISOString() : null,
    });
  }
  return purchases;
}

// e-004 Simpsons Trivia Night — ticket types
const triviaTicketTypes: TicketType[] = [
  { id: "tt-004-1", eventId: "e-004", name: "Member", price: 2, isMemberTicket: true, totalAvailable: 40 },
  { id: "tt-004-2", eventId: "e-004", name: "Non-Member", price: 4, isMemberTicket: false, totalAvailable: 25 },
];

const triviaPurchases: TicketPurchase[] = [
  ...mockPurchases("e-004", "tt-004-1", 36, 28, "2025-10-20T10:00:00Z"),
  ...mockPurchases("e-004", "tt-004-2", 18, 12, "2025-10-25T10:00:00Z"),
];

// e-008 Springfield Film Festival — ticket types
const festivalTicketTypes: TicketType[] = [
  { id: "tt-008-1", eventId: "e-008", name: "General Admission", price: 3, isMemberTicket: false, totalAvailable: 80 },
  { id: "tt-008-2", eventId: "e-008", name: "Member Price", price: 1, isMemberTicket: true, totalAvailable: 30 },
];

const festivalPurchases: TicketPurchase[] = [
  ...mockPurchases("e-008", "tt-008-1", 52, 40, "2026-01-25T10:00:00Z"),
  ...mockPurchases("e-008", "tt-008-2", 24, 20, "2026-01-28T10:00:00Z"),
];

// e-009 American Studies Spring Ball — ticket types
const ballTicketTypes: TicketType[] = [
  { id: "tt-009-1", eventId: "e-009", name: "Early Bird", price: 25, isMemberTicket: false, totalAvailable: 50 },
  { id: "tt-009-2", eventId: "e-009", name: "Standard", price: 35, isMemberTicket: false, totalAvailable: 100 },
  { id: "tt-009-3", eventId: "e-009", name: "VIP", price: 55, isMemberTicket: false, totalAvailable: 20 },
];

const ballPurchases: TicketPurchase[] = [
  ...mockPurchases("e-009", "tt-009-1", 47, 38, "2026-01-15T10:00:00Z"),
  ...mockPurchases("e-009", "tt-009-2", 68, 52, "2026-02-01T10:00:00Z"),
  ...mockPurchases("e-009", "tt-009-3", 14, 11, "2026-02-20T10:00:00Z"),
];

// ── Helper to build schedule tuple ──────────────────────────

function sched(
  startIso: string,
  endIso: string,
  building?: string,
  buildingId?: string,
  room?: string,
): DashboardEvent["schedules"] {
  return [
    {
      scheduledAt: startIso,
      isEnd: false,
      order: 0,
      locationName: building ?? null,
      locationId: buildingId ?? null,
      locationGoogleMapsUrl: null,
      buildingName: building ?? null,
      buildingId: buildingId ?? null,
      buildingGoogleMapsUrl: null,
      roomName: room ?? null,
      roomId: null,
      description: null,
    },
    {
      scheduledAt: endIso,
      isEnd: true,
      order: 1,
      locationName: null,
      locationId: null,
      locationGoogleMapsUrl: null,
      buildingName: null,
      buildingId: null,
      buildingGoogleMapsUrl: null,
      roomName: null,
      roomId: null,
      description: null,
    },
  ];
}

// Mock events — American Studies Society, Sep 2025 – Apr 2026
export const mockEvents: DashboardEvent[] = [
  {
    id: "e-001",
    title: "Freshers Welcome Social",
    description:
      "Kick off the year with the American Studies Society! Meet fellow Americanists, grab free pizza, and sign up for our events. Games, music, and great company guaranteed.",
    date: "2025-09-25T18:00:00Z",
    status: "live",
    source: "manual",
    likes: 52,
    attending: 87,
    categories: ["social"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2025-09-25T18:00:00Z", "2025-09-25T21:00:00Z", "Students' Union", "b-001"),
  },
  {
    id: "e-002",
    title: "The Simpsons Movie Screening",
    description:
      "Spider-Pig, Spider-Pig! Join us for a big-screen showing of The Simpsons Movie (2007). Free popcorn and donuts provided. 'D'oh!' optional but encouraged.",
    date: "2025-10-10T19:00:00Z",
    status: "live",
    source: "manual",
    likes: 78,
    attending: 64,
    categories: ["social", "arts"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2025-10-10T19:00:00Z", "2025-10-10T21:30:00Z", "University Place", "b-002", "Theatre A"),
  },
  {
    id: "e-003",
    title: "Treehouse of Horror Marathon",
    description:
      "Halloween special! We're screening the best Treehouse of Horror episodes back-to-back. Fancy dress encouraged — best costume wins a prize. Candy and spooky snacks provided.",
    date: "2025-10-30T18:30:00Z",
    status: "live",
    source: "scraped",
    likes: 91,
    attending: 73,
    categories: ["social", "arts"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2025-10-30T18:30:00Z", "2025-10-30T23:00:00Z", "Samuel Alexander Building", "b-003", "Lecture Theatre A"),
  },
  {
    id: "e-004",
    title: "Simpsons Trivia Night",
    description:
      "Think you know your Simpsons? Prove it! Six rounds of trivia covering seasons 1-35, from classic golden-age episodes to modern deep cuts. Teams of up to 6. Prizes for top 3.",
    date: "2025-11-14T19:30:00Z",
    status: "live",
    source: "manual",
    likes: 65,
    attending: 54,
    categories: ["social"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: false,
    price: "£2-£4",
    isTicketed: true,
    ticketTypes: triviaTicketTypes,
    purchases: triviaPurchases,
    schedules: sched("2025-11-14T19:30:00Z", "2025-11-14T22:00:00Z", "256 Wilmslow Road", "b-004"),
  },
  {
    id: "e-005",
    title: "Thanksgiving Special Screening",
    description:
      "Celebrate Thanksgiving the Springfield way. We're screening the best Thanksgiving episodes from across all seasons, complete with pumpkin pie and cranberry juice.",
    date: "2025-11-27T18:00:00Z",
    status: "live",
    source: "scraped",
    likes: 43,
    attending: 38,
    categories: ["social", "arts"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2025-11-27T18:00:00Z", "2025-11-27T21:00:00Z", "University Place", "b-002", "Theatre B"),
  },
  {
    id: "e-006",
    title: "Christmas Simpsons Marathon",
    description:
      "End of term treat! A marathon of every Simpsons Christmas episode, from Simpsons Roasting on an Open Fire to the latest. Mince pies, hot chocolate, and festive vibes.",
    date: "2025-12-12T17:00:00Z",
    status: "live",
    source: "manual",
    likes: 84,
    attending: 69,
    categories: ["social"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2025-12-12T17:00:00Z", "2025-12-12T22:00:00Z", "Samuel Alexander Building", "b-003", "Lecture Theatre A"),
  },
  {
    id: "e-007",
    title: "Simpsons vs Family Guy Debate Night",
    description:
      "The ultimate showdown. Which is the greatest animated sitcom? Two teams debate, you decide. Clips, arguments, and plenty of audience participation. Pizza provided.",
    date: "2026-01-22T19:00:00Z",
    status: "live",
    source: "manual",
    likes: 56,
    attending: 47,
    categories: ["social", "academic"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2026-01-22T19:00:00Z", "2026-01-22T21:00:00Z", "Roscoe Building", "b-005", "Room 1.009"),
  },
  {
    id: "e-008",
    title: "Springfield Film Festival",
    description:
      "A full afternoon of Simpsons content — fan-favourite episodes voted by members, plus behind-the-scenes documentaries and a screening of 'A Star Is Burns'. Snacks and drinks included.",
    date: "2026-02-20T14:00:00Z",
    status: "live",
    source: "scraped",
    likes: 72,
    attending: 61,
    categories: ["social", "arts"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: false,
    price: "£1-£3",
    isTicketed: true,
    ticketTypes: festivalTicketTypes,
    purchases: festivalPurchases,
    schedules: sched("2026-02-20T14:00:00Z", "2026-02-20T20:00:00Z", "University Place", "b-002", "Theatre A"),
  },
  {
    id: "e-009",
    title: "American Studies Spring Ball",
    description:
      "The highlight of the year! A formal dinner and dance at the Kimpton Clocktower Hotel. Three-course meal, live DJ, photo booth, and awards ceremony. Smart dress code.",
    date: "2026-03-14T19:00:00Z",
    status: "live",
    source: "manual",
    likes: 118,
    attending: 156,
    categories: ["social"],
    imageUrl: null,
    registrationUrl: "https://fixr.co/event/amst-ball",
    isOnline: false,
    isFree: false,
    price: "£25-£55",
    isTicketed: true,
    ticketTypes: ballTicketTypes,
    purchases: ballPurchases,
    schedules: sched(
      "2026-03-14T19:00:00Z",
      "2026-03-15T01:00:00Z",
      "Kimpton Clocktower Hotel",
      "b-006",
    ),
  },
  {
    id: "e-010",
    title: "End of Year Simpsons Movie Night",
    description:
      "One last screening before exams! We're showing The Simpsons Movie again by popular demand, plus a bonus showing of the pilot episode. Free entry, free snacks, free good times.",
    date: "2026-04-03T19:00:00Z",
    status: "ingested",
    source: "manual",
    likes: 34,
    attending: 29,
    categories: ["social", "arts"],
    imageUrl: null,
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2026-04-03T19:00:00Z", "2026-04-03T21:30:00Z", "University Place", "b-002", "Theatre A"),
  },
];

export const mockCategories = [
  { id: "cat-001", name: "social" },
  { id: "cat-002", name: "academic" },
  { id: "cat-003", name: "sports" },
  { id: "cat-004", name: "arts" },
  { id: "cat-005", name: "career" },
  { id: "cat-006", name: "workshop" },
  { id: "cat-007", name: "trip" },
];

export const mockUniversities = [
  { id: "u-001", name: "University of Manchester" },
  { id: "u-002", name: "Manchester Metropolitan University" },
  { id: "u-003", name: "University of Salford" },
];

// Analytics mock helpers

function generateFollowerGrowth(days: number): Array<{ date: string; count: number }> {
  const data: Array<{ date: string; count: number }> = [];
  const now = new Date();
  for (let i = days; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split("T")[0],
      count: Math.floor(Math.random() * 8) + 1,
    });
  }
  return data;
}

export function getMockAnalytics(timeRange: "7d" | "30d" | "90d") {
  const days = timeRange === "7d" ? 7 : timeRange === "30d" ? 30 : 90;
  return {
    followerCount: 312,
    followerGrowth: generateFollowerGrowth(days),
    totalLikes: mockEvents.reduce((sum, e) => sum + e.likes, 0),
    totalAttending: mockEvents.reduce((sum, e) => sum + e.attending, 0),
    eventStats: mockEvents.map((e) => ({
      id: e.id,
      title: e.title,
      likes: e.likes,
      attending: e.attending,
      source: e.source,
      date: e.date,
    })),
    audienceByUniversity: [
      { name: "University of Manchester", count: 312 },
      { name: "Manchester Metropolitan University", count: 89 },
      { name: "University of Salford", count: 47 },
      { name: "University of Bolton", count: 18 },
      { name: "Other", count: 16 },
    ],
    audienceByStudyLevel: [
      { name: "Undergraduate", count: 298 },
      { name: "Postgraduate", count: 112 },
      { name: "PhD", count: 42 },
      { name: "Foundation", count: 18 },
      { name: "Other", count: 12 },
    ],
  };
}

export function getMockPostHogAnalytics() {
  return {
    totalViews: 1847,
    profileViews: 623,
    viewsByEvent: mockEvents.map((e) => ({
      eventId: e.id,
      views: Math.floor(Math.random() * 200) + 30,
    })),
    registrationClicks: 156,
  };
}
