import fs from 'fs';
import path from 'path';
import { SOCIETY_TOKENS, getTokenForSociety } from '@/lib/society-tokens';
import { AdminDashboardClient } from './AdminDashboardClient';

interface SocietyStatus {
  dirName: string;
  displayName: string;
  handle: string;
  token: string | undefined;
  demoUrl: string | undefined;
  hasAccountDetails: boolean;
  hasMockEvents: boolean;
  hasEventCovers: boolean;
  eventCoverCount: number;
  hasAiGenerations: boolean;
  aiGenerationCount: number;
  hasImagePrompts: boolean;
  hasCoverPrompts: boolean;
  mockEventCount: number;
}

function getSocietyStatuses(): SocietyStatus[] {
  const mockDataDir = path.join(process.cwd(), 'public', 'mock-data');
  if (!fs.existsSync(mockDataDir)) return [];

  return fs
    .readdirSync(mockDataDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const dir = path.join(mockDataDir, d.name);
      const displayName = d.name.replace(/_/g, ' ');

      let handle = '';
      const hasAccountDetails = fs.existsSync(path.join(dir, 'account-details.json'));
      if (hasAccountDetails) {
        try {
          const details = JSON.parse(
            fs.readFileSync(path.join(dir, 'account-details.json'), 'utf-8')
          );
          handle = details.handle ?? '';
        } catch { /* ignore */ }
      }

      const hasMockEvents = fs.existsSync(path.join(dir, 'mock-events.json'));
      let mockEventCount = 0;
      if (hasMockEvents) {
        try {
          const events = JSON.parse(
            fs.readFileSync(path.join(dir, 'mock-events.json'), 'utf-8')
          );
          mockEventCount = Array.isArray(events) ? events.length : 0;
        } catch { /* ignore */ }
      }

      const coversDir = path.join(dir, 'event-covers');
      const hasEventCovers = fs.existsSync(coversDir);
      let eventCoverCount = 0;
      if (hasEventCovers) {
        eventCoverCount = fs.readdirSync(coversDir).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f)).length;
      }

      const aiDir = path.join(dir, 'ai-image-generations');
      const hasAiGenerations = fs.existsSync(aiDir);
      let aiGenerationCount = 0;
      if (hasAiGenerations) {
        aiGenerationCount = fs.readdirSync(aiDir).filter((f) => /\.(png|jpg|jpeg|webp)$/i.test(f)).length;
      }

      const token = getTokenForSociety(d.name);

      return {
        dirName: d.name,
        displayName,
        handle,
        token,
        demoUrl: token ? `/society?token=${token}` : undefined,
        hasAccountDetails,
        hasMockEvents,
        hasEventCovers,
        eventCoverCount,
        hasAiGenerations,
        aiGenerationCount,
        hasImagePrompts: fs.existsSync(path.join(dir, 'image-prompts.md')),
        hasCoverPrompts: fs.existsSync(path.join(dir, 'event-cover-prompts.md')),
        mockEventCount,
      };
    })
    .sort((a, b) => a.displayName.localeCompare(b.displayName));
}

export default function AdminPage() {
  const statuses = getSocietyStatuses();

  // Societies in token list but missing from mock-data
  const missingDirs = SOCIETY_TOKENS.filter(
    (t) => !statuses.some((s) => s.dirName === t.dirName)
  );

  return <AdminDashboardClient statuses={statuses} missingTokenEntries={missingDirs} />;
}
