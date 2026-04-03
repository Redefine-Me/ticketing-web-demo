import { TicketType, TicketPurchase } from '@/types/mobile';

// ── Helper: past dates for mock purchases ────────────────────
function pastDate(daysAgo: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

// ── First names / last names for realistic mock buyers ───────
const firstNames = [
  'James', 'Olivia', 'Liam', 'Emma', 'Noah', 'Ava', 'Ethan', 'Sophia',
  'Mason', 'Isabella', 'Lucas', 'Mia', 'Oliver', 'Charlotte', 'Aiden',
  'Amelia', 'Elijah', 'Harper', 'Logan', 'Evelyn', 'Jacob', 'Abigail',
  'Michael', 'Emily', 'Daniel', 'Ella', 'Henry', 'Scarlett', 'Alexander',
  'Grace', 'Sebastian', 'Lily', 'Jack', 'Aria', 'Owen', 'Chloe', 'Samuel',
  'Zoey', 'Ryan', 'Penelope', 'Nathan', 'Layla', 'Leo', 'Riley', 'Adam',
  'Nora', 'Dylan', 'Zara', 'Caleb', 'Hannah',
];

const lastNames = [
  'Smith', 'Jones', 'Taylor', 'Brown', 'Wilson', 'Evans', 'Thomas',
  'Roberts', 'Johnson', 'Walker', 'Wright', 'Robinson', 'Thompson', 'White',
  'Hughes', 'Edwards', 'Green', 'Hall', 'Lewis', 'Harris', 'Clarke',
  'Jackson', 'Wood', 'Turner', 'Martin', 'Cooper', 'Hill', 'Ward', 'Morris',
  'Moore', 'King', 'Baker', 'Harrison', 'Morgan', 'Allen', 'Young',
  'Anderson', 'Mitchell', 'Campbell', 'Phillips',
];

function mockBuyer(seed: number) {
  const first = firstNames[seed % firstNames.length];
  const last = lastNames[(seed * 7 + 3) % lastNames.length];
  return {
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@student.manchester.ac.uk`,
  };
}

// ── Ticket Types for "Simpsons Trivia Night" (e-004) ────────
export const triviaTicketTypes: TicketType[] = [
  { id: 'tt-004-1', eventId: 'e-004', name: 'Member', price: 2.00, isMemberTicket: true, totalAvailable: 40 },
  { id: 'tt-004-2', eventId: 'e-004', name: 'Non-Member', price: 4.00, isMemberTicket: false, totalAvailable: 25 },
];

// ── Ticket Types for "Springfield Film Festival" (e-008) ─────
export const festivalTicketTypes: TicketType[] = [
  { id: 'tt-008-1', eventId: 'e-008', name: 'General Admission', price: 3.00, isMemberTicket: false, totalAvailable: 80 },
  { id: 'tt-008-2', eventId: 'e-008', name: 'Member Price', price: 1.00, isMemberTicket: true, totalAvailable: 30 },
];

// ── Ticket Types for "American Studies Spring Ball" (e-009) ──
export const ballTicketTypes: TicketType[] = [
  { id: 'tt-009-1', eventId: 'e-009', name: 'Early Bird', price: 25.00, isMemberTicket: false, totalAvailable: 50 },
  { id: 'tt-009-2', eventId: 'e-009', name: 'Standard', price: 35.00, isMemberTicket: false, totalAvailable: 100 },
  { id: 'tt-009-3', eventId: 'e-009', name: 'VIP', price: 55.00, isMemberTicket: false, totalAvailable: 20 },
];

// ── Generate mock purchases ──────────────────────────────────
function generatePurchases(
  ticketTypeId: string,
  eventId: string,
  count: number,
  seedOffset: number,
  attendedRatio: number,
): TicketPurchase[] {
  const purchases: TicketPurchase[] = [];
  for (let i = 0; i < count; i++) {
    const buyer = mockBuyer(seedOffset + i);
    const daysAgo = Math.floor((count - i) / 4) + 1;
    const hour = 9 + (i % 12);
    const isAttended = i < Math.floor(count * attendedRatio);
    purchases.push({
      id: `tp-${ticketTypeId}-${i}`,
      ticketTypeId,
      eventId,
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      purchasedAt: pastDate(daysAgo, hour, i * 3 % 60),
      attendedAt: isAttended ? pastDate(0, 19 + (i % 3), 10 + i * 2 % 50) : null,
    });
  }
  return purchases;
}

// Simpsons Trivia Night: 36 Member, 18 Non-Member = 54 total
export const triviaPurchases: TicketPurchase[] = [
  ...generatePurchases('tt-004-1', 'e-004', 36, 0, 0.78),   // 28 attended
  ...generatePurchases('tt-004-2', 'e-004', 18, 50, 0.67),   // 12 attended
];

// Springfield Film Festival: 52 General Admission, 24 Member = 76 total
export const festivalPurchases: TicketPurchase[] = [
  ...generatePurchases('tt-008-1', 'e-008', 52, 100, 0.77),  // 40 attended
  ...generatePurchases('tt-008-2', 'e-008', 24, 160, 0.83),  // 20 attended
];

// American Studies Spring Ball: 47 Early Bird, 68 Standard, 14 VIP = 129 total
export const ballPurchases: TicketPurchase[] = [
  ...generatePurchases('tt-009-1', 'e-009', 47, 200, 0.81),  // 38 attended
  ...generatePurchases('tt-009-2', 'e-009', 68, 260, 0.76),  // 52 attended
  ...generatePurchases('tt-009-3', 'e-009', 14, 340, 0.79),  // 11 attended
];

// ── All mock ticket data ─────────────────────────────────────
export const mockTicketTypes: TicketType[] = [
  ...triviaTicketTypes,
  ...festivalTicketTypes,
  ...ballTicketTypes,
];

export const mockPurchases: TicketPurchase[] = [
  ...triviaPurchases,
  ...festivalPurchases,
  ...ballPurchases,
];

// Events that have tickets configured
export const ticketedEventIds: string[] = ['e-004', 'e-008', 'e-009'];

// Predefined ticket name suggestions
export const ticketNameSuggestions = [
  'VIP',
  'Member Price',
  'Non-Member Price',
  'Early Bird',
  'Standard',
  'General Admission',
];
