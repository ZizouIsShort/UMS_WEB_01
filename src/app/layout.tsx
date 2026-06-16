import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "United Modern Stone SPC | Luxury Marble & Natural Stone Muscat",
  description: "United Modern Stone SPC is Oman's premier masonry contractor and marble supplier, delivering exquisite craftsmanship, landmark elevations, and bespoke stone selections in Muscat.",
  keywords: "United Modern Stone, UMS, Marble Oman, Natural Stone Muscat, Royal Court Oman, Luxury Stone, Calacatta Gold, Oman Beige, Marble Supplier Oman",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} h-full antialiased scroll-smooth`}>
      <body className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
