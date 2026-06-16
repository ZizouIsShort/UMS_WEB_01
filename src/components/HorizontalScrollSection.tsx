"use client";

import React, { useRef, useEffect, useCallback } from "react";

const images = [
  { src: "/images/amazing-royal-opera-house.jpg", name: "Royal Opera House" },
  { src: "/images/crowne-plaza-muscat-9874249701-original.jfif", name: "Crowne Plaza Muscat" },
  { src: "/images/haitam-city.jpg", name: "Haitam City" },
  { src: "/images/kempinski.webp", name: "Kempinski Hotel" },
  { src: "/images/Oman-botanic-garden-.jpg", name: "Botanic Garden" },
  { src: "/images/Oman-Muscat-Sultan-Qaboos-Grand-Mosque-interior-lg.jpg", name: "Sultan Qaboos Grand Mosque" },
];

const ITEMS = [...images, ...images, ...images];

export default function HorizontalScrollSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);

  const clamp = useCallback((val: number) => {
    if (!trackRef.current) return 0;
    const maxScroll = trackRef.current.scrollWidth - window.innerWidth;
    return Math.max(-maxScroll, Math.min(0, val));
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onWheel = (e: WheelEvent) => {
      offsetRef.current = clamp(offsetRef.current - e.deltaY);
      track.style.transform = `translateX(${offsetRef.current}px)`;
    };

    const onTouchStart = (e: TouchEvent) => {
      isDownRef.current = true;
      startXRef.current = e.touches[0].pageX;
      scrollLeftRef.current = offsetRef.current;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDownRef.current) return;
      const x = e.touches[0].pageX;
      const walk = (x - startXRef.current) * 1.5;
      offsetRef.current = clamp(scrollLeftRef.current + walk);
      track.style.transform = `translateX(${offsetRef.current}px)`;
    };

    const onTouchEnd = () => {
      isDownRef.current = false;
    };

    track.addEventListener("wheel", onWheel, { passive: true });
    track.addEventListener("touchstart", onTouchStart, { passive: true });
    track.addEventListener("touchmove", onTouchMove, { passive: true });
    track.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      track.removeEventListener("wheel", onWheel);
      track.removeEventListener("touchstart", onTouchStart);
      track.removeEventListener("touchmove", onTouchMove);
      track.removeEventListener("touchend", onTouchEnd);
    };
  }, [clamp]);

  return (
    <section className="relative py-16 bg-black overflow-hidden border-y border-white/5">
      <div className="px-6 sm:px-10 mb-6">
        <span className="text-[10px] font-mono tracking-[0.3em] text-zinc-500 uppercase">
          Featured Projects
        </span>
      </div>
      <div className="overflow-hidden cursor-grab active:cursor-grabbing select-none">
        <div
          ref={trackRef}
          className="flex gap-6 px-6 sm:px-10"
          style={{ width: "max-content" }}
        >
          {ITEMS.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 rounded-sm overflow-hidden border border-white/10 group"
              style={{ width: "220px", aspectRatio: "3 / 4" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.src}
                alt={item.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                draggable={false}
              />
              <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 pointer-events-none">
                <span className="text-white text-[10px] font-medium tracking-wide uppercase">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
