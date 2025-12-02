import { LogIn } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const AddNoteLoginPrompt = ({
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
          <CardTitle className="text-2xl">يجب تسجيل الدخول</CardTitle>
          <CardDescription>
            لإضافة ملخص جديد، يرجى تسجيل الدخول إلى حسابك أو إنشاء حساب جديد.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            انضم إلى مجتمعنا وشارك ملخصاتك مع آلاف الطلاب.
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={() => onNavigate('/')} className="w-full">
              العودة للرئيسية
            </Button>
          </div>
          <p className="pt-2 text-xs text-gray-500 dark:text-gray-300">
            تسجيل الدخول متاح من خلال القائمة العلوية.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddNoteLoginPrompt;
