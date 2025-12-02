import { Suspense } from 'react';

import { Metadata } from 'next';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import UserDashboardPage from '@/components/pages/profile/UserDashboardPage';

export const metadata: Metadata = {
  title: 'تفاصيل حسابك | منصة أ+',
  description:
    'استعرض تفاصيل حسابك في منصة أ+، واطّلع على الملاحظات التي حفظتها، مشترياتك، إعجاباتك، وإعداداتك الشخصية بسهولة تامة.',
  keywords: [
    'تفاصيل حسابك',
    'إدارة الحساب',
    'منصة أ بلس',
    'A+ Platform',
    'مشترياتي',
    'ملاحظاتي',
    'إعدادات الحساب',
    'الملف الشخصي',
  ],
  openGraph: {
    title: 'تفاصيل حسابك | منصة أ+',
    description:
      'إدارة حسابك على منصة أ+ لمتابعة ملاحظاتك ومشترياتك وتنظيم تجربتك التعليمية بسهولة وأمان.',
    url: 'https://aplusplatformsa.com/profile',
    siteName: 'A+ Platform | منصة أ بلس',
    locale: 'ar_SA',
    type: 'profile',
    images: [
      {
        url: 'https://aplusplatformsa.com/og/profile.jpg',
        width: 1200,
        height: 630,
        alt: 'تفاصيل حساب المستخدم على منصة أ بلس',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'تفاصيل حسابك | منصة أ+',
    description:
      'تحكم في حسابك واطّلع على كل أنشطتك التعليمية في منصة أ بلس بسهولة.',
    images: ['https://aplusplatformsa.com/og/profile.jpg'],
    creator: '@AplusPlatform',
  },
  alternates: {
    canonical: 'https://aplusplatformsa.com/profile',
  },
  robots: {
    index: true,
    follow: true,
  },
  category: 'Education',
  metadataBase: new URL('https://aplusplatformsa.com'),
  applicationName: 'A+ Platform',
  referrer: 'origin-when-cross-origin',
};

function ProfileWrapper() {
  return <UserDashboardPage />;
}

export default function Profile() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfileWrapper />
    </Suspense>
  );
}
