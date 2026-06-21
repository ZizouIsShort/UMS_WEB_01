"use client";

import React from "react";
import { Phone, MapPin, Clock } from "lucide-react";

export default function ContactSection() {

  return (
    <footer id="contact" className="relative border-t-2 border-gold-500/60 bg-gradient-to-b from-black via-zinc-950 to-black shadow-[0_-4px_30px_-8px_rgba(212,175,55,0.15)]">
      {/* Top section: contact info */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 pt-12 sm:pt-16 pb-8 sm:pb-12">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <span className="w-6 h-[1px] bg-gold-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-400">Get In Touch</span>
            <span className="w-6 h-[1px] bg-gold-500" />
          </div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-white mb-6 sm:mb-8">
            Contact Us
          </h2>

          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-6 sm:gap-8">
            <div className="flex gap-3 flex-1 min-w-[200px] max-w-[320px] touch-none">
              <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400 shrink-0 h-fit mt-0.5">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Corporate HQ</p>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed">Suite 402, Al-Riyadah Building, Street 4, Ghala Industrial District, Muscat, Sultanate of Oman</p>
              </div>
            </div>

            <div className="flex gap-3 flex-1 min-w-[200px] max-w-[320px] touch-none">
              <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400 shrink-0 h-fit mt-0.5">
                <Phone className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Direct Lines</p>
                <a href="tel:+96824490000" className="text-zinc-300 text-xs sm:text-sm hover:text-gold-300 block mb-0.5 active:scale-95 transition-transform">+968 2449 0000</a>
                <a href="mailto:info@unitedmodernstone.com" className="text-zinc-300 text-xs sm:text-sm hover:text-gold-300 block active:scale-95 transition-transform">info@unitedmodernstone.com</a>
              </div>
            </div>

            <div className="flex gap-3 flex-1 min-w-[200px] max-w-[320px] touch-none">
              <div className="p-2.5 rounded-lg bg-gold-500/10 text-gold-400 shrink-0 h-fit mt-0.5">
                <Clock className="w-4 h-4" />
              </div>
              <div className="text-left">
                <p className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono mb-1">Availability</p>
                <p className="text-zinc-300 text-xs sm:text-sm">Sunday – Thursday:<br />8:00 AM – 5:00 PM<br />Fri &amp; Sat: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-20 py-4 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3 justify-center sm:justify-start">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/Adobe Express - file.png" alt="UMS" className="h-6 w-auto" draggable={false} />
            <span className="text-[9px] sm:text-[10px] text-zinc-600 font-mono tracking-wide">
              &copy; {new Date().getFullYear()} United Modern Stone SPC
            </span>
          </div>
          <div className="text-[9px] sm:text-[10px] text-zinc-700 font-mono tracking-wide">
            Civil Stone Craftsmen &mdash; Sultanate of Oman
          </div>
        </div>
      </div>
    </footer>
  );
}
