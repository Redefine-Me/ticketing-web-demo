"use client";

import { Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
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
              <div key={image.id} className="group relative overflow-hidden rounded-md border">
                <img src={image.url} alt={image.summary ?? "Influence image"} className="h-full w-full object-cover" loading="lazy" />
                <span className="absolute left-2 top-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-dashboard-cta text-white">
                  <Check className="h-4 w-4" />
                </span>
                <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/35" />
                <Button
                  type="button"
                  size="icon-xs"
                  variant="destructive"
                  className="absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => onRemove(image)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
