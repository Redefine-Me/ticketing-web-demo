'use client';

import { XIcon } from '@/components/icons';

interface ModalShellProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalShell({ title, onClose, children }: ModalShellProps) {
  return (
    <div className="absolute inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* Sheet */}
      <div className="relative w-full max-h-[85%] bg-white dark:bg-[#1A1A1C] rounded-t-3xl flex flex-col animate-slide-up z-10">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/10 flex-shrink-0">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        {/* Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
}
