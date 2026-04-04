"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface RefundDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  buyerName: string;
  ticketTypeName: string;
  onConfirm: () => void;
}

export function RefundDialog({
  open,
  onOpenChange,
  buyerName,
  ticketTypeName,
  onConfirm,
}: RefundDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Refund ticket</DialogTitle>
          <DialogDescription>
            You are refunding <strong>{buyerName}</strong>&apos;s{" "}
            <strong>{ticketTypeName}</strong> ticket.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
          >
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
