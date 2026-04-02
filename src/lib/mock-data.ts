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
  name: "Manchester Malayalee Student Society",
  instagram_handle: "mallusocmcr",
  description:
    "PHOTOS/ TICKETS 👇💫",
  bio_url: null,
  university_id: "u-001",
  image_url: null,
  created_at: "2025-09-01T00:00:00Z",
  updated_at: "2026-03-17T00:00:00Z",
};

export const mockProfile: SocietyProfileRow = {
  id: "sp-001",
  society_id: "s-001",
  name: "Manchester Malayalee Student Society",
  handle: "mallusocmcr",
  description: mockSociety.description,
  image_url: null,
  follow_count: 2598,
  event_count: 11,
  created_at: "2025-09-01T00:00:00Z",
  updated_at: "2026-03-17T00:00:00Z",
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
  { id: "tt-002-1", eventId: "e-002", name: "Member", price: 3, isMemberTicket: true, totalAvailable: 50 },
  { id: "tt-002-2", eventId: "e-002", name: "Non-Member", price: 5, isMemberTicket: false, totalAvailable: 30 },
];

const onamPurchases: TicketPurchase[] = [
  ...mockPurchases("e-002", "tt-002-1", 42, 35, "2025-09-28T10:00:00Z"),
  ...mockPurchases("e-002", "tt-002-2", 24, 18, "2025-10-01T10:00:00Z"),
];

// e-004 Diwali Rave — ticket types
const diwaliTicketTypes: TicketType[] = [
  { id: "tt-004-1", eventId: "e-004", name: "Early Bird", price: 5, isMemberTicket: false, totalAvailable: 60 },
  { id: "tt-004-2", eventId: "e-004", name: "Standard", price: 8, isMemberTicket: false, totalAvailable: 100 },
];

const diwaliPurchases: TicketPurchase[] = [
  ...mockPurchases("e-004", "tt-004-1", 58, 45, "2025-10-10T10:00:00Z"),
  ...mockPurchases("e-004", "tt-004-2", 82, 64, "2025-10-18T10:00:00Z"),
];

// e-010 VAJRAM Annual Gala Night — ticket types
const vajramTicketTypes: TicketType[] = [
  { id: "tt-010-1", eventId: "e-010", name: "Early Bird", price: 25, isMemberTicket: false, totalAvailable: 50 },
  { id: "tt-010-2", eventId: "e-010", name: "Standard", price: 35, isMemberTicket: false, totalAvailable: 120 },
  { id: "tt-010-3", eventId: "e-010", name: "VIP", price: 60, isMemberTicket: false, totalAvailable: 20 },
];

const vajramPurchases: TicketPurchase[] = [
  ...mockPurchases("e-010", "tt-010-1", 48, 40, "2026-02-01T10:00:00Z"),
  ...mockPurchases("e-010", "tt-010-2", 95, 75, "2026-02-15T10:00:00Z"),
  ...mockPurchases("e-010", "tt-010-3", 17, 14, "2026-03-01T10:00:00Z"),
];

// e-011 THEYYAM — A Night of Kerala — ticket types
const theyyamTicketTypes: TicketType[] = [
  { id: "tt-011-1", eventId: "e-011", name: "Member", price: 3, isMemberTicket: true, totalAvailable: 80 },
  { id: "tt-011-2", eventId: "e-011", name: "Non-Member", price: 6, isMemberTicket: false, totalAvailable: 60 },
];

const theyyamPurchases: TicketPurchase[] = [
  ...mockPurchases("e-011", "tt-011-1", 62, 0, "2026-03-25T10:00:00Z"),
  ...mockPurchases("e-011", "tt-011-2", 38, 0, "2026-03-28T10:00:00Z"),
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

// Mock events — Manchester Malayalee Student Society, Sep 2025 – Apr 2026
export const mockEvents: DashboardEvent[] = [
  {
    id: "e-001",
    title: "Freshers Chai & Chill",
    description:
      "ayoo freshers!! come thru for our first hangout of the year 🫨🫶🏽 free chai, snacks from back home and good vibes only. this is where the Mallu Soc MCR fam starts so don\u2019t be shy, just pull up 💫",
    date: "2025-09-25T18:00:00Z",
    status: "live",
    source: "scraped",
    likes: 187,
    attending: 94,
    categories: ["social"],
    imageUrl: "/event-images/freshers-chai-and-chill.png",
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2025-09-25T18:00:00Z", "2025-09-25T20:30:00Z", "Students' Union", "b-001", "Room 1 (ground floor)"),
  },
  {
    id: "e-002",
    title: "Onam Sadhya Night",
    description:
      "it\u2019s ONAM season and Mallu Soc MCR is doing it proper 🔥🪷 full traditional sadhya feast on banana leaves \u2014 avial, sambar, payasam, the whole lot. if you know, you know. veggie heaven fr. get your tickets before they sell out\u203c\ufe0f",
    date: "2025-10-11T18:30:00Z",
    status: "live",
    source: "scraped",
    likes: 312,
    attending: 120,
    categories: ["social", "arts"],
    imageUrl: "/event-images/onam-sadhya-night.png",
    registrationUrl: null,
    isOnline: false,
    isFree: false,
    price: "£3-£5",
    isTicketed: true,
    ticketTypes: onamTicketTypes,
    purchases: onamPurchases,
    schedules: sched("2025-10-11T18:30:00Z", "2025-10-11T22:00:00Z", "Samuel Alexander Building", "b-003", "Room A101"),
  },
  {
    id: "e-003",
    title: "Militants vs Medics \u2014 Football",
    description:
      "MATCHDAY 🟣⚽ the Manchester Militants are back and we\u2019re taking on the Medics lot this Saturday. come support the boys from Mallu Soc MCR, it\u2019s gonna be kinda hardd 😏🦁",
    date: "2025-10-25T14:00:00Z",
    status: "live",
    source: "scraped",
    likes: 145,
    attending: 65,
    categories: ["sports"],
    imageUrl: "/event-images/militants-vs-medics-football.png",
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2025-10-25T14:00:00Z", "2025-10-25T16:00:00Z", "Armitage Sports Centre", "b-007"),
  },
  {
    id: "e-004",
    title: "Diwali Rave",
    description:
      "DIWALI BUT MAKE IT MANCHESTER 🪩✨🔥 Mallu Soc MCR x Tamil Soc MCR are going all out \u2014 desi beats, LED sparklers, and way too many fairy lights. dress to impress, this one\u2019s gonna be different 💫💫",
    date: "2025-11-01T21:00:00Z",
    status: "live",
    source: "manual",
    likes: 278,
    attending: 180,
    categories: ["social", "arts"],
    imageUrl: "/event-images/diwali-rave.png",
    registrationUrl: "https://fixr.co/event/mallusoc-diwali-rave",
    isOnline: false,
    isFree: false,
    price: "£5-£8",
    isTicketed: true,
    ticketTypes: diwaliTicketTypes,
    purchases: diwaliPurchases,
    schedules: sched("2025-11-01T21:00:00Z", "2025-11-02T02:00:00Z", "256 Wilmslow Road", "b-004"),
  },
  {
    id: "e-005",
    title: "Kerala Film Screening",
    description:
      "movie night innit 🎬🍿 Mallu Soc MCR is screening a proper Kerala classic with subtitles so everyone can vibe. free popcorn, comfy seats, no spoilers in the gc pls 🤷🏽\u200d♀\ufe0f",
    date: "2025-11-20T19:00:00Z",
    status: "live",
    source: "scraped",
    likes: 98,
    attending: 52,
    categories: ["arts"],
    imageUrl: "/event-images/kerala-film-screening.png",
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2025-11-20T19:00:00Z", "2025-11-20T21:30:00Z", "University Place", "b-002", "Lecture Theatre A"),
  },
  {
    id: "e-006",
    title: "Mallu Soc MCR x Gujju Soc Christmas Mixer",
    description:
      "COLLAB ALERT 🚨🎄 Mallu Soc MCR is linking up with Gujju Soc for the ultimate christmas mixer before everyone dips for the holidays. ugly jumpers encouraged, festive chaos guaranteed 🫶🏽🔥",
    date: "2025-12-06T20:00:00Z",
    status: "live",
    source: "manual",
    likes: 203,
    attending: 140,
    categories: ["social"],
    imageUrl: "/event-images/christmas-mixer.png",
    registrationUrl: null,
    isOnline: false,
    isFree: false,
    price: null,
    isTicketed: true,
    schedules: sched("2025-12-06T20:00:00Z", "2025-12-06T23:30:00Z", "Bierkeller Manchester", "b-008"),
  },
  {
    id: "e-007",
    title: "New Year New Soc \u2014 Welcome Back",
    description:
      "WE\u2019RE BACKKK 🗣\ufe0f💫 first Mallu Soc MCR event of sem 2 and we missed you lot fr. come say hi, meet the new faces, and grab some free food before lectures ruin everything 😭🫶🏽",
    date: "2026-01-22T18:00:00Z",
    status: "live",
    source: "scraped",
    likes: 156,
    attending: 88,
    categories: ["social"],
    imageUrl: "/event-images/new-year-welcome-back.png",
    registrationUrl: null,
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2026-01-22T18:00:00Z", "2026-01-22T20:00:00Z", "Students' Union", "b-001", "Room 4"),
  },
  {
    id: "e-008",
    title: "Blind Date Night",
    description:
      "ok hear us out 😏💘 Mallu Soc MCR x Tamil Soc MCR x Gujju Soc are doing a blind date matchmaking thing and it\u2019s gonna be SO jokes. sign up with your mates, answer some unhinged questions, and see who you match with. no pressure just vibes\u203c\ufe0f",
    date: "2026-02-13T19:00:00Z",
    status: "live",
    source: "manual",
    likes: 267,
    attending: 110,
    categories: ["social"],
    imageUrl: "/event-images/blind-date-night.png",
    registrationUrl: "https://forms.gle/mallusoc-blinddate",
    isOnline: false,
    isFree: false,
    price: null,
    isTicketed: true,
    schedules: sched("2026-02-13T19:00:00Z", "2026-02-13T22:00:00Z", "University Place", "b-002", "Lecture Theatre B"),
  },
  {
    id: "e-009",
    title: "Militants Cricket Tournament",
    description:
      "CRICKET SZN IS HERE 🏑🟣🦁 the Manchester Militants from Mallu Soc MCR are hosting a full tournament and we need YOU on the pitch. sign up as a team or solo \u2014 we\u2019ll sort the rest. let\u2019s get this W 🔥",
    date: "2026-03-07T11:00:00Z",
    status: "live",
    source: "scraped",
    likes: 134,
    attending: 72,
    categories: ["sports"],
    imageUrl: "/event-images/militants-cricket-tournament.png",
    registrationUrl: "https://forms.gle/mallusoc-cricket",
    isOnline: false,
    isFree: true,
    price: null,
    isTicketed: false,
    schedules: sched("2026-03-07T11:00:00Z", "2026-03-07T17:00:00Z", "Platt Fields Park", "b-009"),
  },
  {
    id: "e-010",
    title: "VAJRAM \u2014 Annual Gala Night",
    description:
      "THE ONE YOU\u2019VE ALL BEEN WAITING FOR 👑✨ VAJRAM 2026 by Manchester Malayalee Student Society is coming and it\u2019s going to be OUR biggest night yet. think chandeliers, traditional fits, live performances and a whole lot of Kerala culture. black tie x desi elegance \u2014 you already know the vibe 🔥🫶🏽💫",
    date: "2026-03-21T18:00:00Z",
    status: "live",
    source: "manual",
    likes: 456,
    attending: 250,
    categories: ["social", "arts"],
    imageUrl: "/event-images/vajram-annual-gala-night.png",
    registrationUrl: "https://fixr.co/event/vajram-2026",
    isOnline: false,
    isFree: false,
    price: "£25-£60",
    isTicketed: true,
    ticketTypes: vajramTicketTypes,
    purchases: vajramPurchases,
    schedules: sched(
      "2026-03-21T18:00:00Z",
      "2026-03-21T23:30:00Z",
      "Whitworth Hall",
      "b-010",
      "Main Hall",
    ),
  },
  {
    id: "e-011",
    title: "THEYYAM \u2014 A Night of Kerala",
    description:
      "THE WAIT IS OVER 🔥🔥🔥 THEYYAM \u2014 A Night of Kerala is pulling up and it\u2019s going to be UNREAL 🫶🏽💫 we\u2019re starting things off at Uni Place with live performances, traditional dance, spoken word and a whole cultural showcase that\u2019s gonna leave you speechless fr 😭✨ then we\u2019re moving the vibes to Impossible for food, drinks and the afterparty because why would we stop there 😏🍛🪩",
    date: "2026-04-11T19:00:00Z",
    status: "live",
    source: "manual",
    likes: 389,
    attending: 210,
    categories: ["social", "arts"],
    imageUrl: null,
    registrationUrl: "https://fixr.co/event/theyyam-2026",
    isOnline: false,
    isFree: false,
    price: "£3-£6",
    isTicketed: true,
    ticketTypes: theyyamTicketTypes,
    purchases: theyyamPurchases,
    schedules: sched(
      "2026-04-11T19:00:00Z",
      "2026-04-12T00:00:00Z",
      "University Place",
      "b-002",
      "Lecture Theatre A",
    ),
  },
];

// Prefill data for the "Create New Event" form (THEYYAM showcase event)
export const prefillNewEventForm = {
  title: "THEYYAM \u2014 A Night of Kerala",
  description:
    "THE WAIT IS OVER \ud83d\udd25\ud83d\udd25\ud83d\udd25\n\nTHEYYAM \u2014 A Night of Kerala is pulling up and it\u2019s going to be UNREAL \ud83e\udef6\ud83c\udffd\ud83d\udcab\n\nwe\u2019re starting things off at Uni Place with live performances, traditional dance, spoken word and a whole cultural showcase that\u2019s gonna leave you speechless fr \ud83d\ude2d\u2728 then we\u2019re moving the vibes to Impossible for food, drinks and the afterparty because why would we stop there \ud83d\ude0f\ud83c\udf5b\ud83e\udea9\n\nMEMBERS: \u00a33 (you already know the perks \ud83e\udd37\ud83c\udffd\u200d\u2640\ufe0f)\nNON-MEMBERS: \u00a36\n\ntickets selling FAST so don\u2019t sleep on this one\u203c\ufe0f\u203c\ufe0f\n\nlink in bio for tickets \ud83d\udc46\ud83d\udcab\n\n\ud83d\udccd University Place \u2192 Impossible Manchester\n\ud83d\udcc5 Saturday 11th April\n\ud83d\udd56 7PM - 12AM",
  categoryIds: ["cat-001", "cat-004"],
  schedules: [
    {
      date: "2026-04-11",
      startTime: "19:00",
      endTime: "21:30",
      buildingName: "University Place",
      buildingId: "b-002",
      buildingGoogleMapsUrl: null,
      roomName: "Lecture Theatre A",
      roomId: "",
      description: "Cultural showcase \u2014 live performances, traditional dance, spoken word, and music",
    },
    {
      date: "2026-04-11",
      startTime: "21:30",
      endTime: "00:00",
      buildingName: "Impossible Manchester",
      buildingId: "v-008",
      buildingGoogleMapsUrl: null,
      roomName: "",
      roomId: "",
      description: "Afterparty \u2014 Kerala street food, drinks, music, and dancing",
    },
  ],
  isOnline: false,
  registrationUrl: "",
  isTicketed: true,
  ticketTypes: [
    { id: "tt-new-1", eventId: "", name: "Member", price: 3, isMemberTicket: true, totalAvailable: 80 },
    { id: "tt-new-2", eventId: "", name: "Non-Member", price: 6, isMemberTicket: false, totalAvailable: 60 },
  ],
};

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
      { name: "University of Manchester", count: 2598 },
      { name: "Manchester Metropolitan University", count: 312 },
      { name: "University of Salford", count: 89 },
      { name: "University of Bolton", count: 34 },
      { name: "Other", count: 21 },
    ],
    audienceByStudyLevel: [
      { name: "Undergraduate", count: 1842 },
      { name: "Postgraduate", count: 534 },
      { name: "PhD", count: 156 },
      { name: "Foundation", count: 42 },
      { name: "Other", count: 24 },
    ],
  };
}

export function getMockPostHogAnalytics() {
  return {
    totalViews: 4823,
    profileViews: 1647,
    viewsByEvent: mockEvents.map((e) => ({
      eventId: e.id,
      views: Math.floor(Math.random() * 200) + 30,
    })),
    registrationClicks: 412,
  };
}
