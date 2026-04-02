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
    <div className="space-y-2 rounded-lg border bg-card p-2.5">
      <div className="space-y-1">
        <Label htmlFor="creativeDirection" className="text-xs">Creative direction</Label>
        <Textarea
          id="creativeDirection"
          value={creativeDirection}
          maxLength={500}
          placeholder="Describe mood, style, typography, color and composition..."
          onChange={(event) => onCreativeDirectionChange(event.target.value)}
          rows={1}
          className="min-h-0 text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label htmlFor="imageDescription" className="text-xs">Image description (optional)</Label>
        <Textarea
          id="imageDescription"
          value={imageDescription}
          maxLength={500}
          placeholder="Specific visual instructions that override the auto-detected style"
          onChange={(event) => onImageDescriptionChange(event.target.value)}
          rows={1}
          className="min-h-0 text-sm"
        />
      </div>

      <div className="space-y-1">
        <Label className="text-xs">Reference images (max 5)</Label>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md border-2 border-dashed border-border px-3 py-1.5 hover:bg-muted/50"
          onClick={() => inputRef.current?.click()}
          onDragOver={(event) => event.preventDefault()}
          onDrop={(event) => {
            event.preventDefault();
            onAddReferenceImages(event.dataTransfer.files);
          }}
        >
          <ImagePlus className="h-4 w-4 text-muted-foreground" />
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
          <div className="grid grid-cols-5 gap-1.5">
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

      <div className="flex items-center gap-3">
        <Label htmlFor="styleInfluence" className="shrink-0 text-xs">Style influence</Label>
        <Input
          id="styleInfluence"
          type="range"
          min={0}
          max={100}
          step={1}
          value={styleInfluence}
          onChange={(event) => onStyleInfluenceChange(Number(event.target.value))}
          className="h-5"
          aria-label="Style influence percentage"
        />
        <span className="shrink-0 text-xs font-medium">{styleInfluence}%</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2">
          <Label className="shrink-0 text-xs">Ratio</Label>
          <Select value={aspectRatio} onValueChange={(value) => onAspectRatioChange(value as AspectRatioOption)}>
            <SelectTrigger className="h-8 w-full text-xs">
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

        <div className="flex items-center gap-2">
          <Label className="shrink-0 text-xs">Variants</Label>
          <Button type="button" variant="outline" size="icon-sm" className="h-8 w-8 shrink-0" onClick={() => onVariantCountChange(Math.max(1, variantCount - 1))}>
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
            className="h-8 text-xs"
          />
          <Button type="button" variant="outline" size="icon-sm" className="h-8 w-8 shrink-0" onClick={() => onVariantCountChange(Math.min(20, variantCount + 1))}>
            +
          </Button>
        </div>
      </div>
    </div>
  );
}
