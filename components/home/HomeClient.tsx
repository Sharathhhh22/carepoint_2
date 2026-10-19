"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Hero } from "./Hero";
import { Specialities } from "./Specialities";
import { FacilityList } from "./FacilityList";
import { DoctorGrid } from "./DoctorGrid";
import { PracticalServices } from "./PracticalServices";
import { SchemeCards } from "./SchemeCards";
import { FamilyCare } from "./FamilyCare";
import { FaqAccordion } from "./FaqAccordion";
import { QuickAccessServices } from "./QuickAccessServices";
import { HowCarePointWorks } from "./HowCarePointWorks";
import { RangoliDivider } from "@/components/ui/RangoliDivider";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";
import { AssistantLauncher } from "@/components/assistant/AssistantLauncher";
import { MobileStickyBar } from "@/components/layout/MobileStickyBar";
import { facilitiesData, Facility } from "@/lib/data/facilities";
import { doctorsData, Doctor } from "@/lib/data/doctors";
import { localityCoordinates } from "@/lib/data/locations";
import {
  filterFacilities,
  filterDoctors,
  BudgetRange,
  SortOption,
} from "@/lib/utils";
import { useToast } from "@/components/ui/Toast";

export function HomeClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { showToast } = useToast();

  // 1. Initial State from URL query parameters (Survives refresh & shareable)
  const initialQuery = searchParams.get("q") || "";
  const initialCity = searchParams.get("city") || "all";
  const initialLocality = searchParams.get("locality") || "all";
  const initialSpeciality = searchParams.get("speciality") || "all";
  const initialFemale = searchParams.get("female") === "true";
  const initialLang = searchParams.get("lang") || "all";
  const initialBudget = (searchParams.get("budget") as BudgetRange) || "any";
  const initialSort = (searchParams.get("sort") as SortOption) || "default";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedLocality, setSelectedLocality] = useState(initialLocality);
  const [selectedSpeciality, setSelectedSpeciality] = useState(initialSpeciality);
  const [femaleDoctorOnly, setFemaleDoctorOnly] = useState(initialFemale);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLang);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange>(initialBudget);
  const [sortBy, setSortBy] = useState<SortOption>(initialSort);

  // Geolocation state
  const [userCoords, setUserCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isGpsActive, setIsGpsActive] = useState<boolean>(false);

  // Modal State
  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);
  const [activeFacility, setActiveFacility] = useState<Facility | null>(null);

  // Sync state changes to URL query string via router.replace (no page reload)
  const syncFiltersToUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (query) params.set("q", query);
    if (selectedCity && selectedCity !== "all") params.set("city", selectedCity);
    if (selectedLocality && selectedLocality !== "all")
      params.set("locality", selectedLocality);
    if (selectedSpeciality && selectedSpeciality !== "all")
      params.set("speciality", selectedSpeciality);
    if (femaleDoctorOnly) params.set("female", "true");
    if (selectedLanguage && selectedLanguage !== "all")
      params.set("lang", selectedLanguage);
    if (selectedBudget && selectedBudget !== "any")
      params.set("budget", selectedBudget);
    if (sortBy && sortBy !== "default") params.set("sort", sortBy);

    const newQueryString = params.toString();
    const targetUrl = newQueryString ? `/?${newQueryString}` : "/";
    router.replace(targetUrl, { scroll: false });
  }, [
    query,
    selectedCity,
    selectedLocality,
    selectedSpeciality,
    femaleDoctorOnly,
    selectedLanguage,
    selectedBudget,
    sortBy,
    router,
  ]);

  useEffect(() => {
    syncFiltersToUrl();
  }, [syncFiltersToUrl]);

  // Handle location detected from LocationSelector
  const handleLocationDetected = (
    coords: { latitude: number; longitude: number } | null,
    isGps: boolean
  ) => {
    if (coords && isGps) {
      setUserCoords(coords);
      setIsGpsActive(true);
    } else {
      setUserCoords(null);
      setIsGpsActive(false);
    }
  };

  // Determine effective coordinates for distance calculation
  const effectiveCoords = useMemo(() => {
    if (isGpsActive && userCoords) {
      return userCoords;
    }

    // Fallback: use selected locality or selected city reference point
    if (selectedLocality && selectedLocality !== "all") {
      const loc = localityCoordinates[selectedLocality];
      if (loc) return loc;
    }
    if (selectedCity && selectedCity !== "all") {
      const cityLoc = localityCoordinates[selectedCity];
      if (cityLoc) return cityLoc;
    }

    // Default to Bengaluru reference
    return localityCoordinates["Bengaluru"];
  }, [isGpsActive, userCoords, selectedLocality, selectedCity]);

  // Handle SmartSearch submit from Hero: scrolls to #find-doctors
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const element = document.getElementById("find-doctors");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Clear all filters action
  const handleClearFilters = () => {
    setQuery("");
    setSelectedCity("all");
    setSelectedLocality("all");
    setSelectedSpeciality("all");
    setFemaleDoctorOnly(false);
    setSelectedLanguage("all");
    setSelectedBudget("any");
    setSortBy("default");
    setIsGpsActive(false);
    setUserCoords(null);
    showToast("Search filters cleared", "info");
    router.replace("/", { scroll: false });
  };

  // Filter facilities
  const filteredFacilities = useMemo(() => {
    return filterFacilities(facilitiesData, {
      query,
      city: selectedCity,
      locality: selectedLocality,
      speciality: selectedSpeciality,
      budget: selectedBudget,
      sortBy,
      userCoords: effectiveCoords,
    });
  }, [
    query,
    selectedCity,
    selectedLocality,
    selectedSpeciality,
    selectedBudget,
    sortBy,
    effectiveCoords,
  ]);

  // Calculate hidden facilities count when budget is active
  const hiddenFacilitiesCount = useMemo(() => {
    if (selectedBudget === "any") return 0;
    const withoutBudget = filterFacilities(facilitiesData, {
      query,
      city: selectedCity,
      locality: selectedLocality,
      speciality: selectedSpeciality,
      budget: "any",
    });
    return withoutBudget.filter((f) => f.fee === null).length;
  }, [query, selectedCity, selectedLocality, selectedSpeciality, selectedBudget]);

  // Filter doctors
  const filteredDoctors = useMemo(() => {
    return filterDoctors(doctorsData, {
      query,
      city: selectedCity,
      specialty: selectedSpeciality,
      femaleDoctor: femaleDoctorOnly,
      language: selectedLanguage,
      budget: selectedBudget,
      sortBy,
    });
  }, [
    query,
    selectedCity,
    selectedSpeciality,
    femaleDoctorOnly,
    selectedLanguage,
    selectedBudget,
    sortBy,
  ]);

  // Open appointment dialog for specific doctor or facility
  const handleBookDoctor = (doc: Doctor) => {
    setActiveDoctor(doc);
    setActiveFacility(null);
    setIsAppointmentOpen(true);
  };

  const handleBookFacility = (fac: Facility) => {
    setActiveFacility(fac);
    setActiveDoctor(null);
    setIsAppointmentOpen(true);
  };

  // Mobile quick action handlers
  const handleMobileFindCare = () => {
    const el = document.getElementById("find-doctors") || document.getElementById("smart-search-input");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      el.focus();
    }
  };

  const handleMobileBookDemo = () => {
    // Open appointment dialog with first available doctor or facility
    setActiveDoctor(doctorsData[0]);
    setActiveFacility(null);
    setIsAppointmentOpen(true);
  };

  return (
    <div className="pb-16 sm:pb-0">
      {/* SECTION 02: Hero & Smart Search */}
      <Hero
        query={query}
        onQueryChange={setQuery}
        selectedCity={selectedCity}
        selectedLocality={selectedLocality}
        onCityChange={setSelectedCity}
        onLocalityChange={setSelectedLocality}
        onLocationDetected={handleLocationDetected}
        isGpsActive={isGpsActive}
        onSearchSubmit={handleSearchSubmit}
      />

      {/* SECTION: Quick-Access Services Row */}
      <QuickAccessServices onOpenBooking={handleMobileBookDemo} />

      <RangoliDivider />

      {/* SECTION 03: Specialities */}
      <Specialities
        onSelectSpeciality={(spec) => setSelectedSpeciality(spec)}
        selectedSpeciality={selectedSpeciality}
      />

      <RangoliDivider />

      {/* SECTION 04: Healthcare Discovery (Facilities and Doctors) */}
      <FacilityList
        facilities={filteredFacilities}
        isGps={isGpsActive}
        sortBy={sortBy}
        onSortChange={setSortBy}
        onBookFacility={handleBookFacility}
        onClearFilters={handleClearFilters}
      />

      <DoctorGrid
        doctors={filteredDoctors}
        searchQuery={query}
        onSearchChange={setQuery}
        femaleDoctorOnly={femaleDoctorOnly}
        onFemaleToggle={setFemaleDoctorOnly}
        selectedLanguage={selectedLanguage}
        onLanguageChange={setSelectedLanguage}
        selectedBudget={selectedBudget}
        onBudgetChange={setSelectedBudget}
        sortBy={sortBy}
        onSortChange={setSortBy}
        hiddenFacilitiesCount={hiddenFacilitiesCount}
        onBookDoctor={handleBookDoctor}
        onClearFilters={handleClearFilters}
      />

      <RangoliDivider />

      {/* SECTION: How CarePoint Works */}
      <HowCarePointWorks />

      <RangoliDivider />

      {/* SECTION 05: Practical Services & Government Schemes */}
      <PracticalServices />

      <SchemeCards />

      <RangoliDivider />

      {/* SECTION 06: Family Healthcare & FAQ Accordion */}
      <FamilyCare
        onSelectSpeciality={(spec) => setSelectedSpeciality(spec)}
      />

      <FaqAccordion />

      {/* Global Interactive Modals and Floating Widgets */}
      <AppointmentDialog
        isOpen={isAppointmentOpen}
        onClose={() => setIsAppointmentOpen(false)}
        doctor={activeDoctor}
        facility={activeFacility}
      />

      <AssistantLauncher
        onApplySpecialityFilter={(spec) => setSelectedSpeciality(spec)}
      />

      {/* Q5: Sticky Bottom Bar on Mobile */}
      <MobileStickyBar
        onFindCareClick={handleMobileFindCare}
        onBookClick={handleMobileBookDemo}
      />
    </div>
  );
}
