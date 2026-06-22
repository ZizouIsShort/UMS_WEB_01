"use client";

import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface MarbleItem {
  src: string;
  name: string;
  category: "marble" | "granite";
}

const allItems: MarbleItem[] = [
  { src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp", name: "Golden Calacatta", category: "marble" },
  { src: "/images/obsidian-gold-elegance-stockcake.webp", name: "Obsidian Gold", category: "marble" },
  { src: "/images/Oman-Beige-Marble.jpg", name: "Oman Beige", category: "marble" },
  { src: "/images/marble_desertRoseOman.png", name: "Desert Rose Oman", category: "marble" },
  { src: "/images/marble_diamondWhite.png", name: "Diamond White", category: "marble" },
  { src: "/images/marble_omaniBeige.png", name: "Omani Beige", category: "marble" },
  { src: "/images/marble_omaniPink.png", name: "Omani Pink", category: "marble" },
  { src: "/images/granite_bluePerl.png", name: "Blue Pearl", category: "granite" },
  { src: "/images/granite_crystalYellow.png", name: "Crystal Yellow", category: "granite" },
  { src: "/images/granite_indianBlackAbsolute.png", name: "Indian Black Absolute", category: "granite" },
  { src: "/images/granite_indianBlackGalaxy.png", name: "Indian Black Galaxy", category: "granite" },
  { src: "/images/granite_indianBlackPearl.png", name: "Indian Black Pearl", category: "granite" },
];

type Category = "marble" | "granite";

const DEFAULT_DIMENSIONS = { RADIUS: 320, CARD_W: 200, CARD_H: 280, HEIGHT: "200vh", PERSPECTIVE: "1200px" };

interface MarbleCarouselProps {
  id?: string;
}

export default function MarbleCarousel({ id }: MarbleCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState(DEFAULT_DIMENSIONS);
  const [activeCategory, setActiveCategory] = useState<Category>("marble");

  const filteredItems = allItems.filter((m) => m.category === activeCategory);

  // Calculate dimensions on client-side only after mount
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const newDims = isMobile
      ? { RADIUS: 150, CARD_W: 120, CARD_H: 170, HEIGHT: "150vh", PERSPECTIVE: "800px" }
      : { RADIUS: 320, CARD_W: 200, CARD_H: 280, HEIGHT: "200vh", PERSPECTIVE: "1200px" };
    setDims(newDims);
  }, []);

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
          end: dims.HEIGHT === "150vh" ? "+=150%" : "+=200%",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [dims]);

  const ANGLE_STEP = 360 / filteredItems.length;

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: dims.HEIGHT }}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: dims.PERSPECTIVE }}
      >
        <div className="absolute top-12 left-6 sm:left-10 z-20 select-none mix-blend-difference">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-400">
              Premium {activeCategory === "marble" ? "Marble" : "Granite"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white whitespace-nowrap">
            {activeCategory === "marble" ? "MARBLE" : "GRANITE"}
            <br />
            COLLECTION
          </h2>

          {/* Category switcher */}
          <div className="flex gap-2 mt-6 pointer-events-auto">
            <button
              onClick={() => setActiveCategory("marble")}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded-full border transition-colors ${
                activeCategory === "marble"
                  ? "bg-gold-500/20 border-gold-500 text-gold-300"
                  : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70"
              }`}
            >
              Marble
            </button>
            <button
              onClick={() => setActiveCategory("granite")}
              className={`px-4 py-2 text-[10px] uppercase tracking-[0.2em] rounded-full border transition-colors ${
                activeCategory === "granite"
                  ? "bg-gold-500/20 border-gold-500 text-gold-300"
                  : "border-white/20 text-white/50 hover:border-white/40 hover:text-white/70"
              }`}
            >
              Granite
            </button>
          </div>
        </div>

        <div
          ref={ringRef}
          className="relative"
          style={{
            width: "100px",
            height: `${dims.CARD_H}px`,
            transformStyle: "preserve-3d",
          }}
        >
          {filteredItems.map((item, i) => {
            const angle = i * ANGLE_STEP;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * dims.RADIUS;
            const z = -Math.cos(rad) * dims.RADIUS;

            return (
              <div
                key={`${activeCategory}-${i}`}
                className="absolute inset-0"
                style={{
                  width: `${dims.CARD_W}px`,
                  height: `${dims.CARD_H}px`,
                  transform: `translateX(${x}px) translateZ(${z}px) rotateY(${-angle}deg)`,
                  backfaceVisibility: "hidden",
                }}
              >
                <div className="relative w-full h-full rounded-sm overflow-hidden border border-white/10 shadow-xl shadow-black/50">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-3 text-white text-[10px] font-serif tracking-wide uppercase drop-shadow-lg">
                    {item.name}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="absolute bottom-10 right-6 sm:right-12 z-20 pointer-events-none select-none mix-blend-difference">
          <span className="text-[10px] font-mono tracking-[0.3em] text-white/60">
            SCROLL
          </span>
        </div>
      </div>
    </section>
  );
}
