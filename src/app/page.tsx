import HomePage from '@/components/pages/landing/HomePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'منصة أ+ | منصه الملخصات الجامعية والملفات التعليمية الرقمية',
  description:
    'منصة أ+ هي منصتك الذكية للحصول على ملخصات وملفات جامعية عالية الجودة، منظمة من طلاب جامعات مصر والسعودية. اكتشف أفضل المحتوى الأكاديمي وساهم في تطوير تجربة التعلم الجامعي.',
  keywords: [
    'منصة أ+',
    'أ+ Platform',
    'ملخصات جامعية',
    'ملفات تعليمية',
    'طلاب الجامعات',
    'محاضرات',
    'جامعة السلام',
    'جامعة المنصورة',
    'مذكرات جامعية',
    'تعليم رقمي',
    'موارد تعليمية',
  ],
  openGraph: {
    title: 'منصة أ+ | مكتبة الملخصات الجامعية والملفات التعليمية الرقمية',
    description:
      'اكتشف مكتبة ضخمة من الملخصات الجامعية والملفات التعليمية الرقمية. شارك، تعلم، وكن جزءًا من مستقبل التعليم الجامعي الذكي.',
    url: 'https://aplusplatformsa.com/',
    siteName: 'أ+ Platform',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: 'https://aplusplatformsa.com',
        width: 1200,
        height: 630,
        alt: 'منصة أ+ التعليمية',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'منصة أ+ | مكتبة الملخصات الجامعية والملفات التعليمية الرقمية',
    description:
      'احصل على ملخصات وملفات جامعية رقمية تساعدك على التفوق الأكاديمي بسهولة عبر منصة أ+.',
    images: ['https://aplusplatformsa.com'],
    creator: '@AplusPlatform',
  },
  alternates: {
    canonical: 'https://aplusplatformsa.com/',
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'Education',
  metadataBase: new URL('https://aplusplatformsa.com'),
  applicationName: 'أ+ Platform',
  referrer: 'origin-when-cross-origin',
}

export default async function LandingPage() {
  return <HomePage />
}
