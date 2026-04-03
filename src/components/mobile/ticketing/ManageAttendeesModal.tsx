'use client';

import { useState, useMemo, useCallback } from 'react';
import { useTicketing } from '@/contexts/mobile/TicketingStore';
import { useToast } from '@/components/mobile/Toast';
import { TicketedEventSummary, TicketPurchase, TicketType } from '@/types/mobile';
import { ChevronDownIcon, XIcon } from '@/components/mobile/icons';
import { SearchBar } from '@/components/mobile/SearchBar';

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
}

interface ManageAttendeesModalProps {
  eventSummary: TicketedEventSummary;
  onClose: () => void;
}

export function ManageAttendeesModal({ eventSummary, onClose }: ManageAttendeesModalProps) {
  const { ticketedEvents, markAttended, unmarkAttended, refundPurchase } = useTicketing();
  const { showToast } = useToast();

  // Get fresh data from the store
  const freshEvent = ticketedEvents.find(e => e.eventId === eventSummary.eventId) ?? eventSummary;

  const [search, setSearch] = useState('');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [refundTarget, setRefundTarget] = useState<{ purchase: TicketPurchase; ticketType: TicketType } | null>(null);
  const [closing, setClosing] = useState(false);

  const isSearching = search.trim().length > 0;
  const query = search.toLowerCase();

  // Filter purchases per ticket type based on search
  const filteredByType = useMemo(() => {
    const map = new Map<string, TicketPurchase[]>();
    for (const tt of freshEvent.ticketTypes) {
      const typePurchases = freshEvent.purchases.filter(p => p.ticketTypeId === tt.id);
      if (!isSearching) {
        map.set(tt.id, typePurchases);
      } else {
        map.set(tt.id, typePurchases.filter(p =>
          p.buyerName.toLowerCase().includes(query) ||
          p.buyerEmail.toLowerCase().includes(query)
        ));
      }
    }
    return map;
  }, [freshEvent, isSearching, query]);

  function toggleCategory(id: string) {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const handleClose = useCallback(() => {
    setClosing(true);
    setTimeout(onClose, 250);
  }, [onClose]);

  function handleRefund() {
    if (!refundTarget) return;
    refundPurchase(refundTarget.purchase.id);
    showToast('Ticket refunded successfully');
    setRefundTarget(null);
  }

  return (
    <div className="absolute inset-0 z-50 flex items-end">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/40 transition-opacity duration-250 ${closing ? 'opacity-0' : 'opacity-100'}`}
        onClick={handleClose}
      />
      {/* Sheet — 90% height, slide animation */}
      <div className={`relative w-full h-[85vh] bg-white dark:bg-[#1A1A1C] rounded-t-3xl flex flex-col z-10 ${closing ? 'animate-slide-down' : 'animate-slide-up'}`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-white/10 flex-shrink-0">
          <h2 className="text-base font-bold text-gray-900 dark:text-white">Manage Attendees</h2>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
          >
            <XIcon className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Sticky summary + search */}
        <div className="px-4 pt-4 pb-2 flex-shrink-0 space-y-3">
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">{freshEvent.eventTitle}</h3>
            <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
              <span>{freshEvent.totalSold} / {freshEvent.totalAvailable} tickets sold</span>
              <span>Revenue: £{freshEvent.totalRevenue.toFixed(2)}</span>
            </div>
          </div>
          <SearchBar value={search} onChange={setSearch} placeholder="Search by name or email..." />
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-3">
          <div className="space-y-2">
            {freshEvent.ticketTypes.map(tt => {
              const typePurchases = filteredByType.get(tt.id) ?? [];
              const totalSold = freshEvent.purchases.filter(p => p.ticketTypeId === tt.id).length;
              // When searching: auto-expand categories that have matches; when not: use manual toggle
              const isExpanded = isSearching ? typePurchases.length > 0 : expandedCategories.has(tt.id);

              // When searching, hide categories with no matches
              if (isSearching && typePurchases.length === 0) return null;

              return (
                <div key={tt.id} className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
                  {/* Category header */}
                  <button
                    onClick={() => !isSearching && toggleCategory(tt.id)}
                    className={`w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 transition-colors ${isSearching ? 'cursor-default' : 'hover:bg-gray-100 dark:hover:bg-white/10'}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">{tt.name}</span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/15 text-gray-600 dark:text-gray-300">
                        {isSearching ? `${typePurchases.length} found` : `${totalSold} / ${tt.totalAvailable}`}
                      </span>
                      <span className="text-[10px] text-gray-400 dark:text-gray-500">£{tt.price.toFixed(2)}</span>
                    </div>
                    {!isSearching && (
                      <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                    )}
                  </button>

                  {/* Attendee list */}
                  {isExpanded && (
                    <div className="border-t border-gray-100 dark:border-white/5">
                      {typePurchases.length === 0 ? (
                        <p className="p-3 text-xs text-gray-400 dark:text-gray-500 text-center">
                          No tickets sold yet for this category.
                        </p>
                      ) : (
                        <div className="divide-y divide-gray-100 dark:divide-white/5">
                          {typePurchases.map(p => (
                            <AttendeeRow
                              key={p.id}
                              purchase={p}
                              ticketType={tt}
                              onAttend={() => markAttended(p.id)}
                              onUnattend={() => unmarkAttended(p.id)}
                              onRefund={() => setRefundTarget({ purchase: p, ticketType: tt })}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}

            {isSearching && Array.from(filteredByType.values()).every(arr => arr.length === 0) && (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400 dark:text-gray-500">No attendees match &ldquo;{search}&rdquo;</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Refund Confirmation Dialog */}
      {refundTarget && (
        <RefundConfirmDialog
          refundTarget={refundTarget}
          onConfirm={handleRefund}
          onCancel={() => setRefundTarget(null)}
        />
      )}
    </div>
  );
}

function AttendeeRow({ purchase, onAttend, onUnattend, onRefund }: {
  purchase: TicketPurchase;
  ticketType: TicketType;
  onAttend: () => void;
  onUnattend: () => void;
  onRefund: () => void;
}) {
  const isAttended = purchase.attendedAt !== null;

  return (
    <div className="flex items-center justify-between p-3 gap-2">
      {/* Left: buyer info */}
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-gray-900 dark:text-white truncate">{purchase.buyerName}</p>
        <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate">{purchase.buyerEmail}</p>
        <p className="text-[10px] text-gray-400 dark:text-gray-500">{formatDateTime(purchase.purchasedAt)}</p>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {isAttended ? (
          <>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 whitespace-nowrap">
              Checked in at {formatTime(purchase.attendedAt!)}
            </span>
            <button
              onClick={onUnattend}
              className="px-2.5 py-1.5 text-[10px] font-medium rounded-lg border border-gray-200 dark:border-white/15 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
            >
              Unattend
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onAttend}
              className="px-2.5 py-1.5 text-[10px] font-medium rounded-lg border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              Attend
            </button>
            <button
              onClick={onRefund}
              className="px-2.5 py-1.5 text-[10px] font-medium rounded-lg border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              Refund
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function RefundConfirmDialog({ refundTarget, onConfirm, onCancel }: {
  refundTarget: { purchase: TicketPurchase; ticketType: TicketType };
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="absolute inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white dark:bg-[#2C2C2E] rounded-2xl p-5 mx-6 max-w-sm w-full shadow-xl">
        <p className="text-sm font-semibold text-gray-900 dark:text-white text-center mb-1">
          You are refunding this user.
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center mb-5">
          {refundTarget.purchase.buyerName} — {refundTarget.ticketType.name}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 text-sm font-medium rounded-xl border border-gray-200 dark:border-white/15 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 text-sm font-medium rounded-xl bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}
