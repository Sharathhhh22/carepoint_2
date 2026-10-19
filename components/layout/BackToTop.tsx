"use client";

import React, { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!visible) return null;

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top of page"
      className="fixed bottom-20 right-6 sm:bottom-24 sm:right-8 z-40 p-3 bg-white border border-ink/15 text-maroon hover:text-ink hover:bg-saffron/20 rounded-full shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-all duration-200 active:scale-95 animate-in fade-in zoom-in-90"
    >
      <ArrowUp className="size-5 shrink-0" />
    </button>
  );
}
