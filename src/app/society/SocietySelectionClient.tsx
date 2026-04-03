'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

interface MockSociety {
  dirName: string;
  displayName: string;
  handle: string;
}

export function SocietySelectionClient({ societies }: { societies: MockSociety[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [checking, setChecking] = useState(true);

  // Check localStorage on mount — redirect if society already selected
  useEffect(() => {
    const saved = localStorage.getItem('rm_demo_society');
    if (saved) {
      router.replace(`/society/${saved}/dashboard`);
    } else {
      setChecking(false);
    }
  }, [router]);

  const filtered = useMemo(() => {
    if (!search.trim()) return societies;
    const q = search.toLowerCase();
    return societies.filter(
      (s) =>
        s.displayName.toLowerCase().includes(q) ||
        s.handle.toLowerCase().includes(q)
    );
  }, [societies, search]);

  const handleSelect = (society: MockSociety) => {
    localStorage.setItem('rm_demo_society', society.dirName);
    router.push(`/society/${society.dirName}/dashboard`);
  };

  // Don't flash the picker while checking localStorage
  if (checking) return null;

  return (
    <div>
      {/* Search bar */}
      <div className="relative mb-6">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--muted)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search societies..."
          className="w-full pl-10 pr-4 py-3 text-sm bg-[var(--surface)] border border-[var(--border)] rounded-xl text-[var(--text)] placeholder:text-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-[#DC2626]/30 focus:border-[#DC2626] transition-all"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted)] hover:text-[var(--text)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-xs text-[var(--muted)] mb-4">
        {filtered.length} {filtered.length === 1 ? 'society' : 'societies'} found
      </p>

      {/* Society grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-[var(--muted)]">No societies match your search.</p>
        </div>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((society, index) => (
            <motion.button
              key={society.dirName}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3), ease: 'easeOut' }}
              onClick={() => handleSelect(society)}
              className="flex items-center gap-3 p-3.5 bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] text-left transition-all duration-[120ms] hover:-translate-y-0.5 hover:shadow-lg hover:border-[#DC2626] hover:ring-2 hover:ring-[#DC2626]/20 cursor-pointer"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#DC2626]/10 text-[#DC2626] font-semibold text-sm flex-shrink-0">
                {society.displayName
                  .split(' ')
                  .map((w) => w[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div className="min-w-0">
                <p className="font-medium text-sm text-[var(--text)] truncate">{society.displayName}</p>
                {society.handle && (
                  <p className="text-xs text-[var(--muted)] truncate">@{society.handle}</p>
                )}
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
