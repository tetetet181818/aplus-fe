'use client'

import { useRef, useState, useEffect } from 'react'
import { FormikProps } from 'formik'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, FileUp, X, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { AddNoteValues } from './AddNoteForm'

interface UploadFileNoteProps {
  formik: FormikProps<AddNoteValues>
  prevTab: () => void
  nextTab: () => Promise<void> | void
}

/** File upload step with PDF preview and validation */
export default function UploadFileNote({
  formik,
  prevTab,
  nextTab,
}: UploadFileNoteProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Generate preview URL for uploaded PDF
  useEffect(() => {
    const file = formik.values.file?.file
    if (file instanceof File) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreviewUrl(null)
  }, [formik.values.file?.file])

  /** Validates and handles PDF file selection */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) {
      setStatus('يجب اختيار ملف')
      formik.setFieldValue('file.file', null)
      return
    }

    if (file.type === 'application/pdf') {
      formik.setFieldValue('file.file', file)
      setStatus('تم رفع الملف بنجاح ✅')
      toast.success('تم رفع الملف بنجاح')
    } else {
      formik.setFieldValue('file.file', null)
      formik.setFieldError('file.file', 'الملف يجب أن يكون بصيغة PDF')
      setStatus('الملف يجب أن يكون بصيغة PDF ❌')
      toast.error('الملف يجب أن يكون بصيغة PDF')
    }
  }

  /** Removes uploaded file and resets state */
  const handleRemoveFile = () => {
    formik.setFieldValue('file.file', null)
    setStatus(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.info('تم إزالة الملف')
  }

  /** Validates form and proceeds to next step */
  const handleNext = async () => {
    try {
      const errors = await formik.validateForm()
      if (Object.keys(errors).length > 0) {
        toast.error('تحقق من رفع الملف قبل المتابعة')
        return
      }

      if (!formik.values.file.file) {
        toast.error('الرجاء رفع ملف PDF أولاً')
        return
      }

      await nextTab()
    } catch {
      toast.error('حدث خطأ أثناء الانتقال للخطوة التالية')
    }
  }

  const uploadedFile = formik.values.file?.file
  const fileError = formik.errors.file?.file

  return (
    <>
      <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6 dark:bg-gray-800">
        {!uploadedFile ? (
          <UploadArea
            fileInputRef={fileInputRef}
            fileError={fileError}
            onUploadClick={() => fileInputRef.current?.click()}
          />
        ) : (
          <FilePreview
            file={uploadedFile}
            previewUrl={previewUrl}
            status={status}
            onRemove={handleRemoveFile}
            onChangeFile={() => fileInputRef.current?.click()}
          />
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <NavigationButtons onPrev={prevTab} onNext={handleNext} />
    </>
  )
}

interface UploadAreaProps {
  fileInputRef: React.RefObject<HTMLInputElement>
  fileError?: string
  onUploadClick: () => void
}

/** Upload area displayed when no file is selected */
const UploadArea = ({ fileError, onUploadClick }: UploadAreaProps) => (
  <div className="flex flex-col items-center gap-3">
    <div
      className="cursor-pointer rounded-full border-2 border-dashed border-gray-300 p-6 transition hover:border-blue-400 dark:border-gray-600 dark:hover:border-blue-500"
      onClick={onUploadClick}
    >
      <FileUp className="size-10 text-blue-400 dark:text-blue-500" />
    </div>
    <p className="mt-2 font-medium text-gray-800 dark:text-gray-200">
      اختر ملف الملخص
    </p>
    <p className="text-sm text-gray-500 dark:text-gray-400">PDF فقط</p>

    {fileError && (
      <p className="mt-1 text-sm text-red-500 dark:text-red-400">
        {String(fileError)}
      </p>
    )}

    <Button
      variant="default"
      onClick={onUploadClick}
      className="mt-5 dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
      type="button"
    >
      رفع الملف
    </Button>
  </div>
)

interface FilePreviewProps {
  file: File | null
  previewUrl: string | null
  status: string | null
  onRemove: () => void
  onChangeFile: () => void
}

/** Displays uploaded file info and PDF preview */
const FilePreview = ({
  file,
  previewUrl,
  status,
  onRemove,
  onChangeFile,
}: FilePreviewProps) => (
  <div className="flex w-full flex-col items-center gap-4">
    {/* File info header */}
    <div className="flex w-full items-center justify-between rounded-lg bg-white p-3 shadow-sm dark:bg-gray-900 dark:shadow-gray-900/50">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-blue-100 p-2 dark:bg-blue-900/30">
          <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <div className="text-right">
          <p className="font-medium text-gray-800 dark:text-gray-200">
            {file instanceof File ? file.name : 'ملف PDF'}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {file instanceof File
              ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
              : ''}
          </p>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        onClick={onRemove}
        className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/30 dark:hover:text-red-300"
        type="button"
      >
        <X className="h-5 w-5" />
      </Button>
    </div>

    {/* PDF Preview iframe */}
    {previewUrl && (
      <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900">
        <iframe
          src={previewUrl}
          className="h-[400px] w-full"
          title="PDF Preview"
        />
      </div>
    )}

    {/* Status message */}
    {status && (
      <p
        className={`text-sm ${
          status.includes('✅')
            ? 'text-green-600 dark:text-green-400'
            : 'text-red-500 dark:text-red-400'
        }`}
      >
        {status}
      </p>
    )}

    {/* Change file button */}
    <Button
      variant="outline"
      onClick={onChangeFile}
      className="mt-2 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
      type="button"
    >
      تغيير الملف
    </Button>
  </div>
)

interface NavigationButtonsProps {
  onPrev: () => void
  onNext: () => void
}

/** Navigation buttons for form steps */
const NavigationButtons = ({ onPrev, onNext }: NavigationButtonsProps) => (
  <div dir="rtl" className="flex justify-between pt-6">
    <Button
      type="button"
      onClick={onPrev}
      variant="outline"
      className="gap-2 dark:border-gray-600 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
      <ArrowRight className="h-4 w-4" /> السابق
    </Button>
    <Button
      type="button"
      onClick={onNext}
      className="gap-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
    >
      التالي <ArrowLeft className="h-4 w-4" />
    </Button>
  </div>
)
