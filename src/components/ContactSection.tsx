"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    organizationName: "",
    organizationDesignation: "",
    enquiryType: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send");

      setFormStatus("success");
      setFormData({
        name: "",
        number: "",
        email: "",
        organizationName: "",
        organizationDesignation: "",
        enquiryType: "",
        message: "",
      });
    } catch {
      setFormStatus("idle");
      alert("Failed to send enquiry. Please try again.");
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24"
    >
      <div className="absolute top-12 left-6 sm:left-10 z-10 pointer-events-none select-none mix-blend-difference">
        <div className="flex items-center space-x-2 mb-3">
          <span className="w-6 h-[1px] bg-gold-500" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-gold-400">
            Get In Touch
          </span>
        </div>
        <h2 className="text-4xl sm:text-5xl md:text-7xl font-bold leading-[0.9] tracking-tighter text-white whitespace-nowrap">
          CONTACT US
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 sm:px-12 md:px-20 pt-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Side: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Card: Address */}
            <div className="p-6 rounded-2xl glass-card flex gap-4">
              <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 shrink-0 h-fit">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono block mb-1">
                  Corporate HQ
                </span>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                  Muscat Office
                </h4>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                  Suite 402, Al-Riyadah Building, Street 4, Ghala Industrial
                  District, Muscat, Sultanate of Oman
                </p>
              </div>
            </div>

            {/* Card: Telephones & Emails */}
            <div className="p-6 rounded-2xl glass-card flex gap-4">
              <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 shrink-0 h-fit">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono block mb-1">
                  Direct Lines
                </span>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                  Call & Write
                </h4>
                <div className="space-y-1">
                  <a
                    href="tel:+96824490000"
                    className="text-zinc-300 text-xs sm:text-sm font-light hover:text-gold-300 block"
                  >
                    +968 2449 0000 (Oman Headquarters)
                  </a>
                  <a
                    href="mailto:info@unitedmodernstone.com"
                    className="text-zinc-300 text-xs sm:text-sm font-light hover:text-gold-300 block"
                  >
                    info@unitedmodernstone.com
                  </a>
                </div>
              </div>
            </div>

            {/* Card: Work Hours */}
            <div className="p-6 rounded-2xl glass-card flex gap-4">
              <div className="p-3 rounded-xl bg-gold-500/10 text-gold-400 shrink-0 h-fit">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-mono block mb-1">
                  Availability
                </span>
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-2">
                  Operation Hours
                </h4>
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed font-light">
                  Sunday – Thursday: 8:00 AM – 5:00 PM <br />
                  Friday & Saturday: Closed
                </p>
              </div>
            </div>
          </div>

          {/* Right Side: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl glass-card">
              {formStatus === "success" ? (
                <div className="py-12 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gold-500/10 text-gold-400 flex items-center justify-center mb-6">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-serif text-white font-light mb-3">
                    Inquiry Logged
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-light leading-relaxed">
                    Thank you for contacting United Modern Stone SPC. A senior
                    masonry estimator will review your specifications and follow
                    up within 24 business hours.
                  </p>
                  <button
                    onClick={() => setFormStatus("idle")}
                    className="mt-8 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Name & Number */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-2"
                      >
                        Name <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="w-full bg-black/30 border border-white/10 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-zinc-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="number"
                        className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-2"
                      >
                        Number <span className="text-gold-400">*</span>
                      </label>
                      <input
                        type="tel"
                        id="number"
                        name="number"
                        required
                        value={formData.number}
                        onChange={handleChange}
                        placeholder="+968 9000 0000"
                        className="w-full bg-black/30 border border-white/10 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-2"
                    >
                      Email <span className="text-gold-400">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      className="w-full bg-black/30 border border-white/10 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-zinc-600 transition-colors"
                    />
                  </div>

                  {/* Organization Name & Designation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="organizationName"
                        className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-2"
                      >
                        Organization Name{" "}
                        <span className="text-zinc-600">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="organizationName"
                        name="organizationName"
                        value={formData.organizationName}
                        onChange={handleChange}
                        placeholder="Company / Institution"
                        className="w-full bg-black/30 border border-white/10 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-zinc-600 transition-colors"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="organizationDesignation"
                        className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-2"
                      >
                        Designation{" "}
                        <span className="text-zinc-600">(optional)</span>
                      </label>
                      <input
                        type="text"
                        id="organizationDesignation"
                        name="organizationDesignation"
                        value={formData.organizationDesignation}
                        onChange={handleChange}
                        placeholder="Your role / title"
                        className="w-full bg-black/30 border border-white/10 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-zinc-600 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Enquiry Type Dropdown */}
                  <div>
                    <label
                      htmlFor="enquiryType"
                      className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-2"
                    >
                      Type of Enquiry <span className="text-gold-400">*</span>
                    </label>
                    <select
                      id="enquiryType"
                      name="enquiryType"
                      required
                      value={formData.enquiryType}
                      onChange={handleChange}
                      className="w-full bg-zinc-950 border border-white/10 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>
                        Select enquiry type
                      </option>
                      <option value="Marble">Marble</option>
                      <option value="Trading">Trading</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="text-[9px] uppercase font-bold tracking-wider text-zinc-400 block mb-2"
                    >
                      The Enquiry <span className="text-gold-400">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Describe your enquiry in detail..."
                      className="w-full bg-black/30 border border-white/10 focus:border-gold-500 rounded-xl px-4 py-3 text-xs text-white focus:outline-none placeholder-zinc-600 transition-colors resize-y"
                    />
                  </div>

                  {/* Submit button */}
                  <button
                    type="submit"
                    disabled={formStatus === "submitting"}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gold-500 hover:bg-gold-400 disabled:bg-zinc-800 disabled:text-zinc-600 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-md shadow-gold-500/10 cursor-pointer"
                  >
                    {formStatus === "submitting" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-zinc-950 border-t-transparent rounded-full animate-spin" />
                        Sending Enquiry...
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        Submit Enquiry
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
