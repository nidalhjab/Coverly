# Coverly - Custom Phone Cases

A modern, SEO-optimized Next.js application for designing custom phone cases with your own photos.

## 🎯 SEO Optimization Features

This project has been comprehensively optimized for search engines with the following implementations:

### ✅ Meta Tags & Open Graph
- **Complete meta tag coverage** including title, description, keywords
- **Open Graph tags** for social media sharing (Facebook, LinkedIn)
- **Twitter Card optimization** for enhanced Twitter sharing
- **Dynamic meta generation** for each page and phone model

### ✅ Structured Data (JSON-LD)
- **Organization schema** for company information
- **WebSite schema** with search functionality
- **Product schema** for individual phone cases
- **Service schema** for the customization service
- **BreadcrumbList schema** for navigation
- **Review and rating schemas** for trust signals

### ✅ Technical SEO
- **Dynamic XML sitemap** generation (`/sitemap.xml`)
- **Robots.txt** optimization (`/robots.txt`)
- **Canonical URLs** for duplicate content prevention
- **Web App Manifest** for PWA features
- **Proper URL structure** with clean, SEO-friendly paths

### ✅ Performance Optimization
- **Next.js Image optimization** with WebP/AVIF formats
- **Font optimization** with `font-display: swap`
- **Critical rendering path** optimization
- **Bundle optimization** and code splitting
- **Compression** and caching headers

### ✅ Accessibility (SEO Factor)
- **Semantic HTML** structure
- **ARIA labels** for interactive elements
- **Skip links** for keyboard navigation
- **Focus management** and visual indicators
- **Alt text** for all images

## 🚀 SEO Implementation Details

### Metadata Management
The project uses a centralized SEO system:

```typescript
// Using the SEO utility
import { generateSEO, generatePhoneModelSEO } from '@/utils/seo';

// For regular pages
export const metadata = generateSEO({
  title: 'Custom Phone Cases',
  description: 'Design your own phone case...',
  keywords: ['custom phone cases', 'design'],
});

// For dynamic phone model pages
export const metadata = generatePhoneModelSEO('iphone-15-pro');
```

### Structured Data Examples
```typescript
// Website schema
const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Coverly',
  url: 'https://coverly.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://coverly.com/customize?q={search_term_string}'
  }
};

// Product schema for phone cases
const productSchema = generateProductSchema('iphone-15-pro', 29.99);
```

### Sitemap Generation
Automatic sitemap generation includes:
- Static pages (homepage, customize)
- Dynamic phone model pages
- Proper priorities and change frequencies
- Last modification dates

## 📊 SEO Checklist

- ✅ **Title Tags**: Unique, descriptive, under 60 characters
- ✅ **Meta Descriptions**: Compelling, under 160 characters
- ✅ **URL Structure**: Clean, descriptive, keyword-rich
- ✅ **Heading Structure**: Proper H1-H6 hierarchy
- ✅ **Image Optimization**: Alt text, WebP format, lazy loading
- ✅ **Internal Linking**: Strategic navigation structure
- ✅ **Mobile Optimization**: Responsive design, mobile-first
- ✅ **Page Speed**: Optimized Core Web Vitals
- ✅ **Schema Markup**: Rich snippets for all content types
- ✅ **Social Sharing**: Open Graph and Twitter Cards

## 🛠️ Getting Started

```bash
npm install
npm run dev
```

## 📈 SEO Monitoring

Monitor your SEO performance with:
- Google Search Console
- Google Analytics 4
- Core Web Vitals monitoring
- Structured data testing tool
- Mobile-friendly test

## 🔧 Advanced SEO Features

### Dynamic Meta Generation
Each phone model gets unique SEO:
```
/customize/iphone-15-pro → "Custom iPhone 15 Pro Case | Design Your Own iPhone 15 Pro Cover"
/customize/galaxy-s24 → "Custom Galaxy S24 Case | Design Your Own Galaxy S24 Cover"
```

### International SEO Ready
- Language attributes set
- hreflang support structure
- Locale-aware Open Graph tags

### E-commerce SEO
- Product schema with pricing
- Review and rating markup
- Shipping information
- Availability status

## 📱 Mobile SEO
- Responsive meta viewport
- Mobile-optimized images
- Touch-friendly navigation
- App-like experience with PWA

## 🎨 Features

- **Phone Model Selection**: Support for iPhone, Samsung, Xiaomi models
- **Photo Upload**: Multiple upload options including camera capture
- **Real-time Preview**: Live customization with drag, scale, rotate
- **Image Adjustments**: Brightness, contrast, fill modes
- **Responsive Design**: Mobile-first approach
- **Progressive Web App**: Installable, offline-capable

## 🛡️ Security Headers

Enhanced security with:
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: origin-when-cross-origin

## 📄 License

This project is licensed under the MIT License.

## live view: https://coverly-delta.vercel.app/

---

## 📸 Features

- ✅ Select phone model from a wide variety of popular brands (iPhone, Samsung, Xiaomi, etc.)
- ✅ Upload custom images or choose from a gallery
- ✅ Drag, scale, rotate, and position the image on the case
- ✅ Apply photo filters: grayscale, brightness, contrast, saturation, blur, etc.
- ✅ Optimize the image for better print quality
- ✅ Preview the case in 3D or mockup
- ✅ Export or submit the final design

---

## 🛠️ Tech Stack

**Frontend:**
- Next
- TypeScript
- Tailwind


---

## 🔧 Getting Started

### Prerequisites

- Node.js >= 18
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/your-username/mobile-case-designer.git
cd mobile-case-designer
npm install
# or yarn or pnpm
