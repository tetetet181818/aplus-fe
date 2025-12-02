'use client';

import { useState } from 'react';

import { useRouter } from 'next/navigation';

import { useFormik } from 'formik';
import { ArrowRight, Eye, EyeOff, Loader2, Lock } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import useAuth from '@/hooks/useAuth';

import { resetPasswordValidation } from '@/utils/validation/authValidation';

/** declare props */
interface ResetPasswordProps {
  userId: string | null;
  resetPasswordToken: string | null;
}

/**
 * ResetPassword Component
 * Renders a form to set a new password with validation.
 */

export default function ResetPassword({
  userId,
  resetPasswordToken,
}: ResetPasswordProps) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { handleResetPassword, resetPasswordLoading } = useAuth();

  const formik = useFormik({
    initialValues: { password: '', confirmPassword: '' },
    validationSchema: resetPasswordValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        resetForm();
        handleResetPassword({
          userId: userId || '',
          resetPasswordToken: resetPasswordToken || '',
          newPassword: values.password,
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="mx-auto my-20 mt-20 max-w-md rounded-xl border p-6 shadow-sm">
      <h2 className="mb-4 flex items-center justify-center gap-2 text-center text-2xl font-semibold">
        <Button onClick={() => router.back()}>
          <ArrowRight className="size-5" />
        </Button>
        <span className="text-primary">إعادة تعيين كلمة المرور</span>
      </h2>
      <p className="text-muted-foreground mb-6 text-center text-sm">
        أدخل كلمة مرور جديدة لحسابك
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Password Field */}
        <PasswordField
          id="password"
          label="كلمة المرور الجديدة"
          placeholder="برجاء كتابة كلمة المرور"
          value={formik.values.password}
          error={formik.touched.password ? formik.errors.password : ''}
          show={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={resetPasswordLoading}
        />

        {/* Confirm Password Field */}
        <PasswordField
          id="confirmPassword"
          label="تأكيد كلمة المرور"
          placeholder="برجاء تأكيد كلمة المرور"
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword ? formik.errors.confirmPassword : ''
          }
          show={showConfirm}
          onToggle={() => setShowConfirm(!showConfirm)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={resetPasswordLoading}
        />

        <Button
          type="submit"
          disabled={resetPasswordLoading}
          className="w-full disabled:cursor-not-allowed disabled:opacity-50"
        >
          {resetPasswordLoading ? (
            <>
              <Loader2 className="ml-2 h-4 w-4 animate-spin" />
              جاري الحفظ...
            </>
          ) : (
            'تحديث كلمة المرور'
          )}
        </Button>
      </form>
    </div>
  );
}

/**
 * PasswordField Component
 * @param {Object} props - Field props
 */
function PasswordField({
  id,
  label,
  placeholder,
  value,
  error,
  show,
  onToggle,
  onChange,
  onBlur,
  disabled,
}: {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  show: boolean;
  disabled?: boolean;
  onToggle: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="pr-10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50"
          placeholder={placeholder}
          disabled={disabled}
        />
        <div
          className="absolute top-2.5 left-3 cursor-pointer"
          onClick={onToggle}
        >
          {show ? (
            <EyeOff className="h-5 w-5 text-gray-400" />
          ) : (
            <Eye className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
