import type { Society } from '@/supabase_lib/types';

export type CommitteeRole =
  | 'President'
  | 'Vice President'
  | 'Treasurer'
  | 'Secretary'
  | 'Social Secretary'
  | 'Events Officer'
  | 'Committee Member';

export const COMMITTEE_ROLES: CommitteeRole[] = [
  'President',
  'Vice President',
  'Treasurer',
  'Secretary',
  'Social Secretary',
  'Events Officer',
  'Committee Member',
];

export interface CommitteeMember {
  id: string;
  name: string;
  email: string;
  role: CommitteeRole;
  joinedAt: string;
}

export interface SocietyWithMembers {
  id: string;
  name: string;
  imageUrl: string | null;
  universityName: string;
  instagramHandle: string;
  members: CommitteeMember[];
}

// Pool of mock users for the "Add Member" search
export const AVAILABLE_USERS = [
  { name: 'Alice Chen', email: 'alice.chen@student.manchester.ac.uk' },
  { name: 'Ben Okafor', email: 'ben.okafor@student.manchester.ac.uk' },
  { name: 'Charlotte Webb', email: 'charlotte.webb@student.manchester.ac.uk' },
  { name: 'Daniel Kim', email: 'daniel.kim@student.manchester.ac.uk' },
  { name: 'Elena Rossi', email: 'elena.rossi@student.manchester.ac.uk' },
  { name: 'Fatima Al-Hassan', email: 'fatima.alhassan@student.manchester.ac.uk' },
  { name: 'George Patel', email: 'george.patel@student.manchester.ac.uk' },
  { name: 'Hannah Liu', email: 'hannah.liu@student.manchester.ac.uk' },
  { name: 'Ibrahim Yusuf', email: 'ibrahim.yusuf@student.manchester.ac.uk' },
  { name: 'Jessica Brown', email: 'jessica.brown@student.manchester.ac.uk' },
  { name: 'Kai Tanaka', email: 'kai.tanaka@student.manchester.ac.uk' },
  { name: 'Lily Evans', email: 'lily.evans@student.manchester.ac.uk' },
  { name: 'Marcus Johnson', email: 'marcus.johnson@student.manchester.ac.uk' },
  { name: 'Nadia Petrova', email: 'nadia.petrova@student.manchester.ac.uk' },
  { name: 'Oliver Wright', email: 'oliver.wright@student.manchester.ac.uk' },
  { name: 'Priya Sharma', email: 'priya.sharma@student.manchester.ac.uk' },
  { name: 'Ravi Gupta', email: 'ravi.gupta@student.manchester.ac.uk' },
  { name: 'Sophie Martin', email: 'sophie.martin@student.manchester.ac.uk' },
  { name: 'Tom Henderson', email: 'tom.henderson@student.manchester.ac.uk' },
  { name: 'Uma Krishnan', email: 'uma.krishnan@student.manchester.ac.uk' },
];

// Deterministic member assignments per society index
const MEMBER_CONFIGS: { name: string; email: string; role: CommitteeRole }[][] = [
  // Society 0 — 6 members
  [
    { name: 'Alice Chen', email: 'alice.chen@student.manchester.ac.uk', role: 'President' },
    { name: 'Ben Okafor', email: 'ben.okafor@student.manchester.ac.uk', role: 'Vice President' },
    { name: 'Charlotte Webb', email: 'charlotte.webb@student.manchester.ac.uk', role: 'Treasurer' },
    { name: 'Daniel Kim', email: 'daniel.kim@student.manchester.ac.uk', role: 'Secretary' },
    { name: 'Elena Rossi', email: 'elena.rossi@student.manchester.ac.uk', role: 'Events Officer' },
    { name: 'Fatima Al-Hassan', email: 'fatima.alhassan@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 1 — 4 members
  [
    { name: 'George Patel', email: 'george.patel@student.manchester.ac.uk', role: 'President' },
    { name: 'Hannah Liu', email: 'hannah.liu@student.manchester.ac.uk', role: 'Vice President' },
    { name: 'Ibrahim Yusuf', email: 'ibrahim.yusuf@student.manchester.ac.uk', role: 'Treasurer' },
    { name: 'Jessica Brown', email: 'jessica.brown@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 2 — 8 members
  [
    { name: 'Kai Tanaka', email: 'kai.tanaka@student.manchester.ac.uk', role: 'President' },
    { name: 'Lily Evans', email: 'lily.evans@student.manchester.ac.uk', role: 'Vice President' },
    { name: 'Marcus Johnson', email: 'marcus.johnson@student.manchester.ac.uk', role: 'Treasurer' },
    { name: 'Nadia Petrova', email: 'nadia.petrova@student.manchester.ac.uk', role: 'Secretary' },
    { name: 'Oliver Wright', email: 'oliver.wright@student.manchester.ac.uk', role: 'Social Secretary' },
    { name: 'Priya Sharma', email: 'priya.sharma@student.manchester.ac.uk', role: 'Events Officer' },
    { name: 'Ravi Gupta', email: 'ravi.gupta@student.manchester.ac.uk', role: 'Committee Member' },
    { name: 'Sophie Martin', email: 'sophie.martin@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 3 — 3 members
  [
    { name: 'Tom Henderson', email: 'tom.henderson@student.manchester.ac.uk', role: 'President' },
    { name: 'Uma Krishnan', email: 'uma.krishnan@student.manchester.ac.uk', role: 'Vice President' },
    { name: 'Alice Chen', email: 'alice.chen@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 4 — 5 members
  [
    { name: 'Ben Okafor', email: 'ben.okafor@student.manchester.ac.uk', role: 'President' },
    { name: 'Charlotte Webb', email: 'charlotte.webb@student.manchester.ac.uk', role: 'Treasurer' },
    { name: 'Daniel Kim', email: 'daniel.kim@student.manchester.ac.uk', role: 'Social Secretary' },
    { name: 'Elena Rossi', email: 'elena.rossi@student.manchester.ac.uk', role: 'Events Officer' },
    { name: 'Fatima Al-Hassan', email: 'fatima.alhassan@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 5 — 7 members
  [
    { name: 'George Patel', email: 'george.patel@student.manchester.ac.uk', role: 'President' },
    { name: 'Hannah Liu', email: 'hannah.liu@student.manchester.ac.uk', role: 'Vice President' },
    { name: 'Ibrahim Yusuf', email: 'ibrahim.yusuf@student.manchester.ac.uk', role: 'Secretary' },
    { name: 'Jessica Brown', email: 'jessica.brown@student.manchester.ac.uk', role: 'Treasurer' },
    { name: 'Kai Tanaka', email: 'kai.tanaka@student.manchester.ac.uk', role: 'Social Secretary' },
    { name: 'Lily Evans', email: 'lily.evans@student.manchester.ac.uk', role: 'Events Officer' },
    { name: 'Marcus Johnson', email: 'marcus.johnson@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 6 — 2 members
  [
    { name: 'Nadia Petrova', email: 'nadia.petrova@student.manchester.ac.uk', role: 'President' },
    { name: 'Oliver Wright', email: 'oliver.wright@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 7 — 5 members
  [
    { name: 'Priya Sharma', email: 'priya.sharma@student.manchester.ac.uk', role: 'President' },
    { name: 'Ravi Gupta', email: 'ravi.gupta@student.manchester.ac.uk', role: 'Vice President' },
    { name: 'Sophie Martin', email: 'sophie.martin@student.manchester.ac.uk', role: 'Treasurer' },
    { name: 'Tom Henderson', email: 'tom.henderson@student.manchester.ac.uk', role: 'Events Officer' },
    { name: 'Uma Krishnan', email: 'uma.krishnan@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 8 — 4 members
  [
    { name: 'Alice Chen', email: 'alice.chen@student.manchester.ac.uk', role: 'President' },
    { name: 'Marcus Johnson', email: 'marcus.johnson@student.manchester.ac.uk', role: 'Vice President' },
    { name: 'Hannah Liu', email: 'hannah.liu@student.manchester.ac.uk', role: 'Secretary' },
    { name: 'Daniel Kim', email: 'daniel.kim@student.manchester.ac.uk', role: 'Committee Member' },
  ],
  // Society 9 — 6 members
  [
    { name: 'Elena Rossi', email: 'elena.rossi@student.manchester.ac.uk', role: 'President' },
    { name: 'Fatima Al-Hassan', email: 'fatima.alhassan@student.manchester.ac.uk', role: 'Vice President' },
    { name: 'George Patel', email: 'george.patel@student.manchester.ac.uk', role: 'Treasurer' },
    { name: 'Jessica Brown', email: 'jessica.brown@student.manchester.ac.uk', role: 'Secretary' },
    { name: 'Kai Tanaka', email: 'kai.tanaka@student.manchester.ac.uk', role: 'Social Secretary' },
    { name: 'Lily Evans', email: 'lily.evans@student.manchester.ac.uk', role: 'Committee Member' },
  ],
];

/**
 * Generate mock committee data using real society names from Supabase.
 * Picks up to 10 societies, ensuring any society with "robot" in the name is included.
 */
export function generateMockData(societies: Society[]): SocietyWithMembers[] {
  if (societies.length === 0) return [];

  // Ensure robotsoc is included
  const robotSoc = societies.find((s) =>
    s.name.toLowerCase().includes('robot') || s.instagram.toLowerCase().includes('robot')
  );

  const otherSocieties = societies.filter((s) => s.id !== robotSoc?.id);
  const selected: Society[] = [];

  if (robotSoc) selected.push(robotSoc);

  // Fill up to 10 with evenly-spaced picks from the sorted list
  const needed = 10 - selected.length;
  const step = Math.max(1, Math.floor(otherSocieties.length / needed));
  for (let i = 0; i < otherSocieties.length && selected.length < 10; i += step) {
    selected.push(otherSocieties[i]);
  }

  return selected.map((society, idx) => {
    const config = MEMBER_CONFIGS[idx % MEMBER_CONFIGS.length];
    const members: CommitteeMember[] = config.map((m, mIdx) => ({
      id: `${society.id}-member-${mIdx}`,
      name: m.name,
      email: m.email,
      role: m.role,
      joinedAt: new Date(2025, 8 + (mIdx % 4), 1 + mIdx * 3).toISOString(),
    }));

    return {
      id: society.id,
      name: society.name,
      imageUrl: society.imageUrl || null,
      universityName: society.university,
      instagramHandle: society.instagram,
      members,
    };
  });
}
