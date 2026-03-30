"use client";

import { useRef } from "react";
import { ImagePlus, X } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AspectRatioOption } from "@/lib/types/image-generation";
import { aspectRatioOptions } from "@/lib/types/image-generation";

interface ControlsProps {
  creativeDirection: string;
  imageDescription: string;
  styleInfluence: number;
  aspectRatio: AspectRatioOption;
  variantCount: number;
  referenceImages: File[];
  onCreativeDirectionChange: (value: string) => void;
  onImageDescriptionChange: (value: string) => void;
  onStyleInfluenceChange: (value: number) => void;
  onAspectRatioChange: (value: AspectRatioOption) => void;
  onVariantCountChange: (value: number) => void;
  onAddReferenceImages: (files: FileList | null) => void;
  onRemoveReferenceImage: (index: number) => void;
}

export function Controls({
  creativeDirection,
  imageDescription,
  styleInfluence,
  aspectRatio,
  variantCount,
  referenceImages,
  onCreativeDirectionChange,
  onImageDescriptionChange,
  onStyleInfluenceChange,
  onAspectRatioChange,
  onVariantCountChange,
  onAddReferenceImages,
  onRemoveReferenceImage,
}: ControlsProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-4 rounded-xl border bg-card p-4">
      <div className="space-y-2">
        <Label htmlFor="creativeDirection">Creative direction</Label>
        <Textarea
          id="creativeDirection"
          value={creativeDirection}
          maxLength={500}
          placeholder="Describe mood, style, typography, color and composition..."
          onChange={(event) => onCreativeDirectionChange(event.target.value)}
          rows={4}
        />
        <p className="text-xs text-muted-foreground">{creativeDirection.length}/500</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageDescription">Image description (optional)</Label>
        <Textarea
          id="imageDescription"
          value={imageDescription}
          maxLength={500}
          placeholder="Specific visual instructions that override the auto-detected style"
          onChange={(event) => onImageDescriptionChange(event.target.value)}
          rows={3}
        />
        <p className={cn("text-xs", imageDescription.length >= 500 ? "text-destructive" : "text-muted-foreground")}>
          {imageDescription.length}/500
        </p>
      </div>

      <div className="space-y-2">
        <Label>Reference images (max 5)</Label>
        <button
          type="button"
          className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-border p-4 hover:bg-muted/50"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            onAddReferenceImages(event.dataTransfer.files);
          }}
        >
          <ImagePlus className="h-5 w-5 text-muted-foreground" />
          <p className="text-xs text-muted-foreground">Drop images or click to browse</p>
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp"
          multiple
          className="hidden"
          onChange={(event) => onAddReferenceImages(event.target.files)}
        />
        {referenceImages.length > 0 && (
          <div className="grid grid-cols-5 gap-2">
            {referenceImages.map((file, index) => (
              <div key={`${file.name}-${index}`} className="group relative aspect-square overflow-hidden rounded-md border">
                <img src={URL.createObjectURL(file)} alt={file.name} className="h-full w-full object-cover" />
                <Button
                  type="button"
                  size="icon-xs"
                  variant="destructive"
                  className="absolute right-1 top-1 opacity-0 transition-opacity group-hover:opacity-100"
                  onClick={() => onRemoveReferenceImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="styleInfluence">Style influence</Label>
          <span className="text-sm font-medium">{styleInfluence}%</span>
        </div>
        <Input
          id="styleInfluence"
          type="range"
          min={0}
          max={100}
          step={1}
          value={styleInfluence}
          onChange={(event) => onStyleInfluenceChange(Number(event.target.value))}
          aria-label="Style influence percentage"
        />
        <p className="text-xs text-muted-foreground">
          {styleInfluence === 0
            ? "Fresh style - no past influence"
            : styleInfluence === 100
              ? "Fully on-brand - matches your existing look"
              : "How much your past Instagram aesthetic shapes the output"}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Aspect ratio</Label>
          <Select value={aspectRatio} onValueChange={(value) => onAspectRatioChange(value as AspectRatioOption)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {aspectRatioOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="variantCount">Number of variants</Label>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" size="icon-sm" onClick={() => onVariantCountChange(Math.max(1, variantCount - 1))}>
              -
            </Button>
            <Input
              id="variantCount"
              type="number"
              min={1}
              max={20}
              value={variantCount}
              onChange={(event) => onVariantCountChange(Number(event.target.value))}
              onBlur={(event) => {
                const raw = Number(event.target.value);
                const clamped = Number.isNaN(raw) ? 10 : Math.max(1, Math.min(20, raw));
                onVariantCountChange(clamped);
              }}
            />
            <Button type="button" variant="outline" size="icon-sm" onClick={() => onVariantCountChange(Math.min(20, variantCount + 1))}>
              +
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
