'use client';

import { useState, useMemo } from 'react';
import { useTicketing } from '@/context/TicketingStore';
import { useToast } from '@/components/Toast';
import { EventWithDetails, TicketType, TicketedEventSummary } from '@/types';
import { getEventImageUrl } from '@/lib/helpers';
import { PlusIcon, TrashIcon } from '@/components/icons';
import { ticketNameSuggestions } from '@/lib/mock-ticket-data';
import { ModalShell } from './ModalShell';

interface TicketTypeFormData {
  tempId: string;
  id?: string; // present in edit mode for existing types
  name: string;
  price: string;
  isMemberTicket: boolean;
  totalAvailable: string;
  soldCount: number; // 0 for new types
}

function emptyTicketType(): TicketTypeFormData {
  return {
    tempId: `temp-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    name: '',
    price: '',
    isMemberTicket: false,
    totalAvailable: '',
    soldCount: 0,
  };
}

interface TicketConfigFormProps {
  mode: 'create' | 'edit';
  event?: EventWithDetails;
  eventSummary?: TicketedEventSummary;
  onClose: () => void;
}

export function TicketConfigForm({ mode, event, eventSummary, onClose }: TicketConfigFormProps) {
  const { assignTickets, updateTickets } = useTicketing();
  const { showToast } = useToast();

  const eventTitle = event?.name ?? eventSummary?.eventTitle ?? '';
  const eventDesc = event?.description ?? eventSummary?.eventDescription ?? '';
  const eventImage = event ? getEventImageUrl(event) : eventSummary?.eventImageUrl ?? null;
  const eventId = event?.id ?? eventSummary?.eventId ?? '';

  const initialTypes: TicketTypeFormData[] = useMemo(() => {
    if (mode === 'edit' && eventSummary) {
      return eventSummary.ticketTypes.map(tt => ({
        tempId: tt.id,
        id: tt.id,
        name: tt.name,
        price: tt.price.toFixed(2),
        isMemberTicket: tt.isMemberTicket,
        totalAvailable: tt.totalAvailable.toString(),
        soldCount: eventSummary.purchases.filter(p => p.ticketTypeId === tt.id).length,
      }));
    }
    return [emptyTicketType()];
  }, [mode, eventSummary]);

  const [types, setTypes] = useState<TicketTypeFormData[]>(initialTypes);
  const [errors, setErrors] = useState<Record<string, Record<string, string>>>({});

  function updateType(tempId: string, field: keyof TicketTypeFormData, value: string | boolean) {
    setTypes(prev => prev.map(t => t.tempId === tempId ? { ...t, [field]: value } : t));
    // Clear error for this field
    setErrors(prev => {
      const copy = { ...prev };
      if (copy[tempId]) {
        const updated = { ...copy[tempId] };
        delete updated[field as string];
        copy[tempId] = updated;
      }
      return copy;
    });
  }

  function addType() {
    setTypes(prev => [...prev, emptyTicketType()]);
  }

  function removeType(tempId: string) {
    const t = types.find(x => x.tempId === tempId);
    if (t && t.soldCount > 0) return; // blocked
    if (types.length <= 1) {
      setErrors(prev => ({ ...prev, [tempId]: { ...prev[tempId], _remove: 'At least one ticket type is required' } }));
      return;
    }
    setTypes(prev => prev.filter(x => x.tempId !== tempId));
  }

  const totalTickets = types.reduce((sum, t) => sum + (parseInt(t.totalAvailable) || 0), 0);

  function validate(): boolean {
    const newErrors: Record<string, Record<string, string>> = {};
    let valid = true;

    if (types.length === 0) {
      valid = false;
    }

    for (const t of types) {
      const fieldErrors: Record<string, string> = {};

      if (!t.name.trim()) {
        fieldErrors.name = 'Ticket name is required';
        valid = false;
      }

      const price = parseFloat(t.price);
      if (isNaN(price) || price < 0) {
        fieldErrors.price = 'Price cannot be negative';
        valid = false;
      }

      const avail = parseInt(t.totalAvailable);
      if (isNaN(avail) || avail < 1) {
        fieldErrors.totalAvailable = 'Must offer at least 1 ticket';
        valid = false;
      } else if (avail < t.soldCount) {
        fieldErrors.totalAvailable = `${t.soldCount} tickets have been sold. You must refund users to below ${avail} before reducing the ticket count to ${avail}.`;
        valid = false;
      }

      if (Object.keys(fieldErrors).length > 0) {
        newErrors[t.tempId] = fieldErrors;
      }
    }

    setErrors(newErrors);
    return valid;
  }

  const hasConflict = types.some(t => {
    const avail = parseInt(t.totalAvailable);
    return !isNaN(avail) && avail < t.soldCount;
  });

  function handleSave() {
    if (!validate()) return;

    if (mode === 'create') {
      assignTickets(
        eventId,
        types.map(t => ({
          name: t.name.trim(),
          price: parseFloat(t.price),
          isMemberTicket: t.isMemberTicket,
          totalAvailable: parseInt(t.totalAvailable),
        })),
      );
      showToast('Ticket successfully registered');
    } else {
      const updatedTypes: TicketType[] = types.map(t => ({
        id: t.id ?? t.tempId,
        eventId,
        name: t.name.trim(),
        price: parseFloat(t.price),
        isMemberTicket: t.isMemberTicket,
        totalAvailable: parseInt(t.totalAvailable),
      }));
      updateTickets(eventId, updatedTypes);
      showToast('Ticketing successfully updated');
    }
    onClose();
  }

  return (
    <ModalShell title={mode === 'create' ? 'Configure Tickets' : 'Edit Tickets'} onClose={onClose}>
      {/* Event Summary */}
      <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-white/5 mb-4">
        <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-gray-200 dark:bg-gray-700">
          {eventImage ? (
            <img src={eventImage} alt={eventTitle} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-400 to-purple-500" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold text-gray-900 dark:text-white truncate">{eventTitle}</h3>
          {eventDesc && (
            <p className="text-xs text-gray-400 dark:text-gray-500 line-clamp-2">{eventDesc.slice(0, 150)}</p>
          )}
        </div>
      </div>

      {/* Ticket Types */}
      <div className="space-y-3">
        {types.map(t => (
          <TicketTypeCard
            key={t.tempId}
            data={t}
            errors={errors[t.tempId] ?? {}}
            canRemove={types.length > 1 && t.soldCount === 0}
            onUpdate={(field, value) => updateType(t.tempId, field, value)}
            onRemove={() => removeType(t.tempId)}
          />
        ))}
      </div>

      {/* Add ticket type */}
      <button
        onClick={addType}
        className="w-full mt-3 py-2.5 flex items-center justify-center gap-1.5 text-xs font-medium rounded-xl border border-dashed border-gray-300 dark:border-white/20 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
      >
        <PlusIcon className="w-3.5 h-3.5" />
        Add Ticket Type
      </button>

      {/* Total counter */}
      <div className="mt-4 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Total tickets: <span className="font-bold text-gray-900 dark:text-white">{totalTickets}</span>
        </p>
      </div>

      {/* Save button */}
      <button
        onClick={handleSave}
        disabled={hasConflict}
        className="w-full mt-4 py-3 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors"
      >
        Save Tickets
      </button>
    </ModalShell>
  );
}

// ── TicketConfigModal (for edit mode from manage page) ───────
export function TicketConfigModal({ mode, eventSummary, onClose }: {
  mode: 'edit';
  eventSummary: TicketedEventSummary;
  onClose: () => void;
}) {
  return <TicketConfigForm mode={mode} eventSummary={eventSummary} onClose={onClose} />;
}

// ── Individual Ticket Type Card ──────────────────────────────
function TicketTypeCard({ data, errors, canRemove, onUpdate, onRemove }: {
  data: TicketTypeFormData;
  errors: Record<string, string>;
  canRemove: boolean;
  onUpdate: (field: keyof TicketTypeFormData, value: string | boolean) => void;
  onRemove: () => void;
}) {
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredSuggestions = ticketNameSuggestions.filter(s =>
    s.toLowerCase().includes(data.name.toLowerCase())
  );

  return (
    <div className="p-3 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 space-y-3">
      {/* Ticket Name + sold badge + remove in one row */}
      <div className="relative">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <label className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Ticket Name</label>
            {data.soldCount > 0 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                {data.soldCount} sold
              </span>
            )}
          </div>
          {canRemove ? (
            <button
              onClick={onRemove}
              className="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-gray-400 hover:text-red-500 transition-colors"
            >
              <TrashIcon className="w-4 h-4" />
            </button>
          ) : data.soldCount > 0 ? (
            <span className="text-[10px] text-red-400 dark:text-red-500 text-right leading-tight">Cannot remove<br/>Refund holders first.</span>
          ) : null}
        </div>
        <input
          type="text"
          value={data.name}
          onChange={e => { onUpdate('name', e.target.value); setShowSuggestions(true); }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
          placeholder="e.g. VIP, Early Bird"
          className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500"
        />
        {showSuggestions && data.name.length > 0 && filteredSuggestions.length > 0 && (
          <div className="absolute z-10 w-full mt-1 bg-white dark:bg-[#2C2C2E] border border-gray-200 dark:border-white/15 rounded-lg shadow-lg overflow-hidden">
            {filteredSuggestions.map(s => (
              <button
                key={s}
                onMouseDown={() => { onUpdate('name', s); setShowSuggestions(false); }}
                className="w-full px-3 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10"
              >
                {s}
              </button>
            ))}
          </div>
        )}
        {errors.name && <p className="text-[10px] text-red-500 mt-1">{errors.name}</p>}
      </div>

      {/* Price + Total Available row */}
      <div className="flex gap-3">
        <div className="flex-1">
          <label className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Price (GBP)</label>
          <div className="relative mt-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">£</span>
            <input
              type="number"
              min="0"
              step="1"
              value={data.price}
              onChange={e => onUpdate('price', e.target.value)}
              placeholder="1.00"
              className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500"
            />
          </div>
          {errors.price && <p className="text-[10px] text-red-500 mt-1">{errors.price}</p>}
        </div>
        <div className="flex-1">
          <label className="text-[10px] uppercase tracking-wider text-gray-400 dark:text-gray-500">Available</label>
          <input
            type="number"
            min="1"
            value={data.totalAvailable}
            onChange={e => onUpdate('totalAvailable', e.target.value)}
            placeholder="50"
            className="w-full mt-1 px-3 py-2 text-sm rounded-lg border border-gray-200 dark:border-white/15 bg-gray-50 dark:bg-white/5 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-600 focus:outline-none focus:ring-1 focus:ring-primary-500"
          />
          {errors.totalAvailable && <p className="text-[10px] text-red-500 mt-1">{errors.totalAvailable}</p>}
        </div>
      </div>

      {/* Member toggle */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-600 dark:text-gray-400">Member ticket</span>
        <button
          type="button"
          onClick={() => onUpdate('isMemberTicket', !data.isMemberTicket)}
          className={`relative w-10 h-6 rounded-full transition-colors ${
            data.isMemberTicket ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600'
          }`}
        >
          <span
            className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              data.isMemberTicket ? 'translate-x-4' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {errors._remove && <p className="text-[10px] text-red-500">{errors._remove}</p>}
    </div>
  );
}
