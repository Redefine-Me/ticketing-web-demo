"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TicketedBadge } from "./TicketedBadge";
import { AttendeeRow } from "./AttendeeRow";
import { ChevronDown } from "lucide-react";
import type { DashboardEvent } from "@/lib/supabase/types";

interface ManageAttendeesModalProps {
  event: DashboardEvent;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onMarkAttended: (purchaseId: string) => void;
  onUnmarkAttended: (purchaseId: string) => void;
  onRefund: (purchaseId: string) => void;
}

export function ManageAttendeesModal({
  event,
  open,
  onOpenChange,
  onMarkAttended,
  onUnmarkAttended,
  onRefund,
}: ManageAttendeesModalProps) {
  const ticketTypes = event.ticketTypes ?? [];
  const purchases = event.purchases ?? [];
  const totalSold = event.totalSold ?? 0;
  const totalAvailable = event.totalAvailable ?? 0;
  const totalRevenue = event.totalRevenue ?? 0;

  // Track expanded categories — first is expanded by default
  const [expanded, setExpanded] = useState<Record<string, boolean>>(() => {
    const init: Record<string, boolean> = {};
    ticketTypes.forEach((tt, i) => {
      init[tt.id] = i === 0;
    });
    return init;
  });

  function toggleExpanded(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[80vw] max-w-[80vw] h-[80vh] max-h-[80vh] flex flex-col overflow-hidden sm:max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            <span className="flex items-center gap-3 flex-wrap">
              <TicketedBadge sold={totalSold} total={totalAvailable} />
              <span className="text-sm font-medium">
                Total revenue: £{totalRevenue.toFixed(2)}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {ticketTypes.map((tt) => {
            const typePurchases = purchases.filter(
              (p) => p.ticketTypeId === tt.id,
            );
            const sold = typePurchases.length;
            const isOpen = expanded[tt.id] ?? false;

            return (
              <div key={tt.id} className="rounded-lg border">
                <Button
                  variant="ghost"
                  className="w-full justify-between px-4 py-3 h-auto"
                  onClick={() => toggleExpanded(tt.id)}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{tt.name}</span>
                    <TicketedBadge sold={sold} total={tt.totalAvailable} />
                    <span className="text-xs text-muted-foreground">
                      £{tt.price.toFixed(2)}
                    </span>
                  </div>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </Button>

                {isOpen && (
                  <div className="px-4 pb-3 border-t">
                    {typePurchases.length === 0 ? (
                      <p className="py-4 text-center text-sm text-muted-foreground">
                        No tickets sold yet for this category.
                      </p>
                    ) : (
                      <div className="divide-y">
                        {typePurchases.map((p) => (
                          <AttendeeRow
                            key={p.id}
                            purchase={p}
                            ticketTypeName={tt.name}
                            onMarkAttended={onMarkAttended}
                            onUnmarkAttended={onUnmarkAttended}
                            onRefund={onRefund}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
