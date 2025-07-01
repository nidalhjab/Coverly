import { Metadata } from 'next';

interface SEOConfig {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noindex?: boolean;
  type?: 'website' | 'article' | 'product';
}

const defaultSEO = {
  siteName: 'Coverly',
  siteDescription: 'Create stunning custom phone cases with your photos. Premium quality printing, fast delivery, and perfect protection.',
  defaultImage: '/images/hero2.png',
  baseUrl: 'https://coverly.com',
  twitterHandle: '@coverly',
};

export function generateSEO(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    canonical,
    noindex = false,
    type = 'website'
  } = config;

  const seoTitle = title 
    ? `${title} | ${defaultSEO.siteName}`
    : `${defaultSEO.siteName} - Custom Phone Cases | Design Your Own Phone Case`;

  const seoDescription = description || defaultSEO.siteDescription;
  const seoImage = image || defaultSEO.defaultImage;
  const absoluteImage = seoImage.startsWith('http') 
    ? seoImage 
    : `${defaultSEO.baseUrl}${seoImage}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: keywords.join(', '),
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: [{
        url: absoluteImage,
        width: 1200,
        height: 630,
        alt: title || defaultSEO.siteName,
      }],
      type: type === 'product' ? 'website' : type,
      siteName: defaultSEO.siteName,
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
      images: [absoluteImage],
      creator: defaultSEO.twitterHandle,
      site: defaultSEO.twitterHandle,
    },
    robots: {
      index: !noindex,
      follow: !noindex,
    },
    ...(canonical && {
      alternates: {
        canonical: canonical,
      },
    }),
  };
}

// Generate phone model specific SEO
export function generatePhoneModelSEO(phoneModel: string, customImage?: string): Metadata {
  const formattedModel = phoneModel
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return generateSEO({
    title: `Custom ${formattedModel} Case | Design Your Own ${formattedModel} Cover`,
    description: `Create a personalized ${formattedModel} case with your favorite photos. Premium quality printing, perfect fit, and fast delivery. Design your custom ${formattedModel} case today!`,
    keywords: [
      `${formattedModel} case`,
      `custom ${formattedModel} case`,
      `${formattedModel} cover`,
      `personalized ${formattedModel} case`,
      `${formattedModel} phone case`,
      'custom phone case',
      'photo phone case',
    ],
    image: customImage,
    canonical: `${defaultSEO.baseUrl}/customize/${phoneModel}`,
    type: 'product',
  });
}

// Structured Data Generators
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    description: defaultSEO.siteDescription,
    url: defaultSEO.baseUrl,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${defaultSEO.baseUrl}/customize?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    },
    publisher: {
      '@type': 'Organization',
      name: defaultSEO.siteName,
      logo: `${defaultSEO.baseUrl}/logo.png`
    }
  };
}

export function generateProductSchema(phoneModel: string, price: number = 29.99) {
  const formattedModel = phoneModel
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase());

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `Custom ${formattedModel} Case`,
    description: `Personalized ${formattedModel} case with custom photo printing. Premium quality materials and perfect fit guaranteed.`,
    image: `${defaultSEO.baseUrl}/images/hero2.png`,
    brand: {
      '@type': 'Brand',
      name: defaultSEO.siteName
    },
    offers: {
      '@type': 'Offer',
      price: price.toString(),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: defaultSEO.siteName
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '4.99',
          currency: 'USD'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          },
          transitTime: {
            '@type': 'QuantitativeValue',
            minValue: 3,
            maxValue: 5,
            unitCode: 'DAY'
          }
        }
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '156',
      bestRating: '5',
      worstRating: '1'
    },
    review: [
      {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: 'Sarah Johnson'
        },
        reviewRating: {
          '@type': 'Rating',
          ratingValue: '5',
          bestRating: '5'
        },
        reviewBody: 'Amazing quality! The photo came out crystal clear and the case fits perfectly.'
      }
    ]
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };
} 