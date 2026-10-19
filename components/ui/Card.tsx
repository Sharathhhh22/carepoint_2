import React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
  hoverable?: boolean;
}

export function Card({
  children,
  className = "",
  as: Component = "div",
  hoverable = false,
  ...props
}: CardProps) {
  const hoverStyles = hoverable
    ? "transition-all duration-200 hover:-translate-y-1 hover:shadow-floating"
    : "";

  return (
    <Component
      className={`h-full flex flex-col bg-white rounded-card shadow-card border border-ink/10 overflow-hidden ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
}

export function CardHeader({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 sm:p-6 pb-2 ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardContent({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-5 sm:p-6 flex-1 flex flex-col ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({
  children,
  className = "",
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`p-5 sm:p-6 pt-3 border-t border-ink/5 mt-auto flex items-center justify-between gap-3 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
