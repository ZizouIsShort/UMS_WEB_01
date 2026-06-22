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

interface SiteImage {
  id: string;
  src: string;
  name: string;
  speed: number;
  yOffset: number;
  desc: string;
  gallery: string[];
}

const siteImages: SiteImage[] = [
  {
    id: "01",
    src: "/images/amazing-royal-opera-house.jpg",
    name: "Royal Opera House",
    speed: 0.8,
    yOffset: 12,
    desc: "Exquisite marble cladding, travertine flooring and bespoke internal wall stone finishes for the iconic Royal Opera House Muscat.",
    gallery: [
      "/images/opera_a.HEIC",
      "/images/opera_b.HEIC",
      "/images/opera_c.HEIC",
      "/images/opera_d.HEIC",
      "/images/opera_e.HEIC",
      "/images/opera_f.HEIC",
    ],
  },
  {
    id: "02",
    src: "/images/crowne-plaza-muscat-9874249701-original.jfif",
    name: "Crowne Plaza Muscat",
    speed: 1.2,
    yOffset: -20,
    desc: "Premium stone work for furnishing and joinery — granite, marble and limestone installations throughout the Crowne Plaza hotel lobby and public areas.",
    gallery: [
      "/images/crown_a.jpeg",
      "/images/crown_b.jpeg",
      "/images/crown_c.jpeg",
      "/images/crown_d.jpeg",
      "/images/crown_e.jpeg",
    ],
  },
  {
    id: "03",
    src: "/images/haitam-city.jpg",
    name: "Haitam City",
    speed: 1.0,
    yOffset: 0,
    desc: "Large-scale granite cobble flooring (100×100mm, 50mm & 80mm thickness) supply and installation for the Haitam City development project.",
    gallery: [
      "/images/haitham_a.HEIC",
      "/images/haitham_b.HEIC",
      "/images/haitham_c.HEIC",
      "/images/haitham_d.HEIC",
      "/images/haitham_e.jpg",
    ],
  },
  {
    id: "04",
    src: "/images/zawawi_main.jpg",
    name: "Zawawi",
    speed: 0.9,
    yOffset: 16,
    desc: "Complete refurbishment of existing stone work — restoration, polishing and replacement of granite and marble surfaces.",
    gallery: [
      "/images/zawawi_a.jpeg",
      "/images/zawawi_b.jpeg",
      "/images/zawawi_c.jpeg",
      "/images/zawawi_d.jpeg",
    ],
  },
  {
    id: "05",
    src: "/images/Oman-botanic-garden-.jpg",
    name: "Botanic Garden",
    speed: 1.3,
    yOffset: -24,
    desc: "Precision granite stonework and handcrafted marble benches installed throughout the Oman Botanic Garden landscape.",
    gallery: [
      "/images/obg_a.jpg",
      "/images/obg_b.jpg",
      "/images/obg_c.jpg",
      "/images/obg_d.jpg",
      "/images/obg_e.jpg",
      "/images/obg_f.jpg",
      "/images/obg_g.jpg",
      "/images/obg_h.jpg",
    ],
  },
  {
    id: "06",
    src: "/images/Oman-Muscat-Sultan-Qaboos-Grand-Mosque-interior-lg.jpg",
    name: "Sultan Qaboos Mosque Nizwa",
    speed: 1.15,
    yOffset: 10,
    desc: "Travertine flooring work for the Sultan Qaboos Mosque Nizwa.",
    gallery: [
      "/images/nizwamosque_a.jpeg",
      "/images/nizwamosque_b.jpeg",
      "/images/nizwamosque_c.jpeg",
      "/images/nizwamosque_d.jpeg",
    ],
  },
];

export default function Home() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const [counts, setCounts] = useState([0, 0]);
  const timersRef = useRef<ReturnType<typeof setInterval>[]>([]);
  const [selectedProject, setSelectedProject] = useState<SiteImage | null>(null);
  const [galleryIdx, setGalleryIdx] = useState(0);

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
    let totalScroll = track.scrollWidth - window.innerWidth;
    if (totalScroll <= 0) return;

    // Let content height (100vh from sticky div) determine section height — no inline override
    const endStr = () => `+=${totalScroll}`;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        pin: true,
        start: "top top",
        end: endStr,
        scrub: isMobile ? 0.5 : 1,
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
      const parallaxAmount = isMobile ? 0 : (1 - speed) * totalScroll;
      gsap.to(panel, {
        x: parallaxAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: endStr,
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

  // Close modal on Escape
  useEffect(() => {
    if (!selectedProject) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedProject]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [selectedProject]);

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
      >
        <div className="sticky top-0 h-screen overflow-hidden">
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

          <div className="absolute top-[30%] left-6 sm:left-12 z-10 pointer-events-none select-none mix-blend-difference text-left">
            <div className="text-5xl sm:text-6xl md:text-7xl font-bold leading-[0.9] tracking-tight text-white whitespace-nowrap">
              {counts[0]}
              <span className="text-gold-400">+</span>
            </div>
            <div className="text-[10px] uppercase tracking-[0.4em] text-white/60 mt-2">
              Projects
            </div>
          </div>

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

          <div
            ref={trackRef}
            className="flex items-center gap-6 sm:gap-10 px-6 sm:px-10"
            style={{ height: "100vh", width: "max-content" }}
          >
            {siteImages.map((item) => (
              <div
                key={item.id}
                data-speed={item.speed}
                className="relative flex-shrink-0 cursor-pointer"
                style={{
                  width: "clamp(120px, 35vw, 320px)",
                  aspectRatio: "3 / 4",
                  marginTop: `${item.yOffset}%`,
                }}
                onClick={() => {
                  setSelectedProject(item);
                  setGalleryIdx(0);
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
                  <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/80 to-transparent flex items-end p-4">
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

      {/* ===== PROJECT DETAIL MODAL ===== */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/70 backdrop-blur-sm"
          onClick={() => { setSelectedProject(null); setGalleryIdx(0); }}
        >
          <div
            className="relative bg-zinc-900/95 border border-white/10 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => { setSelectedProject(null); setGalleryIdx(0); }}
              className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white/60 hover:text-white hover:bg-black/80 transition-colors text-lg leading-none"
            >
              &#x2715;
            </button>

            <div className="flex flex-col md:flex-row">
              {/* Gallery */}
              <div className="md:w-3/5 p-5 sm:p-6">
                {(() => {
                  const allImages = [selectedProject.src, ...selectedProject.gallery];
                  const displayImage = allImages[galleryIdx];
                  return (
                    <>
                      <div className="relative w-full aspect-[16/10] rounded-lg overflow-hidden border border-white/10">
                        <img
                          src={displayImage}
                          alt={selectedProject.name}
                          className="w-full h-full object-cover"
                        />
                        {allImages.length > 1 && (
                          <>
                            {/* Left arrow */}
                            <button
                              onClick={() =>
                                setGalleryIdx((galleryIdx - 1 + allImages.length) % allImages.length)
                              }
                              className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/80 hover:text-white transition-colors"
                              aria-label="Previous image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M15 18l-6-6 6-6" />
                              </svg>
                            </button>
                            {/* Right arrow */}
                            <button
                              onClick={() =>
                                setGalleryIdx((galleryIdx + 1) % allImages.length)
                              }
                              className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/50 text-white/80 hover:bg-black/80 hover:text-white transition-colors"
                              aria-label="Next image"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                <path d="M9 18l6-6-6-6" />
                              </svg>
                            </button>
                            {/* Counter */}
                            <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-black/60 text-white/80 text-xs font-mono">
                              {galleryIdx + 1} / {allImages.length}
                            </div>
                          </>
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Description */}
              <div className="md:w-2/5 p-5 sm:p-6 pt-0 md:pt-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
                  {selectedProject.name}
                </h3>
                <div className="w-12 h-px bg-gold-500 mb-4" />
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                  {selectedProject.desc}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
