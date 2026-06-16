"use client";

import React, { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Projects", value: 18, suffix: "+" },
  { label: "Products", value: 20, suffix: "+" },
];

export default function StatsCounter() {
  const [counts, setCounts] = useState([0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          stats.forEach((stat, idx) => {
            const duration = 2000;
            const steps = 60;
            const increment = stat.value / steps;
            let current = 0;
            const timer = setInterval(() => {
              current += increment;
              if (current >= stat.value) {
                setCounts((prev) => {
                  const next = [...prev];
                  next[idx] = stat.value;
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
          });
        }
      },
      { threshold: 0.5 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 px-6 sm:px-12 md:px-20 bg-black border-b border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center gap-16 md:gap-24">
        {stats.map((stat, idx) => (
          <div key={stat.label} className="text-center">
            <div className="text-5xl sm:text-6xl md:text-7xl font-serif font-light text-white tracking-tight">
              {counts[idx]}
              <span className="text-gold-400">{stat.suffix}</span>
            </div>
            <div className="text-xs uppercase tracking-[0.3em] text-zinc-400 mt-3 font-medium">
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
