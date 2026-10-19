"use client";

import React from "react";
import { Search, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface MobileStickyBarProps {
  onFindCareClick: () => void;
  onBookClick: () => void;
}

export function MobileStickyBar({
  onFindCareClick,
  onBookClick,
}: MobileStickyBarProps) {
  return (
    <nav
      aria-label="Mobile quick actions"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-ink/15 p-2.5 px-3.5 shadow-floating flex items-center justify-between gap-3"
    >
      <Button
        variant="outline"
        size="sm"
        onClick={onFindCareClick}
        leftIcon={<Search className="size-4 text-teal" />}
        className="flex-1 text-xs font-bold py-2.5"
      >
        Find Care
      </Button>

      <Button
        variant="primary"
        size="sm"
        onClick={onBookClick}
        leftIcon={<CalendarCheck className="size-4" />}
        className="flex-1 text-xs font-bold py-2.5"
      >
        Book (DEMO)
      </Button>
    </nav>
  );
}
