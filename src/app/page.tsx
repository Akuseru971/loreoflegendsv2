"use client";

import dynamic from "next/dynamic";
import Navigation from "@/components/ui/Navigation";
import HeroSection from "@/components/sections/HeroSection";
import OracleSection from "@/components/sections/OracleSection";
import ForgeSectionWrapper from "@/components/sections/ForgeSectionWrapper";
import SectionDivider from "@/components/ui/SectionDivider";
import Footer from "@/components/ui/Footer";

// Client-only particles (évite SSR hydration mismatch)
const ParticleField = dynamic(
  () => import("@/components/animations/ParticleField"),
  { ssr: false }
);

export default function HomePage() {
  return (
    <main className="relative bg-void min-h-screen overflow-x-hidden">
      {/* Ambient particles */}
      <ParticleField />

      {/* Navigation */}
      <Navigation />

      {/* 1. Hero */}
      <HeroSection />

      {/* Divider */}
      <SectionDivider label="Archives of Runeterra" />

      {/* 2. Oracle */}
      <OracleSection />

      {/* Divider */}
      <SectionDivider label="Forge of Fate" />

      {/* 3. Forge */}
      <ForgeSectionWrapper />

      {/* Footer */}
      <Footer />
    </main>
  );
}
