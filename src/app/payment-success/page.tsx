import { Suspense } from 'react';

import { Metadata } from 'next';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';

import PaymentSuccessClient from './PaymentSuccessClient';

export const metaData: Metadata = {
  title: 'تأكيد الدفع | منصة أ+',
  description: 'صفحة تأكيد عملية الدفع الناجحة',
  robots: 'noindex, nofollow',
};

export default function page() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner message="" />}>
        <PaymentSuccessClient />
      </Suspense>
    </div>
  );
}
