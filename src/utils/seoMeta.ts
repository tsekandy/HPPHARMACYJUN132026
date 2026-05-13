export function updatePageMeta(title: string, description: string, keywords?: string, ogImage?: string) {
  // Update title
  document.title = title;

  // Update or create meta description
  let metaDescription = document.querySelector('meta[name="description"]') as HTMLMetaElement;
  if (!metaDescription) {
    metaDescription = document.createElement('meta');
    metaDescription.name = 'description';
    document.head.appendChild(metaDescription);
  }
  metaDescription.content = description;

  // Update or create keywords
  if (keywords) {
    let metaKeywords = document.querySelector('meta[name="keywords"]') as HTMLMetaElement;
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.name = 'keywords';
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.content = keywords;
  }

  // Update or create Open Graph image
  if (ogImage) {
    let ogImageMeta = document.querySelector('meta[property="og:image"]') as HTMLMetaElement;
    if (!ogImageMeta) {
      ogImageMeta = document.createElement('meta');
      ogImageMeta.setAttribute('property', 'og:image');
      document.head.appendChild(ogImageMeta);
    }
    ogImageMeta.content = ogImage;
  }
}

export const SEO_META = {
  home: {
    title: 'Happy Pills Pharmacy - 24/7 Online Pharmacy in Uganda | Medicine Delivery Kampala',
    description:
      'Order medicines online from Uganda\'s trusted 24/7 pharmacy. Get prescription services, delivery in Kampala, Wakiso, Mukono & Jinja. Find rare medicines. WhatsApp consultation available.',
    keywords:
      'pharmacy near me, online pharmacy Uganda, medicine delivery Kampala, 24/7 pharmacy, prescription upload, hard to find medicines, licensed pharmacy Uganda',
  },
  services: {
    title: 'Pharmacy Services - Happy Pills Pharmacy Ltd',
    description:
      'Explore our comprehensive pharmacy services: prescription processing, medicine delivery, rare medicine sourcing, and 24/7 pharmacist consultations.',
    keywords: 'pharmacy services, prescription processing, medicine delivery, rare medicines, Uganda pharmacy',
  },
  upload: {
    title: 'Upload Prescription Online - Happy Pills Pharmacy',
    description:
      'Securely upload your prescription for professional review. AI-powered prescription analysis and same-day processing.',
    keywords: 'upload prescription, prescription delivery, online pharmacy, prescription review',
  },
  specialty: {
    title: 'Hard-to-Find Medicines Request Portal | Happy Pills Pharmacy',
    description:
      'Request rare and specialty medicines. We source imported and hard-to-find medications with quotes within 24 hours.',
    keywords: 'rare medicines, imported medicines, specialty pharmacy, medicine sourcing Uganda',
  },
  wellness: {
    title: 'Health & Wellness Hub - Expert Articles & Guides',
    description:
      'Read expert health articles from licensed pharmacists about medicines, conditions, and wellness. Learn about prescription safety and health tips.',
    keywords: 'health articles, pharmacy guides, medication safety, wellness tips, Uganda pharmacy',
  },
  locations: {
    title: 'Happy Pills Pharmacy Locations - Find Us in Kampala, Wakiso, Mukono & Jinja',
    description:
      'Visit our pharmacy locations across Uganda. Find directions, hours, and contact information for all our branches.',
    keywords:
      'pharmacy locations, Happy Pills Pharmacy, Kampala pharmacy, Wakiso pharmacy, Mukono pharmacy, Jinja pharmacy',
  },
  about: {
    title: 'About Happy Pills Pharmacy Ltd - Licensed Pharmacy Uganda',
    description:
      'Learn about Happy Pills Pharmacy. Licensed, NDA-approved, and committed to providing quality pharmaceutical care in Uganda.',
    keywords:
      'about pharmacy, licensed pharmacy Uganda, NDA approved, pharmacy credentials, professional pharmacists',
  },
  seo: {
    title: 'Website SEO Analyzer - Optimize Your Site for Google',
    description:
      'Free SEO analysis tool to check your website\'s optimization. Get score, issues, and actionable recommendations.',
    keywords: 'SEO analyzer, website analysis, Google SEO, SEO optimization, website audit',
  },
};

// LocalBusiness markup for Google My Business optimization
export function getGoogleMyBusinessMarkup() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Happy Pills Pharmacy Ltd',
    image: 'https://www.happypillspharmacyltd.com/logo.png',
    description: '24/7 Licensed Pharmacy with prescription services, medicine delivery, and specialty medicine sourcing',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Zalex House, Nansana Trading Centre',
      addressLocality: 'Kampala',
      addressRegion: 'Kampala',
      postalCode: '256',
      addressCountry: 'UG',
    },
    telephone: '+256709745309',
    priceRange: 'UGX',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:30',
        closes: '00:00',
      },
    ],
    sameAs: [
      'https://www.facebook.com/hppharmacyUg/',
      'https://www.instagram.com/happypillspharmacy',
      'https://twitter.com/HppharmacyUg',
    ],
    url: 'https://www.happypillspharmacyltd.com',
    email: 'happypillspharmacy@gmail.com',
  };
}
