import { University, Society, Category, EventWithDetails, UserProfile } from '../types';

// ── Universities ──────────────────────────────────────────────
export const universities: University[] = [
  { id: 'u1', name: 'University of Manchester', short_name: 'UoM', city: 'Manchester', building_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', logo_url: null, description: 'One of the UK\'s leading universities' },
];

// ── Categories ────────────────────────────────────────────────
export const categories: Category[] = [
  { id: 'c1', name: 'social', slug: 'social' },
  { id: 'c2', name: 'arts', slug: 'arts' },
  { id: 'c3', name: 'academic', slug: 'academic' },
  { id: 'c4', name: 'film', slug: 'film' },
];

// ── Societies ─────────────────────────────────────────────────
export const societies: Society[] = [
  { id: 's1', name: 'American Studies Society', instagram_handle: 'uomamericanstudies', description: 'The American Studies Society at the University of Manchester. Film screenings, cultural events, trivia nights, and socials celebrating American culture.', image_url: null, university: universities[0], follower_count: 312 },
];

// ── Events — American Studies Society, Sep 2025 to Apr 2026 ──

export const events: EventWithDetails[] = [
  {
    id: 'e-001', name: 'Freshers Welcome Social', description: 'Kick off the year with the American Studies Society! Meet fellow Americanists, grab free pizza, and sign up for our events.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 52, attend_count: 87, created_at: '2025-09-20T10:00:00Z',
    category: categories[0], categories: [categories[0]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se1', event_id: 'e-001', location_id: 'l1', scheduled_at: '2025-09-25T18:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l1', name: 'Students\' Union', street: 'Oxford Road', postcode: 'M13 9PR', google_maps_url: null } },
      { id: 'se1e', event_id: 'e-001', location_id: null, scheduled_at: '2025-09-25T21:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e-002', name: 'The Simpsons Movie Screening', description: 'Spider-Pig, Spider-Pig! Join us for a big-screen showing of The Simpsons Movie (2007). Free popcorn and donuts provided.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 78, attend_count: 64, created_at: '2025-10-05T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se2', event_id: 'e-002', location_id: 'l2', scheduled_at: '2025-10-10T19:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l2', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null } },
      { id: 'se2e', event_id: 'e-002', location_id: null, scheduled_at: '2025-10-10T21:30:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: true, isAttending: false,
  },
  {
    id: 'e-003', name: 'Treehouse of Horror Marathon', description: 'Halloween special! Best Treehouse of Horror episodes back-to-back. Fancy dress encouraged. Candy and spooky snacks provided.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 91, attend_count: 73, created_at: '2025-10-22T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se3', event_id: 'e-003', location_id: 'l3', scheduled_at: '2025-10-30T18:30:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l3', name: 'Samuel Alexander Building', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null } },
      { id: 'se3e', event_id: 'e-003', location_id: null, scheduled_at: '2025-10-30T23:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: true, isAttending: true,
  },
  {
    id: 'e-004', name: 'Simpsons Trivia Night', description: 'Think you know your Simpsons? Six rounds of trivia covering seasons 1-35. Teams of up to 6. Prizes for top 3.',
    is_free: false, price: 2, registration_url: null, source_post_url: null,
    like_count: 65, attend_count: 54, created_at: '2025-11-01T10:00:00Z',
    category: categories[0], categories: [categories[0]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se4', event_id: 'e-004', location_id: 'l4', scheduled_at: '2025-11-14T19:30:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l4', name: '256 Wilmslow Road', street: 'Wilmslow Road', postcode: 'M14 6LB', google_maps_url: null } },
      { id: 'se4e', event_id: 'e-004', location_id: null, scheduled_at: '2025-11-14T22:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e-005', name: 'Thanksgiving Special Screening', description: 'Celebrate Thanksgiving the Springfield way. Best Thanksgiving episodes, pumpkin pie and cranberry juice.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 43, attend_count: 38, created_at: '2025-11-18T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se5', event_id: 'e-005', location_id: 'l2', scheduled_at: '2025-11-27T18:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l2', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null } },
      { id: 'se5e', event_id: 'e-005', location_id: null, scheduled_at: '2025-11-27T21:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e-006', name: 'Christmas Simpsons Marathon', description: 'End of term treat! Every Simpsons Christmas episode. Mince pies, hot chocolate, and festive vibes.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 84, attend_count: 69, created_at: '2025-12-01T10:00:00Z',
    category: categories[0], categories: [categories[0]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se6', event_id: 'e-006', location_id: 'l3', scheduled_at: '2025-12-12T17:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l3', name: 'Samuel Alexander Building', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null } },
      { id: 'se6e', event_id: 'e-006', location_id: null, scheduled_at: '2025-12-12T22:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e-007', name: 'Simpsons vs Family Guy Debate Night', description: 'The ultimate showdown. Which is the greatest animated sitcom? Two teams debate, you decide. Pizza provided.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 56, attend_count: 47, created_at: '2026-01-10T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[2]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se7', event_id: 'e-007', location_id: 'l5', scheduled_at: '2026-01-22T19:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l5', name: 'Roscoe Building', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null } },
      { id: 'se7e', event_id: 'e-007', location_id: null, scheduled_at: '2026-01-22T21:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e-008', name: 'Springfield Film Festival', description: 'A full afternoon of Simpsons content. Fan-favourite episodes, behind-the-scenes docs, and A Star Is Burns. Snacks included.',
    is_free: false, price: 3, registration_url: null, source_post_url: null,
    like_count: 72, attend_count: 61, created_at: '2026-02-05T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se8', event_id: 'e-008', location_id: 'l2', scheduled_at: '2026-02-20T14:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l2', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null } },
      { id: 'se8e', event_id: 'e-008', location_id: null, scheduled_at: '2026-02-20T20:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: true, isAttending: false,
  },
  {
    id: 'e-009', name: 'American Studies Spring Ball', description: 'The highlight of the year! Formal dinner and dance at the Kimpton Clocktower Hotel. Three-course meal, live DJ, photo booth, and awards.',
    is_free: false, price: 35, registration_url: 'https://fixr.co/event/amst-ball', source_post_url: null,
    like_count: 118, attend_count: 156, created_at: '2026-01-20T10:00:00Z',
    category: categories[0], categories: [categories[0]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se9', event_id: 'e-009', location_id: 'l6', scheduled_at: '2026-03-14T19:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l6', name: 'Kimpton Clocktower Hotel', street: 'Oxford Street', postcode: 'M60 7HA', google_maps_url: null } },
      { id: 'se9e', event_id: 'e-009', location_id: null, scheduled_at: '2026-03-15T01:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e-010', name: 'End of Year Simpsons Movie Night', description: 'One last screening before exams! The Simpsons Movie by popular demand, plus a bonus showing of the pilot episode. Free snacks.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 34, attend_count: 29, created_at: '2026-03-20T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se10', event_id: 'e-010', location_id: 'l2', scheduled_at: '2026-04-03T19:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l2', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null } },
      { id: 'se10e', event_id: 'e-010', location_id: null, scheduled_at: '2026-04-03T21:30:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: false,
  },
];

// ── Mock user ─────────────────────────────────────────────────
export const mockUser: UserProfile = {
  id: 'user1',
  display_name: 'Alex Johnson',
  email: 'alex.johnson@manchester.ac.uk',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  university: universities[0],
  interests: [categories[0], categories[1], categories[2], categories[3]],
};
