'use client';

import { useState } from 'react';
import { useTicketing } from '@/context/TicketingStore';
import { useToast } from '@/components/Toast';
import { TicketedEventSummary, TicketPurchase, TicketType } from '@/types';
import { ChevronDownIcon } from '@/components/icons';
import { ModalShell } from './ModalShell';

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

  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(() => {
    const first = freshEvent.ticketTypes[0]?.id;
    return first ? new Set([first]) : new Set();
  });

  const [refundTarget, setRefundTarget] = useState<{ purchase: TicketPurchase; ticketType: TicketType } | null>(null);

  function toggleCategory(id: string) {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function handleRefund() {
    if (!refundTarget) return;
    refundPurchase(refundTarget.purchase.id);
    showToast('Ticket refunded successfully');
    setRefundTarget(null);
  }

  return (
    <ModalShell title="Manage Attendees" onClose={onClose}>
      {/* Header summary */}
      <div className="mb-4 space-y-1">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white">{freshEvent.eventTitle}</h3>
        <div className="flex gap-4 text-xs text-gray-500 dark:text-gray-400">
          <span>{freshEvent.totalSold} / {freshEvent.totalAvailable} tickets sold</span>
          <span>Revenue: £{freshEvent.totalRevenue.toFixed(2)}</span>
        </div>
      </div>

      {/* Ticket categories */}
      <div className="space-y-2">
        {freshEvent.ticketTypes.map(tt => {
          const typePurchases = freshEvent.purchases.filter(p => p.ticketTypeId === tt.id);
          const soldCount = typePurchases.length;
          const isExpanded = expandedCategories.has(tt.id);

          return (
            <div key={tt.id} className="border border-gray-200 dark:border-white/10 rounded-xl overflow-hidden">
              {/* Category header */}
              <button
                onClick={() => toggleCategory(tt.id)}
                className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">{tt.name}</span>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-gray-200 dark:bg-white/15 text-gray-600 dark:text-gray-300">
                    {soldCount} / {tt.totalAvailable}
                  </span>
                  <span className="text-[10px] text-gray-400 dark:text-gray-500">£{tt.price.toFixed(2)}</span>
                </div>
                <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
              </button>

              {/* Expanded attendee list */}
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
      </div>

      {/* Refund Confirmation Dialog — rendered via portal */}
      {refundTarget && (
        <RefundConfirmDialog
          refundTarget={refundTarget}
          onConfirm={handleRefund}
          onCancel={() => setRefundTarget(null)}
        />
      )}
    </ModalShell>
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
