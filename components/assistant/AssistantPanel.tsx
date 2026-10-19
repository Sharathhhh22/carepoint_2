"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Send,
  Bot,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
} from "lucide-react";
import {
  getAssistantReply,
  assistantSuggestionChips,
  AssistantReplyResult,
} from "@/lib/data/assistant-replies";
import { Button } from "@/components/ui/Button";

interface AssistantMessage {
  id: string;
  sender: "user" | "assistant";
  text: string;
  isEmergency?: boolean;
  action?: AssistantReplyResult["action"];
  timestamp: string;
}

interface AssistantPanelProps {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLButtonElement | null>;
  onApplySpecialityFilter?: (speciality: string) => void;
}

export function AssistantPanel({
  isOpen,
  onClose,
  triggerRef,
  onApplySpecialityFilter,
}: AssistantPanelProps) {
  const [messages, setMessages] = useState<AssistantMessage[]>([
    {
      id: "initial-welcome",
      sender: "assistant",
      text: "Namaste! I am the CarePoint demo assistant. I can help you understand sample consultation fee ranges in ₹, guide you to the right specialty for your symptoms, or explain our cashless insurance demo tags.",
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  // Auto-scroll to bottom of message list
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Keyboard trap and Escape closure
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        triggerRef?.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, triggerRef]);

  if (!isOpen) return null;

  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query) return;

    const userMsg: AssistantMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: "Just now",
    };

    const reply = getAssistantReply(query);

    const botMsg: AssistantMessage = {
      id: `bot-${Date.now()}`,
      sender: "assistant",
      text: reply.text,
      isEmergency: reply.isEmergency,
      action: reply.action,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputValue("");
  };

  const handleActionClick = (action?: AssistantReplyResult["action"]) => {
    if (!action) return;
    if (action.specialitySlug && onApplySpecialityFilter) {
      onApplySpecialityFilter(action.specialitySlug);
    }
    if (action.sectionHref) {
      const el = document.querySelector(action.sectionHref);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="CarePoint Demo Assistant"
      ref={panelRef}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[640px] h-[85vh] bg-white rounded-card shadow-floating border border-ink/20 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-200"
    >
      {/* Panel Header */}
      <div className="p-4 bg-maroon text-white flex items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-saffron text-ink flex items-center justify-center shrink-0">
            <Bot className="size-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold leading-tight">
              Demo assistant (sample replies only)
            </h2>
            <span className="text-[10px] text-cream/70 uppercase tracking-wider block">
              Keyword-driven preview
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            onClose();
            triggerRef?.current?.focus();
          }}
          aria-label="Close assistant"
          className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Mandatory Hard Rule Banner */}
      <div className="p-3 bg-amber-50 border-b border-amber-200 text-amber-900 text-xs flex items-start gap-2.5">
        <ShieldAlert className="size-4 shrink-0 text-amber-700 mt-0.5" />
        <span className="leading-snug">
          <strong>Not medical advice.</strong> This preview does not connect to any AI service.
        </span>
      </div>

      {/* Message List with aria-live="polite" */}
      <div
        className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-cream/30 text-xs sm:text-sm"
        aria-live="polite"
        aria-relevant="additions text"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.sender === "user" ? "items-end" : "items-start"
            }`}
          >
            <div
              className={`max-w-[85%] rounded-DEFAULT p-3.5 ${
                msg.sender === "user"
                  ? "bg-maroon text-white rounded-tr-none font-medium shadow-sm"
                  : msg.isEmergency
                  ? "bg-red-50 text-red-950 border-2 border-red-500 rounded-tl-none font-semibold shadow-md"
                  : "bg-white text-ink border border-ink/15 rounded-tl-none shadow-sm"
              }`}
            >
              {msg.isEmergency && (
                <div className="flex items-center gap-1.5 text-red-700 font-bold mb-1.5 text-xs">
                  <AlertTriangle className="size-4 shrink-0" />
                  <span>CRITICAL EMERGENCY NOTICE</span>
                </div>
              )}
              <p className="leading-relaxed whitespace-pre-line">{msg.text}</p>

              {msg.action && (
                <button
                  type="button"
                  onClick={() => handleActionClick(msg.action)}
                  className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-teal hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-saffron pt-1 border-t border-ink/10 w-full"
                >
                  <span>{msg.action.label}</span>
                  <ArrowRight className="size-3.5" />
                </button>
              )}
            </div>
            <span className="text-[10px] text-ink/50 mt-1 px-1">
              {msg.timestamp}
            </span>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="p-3 bg-white border-t border-ink/10">
        <span className="text-[11px] font-semibold text-ink/60 uppercase tracking-wider block mb-2">
          Suggested Questions:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {assistantSuggestionChips.map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => handleSendMessage(chip)}
              className="text-xs px-2.5 py-1.5 rounded-full bg-cream text-ink border border-ink/15 hover:bg-saffron/15 hover:border-saffron focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>
      </div>

      {/* Input Field */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="p-3 bg-cream/40 border-t border-ink/15 flex items-center gap-2"
      >
        <label htmlFor="assistant-input-box" className="sr-only">
          Ask demo assistant
        </label>
        <input
          id="assistant-input-box"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask about fees, specialities, or doctors..."
          className="flex-1 px-3.5 py-2.5 text-xs sm:text-sm bg-white rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron text-ink"
        />
        <Button
          type="submit"
          variant="primary"
          size="sm"
          className="p-2.5 min-h-[40px] shrink-0"
          aria-label="Send message to demo assistant"
        >
          <Send className="size-4" />
        </Button>
      </form>
    </div>
  );
}
