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

/** Props for ReviewNote component */
interface ReviewNoteProps {
  formik: FormikProps<AddNoteValues>
  prevTab: () => void
  loading: boolean
}

/** Info item for summary section */
interface SummaryItem {
  label: string
  value: string | number
}

/** File upload status item */
interface FileItem {
  label: string
  value: string
  ok: boolean
  icon: typeof FileText
}

/** Final review step with dark mode support */
export default function ReviewNote({
  formik,
  prevTab,
  loading,
}: ReviewNoteProps) {
  const { basic, file, cover, review } = formik.values

  const summaryItems: SummaryItem[] = [
    { label: 'العنوان', value: basic.title },
    { label: 'السعر', value: `${basic.price || '—'} ريال` },
    { label: 'الوصف', value: basic.description },
    { label: 'الجامعة', value: basic.university },
    { label: 'الكلية', value: basic.college },
    { label: 'المادة', value: basic.subject },
    { label: 'عدد الصفحات', value: basic.pagesNumber },
    { label: 'السنة', value: basic.year || '' },
    { label: 'طريقة التواصل', value: basic.contactMethod },
  ]

  const fileItems: FileItem[] = [
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
      className={`mx-auto max-w-4xl space-y-8 p-4 transition-opacity duration-200 ${
        loading ? 'pointer-events-none opacity-60' : 'opacity-100'
      }`}
    >
      <Header />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <BasicInfoCard items={summaryItems} />
          <UploadedFilesCard items={fileItems} />
        </div>

        <div className="space-y-6">
          <TermsCard
            accepted={review.termsAccepted}
            onAcceptChange={(v) =>
              formik.setFieldValue('review.termsAccepted', v === true)
            }
          />
          <ActionButtons
            termsAccepted={review.termsAccepted}
            loading={loading}
            onPrevClick={prevTab}
          />
        </div>
      </div>
    </div>
  )
}

/** Review header with icon and text */
function Header() {
  return (
    <div className="space-y-3 text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 dark:bg-blue-900/30">
        <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
      </div>
      <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
        مراجعة البيانات قبل الإرسال
      </h3>
      <p className="text-lg text-gray-600 dark:text-gray-400">
        تأكد من صحة جميع البيانات قبل تأكيد الإرسال
      </p>
    </div>
  )
}

/** Card displaying basic note information */
function BasicInfoCard({ items }: { items: SummaryItem[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <h4 className="mb-4 flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
        <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        المعلومات الأساسية
      </h4>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {items.map((item, i) => (
          <div key={i} className="space-y-1">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
              {item.label}
            </span>
            <p className="truncate font-medium text-gray-900 dark:text-gray-50">
              {item.value || '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

/** Card showing uploaded files status */
function UploadedFilesCard({ items }: { items: FileItem[] }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
        الملفات المرفوعة
      </h4>
      <div className="space-y-4">
        {items.map((item, i) => (
          <FileStatusItem key={i} item={item} />
        ))}
      </div>
    </div>
  )
}

/** Single file status indicator */
function FileStatusItem({ item }: { item: FileItem }) {
  const Icon = item.icon
  const statusColors = item.ok
    ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
    : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'

  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 p-3 transition-colors dark:bg-gray-700/50">
      <div className="flex items-center gap-3">
        <div className={`rounded-full p-2 ${statusColors}`}>
          <Icon className="h-4 w-4" />
        </div>
        <div>
          <p className="font-medium text-gray-900 dark:text-gray-50">
            {item.label}
          </p>
          <p className={`text-sm ${statusColors}`}>{item.value}</p>
        </div>
      </div>
      {item.ok ? (
        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
      ) : (
        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
      )}
    </div>
  )
}

/** Terms and conditions acceptance card */
function TermsCard({
  accepted,
  onAcceptChange,
}: {
  accepted: boolean
  onAcceptChange: (v: boolean) => void
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-colors dark:border-gray-700 dark:bg-gray-800">
      <h4 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-50">
        الشروط والأحكام
      </h4>
      <div className="flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 p-4 transition-colors dark:border-blue-800 dark:bg-blue-900/20">
        <p className="flex-1 text-end text-gray-700 dark:text-gray-300">
          أوافق على{' '}
          <Link
            href="/terms-of-service"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            الشروط والأحكام الخاصة
          </Link>{' '}
          برفع الملخص ونشره
        </p>
        <Checkbox
          id="terms"
          checked={accepted}
          onCheckedChange={(v) => onAcceptChange(v === true)}
          className="h-8 w-8 flex-shrink-0 border-gray-300 bg-white data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 dark:border-gray-600 dark:bg-gray-700 dark:data-[state=checked]:border-blue-500 dark:data-[state=checked]:bg-blue-600"
        />
      </div>
    </div>
  )
}

/** Submit and back navigation buttons */
function ActionButtons({
  termsAccepted,
  loading,
  onPrevClick,
}: {
  termsAccepted: boolean
  loading: boolean
  onPrevClick: () => void
}) {
  return (
    <div className="space-y-4">
      <Button
        type="submit"
        disabled={!termsAccepted || loading}
        className="h-12 w-full transform gap-2 rounded-xl bg-green-600 text-lg font-medium transition-all hover:scale-[1.02] hover:bg-green-700 disabled:opacity-50 disabled:hover:scale-100 dark:bg-green-600 dark:hover:bg-green-700"
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
        onClick={onPrevClick}
        variant="outline"
        disabled={loading}
        className="h-11 w-full gap-2 rounded-xl border-gray-300 text-gray-700 transition-all hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
      >
        <ArrowRight className="h-4 w-4" /> السابق
      </Button>
    </div>
  )
}
