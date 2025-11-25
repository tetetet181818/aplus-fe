'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema } from '@/utils/validation/authValidation'
import { useFormik } from 'formik'
import { Eye, EyeOff, Loader2, Lock, Mail } from 'lucide-react'
import GoogleLoginButton from '@/components/atoms/GoogleLoginButton'
import Link from 'next/link'
import useAuth from '@/hooks/useAuth'

/** Props for LoginDialog */
interface LoginProps {
  isOpen: boolean
  onClose: () => void
  onSwitchToRegister: () => void
}

/**
 * LoginDialog — Modal for user login
 * Validates credentials and visually highlights invalid inputs.
 */
const LoginDialog = ({ isOpen, onClose, onSwitchToRegister }: LoginProps) => {
  const [showPassword, setShowPassword] = useState(false)
  const { loginUser, loading } = useAuth()

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm, setErrors }) => {
      const res = await loginUser(values)
      if (!res) {
        // if login fails, show global error or mark both fields red
        setErrors({
          email: 'خطأ في البريد الإلكتروني أو كلمة المرور',
          password: 'خطأ في البريد الإلكتروني أو كلمة المرور',
        })
        return
      }
      resetForm()
      onClose()
    },
  })

  /** Conditionally apply red border if error exists */
  const getInputClass = (field: string) =>
    `pr-10 border ${
      formik.errors[field as keyof typeof formik.errors]
        ? 'border-red-500 focus-visible:ring-red-500'
        : 'border-gray-300 dark:border-gray-700'
    } `

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent max-w-md rounded-2xl p-6 shadow-2xl sm:p-8">
        <DialogHeader className="space-y-2 text-center">
          <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
            تسجيل الدخول
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-400">
            مرحبًا بعودتك! قم بتسجيل الدخول للوصول إلى جميع المزايا.
          </DialogDescription>
        </DialogHeader>

        {/* Google Button */}
        <div className="mt-4 space-y-3">
          <p className="text-muted-foreground text-center text-sm">
            سجّل دخولك بواسطة Google
          </p>
          <GoogleLoginButton />
        </div>

        {/* Divider */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-gray-400">أو</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={formik.handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <Mail className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={getInputClass('email')}
              />
            </div>
            {formik.errors.email && (
              <p className="text-xs text-red-500">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">كلمة المرور</Label>
            <div className="relative">
              <Lock className="absolute top-1/2 right-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="********"
                value={formik.values.password}
                onChange={formik.handleChange}
                className={getInputClass('password')}
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
            {formik.errors.password && (
              <p className="text-xs text-red-500">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full rounded-lg shadow-md transition-all hover:shadow-lg"
            disabled={loading || formik.isSubmitting}
          >
            {loading || formik.isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                جارٍ الدخول...
              </>
            ) : (
              'تسجيل الدخول'
            )}
          </Button>
        </form>

        {/* Links */}
        <div className="mt-6 space-y-3 text-center">
          <Link
            href="/forget-password"
            className="text-primary text-sm hover:underline"
            onClick={onClose}
          >
            نسيت كلمة المرور؟
          </Link>

          <p className="text-sm text-gray-600 dark:text-gray-400">
            لا تمتلك حساب؟{' '}
            <button
              type="button"
              className="text-primary font-semibold hover:underline"
              onClick={onSwitchToRegister}
            >
              إنشاء حساب جديد
            </button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default LoginDialog
