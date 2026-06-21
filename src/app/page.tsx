"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingNavbar from "@/components/FloatingNavbar";
import HorizontalScrollSection from "@/components/HorizontalScrollSection";
import MarbleCarousel from "@/components/MarbleCarousel";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

const navSections = [
  { id: "projects", label: "Projects", type: "anchor" as const },
  { id: "products", label: "Products", type: "anchor" as const },
  { id: "contact", label: "Contact", type: "anchor" as const },
  { id: "trading", label: "Trading", type: "page" as const, href: "/trading" },
];

const siteImages = [
  {
    id: "01",
    src: "/images/amazing-royal-opera-house.jpg",
    name: "Royal Opera House",
    speed: 0.8,
    yOffset: 12,
  },
  {
    id: "02",
    src: "/images/crowne-plaza-muscat-9874249701-original.jfif",
    name: "Crowne Plaza Muscat",
    speed: 1.2,
    yOffset: -20,
  },
  {
    id: "03",
    src: "/images/haitam-city.jpg",
    name: "Haitam City",
    speed: 1.0,
    yOffset: 0,
  },
  {
    id: "04",
    src: "/images/kempinski.webp",
    name: "Kempinski Hotel",
    speed: 0.9,
    yOffset: 16,
  },
  {
    id: "05",
    src: "/images/Oman-botanic-garden-.jpg",
    name: "Botanic Garden",
    speed: 1.3,
    yOffset: -24,
  },
  {
    id: "06",
    src: "/images/Oman-Muscat-Sultan-Qaboos-Grand-Mosque-interior-lg.jpg",
    name: "Sultan Qaboos Grand Mosque",
    speed: 1.15,
    yOffset: 10,
  },
];

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [counts, setCounts] = useState([0, 0]);
  const timersRef = useRef<ReturnType<typeof setInterval>[]>([]);

  const animateCounts = useCallback(() => {
    timersRef.current.forEach(clearInterval);
    timersRef.current = [];
    setCounts([0, 0]);

    const items = [
      { value: 18, idx: 0 },
      { value: 20, idx: 1 },
    ];

    items.forEach(({ value, idx }) => {
      const duration = 2000;
      const steps = 60;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCounts((prev) => {
            const next = [...prev];
            next[idx] = value;
            return next;
          });
          clearInterval(timer);
        } else {
          setCounts((prev) => {
            const next = [...prev];
            next[idx] = Math.floor(current);
            return next;
          });
        }
      }, duration / steps);
      timersRef.current.push(timer);
    });
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounts();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      timersRef.current.forEach(clearInterval);
    };
  }, [animateCounts]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const panels = track.querySelectorAll<HTMLElement>("[data-speed]");
    const isMobile = window.innerWidth < 768;
    const totalScroll = track.scrollWidth - window.innerWidth;
    if (totalScroll <= 0) return;

    section.style.height = `${totalScroll + 1}px`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: !isMobile, // Disable pin on mobile for better UX
        start: "top top",
        end: () => `+=${totalScroll}`,
        scrub: isMobile ? 0.5 : 1, // Faster response on mobile
        invalidateOnRefresh: true,
      },
      onUpdate: () => {
        const prog = tl.progress();
        const idx = Math.min(
          siteImages.length - 1,
          Math.floor(prog * siteImages.length),
        );
        setActiveIndex(idx + 1);
      },
    });

    tl.to(track, { x: -totalScroll, ease: "none" });

    panels.forEach((panel) => {
      const speed = parseFloat(panel.dataset.speed || "1");
      // Disable parallax on mobile for performance
      const parallaxAmount = isMobile ? 0 : (1 - speed) * totalScroll;
      gsap.to(panel, {
        x: parallaxAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${totalScroll}`,
          scrub: isMobile ? 0.5 : 1,
          invalidateOnRefresh: true,
        },
      });
    });

    ScrollTrigger.refresh();

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white font-sans selection:bg-white/20">
      {/* Floating Navbar */}
      <FloatingNavbar sections={navSections} />

      {/* ===== TOP LANDING ===== */}
      <section
        id="hero"
        className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-black"
      >
        {/* Background */}
        <div className="absolute inset-0">
          <div
            className="w-full h-full bg-cover bg-center"
            style={{ backgroundImage: "url('/images/haitam-city.jpg')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 font-mono mb-6">
            Sultanate of Oman — Est. 2020
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-8xl font-bold tracking-tight text-white leading-[0.95] mb-4">
            United Modern Stone
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-zinc-300 font-light tracking-wide max-w-2xl mx-auto">
            Civil Stone Craftsmen{" "}
            <span className="text-gold-400 font-medium">&amp;</span> Landmark
            Elevations
          </p>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <span className="text-[9px] font-mono tracking-[0.3em] uppercase">
              Scroll
            </span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-500 to-transparent" />
          </div>
        </div>
      </section>

      {/* ===== GSAP PARALLAX GALLERY ===== */}
      <section
        id="projects"
        ref={sectionRef}
        className="relative overflow-hidden bg-black"
        style={{ minHeight: "100vh" }}
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Section editorial elements (visible only in this section) */}
          <div className="absolute top-12 left-6 sm:left-10 z-10 pointer-events-none select-none mix-blend-difference">
            <div className="flex items-center space-x-2 mb-3">
              <span className="w-6 h-[1px] bg-gold-500" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-400">Landmark Heritage</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white whitespace-nowrap">
              HERITAGE
              <br />
              COLLECTION
            </h2>
          </div>

          {/* 18+ Projects — Left side */}
          <div className="absolute top-[30%] left-6 sm:left-12 z-10 pointer-events-none select-none mix-blend-difference text-left">
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight text-white whitespace-nowrap">
              {counts[0]}
              <span className="text-gold-400">+</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 mt-2">
              Projects
            </div>
          </div>

          {/* 20+ Products — Right side, lower */}
          <div className="absolute bottom-[25%] right-6 sm:right-12 z-10 pointer-events-none select-none mix-blend-difference text-right">
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight text-white whitespace-nowrap">
              {counts[1]}
              <span className="text-gold-400">+</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 mt-2">
              Products
            </div>
          </div>

          <div className="absolute bottom-8 right-6 sm:right-10 z-10 pointer-events-none select-none mix-blend-difference">
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/60">
              SCROLL TO SURF
            </span>
          </div>

          {/* Track */}
          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-10 px-6 sm:px-10"
            style={{ height: "100vh", width: "max-content" }}
          >
            {siteImages.map((item) => (
              <div
                key={item.id}
                data-speed={item.speed}
                className="relative flex-shrink-0"
                style={{
                  width: "clamp(120px, 35vw, 320px)",
                  aspectRatio: "3 / 4",
                  marginTop: `${item.yOffset}%`,
                }}
              >
                <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 shadow-2xl shadow-black/60 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={`Gallery ${item.id}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    draggable={false}
                  />
                  <div className="absolute top-3 left-3 text-white font-mono text-[11px] font-semibold drop-shadow-lg mix-blend-difference">
                    {item.id}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-end p-4">
                    <span className="text-white text-xs font-medium tracking-wide uppercase">
                      {item.name}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MARBLE CAROUSEL ===== */}
      <MarbleCarousel id="products" />

      <ContactSection />
    </div>
  );
}
