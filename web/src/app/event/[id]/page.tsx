'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { useEventStore } from '@/context/EventStore';
import {
  getEventImageUrls,
  getSocietyName,
  getSocietyImageUrl,
  getEventLocation,
  getEventLocationDetails,
  formatEventDateTime,
  getEventPrice,
} from '@/lib/helpers';
import { CategoryPills } from '@/components/CategoryPills';
import { BackButton } from '@/components/BackButton';
import { HeartIcon, MapPinIcon, CalendarIcon, UsersIcon, ShareIcon } from '@/components/icons';
import Link from 'next/link';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { getEvent, toggleLike, toggleAttending } = useEventStore();
  const [currentImage, setCurrentImage] = useState(0);

  const event = getEvent(params.id as string);

  if (!event) {
    return (
      <div className="px-4 py-20 text-center">
        <p className="text-4xl mb-4">😕</p>
        <p className="text-gray-500 dark:text-gray-400 mb-4">Event not found</p>
        <button
          onClick={() => router.back()}
          className="px-6 py-2.5 bg-primary-500 text-white rounded-full text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const imageUrls = getEventImageUrls(event);
  const societyName = getSocietyName(event);
  const societyImage = getSocietyImageUrl(event);
  const society = event.societies[0];
  const location = getEventLocation(event);
  const locationDetails = getEventLocationDetails(event);
  const dateTime = formatEventDateTime(event);
  const price = getEventPrice(event);

  return (
    <div className="">
      {/* Image gallery */}
      <div className="relative bg-gray-100 dark:bg-gray-800">
        <div className="absolute top-4 left-4 z-10">
          <BackButton />
        </div>

        {imageUrls.length > 0 ? (
          <>
            <img
              src={imageUrls[currentImage]}
              alt={event.name}
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
            {imageUrls.length > 1 && (
              <>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                  {imageUrls.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${
                        i === currentImage ? 'bg-white w-6' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
                <button
                  onClick={() => setCurrentImage(i => (i > 0 ? i - 1 : imageUrls.length - 1))}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 backdrop-blur rounded-full flex items-center justify-center text-white text-sm hover:bg-black/50"
                >
                  ‹
                </button>
                <button
                  onClick={() => setCurrentImage(i => (i < imageUrls.length - 1 ? i + 1 : 0))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/30 backdrop-blur rounded-full flex items-center justify-center text-white text-sm hover:bg-black/50"
                >
                  ›
                </button>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-[300px] flex items-center justify-center">
            <span className="text-6xl">📅</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="px-4 py-6 space-y-6">
        {/* Title + price */}
        <div>
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{event.name}</h1>
            <span
              className={`flex-shrink-0 px-3 py-1 rounded-full text-sm font-semibold ${
                event.is_free
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400'
                  : 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400'
              }`}
            >
              {price}
            </span>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="flex items-center gap-1">
              <HeartIcon filled={false} className="w-4 h-4" /> {event.like_count} likes
            </span>
            <span className="flex items-center gap-1">
              <UsersIcon className="w-4 h-4" /> {event.attend_count} attending
            </span>
          </div>
        </div>

        {/* Society */}
        {society && (
          <Link
            href={`/society/${society.id}`}
            className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-[#2C2C2E] hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            {societyImage ? (
              <img src={societyImage} alt={societyName} className="w-10 h-10 rounded-full object-cover" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-sm font-bold text-primary-600">
                {societyName.charAt(0)}
              </div>
            )}
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-white">{societyName}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{society.university.name}</p>
            </div>
          </Link>
        )}

        {/* Date & Location */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <CalendarIcon className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{dateTime}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPinIcon className="w-5 h-5 text-primary-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">{location}</p>
              {locationDetails?.street && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {locationDetails.street}{locationDetails.postcode ? `, ${locationDetails.postcode}` : ''}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Attending badge */}
        {event.isAttending && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800">
            <span className="text-emerald-600 dark:text-emerald-400 text-lg">✓</span>
            <p className="text-sm font-medium text-emerald-700 dark:text-emerald-400">
              You&apos;re attending this event
            </p>
          </div>
        )}

        {/* Description */}
        {event.description && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
              About
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
              {event.description}
            </p>
          </div>
        )}

        {/* Categories */}
        {event.categories.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-2">
              Categories
            </h2>
            <CategoryPills categories={event.categories} size="medium" linkable />
          </div>
        )}

        {/* Instagram */}
        {society?.instagram_handle && (
          <a
            href={`https://instagram.com/${society.instagram_handle}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-pink-500 hover:text-pink-600 font-medium"
          >
            📸 @{society.instagram_handle}
          </a>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pt-2">
          {event.registration_url && (
            <a
              href={event.registration_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-3 bg-primary-500 text-white rounded-xl font-semibold hover:bg-primary-600 transition-colors"
            >
              Register
            </a>
          )}
          <button
            onClick={() => toggleAttending(event.id)}
            className={`flex-1 py-3 rounded-xl font-semibold transition-all ${
              event.isAttending
                ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-200 dark:hover:bg-emerald-900/50'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {event.isAttending ? '✓ Attending' : 'Attend'}
          </button>
          <button
            onClick={() => toggleLike(event.id)}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={event.isLiked ? 'Unlike' : 'Like'}
          >
            <HeartIcon filled={event.isLiked} className="w-6 h-6" />
          </button>
          <button
            onClick={() => {
              if (navigator.share) {
                navigator.share({ title: event.name, url: window.location.href });
              }
            }}
            className="p-3 rounded-xl bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label="Share"
          >
            <ShareIcon className="w-6 h-6 text-gray-600 dark:text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
