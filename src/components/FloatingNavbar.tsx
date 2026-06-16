"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  sections: { id: string; label: string }[];
}

export default function FloatingNavbar({ sections }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in the middle of viewport
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => {
      observer.disconnect();
    };
  }, [sections]);

  const handleScrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 transition-all duration-300">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => handleScrollTo("hero")}>
          <span className="text-sm font-medium tracking-wider text-white uppercase">
            UMS
          </span>
        </div>

        {/* Desktop Navigation links */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScrollTo(section.id)}
              className={`text-xs font-medium uppercase tracking-wider transition-all duration-300 ${
                activeSection === section.id
                  ? "text-gold-300"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-zinc-400 hover:text-white transition-all"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed top-[68px] left-4 right-4 z-40 transition-all duration-500 origin-top ${
          mobileMenuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-4 p-5">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleScrollTo(section.id)}
              className={`w-full text-left text-sm font-semibold uppercase tracking-widest transition-all ${
                activeSection === section.id
                  ? "text-gold-300"
                  : "text-zinc-300 hover:text-white"
              }`}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
