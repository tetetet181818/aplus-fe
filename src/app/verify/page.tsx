import React, { Suspense } from 'react'
import VerifyClient from './VerifyClient'
import { Metadata } from 'next'
import LoadingSpinner from '@/components/atoms/LoadingSpinner'

export const metadata: Metadata = {
  title: 'التحقق من الحساب | منصة +A',
  description:
    'قم بالتحقق من حسابك في منصة +A لتفعيل عضويتك والوصول إلى جميع المزايا والخدمات التعليمية بسهولة وأمان.',
  keywords: [
    'التحقق من الحساب',
    'منصة أ بلس',
    'A+ Platform',
    'تفعيل الحساب',
    'تسجيل الدخول',
    'طلاب الجامعات',
  ],
  openGraph: {
    title: 'التحقق من الحساب | منصة +A',
    description:
      'قم بتأكيد حسابك الآن للوصول إلى جميع خدمات منصة +A التعليمية.',
    url: 'https://aplusplatformsa.com/verify',
    siteName: 'A+ Platform',
    locale: 'ar_SA',
    type: 'website',
    images: [
      {
        url: 'https://aplusplatformsa.com/og/verify-page.jpg',
        width: 1200,
        height: 630,
        alt: 'صفحة التحقق من الحساب - منصة +A',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'التحقق من الحساب | منصة +A',
    description:
      'تحقق من حسابك لتفعيل العضوية والوصول إلى محتوى منصة +A التعليمي.',
    images: ['https://aplusplatformsa.com/og/verify-page.jpg'],
  },
  alternates: {
    canonical: 'https://aplusplatformsa.com/verify',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <VerifyClient />
    </Suspense>
  )
}
