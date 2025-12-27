'use client';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import useAuth from '@/hooks/useAuth';

import { validationForgetPassword } from '@/utils/validation/authValidation';

type ForgetPasswordFormData = z.infer<typeof validationForgetPassword>;

export default function ForgetPasswordForm() {
  const { forgetPasswordLoading, handleForgetPassword } = useAuth();
  const router = useRouter();

  const form = useForm<ForgetPasswordFormData>({
    resolver: zodResolver(validationForgetPassword),
    defaultValues: {
      email: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values: ForgetPasswordFormData) => {
    const res = await handleForgetPassword({ email: values.email });
    if (res) {
      form.reset();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            نسيت كلمة المرور
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>البريد الإلكتروني</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Mail className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type="email"
                        placeholder="example@email.com"
                        className="pr-10"
                        disabled={forgetPasswordLoading}
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={forgetPasswordLoading}
              className="w-full rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              {forgetPasswordLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جارٍ الإرسال...
                </>
              ) : (
                'إرسال رابط إعادة التعيين'
              )}
            </Button>
          </form>
        </Form>

        {/* Back to Login */}
        <div className="text-center">
          <button
            type="button"
            onClick={() => router.back()}
            className="text-primary text-sm hover:underline"
          >
            العودة للخلف
          </button>
        </div>
      </div>
    </div>
  );
}
