import React from "react";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "teal" | "maroon" | "marigold" | "outline" | "sample";
  size?: "sm" | "md";
  icon?: React.ReactNode;
}

export function Badge({
  children,
  className = "",
  variant = "default",
  size = "md",
  icon,
  ...props
}: BadgeProps) {
  const baseStyles =
    "inline-flex items-center font-medium rounded-full tracking-wide select-none";

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5 gap-1",
    md: "text-xs sm:text-sm px-3 py-1 gap-1.5",
  };

  const variantStyles = {
    default: "bg-saffron/15 text-ink border border-saffron/30",
    teal: "bg-teal/15 text-teal font-semibold border border-teal/30",
    maroon: "bg-maroon/10 text-maroon font-semibold border border-maroon/20",
    marigold: "bg-marigold/30 text-ink font-semibold border border-marigold/60",
    outline: "bg-transparent text-ink border border-ink/20",
    sample:
      "bg-amber-100 text-amber-900 border border-amber-300 font-semibold uppercase text-[10px] tracking-wider",
  };

  return (
    <span
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {icon && (
        <span className="inline-flex shrink-0 [&>svg]:size-3.5 sm:[&>svg]:size-4">
          {icon}
        </span>
      )}
      <span>{children}</span>
    </span>
  );
}
