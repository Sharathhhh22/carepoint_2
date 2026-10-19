import React from "react";

export interface IconBadgeProps {
  children: React.ReactNode;
  variant?: "saffron" | "teal" | "maroon" | "marigold" | "cream";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function IconBadge({
  children,
  variant = "saffron",
  size = "md",
  className = "",
}: IconBadgeProps) {
  const sizeStyles = {
    sm: "size-8 [&>svg]:size-4",
    md: "size-10 [&>svg]:size-5",
    lg: "size-12 sm:size-14 [&>svg]:size-6 sm:[&>svg]:size-7",
  };

  const variantStyles = {
    saffron: "bg-saffron/15 text-ink border border-saffron/30",
    teal: "bg-teal/15 text-teal border border-teal/25",
    maroon: "bg-maroon/10 text-maroon border border-maroon/20",
    marigold: "bg-marigold/30 text-ink border border-marigold/50",
    cream: "bg-white text-ink border border-ink/10 shadow-sm",
  };

  return (
    <div
      aria-hidden="true"
      className={`inline-flex items-center justify-center shrink-0 rounded-DEFAULT select-none transition-colors duration-150 ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
