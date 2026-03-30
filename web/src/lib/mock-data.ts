import { University, Society, Category, EventWithDetails, UserProfile } from '../types';

// ── Universities ──────────────────────────────────────────────
export const universities: University[] = [
  { id: 'u1', name: 'University of Manchester', short_name: 'UoM', city: 'Manchester', building_url: 'https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80', logo_url: null, description: 'One of the UK\'s leading universities' },
  { id: 'u2', name: 'University of Leeds', short_name: 'Leeds', city: 'Leeds', building_url: 'https://images.unsplash.com/photo-1592280771190-3e2e4d571952?w=800&q=80', logo_url: null, description: 'A top Russell Group university' },
  { id: 'u3', name: 'University of Birmingham', short_name: 'UoB', city: 'Birmingham', building_url: 'https://images.unsplash.com/photo-1607237138185-eedd9c632b0b?w=800&q=80', logo_url: null, description: 'A leading civic university' },
  { id: 'u4', name: 'University of Bristol', short_name: 'Bristol', city: 'Bristol', building_url: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=800&q=80', logo_url: null, description: 'World-class research university' },
  { id: 'u5', name: 'University of Sheffield', short_name: 'Sheffield', city: 'Sheffield', building_url: 'https://images.unsplash.com/photo-1580537659466-0a9bfa916a54?w=800&q=80', logo_url: null, description: 'A member of the Russell Group' },
];

// ── Categories ────────────────────────────────────────────────
export const categories: Category[] = [
  { id: 'c1', name: 'social', slug: 'social' },
  { id: 'c2', name: 'music', slug: 'music' },
  { id: 'c3', name: 'sports', slug: 'sports' },
  { id: 'c4', name: 'career', slug: 'career' },
  { id: 'c5', name: 'tech', slug: 'tech' },
  { id: 'c6', name: 'arts', slug: 'arts' },
  { id: 'c7', name: 'food & drink', slug: 'food-drink' },
  { id: 'c8', name: 'academic', slug: 'academic' },
  { id: 'c9', name: 'cultural', slug: 'cultural' },
  { id: 'c10', name: 'quiz', slug: 'quiz' },
  { id: 'c11', name: 'charity', slug: 'charity' },
  { id: 'c12', name: 'outdoor', slug: 'outdoor' },
  { id: 'c13', name: 'film', slug: 'film' },
  { id: 'c14', name: 'hackathon', slug: 'hackathon' },
  { id: 'c15', name: 'wellbeing', slug: 'wellbeing' },
  { id: 'c16', name: 'workshop', slug: 'workshop' },
  { id: 'c17', name: 'sustainability', slug: 'sustainability' },
  { id: 'c18', name: 'trip', slug: 'trip' },
];

// ── Societies ─────────────────────────────────────────────────
export const societies: Society[] = [
  { id: 's1', name: 'Manchester Tech Society', instagram_handle: 'mcrtech', description: 'We host hackathons, coding workshops, and tech talks. Join us to build, learn, and network with fellow tech enthusiasts.', image_url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&q=80', university: universities[0], follower_count: 342 },
  { id: 's2', name: 'Leeds Music Society', instagram_handle: 'leedsmusic', description: 'Open-mic nights, live gigs, and jam sessions. From indie to classical — everyone\'s welcome.', image_url: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&q=80', university: universities[1], follower_count: 518 },
  { id: 's3', name: 'Birmingham Sports Club', instagram_handle: 'bhamsports', description: 'Intramural leagues, pick-up games, and fitness classes. Stay active, have fun, meet people.', image_url: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?w=200&q=80', university: universities[2], follower_count: 621 },
  { id: 's4', name: 'Bristol Arts Collective', instagram_handle: 'bristolarts', description: 'Exhibitions, performances, and creative workshops. Express yourself and explore new mediums.', image_url: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=200&q=80', university: universities[3], follower_count: 289 },
  { id: 's5', name: 'Sheffield Debate Society', instagram_handle: 'sheffdebate', description: 'Weekly debates on politics, ethics, and culture. Sharpen your arguments and broaden your perspective.', image_url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=200&q=80', university: universities[4], follower_count: 178 },
  { id: 's6', name: 'Manchester Foodies', instagram_handle: 'mcrfoodies', description: 'Food crawls, cooking classes, and restaurant nights. Unite through the love of good food.', image_url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=200&q=80', university: universities[0], follower_count: 455 },
  { id: 's7', name: 'Leeds Film Club', instagram_handle: 'leedsfilm', description: 'Weekly screenings, director spotlights, and short film competitions. Cinema lovers welcome.', image_url: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=200&q=80', university: universities[1], follower_count: 203 },
  { id: 's8', name: 'Birmingham Volunteering Network', instagram_handle: 'bhamvolunteer', description: 'Give back to the community. Weekly volunteering opportunities and charity fundraisers.', image_url: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=200&q=80', university: universities[2], follower_count: 312 },
  { id: 's9', name: 'Bristol Sustainability Hub', instagram_handle: 'bristolgreen', description: 'Campus clean-ups, eco workshops, and sustainability talks. Small actions, big impact.', image_url: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=200&q=80', university: universities[3], follower_count: 167 },
  { id: 's10', name: 'Sheffield Wellbeing Society', instagram_handle: 'sheffwellbeing', description: 'Yoga, meditation, mindfulness workshops. Take care of your mind and body during uni life.', image_url: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=200&q=80', university: universities[4], follower_count: 234 },
];

// ── Helper: future dates ──────────────────────────────────────
function futureDate(daysFromNow: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() + daysFromNow);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

function endDate(daysFromNow: number, hour: number, minute = 0): string {
  return futureDate(daysFromNow, hour, minute);
}

// ── Events ────────────────────────────────────────────────────
export const events: EventWithDetails[] = [
  {
    id: 'e1', name: 'Spring Hackathon 2026', description: 'Build something amazing in 24 hours. Teams of up to 4. Prizes for best hack, most creative, and best social impact project. Food and drinks provided throughout. Mentors from top tech companies will be on hand.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 89, attend_count: 156, created_at: futureDate(-5, 10),
    category: categories[13], categories: [categories[13], categories[4]],
    societies: [societies[0]], images: [{ id: 'i1', full_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=400&q=80' }],
    schedule_entries: [{ id: 'se1', event_id: 'e1', location_id: 'l1', scheduled_at: futureDate(1, 9), is_end_schedule: false, schedule_order: 0, location: { id: 'l1', name: 'Alan Turing Building', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null } }, { id: 'se1e', event_id: 'e1', location_id: 'l1', scheduled_at: endDate(2, 9), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e2', name: 'Acoustic Open Mic Night', description: 'Bring your guitar, your voice, or just your ears. A chilled evening of live acoustic performances by students. Sign up on the night or just come and enjoy the vibes.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 134, attend_count: 89, created_at: futureDate(-3, 14),
    category: categories[1], categories: [categories[1], categories[0]],
    societies: [societies[1]], images: [{ id: 'i2', full_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=400&q=80' }],
    schedule_entries: [{ id: 'se2', event_id: 'e2', location_id: 'l2', scheduled_at: futureDate(0, 19, 30), is_end_schedule: false, schedule_order: 0, location: { id: 'l2', name: 'Stylus Bar', street: 'University of Leeds', postcode: 'LS2 9JT', google_maps_url: null } }, { id: 'se2e', event_id: 'e2', location_id: 'l2', scheduled_at: endDate(0, 22), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: true, isAttending: false,
  },
  {
    id: 'e3', name: '5-a-Side Football Tournament', description: 'Annual inter-society football tournament. Register your team of 5 and compete for the trophy. All skill levels welcome — it\'s about having fun!',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 201, attend_count: 120, created_at: futureDate(-7, 8),
    category: categories[2], categories: [categories[2]],
    societies: [societies[2]], images: [{ id: 'i3', full_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=400&q=80' }],
    schedule_entries: [{ id: 'se3', event_id: 'e3', location_id: 'l3', scheduled_at: futureDate(3, 14), is_end_schedule: false, schedule_order: 0, location: { id: 'l3', name: 'University Playing Fields', street: 'Edgbaston Park Road', postcode: 'B15 2TT', google_maps_url: null } }, { id: 'se3e', event_id: 'e3', location_id: 'l3', scheduled_at: endDate(3, 18), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: true, isAttending: true,
  },
  {
    id: 'e4', name: 'Life Drawing Workshop', description: 'Join us for a relaxed life drawing session with a professional model. All materials provided. Beginners absolutely welcome — no experience needed.',
    is_free: false, price: 5, registration_url: null, source_post_url: null,
    like_count: 67, attend_count: 32, created_at: futureDate(-2, 11),
    category: categories[5], categories: [categories[5], categories[15]],
    societies: [societies[3]], images: [{ id: 'i4', full_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&q=80' }],
    schedule_entries: [{ id: 'se4', event_id: 'e4', location_id: 'l4', scheduled_at: futureDate(2, 14), is_end_schedule: false, schedule_order: 0, location: { id: 'l4', name: 'Arnolfini Gallery', street: 'Narrow Quay', postcode: 'BS1 4QA', google_maps_url: null } }, { id: 'se4e', event_id: 'e4', location_id: 'l4', scheduled_at: endDate(2, 16, 30), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e5', name: 'Careers in Finance Panel', description: 'Hear from professionals at Goldman Sachs, Deloitte, and PwC about breaking into finance. Q&A session followed by networking with free refreshments.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 156, attend_count: 210, created_at: futureDate(-4, 9),
    category: categories[3], categories: [categories[3], categories[7]],
    societies: [societies[4]], images: [{ id: 'i5', full_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&q=80' }],
    schedule_entries: [{ id: 'se5', event_id: 'e5', location_id: 'l5', scheduled_at: futureDate(1, 17), is_end_schedule: false, schedule_order: 0, location: { id: 'l5', name: 'Diamond Building', street: 'Leavygreave Road', postcode: 'S3 7RD', google_maps_url: null } }, { id: 'se5e', event_id: 'e5', location_id: 'l5', scheduled_at: endDate(1, 19), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e6', name: 'Street Food Festival', description: 'Ten food trucks, live DJ, and a giant communal table. Thai, Mexican, Korean, Italian — something for everyone. Vegan and GF options available.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 312, attend_count: 445, created_at: futureDate(-6, 12),
    category: categories[6], categories: [categories[6], categories[0]],
    societies: [societies[5]], images: [{ id: 'i6', full_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&q=80' }],
    schedule_entries: [{ id: 'se6', event_id: 'e6', location_id: 'l6', scheduled_at: futureDate(4, 12), is_end_schedule: false, schedule_order: 0, location: { id: 'l6', name: 'University Place', street: 'Oxford Road', postcode: 'M13 9GP', google_maps_url: null } }, { id: 'se6e', event_id: 'e6', location_id: 'l6', scheduled_at: endDate(4, 20), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: true, isAttending: false,
  },
  {
    id: 'e7', name: 'Classic Cinema: Blade Runner', description: 'Free screening of Ridley Scott\'s masterpiece on the big screen. Popcorn and drinks available. Discussion session afterwards for film buffs.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 98, attend_count: 64, created_at: futureDate(-1, 15),
    category: categories[12], categories: [categories[12]],
    societies: [societies[6]], images: [{ id: 'i7', full_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&q=80' }],
    schedule_entries: [{ id: 'se7', event_id: 'e7', location_id: 'l7', scheduled_at: futureDate(0, 20), is_end_schedule: false, schedule_order: 0, location: { id: 'l7', name: 'Roger Stevens LT', street: 'University of Leeds', postcode: 'LS2 9JT', google_maps_url: null } }, { id: 'se7e', event_id: 'e7', location_id: 'l7', scheduled_at: endDate(0, 22, 30), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e8', name: 'Charity 10K Fun Run', description: 'Run 10K around campus and the city centre to raise money for the local children\'s hospital. Medals for all finishers. Water stations every 2K.',
    is_free: false, price: 10, registration_url: 'https://example.com', source_post_url: null,
    like_count: 178, attend_count: 340, created_at: futureDate(-8, 7),
    category: categories[10], categories: [categories[10], categories[2]],
    societies: [societies[7]], images: [{ id: 'i8', full_url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?w=400&q=80' }],
    schedule_entries: [{ id: 'se8', event_id: 'e8', location_id: 'l8', scheduled_at: futureDate(5, 8), is_end_schedule: false, schedule_order: 0, location: { id: 'l8', name: 'University Green', street: 'Edgbaston', postcode: 'B15 2TT', google_maps_url: null } }, { id: 'se8e', event_id: 'e8', location_id: 'l8', scheduled_at: endDate(5, 12), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e9', name: 'Campus Clean-Up Day', description: 'Help make our campus greener. Gloves, bags, and litter pickers provided. Free plant pots for all volunteers. Pizza afterwards!',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 45, attend_count: 78, created_at: futureDate(-2, 8),
    category: categories[16], categories: [categories[16], categories[11]],
    societies: [societies[8]], images: [{ id: 'i9', full_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=400&q=80' }],
    schedule_entries: [{ id: 'se9', event_id: 'e9', location_id: 'l9', scheduled_at: futureDate(2, 10), is_end_schedule: false, schedule_order: 0, location: { id: 'l9', name: 'Royal Fort Gardens', street: 'Tyndall Avenue', postcode: 'BS8 1TH', google_maps_url: null } }, { id: 'se9e', event_id: 'e9', location_id: 'l9', scheduled_at: endDate(2, 14), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e10', name: 'Mindfulness & Yoga Session', description: 'Start your week right with a guided mindfulness meditation and gentle yoga flow. Mats provided. All levels welcome. Herbal tea served after.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 88, attend_count: 55, created_at: futureDate(-1, 9),
    category: categories[14], categories: [categories[14]],
    societies: [societies[9]], images: [{ id: 'i10', full_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=400&q=80' }],
    schedule_entries: [{ id: 'se10', event_id: 'e10', location_id: 'l10', scheduled_at: futureDate(1, 7, 30), is_end_schedule: false, schedule_order: 0, location: { id: 'l10', name: 'Octagon Centre', street: 'Western Bank', postcode: 'S10 2TQ', google_maps_url: null } }, { id: 'se10e', event_id: 'e10', location_id: 'l10', scheduled_at: endDate(1, 9), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: true, isAttending: true,
  },
  {
    id: 'e11', name: 'Pub Quiz Night', description: 'Test your general knowledge across 6 rounds. Teams of up to 6. Prizes for top 3. Drink deals all night. Hosted by the legendary Quiz Master Dave.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 234, attend_count: 180, created_at: futureDate(-3, 16),
    category: categories[9], categories: [categories[9], categories[0]],
    societies: [societies[1]], images: [{ id: 'i11', full_url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=400&q=80' }],
    schedule_entries: [{ id: 'se11', event_id: 'e11', location_id: 'l11', scheduled_at: futureDate(0, 19), is_end_schedule: false, schedule_order: 0, location: { id: 'l11', name: 'Old Bar', street: 'University of Leeds', postcode: 'LS2 9JT', google_maps_url: null } }, { id: 'se11e', event_id: 'e11', location_id: 'l11', scheduled_at: endDate(0, 22), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e12', name: 'AI & Machine Learning Workshop', description: 'Hands-on workshop building your first ML model with Python. No prior experience required — we\'ll start from the basics. Bring your laptop!',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 145, attend_count: 98, created_at: futureDate(-4, 10),
    category: categories[4], categories: [categories[4], categories[15]],
    societies: [societies[0]], images: [{ id: 'i12', full_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&q=80' }],
    schedule_entries: [{ id: 'se12', event_id: 'e12', location_id: 'l12', scheduled_at: futureDate(3, 13), is_end_schedule: false, schedule_order: 0, location: { id: 'l12', name: 'Kilburn Building Lab 1.1', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null } }, { id: 'se12e', event_id: 'e12', location_id: 'l12', scheduled_at: endDate(3, 16), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e13', name: 'International Food Night', description: 'Students from 15+ countries prepare dishes from their home cuisine. Taste food from Japan, Nigeria, Brazil, India, and more. Cultural performances throughout the evening.',
    is_free: false, price: 3, registration_url: null, source_post_url: null,
    like_count: 267, attend_count: 320, created_at: futureDate(-5, 11),
    category: categories[8], categories: [categories[8], categories[6]],
    societies: [societies[5]], images: [{ id: 'i13', full_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80' }],
    schedule_entries: [{ id: 'se13', event_id: 'e13', location_id: 'l13', scheduled_at: futureDate(6, 18), is_end_schedule: false, schedule_order: 0, location: { id: 'l13', name: 'Student Union Hall', street: 'Oxford Road', postcode: 'M13 9PR', google_maps_url: null } }, { id: 'se13e', event_id: 'e13', location_id: 'l13', scheduled_at: endDate(6, 22), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: true, isAttending: false,
  },
  {
    id: 'e14', name: 'Photography Walk: Golden Hour', description: 'Capture the city in stunning golden hour light. Meet at the main gate, explore scenic spots around campus and the waterfront. All camera types welcome — phones too!',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 76, attend_count: 41, created_at: futureDate(-1, 13),
    category: categories[5], categories: [categories[5], categories[11]],
    societies: [societies[3]], images: [{ id: 'i14', full_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&q=80' }],
    schedule_entries: [{ id: 'se14', event_id: 'e14', location_id: 'l14', scheduled_at: futureDate(4, 17), is_end_schedule: false, schedule_order: 0, location: { id: 'l14', name: 'Bristol Harbourside', street: 'Harbourside', postcode: 'BS1 5DB', google_maps_url: null } }, { id: 'se14e', event_id: 'e14', location_id: 'l14', scheduled_at: endDate(4, 19, 30), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e15', name: 'Startup Pitch Night', description: 'Watch 8 student startups pitch their ideas to a panel of investors and industry experts. Network with founders and mentors. Could your next big idea be born here?',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 189, attend_count: 275, created_at: futureDate(-6, 14),
    category: categories[3], categories: [categories[3], categories[4]],
    societies: [societies[0]], images: [{ id: 'i15', full_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80' }],
    schedule_entries: [{ id: 'se15', event_id: 'e15', location_id: 'l15', scheduled_at: futureDate(5, 18), is_end_schedule: false, schedule_order: 0, location: { id: 'l15', name: 'Alliance Manchester Business School', street: 'Booth Street East', postcode: 'M13 9SS', google_maps_url: null } }, { id: 'se15e', event_id: 'e15', location_id: 'l15', scheduled_at: endDate(5, 21), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e16', name: 'Jazz Night at the Union', description: 'Live jazz trio, candlelit tables, and cocktails. A sophisticated night out without leaving campus. Smart casual dress code appreciated.',
    is_free: false, price: 7, registration_url: null, source_post_url: null,
    like_count: 112, attend_count: 86, created_at: futureDate(-2, 17),
    category: categories[1], categories: [categories[1]],
    societies: [societies[1]], images: [{ id: 'i16', full_url: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=400&q=80' }],
    schedule_entries: [{ id: 'se16', event_id: 'e16', location_id: 'l16', scheduled_at: futureDate(7, 20), is_end_schedule: false, schedule_order: 0, location: { id: 'l16', name: 'Riley Smith Hall', street: 'University of Leeds', postcode: 'LS2 9JT', google_maps_url: null } }, { id: 'se16e', event_id: 'e16', location_id: 'l16', scheduled_at: endDate(7, 23), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e17', name: 'Peak District Day Hike', description: 'Escape the city for a day! Coach transport to the Peak District, guided hike with stunning views, packed lunch included. Moderate difficulty — bring good boots.',
    is_free: false, price: 15, registration_url: 'https://example.com', source_post_url: null,
    like_count: 94, attend_count: 35, created_at: futureDate(-3, 10),
    category: categories[17], categories: [categories[17], categories[11]],
    societies: [societies[9]], images: [{ id: 'i17', full_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&q=80' }],
    schedule_entries: [{ id: 'se17', event_id: 'e17', location_id: 'l17', scheduled_at: futureDate(8, 7), is_end_schedule: false, schedule_order: 0, location: { id: 'l17', name: 'Sheffield Station', street: 'Sheaf Street', postcode: 'S1 2BP', google_maps_url: null } }, { id: 'se17e', event_id: 'e17', location_id: 'l17', scheduled_at: endDate(8, 18), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e18', name: 'Freshers\' Welcome Social', description: 'The ultimate icebreaker event. Games, music, free pizza, and the chance to meet hundreds of new people. Don\'t miss the biggest social of the term.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 445, attend_count: 620, created_at: futureDate(-10, 9),
    category: categories[0], categories: [categories[0]],
    societies: [societies[2]], images: [{ id: 'i18', full_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=400&q=80' }],
    schedule_entries: [{ id: 'se18', event_id: 'e18', location_id: 'l18', scheduled_at: futureDate(0, 18), is_end_schedule: false, schedule_order: 0, location: { id: 'l18', name: 'Great Hall', street: 'Chancellor\'s Court', postcode: 'B15 2TT', google_maps_url: null } }, { id: 'se18e', event_id: 'e18', location_id: 'l18', scheduled_at: endDate(0, 23), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: true,
  },
  {
    id: 'e19', name: 'Documentary Screening: Climate Crisis', description: 'Screening of an award-winning documentary on climate change followed by a panel discussion with environmental science lecturers. Free entry, donations welcome.',
    is_free: true, price: null, registration_url: null, source_post_url: null,
    like_count: 63, attend_count: 48, created_at: futureDate(-1, 11),
    category: categories[12], categories: [categories[12], categories[16]],
    societies: [societies[8]], images: [{ id: 'i19', full_url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=400&q=80' }],
    schedule_entries: [{ id: 'se19', event_id: 'e19', location_id: 'l19', scheduled_at: futureDate(6, 19), is_end_schedule: false, schedule_order: 0, location: { id: 'l19', name: 'Wills Memorial Building', street: 'Queens Road', postcode: 'BS8 1RJ', google_maps_url: null } }, { id: 'se19e', event_id: 'e19', location_id: 'l19', scheduled_at: endDate(6, 21, 30), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e20', name: 'Coding Bootcamp: Web Dev Basics', description: 'Two-day intensive bootcamp covering HTML, CSS, and JavaScript. Build and deploy your own website by the end. Laptops provided if needed.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 167, attend_count: 89, created_at: futureDate(-5, 8),
    category: categories[4], categories: [categories[4], categories[13]],
    societies: [societies[0]], images: [{ id: 'i20', full_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&q=80' }],
    schedule_entries: [{ id: 'se20', event_id: 'e20', location_id: 'l20', scheduled_at: futureDate(9, 9), is_end_schedule: false, schedule_order: 0, location: { id: 'l20', name: 'Alan Turing Building Lab 2.3', street: 'Oxford Road', postcode: 'M13 9PL', google_maps_url: null } }, { id: 'se20e', event_id: 'e20', location_id: 'l20', scheduled_at: endDate(10, 17), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e21', name: 'Pottery Masterclass', description: 'Get your hands dirty in this beginner-friendly pottery workshop. Learn to throw on the wheel, hand-build, and glaze. Take home your creations!',
    is_free: false, price: 12, registration_url: null, source_post_url: null,
    like_count: 54, attend_count: 22, created_at: futureDate(-1, 14),
    category: categories[15], categories: [categories[15], categories[5]],
    societies: [societies[3]], images: [{ id: 'i21', full_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?w=400&q=80' }],
    schedule_entries: [{ id: 'se21', event_id: 'e21', location_id: 'l21', scheduled_at: futureDate(5, 11), is_end_schedule: false, schedule_order: 0, location: { id: 'l21', name: 'Bower Ashton Studios', street: 'Kennel Lodge Road', postcode: 'BS3 2JT', google_maps_url: null } }, { id: 'se21e', event_id: 'e21', location_id: 'l21', scheduled_at: endDate(5, 15), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e22', name: 'Battle of the Bands', description: 'Six student bands compete for the ultimate title. Vote for your favourite! Special guest judge from BBC Introducing. Bar open all night.',
    is_free: false, price: 5, registration_url: null, source_post_url: null,
    like_count: 298, attend_count: 410, created_at: futureDate(-7, 13),
    category: categories[1], categories: [categories[1], categories[0]],
    societies: [societies[1]], images: [{ id: 'i22', full_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=400&q=80' }],
    schedule_entries: [{ id: 'se22', event_id: 'e22', location_id: 'l22', scheduled_at: futureDate(10, 19), is_end_schedule: false, schedule_order: 0, location: { id: 'l22', name: 'Refectory', street: 'University of Leeds', postcode: 'LS2 9JT', google_maps_url: null } }, { id: 'se22e', event_id: 'e22', location_id: 'l22', scheduled_at: endDate(10, 23, 30), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e23', name: 'Climbing Taster Session', description: 'Never climbed before? No problem. Our certified instructors will teach you the ropes (literally). Gear provided. Great way to meet active people.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 121, attend_count: 67, created_at: futureDate(-2, 9),
    category: categories[2], categories: [categories[2], categories[14]],
    societies: [societies[2]], images: [{ id: 'i23', full_url: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400&q=80' }],
    schedule_entries: [{ id: 'se23', event_id: 'e23', location_id: 'l23', scheduled_at: futureDate(2, 16), is_end_schedule: false, schedule_order: 0, location: { id: 'l23', name: 'Sport & Fitness Centre', street: 'Edgbaston Park Road', postcode: 'B15 2TT', google_maps_url: null } }, { id: 'se23e', event_id: 'e23', location_id: 'l23', scheduled_at: endDate(2, 18), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: false, isAttending: false,
  },
  {
    id: 'e24', name: 'TEDx University Talk', description: 'Hear from 6 speakers on the theme "Rethinking Tomorrow". Topics span AI ethics, mental health, sustainable fashion, and more. Limited seats — register early.',
    is_free: true, price: null, registration_url: 'https://example.com', source_post_url: null,
    like_count: 356, attend_count: 500, created_at: futureDate(-9, 10),
    category: categories[7], categories: [categories[7], categories[3]],
    societies: [societies[4]], images: [{ id: 'i24', full_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&q=80', small_url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&q=80' }],
    schedule_entries: [{ id: 'se24', event_id: 'e24', location_id: 'l24', scheduled_at: futureDate(12, 10), is_end_schedule: false, schedule_order: 0, location: { id: 'l24', name: 'Firth Hall', street: 'Western Bank', postcode: 'S10 2TN', google_maps_url: null } }, { id: 'se24e', event_id: 'e24', location_id: 'l24', scheduled_at: endDate(12, 16), is_end_schedule: true, schedule_order: 1, location: null }],
    isLiked: true, isAttending: true,
  },
];

// ── Mock user ─────────────────────────────────────────────────
export const mockUser: UserProfile = {
  id: 'user1',
  display_name: 'Alex Johnson',
  email: 'alex.johnson@manchester.ac.uk',
  avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
  university: universities[0],
  interests: [categories[4], categories[1], categories[0], categories[3], categories[13]],
};
