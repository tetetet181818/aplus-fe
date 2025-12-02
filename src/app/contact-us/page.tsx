import { Metadata } from 'next';

import ContactUsPage from '@/components/pages/ContactUsPage';

export const metadata: Metadata = {
  title: 'اتصل بنا | منصة أ+',
  description:
    'تواصل مع فريق دعم منصة أ+ للدراسة الجامعية عبر البريد الإلكتروني',
  keywords: ['دعم فني', 'اتصل بنا', 'منصة أ+', 'دراسة جامعية', 'مساعدة'],
  openGraph: {
    title: 'اتصل بنا | منصة أ+',
    description: 'تواصل مع فريق دعم منصة أ+ للدراسة الجامعية',
  },
  alternates: {
    canonical: 'https://aplusplatformsa.com/contact-us',
  },
};

export default function ContactUs() {
  return <ContactUsPage />;
}
