import { Suspense } from 'react';

import { Metadata } from 'next';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';

import SellerProfilePage from './SellerClient';

export const metadata: Metadata = {
  title: 'تفاصيل البائع | منصة أ+',
  description:
    'اطلب ملخصاتك الدراسية في مكان واحد، واطلب ملخصات جاهزة بسرعة وسهولة.',
  keywords: [
    'تفاصيل البائع',
    'بائع',
    'تتبع البائع',
    'إدارة البائع',
    'بائع سريعة',
    'بائع جاهز',
    'منصة تلخيص',
  ],
};

export default async function page({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  return (
    <Suspense fallback={<LoadingSpinner message="" />}>
      <SellerProfilePage userId={userId} />
    </Suspense>
  );
}
