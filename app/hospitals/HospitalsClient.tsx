"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Building2,
  MapPin,
  Search,
  Navigation,
} from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { facilitiesData, Facility, FacilityType } from "@/lib/data/facilities";
import { statesData, locationsData } from "@/lib/data/locations";
import { specialitiesData } from "@/lib/data/specialities";
import { doctorsData } from "@/lib/data/doctors";
import { filterFacilities, formatINR, openNowStatus } from "@/lib/utils";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";

export function HospitalsClient() {
  const searchParams = useSearchParams();
  const initialParamState = searchParams.get("state") || "all";
  const initialParamCity = searchParams.get("city") || "all";
  const initialParamType = searchParams.get("type") || "all";
  const initialParamQuery = searchParams.get("query") || "";

  const [selectedState, setSelectedState] = useState<string>(initialParamState);
  const [selectedCity, setSelectedCity] = useState<string>(initialParamCity);
  const [selectedType, setSelectedType] = useState<string>(initialParamType);
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>(initialParamQuery);

  // Booking modal
  const [selectedFacilityForBooking, setSelectedFacilityForBooking] = useState<Facility | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Synchronise if URL search params change
  useEffect(() => {
    if (searchParams.get("state")) {
      setSelectedState(searchParams.get("state")!);
    }
    if (searchParams.get("city")) {
      setSelectedCity(searchParams.get("city")!);
    }
  }, [searchParams]);

  // Cities filtered by selected state
  const availableCities = useMemo(() => {
    if (selectedState === "all") {
      return locationsData.map((l) => l.city);
    }
    const stateObj = statesData.find(
      (s) => s.name.toLowerCase() === selectedState.toLowerCase()
    );
    return stateObj ? stateObj.cities : [];
  }, [selectedState]);

  // Handle state change (reset city to all unless valid)
  const handleStateChange = (stateName: string) => {
    setSelectedState(stateName);
    setSelectedCity("all");
  };

  // Filter facilities
  const filteredFacilities = useMemo(() => {
    return filterFacilities(facilitiesData, {
      query: searchQuery,
      state: selectedState,
      city: selectedCity,
      speciality: selectedSpecialty,
      type: selectedType as FacilityType,
    });
  }, [searchQuery, selectedState, selectedCity, selectedSpecialty, selectedType]);

  const clearAllFilters = () => {
    setSelectedState("all");
    setSelectedCity("all");
    setSelectedType("all");
    setSelectedSpecialty("all");
    setSearchQuery("");
  };

  return (
    <div className="bg-bg-secondary min-h-screen pb-16">
      {/* Top Banner */}
      <section className="bg-navy text-white py-12 border-b border-border">
        <Container>
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/20 text-teal-pale text-xs font-semibold mb-4 border border-teal/40">
              <Building2 className="size-3.5" />
              <span>Narayana Health-Inspired Facility Directory</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
              Hospitals & Clinics Network
            </h1>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Explore trusted multi-specialty hospitals, neighbourhood day care polyclinics, and diagnostic scan centres across 8 Indian states. Every facility card displays verified operating timings, consultation fees, and direct navigation links.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Content Area */}
      <Container className="pt-8">
        {/* States Explorer Pills */}
        <div className="bg-white rounded-lg p-5 shadow-card border border-border mb-8">
          <div className="flex items-center justify-between gap-4 mb-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-navy flex items-center gap-2">
              <MapPin className="size-4 text-teal" />
              <span>Browse by State</span>
            </h2>
            {selectedState !== "all" && (
              <button
                onClick={() => handleStateChange("all")}
                className="text-xs text-teal hover:underline font-semibold"
              >
                Show All States
              </button>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleStateChange("all")}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                selectedState === "all"
                  ? "bg-teal text-white shadow-sm"
                  : "bg-bg-secondary text-text-primary hover:bg-teal-pale hover:text-navy border border-border"
              }`}
            >
              All India ({facilitiesData.length})
            </button>
            {statesData.map((st) => {
              return (
                <button
                  key={st.id}
                  onClick={() => handleStateChange(st.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                    selectedState.toLowerCase() === st.name.toLowerCase()
                      ? "bg-teal text-white shadow-sm"
                      : "bg-bg-secondary text-text-primary hover:bg-teal-pale hover:text-navy border border-border"
                  }`}
                >
                  <span>{st.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                      selectedState.toLowerCase() === st.name.toLowerCase()
                        ? "bg-white/20 text-white"
                        : "bg-black/5 text-text-secondary"
                    }`}
                  >
                    {st.hospitalCount + st.clinicCount}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="bg-white rounded-lg p-4 sm:p-5 shadow-card border border-border mb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Search query */}
            <div className="lg:col-span-2 relative">
              <label htmlFor="hospital-search" className="sr-only">
                Search facility name, address, or service
              </label>
              <Search className="size-4 text-text-secondary absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="hospital-search"
                type="text"
                placeholder="Search hospital, clinic, or locality..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2 text-xs sm:text-sm rounded-md border border-border bg-bg-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-text-primary"
              />
            </div>

            {/* City dropdown */}
            <div>
              <label htmlFor="hospital-city-select" className="sr-only">
                City
              </label>
              <select
                id="hospital-city-select"
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded-md border border-border bg-bg-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-text-primary cursor-pointer"
              >
                <option value="all">All Cities</option>
                {availableCities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            {/* Facility Type */}
            <div>
              <label htmlFor="hospital-type-select" className="sr-only">
                Facility Type
              </label>
              <select
                id="hospital-type-select"
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded-md border border-border bg-bg-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-text-primary cursor-pointer"
              >
                <option value="all">All Facility Types</option>
                <option value="Hospital">Hospitals</option>
                <option value="Clinic">Clinics</option>
                <option value="Diagnostic centre">Diagnostic Centres</option>
              </select>
            </div>

            {/* Specialty */}
            <div>
              <label htmlFor="hospital-specialty-select" className="sr-only">
                Specialty
              </label>
              <select
                id="hospital-specialty-select"
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full py-2 px-3 text-xs sm:text-sm rounded-md border border-border bg-bg-secondary focus:bg-white focus:outline-none focus:ring-2 focus:ring-teal text-text-primary cursor-pointer"
              >
                <option value="all">All Specialties</option>
                {specialitiesData.map((spec) => (
                  <option key={spec.id} value={spec.name}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-navy">
              Available Facilities ({filteredFacilities.length})
            </h2>
            <p className="text-xs text-text-secondary mt-0.5">
              Showing verified healthcare institutions {selectedState !== "all" ? `in ${selectedState}` : "across India"}
            </p>
          </div>

          {(selectedState !== "all" || selectedCity !== "all" || selectedType !== "all" || selectedSpecialty !== "all" || searchQuery) && (
            <button
              onClick={clearAllFilters}
              className="text-xs font-semibold text-teal hover:underline flex items-center gap-1"
            >
              <span>Reset all filters</span>
            </button>
          )}
        </div>

        {/* Facilities Grid */}
        {filteredFacilities.length === 0 ? (
          <div className="bg-white rounded-lg p-12 text-center border border-border shadow-card max-w-lg mx-auto my-8">
            <Building2 className="size-12 text-text-secondary mx-auto mb-3 opacity-40" />
            <h3 className="text-lg font-bold text-navy mb-1">No matching facilities found</h3>
            <p className="text-xs sm:text-sm text-text-secondary mb-5">
              We couldn&apos;t find any facility matching your current filter selection. Try resetting filters or searching for another city.
            </p>
            <Button variant="outline" size="sm" onClick={clearAllFilters}>
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFacilities.map((facility) => {
              const openStatus = openNowStatus(facility.openingHours);
              const affiliatedDoctors = doctorsData.filter(
                (d) => d.facilityId === facility.id
              );

              return (
                <article
                  key={facility.id}
                  className="bg-white rounded-lg border border-border shadow-card hover:shadow-dropdown transition-all flex flex-col justify-between overflow-hidden"
                >
                  <div className="p-5">
                    {/* Top Type & Open Status Badge */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-teal bg-teal-pale px-2.5 py-1 rounded">
                        {facility.type}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full flex items-center gap-1.5 ${
                          openStatus.isOpen
                            ? "bg-green-50 text-green-700 border border-green-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            openStatus.isOpen ? "bg-green-600 animate-pulse" : "bg-gray-400"
                          }`}
                        />
                        <span>{openStatus.text}</span>
                      </span>
                    </div>

                    {/* Facility Name & Verification */}
                    <h3 className="text-lg font-bold text-navy hover:text-teal transition-colors mb-1.5">
                      <Link href={`/hospitals/${facility.id}`}>
                        {facility.name}
                      </Link>
                    </h3>

                    {/* Rating & Sample tag */}
                    <div className="flex items-center gap-2 mb-3 text-xs">
                      <span className="font-bold text-navy bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded flex items-center gap-1">
                        ★ {facility.sampleRating}
                      </span>
                      <span className="text-text-secondary">
                        ({facility.sampleReviewCount} demo reviews)
                      </span>
                      <span className="text-[10px] text-text-secondary bg-bg-secondary px-1.5 py-0.5 rounded border border-border">
                        Sample data
                      </span>
                    </div>

                    {/* Location & Address */}
                    <p className="text-xs text-text-primary flex items-start gap-1.5 mb-2 leading-relaxed">
                      <MapPin className="size-3.5 text-teal shrink-0 mt-0.5" />
                      <span>{facility.address}</span>
                    </p>

                    {/* Consultation Fee */}
                    <div className="text-xs text-navy font-semibold my-2.5 py-1.5 px-2.5 bg-bg-secondary rounded border border-border/80 flex items-center justify-between">
                      <span className="text-text-secondary font-normal">OPD Fee:</span>
                      <span className="font-bold text-teal">
                        {facility.fee ? formatINR(facility.fee) : "Fee not listed"}
                      </span>
                    </div>

                    {/* Specialties Pills */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {facility.specialities.slice(0, 3).map((spec) => (
                        <span
                          key={spec}
                          className="text-[11px] bg-bg-secondary text-text-secondary px-2 py-0.5 rounded"
                        >
                          {spec}
                        </span>
                      ))}
                      {facility.specialities.length > 3 && (
                        <span className="text-[10px] text-teal font-semibold px-1 py-0.5">
                          +{facility.specialities.length - 3} more
                        </span>
                      )}
                    </div>

                    {/* Doctor affiliation count */}
                    {affiliatedDoctors.length > 0 && (
                      <p className="text-xs text-text-secondary mt-3">
                        <span className="font-semibold text-navy">{affiliatedDoctors.length}</span> verified doctor{affiliatedDoctors.length > 1 ? "s" : ""} on roster
                      </p>
                    )}
                  </div>

                  {/* Card Footer Actions */}
                  <div className="p-4 bg-bg-secondary border-t border-border flex items-center justify-between gap-2 text-xs">
                    <a
                      href={facility.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-text-secondary hover:text-navy font-semibold inline-flex items-center gap-1 py-1"
                    >
                      <Navigation className="size-3.5 text-teal" />
                      <span>Directions</span>
                    </a>

                    <div className="flex items-center gap-2">
                      <Link
                        href={`/hospitals/${facility.id}`}
                        className="font-semibold text-teal hover:underline py-1"
                      >
                        Details
                      </Link>
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedFacilityForBooking(facility);
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

      {/* Booking Dialog */}
      <AppointmentDialog
        isOpen={isBookingOpen}
        onClose={() => {
          setIsBookingOpen(false);
          setSelectedFacilityForBooking(null);
        }}
        facility={selectedFacilityForBooking}
        doctor={
          selectedFacilityForBooking
            ? doctorsData.find((d) => d.facilityId === selectedFacilityForBooking.id) || doctorsData[0]
            : doctorsData[0]
        }
      />
    </div>
  );
}
