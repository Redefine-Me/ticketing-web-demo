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
  { id: 'c4', name: 'sports', slug: 'sports' },
];

// ── Societies ─────────────────────────────────────────────────
export const societies: Society[] = [
  { id: 's1', name: 'Manchester Malayalee Student Society', instagram_handle: 'mallusocmcr', description: 'PHOTOS/ TICKETS 👇💫', image_url: null, university: universities[0], follower_count: 2598 },
];

// ── Events — Manchester Malayalee Student Society, Sep 2025 to Apr 2026 ──

export const events: EventWithDetails[] = [
  {
    id: 'e-001', name: 'Freshers Chai & Chill', description: 'ayoo freshers!! come thru for our first hangout of the year 🫨🫶🏽 free chai, snacks from back home and good vibes only. this is where the Mallu Soc MCR fam starts so don\u2019t be shy, just pull up 💫',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 187, attend_count: 94, created_at: '2025-09-20T10:00:00Z',
    category: categories[0], categories: [categories[0]],
    societies: [societies[0]], images: [{ id: 'img-001', full_url: '/event-images/freshers-chai-and-chill.png', small_url: null }],
    schedule_entries: [
      { id: 'se1', event_id: 'e-001', location_id: 'l1', scheduled_at: '2025-09-25T18:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l1', name: 'Students\' Union', street: 'Oxford Road', postcode: 'M13 9PR', google_maps_url: null } },
      { id: 'se1e', event_id: 'e-001', location_id: null, scheduled_at: '2025-09-25T20:30:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e-002', name: 'Onam Sadhya Night', description: 'it\u2019s ONAM season and Mallu Soc MCR is doing it proper 🔥🪷 full traditional sadhya feast on banana leaves \u2014 avial, sambar, payasam, the whole lot. if you know, you know. veggie heaven fr. get your tickets before they sell out\u203c\ufe0f',
    is_free: false, price: 3, registration_url: null, source_post_url: null,
    like_count: 312, attend_count: 120, created_at: '2025-09-28T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [{ id: 'img-002', full_url: '/event-images/onam-sadhya-night.png', small_url: null }],
    schedule_entries: [
      { id: 'se2', event_id: 'e-002', location_id: 'l3', scheduled_at: '2025-10-11T18:30:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l3', name: 'Samuel Alexander Building', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null } },
      { id: 'se2e', event_id: 'e-002', location_id: null, scheduled_at: '2025-10-11T22:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: true, isAttending: true,
  },
  {
    id: 'e-003', name: 'Militants vs Medics \u2014 Football', description: 'MATCHDAY 🟣⚽ the Manchester Militants are back and we\u2019re taking on the Medics lot this Saturday. come support the boys from Mallu Soc MCR, it\u2019s gonna be kinda hardd 😏🦁',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 145, attend_count: 65, created_at: '2025-10-18T10:00:00Z',
    category: categories[3], categories: [categories[3]],
    societies: [societies[0]], images: [{ id: 'img-003', full_url: '/event-images/militants-vs-medics-football.png', small_url: null }],
    schedule_entries: [
      { id: 'se3', event_id: 'e-003', location_id: 'l7', scheduled_at: '2025-10-25T14:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l7', name: 'Armitage Sports Centre', street: 'Moseley Road', postcode: 'M14 6HE', google_maps_url: null } },
      { id: 'se3e', event_id: 'e-003', location_id: null, scheduled_at: '2025-10-25T16:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e-004', name: 'Diwali Rave', description: 'DIWALI BUT MAKE IT MANCHESTER 🪩✨🔥 Mallu Soc MCR x Tamil Soc MCR are going all out \u2014 desi beats, LED sparklers, and way too many fairy lights. dress to impress, this one\u2019s gonna be different 💫💫',
    is_free: false, price: 5, registration_url: 'https://fixr.co/event/mallusoc-diwali-rave', source_post_url: null,
    like_count: 278, attend_count: 180, created_at: '2025-10-20T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [{ id: 'img-004', full_url: '/event-images/diwali-rave.png', small_url: null }],
    schedule_entries: [
      { id: 'se4', event_id: 'e-004', location_id: 'l4', scheduled_at: '2025-11-01T21:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l4', name: '256 Wilmslow Road', street: 'Wilmslow Road', postcode: 'M14 6LB', google_maps_url: null } },
      { id: 'se4e', event_id: 'e-004', location_id: null, scheduled_at: '2025-11-02T02:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: true, isAttending: true,
  },
  {
    id: 'e-005', name: 'Kerala Film Screening', description: 'movie night innit 🎬🍿 Mallu Soc MCR is screening a proper Kerala classic with subtitles so everyone can vibe. free popcorn, comfy seats, no spoilers in the gc pls 🤷🏽\u200d♀\ufe0f',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 98, attend_count: 52, created_at: '2025-11-10T10:00:00Z',
    category: categories[1], categories: [categories[1]],
    societies: [societies[0]], images: [{ id: 'img-005', full_url: '/event-images/kerala-film-screening.png', small_url: null }],
    schedule_entries: [
      { id: 'se5', event_id: 'e-005', location_id: 'l2', scheduled_at: '2025-11-20T19:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l2', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null } },
      { id: 'se5e', event_id: 'e-005', location_id: null, scheduled_at: '2025-11-20T21:30:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e-006', name: 'Mallu Soc MCR x Gujju Soc Christmas Mixer', description: 'COLLAB ALERT 🚨🎄 Mallu Soc MCR is linking up with Gujju Soc for the ultimate christmas mixer before everyone dips for the holidays. ugly jumpers encouraged, festive chaos guaranteed 🫶🏽🔥',
    is_free: false, price: null, registration_url: null, source_post_url: null,
    like_count: 203, attend_count: 140, created_at: '2025-11-25T10:00:00Z',
    category: categories[0], categories: [categories[0]],
    societies: [societies[0]], images: [{ id: 'img-006', full_url: '/event-images/christmas-mixer.png', small_url: null }],
    schedule_entries: [
      { id: 'se6', event_id: 'e-006', location_id: 'l8', scheduled_at: '2025-12-06T20:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l8', name: 'Bierkeller Manchester', street: 'The Printworks', postcode: 'M4 2BS', google_maps_url: null } },
      { id: 'se6e', event_id: 'e-006', location_id: null, scheduled_at: '2025-12-06T23:30:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e-007', name: 'New Year New Soc \u2014 Welcome Back', description: 'WE\u2019RE BACKKK 🗣\ufe0f💫 first Mallu Soc MCR event of sem 2 and we missed you lot fr. come say hi, meet the new faces, and grab some free food before lectures ruin everything 😭🫶🏽',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 156, attend_count: 88, created_at: '2026-01-12T10:00:00Z',
    category: categories[0], categories: [categories[0]],
    societies: [societies[0]], images: [{ id: 'img-007', full_url: '/event-images/new-year-welcome-back.png', small_url: null }],
    schedule_entries: [
      { id: 'se7', event_id: 'e-007', location_id: 'l1', scheduled_at: '2026-01-22T18:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l1', name: 'Students\' Union', street: 'Oxford Road', postcode: 'M13 9PR', google_maps_url: null } },
      { id: 'se7e', event_id: 'e-007', location_id: null, scheduled_at: '2026-01-22T20:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e-008', name: 'Blind Date Night', description: 'ok hear us out 😏💘 Mallu Soc MCR x Tamil Soc MCR x Gujju Soc are doing a blind date matchmaking thing and it\u2019s gonna be SO jokes. sign up with your mates, answer some unhinged questions, and see who you match with. no pressure just vibes\u203c\ufe0f',
    is_free: false, price: null, registration_url: 'https://forms.gle/mallusoc-blinddate', source_post_url: null,
    like_count: 267, attend_count: 110, created_at: '2026-02-01T10:00:00Z',
    category: categories[0], categories: [categories[0]],
    societies: [societies[0]], images: [{ id: 'img-008', full_url: '/event-images/blind-date-night.png', small_url: null }],
    schedule_entries: [
      { id: 'se8', event_id: 'e-008', location_id: 'l2', scheduled_at: '2026-02-13T19:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l2', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null } },
      { id: 'se8e', event_id: 'e-008', location_id: null, scheduled_at: '2026-02-13T22:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: true, isAttending: false,
  },
  {
    id: 'e-009', name: 'Militants Cricket Tournament', description: 'CRICKET SZN IS HERE 🏑🟣🦁 the Manchester Militants from Mallu Soc MCR are hosting a full tournament and we need YOU on the pitch. sign up as a team or solo \u2014 we\u2019ll sort the rest. let\u2019s get this W 🔥',
    is_free: true, price: null, registration_url: 'https://forms.gle/mallusoc-cricket', source_post_url: null,
    like_count: 134, attend_count: 72, created_at: '2026-02-20T10:00:00Z',
    category: categories[3], categories: [categories[3]],
    societies: [societies[0]], images: [{ id: 'img-009', full_url: '/event-images/militants-cricket-tournament.png', small_url: null }],
    schedule_entries: [
      { id: 'se9', event_id: 'e-009', location_id: 'l9', scheduled_at: '2026-03-07T11:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l9', name: 'Platt Fields Park', street: 'Wilmslow Road', postcode: 'M14 6LA', google_maps_url: null } },
      { id: 'se9e', event_id: 'e-009', location_id: null, scheduled_at: '2026-03-07T17:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e-010', name: 'VAJRAM \u2014 Annual Gala Night', description: 'THE ONE YOU\u2019VE ALL BEEN WAITING FOR 👑✨ VAJRAM 2026 by Manchester Malayalee Student Society is coming and it\u2019s going to be OUR biggest night yet. think chandeliers, traditional fits, live performances and a whole lot of Kerala culture. black tie x desi elegance \u2014 you already know the vibe 🔥🫶🏽💫',
    is_free: false, price: 35, registration_url: 'https://fixr.co/event/vajram-2026', source_post_url: null,
    like_count: 456, attend_count: 250, created_at: '2026-02-01T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [{ id: 'img-010', full_url: '/event-images/vajram-annual-gala-night.png', small_url: null }],
    schedule_entries: [
      { id: 'se10', event_id: 'e-010', location_id: 'l10', scheduled_at: '2026-03-21T18:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l10', name: 'Whitworth Hall', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null } },
      { id: 'se10e', event_id: 'e-010', location_id: null, scheduled_at: '2026-03-21T23:30:00Z', is_end_schedule: true, schedule_order: 1, location: null },
    ],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e-011', name: 'THEYYAM \u2014 A Night of Kerala', description: 'THE WAIT IS OVER 🔥🔥🔥 THEYYAM \u2014 A Night of Kerala is pulling up and it\u2019s going to be UNREAL 🫶🏽💫 we\u2019re starting things off at Uni Place with live performances, traditional dance, spoken word and a whole cultural showcase that\u2019s gonna leave you speechless fr 😭✨ then we\u2019re moving the vibes to Impossible for food, drinks and the afterparty because why would we stop there 😏🍛🪩',
    is_free: false, price: 3, registration_url: 'https://fixr.co/event/theyyam-2026', source_post_url: null,
    like_count: 389, attend_count: 210, created_at: '2026-03-15T10:00:00Z',
    category: categories[0], categories: [categories[0], categories[1]],
    societies: [societies[0]], images: [],
    schedule_entries: [
      { id: 'se11', event_id: 'e-011', location_id: 'l2', scheduled_at: '2026-04-11T19:00:00Z', is_end_schedule: false, schedule_order: 0, location: { id: 'l2', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null } },
      { id: 'se11e', event_id: 'e-011', location_id: null, scheduled_at: '2026-04-12T00:00:00Z', is_end_schedule: true, schedule_order: 1, location: null },
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
