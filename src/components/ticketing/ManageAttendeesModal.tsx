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
import { ChevronDown, Search, X } from "lucide-react";
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

  const [searchQuery, setSearchQuery] = useState("");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  function toggleExpanded(id: string) {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (!next) {
          setSearchQuery("");
          setExpanded({});
        }
        onOpenChange(next);
      }}
    >
      <DialogContent className="w-[80vw] max-w-[80vw] h-[80vh] max-h-[80vh] flex flex-col overflow-hidden sm:max-w-[80vw]">
        <DialogHeader>
          <DialogTitle>{event.title}</DialogTitle>
          <DialogDescription>
            <span className="flex items-center gap-3 flex-wrap">
              <TicketedBadge sold={totalSold} total={totalAvailable} />
              <span className="text-sm font-medium">
                Total revenue: {"\u00A3"}{totalRevenue.toFixed(2)}
              </span>
            </span>
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-md border bg-background pl-9 pr-8 py-2 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-full p-0.5 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto space-y-2 pr-1">
          {ticketTypes.map((tt) => {
            const query = searchQuery.toLowerCase().trim();
            const allTypePurchases = purchases.filter(
              (p) => p.ticketTypeId === tt.id,
            );
            const filteredPurchases = query
              ? allTypePurchases.filter(
                  (p) =>
                    p.buyerName.toLowerCase().includes(query) ||
                    p.buyerEmail.toLowerCase().includes(query),
                )
              : allTypePurchases;

            if (query && filteredPurchases.length === 0) return null;

            const sold = allTypePurchases.length;
            const isOpen = query ? true : (expanded[tt.id] ?? false);

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
                      {"\u00A3"}{tt.price.toFixed(2)}
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
                    {filteredPurchases.length === 0 ? (
                      <p className="py-4 text-center text-sm text-muted-foreground">
                        {query
                          ? "No matching attendees."
                          : "No tickets sold yet for this category."}
                      </p>
                    ) : (
                      <div className="divide-y">
                        {filteredPurchases.map((p) => (
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
