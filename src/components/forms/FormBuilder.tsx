"use client";

import { useCallback } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { FormFieldCard, type FormFieldData } from "./FormFieldCard";

interface FormBuilderProps {
  open: boolean;
  fields: FormFieldData[];
  onChange: (fields: FormFieldData[]) => void;
}

let fieldCounter = 0;

function generateFieldId() {
  fieldCounter += 1;
  return `field-${Date.now()}-${fieldCounter}`;
}

export function FormBuilder({ open, fields, onChange }: FormBuilderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over || active.id === over.id) return;

      const oldIndex = fields.findIndex((f) => f.id === active.id);
      const newIndex = fields.findIndex((f) => f.id === over.id);
      onChange(arrayMove(fields, oldIndex, newIndex));
    },
    [fields, onChange]
  );

  function handleAdd() {
    onChange([
      ...fields,
      {
        id: generateFieldId(),
        type: "text",
        title: "",
        options: [],
        required: false,
      },
    ]);
  }

  function handleChange(index: number, value: FormFieldData) {
    const next = [...fields];
    next[index] = value;
    onChange(next);
  }

  function handleRemove(index: number) {
    if (fields.length <= 1) return;
    onChange(fields.filter((_, i) => i !== index));
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="space-y-3 pt-3">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={fields.map((f) => f.id)}
                strategy={verticalListSortingStrategy}
              >
                {fields.map((field, i) => (
                  <FormFieldCard
                    key={field.id}
                    field={field}
                    onChange={(v) => handleChange(i, v)}
                    onRemove={() => handleRemove(i)}
                    canRemove={fields.length > 1}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleAdd}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Question
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
