'use client';

import { useRouter } from 'next/navigation';

import LoginForm from '@/components/molecules/forms/LoginForm';

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        <LoginForm
          onSuccess={() => router.push('/dashboard')}
          onSwitchToRegister={() => router.push('/register')}
        />
      </div>
    </div>
  );
}
