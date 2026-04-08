'use client';

import { useState } from 'react';
import type { SocietyToken } from '@/lib/society-tokens';

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

function StatusBadge({ ok, label }: { ok: boolean; label: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
        ok
          ? 'bg-emerald-50 text-emerald-700'
          : 'bg-amber-50 text-amber-700'
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`} />
      {label}
    </span>
  );
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 transition-colors"
    >
      {copied ? (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Copied
        </>
      ) : (
        <>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Copy link
        </>
      )}
    </button>
  );
}

function isFullyGenerated(s: SocietyStatus): boolean {
  return s.hasAccountDetails && s.hasMockEvents && s.eventCoverCount > 0 && s.aiGenerationCount > 0;
}

export function AdminDashboardClient({
  statuses,
  missingTokenEntries,
}: {
  statuses: SocietyStatus[];
  missingTokenEntries: SocietyToken[];
}) {
  const [filter, setFilter] = useState<'all' | 'done' | 'needs-work'>('all');

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

  const filtered = statuses.filter((s) => {
    if (filter === 'done') return isFullyGenerated(s);
    if (filter === 'needs-work') return !isFullyGenerated(s);
    return true;
  });

  const doneCount = statuses.filter(isFullyGenerated).length;
  const needsWorkCount = statuses.length - doneCount;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Admin Dashboard</h1>
            <p className="text-sm text-gray-500">Society demo generation status</p>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {doneCount} ready
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {needsWorkCount} needs work
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        {/* Filter tabs */}
        <div className="flex gap-1 bg-gray-100 rounded-lg p-1 w-fit">
          {(['all', 'done', 'needs-work'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                filter === f
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f === 'all' ? `All (${statuses.length})` : f === 'done' ? `Ready (${doneCount})` : `Needs Work (${needsWorkCount})`}
            </button>
          ))}
        </div>

        {/* Society cards */}
        <div className="space-y-3">
          {filtered.map((s) => {
            const done = isFullyGenerated(s);
            const fullDemoUrl = s.demoUrl ? `${baseUrl}${s.demoUrl}` : null;

            return (
              <div
                key={s.dirName}
                className={`bg-white rounded-xl border p-5 ${
                  done ? 'border-gray-200' : 'border-amber-200'
                }`}
              >
                {/* Header row: name stretches, badge + dir fixed right */}
                <div className="grid grid-cols-[1fr_auto_auto] items-center gap-x-4 mb-1">
                  <div className="flex items-center gap-2 min-w-0">
                    <h2 className="text-sm font-semibold text-gray-900 truncate">
                      {s.displayName}
                    </h2>
                    {s.handle && (
                      <span className="text-xs text-gray-400 shrink-0">@{s.handle}</span>
                    )}
                  </div>
                  <StatusBadge ok={done} label={done ? 'Ready' : 'Incomplete'} />
                  <code className="text-[10px] text-gray-400 whitespace-nowrap hidden sm:block w-52 text-left">
                    {s.dirName}
                  </code>
                </div>

                {/* Demo link */}
                {fullDemoUrl ? (
                  <div className="flex items-center gap-2 mb-3">
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600 truncate">
                      {fullDemoUrl}
                    </code>
                    <CopyButton text={fullDemoUrl} />
                  </div>
                ) : (
                  <p className="text-xs text-amber-600 mb-3">
                    No token assigned — add entry to society-tokens.ts
                  </p>
                )}

                {/* Asset status grid — fixed 4 equal columns */}
                <div className="grid grid-cols-4 gap-x-4 gap-y-2 text-xs">
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.hasAccountDetails ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-600">Account details</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.hasMockEvents ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-600">
                      Mock events{s.mockEventCount > 0 && ` (${s.mockEventCount})`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.eventCoverCount > 0 ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-600">
                      Event covers{s.eventCoverCount > 0 && ` (${s.eventCoverCount})`}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.aiGenerationCount > 0 ? 'bg-emerald-500' : 'bg-gray-300'}`} />
                    <span className="text-gray-600">
                      AI posters{s.aiGenerationCount > 0 && ` (${s.aiGenerationCount})`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Missing token entries */}
        {missingTokenEntries.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold text-red-800 mb-2">
              Token entries with no mock-data directory
            </h3>
            <ul className="text-xs text-red-700 space-y-1">
              {missingTokenEntries.map((t) => (
                <li key={t.token}>
                  <code>{t.dirName}</code> — token exists but directory missing from /public/mock-data/
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>
    </div>
  );
}
