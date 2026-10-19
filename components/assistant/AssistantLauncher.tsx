"use client";

import React, { useState, useRef } from "react";
import { Bot } from "lucide-react";
import { AssistantPanel } from "./AssistantPanel";

interface AssistantLauncherProps {
  onApplySpecialityFilter?: (speciality: string) => void;
}

export function AssistantLauncher({
  onApplySpecialityFilter,
}: AssistantLauncherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <button
        ref={triggerRef}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Open CarePoint demo assistant panel"
        aria-expanded={isOpen}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-50 flex items-center gap-2.5 px-4 py-3 bg-saffron text-ink font-bold text-sm rounded-full shadow-floating hover:bg-saffron-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-saffron active:scale-95 transition-all select-none border border-saffron-hover"
      >
        <Bot className="size-5 shrink-0" />
        <span className="hidden sm:inline">Demo Assistant</span>
        <span className="sm:hidden">Help</span>
      </button>

      <AssistantPanel
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        onApplySpecialityFilter={onApplySpecialityFilter}
      />
    </>
  );
}
