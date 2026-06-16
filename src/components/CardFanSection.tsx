"use client";

import React, { useEffect, useRef, useState } from "react";

const cards = [
  { index: "01", image: "/images/amazing-royal-opera-house.jpg" },
  { index: "02", image: "/images/crowne-plaza-muscat-9874249701-original.jfif" },
  { index: "03", image: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp" },
  { index: "04", image: "/images/haitam-city.jpg" },
  { index: "05", image: "/images/kempinski.webp" },
  { index: "06", image: "/images/Oman-botanic-garden-.jpg" },
  { index: "07", image: "/images/Oman-Beige-Marble.jpg" },
  { index: "08", image: "/images/obsidian-gold-elegance-stockcake.webp" },
];

export default function CardFanSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.scrollHeight;
      const windowHeight = window.innerHeight;
      const offsetTop = rect.top + window.scrollY;
      const raw = (window.scrollY - offsetTop + windowHeight) / (totalHeight - windowHeight);
      setProgress(Math.max(0, Math.min(1, raw)));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const middleIndex = (cards.length - 1) / 2;

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden bg-[#000]">
        {/* Fixed headline top-left */}
        <div className="absolute top-12 left-8 sm:left-12 md:left-16 z-10 select-none pointer-events-none">
          <div className="text-white font-bold text-sm sm:text-base md:text-lg leading-tight tracking-tight">
            <span>HERITAGE FW25/26</span>
            <br />
            <span>COLLECTION(16)</span>
          </div>
        </div>

        {/* Scroll label bottom-right */}
        <div className="absolute bottom-12 right-8 sm:right-12 md:right-16 z-10 select-none pointer-events-none">
          <div className="text-white/60 text-[10px] font-mono tracking-[0.3em]">
            SCROLL TO SURF
          </div>
        </div>

        {/* Cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          {cards.map((card, idx) => {
            const offset = idx - middleIndex;
            const translateX = offset * progress * 220;
            const rotate = offset * progress * 6;

            return (
              <div
                key={card.index}
                className="absolute"
                style={{
                  width: "280px",
                  height: "400px",
                  transform: `translateX(${translateX}px) rotate(${rotate}deg)`,
                  zIndex: cards.length - idx,
                }}
              >
                <div className="relative w-full h-full rounded-lg overflow-hidden border border-white/20 shadow-lg shadow-black/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={card.image}
                    alt={`Card ${card.index}`}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute top-3 left-3 text-white font-mono text-xs font-semibold drop-shadow-lg">
                    {card.index}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
