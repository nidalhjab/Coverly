import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Customize Your Phone Case | Upload Photos & Design - Coverly',
  description: 'Design your custom phone case step by step. Choose your phone model, upload your favorite photos, and create the perfect personalized phone case. iPhone, Samsung, Xiaomi supported.',
  keywords: [
    'customize phone case',
    'design phone case',
    'upload photo phone case',
    'personalize phone case',
    'phone case designer',
    'custom case creator',
    'phone model selection',
    'photo upload'
  ],
  openGraph: {
    title: 'Customize Your Phone Case | Upload Photos & Design - Coverly',
    description: 'Design your custom phone case step by step. Choose your phone model and upload your favorite photos.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Customize Your Phone Case | Upload Photos & Design - Coverly',
    description: 'Design your custom phone case step by step. Choose your phone model and upload your favorite photos.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function CustomizeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 