// Frontend types previously in supabase_lib/types.ts.
// Only the types still referenced by surviving code are kept here.

export interface Category {
  id: string;
  name: string;
}

export interface EventSchedule {
  scheduledAt: string;
  isEnd: boolean;
  order: number;
  locationName: string | null;
  locationGoogleMapsUrl: string | null;
}

export interface Event {
  id: string;
  slug: string;
  title: string;
  description: string;
  startDateTime: string;
  endDateTime?: string;
  city: string;
  university: string;
  societyName: string;
  locationName: string;
  locationGoogleMapsUrl: string | null;
  schedules: EventSchedule[];
  imageUrl: string;
  externalUrl: string;
  tags: string[];
  interestedCount: number;
  attendingCount: number;
  createdAt: string;
  priceLabel: string;
}

export interface ScheduleEntryInput {
  scheduled_at: string;
  is_end_schedule?: boolean;
  schedule_order?: number;
  location_id?: string;
  building_id?: string;
  room_id?: string;
  description?: string;
}
