"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TradingItem {
  label: string;
  short: string;
  images: { src: string; label: string }[];
}

const tradingItems: TradingItem[] = [
  {
    label: "Building Materials Trading",
    short: "Materials",
    images: [
      { src: "/images/haitam-city.jpg", label: "Construction Materials" },
      { src: "/images/crowne-plaza-muscat-9874249701-original.jfif", label: "Facade Cladding" },
    ],
  },
  {
    label: "Supply of all kinds of Marble",
    short: "Marble",
    images: [
      { src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp", label: "Golden Calacatta" },
      { src: "/images/Oman-Beige-Marble.jpg", label: "Oman Beige" },
      { src: "/images/Oman-Muscat-Sultan-Qaboos-Grand-Mosque-interior-lg.jpg", label: "Grand Mosque Marble" },
    ],
  },
  {
    label: "Supply of all kinds of Granite",
    short: "Granite",
    images: [
      { src: "/images/obsidian-gold-elegance-stockcake.webp", label: "Obsidian Gold" },
      { src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp", label: "Polished Granite" },
    ],
  },
  {
    label: "Supply of Natural Stone",
    short: "Natural Stone",
    images: [
      { src: "/images/Oman-Beige-Marble.jpg", label: "Limestone" },
      { src: "/images/amazing-royal-opera-house.jpg", label: "Sandstone" },
    ],
  },
  {
    label: "Supply & Installation of Countertop",
    short: "Countertop",
    images: [
      { src: "/images/kempinski.webp", label: "Luxury Countertop" },
      { src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp", label: "Marble Countertop" },
    ],
  },
  {
    label: "Building & Construction Contracting",
    short: "Contracting",
    images: [
      { src: "/images/crowne-plaza-muscat-9874249701-original.jfif", label: "Hotel Construction" },
      { src: "/images/haitam-city.jpg", label: "Urban Development" },
      { src: "/images/amazing-royal-opera-house.jpg", label: "Landmark Projects" },
    ],
  },
  {
    label: "Logistics Services",
    short: "Logistics",
    images: [
      { src: "/images/Oman-botanic-garden-.jpg", label: "Material Transport" },
      { src: "/images/haitam-city.jpg", label: "Supply Chain" },
    ],
  },
];

const NUM_CARDS = 6;
const CARD_W = 130;
const CARD_H = 185;
const FAN_ANGLE = 170;
const FAN_RADIUS = 400;
const STACK_OFFSET = 2;

interface CardLayout {
  fanX: number;
  fanY: number;
  fanZ: number;
  fanRotY: number;
}

function buildLayouts(): CardLayout[] {
  const layouts: CardLayout[] = [];
  for (let i = 0; i < NUM_CARDS; i++) {
    const cardAngle = gsap.utils.interpolate(-FAN_ANGLE / 2, FAN_ANGLE / 2, i / (NUM_CARDS - 1));
    const rad = (cardAngle * Math.PI) / 180;
    layouts.push({
      fanX: FAN_RADIUS * Math.sin(rad),
      fanY: -40 + i * 13,
      fanZ: FAN_RADIUS * (1 - Math.cos(rad)),
      fanRotY: -cardAngle,
    });
  }
  return layouts;
}

export default function TradingSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stateRef = useRef({ progress: 0 });
  const layouts = useRef<CardLayout[]>(buildLayouts());
  const selectedRef = useRef<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
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

  const handleCardClick = useCallback((idx: number) => {
    const next = selectedRef.current === idx ? null : idx;
    selectedRef.current = next;
    setSelectedIdx(next);
  }, []);

  // Clear selection on scroll
  useEffect(() => {
    const onScroll = () => {
      if (selectedRef.current !== null) {
        selectedRef.current = null;
        setSelectedIdx(null);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const s = stateRef.current;
    s.progress = 0;
    layouts.current = buildLayouts();

    const ctx = gsap.context(() => {
      gsap.to(s, {
        progress: 1,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=400%",
          scrub: 0.3,
          invalidateOnRefresh: true,
        },
        onUpdate: () => {
          const p = s.progress;
          const sel = selectedRef.current;
          const cards = container.querySelectorAll<HTMLDivElement>(".deal-card");
          const lays = layouts.current;
          cards.forEach((card) => {
            const idx = parseInt(card.dataset.idx || "0", 10);
            const L = lays[idx];

            const dealDuration = 0.75 / NUM_CARDS;
            const dealStart = idx * dealDuration;
            const dealProgress = gsap.utils.clamp(0, 1, (p - dealStart) / dealDuration);

            const d = dealProgress;
            const eased = d < 0.5 ? 2 * d * d : 1 - Math.pow(-2 * d + 2, 2) / 2;

            const isSel = sel === idx;
            const isFullyDealt = d > 0.95;

            const stackX = 0;
            const stackZ = -idx * STACK_OFFSET;

            const x = stackX + (L.fanX - stackX) * eased;
            const z = stackZ + (L.fanZ - stackZ) * eased;
            const rotY = L.fanRotY * eased;
            const lift = Math.sin(d * Math.PI) * 50;
            const tilt = Math.sin(d * Math.PI) * 12;
            const scale = 0.9 + 0.1 * eased;
            const brightness = 0.6 + 0.4 * eased;

            const extraZ = isSel && isFullyDealt ? 180 : 0;
            const extraScale = isSel && isFullyDealt ? 0.25 : 0;
            const dimOthers = sel !== null && !isSel ? 0.25 : 0;

            card.style.transform = `translateX(${x.toFixed(1)}px) translateY(${-lift.toFixed(1)}px) translateZ(${(z + extraZ).toFixed(1)}px) rotateX(${(-tilt).toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) scale(${(scale + extraScale).toFixed(3)})`;
            card.style.filter = `brightness(${(brightness - dimOthers).toFixed(2)})`;
            card.style.zIndex = String(isSel && isFullyDealt ? 100 : idx);
          });
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [animKey]);

  useEffect(() => {
    stateRef.current.progress = 0;
    layouts.current = buildLayouts();
    selectedRef.current = null;
    setSelectedIdx(null);
    setAnimKey((k) => k + 1);
  }, [activeTab]);

  const handleTabChange = useCallback((i: number) => {
    setActiveTab(i);
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
      handleTabChange(idx);
    }
  }, [activeTab, handleTabChange]);

  const selectedCard = selectedIdx !== null ? cardData[selectedIdx] : null;

  return (
    <section
      ref={sectionRef}
      id="trading"
      className="relative bg-black"
      style={{ height: "400vh" }}
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

        {/* Container */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-center"
          style={{ width: "1px", height: "1px", transformStyle: "preserve-3d" }}
        >
          {/* Deck shadow */}
          <div className="absolute w-36 h-52 rounded-xl bg-white/[0.04] blur-lg pointer-events-none" />

          {/* Cards */}
          {cardData.map((item, i) => (
            <div
              key={i}
              data-idx={i}
              onClick={() => handleCardClick(i)}
              className="deal-card absolute rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-black/50 transition-none cursor-pointer"
              style={{
                width: CARD_W,
                height: CARD_H,
                transform: `translateX(0px) translateY(0px) translateZ(${-i * STACK_OFFSET}px) scale(0.9)`,
                willChange: "transform, filter",
                filter: "brightness(0.6)",
                zIndex: i,
              }}
            >
              <img
                src={item.src}
                alt={item.label}
                className="w-full h-full object-cover pointer-events-none"
                draggable={false}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-2 left-2 right-2 text-[9px] font-serif tracking-wide uppercase text-white drop-shadow-lg pointer-events-none">
                {item.label}
              </div>
            </div>
          ))}

          {/* Fan arc hint */}
          <div
            className="absolute rounded-full border border-white/[0.03] pointer-events-none"
            style={{
              width: FAN_RADIUS * 2,
              height: FAN_RADIUS * 2,
              transform: "translateZ(0px)",
            }}
          />
        </div>

        {/* Detail Panel */}
        {selectedCard && (
          <div
            key={selectedIdx}
            className="absolute bottom-36 sm:bottom-40 z-30 w-[80%] max-w-[500px] text-center pointer-events-none"
            style={{
              left: "50%",
              transform: "translateX(-50%)",
              animation: "fadeUpPanel 0.45s ease-out both",
            }}
          >
            <style>{`@keyframes fadeUpPanel{from{opacity:0;transform:translateY(14px) translateX(-50%)}to{opacity:1;transform:translateY(0) translateX(-50%)}}`}</style>
            <div className="border-t border-gold-500/40 pt-4">
              <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2">
                {selectedCard.label}
              </h3>
              <p className="text-zinc-500 text-xs sm:text-sm leading-relaxed max-w-[420px] mx-auto">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </p>
            </div>
          </div>
        )}

        {/* Horizontal Scrubber */}
        <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 w-[80%] max-w-[500px]">
          <div
            ref={scrubRef}
            className="relative h-6 flex items-center cursor-pointer select-none"
            onMouseDown={handleScrubMouseDown}
          >
            <div className="absolute left-0 right-0 h-[1px] bg-white/10" />
            <div
              className="absolute left-0 h-[1px] bg-gold-500/60 transition-all duration-300"
              style={{ width: `${(activeTab / (tradingItems.length - 1)) * 100}%` }}
            />
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
          <div className="relative mt-3 h-6">
            {tradingItems.map((item, i) => {
              const pct = i / (tradingItems.length - 1);
              return (
                <div
                  key={i}
                  className="absolute top-0"
                  style={{ left: `${pct * 100}%`, transform: "translateX(-50%)" }}
                >
                  <span className={`text-[10px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 ${
                    i === activeTab ? "text-gold-300" : "text-zinc-500"
                  }`}>
                    {item.short}
                  </span>
                </div>
              );
            })}
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
