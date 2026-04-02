'use client';

import { useTheme } from '@/context/ThemeContext';
import { mockUser } from '@/lib/mock-data';
import { SunIcon, MoonIcon } from './icons';

export function Header() {
  const { isDark, setThemePreference } = useTheme();

  return (
    <header className="bg-white dark:bg-[#1A1A1C] border-b border-gray-200/50 dark:border-gray-800/50">
      <div className="px-4 h-14 flex items-center justify-between">
        <div className="flex items-center">
          <img
            src="/logos/Redefine Me logo wno bg.png"
            alt="Redefine Me"
            className="w-36 dark:brightness-0 dark:invert"
          />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setThemePreference(isDark ? 'light' : 'dark')}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <SunIcon className="w-5 h-5 text-gray-400" /> : <MoonIcon className="w-5 h-5 text-gray-500" />}
          </button>

          <div className="flex items-center gap-2">
            {mockUser.avatar_url ? (
              <img src={mockUser.avatar_url} alt={mockUser.display_name} className="w-8 h-8 rounded-full object-cover" />
            ) : (
              <div className="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-sm font-bold text-primary-600">
                {mockUser.display_name.charAt(0)}
              </div>
            )}
            <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
              {mockUser.display_name.split(' ')[0]}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
