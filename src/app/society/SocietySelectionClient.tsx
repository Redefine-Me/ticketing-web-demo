'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import type { Society } from '@/supabase_lib/types';

function setSocietyCookie(society: Society) {
  const payload = JSON.stringify({
    id: society.id,
    name: society.name,
    imageUrl: society.imageUrl,
    university: society.university,
    instagram: society.instagram,
  });
  // Set cookie for 30 days
  document.cookie = `rm_demo_society_id=${society.id}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
  document.cookie = `rm_demo_society=${encodeURIComponent(payload)}; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax`;
}

export function SocietySelectionClient({ societies }: { societies: Society[] }) {
  const router = useRouter();
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return societies;
    const q = search.toLowerCase();
    return societies.filter(
      s =>
        s.name.toLowerCase().includes(q) ||
        s.university.toLowerCase().includes(q) ||
        s.instagram.toLowerCase().includes(q)
    );
  }, [societies, search]);

  const handleSelect = (society: Society) => {
    setSocietyCookie(society);
    router.push(`/society/${society.id}/dashboard`);
  };

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
          onChange={e => setSearch(e.target.value)}
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
              key={society.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3), ease: 'easeOut' }}
              onClick={() => handleSelect(society)}
              className="flex items-center gap-3 p-3.5 bg-[var(--surface)] rounded-[var(--radius)] border border-[var(--border)] text-left transition-all duration-[120ms] hover:-translate-y-0.5 hover:shadow-lg hover:border-[#DC2626] hover:ring-2 hover:ring-[#DC2626]/20 cursor-pointer"
            >
              <Image
                src={society.imageUrl || '/logos/rm-dot-logo.png'}
                alt={society.name}
                width={44}
                height={44}
                className="rounded-full object-cover flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="font-medium text-sm text-[var(--text)] truncate">{society.name}</p>
                <p className="text-xs text-[var(--muted)] truncate">{society.university}</p>
              </div>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
