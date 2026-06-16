"use client";

import React, { useState, useMemo } from "react";
import { X, MapPin, Calendar, LayoutGrid, Award } from "lucide-react";

interface Project {
  id: string;
  name: string;
  category: "cultural" | "hospitality" | "public";
  location: string;
  year: string;
  image: string;
  architect: string;
  scope: string;
  description: string;
}

const projectsData: Project[] = [
  {
    id: "royal-opera",
    name: "Royal Opera House Muscat",
    category: "cultural",
    location: "Shati Al-Qurm, Muscat",
    year: "2011 & Restoration 2023",
    image: "/images/amazing-royal-opera-house.jpg",
    architect: "WATG & COWI",
    scope: "Traditional Omani Desert Rose Travertine & Portuguese Limestone masonry restoration, interior floor layout mapping.",
    description: "Muscat's premier cultural landmark. We supplied and meticulously aligned premium light-beige natural limestone columns and traditional hand-carved panels, mirroring classic Islamic architectural dimensions with modern support structures."
  },
  {
    id: "crowne-plaza",
    name: "Crowne Plaza Muscat",
    category: "hospitality",
    location: "Qurm Heights, Muscat",
    year: "2018",
    image: "/images/crowne-plaza-muscat-9874249701-original.jfif",
    architect: "Design Design LLC",
    scope: "Exterior cliffside elevation cladding, custom infinity pool marble decks, and public garden walkways.",
    description: "Perched over the Gulf of Oman, this resort required highly durable, salt-resistant stone cladding. Our team processed and installed dense, textured travertine slabs and slip-resistant swimming pool copings to withstand severe coastal exposure."
  },
  {
    id: "botanic-garden",
    name: "Oman Botanic Garden",
    category: "public",
    location: "Al Khoud, Muscat",
    year: "2024",
    image: "/images/Oman-botanic-garden-.jpg",
    architect: "Grimshaw Architects",
    scope: "Custom-machined self-supporting limestone arches, pathway pavings, and interior landscape rockwork.",
    description: "One of the world's largest bioclimatic domes. United Modern Stone supplied structural stone masonry for the massive habitat enclosures, integrating natural, irregular quarry rock faces that blend seamlessly with the surrounding Jabal Akhdar topography."
  },
  {
    id: "grand-mosque",
    name: "Sultan Qaboos Grand Mosque Interior",
    category: "cultural",
    location: "Bawshar, Muscat",
    year: "2020 Restoration",
    image: "/images/Oman-Muscat-Sultan-Qaboos-Grand-Mosque-interior-lg.jpg",
    architect: "Quad Design",
    scope: "Exquisite interior wall calligraphic relief carving and flooring restoration using premium Carrara Bianco slabs.",
    description: "During the structural maintenance phase, our master artisans restored damaged parts of the delicate wall reliefs and polished the expansive marble floor surfaces, securing the visual grandeur of this national treasure."
  }
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<"all" | "cultural" | "hospitality" | "public">("all");
  const [activeLightboxProject, setActiveLightboxProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      return activeCategory === "all" || project.category === activeCategory;
    });
  }, [activeCategory]);

  return (
    <section id="projects" className="py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-b border-white/5">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center space-x-2 text-gold-400 mb-3">
            <span className="w-6 h-[1px] bg-gold-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Our Portfolio</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white leading-tight">
            Monumental Stone <span className="italic gold-shimmer font-serif">& Landmark Elevations</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-xl font-light">
            Witness our master masonry at the Sultanate's most prestigious cultural institutions, luxury resorts, and forward-looking public structures.
          </p>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2 justify-start mb-12">
        {(["all", "cultural", "hospitality", "public"] as const).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
              activeCategory === category
                ? "bg-gold-500 text-zinc-950 shadow-md shadow-gold-500/10"
                : "bg-zinc-900/60 text-zinc-400 border border-white/5 hover:text-white hover:bg-zinc-900"
            }`}
          >
            {category === "all" ? "All Projects" : `${category}`}
          </button>
        ))}
      </div>

      {/* Grid Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => setActiveLightboxProject(project)}
            className="group relative h-96 sm:h-[450px] rounded-3xl overflow-hidden cursor-pointer shadow-lg border border-white/5"
          >
            {/* Background Image */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.image}
              alt={project.name}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1200ms]"
              loading="lazy"
            />
            {/* Ambient Dark Gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-black/30 opacity-80 group-hover:opacity-90 transition-opacity" />

            {/* Content overlay */}
            <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-between z-10">
              
              {/* Top Row: Year */}
              <div className="flex justify-between items-start">
                <span className="py-1 px-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-wider text-gold-300 font-bold">
                  {project.category}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-zinc-300 font-mono">
                  <Calendar className="w-3 h-3 text-gold-400" />
                  {project.year.split(" ")[0]}
                </span>
              </div>

              {/* Bottom Row: Text Details */}
              <div className="transform translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex items-center gap-1.5 text-xs text-gold-300 font-mono mb-2">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{project.location}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-serif text-white font-medium mb-2 group-hover:text-gold-200 transition-colors">
                  {project.name}
                </h3>
                <p className="text-zinc-400 text-xs font-light line-clamp-2 max-w-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 leading-relaxed">
                  {project.description}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <span>View Project Details</span>
                  <span className="w-6 h-[1px] bg-white group-hover:w-10 transition-all" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project details light box */}
      {activeLightboxProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-white/10 p-6 sm:p-8 md:p-10 flex flex-col gap-8">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveLightboxProject(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all z-10"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Image Header */}
            <div className="relative h-64 sm:h-96 w-full rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeLightboxProject.image}
                alt={activeLightboxProject.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
            </div>

            {/* Core Info Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Left Details Panel */}
              <div className="md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="py-1.5 px-3 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 text-[9px] uppercase tracking-wider font-bold">
                    {activeLightboxProject.category}
                  </span>
                  <span className="text-[11px] text-zinc-400 flex items-center gap-1 font-mono">
                    <Calendar className="w-3.5 h-3.5 text-gold-400" />
                    Project Period: {activeLightboxProject.year}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-serif text-white font-light">
                  {activeLightboxProject.name}
                </h3>

                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                  {activeLightboxProject.description}
                </p>
              </div>

              {/* Right Sidebar Specs */}
              <div className="bg-black/30 border border-white/5 rounded-2xl p-6 space-y-5">
                <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 border-b border-white/5 pb-2">
                  Architectural Blueprint
                </h4>

                <div className="space-y-4">
                  <div className="flex gap-3">
                    <MapPin className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Location</span>
                      <span className="text-xs text-white font-medium">{activeLightboxProject.location}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Award className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Design Lead</span>
                      <span className="text-xs text-white font-medium">{activeLightboxProject.architect}</span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <LayoutGrid className="w-4 h-4 text-gold-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Scope of Stone Work</span>
                      <span className="text-xs text-zinc-300 font-light leading-normal block">{activeLightboxProject.scope}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
