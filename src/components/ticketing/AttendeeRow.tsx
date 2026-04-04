"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefundDialog } from "./RefundDialog";
import type { TicketPurchase } from "@/lib/supabase/types";

interface AttendeeRowProps {
  purchase: TicketPurchase;
  ticketTypeName: string;
  onMarkAttended: (purchaseId: string) => void;
  onUnmarkAttended: (purchaseId: string) => void;
  onRefund: (purchaseId: string) => void;
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function AttendeeRow({
  purchase,
  ticketTypeName,
  onMarkAttended,
  onUnmarkAttended,
  onRefund,
}: AttendeeRowProps) {
  const [refundOpen, setRefundOpen] = useState(false);
  const attended = purchase.attendedAt !== null;

  return (
    <>
      <div className="flex items-center justify-between py-2.5 px-1">
        <div className="min-w-0">
          <p className="text-sm font-medium truncate">{purchase.buyerName}</p>
          <p className="text-xs text-muted-foreground truncate">
            {purchase.buyerEmail}
          </p>
          <p className="text-xs text-muted-foreground">
            Purchased {formatDateTime(purchase.purchasedAt)}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-3">
          {attended ? (
            <>
              <span className="text-xs text-emerald-600">
                Checked in at {formatTime(purchase.attendedAt!)}
              </span>
              <Button
                variant="outline"
                size="sm"
                className="text-xs"
                onClick={() => onUnmarkAttended(purchase.id)}
              >
                Unattend
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                onClick={() => onMarkAttended(purchase.id)}
              >
                Attend
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="text-xs border-red-200 text-red-700 hover:bg-red-50"
                onClick={() => setRefundOpen(true)}
              >
                Refund
              </Button>
            </>
          )}
        </div>
      </div>

      <RefundDialog
        open={refundOpen}
        onOpenChange={setRefundOpen}
        buyerName={purchase.buyerName}
        ticketTypeName={ticketTypeName}
        onConfirm={() => onRefund(purchase.id)}
      />
    </>
  );
}
