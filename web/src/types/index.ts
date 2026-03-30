export interface University {
  id: string;
  name: string;
  short_name: string;
  city: string;
  building_url: string | null;
  logo_url: string | null;
  description: string | null;
}

export interface Society {
  id: string;
  name: string;
  instagram_handle: string | null;
  description: string | null;
  image_url: string | null;
  university: University;
  follower_count: number;
  is_following?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
}

export interface Location {
  id: string;
  name: string;
  street: string | null;
  postcode: string | null;
  google_maps_url: string | null;
}

export interface ScheduleEntry {
  id: string;
  event_id: string;
  location_id: string | null;
  scheduled_at: string;
  is_end_schedule: boolean;
  schedule_order: number;
  location: Location | null;
}

export interface PostImage {
  id: string;
  full_url: string;
  small_url: string | null;
}

export interface EventWithDetails {
  id: string;
  name: string;
  description: string | null;
  is_free: boolean;
  price: number | null;
  registration_url: string | null;
  source_post_url: string | null;
  like_count: number;
  attend_count: number;
  created_at: string;
  category: Category | null;
  categories: Category[];
  societies: Society[];
  images: PostImage[];
  schedule_entries: ScheduleEntry[];
  isLiked: boolean;
  isAttending: boolean;
}

export interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  avatar_url: string | null;
  university: University | null;
  interests: Category[];
}

export interface CategoryMeta {
  icon: string;
  color: string;
  description: string;
}
