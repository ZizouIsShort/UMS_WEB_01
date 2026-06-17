"use client";

import React from "react";
import FloatingNavbar from "@/components/FloatingNavbar";
import TradingSection from "@/components/TradingSection";
import ContactSection from "@/components/ContactSection";

const navSections = [
  { id: "home", label: "Home", type: "page" as const, href: "/" },
  { id: "contact", label: "Contact", type: "anchor" as const },
];

export default function TradingPage() {
  return (
    <div className="bg-black text-white font-sans">
      <FloatingNavbar sections={navSections} />
      <TradingSection />
      <ContactSection />
    </div>
  );
}
