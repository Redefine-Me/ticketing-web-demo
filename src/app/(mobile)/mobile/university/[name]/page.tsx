'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useEventStore } from '@/contexts/mobile/EventStore';
import { universities } from '@/lib/mobile/mock-data';
import { groupEventsByDate } from '@/lib/mobile/helpers';
import { EventCard } from '@/components/mobile/EventCard';
import { BackButton } from '@/components/mobile/BackButton';
import { AlertCircleIcon, SchoolOutlineIcon } from '@/components/mobile/icons';

export default function UniversityPage() {
  const params = useParams();
  const { events } = useEventStore();
  const name = decodeURIComponent(params.name as string);

  const university = universities.find(u => u.name === name);

  const uniEvents = useMemo(() => {
    if (!university) return [];
    return events.filter(e =>
      e.societies.some(s => s.university.id === university.id)
    );
  }, [events, university]);

  const sections = useMemo(() => groupEventsByDate(uniEvents), [uniEvents]);

  if (!university) {
    return (
      <div className="px-4 py-20 text-center">
        <AlertCircleIcon className="w-10 h-10 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <p className="text-gray-500 dark:text-gray-400">University not found</p>
      </div>
    );
  }

  return (
    <div className="">
      {/* Hero header */}
      <div className="relative h-64 bg-gray-100 dark:bg-gray-800">
        {university.building_url ? (
          <img src={university.building_url} alt={university.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-primary-400 to-primary-600" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute top-4 left-4">
          <BackButton />
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h1 className="text-3xl font-bold text-white">{university.name}</h1>
          <p className="text-sm text-white/80 mt-1">{uniEvents.length} upcoming events</p>
        </div>
      </div>

      <div className="px-4 py-6 space-y-6">
        {university.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{university.description}</p>
        )}

        {sections.length === 0 ? (
          <div className="text-center py-12">
            <SchoolOutlineIcon className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
            <p className="text-gray-500 dark:text-gray-400">No upcoming events at this university</p>
          </div>
        ) : (
          <div className="space-y-6">
            {sections.map(section => (
              <div key={section.label}>
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                  {section.label}
                </h3>
                <div className="space-y-3">
                  {section.events.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
