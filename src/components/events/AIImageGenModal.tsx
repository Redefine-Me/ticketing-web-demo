"use client";

import { useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { useImageGeneration } from "@/hooks/useImageGeneration";
import type { Category, SocietyRow } from "@/supabase_lib/types";
import type { EventImage } from "@/lib/types/image-generation";
import { AutoContext } from "@/components/events/ai-gen/AutoContext";
import { Controls } from "@/components/events/ai-gen/Controls";
import { PastEventsScroll } from "@/components/events/ai-gen/PastEventsScroll";
import { InfluenceGrid } from "@/components/events/ai-gen/InfluenceGrid";
import { GeneratedOutputGrid } from "@/components/events/ai-gen/GeneratedOutputGrid";
import { GenerateButton } from "@/components/events/ai-gen/GenerateButton";
import { OutputBox } from "@/components/events/ai-gen/OutputBox";
import { OutputBoxToggle } from "@/components/events/ai-gen/OutputBoxToggle";
import { DoneWarningDialog } from "@/components/events/ai-gen/DoneWarningDialog";

interface EventFormSnapshot {
  title?: string;
  description?: string;
  categoryIds?: string[];
  schedules?: Array<{
    date?: string;
    startTime?: string;
    endTime?: string;
    buildingName?: string;
    roomName?: string;
  }>;
  isOnline?: boolean;
  isFree?: boolean;
  price?: string;
}

interface AIImageGenModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialImages: EventImage[];
  formData: EventFormSnapshot;
  categories: Category[];
  society: SocietyRow | null;
  onDone: (images: EventImage[]) => void;
}

export function AIImageGenModal({
  open,
  onOpenChange,
  initialImages,
  formData,
  categories,
  society,
  onDone,
}: AIImageGenModalProps) {
  const state = useImageGeneration({
    initialOutputImages: initialImages,
    formData,
    categories,
    society,
  });

  const canGenerate = useMemo(() => {
    return state.controls.creativeDirection.trim().length > 0;
  }, [state.controls.creativeDirection]);

  useEffect(() => {
    if (!state.statusMessage) return;
    toast.error(state.statusMessage);
  }, [state.statusMessage]);

  function handleDone() {
    if (state.outputImages.length === 0) {
      state.setShowEmptyConfirm(true);
      return;
    }

    onDone(state.outputImages);
    onOpenChange(false);
  }

  return (
    <>
      <Dialog
        open={open}
        onOpenChange={(nextOpen) => {
          if (!nextOpen) {
            state.stopGeneration();
          }
          onOpenChange(nextOpen);
        }}
      >
        <DialogContent
          showCloseButton={false}
          className="h-[92vh] max-w-[96vw] overflow-hidden p-0 sm:max-w-[96vw]"
        >
          <div className="relative flex h-full flex-col">
            <header className="sticky top-0 z-20 flex items-center justify-between border-b bg-card px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-dashboard-cta" />
                <h2 className="text-sm font-semibold">AI Image Generator</h2>
              </div>
              <Button type="button" size="icon-sm" variant="ghost" onClick={() => onOpenChange(false)}>
                <X className="h-4 w-4" />
              </Button>
            </header>

            <div className="relative min-h-0 flex-1 overflow-hidden">
              <OutputBoxToggle
                visible={state.isOutputPanelVisible}
                onClick={() => state.setIsOutputPanelVisible(state.isOutputPanelVisible ? false : true)}
              />

              <div className="flex h-full">
                <div className="min-h-0 flex-1 overflow-y-auto">
                  <div className="space-y-6 p-4">
                    <Controls
                      creativeDirection={state.controls.creativeDirection}
                      imageDescription={state.controls.imageDescription}
                      styleInfluence={state.controls.styleInfluence}
                      aspectRatio={state.controls.aspectRatio}
                      variantCount={state.controls.variantCount}
                      referenceImages={state.controls.referenceImages}
                      onCreativeDirectionChange={state.setCreativeDirection}
                      onImageDescriptionChange={state.setImageDescription}
                      onStyleInfluenceChange={state.setStyleInfluence}
                      onAspectRatioChange={state.setAspectRatio}
                      onVariantCountChange={state.setVariantCount}
                      onAddReferenceImages={state.addReferenceImages}
                      onRemoveReferenceImage={state.removeReferenceImage}
                    />

                    <AutoContext context={state.autoContext} />

                    <PastEventsScroll
                      events={state.eventsForScroll}
                      selectedEventIds={state.selectedEventIds}
                      onToggle={state.toggleEventSelection}
                    />

                    <InfluenceGrid images={state.selectedInfluenceImages} onRemove={state.removeInfluenceImage} />

                    <GeneratedOutputGrid
                      generatedImages={state.generatedImages}
                      selectedGeneratedIds={state.selectedGeneratedIds}
                      generationPhase={state.generationPhase}
                      generationStep={state.generationStep}
                      variantCount={state.controls.variantCount}
                      aspectRatio={state.controls.aspectRatio}
                      onSelect={state.addGeneratedToOutput}
                      onRegenerateHint={() => toast.info("Coming soon")}
                    />
                  </div>

                  <GenerateButton
                    disabled={!canGenerate || state.generationPhase === "generating"}
                    variantCount={state.controls.variantCount}
                    onClick={state.startGeneration}
                  />
                </div>

                <motion.div
                  animate={{ width: state.isOutputPanelVisible ? 300 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="h-full overflow-hidden"
                >
                  <OutputBox
                    images={state.outputImages}
                    onRemove={state.removeOutputImage}
                    onReorder={state.reorderOutputImages}
                    onDone={handleDone}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <DoneWarningDialog
        open={state.showEmptyConfirm}
        onCancel={() => state.setShowEmptyConfirm(false)}
        onConfirm={() => {
          state.setShowEmptyConfirm(false);
          onDone([]);
          onOpenChange(false);
        }}
      />

      {state.statusMessage ? (
        <div className="sr-only" aria-live="polite">
          {state.statusMessage}
        </div>
      ) : null}
    </>
  );
}
