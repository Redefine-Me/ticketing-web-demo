'use client';

import Link from 'next/link';
import { EventWithDetails } from '@/types';
import {
  getEventImageUrl,
  getSocietyName,
  getSocietyImageUrl,
  getEventLocation,
  getEventDate,
  formatEventTime,
  getEventPrice,
} from '@/lib/helpers';
import { useEventStore } from '@/context/EventStore';
import { CategoryPills } from './CategoryPills';
import { HeartIcon } from './icons';

export function EventCard({ event }: { event: EventWithDetails }) {
  const { toggleLike } = useEventStore();
  const imageUrl = getEventImageUrl(event);
  const societyImage = getSocietyImageUrl(event);
  const societyName = getSocietyName(event);
  const location = getEventLocation(event);
  const date = getEventDate(event);
  const price = getEventPrice(event);

  return (
    <Link
      href={`/event/${event.id}`}
      className="group flex gap-4 p-4 rounded-2xl bg-white dark:bg-[#2C2C2E] hover:shadow-lg transition-all duration-200 border border-gray-100 dark:border-gray-800"
    >
      {/* Image */}
      <div className="relative w-24 h-24 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={event.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-2xl">
            📅
          </div>
        )}
        {!event.is_free && (
          <span className="absolute top-1.5 left-1.5 bg-black/70 text-white text-[10px] font-semibold px-1.5 py-0.5 rounded-md">
            {price}
          </span>
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between py-0.5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {societyImage ? (
              <img src={societyImage} alt={societyName} className="w-5 h-5 rounded-full object-cover" />
            ) : (
              <div className="w-5 h-5 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-[10px] font-bold text-primary-600">
                {societyName.charAt(0)}
              </div>
            )}
            <span className="text-xs text-gray-500 dark:text-gray-400 truncate">{societyName}</span>
          </div>
          <h3 className="font-semibold text-sm text-gray-900 dark:text-white truncate leading-tight">
            {event.name}
          </h3>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400 mt-1">
          {date && <span>🕐 {formatEventTime(date)}</span>}
          <span className="truncate">📍 {location}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-col items-center justify-between py-0.5 flex-shrink-0">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleLike(event.id);
          }}
          className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label={event.isLiked ? 'Unlike' : 'Like'}
        >
          <HeartIcon filled={event.isLiked} className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1 text-[11px] text-gray-400">
          <span>❤️ {event.like_count}</span>
        </div>
      </div>
    </Link>
  );
}

export function EventDiscoveryCard({ event }: { event: EventWithDetails }) {
  const { toggleLike } = useEventStore();
  const imageUrl = getEventImageUrl(event);
  const societyName = getSocietyName(event);
  const date = getEventDate(event);

  return (
    <Link
      href={`/event/${event.id}`}
      className="group flex items-center gap-3 p-3 rounded-xl bg-white dark:bg-[#2C2C2E] hover:shadow-md transition-all duration-200 border border-gray-100 dark:border-gray-800"
    >
      <div className="w-14 h-14 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
        {imageUrl ? (
          <img src={imageUrl} alt={event.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">📅</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{societyName}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{event.name}</p>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-0.5">
          {date && <span>{formatEventTime(date)}</span>}
          <span>❤️ {event.like_count}</span>
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleLike(event.id);
        }}
        className="p-1.5 flex-shrink-0"
        aria-label={event.isLiked ? 'Unlike' : 'Like'}
      >
        <HeartIcon filled={event.isLiked} className="w-5 h-5" />
      </button>
    </Link>
  );
}

export function EventListRow({ event, showCategory = false }: { event: EventWithDetails; showCategory?: boolean }) {
  const { toggleLike } = useEventStore();
  const imageUrl = getEventImageUrl(event);
  const societyName = getSocietyName(event);
  const date = getEventDate(event);

  return (
    <Link
      href={`/event/${event.id}`}
      className="group flex items-center gap-3 py-3 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-lg px-2 transition-colors"
    >
      <div className="w-16 h-16 flex-shrink-0 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-700">
        {imageUrl ? (
          <img src={imageUrl} alt={event.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">📅</div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{societyName}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">{event.name}</p>
        <div className="flex items-center gap-2 mt-1">
          {date && (
            <span className="text-[11px] text-gray-400">
              {date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
            </span>
          )}
          {showCategory && event.categories.length > 0 && (
            <CategoryPills categories={event.categories} max={2} size="small" />
          )}
        </div>
      </div>
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          toggleLike(event.id);
        }}
        className="p-1.5 flex-shrink-0"
        aria-label={event.isLiked ? 'Unlike' : 'Like'}
      >
        <HeartIcon filled={event.isLiked} className="w-5 h-5" />
      </button>
    </Link>
  );
}

export function AttendingEventCard({ event }: { event: EventWithDetails }) {
  const imageUrl = getEventImageUrl(event);
  const societyName = getSocietyName(event);
  const location = getEventLocation(event);
  const date = getEventDate(event);

  return (
    <Link
      href={`/event/${event.id}`}
      className="group flex-shrink-0 w-[280px] rounded-2xl overflow-hidden bg-white dark:bg-[#2C2C2E] border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-200"
    >
      <div className="relative h-32 bg-gray-100 dark:bg-gray-700">
        {imageUrl ? (
          <img src={imageUrl} alt={event.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 text-3xl">📅</div>
        )}
        <span className="absolute top-2 left-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          Attending
        </span>
      </div>
      <div className="p-3">
        <p className="text-[11px] text-gray-500 dark:text-gray-400 truncate">{societyName}</p>
        <p className="text-sm font-semibold text-gray-900 dark:text-white truncate mt-0.5">{event.name}</p>
        <div className="flex items-center gap-2 text-[11px] text-gray-400 mt-1.5">
          {date && <span>🕐 {formatEventTime(date)}</span>}
          <span className="truncate">📍 {location}</span>
        </div>
      </div>
    </Link>
  );
}
