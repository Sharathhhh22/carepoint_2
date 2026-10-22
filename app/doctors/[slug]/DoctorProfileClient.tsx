"use client";

import React, { useState, useRef } from "react";
import { Doctor } from "@/lib/data/doctors";
import { Button } from "@/components/ui/Button";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";
import { CalendarCheck } from "lucide-react";

export function DoctorProfileClient({ doctor }: { doctor: Doctor }) {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <>
      <Button
        ref={buttonRef}
        variant="primary"
        size="md"
        fullWidth
        onClick={() => setIsOpen(true)}
        leftIcon={<CalendarCheck className="size-4" />}
      >
        Book Appointment
      </Button>

      <AppointmentDialog
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        doctor={doctor}
        triggerRef={buttonRef}
      />
    </>
  );
}
