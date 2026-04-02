import type {
  SocietyAccountRow,
  SocietyRow,
  SocietyProfileRow,
  DashboardEvent,
  TicketType,
  TicketPurchase,
} from "./supabase/types";

// Mock society
export const mockSociety: SocietyRow = {
  id: "s-001",
  name: "Manchester Malayalee Student Society",
  instagram_handle: "mallusocmcr",
  description:
    "PHOTOS/ TICKETS \ud83d\udc47\ud83d\udcab",
  bio_url: null,
  university_id: "u-001",
  image_url: null,
  created_at: "2025-09-01T00:00:00Z",
  updated_at: "2026-03-01T00:00:00Z",
};

export const mockProfile: SocietyProfileRow = {
  id: "sp-001",
  society_id: "s-001",
  name: "Manchester Malayalee Student Society",
  handle: "mallusocmcr",
  description: mockSociety.description,
  image_url: null,
  follow_count: 2598,
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

// e-002 Onam Sadhya Night — ticket types
const onamTicketTypes: TicketType[] = [
  { id: "tt-002-1", eventId: "e-002", name: "Member", price: 5, isMemberTicket: true, totalAvailable: 60 },
  { id: "tt-002-2", eventId: "e-002", name: "Non-Member", price: 8, isMemberTicket: false, totalAvailable: 40 },
];

const onamPurchases: TicketPurchase[] = [
  ...mockPurchases("e-002", "tt-002-1", 55, 48, "2025-09-28T10:00:00Z"),
  ...mockPurchases("e-002", "tt-002-2", 35, 28, "2025-10-01T10:00:00Z"),
];

// e-004 Diwali Rave — ticket types
const diwaliTicketTypes: TicketType[] = [
  { id: "tt-004-1", eventId: "e-004", name: "Early Bird", price: 8, isMemberTicket: false, totalAvailable: 50 },
  { id: "tt-004-2", eventId: "e-004", name: "Standard", price: 12, isMemberTicket: false, totalAvailable: 100 },
  { id: "tt-004-3", eventId: "e-004", name: "Member", price: 6, isMemberTicket: true, totalAvailable: 40 },
];

const diwaliPurchases: TicketPurchase[] = [
  ...mockPurchases("e-004", "tt-004-1", 50, 42, "2025-10-15T10:00:00Z"),
  ...mockPurchases("e-004", "tt-004-2", 78, 60, "2025-10-20T10:00:00Z"),
  ...mockPurchases("e-004", "tt-004-3", 36, 30, "2025-10-18T10:00:00Z"),
];

// e-006 Christmas Mixer — ticket types
const mixerTicketTypes: TicketType[] = [
  { id: "tt-006-1", eventId: "e-006", name: "General Admission", price: 5, isMemberTicket: false, totalAvailable: 80 },
  { id: "tt-006-2", eventId: "e-006", name: "Member", price: 3, isMemberTicket: true, totalAvailable: 40 },
];

const mixerPurchases: TicketPurchase[] = [
  ...mockPurchases("e-006", "tt-006-1", 65, 52, "2025-11-20T10:00:00Z"),
  ...mockPurchases("e-006", "tt-006-2", 38, 32, "2025-11-22T10:00:00Z"),
];

// e-008 Blind Date Night — ticket types
const blindDateTicketTypes: TicketType[] = [
  { id: "tt-008-1", eventId: "e-008", name: "Single Entry", price: 4, isMemberTicket: false, totalAvailable: 60 },
  { id: "tt-008-2", eventId: "e-008", name: "Member", price: 2, isMemberTicket: true, totalAvailable: 30 },
];

const blindDatePurchases: TicketPurchase[] = [
  ...mockPurchases("e-008", "tt-008-1", 52, 44, "2026-01-28T10:00:00Z"),
  ...mockPurchases("e-008", "tt-008-2", 28, 24, "2026-02-01T10:00:00Z"),
];

// e-010 VAJRAM Annual Gala Night — ticket types
const vajramTicketTypes: TicketType[] = [
  { id: "tt-010-1", eventId: "e-010", name: "Early Bird", price: 20, isMemberTicket: false, totalAvailable: 50 },
  { id: "tt-010-2", eventId: "e-010", name: "Standard", price: 30, isMemberTicket: false, totalAvailable: 120 },
  { id: "tt-010-3", eventId: "e-010", name: "VIP Table", price: 50, isMemberTicket: false, totalAvailable: 20 },
  { id: "tt-010-4", eventId: "e-010", name: "Member", price: 15, isMemberTicket: true, totalAvailable: 40 },
];

const vajramPurchases: TicketPurchase[] = [
  ...mockPurchases("e-010", "tt-010-1", 50, 40, "2026-02-15T10:00:00Z"),
  ...mockPurchases("e-010", "tt-010-2", 95, 72, "2026-03-01T10:00:00Z"),
  ...mockPurchases("e-010", "tt-010-3", 18, 14, "2026-03-05T10:00:00Z"),
  ...mockPurchases("e-010", "tt-010-4", 38, 30, "2026-02-20T10:00:00Z"),
];

// ── Helper to build schedule tuple ──────────────────────────

function sched(
  startIso: string,
  endIso: string,
  building?: string,
  buildingId?: string,
  room?: string,
  isUniversityVenue = false,
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
      isUniversityVenue,
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
      isUniversityVenue,
    },
  ];
}

// Mock events — Manchester Malayalee Student Society, Sep 2025 – Apr 2026
export const mockEvents: DashboardEvent[] = [
  {
    id: "e-001",
    title: "Freshers Chai & Chill",
    description:
      "ayoo freshers!! come thru for our first hangout of the year \ud83e\udee8\ud83e\udef6\ud83c\udffd free chai, snacks from back home and good vibes only. this is where the Mallu Soc MCR fam starts so don\u2019t be shy, just pull up \ud83d\udcab",
    date: "2025-09-25T18:00:00Z",
    status: "live",
    source: "scraped",
    likes: 187,
    attending: 94,
    categories: ["social"],
    imageUrls: ["/event-images/freshers-chai-and-chill.png"],
    registrationUrl: null,
    isOnline: false,
    isTicketed: false,
    schedules: sched("2025-09-25T18:00:00Z", "2025-09-25T20:30:00Z", "Students' Union", "b-001", "Room 1 (ground floor)", true),
  },
  {
    id: "e-002",
    title: "Onam Sadhya Night",
    description:
      "it\u2019s ONAM season and Mallu Soc MCR is doing it proper \ud83d\udd25\ud83e\udeb7 full traditional sadhya feast on banana leaves \u2014 avial, sambar, payasam, the whole lot. if you know, you know. veggie heaven fr. get your tickets before they sell out\u203c\ufe0f",
    date: "2025-10-11T18:30:00Z",
    status: "live",
    source: "scraped",
    likes: 312,
    attending: 120,
    categories: ["social", "arts"],
    imageUrls: ["/event-images/onam-sadhya-night.png"],
    registrationUrl: null,
    isOnline: false,
    isTicketed: true,
    ticketTypes: onamTicketTypes,
    purchases: onamPurchases,
    schedules: sched("2025-10-11T18:30:00Z", "2025-10-11T22:00:00Z", "Samuel Alexander Building", "b-003", "Room A101", true),
  },
  {
    id: "e-003",
    title: "Militants vs Medics \u2014 Football",
    description:
      "MATCHDAY \ud83d\udfe3\u26bd the Manchester Militants are back and we\u2019re taking on the Medics lot this Saturday. come support the boys from Mallu Soc MCR, it\u2019s gonna be kinda hardd \ud83d\ude0f\ud83e\udd81",
    date: "2025-10-25T14:00:00Z",
    status: "live",
    source: "scraped",
    likes: 145,
    attending: 65,
    categories: ["sports"],
    imageUrls: ["/event-images/militants-vs-medics-football.png"],
    registrationUrl: null,
    isOnline: false,
    isTicketed: false,
    schedules: sched("2025-10-25T14:00:00Z", "2025-10-25T16:00:00Z", "Armitage Sports Centre", "b-008"),
  },
  {
    id: "e-004",
    title: "Diwali Rave",
    description:
      "DIWALI BUT MAKE IT MANCHESTER \ud83e\udea9\u2728\ud83d\udd25 Mallu Soc MCR x Tamil Soc MCR are going all out \u2014 desi beats, LED sparklers, and way too many fairy lights. dress to impress, this one\u2019s gonna be different \ud83d\udcab\ud83d\udcab",
    date: "2025-11-01T21:00:00Z",
    status: "live",
    source: "manual",
    likes: 278,
    attending: 180,
    categories: ["social", "arts"],
    imageUrls: ["/event-images/diwali-rave.png"],
    registrationUrl: "https://fixr.co/event/mallusoc-diwali-rave",
    isOnline: false,
    isTicketed: true,
    ticketTypes: diwaliTicketTypes,
    purchases: diwaliPurchases,
    schedules: sched("2025-11-01T21:00:00Z", "2025-11-02T02:00:00Z", "256 Wilmslow Road", "b-004"),
  },
  {
    id: "e-005",
    title: "Kerala Film Screening",
    description:
      "movie night innit \ud83c\udfac\ud83c\udf7f Mallu Soc MCR is screening a proper Kerala classic with subtitles so everyone can vibe. free popcorn, comfy seats, no spoilers in the gc pls \ud83e\udd37\ud83c\udffd\u200d\u2640\ufe0f",
    date: "2025-11-20T19:00:00Z",
    status: "live",
    source: "scraped",
    likes: 98,
    attending: 52,
    categories: ["arts"],
    imageUrls: ["/event-images/kerala-film-screening.png"],
    registrationUrl: null,
    isOnline: false,
    isTicketed: false,
    schedules: sched("2025-11-20T19:00:00Z", "2025-11-20T21:30:00Z", "University Place", "b-002", "Lecture Theatre A", true),
  },
  {
    id: "e-006",
    title: "Mallu Soc MCR x Gujju Soc Christmas Mixer",
    description:
      "COLLAB ALERT \ud83d\udea8\ud83c\udf84 Mallu Soc MCR is linking up with Gujju Soc for the ultimate christmas mixer before everyone dips for the holidays. ugly jumpers encouraged, festive chaos guaranteed \ud83e\udef6\ud83c\udffd\ud83d\udd25",
    date: "2025-12-06T20:00:00Z",
    status: "live",
    source: "manual",
    likes: 203,
    attending: 140,
    categories: ["social"],
    imageUrls: ["/event-images/christmas-mixer.png"],
    registrationUrl: null,
    isOnline: false,
    isTicketed: true,
    ticketTypes: mixerTicketTypes,
    purchases: mixerPurchases,
    schedules: sched("2025-12-06T20:00:00Z", "2025-12-06T23:30:00Z", "Bierkeller Manchester", "b-009"),
  },
  {
    id: "e-007",
    title: "New Year New Soc \u2014 Welcome Back",
    description:
      "WE\u2019RE BACKKK \ud83d\udde3\ufe0f\ud83d\udcab first Mallu Soc MCR event of sem 2 and we missed you lot fr. come say hi, meet the new faces, and grab some free food before lectures ruin everything \ud83d\ude2d\ud83e\udef6\ud83c\udffd",
    date: "2026-01-22T18:00:00Z",
    status: "live",
    source: "scraped",
    likes: 156,
    attending: 88,
    categories: ["social"],
    imageUrls: ["/event-images/new-year-welcome-back.png"],
    registrationUrl: null,
    isOnline: false,
    isTicketed: false,
    schedules: sched("2026-01-22T18:00:00Z", "2026-01-22T20:00:00Z", "Students' Union", "b-001", "Room 4", true),
  },
  {
    id: "e-008",
    title: "Blind Date Night",
    description:
      "ok hear us out \ud83d\ude0f\ud83d\udc98 Mallu Soc MCR x Tamil Soc MCR x Gujju Soc are doing a blind date matchmaking thing and it\u2019s gonna be SO jokes. sign up with your mates, answer some unhinged questions, and see who you match with. no pressure just vibes\u203c\ufe0f",
    date: "2026-02-13T19:00:00Z",
    status: "live",
    source: "manual",
    likes: 267,
    attending: 110,
    categories: ["social"],
    imageUrls: ["/event-images/blind-date-night.png"],
    registrationUrl: "https://forms.gle/mallusoc-blinddate",
    isOnline: false,
    isTicketed: true,
    ticketTypes: blindDateTicketTypes,
    purchases: blindDatePurchases,
    schedules: sched("2026-02-13T19:00:00Z", "2026-02-13T22:00:00Z", "University Place", "b-002", "Lecture Theatre B", true),
  },
  {
    id: "e-009",
    title: "Militants Cricket Tournament",
    description:
      "CRICKET SZN IS HERE \ud83c\udfd1\ud83d\udfe3\ud83e\udd81 the Manchester Militants from Mallu Soc MCR are hosting a full tournament and we need YOU on the pitch. sign up as a team or solo \u2014 we\u2019ll sort the rest. let\u2019s get this W \ud83d\udd25",
    date: "2026-03-07T11:00:00Z",
    status: "live",
    source: "scraped",
    likes: 134,
    attending: 72,
    categories: ["sports"],
    imageUrls: ["/event-images/militants-cricket-tournament.png"],
    registrationUrl: "https://forms.gle/mallusoc-cricket",
    isOnline: false,
    isTicketed: false,
    schedules: sched("2026-03-07T11:00:00Z", "2026-03-07T17:00:00Z", "Platt Fields Park", "b-010"),
  },
  {
    id: "e-010",
    title: "VAJRAM \u2014 Annual Gala Night",
    description:
      "THE ONE YOU\u2019VE ALL BEEN WAITING FOR \ud83d\udc51\u2728 VAJRAM 2026 by Manchester Malayalee Student Society is coming and it\u2019s going to be OUR biggest night yet. think chandeliers, traditional fits, live performances and a whole lot of Kerala culture. black tie x desi elegance \u2014 you already know the vibe \ud83d\udd25\ud83e\udef6\ud83c\udffd\ud83d\udcab",
    date: "2026-03-21T18:00:00Z",
    status: "live",
    source: "manual",
    likes: 456,
    attending: 250,
    categories: ["social", "arts"],
    imageUrls: ["/event-images/vajram-annual-gala-night.png"],
    registrationUrl: "https://fixr.co/event/vajram-2026",
    isOnline: false,
    isTicketed: true,
    ticketTypes: vajramTicketTypes,
    purchases: vajramPurchases,
    schedules: [
      {
        scheduledAt: "2026-03-21T18:00:00Z",
        isEnd: false,
        order: 0,
        locationName: "Whitworth Hall",
        locationId: "b-011",
        locationGoogleMapsUrl: null,
        buildingName: "Whitworth Hall",
        buildingId: "b-011",
        buildingGoogleMapsUrl: null,
        roomName: "Main Hall \u2014 Drinks Reception",
        roomId: null,
        description: "Drinks Reception",
        isUniversityVenue: false,
      },
      {
        scheduledAt: "2026-03-21T19:00:00Z",
        isEnd: false,
        order: 1,
        locationName: "Whitworth Hall",
        locationId: "b-011",
        locationGoogleMapsUrl: null,
        buildingName: "Whitworth Hall",
        buildingId: "b-011",
        buildingGoogleMapsUrl: null,
        roomName: "Main Hall \u2014 Gala Dinner & Performances",
        roomId: null,
        description: "Gala Dinner & Performances",
        isUniversityVenue: false,
      },
      {
        scheduledAt: "2026-03-21T23:30:00Z",
        isEnd: true,
        order: 2,
        locationName: null,
        locationId: null,
        locationGoogleMapsUrl: null,
        buildingName: null,
        buildingId: null,
        buildingGoogleMapsUrl: null,
        roomName: null,
        roomId: null,
        description: null,
        isUniversityVenue: false,
      },
    ],
  },
];

export const mockCategories = [
  { id: "7d503241-5d26-422b-9a84-94d8dc8db85c", name: "academic" },
  { id: "6d505488-e511-45b2-b6c0-b35e75485cd4", name: "arts" },
  { id: "d678c1fd-93aa-422d-9471-b3c39f5d9193", name: "career" },
  { id: "f6e2f123-28ce-4bb2-9beb-e5a52da06ddd", name: "charity" },
  { id: "34b90440-c42d-443a-a45b-ecfc4751bb18", name: "cultural" },
  { id: "a7346778-c225-4ad9-b94e-d8b18b38e78e", name: "film" },
  { id: "a3a00f53-d9ec-467e-9081-8fe9eb9900e0", name: "food & drink" },
  { id: "d9faa471-d966-419a-ae87-eb512852c0c9", name: "hackathon" },
  { id: "a0c1db2b-ac6f-4192-a06e-00b5411a46e7", name: "music" },
  { id: "e8269866-66cb-4175-b3b7-e73dd72e9dcd", name: "outdoor" },
  { id: "21be2683-4dba-4378-b281-702edd5376d4", name: "quiz" },
  { id: "13c25d72-1dcf-4417-9d74-ce94ac17805e", name: "social" },
  { id: "ace7d118-4325-4b6c-b7a1-253ba770358c", name: "sports" },
  { id: "6a7897ba-856c-4041-83ff-414e9c964792", name: "sustainability" },
  { id: "6b4053c7-a790-4bef-a29a-211e977bd8af", name: "tech" },
  { id: "be2d1ed0-71f2-4013-9d20-9a9c0e4cdc77", name: "trip" },
  { id: "025be260-a98d-4fb1-94d1-8d6241da7e10", name: "wellbeing" },
  { id: "51be78a7-d402-477d-bb0a-f32970614074", name: "workshop" },
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
    followerCount: 2598,
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
      { name: "University of Manchester", count: 1412 },
      { name: "Manchester Metropolitan University", count: 389 },
      { name: "University of Salford", count: 247 },
      { name: "University of Bolton", count: 98 },
      { name: "Other", count: 452 },
    ],
    audienceByStudyLevel: [
      { name: "Undergraduate", count: 1598 },
      { name: "Postgraduate", count: 612 },
      { name: "PhD", count: 142 },
      { name: "Foundation", count: 118 },
      { name: "Other", count: 128 },
    ],
  };
}

export function getMockPostHogAnalytics() {
  return {
    totalViews: 8472,
    profileViews: 3215,
    viewsByEvent: mockEvents.map((e) => ({
      eventId: e.id,
      views: Math.floor(Math.random() * 800) + 100,
    })),
    registrationClicks: 756,
  };
}
