"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle2, Info, AlertCircle, X } from "lucide-react";

export type ToastType = "success" | "info" | "warning";

export interface ToastItem {
  id: string;
  message: string;
  type?: ToastType;
}

interface ToastContextValue {
  showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((message: string, type: ToastType = "success") => {
    const id = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
    setToasts((prev) => [...prev, { id, message, type }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full px-4 sm:px-0"
      >
        {toasts.map((toast) => (
          <div
            key={toast.id}
            role="status"
            className="pointer-events-auto flex items-start gap-3 p-4 bg-white border border-ink/15 rounded-card shadow-floating text-ink transition-all animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            {toast.type === "success" && (
              <CheckCircle2 className="size-5 text-teal shrink-0 mt-0.5" />
            )}
            {toast.type === "info" && (
              <Info className="size-5 text-saffron shrink-0 mt-0.5" />
            )}
            {toast.type === "warning" && (
              <AlertCircle className="size-5 text-amber-600 shrink-0 mt-0.5" />
            )}
            <p className="text-sm font-medium leading-snug flex-1">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-ink/50 hover:text-ink shrink-0 p-1 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
              aria-label="Dismiss message"
            >
              <X className="size-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
}
