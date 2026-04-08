"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { GripVertical, Trash2, Plus, X } from "lucide-react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  onChange: (field: FormFieldData) => void;
  onRemove: () => void;
  canRemove: boolean;
}

const FIELD_TYPE_LABELS: Record<FormFieldType, string> = {
  text: "Short text",
  paragraph: "Paragraph",
  checkbox: "Checkboxes",
  radio: "Radio buttons",
};

const hasOptions = (type: FormFieldType) =>
  type === "checkbox" || type === "radio";

export function FormFieldCard({
  field,
  onChange,
  onRemove,
  canRemove,
}: FormFieldCardProps) {
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

  function handleTypeChange(type: FormFieldType) {
    const updated = { ...field, type };
    if (hasOptions(type) && updated.options.length === 0) {
      updated.options = ["Option 1"];
    }
    if (!hasOptions(type)) {
      updated.options = [];
    }
    onChange(updated);
  }

  function handleAddOption() {
    onChange({
      ...field,
      options: [...field.options, `Option ${field.options.length + 1}`],
    });
  }

  function handleOptionChange(index: number, value: string) {
    const next = [...field.options];
    next[index] = value;
    onChange({ ...field, options: next });
  }

  function handleRemoveOption(index: number) {
    if (field.options.length <= 1) return;
    onChange({
      ...field,
      options: field.options.filter((_, i) => i !== index),
    });
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`rounded-lg border p-4 space-y-3 bg-background ${isDragging ? "opacity-50 shadow-lg" : ""}`}
    >
      {/* Header: drag handle + title + type selector + remove */}
      <div className="flex items-start gap-2">
        <button
          type="button"
          className="mt-2 cursor-grab touch-none text-muted-foreground hover:text-foreground"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-5 w-5" />
        </button>

        <div className="flex-1 space-y-1.5">
          <Label className="text-xs">Question</Label>
          <Input
            placeholder="Enter your question..."
            value={field.title}
            onChange={(e) => onChange({ ...field, title: e.target.value })}
          />
        </div>

        <div className="space-y-1.5 w-40 shrink-0">
          <Label className="text-xs">Type</Label>
          <Select
            value={field.type}
            onValueChange={(val) => handleTypeChange(val as FormFieldType)}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {(Object.entries(FIELD_TYPE_LABELS) as [FormFieldType, string][]).map(
                ([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                )
              )}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-5 text-destructive hover:text-destructive"
          onClick={onRemove}
          disabled={!canRemove}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Options list (for checkbox / radio) */}
      {hasOptions(field.type) && (
        <div className="ml-7 space-y-2">
          <Label className="text-xs text-muted-foreground">Options</Label>
          {field.options.map((opt, i) => (
            <div key={i} className="flex items-center gap-2">
              {field.type === "radio" ? (
                <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/40 shrink-0" />
              ) : (
                <div className="h-4 w-4 rounded-[3px] border-2 border-muted-foreground/40 shrink-0" />
              )}
              <Input
                className="h-8 text-sm"
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                placeholder={`Option ${i + 1}`}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                onClick={() => handleRemoveOption(i)}
                disabled={field.options.length <= 1}
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={handleAddOption}
          >
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add option
          </Button>
        </div>
      )}

      {/* Required toggle */}
      <div className="ml-7 flex items-center gap-2">
        <Switch
          checked={field.required}
          onCheckedChange={(checked: boolean) =>
            onChange({ ...field, required: checked })
          }
        />
        <Label className="text-xs text-muted-foreground">Required</Label>
      </div>
    </div>
  );
}
