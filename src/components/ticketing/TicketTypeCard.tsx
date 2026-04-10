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
import { Trash2, Lock, Copy, ClipboardPaste } from "lucide-react";

export interface TicketTypeFormData {
  id?: string;
  name: string;
  price: number;
  isMemberTicket: boolean;
  totalAvailable: number;
  salesStartAt: string;
  salesEndAt: string;
}

export interface SaleWindowClipboard {
  salesStartAt: string | null;
  salesEndAt: string | null;
}

interface TicketTypeCardProps {
  value: TicketTypeFormData;
  onChange: (value: TicketTypeFormData) => void;
  onRemove: () => void;
  soldCount: number;
  clipboard?: SaleWindowClipboard;
  onCopyWindow?: (field: "salesStartAt" | "salesEndAt", value: string) => void;
  onPasteWindow?: (field: "salesStartAt" | "salesEndAt") => void;
  errors?: {
    name?: string;
    price?: string;
    totalAvailable?: string;
    salesStartAt?: string;
    salesEndAt?: string;
  };
}

const LOCK_TOOLTIP = "This ticket type has sold tickets. Refund all holders to edit.";
const REMOVE_TOOLTIP = "Cannot remove a ticket type with sold tickets. Refund all holders first.";

function LockIcon() {
  return <Lock className="h-3 w-3 text-muted-foreground ml-1 inline" />;
}

interface SaleWindowFieldProps {
  field: "salesStartAt" | "salesEndAt";
  label: string;
  value: string;
  locked: boolean;
  error?: string;
  clipboardValue: string | null;
  onChange: (next: string) => void;
  onCopy?: (field: "salesStartAt" | "salesEndAt", value: string) => void;
  onPaste?: (field: "salesStartAt" | "salesEndAt") => void;
}

function SaleWindowField({
  field,
  label,
  value,
  locked,
  error,
  clipboardValue,
  onChange,
  onCopy,
  onPaste,
}: SaleWindowFieldProps) {
  const showActions = onCopy !== undefined && onPaste !== undefined;
  const canCopy = !locked && value !== "";
  const canPaste = !locked && clipboardValue !== null && clipboardValue !== "";
  const lowerLabel = label.toLowerCase();

  return (
    <div className="space-y-1.5">
      <Label className="text-xs">
        {label}
        {locked && (
          <Tooltip>
            <TooltipTrigger><LockIcon /></TooltipTrigger>
            <TooltipContent>{LOCK_TOOLTIP}</TooltipContent>
          </Tooltip>
        )}
      </Label>
      <div className="flex items-center gap-1">
        <Input
          type="datetime-local"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={locked}
          className="flex-1 min-w-0"
        />
        {showActions && (
          <>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={!canCopy}
                    onClick={() => {
                      if (canCopy && onCopy) onCopy(field, value);
                    }}
                  />
                }
              >
                <Copy className="h-3.5 w-3.5" />
              </TooltipTrigger>
              <TooltipContent>
                {canCopy
                  ? `Copy ${lowerLabel} date to share with other tiers`
                  : `Enter a ${lowerLabel} date to copy it`}
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger
                render={
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-sm"
                    disabled={!canPaste}
                    onClick={() => {
                      if (canPaste && onPaste) onPaste(field);
                    }}
                  />
                }
              >
                <ClipboardPaste className="h-3.5 w-3.5" />
              </TooltipTrigger>
              <TooltipContent>
                {canPaste
                  ? `Paste copied ${lowerLabel} date here`
                  : `Copy a ${lowerLabel} date from another tier first`}
              </TooltipContent>
            </Tooltip>
          </>
        )}
      </div>
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function TicketTypeCard({
  value,
  onChange,
  onRemove,
  soldCount,
  clipboard,
  onCopyWindow,
  onPasteWindow,
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

      <div className="space-y-1.5">
        <Label className="text-xs">Sale window</Label>
        <p className="text-[10px] text-muted-foreground">
          When students can buy this tier.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <SaleWindowField
            field="salesStartAt"
            label="Sales open"
            value={value.salesStartAt}
            locked={locked}
            error={errors?.salesStartAt}
            clipboardValue={clipboard?.salesStartAt ?? null}
            onChange={(next) => onChange({ ...value, salesStartAt: next })}
            onCopy={onCopyWindow}
            onPaste={onPasteWindow}
          />
          <SaleWindowField
            field="salesEndAt"
            label="Sales close"
            value={value.salesEndAt}
            locked={locked}
            error={errors?.salesEndAt}
            clipboardValue={clipboard?.salesEndAt ?? null}
            onChange={(next) => onChange({ ...value, salesEndAt: next })}
            onCopy={onCopyWindow}
            onPaste={onPasteWindow}
          />
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
