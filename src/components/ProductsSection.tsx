"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Check, Eye } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: "luxury" | "classic" | "exotic";
  origin: string;
  image: string;
  finish: string[];
  description: string;
  specs: {
    compressiveStrength: string;
    waterAbsorption: string;
    density: string;
    thicknessAvailable: string;
  };
}

const productsData: Product[] = [
  {
    id: "calacatta-gold",
    name: "Golden Calacatta",
    category: "luxury",
    origin: "Carrara, Italy",
    image: "/images/Golden_Calacatta_Large_Format_Tile_ottmo_x700.webp",
    finish: ["Polished", "Honed", "Bookmatched"],
    description: "One of the world's most sought-after luxury stones, Calacatta Gold features bold, dramatic grey and gold veining on a pristine white background. Perfect for feature walls, fireplaces, and luxury counters.",
    specs: {
      compressiveStrength: "128 MPa",
      waterAbsorption: "0.12%",
      density: "2,710 kg/m³",
      thicknessAvailable: "20mm, 30mm, Custom Slab cut"
    }
  },
  {
    id: "oman-beige",
    name: "Oman Beige",
    category: "classic",
    origin: "Ibri, Sultanate of Oman",
    image: "/images/Oman-Beige-Marble.jpg",
    finish: ["Polished", "Honed", "Brushed", "Sandblasted"],
    description: "The classic Omani stone. Famous for its consistent cream-beige base and warm earthen textures. Hugely popular across Middle Eastern palaces, commercial plazas, and large-scale claddings.",
    specs: {
      compressiveStrength: "135 MPa",
      waterAbsorption: "0.18%",
      density: "2,680 kg/m³",
      thicknessAvailable: "15mm, 20mm, 30mm, 40mm Tiles"
    }
  },
  {
    id: "obsidian-gold",
    name: "Obsidian Gold Elegance",
    category: "exotic",
    origin: "Imported / Exotic",
    image: "/images/obsidian-gold-elegance-stockcake.webp",
    finish: ["Polished", "Leathered", "Acid-washed"],
    description: "An absolute statement piece. Dark obsidian-black base interwoven with bright, glittering gold veins. Its high contrast makes it an exceptional choice for grand lobbies, columns, and executive office counters.",
    specs: {
      compressiveStrength: "142 MPa",
      waterAbsorption: "0.08%",
      density: "2,820 kg/m³",
      thicknessAvailable: "20mm, 30mm"
    }
  }
];

export default function ProductsSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<"all" | "luxury" | "classic" | "exotic">("all");
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.origin.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <section id="products" className="py-24 px-6 sm:px-12 md:px-20 max-w-7xl mx-auto border-b border-white/5">
      
      {/* Title block */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <div className="flex items-center space-x-2 text-gold-400 mb-3">
            <span className="w-6 h-[1px] bg-gold-500" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold">Our Materials</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white leading-tight">
            Exquisite Marble <span className="italic gold-shimmer font-serif">& Natural Slabs</span>
          </h2>
          <p className="text-zinc-400 text-sm mt-3 max-w-xl font-light">
            We extract and import only the finest marble qualities, precision-cut to fit the demands of world-class architectural designs.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-12 w-full">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto justify-start">
          {(["all", "luxury", "classic", "exotic"] as const).map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-gold-500 text-zinc-950 shadow-md shadow-gold-500/10"
                  : "bg-zinc-900/60 text-zinc-400 border border-white/5 hover:text-white hover:bg-zinc-900"
              }`}
            >
              {category} Slabs
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search slabs or origin..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900/40 border border-white/10 focus:border-gold-500 rounded-full px-5 py-3 pl-11 text-xs text-white focus:outline-none placeholder-zinc-500 transition-colors duration-300"
          />
          <Search className="w-4 h-4 text-zinc-500 absolute left-4 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-3.5 text-zinc-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="group flex flex-col rounded-2xl overflow-hidden glass-card cursor-pointer"
              onClick={() => setActiveModalProduct(product)}
            >
              {/* Product Image Panel */}
              <div className="relative h-72 w-full overflow-hidden bg-zinc-900">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  loading="lazy"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 py-1.5 px-3 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-[9px] uppercase tracking-wider text-gold-300 font-bold">
                  {product.category}
                </div>

                {/* Hover Action Sheet */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-gold-500 text-zinc-950 flex items-center justify-center shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {/* Text Info */}
              <div className="p-6 flex flex-col justify-between flex-grow">
                <div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mb-2">
                    Origin: {product.origin}
                  </div>
                  <h3 className="text-xl font-serif text-white font-medium mb-3 group-hover:text-gold-300 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-zinc-400 text-xs leading-relaxed font-light line-clamp-3">
                    {product.description}
                  </p>
                </div>

                {/* Finishes preview */}
                <div className="mt-6 pt-5 border-t border-white/5 flex flex-wrap gap-1.5">
                  {product.finish.slice(0, 3).map((f) => (
                    <span
                      key={f}
                      className="px-2.5 py-1 rounded bg-white/5 text-[9px] uppercase tracking-wider text-zinc-300"
                    >
                      {f}
                    </span>
                  ))}
                  {product.finish.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-white/5 text-[9px] text-zinc-500">
                      +{product.finish.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 border border-white/5 rounded-3xl bg-zinc-900/10">
          <p className="text-zinc-400 font-light">No marble materials match your selection.</p>
          <button
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="mt-4 px-6 py-2.5 rounded-full bg-gold-500 text-zinc-950 text-xs font-bold uppercase tracking-wider"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Details Lightbox Modal */}
      {activeModalProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-3xl glass-card border border-white/10 p-6 sm:p-8 md:p-10 flex flex-col md:flex-row gap-8">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalProduct(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 transition-all z-10"
              aria-label="Close details"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Slab Render */}
            <div className="w-full md:w-1/2 flex flex-col">
              <div className="relative rounded-2xl overflow-hidden bg-zinc-950 aspect-[4/3] sm:aspect-square md:h-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={activeModalProduct.image}
                  alt={activeModalProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Right Column: Descriptions & Specs */}
            <div className="w-full md:w-1/2 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] uppercase tracking-widest font-mono text-gold-400">
                    {activeModalProduct.category} Category
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                  <span className="text-[10px] uppercase tracking-widest font-mono text-zinc-400">
                    {activeModalProduct.origin}
                  </span>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-serif text-white font-light mb-4">
                  {activeModalProduct.name}
                </h3>
                
                <p className="text-zinc-300 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                  {activeModalProduct.description}
                </p>

                {/* Slab Finishes Available */}
                <div className="mb-6">
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-2.5">
                    Available Surfaces
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeModalProduct.finish.map((f) => (
                      <div
                        key={f}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-gold-500/10 text-gold-300 border border-gold-500/20 text-[10px] uppercase font-bold"
                      >
                        <Check className="w-3 h-3" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Mechanical Properties & Specifications */}
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 mb-3">
                    Technical Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-4 bg-black/35 rounded-2xl p-4 border border-white/5">
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Comp. Strength</span>
                      <span className="text-xs text-white font-medium font-mono">{activeModalProduct.specs.compressiveStrength}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Water Absorption</span>
                      <span className="text-xs text-white font-medium font-mono">{activeModalProduct.specs.waterAbsorption}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Bulk Density</span>
                      <span className="text-xs text-white font-medium font-mono">{activeModalProduct.specs.density}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 block">Thickness Range</span>
                      <span className="text-[10px] text-white font-medium font-mono whitespace-pre-wrap">{activeModalProduct.specs.thicknessAvailable}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inquiry Action */}
              <div className="mt-8">
                <button
                  onClick={() => {
                    setActiveModalProduct(null);
                    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-full text-center py-3.5 rounded-xl bg-gold-500 hover:bg-gold-400 text-zinc-950 text-xs font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Request Quotation for {activeModalProduct.name}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
