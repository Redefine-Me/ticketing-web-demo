import type { University, Society, Category, EventWithDetails, UserProfile, Location, ScheduleEntry } from '@/types/mobile';
import { mockEvents as dashboardEvents } from '@/lib/mock-data';

// ── Universities (mobile-specific schema) ───────────────────────
export const universities: University[] = [
  { id: 'u1', name: 'University of Manchester', short_name: 'UoM', city: 'Manchester', building_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', logo_url: null, description: 'One of the UK\'s leading universities' },
];

// ── Categories (mobile-specific with UUIDs and slugs) ───────────
export const categories: Category[] = [
  { id: '7d503241-5d26-422b-9a84-94d8dc8db85c', name: 'academic', slug: 'academic' },
  { id: '6d505488-e511-45b2-b6c0-b35e75485cd4', name: 'arts', slug: 'arts' },
  { id: 'd678c1fd-93aa-422d-9471-b3c39f5d9193', name: 'career', slug: 'career' },
  { id: 'f6e2f123-28ce-4bb2-9beb-e5a52da06ddd', name: 'charity', slug: 'charity' },
  { id: '34b90440-c42d-443a-a45b-ecfc4751bb18', name: 'cultural', slug: 'cultural' },
  { id: 'a7346778-c225-4ad9-b94e-d8b18b38e78e', name: 'film', slug: 'film' },
  { id: 'a3a00f53-d9ec-467e-9081-8fe9eb9900e0', name: 'food & drink', slug: 'food-drink' },
  { id: 'd9faa471-d966-419a-ae87-eb512852c0c9', name: 'hackathon', slug: 'hackathon' },
  { id: 'a0c1db2b-ac6f-4192-a06e-00b5411a46e7', name: 'music', slug: 'music' },
  { id: 'e8269866-66cb-4175-b3b7-e73dd72e9dcd', name: 'outdoor', slug: 'outdoor' },
  { id: '21be2683-4dba-4378-b281-702edd5376d4', name: 'quiz', slug: 'quiz' },
  { id: '13c25d72-1dcf-4417-9d74-ce94ac17805e', name: 'social', slug: 'social' },
  { id: 'ace7d118-4325-4b6c-b7a1-253ba770358c', name: 'sports', slug: 'sports' },
  { id: '6a7897ba-856c-4041-83ff-414e9c964792', name: 'sustainability', slug: 'sustainability' },
  { id: '6b4053c7-a790-4bef-a29a-211e977bd8af', name: 'tech', slug: 'tech' },
  { id: 'be2d1ed0-71f2-4013-9d20-9a9c0e4cdc77', name: 'trip', slug: 'trip' },
  { id: '025be260-a98d-4fb1-94d1-8d6241da7e10', name: 'wellbeing', slug: 'wellbeing' },
  { id: '51be78a7-d402-477d-bb0a-f32970614074', name: 'workshop', slug: 'workshop' },
];

// ── Societies ────────────────────────────────────────────────
export const societies: Society[] = [
  { id: 's1', name: 'Manchester Malayalee Student Society', instagram_handle: 'mallusocmcr', description: 'PHOTOS/ TICKETS \ud83d\udc47\ud83d\udcab', image_url: null, university: universities[0], follower_count: 2598 },
];

// ── Lookup helpers ───────────────────────────────────────────

const catByName = (name: string): Category =>
  categories.find((c) => c.name === name) ?? categories[11]; // default: social

const LOCATIONS: Record<string, Location> = {
  'b-001': { id: 'l1', name: "Students' Union", street: 'Oxford Road', postcode: 'M13 9PR', google_maps_url: null },
  'b-002': { id: 'l2', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null },
  'b-003': { id: 'l3', name: 'Samuel Alexander Building', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null },
  'b-004': { id: 'l4', name: '256 Wilmslow Road', street: 'Wilmslow Road', postcode: 'M14 6LB', google_maps_url: null },
  'b-008': { id: 'l8', name: 'Armitage Sports Centre', street: 'Fallowfield', postcode: 'M14 6PA', google_maps_url: null },
  'b-009': { id: 'l9', name: 'Bierkeller Manchester', street: 'Printworks', postcode: 'M4 2BS', google_maps_url: null },
  'b-010': { id: 'l10', name: 'Platt Fields Park', street: 'Fallowfield', postcode: 'M14 6LA', google_maps_url: null },
  'b-011': { id: 'l11', name: 'Whitworth Hall', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null },
  'b-012': { id: 'l12', name: 'Impossible Manchester', street: '36 Peter St', postcode: 'M2 5GP', google_maps_url: null },
};

// User interaction state per event (mobile-only, not in dashboard)
const USER_STATE: Record<string, { isLiked: boolean; isAttending: boolean }> = {
  'e-001': { isLiked: false, isAttending: true },
  'e-002': { isLiked: true, isAttending: true },
  'e-004': { isLiked: true, isAttending: false },
  'e-007': { isLiked: false, isAttending: true },
  'e-009': { isLiked: true, isAttending: false },
  'e-010': { isLiked: true, isAttending: true },
};

// ── Events — derived from dashboard source of truth ──────────

export const events: EventWithDetails[] = dashboardEvents.map((e) => {
  const state = USER_STATE[e.id] ?? { isLiked: false, isAttending: false };
  const eventCats = e.categories.map(catByName);

  const schedule_entries: ScheduleEntry[] = e.schedules.map((s) => {
    const loc = s.buildingId ? LOCATIONS[s.buildingId] ?? null : null;
    const num = e.id.replace('e-', '');
    return {
      id: `se${num}${s.isEnd ? 'e' : ''}`,
      event_id: e.id,
      location_id: loc?.id ?? null,
      scheduled_at: s.scheduledAt,
      is_end_schedule: s.isEnd,
      schedule_order: s.order,
      location: s.isEnd ? null : loc,
    };
  });

  const eventDate = e.date ? new Date(e.date) : new Date();
  const createdAt = new Date(eventDate.getTime() - 5 * 86_400_000).toISOString();

  return {
    id: e.id,
    name: e.title,
    description: e.description,
    registration_url: e.registrationUrl,
    source_post_url: null,
    like_count: e.likes,
    attend_count: e.attending,
    created_at: createdAt,
    category: eventCats[0] ?? null,
    categories: eventCats,
    societies: [societies[0]],
    images: [],
    schedule_entries,
    isLiked: state.isLiked,
    isAttending: state.isAttending,
  };
});

// ── Mock user ────────────────────────────────────────────────
export const mockUser: UserProfile = {
  id: 'user1',
  display_name: 'Alex Johnson',
  email: 'alex.johnson@manchester.ac.uk',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  university: universities[0],
  interests: [categories[11], categories[1], categories[0], categories[5]],
};
