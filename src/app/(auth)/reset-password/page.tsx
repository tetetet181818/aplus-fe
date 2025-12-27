import { Suspense } from 'react';

import { Metadata } from 'next';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';

import ResetPasswordWrapper from './ResetPasswordWrapper';

export const metadata: Metadata = {
  title: 'إعادة تعيين كلمة المرور | استعادة الوصول إلى حسابك بسهولة',
  description:
    'أعد تعيين كلمة المرور الخاصة بك بسرعة وأمان. أدخل بريدك الإلكتروني أو رقم هاتفك لإعادة ضبط كلمة السر واستعادة الوصول إلى حسابك في دقائق.',
  keywords: [
    'إعادة تعيين كلمة المرور',
    'تغيير كلمة السر',
    'استعادة الحساب',
    'نسيت كلمة المرور',
    'إعادة ضبط كلمة المرور',
    'مشاكل تسجيل الدخول',
    'استرجاع كلمة السر',
  ],
  openGraph: {
    title: 'إعادة تعيين كلمة المرور | استعادة الوصول إلى حسابك بسهولة',
    description:
      'هل نسيت كلمة المرور؟ لا تقلق! يمكنك إعادة تعيينها بسهولة عبر هذه الصفحة واستعادة حسابك بخطوات بسيطة وآمنة.',
    type: 'website',
    locale: 'ar',
    url: 'https://aplusplatformsa.com/reset-password',
  },
};

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordWrapper />
    </Suspense>
  );
}
