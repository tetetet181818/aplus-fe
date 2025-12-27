import { Suspense } from 'react';

import { Metadata } from 'next';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';

import CheckoutClient from './CheckoutClient';

export const metadata: Metadata = {
  title: 'إتمام الدفع | منصة أ+',
  description: 'إتمام عملية الدفع لشراء الملخصات الدراسية',
  robots: 'noindex, nofollow',
};

export default function CheckoutPage() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner message="" />}>
        <CheckoutClient />
      </Suspense>
    </>
  );
}
