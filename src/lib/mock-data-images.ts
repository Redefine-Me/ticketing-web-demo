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

export const mockGeneratedImagePool: string[] = [
  "/event-images/ai-gen/prompt_01_kerala_mural.png",
  "/event-images/ai-gen/prompt_02_photographic.png",
  "/event-images/ai-gen/prompt_03_retro.png",
  "/event-images/ai-gen/prompt_04_neon.png",
  "/event-images/ai-gen/prompt_05_minimalist.png",
  "/event-images/ai-gen/prompt_06_collage.png",
  "/event-images/ai-gen/prompt_07_bold_graphic.png",
  "/event-images/ai-gen/prompt_08_watercolor.png",
  "/event-images/ai-gen/prompt_09_pixel_art.png",
  "/event-images/ai-gen/prompt_10_cinematic.png",
];

export const mockPrimaryEventImages: Record<string, string> = Object.fromEntries(
  mockEvents
    .filter((e) => e.imageUrl != null)
    .map((e) => [e.id, e.imageUrl!]),
);
