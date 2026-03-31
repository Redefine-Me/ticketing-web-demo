'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useEventStore } from '@/context/EventStore';
import { mockUser, universities, categories } from '@/lib/mock-data';
import { groupEventsByDate } from '@/lib/helpers';
import { EventCard, AttendingEventCard } from '@/components/EventCard';
import { CategoryChip } from '@/components/CategoryPills';
import { UniversityCard } from '@/components/UniversityCard';
import { SearchBar } from '@/components/SearchBar';
import { ChevronRightIcon, SearchOutlineIcon } from '@/components/icons';

export default function HomePage() {
  const { events, attendingEvents } = useEventStore();
  const [search, setSearch] = useState('');

  const filteredEvents = useMemo(() => {
    if (!search.trim()) return events;
    const q = search.toLowerCase();
    return events.filter(
      e =>
        e.name.toLowerCase().includes(q) ||
        e.societies.some(s => s.name.toLowerCase().includes(q)) ||
        e.description?.toLowerCase().includes(q)
    );
  }, [events, search]);

  const sections = useMemo(() => groupEventsByDate(filteredEvents), [filteredEvents]);

  return (
    <div className="px-4 py-6 space-y-5">
      {/* Your Events Carousel */}
      {attendingEvents.length > 0 && (
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Your Events</h2>
            <Link
              href="/ticketing"
              className="text-sm text-primary-500 hover:text-primary-600 font-medium flex items-center gap-0.5"
            >
              View All <ChevronRightIcon className="w-4 h-4" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
            {attendingEvents.slice(0, 6).map(event => (
              <AttendingEventCard key={event.id} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Search */}
      <section>
        <SearchBar value={search} onChange={setSearch} placeholder="Search events, societies..." />
      </section>

      {!search && (
        <div className="space-y-2">
          {/* Categories */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Browse by Category</h2>
            <div className="flex gap-2 overflow-x-auto hide-scrollbar pb-2">
              {categories.map(cat => (
                <CategoryChip key={cat.id} name={cat.name} slug={cat.slug} />
              ))}
            </div>
          </section>

          {/* Universities */}
          <section>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-3">Universities</h2>
            <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-2">
              {universities.map(uni => (
                <UniversityCard key={uni.id} university={uni} />
              ))}
            </div>
          </section>
        </div>
      )}

      {/* Recommended Events */}
      <section>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
          {search ? 'Search Results' : 'Recommended for You'}
        </h2>
        {!search && mockUser.university && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            Based on your interests at {mockUser.university.short_name}
          </p>
        )}

        {sections.length === 0 ? (
          <div className="text-center py-12">
            <SearchOutlineIcon className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
            <p className="text-gray-500 dark:text-gray-400">No events found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map(section => (
              <div key={section.label}>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {section.label}
                </h3>
                <div className="space-y-3 stagger-children">
                  {section.events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
