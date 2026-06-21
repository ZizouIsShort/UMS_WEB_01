"use client";

import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavSection {
  id: string;
  label: string;
  type: "anchor" | "page";
  href?: string;
}

interface NavbarProps {
  sections: NavSection[];
}

export default function FloatingNavbar({ sections }: NavbarProps) {
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
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
      if (section.type === "anchor") {
        const el = document.getElementById(section.id);
        if (el) observer.observe(el);
      }
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

  const handleNavClick = (section: NavSection) => {
    if (section.type === "page" && section.href) {
      setMobileMenuOpen(false);
      window.location.href = section.href;
    } else {
      handleScrollTo(section.id);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 md:px-8 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between px-4 sm:px-6 py-4 transition-all duration-300">
        
        {/* Desktop Navigation links */}
        <div className="hidden md:flex items-center gap-6">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section)}
              className={`flex items-center gap-1 text-xs font-medium uppercase tracking-wider transition-all duration-300 px-2 py-1 ${
                section.type === "anchor" && activeSection === section.id
                  ? "text-gold-300"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {section.label}
              {section.type === "page" && (
                <ArrowUpRight className="w-3 h-3 -rotate-45" />
              )}
            </button>
          ))}
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-zinc-400 hover:text-white transition-all active:scale-90 touch-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`md:hidden fixed top-[68px] left-4 right-4 z-40 transition-all duration-500 origin-top bg-black/95 rounded-lg border border-white/5 ${
          mobileMenuOpen
            ? "opacity-100 scale-100 pointer-events-auto"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-2 p-4">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => handleNavClick(section)}
              className={`w-full flex items-center justify-between text-left text-sm font-semibold uppercase tracking-widest transition-all px-4 py-3 rounded-lg active:bg-white/5 touch-none ${
                section.type === "anchor" && activeSection === section.id
                  ? "text-gold-300 bg-gold-500/10"
                  : "text-zinc-300 hover:text-white hover:bg-white/5"
              }`}
            >
              {section.label}
              {section.type === "page" && (
                <ArrowUpRight className="w-3.5 h-3.5 -rotate-45 opacity-60" />
              )}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
