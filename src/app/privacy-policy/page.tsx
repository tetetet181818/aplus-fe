import PrivacyPolicyPage from '@/components/pages/PrivacyPolicyPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'سياسة الخصوصية – منصة أ+',
  description:
    'تعرف على سياسة الخصوصية لمنصة أ+ التي تهدف إلى حماية بياناتك الشخصية وضمان سرية معلوماتك أثناء استخدامك لخدمات المنصة التعليمية.',
  keywords: [
    'سياسة الخصوصية',
    'منصة أ+',
    'حماية البيانات',
    'البيانات الشخصية',
    'الخصوصية',
    'الكوكيز',
    'ملفات تعريف الارتباط',
    'حقوق المستخدم',
    'أمن المعلومات',
    'الدراسة الجامعية',
    'منصة تعليمية',
    'خصوصية المستخدم',
  ],
  authors: [{ name: 'منصة أ+' }],
  alternates: {
    canonical: 'https://aplusplatformsa.com/privacy-policy',
  },
  openGraph: {
    title: 'سياسة الخصوصية – منصة أ+',
    description:
      'منصة أ+ تلتزم بحماية خصوصيتك وبياناتك الشخصية، وتوضح هذه السياسة كيفية جمع المعلومات واستخدامها وحمايتها.',
    url: 'https://aplusplatformsa.com/privacy-policy',
    siteName: 'منصة أ+',
    locale: 'ar_SA',
    type: 'article',
  },
}

export default function PrivacyPolicy() {
  return (
    <>
      <PrivacyPolicyPage />
    </>
  )
}
