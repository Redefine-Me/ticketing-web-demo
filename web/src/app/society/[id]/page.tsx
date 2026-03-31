'use client';

import { useParams } from 'next/navigation';
import { useMemo, useState } from 'react';
import { useEventStore } from '@/context/EventStore';
import { societies } from '@/lib/mock-data';
import { groupEventsByDate } from '@/lib/helpers';
import { EventListRow } from '@/components/EventCard';
import { BackButton } from '@/components/BackButton';
import { AlertCircleIcon, LogoInstagramIcon, UsersIcon } from '@/components/icons';

export default function SocietyPage() {
  const params = useParams();
  const { events } = useEventStore();
  const [following, setFollowing] = useState(false);

  const society = societies.find(s => s.id === params.id);

  const societyEvents = useMemo(() => {
    if (!society) return [];
    return events.filter(e => e.societies.some(s => s.id === society.id));
  }, [events, society]);

  const sections = useMemo(() => groupEventsByDate(societyEvents), [societyEvents]);

  if (!society) {
    return (
      <div className="px-4 py-20 text-center">
        <AlertCircleIcon className="w-10 h-10 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <p className="text-gray-500 dark:text-gray-400">Society not found</p>
      </div>
    );
  }

  return (
    <div className="">
      {/* Header */}
      <div className="relative h-48 bg-gray-100 dark:bg-gray-800">
        {society.image_url ? (
          <img src={society.image_url} alt={society.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-2xl font-bold text-white">{society.name}</h1>
          <p className="text-sm text-white/80">{society.university.name}</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Stats & actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <UsersIcon className="w-4 h-4" /> {society.follower_count} followers
            </span>
            <span>{societyEvents.length} events</span>
          </div>
          <div className="flex items-center gap-2">
            {society.instagram_handle && (
              <a
                href={`https://instagram.com/${society.instagram_handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-pink-500 bg-pink-50 dark:bg-pink-900/20 rounded-full hover:bg-pink-100 dark:hover:bg-pink-900/40 transition-colors"
              >
                <LogoInstagramIcon className="w-4 h-4" />
                Instagram
              </a>
            )}
            <button
              onClick={() => setFollowing(!following)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                following
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
              }`}
            >
              {following ? 'Following' : 'Follow'}
            </button>
          </div>
        </div>

        {/* Description */}
        {society.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
            {society.description}
          </p>
        )}

        {/* Events */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Upcoming Events</h2>
          {sections.length === 0 ? (
            <p className="text-sm text-gray-400 py-8 text-center">No upcoming events</p>
          ) : (
            <div className="space-y-6">
              {sections.map(section => (
                <div key={section.label}>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">
                    {section.label}
                  </h3>
                  <div className="space-y-1">
                    {section.events.map(event => (
                      <EventListRow key={event.id} event={event} showCategory />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
