"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  TicketTypeCard,
  type TicketTypeFormData,
  type SaleWindowClipboard,
} from "./TicketTypeCard";
import { TicketTotalCounter } from "./TicketTotalCounter";
import type { TicketPurchase } from "@/lib/supabase/types";

interface TicketConfigPanelProps {
  open: boolean;
  ticketTypes: TicketTypeFormData[];
  onChange: (ticketTypes: TicketTypeFormData[]) => void;
  purchases?: TicketPurchase[];
  errors?: Record<
    number,
    {
      name?: string;
      price?: string;
      totalAvailable?: string;
      salesStartAt?: string;
      salesEndAt?: string;
    }
  >;
  globalError?: string;
}

export function TicketConfigPanel({
  open,
  ticketTypes,
  onChange,
  purchases = [],
  errors,
  globalError,
}: TicketConfigPanelProps) {
  const [clipboard, setClipboard] = useState<SaleWindowClipboard>({
    salesStartAt: null,
    salesEndAt: null,
  });

  function soldFor(ticketType: TicketTypeFormData) {
    if (!ticketType.id) return 0;
    return purchases.filter((p) => p.ticketTypeId === ticketType.id).length;
  }

  function handleAdd() {
    const previous = ticketTypes[ticketTypes.length - 1];
    onChange([
      ...ticketTypes,
      {
        name: "",
        price: 0,
        isMemberTicket: false,
        totalAvailable: 0,
        salesStartAt: previous?.salesStartAt ?? "",
        salesEndAt: previous?.salesEndAt ?? "",
      },
    ]);
  }

  function handleChange(index: number, value: TicketTypeFormData) {
    const next = [...ticketTypes];
    next[index] = value;
    onChange(next);
  }

  function handleRemove(index: number) {
    if (ticketTypes.length <= 1) return;
    onChange(ticketTypes.filter((_, i) => i !== index));
  }

  function handleCopyWindow(
    field: "salesStartAt" | "salesEndAt",
    value: string,
  ) {
    setClipboard((prev) => ({ ...prev, [field]: value }));
  }

  function handlePasteWindow(
    targetIndex: number,
    field: "salesStartAt" | "salesEndAt",
  ) {
    const copied = clipboard[field];
    if (copied === null || copied === "") return;
    onChange(
      ticketTypes.map((tt, i) =>
        i === targetIndex ? { ...tt, [field]: copied } : tt,
      ),
    );
  }

  const total = ticketTypes.reduce((sum, t) => sum + (t.totalAvailable || 0), 0);

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
            {ticketTypes.map((tt, i) => (
              <TicketTypeCard
                key={tt.id ?? i}
                value={tt}
                onChange={(v) => handleChange(i, v)}
                onRemove={() => handleRemove(i)}
                soldCount={soldFor(tt)}
                errors={errors?.[i]}
                clipboard={ticketTypes.length > 1 ? clipboard : undefined}
                onCopyWindow={
                  ticketTypes.length > 1 ? handleCopyWindow : undefined
                }
                onPasteWindow={
                  ticketTypes.length > 1
                    ? (field) => handlePasteWindow(i, field)
                    : undefined
                }
              />
            ))}

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              onClick={handleAdd}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Ticket Type
            </Button>

            <TicketTotalCounter total={total} />

            {globalError && (
              <p className="text-sm text-destructive">{globalError}</p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
