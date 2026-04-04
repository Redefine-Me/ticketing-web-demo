"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

const MAX_CHARS = 500;

export function MessageInput({ onSend }: { onSend: (message: string) => void }) {
  const [value, setValue] = useState("");

  function handleSend() {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setValue("");
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  return (
    <div className="flex items-center gap-2">
      <div className="relative flex-1">
        <Input
          placeholder="Type a message..."
          value={value}
          onChange={(e) => setValue(e.target.value.slice(0, MAX_CHARS))}
          onKeyDown={handleKeyDown}
        />
        {value.length >= 400 && (
          <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
            {value.length}/{MAX_CHARS}
          </span>
        )}
      </div>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        disabled={!value.trim()}
        onClick={handleSend}
      >
        <Send className="h-4 w-4" />
      </Button>
    </div>
  );
}
