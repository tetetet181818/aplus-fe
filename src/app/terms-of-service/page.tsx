import TermsOfServicePage from '@/components/pages/TermsOfServicePage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'شروط الاستخدام – منصة أ+',
  description:
    'اطلع على شروط وأحكام استخدام منصة أ+ لتبادل وبيع الملخصات الدراسية. تعرف على حقوقك كمستخدم، وبائع، ومشتري، وسياسات النشر والدفع وحماية الملكية الفكرية.',
  keywords: [
    'شروط الاستخدام',
    'منصة أ+',
    'أحكام الاستخدام',
    'سياسة المنصة',
    'حقوق المستخدم',
    'بيع الملخصات',
    'شراء الملخصات',
    'المحتوى الدراسي',
    'الملكية الفكرية',
    'شروط التسجيل',
    'رفع المحتوى',
    'الدفع الإلكتروني',
    'سحب الأرباح',
    'قوانين المنصة',
    'مسؤوليات المستخدم',
  ],
  authors: [{ name: 'منصة أ+' }],
  alternates: {
    canonical: 'https://aplusplatformsa.com/terms-of-service',
  },
  openGraph: {
    title: 'شروط الاستخدام – منصة أ+',
    description:
      'تعرف على شروط وأحكام استخدام منصة أ+ لتبادل وبيع الملخصات الدراسية، وحقوق المستخدمين والبائعين والمشترين.',
    url: 'https://aplusplatformsa.com/terms-of-service',
    siteName: 'منصة أ+',
    locale: 'ar_SA',
    type: 'article',
  },
}

export default function TermsOfService() {
  return (
    <>
      <TermsOfServicePage />
    </>
  )
}
