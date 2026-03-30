"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface DoneWarningDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DoneWarningDialog({ open, onCancel, onConfirm }: DoneWarningDialogProps) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => {
      if (!nextOpen) onCancel();
    }}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>No images selected</DialogTitle>
          <DialogDescription>No images selected. Are you sure?</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="button" className="bg-dashboard-cta text-white hover:bg-dashboard-cta/90" onClick={onConfirm}>
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
