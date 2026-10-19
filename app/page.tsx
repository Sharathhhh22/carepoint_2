import React, { Suspense } from "react";
import { HomeClient } from "@/components/home/HomeClient";
import { Container } from "@/components/ui/Container";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 bg-cream flex items-center justify-center">
          <Container className="text-center">
            <div className="size-10 rounded-full border-4 border-maroon border-t-transparent animate-spin mx-auto mb-4" />
            <p className="text-sm font-semibold text-maroon">
              Loading CarePoint Healthcare Directory...
            </p>
          </Container>
        </div>
      }
    >
      <HomeClient />
    </Suspense>
  );
}
