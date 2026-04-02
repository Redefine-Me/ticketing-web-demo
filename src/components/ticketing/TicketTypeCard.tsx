"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";
import { TicketNameAutosuggest } from "./TicketNameAutosuggest";
import { Trash2, Lock } from "lucide-react";

export interface TicketTypeFormData {
  id?: string;
  name: string;
  price: number;
  isMemberTicket: boolean;
  totalAvailable: number;
}

interface TicketTypeCardProps {
  value: TicketTypeFormData;
  onChange: (value: TicketTypeFormData) => void;
  onRemove: () => void;
  soldCount: number;
  errors?: {
    name?: string;
    price?: string;
    totalAvailable?: string;
  };
}

const LOCK_TOOLTIP = "This ticket type has sold tickets. Refund all holders to edit.";
const REMOVE_TOOLTIP = "Cannot remove a ticket type with sold tickets. Refund all holders first.";

function LockIcon() {
  return <Lock className="h-3 w-3 text-muted-foreground ml-1 inline" />;
}

export function TicketTypeCard({
  value,
  onChange,
  onRemove,
  soldCount,
  errors,
}: TicketTypeCardProps) {
  const locked = soldCount > 0;

  return (
    <div className="rounded-lg border p-4 space-y-3 bg-background">
      <div className="flex items-start justify-between gap-2">
        {/* Ticket name */}
        <div className="flex-1 space-y-1.5">
          <Label className="text-xs">
            Ticket name
            {locked && (
              <Tooltip>
                <TooltipTrigger><LockIcon /></TooltipTrigger>
                <TooltipContent>{LOCK_TOOLTIP}</TooltipContent>
              </Tooltip>
            )}
          </Label>
          <TicketNameAutosuggest
            value={value.name}
            onChange={(name) => onChange({ ...value, name })}
            disabled={locked}
          />
          {errors?.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>

        {/* Remove button */}
        {locked ? (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  disabled
                  className="mt-5"
                />
              }
            >
              <Trash2 className="h-4 w-4" />
            </TooltipTrigger>
            <TooltipContent>{REMOVE_TOOLTIP}</TooltipContent>
          </Tooltip>
        ) : (
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            className="mt-5 text-destructive hover:text-destructive"
            onClick={onRemove}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        {/* Price */}
        <div className="space-y-1.5">
          <Label className="text-xs">
            Price (£)
            {locked && (
              <Tooltip>
                <TooltipTrigger><LockIcon /></TooltipTrigger>
                <TooltipContent>{LOCK_TOOLTIP}</TooltipContent>
              </Tooltip>
            )}
          </Label>
          <Input
            type="number"
            min={0}
            step={1}
            placeholder="0.00"
            value={value.price || ""}
            onChange={(e) =>
              onChange({ ...value, price: parseFloat(e.target.value) || 0 })
            }
            disabled={locked}
          />
          {errors?.price && (
            <p className="text-xs text-destructive">{errors.price}</p>
          )}
        </div>

        {/* Total available */}
        <div className="space-y-1.5">
          <Label className="text-xs">Total available</Label>
          <Input
            type="number"
            min={1}
            step={1}
            placeholder="0"
            value={value.totalAvailable || ""}
            onChange={(e) =>
              onChange({
                ...value,
                totalAvailable: parseInt(e.target.value) || 0,
              })
            }
          />
          {errors?.totalAvailable && (
            <p className="text-xs text-destructive">{errors.totalAvailable}</p>
          )}
        </div>

        {/* Member ticket toggle */}
        <div className="space-y-1.5">
          <Label className="text-xs">
            Member
            {locked && (
              <Tooltip>
                <TooltipTrigger><LockIcon /></TooltipTrigger>
                <TooltipContent>{LOCK_TOOLTIP}</TooltipContent>
              </Tooltip>
            )}
          </Label>
          <div className="flex h-9 items-center">
            <Switch
              size="sm"
              checked={value.isMemberTicket}
              onCheckedChange={(checked) =>
                onChange({ ...value, isMemberTicket: Boolean(checked) })
              }
              disabled={locked}
            />
          </div>
        </div>
      </div>

      {locked && (
        <p className="text-[10px] text-muted-foreground">
          {soldCount} ticket{soldCount !== 1 ? "s" : ""} sold
        </p>
      )}
    </div>
  );
}
