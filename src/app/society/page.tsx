import Image from 'next/image';
import { AuroraBackground } from '@/components/ui/aurora-background';
import { GlobalSpotlight } from '@/components/ui/spotlight';
import { SocietyTokenGate } from './SocietyTokenGate';

export default function SocietyPickerPage() {
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

        {/* Content — client component reads ?token param */}
        <main className="max-w-xl mx-auto px-6 py-16">
          <SocietyTokenGate />
        </main>
      </div>
    </AuroraBackground>
  );
}
