"use client";

import { DndContext, KeyboardSensor, PointerSensor, closestCenter, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, arrayMove, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVertical, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { aspectRatioToCss } from "@/lib/types/image-generation";
import type { EventImage } from "@/lib/types/image-generation";

interface OutputBoxProps {
  images: EventImage[];
  onRemove: (id: string) => void;
  onReorder: (images: EventImage[]) => void;
  onDone: () => void;
}

function SortableOutputItem({
  image,
  index,
  onRemove,
}: {
  image: EventImage;
  index: number;
  onRemove: (id: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: image.id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="group rounded-lg border bg-background p-2">
      <div className="mb-2 flex items-center justify-between text-xs">
        <div className="inline-flex items-center gap-1 text-muted-foreground" {...attributes} {...listeners}>
          <GripVertical className="h-3.5 w-3.5" />
          {index + 1}
        </div>
        <Button type="button" size="icon-xs" variant="destructive" className="opacity-0 transition-opacity group-hover:opacity-100" onClick={() => onRemove(image.id)}>
          <X className="h-3 w-3" />
        </Button>
      </div>
      <div style={{ aspectRatio: aspectRatioToCss(image.aspectRatio ?? "4:5") }} className="overflow-hidden rounded-md border">
        <img src={image.url} alt={image.name} className="h-full w-full object-cover" />
      </div>
    </div>
  );
}

export function OutputBox({ images, onRemove, onReorder, onDone }: OutputBoxProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = images.findIndex((image) => image.id === String(active.id));
    const newIndex = images.findIndex((image) => image.id === String(over.id));
    if (oldIndex < 0 || newIndex < 0) return;

    onReorder(arrayMove(images, oldIndex, newIndex));
  }

  return (
    <div className="flex h-full flex-col border-l bg-card">
      <div className="border-b p-2.5">
        <h3 className="text-xs font-semibold">Event Images</h3>
        <p className="mt-0.5 text-[11px] text-muted-foreground">Drag to reorder</p>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto p-2">
        {images.length === 0 ? (
          <div className="flex h-full items-center justify-center px-3 text-center text-sm text-muted-foreground">
            Select generated images or upload images to add them here
          </div>
        ) : (
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext items={images.map((image) => image.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-2">
                {images.map((image, index) => (
                  <SortableOutputItem key={image.id} image={image} index={index} onRemove={onRemove} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}
      </div>

      <div className="border-t p-2">
        <Button type="button" size="sm" className="w-full bg-dashboard-cta text-white hover:bg-dashboard-cta/90" onClick={onDone}>
          Done
        </Button>
      </div>
    </div>
  );
}
