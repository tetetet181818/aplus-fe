'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Lock } from 'lucide-react';
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

import { resetPasswordValidation } from '@/utils/validation/authValidation';

type ResetPasswordFormData = z.infer<typeof resetPasswordValidation>;

interface ResetPasswordFormProps {
  userId: string | null;
  resetPasswordToken: string | null;
}

export default function ResetPasswordForm({
  userId,
  resetPasswordToken,
}: ResetPasswordFormProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const { handleResetPassword, resetPasswordLoading } = useAuth();

  const form = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordValidation),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  const onSubmit = async (values: ResetPasswordFormData) => {
    try {
      await handleResetPassword({
        userId: userId || '',
        resetPasswordToken: resetPasswordToken || '',
        newPassword: values.password,
      });
      form.reset();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4 py-12 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full max-w-md space-y-6 rounded-2xl bg-white p-8 shadow-2xl dark:bg-gray-800">
        {/* Header */}
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            إعادة تعيين كلمة المرور
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            أدخل كلمة مرور جديدة لحسابك
          </p>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            {/* Password Field */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>كلمة المرور الجديدة</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="برجاء كتابة كلمة المرور"
                        className="px-10"
                        disabled={resetPasswordLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                        onClick={() => setShowPassword(!showPassword)}
                        aria-label={
                          showPassword
                            ? 'إخفاء كلمة المرور'
                            : 'إظهار كلمة المرور'
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Confirm Password Field */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تأكيد كلمة المرور</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <Input
                        type={showConfirm ? 'text' : 'password'}
                        placeholder="برجاء تأكيد كلمة المرور"
                        className="px-10"
                        disabled={resetPasswordLoading}
                        {...field}
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 left-3 -translate-y-1/2"
                        onClick={() => setShowConfirm(!showConfirm)}
                        aria-label={
                          showConfirm
                            ? 'إخفاء كلمة المرور'
                            : 'إظهار كلمة المرور'
                        }
                      >
                        {showConfirm ? (
                          <EyeOff className="h-5 w-5 text-gray-400" />
                        ) : (
                          <Eye className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={resetPasswordLoading}
              className="w-full rounded-lg shadow-md transition-all hover:shadow-lg"
            >
              {resetPasswordLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  جاري الحفظ...
                </>
              ) : (
                'تحديث كلمة المرور'
              )}
            </Button>
          </form>
        </Form>

        {/* Back Button */}
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
