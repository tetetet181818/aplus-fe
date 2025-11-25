// CheckoutClient.tsx
'use client'

import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import useNoteDetail from '@/hooks/useNoteDetail'

export default function CheckoutClient() {
  const searchParams = useSearchParams()
  const noteId = searchParams.get('noteId')
  const userId = searchParams.get('userId')
  const amount = searchParams.get('amount')
  const { handleCreatePaymentLink, createPaymentLinkLoading } = useNoteDetail(
    noteId || ''
  )

  const handlePay = async () => {
    if (!noteId || !userId || !amount) {
      return
    }
    await handleCreatePaymentLink({
      userId,
      noteId,
      amount,
    })
  }

  return (
    <main className="flex min-h-3/6 items-center justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-lg dark:bg-gray-800">
        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
          إتمام عملية الشراء
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          سيتم تحويلك إلى بوابة الدفع الآمنة لإتمام عملية الشراء
        </p>

        <div className="mb-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            المبلغ:{' '}
            <span className="text-primary dark:text-primary-light">
              {amount} ريال
            </span>
          </p>
        </div>

        <Button
          onClick={handlePay}
          disabled={createPaymentLinkLoading}
          className="w-full py-3 text-lg"
        >
          {createPaymentLinkLoading ? 'جاري التحميل...' : 'الانتقال للدفع'}
        </Button>

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          عملية الدفع آمنة ومشفرة بالكامل
        </p>
      </div>
    </main>
  )
}
