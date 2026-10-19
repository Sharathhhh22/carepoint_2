"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Stethoscope,
  Search,
  MapPin,
  Building2,
  Clock,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { doctorsData, Doctor } from "@/lib/data/doctors";
import { facilitiesData } from "@/lib/data/facilities";
import { specialitiesData } from "@/lib/data/specialities";
import { locationsData, statesData } from "@/lib/data/locations";
import { filterDoctors, formatINR, BudgetRange, SortOption } from "@/lib/utils";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";

export function DoctorsClient() {
  const searchParams = useSearchParams();
  const initialParamQuery = searchParams.get("query") || "";
  const initialParamSpecialty = searchParams.get("specialty") || "all";
  const initialParamCity = searchParams.get("city") || "all";
  const initialParamState = searchParams.get("state") || "all";
  const initialParamFacility = searchParams.get("facility") || "all";

  const [query, setQuery] = useState<string>(initialParamQuery);
  const [specialty, setSpecialty] = useState<string>(initialParamSpecialty);
  const [city, setCity] = useState<string>(initialParamCity);
  const [state, setState] = useState<string>(initialParamState);
  const [facilityId, setFacilityId] = useState<string>(initialParamFacility);
  const [femaleDoctor, setFemaleDoctor] = useState<boolean>(false);
  const [budget, setBudget] = useState<BudgetRange>("any");
  const [sortBy, setSortBy] = useState<SortOption>("default");

  // Booking modal state
  const [selectedDoctorForBooking, setSelectedDoctorForBooking] = useState<Doctor | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Synchronise if URL search params change
  useEffect(() => {
    if (searchParams.get("specialty")) {
      setSpecialty(searchParams.get("specialty")!);
    }
    if (searchParams.get("city")) {
      setCity(searchParams.get("city")!);
    }
    if (searchParams.get("state")) {
      setState(searchParams.get("state")!);
    }
    if (searchParams.get("query")) {
      setQuery(searchParams.get("query")!);
    }
  }, [searchParams]);

  // Filtered doctors
  const filteredDoctors = useMemo(() => {
    const result = filterDoctors(doctorsData, {
      query,
      state,
      city,
      specialty,
      facilityId,
      femaleDoctor: femaleDoctor ? true : undefined,
      budget,
      sortBy,
    });
    return result;
  }, [query, state, city, specialty, facilityId, femaleDoctor, budget, sortBy]);

  const clearFilters = () => {
    setQuery("");
    setSpecialty("all");
    setCity("all");
    setState("all");
    setFacilityId("all");
    setFemaleDoctor(false);
    setBudget("any");
    setSortBy("default");
  };

  const hasActiveFilters =
    query ||
    specialty !== "all" ||
    city !== "all" ||
    state !== "all" ||
    facilityId !== "all" ||
    femaleDoctor ||
    budget !== "any" ||
    sortBy !== "default";

  return (
    <div className="bg-bg-secondary min-h-screen pb-16">
      {/* Page Header */}
      <section className="bg-navy text-white py-12 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <p className="text-xs font-bold text-teal-pale uppercase tracking-wider mb-2">
              Verified Doctor Directory &bull; India (Demo)
            </p>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Find Experienced Doctors
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Search verified specialists, general physicians, and surgeons across top Indian medical centres. Filter by clinical specialty, city, consultation fee, or gender preference with upfront sample pricing.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Container */}
      <Container className="pt-8">
        {/* Filters Panel */}
        <div className="bg-white rounded-lg p-5 shadow-card border border-border mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search Input */}
            <div className="relative">
              <label htmlFor="doctor-search" className="sr-only">
                Search doctor name or qualification
              </label>
              <Search className="size-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="doctor-search"
                type="text"
                placeholder="Doctor name, qualification..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-md border border-border bg-bg-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-text-primary"
              />
            </div>

            {/* Specialty Filter */}
            <div>
              <label htmlFor="doctor-specialty-select" className="sr-only">
                Specialty
              </label>
              <select
                id="doctor-specialty-select"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded-md border border-border bg-bg-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-text-primary cursor-pointer"
              >
                <option value="all">All Specialties</option>
                {specialitiesData.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            {/* City Filter */}
            <div>
              <label htmlFor="doctor-city-select" className="sr-only">
                City
              </label>
              <select
                id="doctor-city-select"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded-md border border-border bg-bg-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-text-primary cursor-pointer"
              >
                <option value="all">All Cities</option>
                {locationsData.map((l) => (
                  <option key={l.city} value={l.city}>
                    {l.city}
                  </option>
                ))}
              </select>
            </div>

            {/* State Filter */}
            <div>
              <label htmlFor="doctor-state-select" className="sr-only">
                State
              </label>
              <select
                id="doctor-state-select"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded-md border border-border bg-bg-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-text-primary cursor-pointer"
              >
                <option value="all">All States</option>
                {statesData.map((st) => (
                  <option key={st.id} value={st.name}>
                    {st.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Secondary Filters Row: Budget, Female Doctor, Sort, Reset */}
          <div className="mt-4 pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4 text-xs">
            <div className="flex flex-wrap items-center gap-3">
              {/* Budget Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-text-secondary font-semibold">Budget:</span>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value as BudgetRange)}
                  className="py-1 px-2.5 rounded border border-border bg-bg-secondary text-text-primary focus:outline-none focus:ring-1 focus:ring-teal cursor-pointer"
                >
                  <option value="any">Any budget</option>
                  <option value="under-500">Under ₹500</option>
                  <option value="500-1000">₹500 to ₹1,000</option>
                  <option value="above-1000">Above ₹1,000</option>
                </select>
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-1.5">
                <span className="text-text-secondary font-semibold">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="py-1 px-2.5 rounded border border-border bg-bg-secondary text-text-primary focus:outline-none focus:ring-1 focus:ring-teal cursor-pointer"
                >
                  <option value="default">Recommended</option>
                  <option value="fee-asc">Fee: low to high</option>
                  <option value="fee-desc">Fee: high to low</option>
                </select>
              </div>

              {/* Female Doctor Checkbox */}
              <label className="inline-flex items-center gap-1.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={femaleDoctor}
                  onChange={(e) => setFemaleDoctor(e.target.checked)}
                  className="rounded border-border text-teal focus:ring-teal size-3.5"
                />
                <span className="text-text-primary font-medium">Female doctor only</span>
              </label>
            </div>

            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="text-teal font-semibold hover:underline"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-navy">
            Doctors Available ({filteredDoctors.length})
          </h2>
          <span className="text-xs text-text-secondary bg-white px-3 py-1 rounded border border-border">
            All profiles labelled demo
          </span>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-border shadow-card max-w-lg mx-auto my-8">
            <Stethoscope className="size-12 text-text-secondary mx-auto mb-3 opacity-40" />
            <h3 className="text-lg font-bold text-navy mb-1">No doctors match your criteria</h3>
            <p className="text-xs sm:text-sm text-text-secondary mb-5">
              Try adjusting your specialty, city, or fee budget to see more clinical profiles.
            </p>
            <Button variant="outline" size="sm" onClick={clearFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => {
              const facility = facilitiesData.find((f) => f.id === doc.facilityId);

              return (
                <article
                  key={doc.id}
                  className="bg-white rounded-lg border border-border shadow-card hover:shadow-dropdown transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5">
                    {/* Header: Avatar, Name, Specialty */}
                    <div className="flex items-start gap-3.5 mb-3">
                      <div className="size-12 rounded-full bg-teal-pale text-teal flex items-center justify-center font-bold text-sm shrink-0 border border-teal/30">
                        {doc.name
                          .replace("Dr. ", "")
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .slice(0, 2)}
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link
                          href={`/doctors/${doc.slug}`}
                          className="font-bold text-base text-navy hover:text-teal transition-colors block truncate"
                        >
                          {doc.name}
                        </Link>
                        <p className="text-xs font-semibold text-teal truncate">{doc.specialty}</p>
                        <p className="text-[11px] text-text-secondary truncate mt-0.5">
                          {doc.qualification}
                        </p>
                      </div>
                    </div>

                    {/* Verification & Experience */}
                    <div className="flex items-center gap-2 mb-3 text-xs">
                      <Badge variant="teal">Sample verification</Badge>
                      <span className="text-text-secondary">
                        {doc.experienceYears} yrs experience
                      </span>
                    </div>

                    {/* Facility Affiliation */}
                    {facility && (
                      <p className="text-xs text-text-primary flex items-center gap-1.5 mb-2 truncate">
                        <Building2 className="size-3.5 text-teal shrink-0" />
                        <span className="truncate">{facility.name}</span>
                      </p>
                    )}

                    {/* City & Languages */}
                    <p className="text-xs text-text-secondary flex items-center gap-1.5 mb-3">
                      <MapPin className="size-3.5 text-teal shrink-0" />
                      <span>{doc.city}</span>
                      <span>•</span>
                      <span className="truncate">{doc.languages.join(", ")}</span>
                    </p>

                    {/* Next Available Slot */}
                    <div className="bg-bg-secondary p-2.5 rounded border border-border text-xs flex items-center justify-between">
                      <span className="text-text-secondary">Next available:</span>
                      <span className="font-semibold text-navy flex items-center gap-1">
                        <Clock className="size-3 text-teal" />
                        <span>{doc.nextAvailable}</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Footer: Fee & Book Button */}
                  <div className="p-4 bg-bg-secondary border-t border-border flex items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-text-secondary block text-[11px]">Consultation fee:</span>
                      <span className="text-base font-extrabold text-navy">
                        {formatINR(doc.fee)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/doctors/${doc.slug}`}
                        className="py-1.5 px-3 rounded text-xs font-semibold text-teal hover:underline"
                      >
                        Profile
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedDoctorForBooking(doc);
                          setIsBookingOpen(true);
                        }}
                      >
                        Book (DEMO)
                      </Button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </Container>

      {/* Appointment Booking Modal */}
      <AppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedDoctorForBooking(null);
        }}
        doctor={selectedDoctorForBooking}
        facility={
          selectedDoctorForBooking
            ? facilitiesData.find((f) => f.id === selectedDoctorForBooking.facilityId)
            : null
        }
      />
    </div>
  );
}
