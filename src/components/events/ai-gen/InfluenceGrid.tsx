"use client";

import { Check, X } from "lucide-react";
import type { InfluenceImage } from "@/lib/types/image-generation";

interface InfluenceGridProps {
  images: InfluenceImage[];
  onRemove: (image: InfluenceImage) => void;
}

export function InfluenceGrid({ images, onRemove }: InfluenceGridProps) {
  return (
    <section className="space-y-2">
      <h3 className="text-sm font-bold text-red-500">Influence images: use your past event images to influence your new images</h3>
      <div className="h-[180px] overflow-y-auto rounded-lg border bg-muted/10 p-1.5">
        {images.length === 0 ? (
          <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
            Select events above to add influence images
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
            {images.map((image) => (
              <button
                type="button"
                key={image.id}
                className="group relative overflow-hidden rounded-md border cursor-pointer"
                onClick={() => onRemove(image)}
              >
                <img src={image.url} alt={image.summary ?? "Influence image"} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-dashboard-cta text-white transition-colors group-hover:bg-destructive">
                  <Check className="h-4 w-4 group-hover:hidden" />
                  <X className="h-4 w-4 hidden group-hover:block" />
                </span>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/35" />
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
