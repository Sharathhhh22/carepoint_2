import React, { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    // Base styles: minimum 44px height (min-h-11) for WCAG 2.2 touch target compliance
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-150 rounded-DEFAULT focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none active:scale-[0.98]";

    const variantStyles = {
      // Primary: Saffron background with high-contrast Ink text (6.4:1 contrast ratio)
      primary:
        "bg-saffron text-ink font-semibold shadow-button hover:bg-saffron-hover hover:text-ink focus-visible:ring-saffron",
      // Secondary: Deep Maroon background with crisp white text (10.8:1 contrast ratio)
      secondary:
        "bg-maroon text-white font-semibold shadow-md hover:bg-maroon-hover focus-visible:ring-maroon",
      // Outline: High-contrast border and ink text
      outline:
        "border-2 border-saffron text-ink font-semibold bg-cream/50 hover:bg-saffron/15 focus-visible:ring-saffron",
      // Ghost: Transparent with subtle hover
      ghost:
        "text-ink font-medium bg-transparent hover:bg-ink/5 focus-visible:ring-ink",
    };

    const sizeStyles = {
      sm: "min-h-11 px-3 py-2 text-sm gap-2",
      md: "min-h-11 px-5 py-2.5 text-base gap-2.5",
      lg: "min-h-12 px-7 py-3 text-lg gap-3",
    };

    const widthStyle = fullWidth ? "w-full" : "w-auto";

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`}
        {...props}
      >
        {leftIcon && (
          <span className="inline-flex shrink-0 [&>svg]:size-5">
            {leftIcon}
          </span>
        )}
        <span>{children}</span>
        {rightIcon && (
          <span className="inline-flex shrink-0 [&>svg]:size-5">
            {rightIcon}
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";
