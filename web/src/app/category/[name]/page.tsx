'use client';

import { useParams } from 'next/navigation';
import { useMemo } from 'react';
import { useEventStore } from '@/context/EventStore';
import { categories } from '@/lib/mock-data';
import { categoryMeta } from '@/lib/theme';
import { capitalizeCategoryName, groupEventsByDate } from '@/lib/helpers';
import { EventCard } from '@/components/EventCard';
import { BackButton } from '@/components/BackButton';
import { CategoryIcon } from '@/components/CategoryIcon';
import { AlertCircleIcon, FolderOpenIcon } from '@/components/icons';

export default function CategoryPage() {
  const params = useParams();
  const { events } = useEventStore();
  const slug = params.name as string;

  const category = categories.find(c => c.slug === slug);
  const meta = category ? categoryMeta[category.name] : null;

  const categoryEvents = useMemo(() => {
    if (!category) return [];
    return events.filter(
      e =>
        e.categories.some(c => c.slug === slug || c.name === category.name) ||
        e.category?.slug === slug ||
        e.category?.name === category.name
    );
  }, [events, category, slug]);

  const sections = useMemo(() => groupEventsByDate(categoryEvents), [categoryEvents]);

  if (!category) {
    return (
      <div className="px-4 py-20 text-center">
        <AlertCircleIcon className="w-10 h-10 mx-auto mb-4 text-gray-400 dark:text-gray-500" />
        <p className="text-gray-500 dark:text-gray-400">Category not found</p>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 space-y-6">
      <BackButton />

      {/* Category header */}
      <div className="flex items-center gap-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
          style={{ backgroundColor: `${meta?.color ?? '#6B7280'}15` }}
        >
          {meta?.icon ? (
            <CategoryIcon name={meta.icon} className="w-7 h-7" />
          ) : (
            <FolderOpenIcon className="w-7 h-7 text-gray-500" />
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {capitalizeCategoryName(category.name)}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {categoryEvents.length} event{categoryEvents.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {meta?.description && (
        <p className="text-sm text-gray-600 dark:text-gray-400">{meta.description}</p>
      )}

      {/* Events */}
      {sections.length === 0 ? (
        <div className="text-center py-12">
          {meta?.icon ? (
            <CategoryIcon name={meta.icon} className="w-10 h-10 mx-auto mb-3" />
          ) : (
            <FolderOpenIcon className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-500" />
          )}
          <p className="text-gray-500 dark:text-gray-400">No events in this category yet</p>
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
  );
}
