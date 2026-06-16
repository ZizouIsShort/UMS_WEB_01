"use client";

import React, { useState, useEffect } from "react";
import { ArrowDown, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";

const slides = [
  {
    image: "/images/amazing-royal-opera-house.jpg",
    title: "Civil Stone Craftsmen",
    subtitle: "Landmark Elevations",
    description: "United Modern Stone SPC is Oman's premier masonry contractor, bringing precision and artistry to cultural treasures and government monuments.",
    tag: "Landmark Heritage"
  },
  {
    image: "/images/crowne-plaza-muscat-9874249701-original.jfif",
    title: "Luxury Hospitality",
    subtitle: "Precision Cladding for Five-Star Destinations",
    description: "From curved pool decks to majestic facades, our premium natural stone installations define Muscat's luxury coastal architecture.",
    tag: "Premium Resorts"
  },
  {
    image: "/images/Oman-botanic-garden-.jpg",
    title: "Botanical Landmarks",
    subtitle: "Pioneering Sustainable Stone Structures",
    description: "Integrating massive, custom-machined limestone and sandstone elements in world-class bioclimatic domes and eco-gardens.",
    tag: "Eco-Engineering"
  },
  {
    image: "/images/kempinski.webp",
    title: "Exquisite Interiors",
    subtitle: "Fine Italian Marble & Bespoke Waterjets",
    description: "Uncompromising quality slabs tailored for grand lobbies, high-end residences, and sophisticated commercial spaces.",
    tag: "Bespoke Interiors"
  },
  {
    image: "/images/haitam-city.jpg",
    title: "Future Landscapes",
    subtitle: "Urban Stone Engineering at Scale",
    description: "Empowering Oman's visionary smart cities with high-performance paving, structural granite, and modern elevations.",
    tag: "Urban Development"
  }
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 6000); // 6 seconds auto-rotate

    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const handleScrollDown = () => {
    const el = document.getElementById("products");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex flex-col justify-between pt-32 pb-8 px-6 sm:px-12 md:px-20">
      
      {/* Background Slideshow */}
      <div className="absolute inset-0 z-0">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1500 ease-in-out ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image with Ken Burns animation */}
            <div
              className={`w-full h-full bg-cover bg-center transition-transform duration-1000 ${
                idx === currentIndex ? "animate-kenburns scale-100" : "scale-105"
              }`}
              style={{ backgroundImage: `url('${slide.image}')` }}
            />
            {/* Radial & Linear Overlays to ensure top readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/80 via-black/45 to-zinc-950" />
            <div className="absolute inset-0 bg-radial-gradient from-transparent to-zinc-950/80" />
          </div>
        ))}
      </div>

      <div /> {/* Top spacing helper */}

      {/* Main Content Info */}
      <div className="relative z-10 max-w-4xl self-start text-left mt-8 md:mt-16 select-none">
        
        {/* Established Crest Tag */}
        <div className="flex items-center space-x-3 mb-6 animate-fade-in">
          <span className="w-8 h-[1px] bg-gold-400" />
          <span className="text-[10px] uppercase font-medium tracking-[0.4em] text-gold-300">
            {slides[currentIndex].tag}
          </span>
          <span className="w-3 h-[1px] bg-gold-400/50" />
          <span className="text-[9px] font-mono tracking-[0.2em] text-zinc-400">
            Muscat, Sultanate of Oman
          </span>
        </div>

        {/* Serif Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif font-light leading-[1.1] text-white tracking-tight mb-4 transition-all duration-700">
          {slides[currentIndex].title.split(" & ").map((part, i) => (
            <span key={i} className="block">
              {i > 0 && "& "}
              {i === 0 ? part : <span className="gold-shimmer italic font-serif">{part}</span>}
            </span>
          ))}
          <span className="gold-shimmer italic font-serif">{slides[currentIndex].subtitle}</span>
        </h1>

        {/* Description Text */}
        <p className="max-w-2xl font-light text-zinc-300 text-sm sm:text-base leading-relaxed mb-8 transition-opacity duration-500">
          {slides[currentIndex].description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 items-center">
          <button
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-lg"
          >
            Explore Slabs
          </button>
          <button
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            className="px-7 py-3.5 rounded-full border border-white/10 hover:border-gold-300/30 text-white hover:text-gold-300 text-xs font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-md bg-white/5"
          >
            Our Landmarks
          </button>
        </div>
      </div>

      {/* Slide Navigation Controls */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 mt-12">
        
        {/* Left Side: Dots & Play/Pause */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-2.5 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          
          <div className="flex items-center gap-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  idx === currentIndex ? "w-8 bg-gold-400" : "w-2 bg-white/20"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right Side: Navigation Arrows & Scroll Indicator */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full border border-white/10 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/5 transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={handleScrollDown}
            className="hidden sm:flex items-center gap-2 group text-zinc-400 hover:text-gold-300 text-xs font-semibold uppercase tracking-wider transition-all"
          >
            <span>Scroll</span>
            <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}
