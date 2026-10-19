"use client";

import React, { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  X,
  Calendar,
  Video,
  Building,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sun,
  Sunset,
  Moon,
  Clock,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { useToast } from "@/components/ui/Toast";
import { Doctor } from "@/lib/data/doctors";
import { Facility } from "@/lib/data/facilities";
import {
  appointmentSchema,
  AppointmentFormData,
} from "@/lib/validations/enquiry.schema";
import { formatINR } from "@/lib/utils";

interface AppointmentDialogProps {
  isOpen: boolean;
  onClose: () => void;
  doctor?: Doctor | null;
  facility?: Facility | null;
  initialConsultationType?: "in-clinic" | "online";
  triggerRef?: React.RefObject<HTMLElement | null>;
}

interface TimeSlot {
  time: string;
  isBooked: boolean;
  period: "morning" | "afternoon" | "evening";
}

export function AppointmentDialog({
  isOpen,
  onClose,
  doctor,
  facility,
  initialConsultationType = "in-clinic",
  triggerRef,
}: AppointmentDialogProps) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const { showToast } = useToast();

  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [consultationType, setConsultationType] = useState<"in-clinic" | "online">(
    initialConsultationType
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedSlot, setSelectedSlot] = useState<string>("");

  // Sync initial type when dialog opens
  useEffect(() => {
    if (isOpen) {
      setConsultationType(initialConsultationType);
    }
  }, [isOpen, initialConsultationType]);

  // Generate next 14 days
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isSunday = d.getDay() === 0;
      const dateString = d.toISOString().split("T")[0];
      const displayLabel = d.toLocaleDateString("en-IN", {
        weekday: "short",
        month: "short",
        day: "numeric",
      });
      dates.push({
        date: dateString,
        displayLabel,
        isSunday,
      });
    }
    return dates;
  }, []);

  // Time slots grouped by period
  const timeSlots: TimeSlot[] = [
    // Morning
    { time: "09:30 AM", isBooked: false, period: "morning" },
    { time: "10:15 AM", isBooked: true, period: "morning" },
    { time: "11:00 AM", isBooked: false, period: "morning" },
    { time: "11:45 AM", isBooked: false, period: "morning" },
    // Afternoon
    { time: "02:30 PM", isBooked: false, period: "afternoon" },
    { time: "03:15 PM", isBooked: true, period: "afternoon" },
    { time: "04:00 PM", isBooked: false, period: "afternoon" },
    { time: "04:45 PM", isBooked: false, period: "afternoon" },
    // Evening
    { time: "05:30 PM", isBooked: false, period: "evening" },
    { time: "06:15 PM", isBooked: false, period: "evening" },
    { time: "07:00 PM", isBooked: false, period: "evening" },
  ];

  // Set default date when list generated
  useEffect(() => {
    if (!selectedDate && availableDates.length > 0) {
      const firstNonSunday = availableDates.find((d) => !d.isSunday);
      if (firstNonSunday) {
        setSelectedDate(firstNonSunday.date);
      }
    }
  }, [availableDates, selectedDate]);

  // React Hook Form for Step 2
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<AppointmentFormData>({
    resolver: zodResolver(appointmentSchema),
    defaultValues: {
      patientName: "",
      phone: "+91 555 019 2831",
      email: "patient@example.com",
      city: doctor?.city || facility?.city || "Bengaluru",
      consultationType: initialConsultationType,
      date: "",
      timeSlot: "",
      notes: "",
    },
  });

  // Sync hidden fields into form
  useEffect(() => {
    setValue("consultationType", consultationType);
    setValue("date", selectedDate);
    setValue("timeSlot", selectedSlot);
  }, [consultationType, selectedDate, selectedSlot, setValue]);

  // Native dialog showModal & close
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
    reset();
    setTimeout(() => {
      setStep(1);
      setSelectedSlot("");
    }, 200);
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

  // Keyboard navigation for time slot radio group across all selectable slots
  const handleSlotKeyDown = (
    e: React.KeyboardEvent<HTMLDivElement>,
    currentTime: string
  ) => {
    const selectableSlots = timeSlots.filter((s) => !s.isBooked);
    const selectableIndex = selectableSlots.findIndex(
      (s) => s.time === currentTime
    );

    let nextIndex = selectableIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextIndex = (selectableIndex + 1) % selectableSlots.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      nextIndex =
        (selectableIndex - 1 + selectableSlots.length) % selectableSlots.length;
    }

    if (nextIndex !== -1 && selectableSlots[nextIndex]) {
      const chosen = selectableSlots[nextIndex].time;
      setSelectedSlot(chosen);
      document.getElementById(`slot-radio-${chosen}`)?.focus();
    }
  };

  const handleStep1Next = () => {
    if (!selectedSlot) {
      showToast("Please choose an available appointment time slot", "warning");
      return;
    }
    setStep(2);
  };

  const onSubmitPatientForm = () => {
    setStep(3);
    showToast(
      "Demo appointment confirmed! Demonstration only — no booking was created.",
      "success"
    );
  };

  // Upfront fee determination
  const feeDisplay = doctor
    ? formatINR(doctor.fee)
    : facility?.fee !== null && facility?.fee !== undefined
    ? formatINR(facility.fee)
    : "Fee not listed";

  // Earliest available string
  const earliestAvailable = doctor?.nextAvailable
    ? doctor.nextAvailable.replace(/\s*\(Demo\)/i, "")
    : "Tomorrow, 09:30 AM";

  if (!isOpen) {
    return null;
  }

  return (
    <dialog
      ref={dialogRef}
      onKeyDown={handleKeyDown}
      className="m-auto rounded-card bg-white p-0 shadow-floating border border-ink/15 max-w-lg w-full backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      aria-labelledby="appointment-dialog-title"
    >
      <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
        {/* Dialog Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-ink/10">
          <div>
            <div className="flex items-center gap-2">
              <h2
                id="appointment-dialog-title"
                className="text-xl sm:text-2xl font-bold text-maroon"
              >
                Schedule Appointment
              </h2>
              <Badge variant="sample">DEMO</Badge>
            </div>
            <p className="text-xs text-ink/70 mt-1">
              {doctor
                ? `Booking with ${doctor.name} (${doctor.specialty})`
                : facility
                ? `Booking at ${facility.name} (${facility.locality})`
                : "Select consultation date and preferred time slot."}
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="Close appointment dialog"
            className="p-1.5 text-ink/50 hover:text-ink hover:bg-black/5 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
          >
            <X className="size-5" />
          </button>
        </div>

        {/* STEP 1: Consultation Type, Date & Time Slot Grid */}
        {step === 1 && (
          <div className="space-y-5 pt-4">
            {/* Q5 Requirement: Show fee at the top before any time is chosen */}
            <div className="p-3.5 bg-amber-50/80 border border-amber-200 rounded-DEFAULT flex items-center justify-between gap-2">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-ink/60 block">
                  Consultation Fee (DEMO)
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-maroon">
                  {feeDisplay}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-ink-subtle block">
                  Sample tariff
                </span>
                <span className="text-xs font-semibold text-teal">
                  Excludes taxes
                </span>
              </div>
            </div>

            {/* Q5 Requirement: Earliest available line at the top */}
            <div className="flex items-center gap-2 text-xs font-semibold text-teal bg-teal/10 px-3 py-2 rounded-DEFAULT border border-teal/20">
              <Sparkles className="size-4 shrink-0 text-teal" />
              <span>
                Earliest available: {earliestAvailable} (sample)
              </span>
            </div>

            {/* Consultation Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-2">
                1. Consultation Mode (DEMO)
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setConsultationType("in-clinic")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-DEFAULT text-sm font-semibold border transition-all ${
                    consultationType === "in-clinic"
                      ? "bg-maroon text-white border-maroon shadow-sm"
                      : "bg-cream/40 text-ink border-ink/15 hover:bg-saffron/15"
                  }`}
                >
                  <Building className="size-4 shrink-0" />
                  <span>In-Clinic Visit</span>
                </button>
                <button
                  type="button"
                  onClick={() => setConsultationType("online")}
                  className={`flex items-center justify-center gap-2 p-3 rounded-DEFAULT text-sm font-semibold border transition-all ${
                    consultationType === "online"
                      ? "bg-maroon text-white border-maroon shadow-sm"
                      : "bg-cream/40 text-ink border-ink/15 hover:bg-saffron/15"
                  }`}
                >
                  <Video className="size-4 shrink-0" />
                  <span>Video Consult</span>
                </button>
              </div>
            </div>

            {/* Date Picker (Next 14 days) */}
            <div>
              <label
                htmlFor="appointment-date-select"
                className="block text-xs font-bold uppercase tracking-wider text-ink/75 mb-2"
              >
                2. Select Date (Next 14 Days)
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3.5 top-3.5 size-4 text-teal pointer-events-none shrink-0"
                  aria-hidden="true"
                />
                <select
                  id="appointment-date-select"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full pl-10 pr-8 py-2.5 bg-cream/30 text-ink font-medium text-sm rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron cursor-pointer"
                >
                  {availableDates.map((item) => (
                    <option
                      key={item.date}
                      value={item.date}
                      disabled={item.isSunday}
                      className={item.isSunday ? "text-ink/40 bg-gray-100" : ""}
                    >
                      {item.displayLabel}{" "}
                      {item.isSunday ? "— (Closed on Sundays - DEMO)" : ""}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Q5 Requirement: Slots grouped under Morning, Afternoon, and Evening */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold uppercase tracking-wider text-ink/75">
                  3. Select Time Slot
                </label>
                <span className="text-[11px] text-ink/60 flex items-center gap-1">
                  <Clock className="size-3" /> Navigate with arrow keys
                </span>
              </div>

              {/* Morning Slots */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-maroon mb-2">
                  <Sun className="size-3.5 text-saffron" />
                  <span>Morning Slots</span>
                </div>
                <div
                  role="radiogroup"
                  aria-label="Morning appointment time slots"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  {timeSlots
                    .filter((s) => s.period === "morning")
                    .map((slot) => {
                      const isChecked = selectedSlot === slot.time;
                      return (
                        <div
                          key={slot.time}
                          id={`slot-radio-${slot.time}`}
                          role="radio"
                          aria-checked={isChecked}
                          aria-disabled={slot.isBooked}
                          tabIndex={slot.isBooked ? -1 : isChecked ? 0 : -1}
                          onClick={() => {
                            if (!slot.isBooked) setSelectedSlot(slot.time);
                          }}
                          onKeyDown={(e) => {
                            if (!slot.isBooked) handleSlotKeyDown(e, slot.time);
                          }}
                          className={`p-2 rounded-DEFAULT text-xs text-center font-medium border select-none transition-all ${
                            slot.isBooked
                              ? "bg-ink/5 text-ink/40 border-ink/10 cursor-not-allowed line-through"
                              : isChecked
                              ? "bg-saffron text-ink font-bold border-saffron shadow-sm ring-2 ring-saffron"
                              : "bg-white text-ink border-ink/20 hover:bg-cream cursor-pointer"
                          }`}
                        >
                          <div>{slot.time}</div>
                          {slot.isBooked && (
                            <div className="text-[9px] text-amber-800 font-semibold no-underline">
                              Booked (sample)
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Afternoon Slots */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-maroon mb-2">
                  <Sunset className="size-3.5 text-saffron" />
                  <span>Afternoon Slots</span>
                </div>
                <div
                  role="radiogroup"
                  aria-label="Afternoon appointment time slots"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  {timeSlots
                    .filter((s) => s.period === "afternoon")
                    .map((slot) => {
                      const isChecked = selectedSlot === slot.time;
                      return (
                        <div
                          key={slot.time}
                          id={`slot-radio-${slot.time}`}
                          role="radio"
                          aria-checked={isChecked}
                          aria-disabled={slot.isBooked}
                          tabIndex={slot.isBooked ? -1 : isChecked ? 0 : -1}
                          onClick={() => {
                            if (!slot.isBooked) setSelectedSlot(slot.time);
                          }}
                          onKeyDown={(e) => {
                            if (!slot.isBooked) handleSlotKeyDown(e, slot.time);
                          }}
                          className={`p-2 rounded-DEFAULT text-xs text-center font-medium border select-none transition-all ${
                            slot.isBooked
                              ? "bg-ink/5 text-ink/40 border-ink/10 cursor-not-allowed line-through"
                              : isChecked
                              ? "bg-saffron text-ink font-bold border-saffron shadow-sm ring-2 ring-saffron"
                              : "bg-white text-ink border-ink/20 hover:bg-cream cursor-pointer"
                          }`}
                        >
                          <div>{slot.time}</div>
                          {slot.isBooked && (
                            <div className="text-[9px] text-amber-800 font-semibold no-underline">
                              Booked (sample)
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>

              {/* Evening Slots */}
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-maroon mb-2">
                  <Moon className="size-3.5 text-teal" />
                  <span>Evening Slots</span>
                </div>
                <div
                  role="radiogroup"
                  aria-label="Evening appointment time slots"
                  className="grid grid-cols-2 sm:grid-cols-4 gap-2"
                >
                  {timeSlots
                    .filter((s) => s.period === "evening")
                    .map((slot) => {
                      const isChecked = selectedSlot === slot.time;
                      return (
                        <div
                          key={slot.time}
                          id={`slot-radio-${slot.time}`}
                          role="radio"
                          aria-checked={isChecked}
                          aria-disabled={slot.isBooked}
                          tabIndex={slot.isBooked ? -1 : isChecked ? 0 : -1}
                          onClick={() => {
                            if (!slot.isBooked) setSelectedSlot(slot.time);
                          }}
                          onKeyDown={(e) => {
                            if (!slot.isBooked) handleSlotKeyDown(e, slot.time);
                          }}
                          className={`p-2 rounded-DEFAULT text-xs text-center font-medium border select-none transition-all ${
                            slot.isBooked
                              ? "bg-ink/5 text-ink/40 border-ink/10 cursor-not-allowed line-through"
                              : isChecked
                              ? "bg-saffron text-ink font-bold border-saffron shadow-sm ring-2 ring-saffron"
                              : "bg-white text-ink border-ink/20 hover:bg-cream cursor-pointer"
                          }`}
                        >
                          <div>{slot.time}</div>
                          {slot.isBooked && (
                            <div className="text-[9px] text-amber-800 font-semibold no-underline">
                              Booked (sample)
                            </div>
                          )}
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>

            {/* Step 1 Actions */}
            <div className="pt-4 flex items-center justify-end gap-3 border-t border-ink/10">
              <Button variant="outline" size="md" onClick={handleClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleStep1Next}
                rightIcon={<ArrowRight className="size-4" />}
              >
                Continue to Details
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: Patient Form */}
        {step === 2 && (
          <form
            onSubmit={handleSubmit(onSubmitPatientForm)}
            className="space-y-4 pt-5"
            noValidate
          >
            {/* Summary Banner */}
            <div className="p-3 bg-cream/60 rounded-DEFAULT border border-ink/10 flex items-center justify-between text-xs">
              <span className="font-semibold text-maroon">
                {consultationType === "in-clinic"
                  ? "In-Clinic Visit"
                  : "Video Consult"}
              </span>
              <span className="text-ink/80 font-medium">
                {selectedDate} at {selectedSlot}
              </span>
            </div>

            <div>
              <label
                htmlFor="patientName"
                className="block text-xs font-bold text-ink mb-1"
              >
                Patient Full Name *
              </label>
              <input
                id="patientName"
                type="text"
                placeholder="e.g. Aditi Sharma"
                {...register("patientName")}
                aria-describedby={errors.patientName ? "name-error" : undefined}
                className="w-full px-3.5 py-2.5 text-sm bg-cream/20 text-ink rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron"
              />
              {errors.patientName && (
                <p
                  id="name-error"
                  role="alert"
                  className="text-xs text-amber-700 mt-1 font-medium"
                >
                  {errors.patientName.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs font-bold text-ink mb-1"
                >
                  Contact Number *
                </label>
                <input
                  id="phone"
                  type="tel"
                  placeholder="+91 555 019 2831"
                  {...register("phone")}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  className="w-full px-3.5 py-2.5 text-sm bg-cream/20 text-ink rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron"
                />
                {errors.phone && (
                  <p
                    id="phone-error"
                    role="alert"
                    className="text-xs text-amber-700 mt-1 font-medium"
                  >
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-bold text-ink mb-1"
                >
                  Email Address *
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full px-3.5 py-2.5 text-sm bg-cream/20 text-ink rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron"
                />
                {errors.email && (
                  <p
                    id="email-error"
                    role="alert"
                    className="text-xs text-amber-700 mt-1 font-medium"
                  >
                    {errors.email.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label
                htmlFor="notes"
                className="block text-xs font-bold text-ink mb-1"
              >
                Brief Symptoms or Medical History (Optional)
              </label>
              <textarea
                id="notes"
                rows={2}
                placeholder="Describe your health concern..."
                {...register("notes")}
                className="w-full px-3.5 py-2 text-sm bg-cream/20 text-ink rounded-DEFAULT border border-ink/20 focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
              />
            </div>

            {/* Fee summary if doctor or facility provided */}
            <div className="flex items-center justify-between p-3 bg-amber-50 border border-amber-200 rounded-DEFAULT text-xs">
              <span className="text-ink/80 font-medium">
                Sample Consultation Fee:
              </span>
              <span className="font-bold text-maroon text-sm">
                {feeDisplay}
              </span>
            </div>

            {/* Step 2 Actions with Back Button that keeps selections */}
            <div className="pt-4 flex items-center justify-between border-t border-ink/10">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => setStep(1)}
                leftIcon={<ArrowLeft className="size-4" />}
              >
                Back
              </Button>
              <Button type="submit" variant="primary" size="md">
                Confirm Booking (DEMO)
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3: Success Confirmation State */}
        {step === 3 && (
          <div className="text-center py-6 space-y-4">
            <div className="size-16 rounded-full bg-teal/15 text-teal mx-auto flex items-center justify-center">
              <CheckCircle2 className="size-10" />
            </div>

            <h3 className="text-xl font-bold text-maroon">
              Demo Appointment Confirmed
            </h3>

            {/* Hard rule required message */}
            <p className="text-sm text-ink/80 font-medium max-w-sm mx-auto">
              Demo only. No appointment was made.
            </p>

            <div className="p-4 bg-cream/50 rounded-DEFAULT border border-ink/10 text-xs text-ink/80 text-left space-y-1.5 max-w-sm mx-auto">
              <div>
                <strong>Mode:</strong>{" "}
                {consultationType === "in-clinic"
                  ? "In-Clinic Consultation"
                  : "Online Video Consult"}
              </div>
              <div>
                <strong>Date & Time:</strong> {selectedDate} at {selectedSlot}
              </div>
              {doctor && (
                <div>
                  <strong>Clinician:</strong> {doctor.name} ({doctor.specialty})
                </div>
              )}
              {facility && (
                <div>
                  <strong>Facility:</strong> {facility.name}
                </div>
              )}
            </div>

            <div className="pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={handleClose}
                fullWidth
              >
                Done
              </Button>
            </div>
          </div>
        )}
      </div>
    </dialog>
  );
}
