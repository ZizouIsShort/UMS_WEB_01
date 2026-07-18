import type { Metadata } from "next";
import { Playfair_Display, Outfit } from "next/font/google";
import JsonLd from "@/components/JsonLd";
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
  metadataBase: new URL("https://unitedmodernstone.com"),
  title: "United Modern Stone SPC | Marble, Granite & Quartz Supplier Muscat Oman",
  description:
    "United Modern Stone SPC is Oman's leading marble supplier in Muscat, offering premium marble, granite and quartz for cladding, flooring and architectural stonework. Serving contractors and designers across the Sultanate.",
  keywords: [
    "marble supplier muscat",
    "marble supplier oman",
    "granite supplier muscat",
    "granite supplier oman",
    "quartz supplier muscat",
    "quartz supplier oman",
    "natural stone oman",
    "marble muscat",
    "stone supplier oman",
    "United Modern Stone",
    "UMS",
  ],
  icons: [{ rel: "icon", url: "/images/Adobe Express - file.png" }],
  openGraph: {
    title: "United Modern Stone SPC | Marble, Granite & Quartz Supplier Muscat Oman",
    description:
      "United Modern Stone SPC is Oman's leading marble supplier in Muscat, offering premium marble, granite and quartz for cladding, flooring and architectural stonework.",
    url: "https://unitedmodernstone.com",
    siteName: "United Modern Stone SPC",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/images/Adobe Express - file.png",
        width: 800,
        height: 600,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "United Modern Stone SPC | Marble, Granite & Quartz Supplier Muscat Oman",
    description:
      "Oman's leading marble supplier in Muscat — premium marble, granite and quartz for cladding, flooring and architectural stonework.",
    images: ["/images/Adobe Express - file.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://unitedmodernstone.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${outfit.variable} h-full antialiased scroll-smooth`}>
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full bg-zinc-950 text-zinc-100 flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
