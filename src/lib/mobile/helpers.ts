import { EventWithDetails } from '@/types/mobile';

export function getEventDate(event: EventWithDetails): Date | null {
  const start = event.schedule_entries.find(e => !e.is_end_schedule);
  return start ? new Date(start.scheduled_at) : null;
}

export function getEventEndDate(event: EventWithDetails): Date | null {
  const end = event.schedule_entries.find(e => e.is_end_schedule);
  return end ? new Date(end.scheduled_at) : null;
}

export function getEventLocation(event: EventWithDetails): string {
  const start = event.schedule_entries.find(e => !e.is_end_schedule);
  return start?.location?.name ?? 'Online';
}

export function getEventLocationDetails(event: EventWithDetails) {
  const start = event.schedule_entries.find(e => !e.is_end_schedule);
  return start?.location ?? null;
}

export function getSocietyName(event: EventWithDetails): string {
  return event.societies[0]?.name ?? 'Unknown Society';
}

export function getSocietyImageUrl(event: EventWithDetails): string | null {
  return event.societies[0]?.image_url ?? null;
}

export function getEventImageUrl(event: EventWithDetails): string | null {
  const img = event.images[0];
  return img?.small_url ?? img?.full_url ?? null;
}

export function getEventImageUrls(event: EventWithDetails): string[] {
  return event.images.map(img => img.full_url);
}

export function isEventFree(event: EventWithDetails): boolean {
  return !event.ticketTypes || event.ticketTypes.length === 0 || event.ticketTypes.every(t => t.price === 0);
}

export function getEventPrice(event: EventWithDetails): string {
  if (!event.ticketTypes || event.ticketTypes.length === 0) return 'Free';
  if (event.ticketTypes.every(t => t.price === 0)) return 'Free';
  const minPrice = Math.min(...event.ticketTypes.map(t => t.price));
  return `From £${minPrice.toFixed(2)}`;
}

export function capitalizeCategoryName(name: string): string {
  return name
    .split(' ')
    .map(word => {
      if (word === '&') return '&';
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

export function formatEventDate(date: Date): string {
  return date.toLocaleDateString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export function formatEventTime(date: Date): string {
  return date.toLocaleTimeString('en-GB', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function formatEventDateTime(event: EventWithDetails): string {
  const start = getEventDate(event);
  const end = getEventEndDate(event);
  if (!start) return 'Date TBC';

  const startStr = `${formatEventDate(start)}, ${formatEventTime(start)}`;
  if (!end) return startStr;

  const sameDay = start.toDateString() === end.toDateString();
  if (sameDay) {
    return `${startStr} - ${formatEventTime(end)}`;
  }
  return `${startStr} - ${formatEventDate(end)}, ${formatEventTime(end)}`;
}

export function formatSectionLabel(date: Date): string {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diffDays = Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Tomorrow';
  return date.toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
}

export function groupEventsByDate(events: EventWithDetails[]): { label: string; date: Date; events: EventWithDetails[] }[] {
  const groups = new Map<string, { label: string; date: Date; events: EventWithDetails[] }>();

  const sorted = [...events].sort((a, b) => {
    const da = getEventDate(a);
    const db = getEventDate(b);
    if (!da || !db) return 0;
    return da.getTime() - db.getTime();
  });

  for (const event of sorted) {
    const date = getEventDate(event);
    if (!date) continue;
    const key = date.toDateString();
    if (!groups.has(key)) {
      groups.set(key, { label: formatSectionLabel(date), date, events: [] });
    }
    groups.get(key)!.events.push(event);
  }

  return Array.from(groups.values());
}
