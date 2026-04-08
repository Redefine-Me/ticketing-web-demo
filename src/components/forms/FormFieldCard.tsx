"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { GripVertical, Trash2, Plus, X } from "lucide-react";

export type FormFieldType = "text" | "paragraph" | "checkbox" | "radio";

export interface FormFieldData {
  id: string;
  type: FormFieldType;
  title: string;
  options: string[];
  required: boolean;
}

interface FormFieldCardProps {
  field: FormFieldData;
  onChange: (updated: FormFieldData) => void;
  onDelete: () => void;
}

const fieldTypeLabels: Record<FormFieldType, string> = {
  text: "Short Text",
  paragraph: "Paragraph",
  checkbox: "Checkboxes",
  radio: "Radio Buttons",
};

export function FormFieldCard({ field, onChange, onDelete }: FormFieldCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: field.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const hasOptions = field.type === "checkbox" || field.type === "radio";

  function updateOption(index: number, value: string) {
    const next = [...field.options];
    next[index] = value;
    onChange({ ...field, options: next });
  }

  function addOption() {
    onChange({ ...field, options: [...field.options, ""] });
  }

  function removeOption(index: number) {
    onChange({ ...field, options: field.options.filter((_, i) => i !== index) });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border bg-white p-4 shadow-sm ${isDragging ? "opacity-50" : ""}`}
    >
      <div className="flex items-start gap-3">
        {/* Drag handle */}
        <button
          type="button"
          className="mt-2 cursor-grab touch-none text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <div className="flex-1 space-y-3">
          {/* Question title + type selector row */}
          <div className="flex items-center gap-2">
            <Input
              placeholder="Question title"
              value={field.title}
              onChange={(e) => onChange({ ...field, title: e.target.value })}
              className="flex-1"
            />
            <Select
              value={field.type}
              onValueChange={(value) =>
                onChange({
                  ...field,
                  type: value as FormFieldType,
                  options:
                    (value === "checkbox" || value === "radio") && field.options.length === 0
                      ? [""]
                      : field.options,
                })
              }
            >
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(fieldTypeLabels) as [FormFieldType, string][]).map(
                  ([value, label]) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Options list (checkbox/radio only) */}
          {hasOptions && (
            <div className="space-y-2 pl-1">
              {field.options.map((opt, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="flex h-4 w-4 shrink-0 items-center justify-center">
                    {field.type === "radio" ? (
                      <div className="h-3.5 w-3.5 rounded-full border-2 border-muted-foreground" />
                    ) : (
                      <div className="h-3.5 w-3.5 rounded-sm border-2 border-muted-foreground" />
                    )}
                  </div>
                  <Input
                    placeholder={`Option ${i + 1}`}
                    value={opt}
                    onChange={(e) => updateOption(i, e.target.value)}
                    className="h-8 flex-1 text-sm"
                  />
                  {field.options.length > 1 && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => removeOption(i)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-muted-foreground"
                onClick={addOption}
              >
                <Plus className="h-3.5 w-3.5" />
                Add option
              </Button>
            </div>
          )}

          {/* Footer: required toggle + delete */}
          <div className="flex items-center justify-between border-t pt-3">
            <div className="flex items-center gap-2">
              <Switch
                id={`required-${field.id}`}
                size="sm"
                checked={field.required}
                onCheckedChange={(checked) => onChange({ ...field, required: checked })}
              />
              <Label htmlFor={`required-${field.id}`} className="text-sm text-muted-foreground">
                Required
              </Label>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              onClick={onDelete}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
