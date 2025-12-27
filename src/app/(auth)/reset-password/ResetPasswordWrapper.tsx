'use client';

import { useSearchParams } from 'next/navigation';

import ResetPasswordForm from '@/components/molecules/forms/ResetPasswordForm';

export default function ResetPasswordWrapper() {
  const searchParams = useSearchParams();
  const userId = searchParams.get('userId');
  const resetPasswordToken = searchParams.get('resetPasswordToken');

  if (!userId || !resetPasswordToken) {
    return (
      <div className="mx-auto my-20 max-w-md rounded-xl border p-6 text-center shadow-sm dark:border-gray-700">
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          الرجاء التحقق من رابط إعادة تعيين كلمة المرور
        </h1>
        <p className="text-muted-foreground mt-2 text-sm">
          الرابط غير صالح أو منتهي الصلاحية
        </p>
      </div>
    );
  }

  return (
    <ResetPasswordForm
      userId={userId}
      resetPasswordToken={resetPasswordToken}
    />
  );
}
