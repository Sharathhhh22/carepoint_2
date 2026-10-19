import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="py-20 sm:py-32 bg-cream flex items-center justify-center">
      <Container className="text-center max-w-xl">
        <div className="size-20 mx-auto rounded-full bg-maroon/10 text-maroon flex items-center justify-center font-bold text-3xl mb-6">
          404
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-maroon tracking-tight mb-4">
          Page Not Found
        </h1>
        <p className="text-base sm:text-lg text-ink/80 leading-relaxed mb-8">
          The clinic profile, doctor record, or resource you requested is not available. Please return to the homepage or search our clinic directory.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button variant="primary" size="md" leftIcon={<Home className="size-5" />}>
              Return to Homepage
            </Button>
          </Link>
          <Link href="/#find-doctors">
            <Button variant="outline" size="md" leftIcon={<Search className="size-5" />}>
              Find Doctors
            </Button>
          </Link>
        </div>
      </Container>
    </div>
  );
}
