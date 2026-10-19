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
import { RangoliDivider } from "@/components/ui/RangoliDivider";
import { AppointmentDialog } from "@/components/modals/AppointmentDialog";
import { AssistantLauncher } from "@/components/assistant/AssistantLauncher";
import { facilitiesData, Facility } from "@/lib/data/facilities";
import { doctorsData, Doctor } from "@/lib/data/doctors";
import {
  filterFacilities,
  filterDoctors,
  BudgetRange,
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

  const [query, setQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);
  const [selectedLocality, setSelectedLocality] = useState(initialLocality);
  const [selectedSpeciality, setSelectedSpeciality] = useState(initialSpeciality);
  const [femaleDoctorOnly, setFemaleDoctorOnly] = useState(initialFemale);
  const [selectedLanguage, setSelectedLanguage] = useState(initialLang);
  const [selectedBudget, setSelectedBudget] = useState<BudgetRange>(initialBudget);

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
    router,
  ]);

  useEffect(() => {
    syncFiltersToUrl();
  }, [syncFiltersToUrl]);

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
    });
  }, [query, selectedCity, selectedLocality, selectedSpeciality, selectedBudget]);

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
    });
  }, [
    query,
    selectedCity,
    selectedSpeciality,
    femaleDoctorOnly,
    selectedLanguage,
    selectedBudget,
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

  return (
    <>
      {/* SECTION 02: Hero & Smart Search */}
      <Hero
        query={query}
        onQueryChange={setQuery}
        selectedCity={selectedCity}
        selectedLocality={selectedLocality}
        onCityChange={setSelectedCity}
        onLocalityChange={setSelectedLocality}
        onSearchSubmit={handleSearchSubmit}
      />

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
        hiddenFacilitiesCount={hiddenFacilitiesCount}
        onBookDoctor={handleBookDoctor}
        onClearFilters={handleClearFilters}
      />

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
    </>
  );
}
