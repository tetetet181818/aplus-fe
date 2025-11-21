'use client'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  ImageIcon,
  Loader2,
} from 'lucide-react'
import { FormikProps } from 'formik'
import { AddNoteValues } from './AddNoteForm'
import Link from 'next/link'

/** Final review step in Add Note form with loading indicator during creation */
export default function ReviewNote({
  formik,
  prevTab,
  loading,
}: {
  formik: FormikProps<AddNoteValues>
  prevTab: () => void
  loading: boolean
}) {
  const { basic, file, cover, review } = formik.values

  const summaryItems = [
    { label: 'العنوان', value: basic.title },
    { label: 'السعر', value: `${basic.price || '—'} ريال` },
    { label: 'الوصف', value: basic.description },
    { label: 'الجامعة', value: basic.university },
    { label: 'الكلية', value: basic.college },
    { label: 'المادة', value: basic.subject },
    { label: 'عدد الصفحات', value: basic.pagesNumber },
    { label: 'السنة', value: basic.year },
    { label: 'طريقة التواصل', value: basic.contactMethod },
  ]

  const fileItems = [
    {
      label: 'ملف الملخص',
      value: file.file ? 'تم رفع الملف' : 'لم يتم رفع الملف',
      ok: !!file.file,
      icon: FileText,
    },
    {
      label: 'صورة الغلاف',
      value: cover.cover ? 'تم رفع الصورة' : 'لم يتم رفع الصورة',
      ok: !!cover.cover,
      icon: ImageIcon,
    },
  ]

  return (
    <div
      className={`mx-auto max-w-4xl space-y-8 p-4 transition-opacity ${
        loading ? 'pointer-events-none opacity-60' : 'opacity-100'
      }`}
    >
      {/* Header */}
      <div className="space-y-3 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/20">
          <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
          مراجعة البيانات قبل الإرسال
        </h3>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          تأكد من صحة جميع البيانات قبل تأكيد الإرسال
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Basic Info */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-white">
              <FileText className="h-5 w-5 text-blue-600" />
              المعلومات الأساسية
            </h4>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {summaryItems.map((item, i) => (
                <div key={i} className="space-y-1">
                  <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                    {item.label}
                  </span>
                  <p className="truncate font-medium text-gray-900 dark:text-white">
                    {item.value || '—'}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Uploaded Files */}
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              الملفات المرفوعة
            </h4>
            <div className="space-y-4">
              {fileItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-full p-2 ${
                        item.ok
                          ? 'bg-green-100 dark:bg-green-900/20'
                          : 'bg-red-100 dark:bg-red-900/20'
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${
                          item.ok
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {item.label}
                      </p>
                      <p
                        className={`text-sm ${
                          item.ok
                            ? 'text-green-600 dark:text-green-400'
                            : 'text-red-600 dark:text-red-400'
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                  {item.ok ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              الشروط والأحكام
            </h4>
            <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4">
              <p className="flex-1 text-end">
                أوافق على{' '}
                <Link
                  href="/terms-of-service"
                  className="text-blue-600 hover:underline"
                >
                  الشروط والأحكام الخاصة
                </Link>{' '}
                برفع الملخص ونشره
              </p>
              <Checkbox
                id="terms"
                checked={review.termsAccepted}
                onCheckedChange={(v) =>
                  formik.setFieldValue('review.termsAccepted', v === true)
                }
                className="h-8 w-8 flex-shrink-0 bg-white data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={!review.termsAccepted || loading}
              className="h-12 w-full transform gap-2 rounded-xl bg-green-600 text-lg font-medium transition hover:scale-[1.02] hover:bg-green-700 disabled:opacity-50 dark:bg-green-700 dark:hover:bg-green-600"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  جارٍ إنشاء الملخص...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  تأكيد الإنشاء
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={prevTab}
              variant="outline"
              disabled={loading}
              className="h-11 w-full gap-2 rounded-xl border-gray-300 text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ArrowRight className="h-4 w-4" /> السابق
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
