'use client'

import { useEffect } from 'react'
import { notFound, useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Loader } from 'lucide-react'
import { useVerifyMutation } from '@/store/api/auth.api'
import { toast } from 'sonner'

export default function VerifyClient() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [verify, { isLoading, isSuccess, isError, error }] = useVerifyMutation()

  if (!token) notFound()

  useEffect(() => {
    const runVerification = async () => {
      try {
        const res = await verify({ token: token }).unwrap()
        toast.success(res?.message)
        setTimeout(() => router.push('/'), 1000)
      } catch (err) {
        toast.error((err as { data?: { message?: string } })?.data?.message)
      }
    }

    runVerification()
  }, [token, verify, router])

  const bgClass = isLoading
    ? 'from-gray-50 to-gray-100'
    : isSuccess
      ? 'from-green-50 to-green-100'
      : isError
        ? 'from-red-50 to-red-100'
        : 'from-gray-50 to-gray-100'

  return (
    <div
      className={`flex min-h-screen items-center justify-center bg-gradient-to-br ${bgClass} p-4`}
      dir="rtl"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-xl">
        <div className="mb-4 flex justify-center">
          <div
            className={`flex h-20 w-20 items-center justify-center rounded-full ${
              isSuccess
                ? 'bg-green-100'
                : isError
                  ? 'bg-red-100'
                  : 'bg-gray-100'
            }`}
          >
            {isSuccess ? (
              <span className="text-4xl">✅</span>
            ) : isError ? (
              <span className="text-4xl">❌</span>
            ) : (
              <Loader className="size-10 animate-spin text-gray-500" />
            )}
          </div>
        </div>

        {isLoading && (
          <>
            <h1 className="mb-2 text-2xl font-bold text-gray-700">
              جاري التحقق...
            </h1>
            <p className="mb-6 text-gray-600">
              يرجى الانتظار أثناء تحققنا من حسابك
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <h1 className="mb-2 text-2xl font-bold text-green-600">
              تم التحقق بنجاح
            </h1>
            <p className="mb-6 text-gray-600">
              تم تفعيل حسابك بنجاح. يمكنك الآن استخدام المنصة بشكل طبيعي
            </p>
          </>
        )}

        {isError && (
          <>
            <h1 className="mb-2 text-2xl font-bold text-red-600">فشل التحقق</h1>
            <p className="mb-6 text-gray-600">
              {(error as { data?: { message?: string } })?.data?.message ||
                'حدث خطأ أثناء التحقق من حسابك.'}
            </p>
          </>
        )}

        <Link href="/" passHref>
          <Button
            className={`${
              isError
                ? 'bg-red-500 hover:bg-red-600'
                : isSuccess
                  ? 'bg-green-500 hover:bg-green-600'
                  : 'bg-gray-500 hover:bg-gray-600'
            } rounded-lg px-6 py-2 font-semibold text-white transition`}
          >
            العودة للرئيسية
          </Button>
        </Link>
      </div>
    </div>
  )
}
