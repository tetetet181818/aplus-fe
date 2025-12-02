import { LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const ShouldLoginPrompt = ({
  onNavigate,
}: {
  onNavigate: (path: string) => void;
}) => {
  return (
    <div className="flex min-h-[calc(100vh-200px)] items-center justify-center px-4 py-12 md:px-6">
      <Card className="w-full max-w-md text-center shadow-xl">
        <CardHeader>
          <div className="bg-primary/10 mx-auto mb-4 w-fit rounded-full p-3">
            <LogIn className="text-primary h-8 w-8" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            يجب تسجيل الدخول
          </CardTitle>
          <CardDescription>
            لتتمكن من استخدام جميع مزايا المنصة وإجراء أي عملية، يرجى تسجيل
            الدخول إلى حسابك أو إنشاء حساب جديد.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          <p className="text-gray-600 dark:text-gray-400">
            سجّل دخولك للاستفادة من خدمات المنصة مثل إضافة وشراء الملخصات وإدارة
            حسابك بسهولة وأمان.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => onNavigate('/')} className="w-full">
              العودة إلى الصفحة الرئيسية
            </Button>
          </div>
          <p className="pt-3 text-xs text-gray-500 dark:text-gray-300">
            يمكنك تسجيل الدخول من خلال الزر الموجود في أعلى الصفحة.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ShouldLoginPrompt;
