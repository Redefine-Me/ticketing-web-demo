'use client';

import { useState } from 'react';
import { useTicketing } from '@/contexts/mobile/TicketingStore';
import { EventWithDetails } from '@/types/mobile';
import { getEventDate, getEventImageUrl } from '@/lib/mobile/helpers';
import { ModalShell } from './ModalShell';
import { TicketConfigForm } from './TicketConfigForm';

function formatDate(date: Date | null): string {
  if (!date) return 'Date TBC';
  return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
}

interface AssignTicketsModalProps {
  onClose: () => void;
}

export function AssignTicketsModal({ onClose }: AssignTicketsModalProps) {
  const { unticketedEvents } = useTicketing();
  const [selectedEvent, setSelectedEvent] = useState<EventWithDetails | null>(null);

  if (selectedEvent) {
    return (
      <TicketConfigForm
        mode="create"
        event={selectedEvent}
        onClose={onClose}
      />
    );
  }

  return (
    <ModalShell title="Assign Tickets" onClose={onClose}>
      {unticketedEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            All events have tickets assigned.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {unticketedEvents.map(event => {
            const imageUrl = getEventImageUrl(event);
            const date = getEventDate(event);
            return (
              <button
                key={event.id}
                onClick={() => setSelectedEvent(event)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                  {imageUrl ? (
                    <img src={imageUrl} alt={event.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white truncate">{event.name}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(date)}</p>
                  {event.description && (
                    <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5 line-clamp-2">{event.description}</p>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}
    </ModalShell>
  );
}
