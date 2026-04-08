"use client";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
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

export function FormBuilder({ open, fields, onChange }: FormBuilderProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = fields.findIndex((f) => f.id === active.id);
    const newIndex = fields.findIndex((f) => f.id === over.id);
    onChange(arrayMove(fields, oldIndex, newIndex));
  }

  function handleAdd() {
    const newField: FormFieldData = {
      id: `ff-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      type: "text",
      title: "",
      options: [],
      required: false,
    };
    onChange([...fields, newField]);
  }

  function handleChange(index: number, updated: FormFieldData) {
    const next = [...fields];
    next[index] = updated;
    onChange(next);
  }

  function handleDelete(index: number) {
    onChange(fields.filter((_, i) => i !== index));
  }

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
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
                {fields.map((field, index) => (
                  <FormFieldCard
                    key={field.id}
                    field={field}
                    onChange={(updated) => handleChange(index, updated)}
                    onDelete={() => handleDelete(index)}
                  />
                ))}
              </SortableContext>
            </DndContext>

            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={handleAdd}
            >
              <Plus className="h-4 w-4" />
              Add Question
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
