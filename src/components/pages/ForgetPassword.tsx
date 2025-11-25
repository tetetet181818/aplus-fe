'use client'
import { useFormik } from 'formik'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Mail, Loader2, ArrowRight } from 'lucide-react'
import { validationForgetPassword } from '@/utils/validation/authValidation'
import useAuth from '@/hooks/useAuth'
import { useRouter } from 'next/navigation'
export default function ForgetPassword() {
  const { forgetPasswordLoading, handleForgetPassword } = useAuth()
  const router = useRouter()

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: validationForgetPassword,
    onSubmit: async (values, { resetForm }) => {
      const res = await handleForgetPassword({ email: values.email })
      if (res) {
        resetForm()
      }
    },
  })

  return (
    <>
      <div className="mx-auto my-20 mt-20 max-w-md rounded-xl border p-6 shadow-sm">
        <h2 className="mb-4 flex items-center justify-start gap-2 text-center text-2xl font-semibold">
          <Button onClick={() => router.back()}>
            <ArrowRight className="size-5" />
          </Button>
          نسيت كلمة المرور
        </h2>
        <p className="text-muted-foreground mb-6 text-center text-sm">
          أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pr-10 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:opacity-50"
                disabled={forgetPasswordLoading}
              />
              <Mail className="absolute top-3 right-3 h-5 w-5 text-gray-400" />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={forgetPasswordLoading}
            className="w-full disabled:opacity-50"
          >
            {forgetPasswordLoading ? (
              <>
                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                جارٍ الإرسال...
              </>
            ) : (
              'إرسال رابط إعادة التعيين'
            )}
          </Button>
        </form>
      </div>
    </>
  )
}
