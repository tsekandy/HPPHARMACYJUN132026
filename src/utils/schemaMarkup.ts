export function getPharmacySchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Pharmacy", "LocalBusiness", "MedicalBusiness"],
    "@id": "https://www.happypillspharmacyltd.com",
    name: "Happy Pills Pharmacy Ltd",
    description: "24/7 Licensed Pharmacy in Uganda offering prescription services, medicine delivery, and specialty hard-to-find medicines",
    url: "https://www.happypillspharmacyltd.com",
    logo: "https://www.happypillspharmacyltd.com/logo.png",
    sameAs: [
      "https://www.facebook.com/hppharmacyUg/",
      "https://www.instagram.com/happypillspharmacy",
      "https://twitter.com/HppharmacyUg",
    ],
    telephone: ["+256709745309", "+256782504503"],
    email: "happypillspharmacy@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Zalex House, Nansana Trading Centre",
      addressLocality: "Kampala",
      addressRegion: "Kampala",
      postalCode: "256",
      addressCountry: "UG",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "0.3823",
      longitude: "32.5825",
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:30",
      closes: "00:00",
    },
    priceRange: "UGX",
    areaServed: ["Kampala", "Wakiso", "Mukono", "Jinja"],
    knowsAbout: [
      "Prescription services",
      "Medicine delivery",
      "Specialty medicines",
      "Rare medications",
      "Pharmaceutical care",
    ],
    medicalSpecialty: [
      "General medicine",
      "Chronic disease management",
      "Rare and specialized medications",
    ],
    parentOrganization: {
      "@type": "Organization",
      name: "Happy Pills Healthcare Limited",
    },
    award: "NDA Approved - National Drug Authority Uganda",
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      telephone: "+256709745309",
      areaServed: ["UG"],
      availableLanguage: ["en", "sw"],
    },
  };
}

export function getFAQSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I upload my prescription?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can upload your prescription using our simple drag-and-drop interface on the prescription upload page. We accept JPG, PNG, WEBP, and PDF files. Our AI analyzes your prescription and our pharmacists review it within hours.",
        },
      },
      {
        "@type": "Question",
        name: "What areas do you deliver to?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We deliver to Kampala, Wakiso, Mukono, and Jinja. For same-day delivery, orders must be placed before 2 PM.",
        },
      },
      {
        "@type": "Question",
        name: "Are you a licensed pharmacy?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, we are a fully licensed pharmacy approved by the National Drug Authority (NDA) of Uganda. All our pharmacists are qualified and registered with the Uganda Health Professional Council.",
        },
      },
      {
        "@type": "Question",
        name: "Can you help me find hard-to-find medicines?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes! We specialize in sourcing rare and hard-to-find medicines. Use our specialty medicine request portal to submit requests and we'll provide a quote within 24 hours.",
        },
      },
      {
        "@type": "Question",
        name: "What are your operating hours?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We are open 24/7. You can place orders or get consultations anytime. Emergency services are always available.",
        },
      },
    ],
  };
}

export function getProductSchema(medicineName: string, category: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: medicineName,
    category: category,
    offers: {
      "@type": "Offer",
      priceCurrency: "UGX",
      availability: "https://schema.org/InStock",
    },
    manufacturer: {
      "@type": "Organization",
      name: "Happy Pills Pharmacy Ltd",
    },
    isPartOf: {
      "@type": "Organization",
      name: "Happy Pills Pharmacy Ltd",
    },
  };
}

export function getAggregateRatingSchema(ratingValue: number, reviewCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toString(),
      ratingCount: reviewCount.toString(),
    },
  };
}

export function getBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
