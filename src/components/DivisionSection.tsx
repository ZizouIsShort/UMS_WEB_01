"use client";

import React, { useState } from "react";
import { Hammer, Factory, Landmark, Mountain } from "lucide-react";

interface Division {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  name: string;
  shortDesc: string;
  longDesc: string;
  image: string;
  highlights: string[];
}

const divisions: Division[] = [
  {
    id: "quarrying",
    icon: Mountain,
    name: "Quarry Extraction",
    shortDesc: "Sustainable sourcing of raw blocks directly from Omani deposits.",
    longDesc: "United Modern Stone operates multiple quarry fields in Ibri and interior Oman, ensuring a secure and continuous supply of premier Oman Beige limestone and desert rose marble blocks. Our methods focus on minimal ecological disruption and high raw yields.",
    image: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp",
    highlights: ["Sourced in Oman", "10,000m³ Annual Block Capacity", "Advanced Wire-Saw Extraction", "Full Geological Testing"]
  },
  {
    id: "processing",
    icon: Factory,
    name: "Precision Processing",
    shortDesc: "High-throughput CNC milling, edge profiling, and waterjet finishes.",
    longDesc: "Our Muscat-based industrial complex features modern Italian gangsaws, CNC slab-profiling robots, and precision high-pressure waterjet machinery. We process raw blocks into custom-sized cladding, ornate screens, and high-polished luxury slabs.",
    image: "/images/obsidian-gold-elegance-stockcake.webp",
    highlights: ["CNC 5-Axis Profiling", "Calibrated Waterjet Detailing", "Custom Slab Finishes", "Rigorous ISO Quality Checking"]
  },
  {
    id: "masonry",
    icon: Hammer,
    name: "Landmark Masonry",
    shortDesc: "Structural facade cladding and architectural installations at scale.",
    longDesc: "Our team of on-site craftsmen executes large-scale natural stone claddings, architectural columns, and paving under strict ASTM standards. We coordinate closely with chief structural designers to deliver safe, enduring stone elevations.",
    image: "/images/crowne-plaza-muscat-9874249701-original.jfif",
    highlights: ["Self-Supporting Stone Arches", "Dry-Cladding Systems", "Large-Format Floor Layouts", "BIM Integration"]
  },
  {
    id: "restoration",
    icon: Landmark,
    name: "Conservation & Heritage",
    shortDesc: "Specialized restorative services for historical and royal monuments.",
    longDesc: "With special credentials from Omani heritage committees, our conservation division restores decaying structures, removes salt encrustations, and replaces worn masonry in royal castles, major public mosques, and architectural assets.",
    image: "/images/amazing-royal-opera-house.jpg",
    highlights: ["Historic Mortar Formulations", "Archaeological Alignment", "Sultanate Landmark Upkeep", "Hand-Carved Replication"]
  }
];

export default function DivisionSection() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="division" className="relative py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-b border-white/5">
      
      <div className="absolute top-12 left-6 sm:left-10 z-10 pointer-events-none select-none mix-blend-difference">
        <div className="flex items-center space-x-2 mb-3">
          <span className="w-6 h-[1px] bg-gold-500" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-400">Corporate Divisions</span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white whitespace-nowrap">
          INTEGRATED
          <br />
          OPERATIONS
        </h2>
      </div>

      <div className="pt-32">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch min-h-[500px]">
          
          {/* Left Hand Options Panel */}
          <div className="w-full lg:w-2/5 flex flex-col gap-3 justify-center">
            {divisions.map((div, idx) => {
              const Icon = div.icon;
              const isActive = idx === activeTab;
              return (
                <button
                  key={div.id}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-6 rounded-2xl border transition-all-500 relative overflow-hidden ${
                    isActive
                      ? "border-gold-500/30 shadow-md shadow-gold-500/5"
                      : "border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="absolute inset-0 z-0">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={div.image}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                    <div className={`absolute inset-0 ${isActive ? "bg-black/60" : "bg-black/80"}`} />
                  </div>
                  <div className="relative z-10 flex items-start gap-4">
                    <div
                      className={`p-3 rounded-xl transition-colors shrink-0 ${
                        isActive ? "bg-gold-500 text-zinc-950" : "bg-white/10 text-zinc-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3
                        className={`text-base font-semibold uppercase tracking-wider transition-colors ${
                          isActive ? "text-gold-300" : "text-white"
                        }`}
                      >
                        {div.name}
                      </h3>
                      <p className="text-zinc-300 text-xs mt-1.5 leading-normal font-light">
                        {div.shortDesc}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Hand Graphic & Info Panel */}
          <div className="w-full lg:w-3/5 rounded-3xl overflow-hidden glass-card border border-white/10 flex flex-col justify-between relative">
            
            {/* Background Image Accent */}
            <div className="absolute inset-0 z-0 opacity-15 pointer-events-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={divisions[activeTab].image}
                alt=""
                className="w-full h-full object-cover filter grayscale blur-[2px]"
              />
            </div>

            <div className="relative z-10 p-8 sm:p-12 flex flex-col justify-between h-full">
              <div>
                <div className="text-[10px] text-gold-400 uppercase tracking-widest font-mono mb-4">
                  United Modern Stone Operations
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-light mb-6">
                  {divisions[activeTab].name}
                </h3>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light mb-8 max-w-2xl">
                  {divisions[activeTab].longDesc}
                </p>
              </div>

              {/* highlights grid */}
              <div>
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-4">
                  Operational Highlights
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {divisions[activeTab].highlights.map((highlight, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-black/45 border border-white/5 text-[11px] font-semibold text-zinc-300 tracking-wide"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold-400 shrink-0" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
