'use client';

import { ShieldAlert } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AccessDeniedPage({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) {
  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 px-4 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <Card className="w-full max-w-md border border-red-100 text-center shadow-2xl dark:border-gray-700">
        <CardHeader>
          <div className="mx-auto mb-4 w-fit rounded-full bg-red-100 p-3 dark:bg-red-900/30">
            <ShieldAlert className="h-10 w-10 text-red-600 dark:text-red-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-700 dark:text-red-400">
            عذرًا، غير مسموح لك باستخدام هذه الصفحة
          </CardTitle>
          <CardDescription>
            يبدو أنك تحاول الوصول إلى صفحة غير مصرح لك بها. يرجى التحقق من
            صلاحيات حسابك أو العودة إلى الصفحة الرئيسية.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-gray-600 dark:text-gray-400">
            إذا كنت تعتقد أن هذا خطأ، يمكنك التواصل مع فريق الدعم لمساعدتك في حل
            المشكلة.
          </p>
          <div className="flex justify-center">
            <Button
              onClick={() => onNavigate('/')}
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              العودة إلى الصفحة الرئيسية
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
