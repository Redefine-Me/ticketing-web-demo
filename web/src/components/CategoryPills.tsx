'use client';

import Link from 'next/link';
import { Category } from '@/types';
import { categoryMeta } from '@/lib/theme';
import { capitalizeCategoryName } from '@/lib/helpers';

interface CategoryPillsProps {
  categories: Category[];
  max?: number;
  size?: 'small' | 'medium';
  linkable?: boolean;
}

export function CategoryPills({ categories, max, size = 'small', linkable = false }: CategoryPillsProps) {
  const items = max ? categories.slice(0, max) : categories;

  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((cat) => {
        const meta = categoryMeta[cat.name];
        const color = meta?.color ?? '#6B7280';
        const label = capitalizeCategoryName(cat.name);

        const pill = (
          <span
            key={cat.id}
            className={`inline-flex items-center rounded-full font-medium ${
              size === 'small'
                ? 'px-2 py-0.5 text-[10px]'
                : 'px-3 py-1 text-xs'
            }`}
            style={{
              backgroundColor: `${color}15`,
              color: color,
            }}
          >
            {meta?.icon && <span className="mr-1">{meta.icon}</span>}
            {label}
          </span>
        );

        if (linkable) {
          return (
            <Link key={cat.id} href={`/category/${cat.slug}`}>
              {pill}
            </Link>
          );
        }
        return pill;
      })}
    </div>
  );
}

interface CategoryChipProps {
  name: string;
  slug: string;
  active?: boolean;
  onClick?: () => void;
}

export function CategoryChip({ name, slug, active, onClick }: CategoryChipProps) {
  const meta = categoryMeta[name];
  const color = meta?.color ?? '#6B7280';
  const label = capitalizeCategoryName(name);

  if (onClick) {
    return (
      <button
        onClick={onClick}
        className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
          active
            ? 'text-white shadow-md scale-105'
            : 'hover:scale-105 dark:text-gray-300'
        }`}
        style={{
          backgroundColor: active ? color : `${color}15`,
          color: active ? '#fff' : color,
        }}
      >
        {meta?.icon && <span className="mr-1.5">{meta.icon}</span>}
        {label}
      </button>
    );
  }

  return (
    <Link
      href={`/category/${slug}`}
      className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium hover:scale-105 transition-transform duration-200 dark:text-gray-300"
      style={{
        backgroundColor: `${color}15`,
        color: color,
      }}
    >
      {meta?.icon && <span className="mr-1.5">{meta.icon}</span>}
      {label}
    </Link>
  );
}
