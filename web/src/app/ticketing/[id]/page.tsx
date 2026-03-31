'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEventStore } from '@/context/EventStore';
import { getEventImageUrl, getSocietyName, getEventDate, getEventLocation } from '@/lib/helpers';
import { ArrowLeftIcon, CalendarOutlineIcon, LocationOutlineIcon } from '@/components/icons';

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

function formatShortTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function QRCodeBlock({ value, size }: { value: string; size: number }) {
  // Simple deterministic QR-like pattern from the event id
  const cells = 21;
  const cellSize = size / cells;
  const hash = Array.from(value).reduce((acc, c) => acc * 31 + c.charCodeAt(0), 0);

  const grid: boolean[][] = [];
  for (let r = 0; r < cells; r++) {
    grid[r] = [];
    for (let c = 0; c < cells; c++) {
      grid[r][c] = false;
    }
  }

  // Finder patterns (top-left, top-right, bottom-left)
  const drawFinder = (sr: number, sc: number) => {
    for (let r = 0; r < 7; r++) {
      for (let c = 0; c < 7; c++) {
        const isBorder = r === 0 || r === 6 || c === 0 || c === 6;
        const isInner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
        grid[sr + r][sc + c] = isBorder || isInner;
      }
    }
  };
  drawFinder(0, 0);
  drawFinder(0, cells - 7);
  drawFinder(cells - 7, 0);

  // Fill data area with pseudo-random pattern
  let seed = Math.abs(hash);
  for (let r = 0; r < cells; r++) {
    for (let c = 0; c < cells; c++) {
      // Skip finder pattern areas + separators
      const inFinder =
        (r < 8 && c < 8) ||
        (r < 8 && c >= cells - 8) ||
        (r >= cells - 8 && c < 8);
      if (inFinder) continue;
      seed = (seed * 1103515245 + 12345) & 0x7fffffff;
      grid[r][c] = seed % 3 !== 0;
    }
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <rect width={size} height={size} fill="white" rx="8" />
      {grid.map((row, r) =>
        row.map((filled, c) =>
          filled ? (
            <rect
              key={`${r}-${c}`}
              x={c * cellSize}
              y={r * cellSize}
              width={cellSize}
              height={cellSize}
              fill="#111"
            />
          ) : null
        )
      )}
    </svg>
  );
}

export default function TicketDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { getEvent } = useEventStore();
  const event = getEvent(id);

  if (!event) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <p className="text-gray-400 text-lg">Ticket not found</p>
        <button
          onClick={() => router.push('/ticketing')}
          className="mt-4 text-primary-500 text-sm font-medium"
        >
          Go back
        </button>
      </div>
    );
  }

  const imageUrl = getEventImageUrl(event);
  const societyName = getSocietyName(event);
  const date = getEventDate(event);
  const location = getEventLocation(event);
  const dateStr = date ? formatShortDate(date) : 'Date TBC';
  const timeStr = date ? formatShortTime(date) : '';

  return (
    <div className="px-4 py-4 space-y-6">
      {/* Back button */}
      <button
        onClick={() => router.push('/ticketing')}
        className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
      >
        <ArrowLeftIcon className="w-4 h-4" />
        Back
      </button>

      {/* Event header */}
      <div className="flex items-center gap-3">
        <div className="w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
          {imageUrl ? (
            <img src={imageUrl} alt={event.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              <CalendarOutlineIcon className="w-6 h-6" />
            </div>
          )}
        </div>
        <div className="min-w-0">
          <p className="text-xs text-gray-500 dark:text-gray-400">{societyName}</p>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white leading-tight truncate">{event.name}</h1>
        </div>
      </div>

      {/* QR Code card */}
      <div className="bg-gray-50 dark:bg-white rounded-2xl p-6 flex flex-col items-center gap-4 border border-gray-200 dark:border-transparent">
        <QRCodeBlock value={event.id} size={220} />
        <div className="text-center">
          <p className="text-gray-900 font-semibold text-sm">{event.name}</p>
          <p className="text-gray-500 text-xs mt-0.5">Scan to check in</p>
        </div>
      </div>

      {/* Event details summary */}
      <div className="space-y-3">
        <div className="flex items-center gap-3 text-sm">
          <CalendarOutlineIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300">{dateStr}{timeStr ? `, ${timeStr}` : ''}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <LocationOutlineIcon className="w-4 h-4 text-gray-500 flex-shrink-0" />
          <span className="text-gray-700 dark:text-gray-300">{location}</span>
        </div>
        {event.categories.length > 0 && (
          <div className="flex gap-1.5 mt-1">
            {event.categories.slice(0, 3).map(c => (
              <span
                key={c.id}
                className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
              >
                {c.name}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* More details button */}
      <button
        className="w-full py-3.5 rounded-xl bg-gray-900 dark:bg-white/10 text-white text-sm font-medium hover:bg-gray-800 dark:hover:bg-white/15 transition-colors"
        onClick={() => {}}
      >
        More details about event
      </button>
    </div>
  );
}
