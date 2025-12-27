'use client';

import { useRouter } from 'next/navigation';

import RegisterForm from '@/components/molecules/forms/RegisterForm';

export default function RegisterPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent max-h-[90vh] w-full max-w-md overflow-y-auto rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        <RegisterForm
          onSuccess={() => router.push('/dashboard')}
          onSwitchToLogin={() => router.push('/login')}
        />
      </div>
    </div>
  );
}
