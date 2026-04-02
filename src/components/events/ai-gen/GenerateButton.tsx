"use client";

import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface GenerateButtonProps {
  disabled: boolean;
  variantCount: number;
  onClick: () => void;
}

export function GenerateButton({ disabled, variantCount, onClick }: GenerateButtonProps) {
  return (
    <div className="sticky bottom-0 z-20 border-t bg-card p-2">
      <Button type="button" size="sm" className="w-full bg-dashboard-cta text-white hover:bg-dashboard-cta/90" onClick={onClick} disabled={disabled}>
        <Sparkles className="h-3.5 w-3.5" />
        Generate {variantCount} image{variantCount === 1 ? "" : "s"}
      </Button>
    </div>
  );
}
