import type { InfluenceImage } from "@/lib/types/image-generation";
import { mockEvents } from "@/lib/mock-data";

export const mockEventInfluenceImages: InfluenceImage[] = mockEvents
  .filter((e) => e.imageUrl != null)
  .map((e) => ({
    id: `inf-${e.id}-1`,
    eventId: e.id,
    eventTitle: e.title,
    eventDate: e.date,
    url: e.imageUrl!,
    summary: e.description.slice(0, 60),
  }));

export const mockGeneratedImagePool: string[] = mockEvents
  .map((e) => e.imageUrl)
  .filter((url): url is string => url != null);

export const mockPrimaryEventImages: Record<string, string> = Object.fromEntries(
  mockEvents
    .filter((e) => e.imageUrl != null)
    .map((e) => [e.id, e.imageUrl!]),
);
