"use client";

import React, { useEffect, useRef } from "react";
import { X, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";

interface LoginDemoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export function LoginDemoDialog({
  isOpen,
  onClose,
  triggerRef,
}: LoginDemoDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [isOpen]);

  const handleClose = () => {
    onClose();
    if (triggerRef?.current) {
      triggerRef.current.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      handleClose();
    }
  };

  const handleDemoLogin = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Demo sign-in recorded! No credentials were stored or transmitted.", "info");
    handleClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      className="m-auto rounded-card bg-white p-0 shadow-floating border border-ink/15 max-w-md w-full backdrop:bg-black/60"
      aria-labelledby="login-dialog-title"
      aria-describedby="login-dialog-desc"
    >
      <div className="p-6 sm:p-8">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-2">
            <div className="size-10 rounded-DEFAULT bg-maroon/10 text-maroon flex items-center justify-center shrink-0">
              <Lock className="size-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 id="login-dialog-title" className="text-xl font-bold text-maroon">
                  CarePoint Sign In
                </h3>
                <Badge variant="sample">DEMO</Badge>
              </div>
              <p id="login-dialog-desc" className="text-xs text-ink/70 mt-0.5">
                Front-end simulation only. No real authentication.
              </p>
            </div>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close demo sign in"
            className="p-1.5 text-ink/50 hover:text-ink hover:bg-black/5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* Demo Callout */}
        <div className="mb-6 p-3.5 bg-amber-50 border border-amber-200 rounded-DEFAULT flex items-start gap-3 text-amber-900 text-xs leading-relaxed">
          <ShieldAlert className="size-4 shrink-0 text-amber-700 mt-0.5" />
          <span>
            <strong>Demonstration notice:</strong> CarePoint does not connect to any authentication backend or database. You can test this form with fictional inputs.
          </span>
        </div>

        {/* Form */}
        <form onSubmit={handleDemoLogin} className="space-y-4">
          <div>
            <label
              htmlFor="demo-mobile"
              className="block text-sm font-medium text-ink mb-1.5"
            >
              Mobile Number (Demo)
            </label>
            <input
              id="demo-mobile"
              type="tel"
              defaultValue="+91 555 019 2831"
              required
              className="w-full px-4 py-2.5 rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron text-sm bg-cream/30 text-ink"
            />
          </div>

          <div>
            <label
              htmlFor="demo-otp"
              className="block text-sm font-medium text-ink mb-1.5"
            >
              One-Time Password (OTP)
            </label>
            <input
              id="demo-otp"
              type="text"
              placeholder="e.g. 123456"
              defaultValue="555000"
              required
              className="w-full px-4 py-2.5 rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron text-sm bg-cream/30 text-ink"
            />
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="md">
              Sign In (DEMO)
            </Button>
          </div>
        </form>
      </div>
    </dialog>
  );
}
