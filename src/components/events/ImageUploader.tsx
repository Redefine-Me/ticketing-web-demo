"use client";

import { useCallback, useRef, useState } from "react";
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GripVertical, ImagePlus, X } from "lucide-react";

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

/** Stable ID for an ImageItem — used as sortable key. */
function imageId(item: ImageItem, index: number): string {
  if (isUrlImage(item)) return `url-${item.url}`;
  return `file-${item.name}-${item.size}-${index}`;
}

// ── Sortable thumbnail ──────────────────────────────────────

function SortableImageItem({
  item,
  itemId,
  index,
  onRemove,
}: {
  item: ImageItem;
  itemId: string;
  index: number;
  onRemove: (index: number) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: itemId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "group relative aspect-square rounded-lg border bg-background transition-shadow",
        isDragging ? "z-10 opacity-50 shadow-lg ring-2 ring-primary" : "shadow-sm hover:shadow-md",
      )}
    >
      <img
        src={imageSrc(item)}
        alt={imageName(item)}
        className="h-full w-full rounded-lg object-cover"
      />

      {/* Order badge + drag handle */}
      <div
        className="absolute left-1 top-1 flex items-center gap-0.5 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-sm cursor-grab active:cursor-grabbing"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-3 w-3" />
        {index + 1}
      </div>

      {/* Delete button */}
      <Button
        type="button"
        variant="destructive"
        size="icon-xs"
        className="absolute -right-1.5 -top-1.5 opacity-0 transition-opacity group-hover:opacity-100"
        onClick={() => onRemove(index)}
      >
        <X className="h-3 w-3" />
      </Button>
    </div>
  );
}

// ── Drag overlay (ghost preview while dragging) ─────────────

function DragOverlayContent({ item }: { item: ImageItem }) {
  return (
    <div className="aspect-square w-28 rounded-lg border-2 border-primary bg-background shadow-2xl ring-2 ring-primary/30">
      <img
        src={imageSrc(item)}
        alt={imageName(item)}
        className="h-full w-full rounded-lg object-cover"
      />
    </div>
  );
}

// ── Main component ──────────────────────────────────────────

interface ImageUploaderProps {
  images: ImageItem[];
  onChange: (files: ImageItem[]) => void;
  maxImages?: number;
}

export function ImageUploader({ images, onChange, maxImages = 10 }: ImageUploaderProps) {
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const ids = images.map((item, i) => imageId(item, i));

  const addFiles = useCallback(
    (incoming: FileList | null) => {
      if (!incoming) return;
      const accepted = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
      const remaining = maxImages - images.length;
      if (remaining <= 0) return;
      onChange([...images, ...accepted.slice(0, remaining)]);
    },
    [images, maxImages, onChange],
  );

  function removeImage(index: number) {
    onChange(images.filter((_, i) => i !== index));
  }

  // File drop zone handlers
  function handleFileDragOver(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingFile(true);
  }
  function handleFileDragLeave(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingFile(false);
  }
  function handleFileDrop(e: React.DragEvent) {
    e.preventDefault();
    setIsDraggingFile(false);
    addFiles(e.dataTransfer.files);
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    addFiles(e.target.files);
    if (inputRef.current) inputRef.current.value = "";
  }

  // Sortable handlers
  function handleDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
  }
  function handleDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = ids.indexOf(String(active.id));
    const newIndex = ids.indexOf(String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;

    onChange(arrayMove([...images], oldIndex, newIndex));
  }

  const activeItem = activeId ? images[ids.indexOf(activeId)] : null;

  return (
    <div className="space-y-3">
      {/* Upload drop zone */}
      <div
        role="button"
        tabIndex={0}
        className={cn(
          "flex min-h-[120px] cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 text-center transition-colors",
          isDraggingFile
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-muted-foreground/50",
        )}
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragOver={handleFileDragOver}
        onDragLeave={handleFileDragLeave}
        onDrop={handleFileDrop}
      >
        <ImagePlus className="h-8 w-8 text-muted-foreground" />
        <div>
          <p className="text-sm font-medium">Drop images here or click to browse</p>
          <p className="text-xs text-muted-foreground">
            Drag and drop them in the desired order
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            {images.length}/{maxImages} images
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

      {/* Sortable image grid */}
      {images.length > 0 && (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext items={ids} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {images.map((item, index) => (
                <SortableImageItem
                  key={ids[index]}
                  item={item}
                  itemId={ids[index]}
                  index={index}
                  onRemove={removeImage}
                />
              ))}
            </div>
          </SortableContext>

          <DragOverlay>
            {activeItem ? <DragOverlayContent item={activeItem} /> : null}
          </DragOverlay>
        </DndContext>
      )}
    </div>
  );
}
