"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const marbleImages = [
  {
    src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp",
    name: "Golden Calacatta",
  },
  {
    src: "/images/obsidian-gold-elegance-stockcake.webp",
    name: "Obsidian Gold",
  },
  { src: "/images/Oman-Beige-Marble.jpg", name: "Oman Beige" },
  {
    src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp",
    name: "Golden Calacatta",
  },
  {
    src: "/images/obsidian-gold-elegance-stockcake.webp",
    name: "Obsidian Gold",
  },
  { src: "/images/Oman-Beige-Marble.jpg", name: "Oman Beige" },
  {
    src: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp",
    name: "Golden Calacatta",
  },
  {
    src: "/images/obsidian-gold-elegance-stockcake.webp",
    name: "Obsidian Gold",
  },
];

const RADIUS = 320;
const ANGLE_STEP = 360 / marbleImages.length;

interface MarbleCarouselProps {
  id?: string;
}

export default function MarbleCarousel({ id }: MarbleCarouselProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

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
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: "200vh" }}
    >
      <div
        className="sticky top-0 h-screen flex items-center justify-center overflow-hidden"
        style={{ perspective: "1200px" }}
      >
        <div className="absolute top-12 left-6 sm:left-10 z-20 pointer-events-none select-none mix-blend-difference">
          <div className="flex items-center space-x-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-400">Premium Marble</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white whitespace-nowrap">
            MARBLE
            <br />
            COLLECTION
          </h2>
        </div>

        <div
          ref={ringRef}
          className="relative"
          style={{
            width: "100px",
            height: "300px",
            transformStyle: "preserve-3d",
          }}
        >
          {marbleImages.map((item, i) => {
            const angle = i * ANGLE_STEP;
            const rad = (angle * Math.PI) / 180;
            const x = Math.sin(rad) * RADIUS;
            const z = -Math.cos(rad) * RADIUS;

            return (
              <div
                key={i}
                className="absolute inset-0"
                style={{
                  width: "200px",
                  height: "280px",
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
