'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { HomeIcon, TicketIcon, ClipboardListIcon } from './icons';

const tabs = [
  { href: '/', label: 'Home', Icon: HomeIcon },
  { href: '/ticketing', label: 'Tickets', Icon: TicketIcon },
  { href: '/manage', label: 'Manage', Icon: ClipboardListIcon },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bg-white dark:bg-[#1A1A1C] border-t border-gray-200 dark:border-gray-800">
      <div className="flex pb-2">
        {tabs.map(({ href, label, Icon }) => {
          const active = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center gap-0.5 py-2 pt-3 transition-colors ${
                active
                  ? 'text-primary-500'
                  : 'text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-[10px] font-medium">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
