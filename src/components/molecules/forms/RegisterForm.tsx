'use client';

import { useCallback, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import { universities } from '@/constants';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Building2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from 'lucide-react';
import { useForm } from 'react-hook-form';

import GoogleLoginButton from '@/components/atoms/GoogleLoginButton';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import useAuth from '@/hooks/useAuth';

import {
  RegisterFormData,
  registerSchema,
} from '@/utils/validation/authValidation';

import successImage from '../../../../public/success-icon.png';

/**
 * Registration form component.
 * Handles user registration, validation, and email verification UI.
 * All inputs and selects are disabled when loading is true.
 */
interface RegisterFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

const RegisterForm = ({ onSuccess, onSwitchToLogin }: RegisterFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showVerifyMessage, setShowVerifyMessage] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');
  const { registerUser, loading } = useAuth();

  const togglePassword = useCallback(() => setShowPassword(prev => !prev), []);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      university: '',
    },
    mode: 'onBlur', // Validate on blur
    reValidateMode: 'onChange', // Revalidate on change after first blur
  });

  const onSubmit = async (values: RegisterFormData) => {
    if (!termsAccepted) return;
    setRegisteredEmail(values.email);
    const res = await registerUser(values);
    if (res) {
      form.reset();
      setShowVerifyMessage(true);
    }
  };

  const disabledClass =
    'opacity-60 cursor-not-allowed bg-gray-100 dark:bg-gray-800 text-gray-400 border-gray-300';

  if (showVerifyMessage) {
    return (
      <div className="w-full space-y-6">
        <div className="space-y-4 py-6 text-center">
          <Image
            src={successImage}
            alt="نجاح"
            width={60}
            height={60}
            className="mx-auto"
          />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            تحقق من بريدك الإلكتروني
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            تم إرسال رسالة تحقق إلى:
            <span className="mt-1 block font-medium">{registeredEmail}</span>
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            يرجى فتح الرسالة والضغط على رابط التفعيل لإكمال التسجيل.
          </p>
          <Button onClick={() => setShowVerifyMessage(false)} className="mt-4">
            العودة إلى التسجيل
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          إنشاء حساب جديد
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          انضم إلينا للوصول إلى كل المميزات الأكاديمية بسهولة
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>اسم المستخدم</FormLabel>
                <FormControl>
                  <div className="relative">
                    <User className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Input
                      placeholder="اكتب اسمك هنا"
                      className={`pr-10 ${loading ? disabledClass : ''}`}
                      disabled={loading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
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
                      className={`pr-10 ${loading ? disabledClass : ''}`}
                      disabled={loading}
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* University */}
          <FormField
            control={form.control}
            name="university"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الجامعة</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute top-1/2 right-3 z-10 h-5 w-5 -translate-y-1/2 text-gray-400" />
                    <Select
                      value={field.value}
                      onValueChange={field.onChange}
                      disabled={loading}
                    >
                      <SelectTrigger
                        className={`w-full pr-10 ${loading ? disabledClass : ''}`}
                      >
                        <SelectValue placeholder="اختر الجامعة" />
                      </SelectTrigger>
                      <SelectContent>
                        {universities.map(uni => (
                          <SelectItem key={uni} value={uni}>
                            {uni}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Password */}
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
                      className={`px-10 ${loading ? disabledClass : ''}`}
                      disabled={loading}
                      {...field}
                    />
                    <button
                      type="button"
                      onClick={togglePassword}
                      disabled={loading}
                      className={`absolute top-1/2 left-3 -translate-y-1/2 ${
                        loading ? 'cursor-not-allowed opacity-50' : ''
                      }`}
                      aria-label="إظهار أو إخفاء كلمة المرور"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </FormControl>
                <p className="text-xs text-gray-500">
                  يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
                </p>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Terms */}
          <div
            className={`flex items-start gap-2 ${
              loading ? 'pointer-events-none opacity-60' : ''
            }`}
          >
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={checked => setTermsAccepted(!!checked)}
              disabled={loading}
            />
            <label
              htmlFor="terms"
              className="text-sm leading-none text-gray-700 dark:text-gray-300"
            >
              أوافق على{' '}
              <Link
                href="/terms-of-service"
                className="text-primary hover:underline"
              >
                الشروط والأحكام
              </Link>{' '}
              و{' '}
              <Link
                href="/privacy-policy"
                className="text-primary hover:underline"
              >
                سياسة الخصوصية
              </Link>
            </label>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full rounded-lg shadow-md transition-all hover:shadow-lg"
            disabled={loading || form.formState.isSubmitting || !termsAccepted}
          >
            {loading || form.formState.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جاري التسجيل...
              </>
            ) : (
              'إنشاء حساب'
            )}
          </Button>
        </form>
      </Form>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 text-gray-400 dark:bg-transparent">أو</span>
        </div>
      </div>

      {/* Google Button */}
      <div className={loading ? 'pointer-events-none opacity-60' : ''}>
        <GoogleLoginButton />
      </div>

      {/* Switch to login */}
      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        لديك حساب؟{' '}
        {onSwitchToLogin ? (
          <button
            type="button"
            className="text-primary font-semibold hover:underline"
            onClick={onSwitchToLogin}
            disabled={loading}
          >
            تسجيل الدخول
          </button>
        ) : (
          <Link
            href="/login"
            className="text-primary font-semibold hover:underline"
          >
            تسجيل الدخول
          </Link>
        )}
      </p>
    </div>
  );
};

export default RegisterForm;
