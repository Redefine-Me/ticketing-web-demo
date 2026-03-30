import { TicketType, TicketPurchase } from '@/types';

// ── Helper: past dates for mock purchases ────────────────────
function pastDate(daysAgo: number, hour: number, minute = 0): string {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  d.setHours(hour, minute, 0, 0);
  return d.toISOString();
}

// ── First names / last names for realistic mock buyers ───────
const firstNames = [
  'Emma', 'Liam', 'Olivia', 'Noah', 'Ava', 'James', 'Sophia', 'Oliver',
  'Isabella', 'William', 'Mia', 'Benjamin', 'Charlotte', 'Elijah', 'Amelia',
  'Lucas', 'Harper', 'Mason', 'Evelyn', 'Logan', 'Abigail', 'Alexander',
  'Emily', 'Ethan', 'Elizabeth', 'Jacob', 'Sofia', 'Michael', 'Avery', 'Daniel',
  'Ella', 'Henry', 'Scarlett', 'Sebastian', 'Grace', 'Jack', 'Chloe', 'Aiden',
  'Victoria', 'Owen', 'Riley', 'Samuel', 'Aria', 'Ryan', 'Lily', 'Nathan',
  'Zoey', 'Caleb', 'Penelope', 'Christian',
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller',
  'Davis', 'Rodriguez', 'Martinez', 'Wilson', 'Anderson', 'Taylor', 'Thomas',
  'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson', 'White', 'Harris',
  'Clark', 'Lewis', 'Robinson', 'Walker', 'Young', 'Allen', 'King', 'Wright',
  'Scott', 'Torres', 'Hill', 'Flores', 'Green', 'Adams', 'Nelson', 'Baker',
  'Hall', 'Rivera', 'Campbell', 'Mitchell', 'Carter', 'Roberts', 'Gomez',
  'Phillips', 'Evans', 'Turner', 'Diaz', 'Parker',
];

function mockBuyer(seed: number) {
  const first = firstNames[seed % firstNames.length];
  const last = lastNames[(seed * 7 + 3) % lastNames.length];
  return {
    name: `${first} ${last}`,
    email: `${first.toLowerCase()}.${last.toLowerCase()}@student.ac.uk`,
  };
}

// ── Ticket Types for "Battle of the Bands" (e22) ────────────
export const battleOfBandsTicketTypes: TicketType[] = [
  { id: 'tt-1', eventId: 'e22', name: 'Early Bird', price: 3.00, isMemberTicket: false, totalAvailable: 50 },
  { id: 'tt-2', eventId: 'e22', name: 'Standard', price: 5.00, isMemberTicket: false, totalAvailable: 100 },
  { id: 'tt-3', eventId: 'e22', name: 'VIP', price: 10.00, isMemberTicket: false, totalAvailable: 20 },
];

// ── Ticket Types for "Pub Quiz Night" (e11) ──────────────────
export const pubQuizTicketTypes: TicketType[] = [
  { id: 'tt-4', eventId: 'e11', name: 'Member', price: 1.00, isMemberTicket: true, totalAvailable: 40 },
  { id: 'tt-5', eventId: 'e11', name: 'Non-Member', price: 3.00, isMemberTicket: false, totalAvailable: 20 },
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

// Battle of the Bands: 47 Early Bird, 68 Standard, 14 VIP = 129 total
export const battleOfBandsPurchases: TicketPurchase[] = [
  ...generatePurchases('tt-1', 'e22', 47, 0, 0.3),
  ...generatePurchases('tt-2', 'e22', 68, 50, 0.2),
  ...generatePurchases('tt-3', 'e22', 14, 120, 0.4),
];

// Pub Quiz Night: 34 Member, 12 Non-Member = 46 total
export const pubQuizPurchases: TicketPurchase[] = [
  ...generatePurchases('tt-4', 'e11', 34, 140, 0.25),
  ...generatePurchases('tt-5', 'e11', 12, 180, 0.15),
];

// ── All mock ticket data ─────────────────────────────────────
export const mockTicketTypes: TicketType[] = [
  ...battleOfBandsTicketTypes,
  ...pubQuizTicketTypes,
];

export const mockPurchases: TicketPurchase[] = [
  ...battleOfBandsPurchases,
  ...pubQuizPurchases,
];

// Events that have tickets configured
export const ticketedEventIds: string[] = ['e22', 'e11'];

// Predefined ticket name suggestions
export const ticketNameSuggestions = [
  'VIP',
  'Member Price',
  'Non-Member Price',
  'Early Bird',
  'Standard',
  'General Admission',
];
