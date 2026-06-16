"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TradingItem {
  label: string;
  images: { src: string; label: string }[];
}

const tradingItems: TradingItem[] = [
  {
    label: "Building Materials Trading",
    images: [
      { src: "/images/haitam-city.jpg", label: "Construction Materials" },
      { src: "/images/crowne-plaza-muscat-9874249701-original.jfif", label: "Facade Cladding" },
    ],
  },
  {
    label: "Supply of all kinds of Marble",
    images: [
      { src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp", label: "Golden Calacatta" },
      { src: "/images/Oman-Beige-Marble.jpg", label: "Oman Beige" },
      { src: "/images/Oman-Muscat-Sultan-Qaboos-Grand-Mosque-interior-lg.jpg", label: "Grand Mosque Marble" },
    ],
  },
  {
    label: "Supply of all kinds of Granite",
    images: [
      { src: "/images/obsidian-gold-elegance-stockcake.webp", label: "Obsidian Gold" },
      { src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp", label: "Polished Granite" },
    ],
  },
  {
    label: "Supply of Natural Stone",
    images: [
      { src: "/images/Oman-Beige-Marble.jpg", label: "Limestone" },
      { src: "/images/amazing-royal-opera-house.jpg", label: "Sandstone" },
    ],
  },
  {
    label: "Supply & Installation of Countertop",
    images: [
      { src: "/images/kempinski.webp", label: "Luxury Countertop" },
      { src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp", label: "Marble Countertop" },
    ],
  },
  {
    label: "Building & Construction Contracting",
    images: [
      { src: "/images/crowne-plaza-muscat-9874249701-original.jfif", label: "Hotel Construction" },
      { src: "/images/haitam-city.jpg", label: "Urban Development" },
      { src: "/images/amazing-royal-opera-house.jpg", label: "Landmark Projects" },
    ],
  },
  {
    label: "Logistics Services",
    images: [
      { src: "/images/Oman-botanic-garden-.jpg", label: "Material Transport" },
      { src: "/images/haitam-city.jpg", label: "Supply Chain" },
    ],
  },
];

const NUM_CARDS = 10;
const RADIUS = 320;
const ANGLE_STEP = 360 / NUM_CARDS;
const CARD_W = 200;
const CARD_H = 280;
const BULGE = 70;
const Y_AMP = 60;

export default function TradingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const scrubRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeItem = tradingItems[activeTab];
  const images = activeItem.images;

  const cardData: { src: string; label: string }[] = [];
  for (let i = 0; i < NUM_CARDS; i++) {
    cardData.push(images[i % images.length]);
  }

  useEffect(() => {
    const section = sectionRef.current;
    const ring = ringRef.current;
    if (!section || !ring) return;

    const ctx = gsap.context(() => {
      gsap.to(ring, {
        rotationY: 360,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=200%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [animKey]);

  const handleTabChange = useCallback((i: number) => {
    setActiveTab(i);
    setAnimKey((k) => k + 1);
  }, []);

  const handleScrubMouseDown = useCallback((e: React.MouseEvent) => {
    isDragging.current = true;
    handleScrubMove(e.clientX);

    const onMouseMove = (ev: MouseEvent) => {
      if (isDragging.current) handleScrubMove(ev.clientX);
    };
    const onMouseUp = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  }, []);

  const handleScrubMove = useCallback((clientX: number) => {
    const el = scrubRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = gsap.utils.clamp(0, 1, (clientX - rect.left) / rect.width);
    const idx = Math.round(x * (tradingItems.length - 1));
    if (idx !== activeTab) {
      setActiveTab(idx);
      setAnimKey((k) => k + 1);
    }
  }, [activeTab]);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "200vh" }}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        {/* Heading */}
        <div className="absolute top-12 left-6 sm:left-10 z-20 pointer-events-none select-none mix-blend-difference">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-400">Official Trading</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white whitespace-nowrap">
            TRADING
            <br />
            ACTIVITIES
          </h2>
        </div>

        {/* 3D Convex Ring */}
        <div
          ref={ringRef}
          className="relative"
          style={{
            width: "100px",
            height: "300px",
            transformStyle: "preserve-3d",
          }}
        >
          {/* Central glow */}
          <div className="absolute w-40 h-40 rounded-full bg-gold-500/10 blur-3xl pointer-events-none animate-pulse" style={{ left: "-70px", top: "40px" }} />

          {cardData.map((item, i) => {
            const angle = i * ANGLE_STEP;
            const rad = (angle * Math.PI) / 180;
            const forwardness = Math.cos(rad);
            const x = Math.sin(rad) * RADIUS;
            const z = -Math.cos(rad) * RADIUS + forwardness * BULGE;
            const y = Math.sin(rad * 2) * Y_AMP;

            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transform: `translateX(${x}px) translateY(${y}px) translateZ(${z}px) rotateY(${-angle}deg)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 shadow-xl shadow-black/50">
                  <img
                    src={item.src}
                    alt={item.label}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-[10px] font-serif tracking-wide uppercase drop-shadow-lg">
                    {item.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Category name displayed */}
        <div className="absolute bottom-28 sm:bottom-32 left-1/2 -translate-x-1/2 z-20 pointer-events-none text-center">
          <div className="text-[10px] font-mono tracking-[0.3em] text-gold-400/80 uppercase mb-1">Current Category</div>
          <div className="text-sm sm:text-base font-medium text-white/90 tracking-wide">
            {activeItem.label}
          </div>
        </div>

        {/* Horizontal Scrubber */}
        <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 w-[80%] max-w-[500px]">
          <div
            ref={scrubRef}
            className="relative h-6 flex items-center cursor-pointer select-none"
            onMouseDown={handleScrubMouseDown}
          >
            {/* Track */}
            <div className="absolute left-0 right-0 h-[1px] bg-white/10" />
            {/* Active track */}
            <div
              className="absolute left-0 h-[1px] bg-gold-500/60 transition-all duration-300"
              style={{ width: `${(activeTab / (tradingItems.length - 1)) * 100}%` }}
            />
            {/* Dots */}
            {tradingItems.map((item, i) => {
              const pct = i / (tradingItems.length - 1);
              return (
                <div
                  key={i}
                  className="absolute flex items-center justify-center"
                  style={{ left: `${pct * 100}%`, transform: "translateX(-50%)" }}
                >
                  <div
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === activeTab
                        ? "bg-gold-400 shadow-lg shadow-gold-500/50 scale-150"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                  />
                </div>
              );
            })}
          </div>
          {/* Labels */}
          <div className="flex justify-between mt-2">
            <span className="text-[8px] font-mono tracking-[0.2em] text-zinc-500">01</span>
            <span className="text-[8px] font-mono tracking-[0.2em] text-zinc-500">
              {String(tradingItems.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-10 right-6 sm:right-12 z-20 pointer-events-none select-none mix-blend-difference">
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/60">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}
