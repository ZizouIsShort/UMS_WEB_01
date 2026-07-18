export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "United Modern Stone SPC",
    image: "https://unitedmodernstone.com/images/Adobe%20Express%20-%20file.png",
    url: "https://unitedmodernstone.com",
    telephone: "+96894525641",
    email: "vikas@unitedmodernstone.com",
    description:
      "Oman's premier marble, granite and quartz supplier based in Muscat. Supply, diamond processing, water-jet carving, wall cladding and interior flooring systems.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "P.O. BOX:-2, POSTAL CODE:-130, AZAIBA",
      addressLocality: "Muscat",
      addressCountry: "OM",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 23.588,
      longitude: 58.3829,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Saturday", "Sunday"],
      opens: "08:00",
      closes: "18:00",
    },
    areaServed: [
      { "@type": "City", name: "Muscat" },
      { "@type": "Country", name: "OM" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Natural Stone Products",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Marble" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Granite" },
        },
        {
          "@type": "Offer",
          itemOffered: { "@type": "Product", name: "Quartz" },
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
