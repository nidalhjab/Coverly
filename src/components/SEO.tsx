import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultSEO = {
  title: 'Coverly - Custom Phone Cases | Design Your Own Phone Case',
  description: 'Create stunning custom phone cases with your photos. Premium quality printing, fast delivery, and perfect protection for iPhone, Samsung, and more. Start designing today!',
  image: '/images/hero2.png',
  url: 'https://coverly.com',
  type: 'website' as const,
  keywords: ['custom phone cases', 'personalized phone covers', 'photo phone cases', 'iPhone cases', 'Samsung cases', 'phone protection'],
  author: 'Coverly Team'
};

export default function SEO({
  title,
  description,
  image,
  url,
  type = 'website',
  keywords = [],
  author,
  publishedTime,
  modifiedTime,
  structuredData,
  canonical,
  noindex = false,
  nofollow = false
}: SEOProps) {
  const seo = {
    title: title || defaultSEO.title,
    description: description || defaultSEO.description,
    image: image || defaultSEO.image,
    url: url || defaultSEO.url,
    type,
    keywords: [...defaultSEO.keywords, ...keywords],
    author: author || defaultSEO.author
  };

  // Ensure absolute URL for image
  const absoluteImage = seo.image.startsWith('http') 
    ? seo.image 
    : `${seo.url}${seo.image}`;

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow'
  ].join(', ');

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords.join(', ')} />
      <meta name="author" content={seo.author} />
      <meta name="robots" content={robotsContent} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      
      {/* Canonical URL */}
      {canonical && <link rel="canonical" href={canonical} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content="Coverly" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={absoluteImage} />
      <meta name="twitter:creator" content="@coverly" />
      <meta name="twitter:site" content="@coverly" />
      
      {/* Additional Meta Tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      
      {/* Favicon and Icons */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      {/* Structured Data */}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
}

// Helper function to generate structured data
export function generateStructuredData(type: string, data: Record<string, unknown>) {
  const baseData = {
    '@context': 'https://schema.org',
    '@type': type,
    ...data
  };

  return baseData;
}

// Organization structured data
export const organizationSchema = generateStructuredData('Organization', {
  name: 'Coverly',
  description: 'Custom phone case design and printing service',
  url: 'https://coverly.com',
  logo: 'https://coverly.com/logo.png',
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-0123',
    contactType: 'customer service',
    availableLanguage: ['English']
  },
  sameAs: [
    'https://facebook.com/coverly',
    'https://twitter.com/coverly',
    'https://instagram.com/coverly'
  ]
});

// Product structured data template
export function createProductSchema(product: {
  name: string;
  description: string;
  image: string;
  price?: number;
  brand?: string;
  availability?: string;
}) {
  return generateStructuredData('Product', {
    name: product.name,
    description: product.description,
    image: product.image,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Coverly'
    },
    offers: {
      '@type': 'Offer',
      price: product.price || '29.99',
      priceCurrency: 'USD',
      availability: `https://schema.org/${product.availability || 'InStock'}`,
      seller: {
        '@type': 'Organization',
        name: 'Coverly'
      }
    }
  });
} 