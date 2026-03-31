'use client';

import { useEventStore } from '@/context/EventStore';
import { getEventImageUrl, getSocietyName, getEventDate } from '@/lib/helpers';
import Link from 'next/link';
import { CalendarOutlineIcon, TicketIcon, QRCodeIcon } from '@/components/icons';

function formatShortDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
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

export default function TicketingPage() {
  const { attendingEvents } = useEventStore();

  if (attendingEvents.length === 0) {
    return (
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Tickets</h1>
        <div className="flex flex-col items-center justify-center py-20">
          <TicketIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No tickets yet</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-xs">
            When you mark events as attending, your tickets will appear here
          </p>
          <Link
            href="/"
            className="mt-6 px-6 py-2.5 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            Discover Events
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 py-6">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Tickets</h1>

      <div className="space-y-3">
        {attendingEvents.map(event => {
          const imageUrl = getEventImageUrl(event);
          const societyName = getSocietyName(event);
          const date = getEventDate(event);
          const dateStr = date ? `${formatShortDate(date)}, ${formatShortTime(date)}` : 'Date TBC';
          const cats = event.categories.slice(0, 2);

          return (
            <Link
              key={event.id}
              href={`/ticketing/${event.id}`}
              className="flex items-center gap-3 p-3 rounded-2xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
            >
              {/* Event image */}
              <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                {imageUrl ? (
                  <img src={imageUrl} alt={event.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400">
                    <CalendarOutlineIcon className="w-6 h-6" />
                  </div>
                )}
              </div>

              {/* Event info */}
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{societyName}</p>
                <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{event.name}</h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">{dateStr}</p>
                {cats.length > 0 && (
                  <div className="flex gap-1.5 mt-1">
                    {cats.map(c => (
                      <span
                        key={c.id}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400"
                      >
                        {c.name}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* QR code icon */}
              <div className="flex-shrink-0">
                <QRCodeIcon className="w-7 h-7 text-gray-400 dark:text-white/70" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
