export type AspectRatioOption = "1:1" | "4:5" | "9:16" | "16:9" | "2:3";

export interface EventImage {
  id: string;
  source: "manual" | "generated";
  url: string;
  name: string;
  file?: File;
  generatedImageId?: string;
  aspectRatio?: AspectRatioOption;
}

export interface InfluenceImage {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string | null;
  url: string;
  summary: string | null;
}

export interface GeneratedImage {
  id: string;
  url: string;
  aspectRatio: AspectRatioOption;
}

export interface ImageGenerationControls {
  creativeDirection: string;
  imageDescription: string;
  styleInfluence: number;
  aspectRatio: AspectRatioOption;
  variantCount: number;
  referenceImages: File[];
}

export interface AutoDetectedContext {
  eventTitle: string | null;
  eventDescription: string | null;
  categories: string[];
  categoryVisualDirections: string[];
  isOnline: boolean;
  isFree: boolean;
  price: string | null;
  dateTime: string | null;
  venueName: string | null;
  buildingName: string | null;
  roomName: string | null;
  societyName: string | null;
  societyDescription: string | null;
  instagramHandle: string | null;
  universityName: string | null;
}

const ratioLabels: Record<AspectRatioOption, string> = {
  "1:1": "Instagram Post",
  "4:5": "Instagram Portrait",
  "9:16": "Instagram / TikTok Story",
  "16:9": "YouTube / LinkedIn",
  "2:3": "Pinterest",
};

export const aspectRatioOptions: Array<{ value: AspectRatioOption; label: string }> = (
  Object.keys(ratioLabels) as AspectRatioOption[]
).map((value) => ({
  value,
  label: `${value} - ${ratioLabels[value]}`,
}));

export function aspectRatioToCss(aspectRatio: AspectRatioOption): string {
  const [w, h] = aspectRatio.split(":").map(Number);
  return `${w} / ${h}`;
}

function uniqueId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

export function fileToEventImage(file: File): EventImage {
  return {
    id: uniqueId("manual"),
    source: "manual",
    url: URL.createObjectURL(file),
    name: file.name,
    file,
  };
}

export function filesToEventImages(files: File[]): EventImage[] {
  return files.map(fileToEventImage);
}

export async function eventImagesToFiles(images: EventImage[]): Promise<File[]> {
  const resolved: File[] = [];

  for (const image of images) {
    if (image.file) {
      resolved.push(image.file);
      continue;
    }

    const response = await fetch(image.url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${image.name}`);
    }

    const blob = await response.blob();
    const extension = blob.type.includes("png") ? "png" : blob.type.includes("webp") ? "webp" : "jpg";
    resolved.push(new File([blob], `${image.name || image.id}.${extension}`, { type: blob.type || "image/jpeg" }));
  }

  return resolved;
}

export function generatedImageToEventImage(generated: GeneratedImage): EventImage {
  return {
    id: `output-${generated.id}`,
    source: "generated",
    url: generated.url,
    name: `generated-${generated.id}`,
    generatedImageId: generated.id,
    aspectRatio: generated.aspectRatio,
  };
}
