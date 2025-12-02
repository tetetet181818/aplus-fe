import type { Metadata } from 'next';
import { Tajawal } from 'next/font/google';

import { ThemeProvider } from '@/components/atoms/ThemeProvider';
import Layout from '@/components/templates/Layout';

import { Providers } from '@/utils/Providers';

import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'سوق الملخصات الجامعية',
  description:
    'منصة لبيع وشراء الملخصات الجامعية بين الطلاب، وفر وقتك واستفد من خبرات زملائك',
  keywords: [
    'ملخصات',
    'جامعة',
    'طلاب',
    'مذاكرة',
    'بيع',
    'شراء',
    'ملخصات جامعية',
  ],
  authors: [{ name: ' أ+' }],
  creator: ' أ+ Team',
  openGraph: {
    title: 'سوق الملخصات الجامعية',
    description: 'اشترِ أو بع ملخصاتك الجامعية بسهولة وأمان عبر منصة  أ+',
    url: 'https://aplusplatformsa.com',
    siteName: 'سوق الملخصات الجامعية',
    locale: 'ar_EG',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  twitter: {
    card: 'summary_large_image',
    title: 'سوق الملخصات الجامعية',
    description: 'منصة تبادل ملخصات دراسية بين طلاب الجامعات.',
    creator: '@your_handle',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

const tajawal = Tajawal({
  subsets: ['arabic'],
  variable: '--font-tajawal',
  weight: ['400', '500', '700', '800'],
  display: 'swap',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        dir="rtl"
        className={`${tajawal.className} w-screen overflow-x-hidden`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <Layout>{children}</Layout>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
