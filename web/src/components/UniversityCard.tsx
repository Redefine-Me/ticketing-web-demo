'use client';

import Link from 'next/link';
import { University } from '@/types';

export function UniversityCard({ university }: { university: University }) {
  return (
    <Link
      href={`/university/${encodeURIComponent(university.name)}`}
      className="group relative flex-shrink-0 w-[160px] h-[216px] rounded-2xl overflow-hidden"
    >
      {university.building_url ? (
        <img
          src={university.building_url}
          alt={university.name}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-primary-400 to-primary-600" />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <p className="text-white font-bold text-sm leading-tight">{university.short_name}</p>
      </div>
    </Link>
  );
}
