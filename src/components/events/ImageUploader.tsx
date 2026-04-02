"use client";

import { useCallback, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ImagePlus, X } from "lucide-react";

/** An image that's either a local File or a remote/public URL. */
export type ImageItem = File | { url: string; name: string };

export function isUrlImage(item: ImageItem): item is { url: string; name: string } {
  return !(item instanceof File);
}

function imageSrc(item: ImageItem): string {
  return isUrlImage(item) ? item.url : URL.createObjectURL(item);
}

function imageName(item: ImageItem): string {
  return isUrlImage(item) ? item.name : item.name;
}

interface ImageUploaderProps {
  images: ImageItem[];
  onChange: (files: ImageItem[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const accepted = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
      const remaining = maxImages - images.length;
      if (remaining <= 0) return;
      onChange([...images, ...accepted.slice(0, remaining)]);
    },
    [images, maxImages, onChange]
  );

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDragging(false);
    addFiles(e.dataTransfer.files);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  return (
    <div className="space-y-3">
      <div
        role="button"
        tabIndex={0}
        className={cn(
          "flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          isDragging
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50"
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <ImagePlus className="h-8 w-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Drop images here or click to browse</p>
          <p className="text-xs text-muted-foreground">
            {images.length}/{maxImages} images selected
          </p>
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleInputChange}
      />

      {images.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
          {images.map((item, index) => (
            <div key={`${imageName(item)}-${index}`} className="group relative aspect-square">
              <img
                src={imageSrc(item)}
                alt={imageName(item)}
                className="h-full w-full rounded-lg object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon-xs"
                className="absolute -right-1.5 -top-1.5 opacity-0 transition-opacity group-hover:opacity-100"
                onClick={() => removeImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
