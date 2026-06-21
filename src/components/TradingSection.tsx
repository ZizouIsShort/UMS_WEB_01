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
    label: "Interior Finishing",
    short: "Interior",
    images: [
      { src: "/images/interior_carpet.png", label: "Carpet Flooring" },
      { src: "/images/interior_parquetflooring.png", label: "Parquet Flooring" },
      { src: "/images/interior_pvcflooring.png", label: "PVC Flooring" },
      { src: "/images/interior_raisedfloor.png", label: "Raised Floor" },
      { src: "/images/interior_wallcovering.png", label: "Wall Covering" },
    ],
  },
  {
    label: "General & Civil Works",
    short: "Civil Works",
    images: [
      { src: "/images/civil_bindingwire.png", label: "Binding Wire" },
      { src: "/images/civil_ironmongeryandhardware.png", label: "Ironmongery & Hardware" },
      { src: "/images/civil_marbleandgranite.png", label: "Marble & Granite" },
      { src: "/images/civil_ppe.png", label: "PPE & Safety" },
      { src: "/images/civil_scaffoldingandframework.png", label: "Scaffolding & Framework" },
      { src: "/images/civil_shutplywoodandtimber.png", label: "Shuttering & Timber" },
      { src: "/images/civil_tileglue.png", label: "Tile Glue & Adhesives" },
      { src: "/images/civil_tiles.png", label: "Ceramic & Porcelain Tiles" },
    ],
  },
  {
    label: "MEP Supplies",
    short: "MEP",
    images: [
      { src: "/images/mep_cablemanagement.png", label: "Cable Management" },
      { src: "/images/mep_dgset.png", label: "DG Set" },
      { src: "/images/mep_erwpipes.png", label: "ERW Pipes" },
      { src: "/images/mep_insulation.png", label: "Insulation Materials" },
      { src: "/images/mep_pipesupportandhangers.png", label: "Pipe Support & Hangers" },
      { src: "/images/mep_pvcpipes.png", label: "PVC Pipes & Fittings" },
      { src: "/images/mep_sanitaryware.png", label: "Sanitaryware" },
    ],
  },
  {
    label: "Road & Infrastructure",
    short: "Road & Infra",
    images: [
      { src: "/images/road_cornerguard.webp", label: "Corner Guard" },
      { src: "/images/road_gatebarrier.jfif", label: "Gate Barrier" },
      { src: "/images/road_hdgguardrail.jfif", label: "HDG Guardrail" },
      { src: "/images/road_manholecover.jpg", label: "Manhole Cover" },
      { src: "/images/road_wheelstoppers.jpg", label: "Wheel Stoppers" },
    ],
  },
];

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

function buildLayouts(numCards: number): CardLayout[] {
  const layouts: CardLayout[] = [];
  for (let i = 0; i < numCards; i++) {
    const cardAngle = gsap.utils.interpolate(-FAN_ANGLE / 2, FAN_ANGLE / 2, i / (numCards - 1));
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
  const selectedRef = useRef<number | null>(null);
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const scrubRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const activeItem = tradingItems[activeTab];
  const images = activeItem.images;
  const NUM_CARDS = Math.min(6, images.length); // Use actual image count, max 6
  const layoutsRef = useRef<CardLayout[]>([]);
  
  // Keep layouts in sync with NUM_CARDS
  if (layoutsRef.current.length !== NUM_CARDS) {
    layoutsRef.current = buildLayouts(NUM_CARDS);
  }

  const cardData: { src: string; label: string }[] = images.slice(0, NUM_CARDS);

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
          const lays = layoutsRef.current;
          cards.forEach((card) => {
            const idx = parseInt(card.dataset.idx || "0", 10);
            const L = lays[idx];
            
            if (!L) return; // Guard against undefined layouts

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
  }, [animKey, NUM_CARDS]);

  useEffect(() => {
    stateRef.current.progress = 0;
    selectedRef.current = null;
    setSelectedIdx(null);
    setAnimKey((k) => k + 1);
  }, [activeTab]);

  useEffect(() => {
    // Reset scroll after animation state is ready (when animKey changes)
    const section = sectionRef.current;
    if (section && animKey > 0) {
      const sectionTop = section.offsetTop;
      window.scrollTo({ top: sectionTop, behavior: "smooth" });
    }
  }, [animKey]);

  const handleTabChange = useCallback((i: number) => {
    setActiveTab(i);
  }, []);

  const handleScrubMouseDown = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    isDragging.current = true;
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    handleScrubMove(clientX);

    const onMove = (ev: MouseEvent | TouchEvent) => {
      if (!isDragging.current) return;
      const cx = "touches" in ev ? ev.touches[0].clientX : (ev as MouseEvent).clientX;
      handleScrubMove(cx);
    };
    const onEnd = () => {
      isDragging.current = false;
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("touchend", onEnd);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
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
          className="relative flex items-center justify-center scale-50 sm:scale-75 lg:scale-100"
          style={{
            width: "auto",
            height: "auto",
            transformStyle: "preserve-3d",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Deck shadow */}
          <div className="absolute w-36 h-52 rounded-xl bg-white/[0.04] blur-lg pointer-events-none" />

          {/* Cards */}
          {cardData.map((item, i) => (
            <div
              key={i}
              data-idx={i}
              onClick={() => handleCardClick(i)}
              onTouchEnd={(e) => {
                e.preventDefault();
                handleCardClick(i);
              }}
              className="deal-card absolute rounded-xl overflow-hidden border border-white/10 shadow-xl shadow-black/50 transition-none cursor-pointer active:scale-95"
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
        <div className="absolute bottom-10 sm:bottom-14 left-1/2 -translate-x-1/2 z-20 w-[80%] max-w-[500px] touch-pan-x">
          <div
            ref={scrubRef}
            className="relative h-8 sm:h-6 flex items-center cursor-pointer select-none"
            onMouseDown={handleScrubMouseDown}
            onTouchStart={handleScrubMouseDown}
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabChange(i);
                    }}
                    className={`w-3 h-3 sm:w-2 sm:h-2 rounded-full transition-all duration-300 cursor-pointer active:scale-75 ${
                      i === activeTab
                        ? "bg-gold-400 shadow-lg shadow-gold-500/50 scale-150"
                        : "bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Select ${item.short}`}
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
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTabChange(i);
                    }}
                    className={`text-[10px] font-medium tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer active:scale-90 ${
                      i === activeTab ? "text-gold-300" : "text-zinc-500 hover:text-zinc-300"
                    }`}
                    aria-label={`Select ${item.short}`}
                  >
                    {item.short}
                  </button>
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
