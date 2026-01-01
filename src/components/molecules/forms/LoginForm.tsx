'use client';

import { useState } from 'react';

import Link from 'next/link';

import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react';
import { useForm } from 'react-hook-form';

import GoogleLoginButton from '@/components/atoms/GoogleLoginButton';
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

import { LoginFormData, loginSchema } from '@/utils/validation/authValidation';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToRegister?: () => void;
}

/**
 * LoginForm — Standalone login form component
 * Validates credentials and visually highlights invalid inputs.
 */
const LoginForm = ({ onSuccess, onSwitchToRegister }: LoginFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const { loginUser, loading } = useAuth();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit', 
    reValidateMode: 'onSubmit',
  });

  const onSubmit = async (values: LoginFormData) => {
    const res = await loginUser(values);
    if (!res) {
      form.setError('email', {
        message: 'خطأ في البريد الإلكتروني أو كلمة المرور',
      });
      form.setError('password', {
        message: 'خطأ في البريد الإلكتروني أو كلمة المرور',
      });
      return;
    }
    form.reset();
    onSuccess?.();
  };

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          تسجيل الدخول
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          مرحبًا بعودتك! قم بتسجيل الدخول للوصول إلى جميع المزايا.
        </p>
      </div>

      <div className="space-y-3">
        <p className="text-muted-foreground text-center text-sm">
          سجّل دخولك بواسطة Google
        </p>
        <GoogleLoginButton />
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-gray-400">أو</span>
        </div>
      </div>

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
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>كلمة المرور</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Lock className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="********"
                      className="pr-10"
                      {...field}
                    />
                    <button
                      type="button"
                      className="absolute top-1/2 left-3 -translate-y-1/2"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? 'إخفاء كلمة المرور' : 'إظهار كلمة المرور'
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

          <Button
            type="submit"
            className="w-full rounded-lg shadow-md transition-all hover:shadow-lg"
            disabled={loading || form.formState.isSubmitting}
          >
            {loading || form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جارٍ الدخول...
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </Button>
        </form>
      </Form>

      <div className="space-y-3 text-center">
        <Link
          href="/forget-password"
          className="text-primary text-sm hover:underline"
        >
          نسيت كلمة المرور؟
        </Link>

        <p className="text-sm text-gray-600 dark:text-gray-400">
          لا تمتلك حساب؟{' '}
          {onSwitchToRegister ? (
            <button
              type="button"
              className="text-primary font-semibold hover:underline"
              onClick={onSwitchToRegister}
            >
              إنشاء حساب جديد
            </button>
          ) : (
            <Link
              href="/register"
              className="text-primary font-semibold hover:underline"
            >
              إنشاء حساب جديد
            </Link>
          )}
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
