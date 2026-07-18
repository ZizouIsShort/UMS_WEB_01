import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trading | United Modern Stone SPC — Marble, Granite & Civil Materials Supplier",
  description:
    "United Modern Stone SPC trades premium marble, granite, and civil engineering materials in Muscat, Oman. Browse our dealing deck of natural stone, MEP supplies and construction products.",
};

export default function TradingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
