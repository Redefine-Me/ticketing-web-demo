"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mockEvents, mockUniversities } from "@/lib/mock-data";
import { mockEventInfluenceImages, mockGeneratedImagePool } from "@/lib/mock-data-images";
import type {
  AspectRatioOption,
  AutoDetectedContext,
  EventImage,
  GeneratedImage,
  InfluenceImage,
} from "@/lib/types/image-generation";
import { generatedImageToEventImage } from "@/lib/types/image-generation";
import type { Category } from "@/supabase_lib/types";

const CATEGORY_STYLE_MAP: Record<string, string> = {
  social: "Vibrant, warm lighting, energetic, nightlife / casual gathering",
  sports: "Dynamic, high-contrast, dramatic lighting, athletic energy",
  academic: "Clean, sophisticated, warm tones, intellectual",
  arts: "Creative, expressive, rich textures, gallery aesthetic",
  career: "Professional, corporate-clean, sharp lines, modern office",
  workshop: "Hands-on, warm, close-up detail, workbench / classroom",
  trip: "Scenic, wanderlust, landscape, travel photography",
};

interface EventFormSnapshot {
  title?: string;
  description?: string;
  categoryIds?: string[];
  schedules?: Array<{
    date?: string;
    startTime?: string;
    endTime?: string;
    buildingName?: string;
    roomName?: string;
  }>;
  isOnline?: boolean;
  isFree?: boolean;
  price?: string;
}

interface UseImageGenerationArgs {
  initialOutputImages: EventImage[];
  formData: EventFormSnapshot;
  categories: Category[];
  society: {
    name?: string | null;
    description?: string | null;
    instagram_handle?: string | null;
    university_id?: string | null;
  } | null;
}

export function useImageGeneration({ initialOutputImages, formData, categories, society }: UseImageGenerationArgs) {
  const [creativeDirection, setCreativeDirection] = useState("");
  const [imageDescription, setImageDescription] = useState("");
  const [referenceImages, setReferenceImages] = useState<File[]>([]);
  const [styleInfluence, setStyleInfluence] = useState(50);
  const [aspectRatio, setAspectRatio] = useState<AspectRatioOption>("4:5");
  const [variantCount, setVariantCount] = useState(10);
  const [selectedEventIds, setSelectedEventIds] = useState<string[]>([]);
  const [removedInfluenceByEvent, setRemovedInfluenceByEvent] = useState<Record<string, string[]>>({});
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [generationPhase, setGenerationPhase] = useState<"idle" | "generating" | "done">("idle");
  const [generationStep, setGenerationStep] = useState(0);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [outputImages, setOutputImages] = useState<EventImage[]>(initialOutputImages.slice(0, 10));
  const [selectedGeneratedIds, setSelectedGeneratedIds] = useState<string[]>([]);
  const [isOutputPanelVisible, setIsOutputPanelVisible] = useState(true);
  const [showEmptyConfirm, setShowEmptyConfirm] = useState(false);

  const generationIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (generationIntervalRef.current !== null) {
        window.clearInterval(generationIntervalRef.current);
      }
    };
  }, []);

  const eventsForScroll = useMemo(() => {
    return [...mockEvents].sort((a, b) => {
      const dateA = a.date ? new Date(a.date).getTime() : 0;
      const dateB = b.date ? new Date(b.date).getTime() : 0;
      return dateB - dateA;
    });
  }, []);

  const selectedInfluenceImages = useMemo(() => {
    const selected = new Set(selectedEventIds);
    return mockEventInfluenceImages.filter((image) => {
      if (!selected.has(image.eventId)) return false;
      const removed = new Set(removedInfluenceByEvent[image.eventId] ?? []);
      return !removed.has(image.id);
    });
  }, [removedInfluenceByEvent, selectedEventIds]);

  const autoContext: AutoDetectedContext = useMemo(() => {
    const schedule = formData.schedules?.[0];
    const categoryNames = (formData.categoryIds ?? [])
      .map((id) => categories.find((category) => category.id === id)?.name)
      .filter((name): name is string => Boolean(name));

    const dateParts = [schedule?.date, schedule?.startTime, schedule?.endTime].filter(Boolean);
    const universityName = mockUniversities.find((uni) => uni.id === society?.university_id)?.name ?? null;

    return {
      eventTitle: formData.title?.trim() || null,
      eventDescription: formData.description?.trim() || null,
      categories: categoryNames,
      categoryVisualDirections: categoryNames.map((name) => CATEGORY_STYLE_MAP[name] ?? "Default visual style"),
      isOnline: Boolean(formData.isOnline),
      isFree: formData.isFree !== false,
      price: formData.price?.trim() || null,
      dateTime: dateParts.length > 0 ? dateParts.join(" • ") : null,
      venueName: schedule?.buildingName?.trim() || null,
      buildingName: schedule?.buildingName?.trim() || null,
      roomName: schedule?.roomName?.trim() || null,
      societyName: society?.name?.trim() || null,
      societyDescription: society?.description?.trim() || null,
      instagramHandle: society?.instagram_handle?.trim() || null,
      universityName,
    };
  }, [categories, formData.categoryIds, formData.description, formData.isFree, formData.isOnline, formData.price, formData.schedules, formData.title, society?.description, society?.instagram_handle, society?.name, society?.university_id]);

  const toggleEventSelection = useCallback((eventId: string) => {
    setSelectedEventIds((previous) => {
      if (previous.includes(eventId)) {
        return previous.filter((id) => id !== eventId);
      }
      setRemovedInfluenceByEvent((current) => {
        const next = { ...current };
        delete next[eventId];
        return next;
      });
      return [...previous, eventId];
    });
  }, []);

  const removeInfluenceImage = useCallback((image: InfluenceImage) => {
    setRemovedInfluenceByEvent((previous) => ({
      ...previous,
      [image.eventId]: [...(previous[image.eventId] ?? []), image.id],
    }));
  }, []);

  const addReferenceImages = useCallback((files: FileList | null) => {
    if (!files) return;
    const incoming = Array.from(files);
    const accepted = incoming.filter((file) => file.type.startsWith("image/"));

    if (accepted.length !== incoming.length) {
      setStatusMessage("Only JPEG, PNG, and WebP files are supported.");
    }

    setReferenceImages((previous) => {
      if (previous.length + accepted.length > 5) {
        setStatusMessage("Maximum 5 reference images.");
      }
      return [...previous, ...accepted].slice(0, 5);
    });
  }, []);

  const removeReferenceImage = useCallback((index: number) => {
    setReferenceImages((previous) => previous.filter((_, i) => i !== index));
  }, []);

  const addGeneratedToOutput = useCallback((generated: GeneratedImage) => {
    if (selectedGeneratedIds.includes(generated.id)) {
      return;
    }

    setOutputImages((previous) => {
      if (previous.length >= 10) {
        setStatusMessage("Maximum 10 images. Remove an image to add more.");
        return previous;
      }

      setStatusMessage(null);
      setSelectedGeneratedIds((ids) => [...ids, generated.id]);
      return [...previous, generatedImageToEventImage(generated)];
    });
  }, [selectedGeneratedIds]);

  const removeOutputImage = useCallback((imageId: string) => {
    setOutputImages((previous) => {
      const target = previous.find((image) => image.id === imageId);
      if (target?.generatedImageId) {
        setSelectedGeneratedIds((ids) => ids.filter((id) => id !== target.generatedImageId));
      }
      return previous.filter((image) => image.id !== imageId);
    });
  }, []);

  const reorderOutputImages = useCallback((newOrder: EventImage[]) => {
    setOutputImages(newOrder);
  }, []);

  const startGeneration = useCallback(() => {
    if (!creativeDirection.trim()) {
      setStatusMessage("Creative direction is required before generating images.");
      return;
    }

    if (generationIntervalRef.current !== null) {
      window.clearInterval(generationIntervalRef.current);
    }

    const normalizedVariantCount = Math.max(1, Math.min(20, variantCount));
    const startedAt = Date.now();

    setStatusMessage(null);
    setVariantCount(normalizedVariantCount);
    setGenerationPhase("generating");
    setGenerationStep(0);
    setGeneratedImages([]);

    generationIntervalRef.current = window.setInterval(() => {
      setGenerationStep((previous) => {
        const nextStep = previous + 1;

        const url = mockGeneratedImagePool[(nextStep - 1) % mockGeneratedImagePool.length];
        setGeneratedImages((prev) => [
          ...prev,
          {
            id: `gen-${startedAt}-${nextStep}`,
            url,
            aspectRatio,
          },
        ]);

        if (nextStep >= normalizedVariantCount) {
          if (generationIntervalRef.current !== null) {
            window.clearInterval(generationIntervalRef.current);
          }
          generationIntervalRef.current = null;
          setGenerationPhase("done");
        }

        return nextStep;
      });
    }, 1000);
  }, [aspectRatio, creativeDirection, variantCount]);

  const stopGeneration = useCallback(() => {
    if (generationIntervalRef.current !== null) {
      window.clearInterval(generationIntervalRef.current);
      generationIntervalRef.current = null;
    }
  }, []);

  return {
    controls: {
      creativeDirection,
      imageDescription,
      referenceImages,
      styleInfluence,
      aspectRatio,
      variantCount,
    },
    setCreativeDirection,
    setImageDescription,
    setStyleInfluence,
    setAspectRatio,
    setVariantCount,
    addReferenceImages,
    removeReferenceImage,
    autoContext,
    eventsForScroll,
    selectedEventIds,
    selectedInfluenceImages,
    toggleEventSelection,
    removeInfluenceImage,
    generationPhase,
    generationStep,
    generatedImages,
    startGeneration,
    stopGeneration,
    outputImages,
    addGeneratedToOutput,
    removeOutputImage,
    reorderOutputImages,
    selectedGeneratedIds,
    isOutputPanelVisible,
    setIsOutputPanelVisible,
    statusMessage,
    setStatusMessage,
    showEmptyConfirm,
    setShowEmptyConfirm,
  };
}
