import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { GlobalSpotlight } from '@/components/ui/spotlight';
import { SocietySelectionClient } from './SocietySelectionClient';

interface MockSociety {
  dirName: string;
  displayName: string;
  handle: string;
}

function getMockSocieties(): MockSociety[] {
  const mockDataDir = path.join(process.cwd(), 'public', 'mock-data');
  if (!fs.existsSync(mockDataDir)) return [];

  return fs
    .readdirSync(mockDataDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => {
      const displayName = d.name.replace(/_/g, ' ');
      let handle = '';
      try {
        const details = JSON.parse(
          fs.readFileSync(path.join(mockDataDir, d.name, 'account-details.json'), 'utf-8')
        );
        handle = details.handle ?? '';
      } catch {
        // no account-details
      }
      return { dirName: d.name, displayName, handle };
    });
}

export default function SocietyPickerPage() {
  const societies = getMockSocieties();

  return (
    <AuroraBackground className="min-h-screen">
      <GlobalSpotlight size={400} color="rgba(220, 38, 38, 0.06)" />
      <div className="relative z-10">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[var(--surface)]/80 backdrop-blur-md border-b border-[var(--border)] px-6 py-3 flex items-center">
          <div className="flex items-center gap-3">
            <Image
              src="/logos/rm-dot-logo.png"
              alt="RedefineMe"
              width={120}
              height={30}
            />
            <span className="text-xs font-medium text-[#DC2626] bg-[#DC2626]/10 px-2 py-0.5 rounded-full">
              Society Demo
            </span>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-6 py-10">
          <h1 className="text-2xl font-semibold text-[var(--text)] mb-1">
            Select Your Society
          </h1>
          <p className="text-[var(--muted)] mb-6">
            Choose a society to explore the dashboard demo.
          </p>

          <SocietySelectionClient societies={societies} />
        </main>
      </div>
    </AuroraBackground>
  );
}
