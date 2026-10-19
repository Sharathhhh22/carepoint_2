import React from "react";

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Skeleton({ className = "", ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={`animate-pulse bg-ink/10 rounded-DEFAULT ${className}`}
      {...props}
    />
  );
}

export function FacilityCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-full flex flex-col bg-white rounded-card shadow-card border border-ink/10 p-6 space-y-4"
    >
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1 pr-4">
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-4/5" />
      <div className="flex gap-2 pt-2">
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="h-6 w-24 rounded-full" />
      </div>
      <div className="pt-4 border-t border-ink/5 mt-auto flex justify-between items-center">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-10 w-28 rounded-DEFAULT" />
      </div>
    </div>
  );
}

export function DoctorCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="h-full flex flex-col bg-white rounded-card shadow-card border border-ink/10 p-6 space-y-4"
    >
      <div className="flex items-center gap-4">
        <Skeleton className="size-16 rounded-full shrink-0" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-5 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-4 w-1/3" />
        </div>
      </div>
      <Skeleton className="h-14 w-full" />
      <div className="flex gap-2">
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <div className="pt-4 border-t border-ink/5 mt-auto flex justify-between items-center">
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-10 w-28 rounded-DEFAULT" />
      </div>
    </div>
  );
}
