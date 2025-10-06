"use client";

import { useState } from "react";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2, Lock } from "lucide-react";
import { resetPasswordValidation } from "@/utils/validation/authValidation";
import useAuth from "@/hooks/useAuth";

/** declare props */
interface ResetPasswordProps {
  userId: string;
  resetPasswordToken: string;
}

/**
 * ResetPassword Component
 * Renders a form to set a new password with validation.
 */

export default function ResetPassword({
  userId,
  resetPasswordToken,
}: ResetPasswordProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const loading = false;

  const { handleResetPassword } = useAuth();

  const formik = useFormik({
    initialValues: { password: "", confirmPassword: "" },
    validationSchema: resetPasswordValidation,
    onSubmit: async (values, { resetForm }) => {
      try {
        resetForm();
        handleResetPassword({
          userId,
          resetPasswordToken,
          newPassword: values.password,
        });
      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm my-20">
      <h2 className="text-2xl font-semibold text-center mb-4">
        إعادة تعيين كلمة المرور
      </h2>
      <p className="text-sm text-muted-foreground text-center mb-6">
        أدخل كلمة مرور جديدة لحسابك
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* Password Field */}
        <PasswordField
          id="password"
          label="كلمة المرور الجديدة"
          placeholder="برجاء كتابة كلمة المرور"
          value={formik.values.password}
          error={formik.touched.password ? formik.errors.password : ""}
          show={showPassword}
          onToggle={() => setShowPassword(!showPassword)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={loading}
        />

        {/* Confirm Password Field */}
        <PasswordField
          id="confirmPassword"
          label="تأكيد كلمة المرور"
          placeholder="برجاء تأكيد كلمة المرور"
          value={formik.values.confirmPassword}
          error={
            formik.touched.confirmPassword ? formik.errors.confirmPassword : ""
          }
          show={showConfirm}
          onToggle={() => setShowConfirm(!showConfirm)}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          disabled={loading}
        />

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin ml-2" />
              جاري الحفظ...
            </>
          ) : (
            "تحديث كلمة المرور"
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
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <Input
          id={id}
          name={id}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className="pr-10"
          placeholder={placeholder}
          disabled={disabled}
        />
        <div
          className="absolute left-3 top-2.5 cursor-pointer"
          onClick={onToggle}
        >
          {show ? (
            <EyeOff className="w-5 h-5 text-gray-400" />
          ) : (
            <Eye className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
