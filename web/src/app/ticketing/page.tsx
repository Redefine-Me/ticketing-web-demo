'use client';

import { useState, useMemo } from 'react';
import { useEventStore } from '@/context/EventStore';
import { categories } from '@/lib/mock-data';
import { groupEventsByDate, formatEventDateTime, getEventLocation, getSocietyName, getEventImageUrl, getEventPrice } from '@/lib/helpers';
import { SearchBar } from '@/components/SearchBar';
import { CategoryChip } from '@/components/CategoryPills';
import { CategoryPills } from '@/components/CategoryPills';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, TicketIcon } from '@/components/icons';

export default function TicketingPage() {
  const { attendingEvents, toggleAttending } = useEventStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let result = attendingEvents;
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        e =>
          e.name.toLowerCase().includes(q) ||
          e.societies.some(s => s.name.toLowerCase().includes(q)) ||
          e.description?.toLowerCase().includes(q)
      );
    }
    if (activeCategory) {
      result = result.filter(e =>
        e.categories.some(c => c.name === activeCategory) ||
        e.category?.name === activeCategory
      );
    }
    return result;
  }, [attendingEvents, search, activeCategory]);

  const sections = useMemo(() => groupEventsByDate(filtered), [filtered]);

  // Get unique categories from attending events
  const eventCategories = useMemo(() => {
    const cats = new Set<string>();
    attendingEvents.forEach(e => {
      e.categories.forEach(c => cats.add(c.name));
      if (e.category) cats.add(e.category.name);
    });
    return categories.filter(c => cats.has(c.name));
  }, [attendingEvents]);

  if (attendingEvents.length === 0) {
    return (
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Your Tickets</h1>
        <div className="flex flex-col items-center justify-center py-20">
          <TicketIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No tickets yet</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-xs">
            When you mark events as going, your tickets will appear here
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
    <div className="px-4 py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">Your Tickets</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {attendingEvents.length} event{attendingEvents.length !== 1 ? 's' : ''} you&apos;re attending
        </p>
      </div>

      <SearchBar value={search} onChange={setSearch} placeholder="Search your tickets..." />

      {/* Category filters */}
      {eventCategories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-1">
          <button
            onClick={() => setActiveCategory(null)}
            className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !activeCategory
                ? 'bg-gray-900 dark:bg-white text-white dark:text-gray-900'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            All
          </button>
          {eventCategories.map(cat => (
            <CategoryChip
              key={cat.id}
              name={cat.name}
              slug={cat.slug}
              active={activeCategory === cat.name}
              onClick={() => setActiveCategory(activeCategory === cat.name ? null : cat.name)}
            />
          ))}
        </div>
      )}

      {/* Ticket cards */}
      {sections.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-4xl mb-3">🔍</p>
          <p className="text-gray-500 dark:text-gray-400">No matching tickets</p>
        </div>
      ) : (
        <div className="space-y-8">
          {sections.map(section => (
            <div key={section.label}>
              <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                {section.label}
              </h3>
              <div className="space-y-4 stagger-children">
                {section.events.map(event => (
                  <TicketCard key={event.id} event={event} onCancel={() => toggleAttending(event.id)} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function TicketCard({
  event,
  onCancel,
}: {
  event: import('@/types').EventWithDetails;
  onCancel: () => void;
}) {
  const imageUrl = getEventImageUrl(event);
  const societyName = getSocietyName(event);
  const location = getEventLocation(event);
  const dateTime = formatEventDateTime(event);
  const price = getEventPrice(event);

  return (
    <div className="bg-white dark:bg-[#2C2C2E] rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-shadow">
      <Link href={`/event/${event.id}`} className="block">
        {/* Top section with image */}
        <div className="relative h-40 bg-gray-100 dark:bg-gray-700">
          {imageUrl ? (
            <img src={imageUrl} alt={event.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-4xl">📅</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-3 left-4 right-4">
            <p className="text-white/80 text-xs mb-0.5">{societyName}</p>
            <h3 className="text-white font-bold text-lg leading-tight">{event.name}</h3>
          </div>
          <div className="absolute top-3 right-3 flex gap-2">
            <span className="bg-emerald-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-full">
              Attending
            </span>
            <span className="bg-black/50 backdrop-blur text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
              {price}
            </span>
          </div>
        </div>

        {/* Ticket details — dashed divider */}
        <div className="relative">
          <div className="absolute -left-3 top-0 w-6 h-6 bg-[var(--background)] rounded-full -translate-y-1/2" />
          <div className="absolute -right-3 top-0 w-6 h-6 bg-[var(--background)] rounded-full -translate-y-1/2" />
          <div className="border-t-2 border-dashed border-gray-200 dark:border-gray-700 mx-6" />
        </div>

        <div className="p-4 space-y-2.5">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CalendarIcon className="w-4 h-4 flex-shrink-0" />
            <span>{dateTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <MapPinIcon className="w-4 h-4 flex-shrink-0" />
            <span>{location}</span>
          </div>
          {event.categories.length > 0 && (
            <CategoryPills categories={event.categories} max={3} size="small" />
          )}
        </div>
      </Link>

      {/* Actions */}
      <div className="px-4 pb-4 flex gap-3">
        {event.registration_url && (
          <a
            href={event.registration_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-center py-2.5 bg-primary-500 text-white rounded-xl text-sm font-medium hover:bg-primary-600 transition-colors"
            onClick={(e) => e.stopPropagation()}
          >
            View Registration
          </a>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onCancel();
          }}
          className="flex-1 text-center py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
