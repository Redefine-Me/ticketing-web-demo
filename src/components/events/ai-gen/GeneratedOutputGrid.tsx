"use client";

import { Check, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { aspectRatioToCss } from "@/lib/types/image-generation";
import type { AspectRatioOption, GeneratedImage } from "@/lib/types/image-generation";
import { cn } from "@/lib/utils";

interface GeneratedOutputGridProps {
  generatedImages: GeneratedImage[];
  selectedGeneratedIds: string[];
  generationPhase: "idle" | "generating" | "done";
  generationStep: number;
  variantCount: number;
  aspectRatio: AspectRatioOption;
  onSelect: (image: GeneratedImage) => void;
  onRegenerateHint: () => void;
}

export function GeneratedOutputGrid({
  generatedImages,
  selectedGeneratedIds,
  generationPhase,
  generationStep,
  variantCount,
  aspectRatio,
  onSelect,
  onRegenerateHint,
}: GeneratedOutputGridProps) {
  if (generationPhase === "idle") {
    return null;
  }

  const skeletonCount = Math.max(variantCount - generatedImages.length, 0);

  return (
    <section className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold">Generated images</h3>
        {generationPhase === "done" && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger render={<Button type="button" variant="outline" size="sm" onClick={onRegenerateHint} />}>
                <RefreshCw className="h-4 w-4" />
                Regenerate
              </TooltipTrigger>
              <TooltipContent>Coming soon</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>

      {generationPhase === "generating" && (
        <p className="text-sm text-muted-foreground">
          Generating image {Math.max(1, Math.min(generationStep, variantCount))} of {variantCount}...
        </p>
      )}

      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
        {generatedImages.map((image) => {
          const selected = selectedGeneratedIds.includes(image.id);
          return (
            <button
              type="button"
              key={image.id}
              style={{ aspectRatio: aspectRatioToCss(image.aspectRatio) }}
              className={cn(
                "group relative overflow-hidden rounded-md border transition",
                selected ? "border-dashboard-cta ring-2 ring-dashboard-cta/40" : "border-border hover:border-muted-foreground/40"
              )}
              onClick={() => onSelect(image)}
            >
              <img src={image.url} alt={image.id} className="h-full w-full object-cover" />
              <div className={cn("absolute inset-0 transition-colors", selected ? "bg-dashboard-cta/25" : "bg-transparent")} />
              {selected && (
                <span className="absolute right-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-dashboard-cta text-white">
                  <Check className="h-4 w-4" />
                </span>
              )}
            </button>
          );
        })}

        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} style={{ aspectRatio: aspectRatioToCss(aspectRatio) }}>
            <Skeleton className="h-full w-full rounded-md" />
          </div>
        ))}
      </div>
    </section>
  );
}
