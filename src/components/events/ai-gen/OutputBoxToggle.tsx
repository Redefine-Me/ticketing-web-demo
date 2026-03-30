"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface OutputBoxToggleProps {
  visible: boolean;
  onClick: () => void;
}

export function OutputBoxToggle({ visible, onClick }: OutputBoxToggleProps) {
  return (
    <Button
      type="button"
      size="icon-sm"
      variant="outline"
      className="absolute right-2 top-20 z-30"
      aria-label={visible ? "Hide output panel" : "Show output panel"}
      onClick={onClick}
    >
      {visible ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
    </Button>
  );
}
