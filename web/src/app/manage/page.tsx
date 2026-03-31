'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTicketing } from '@/context/TicketingStore';
import { TicketIcon, PlusIcon, QRCodeIcon } from '@/components/icons';
import { TicketedEventSummary } from '@/types';
import { SearchBar } from '@/components/SearchBar';
import { AssignTicketsModal } from '@/components/ticketing/AssignTicketsModal';
import { TicketConfigModal } from '@/components/ticketing/TicketConfigForm';
import { ManageAttendeesModal } from '@/components/ticketing/ManageAttendeesModal';

function formatDate(iso: string | null): string {
  if (!iso) return 'Date TBC';
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function ManagePage() {
  const router = useRouter();
  const { ticketedEvents } = useTicketing();
  const [search, setSearch] = useState('');
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [editEvent, setEditEvent] = useState<TicketedEventSummary | null>(null);
  const [manageEvent, setManageEvent] = useState<TicketedEventSummary | null>(null);

  const filteredEvents = useMemo(() => {
    if (!search.trim()) return ticketedEvents;
    const q = search.toLowerCase();
    return ticketedEvents.filter(
      e => e.eventTitle.toLowerCase().includes(q) || e.eventDescription.toLowerCase().includes(q)
    );
  }, [ticketedEvents, search]);

  function closeModal() {
    setAssignModalOpen(false);
    setEditEvent(null);
    setManageEvent(null);
  }

  function closeAndGoHome() {
    closeModal();
    router.push('/');
  }

  return (
    <div className="px-4 py-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Ticketing</h1>
          <button
            onClick={() => router.push('/scan-qr')}
            className="p-2 -m-2 min-w-[44px] min-h-[44px] flex items-center justify-center text-gray-900 dark:text-white"
          >
            <QRCodeIcon className="w-6 h-6" />
          </button>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
          Manage ticket sales and attendees for your events
        </p>
        <button
          onClick={() => setAssignModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold rounded-2xl transition-colors"
        >
          <PlusIcon className="w-4 h-4" />
          Assign Tickets to an Event
        </button>
      </div>

      {/* Search */}
      {ticketedEvents.length > 0 && (
        <div className="mb-4">
          <SearchBar value={search} onChange={setSearch} placeholder="Search ticketed events..." />
        </div>
      )}

      {/* Ticketed Events List */}
      {ticketedEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <TicketIcon className="w-16 h-16 text-gray-300 dark:text-gray-600 mb-4" />
          <h2 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No ticketed events yet</h2>
          <p className="text-sm text-gray-400 dark:text-gray-500 text-center max-w-xs">
            Click &apos;Assign Tickets&apos; to get started
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredEvents.map(evt => (
            <div
              key={evt.eventId}
              className="bg-gray-50 dark:bg-white/5 rounded-2xl p-4 border border-gray-100 dark:border-white/10"
            >
              {/* Event info row */}
              <div className="flex items-start gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
                  {evt.eventImageUrl ? (
                    <img src={evt.eventImageUrl} alt={evt.eventTitle} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{evt.eventTitle}</h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{formatDate(evt.eventDate)}</p>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">Revenue</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">£{evt.totalRevenue.toFixed(2)}</p>
                </div>
                <div className="flex-1">
                  <p className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-0.5">Sold</p>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{evt.totalSold} / {evt.totalAvailable}</p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <button
                  onClick={() => setEditEvent(evt)}
                  className="flex-1 py-2 text-xs font-medium rounded-xl border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  Edit Details
                </button>
                <button
                  onClick={() => setManageEvent(evt)}
                  className="flex-1 py-2 text-xs font-medium rounded-xl border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
                >
                  Manage Attendees
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      {assignModalOpen && (
        <AssignTicketsModal onClose={closeModal} />
      )}
      {editEvent && (
        <TicketConfigModal
          mode="edit"
          eventSummary={editEvent}
          onClose={closeModal}
        />
      )}
      {manageEvent && (
        <ManageAttendeesModal
          eventSummary={manageEvent}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
