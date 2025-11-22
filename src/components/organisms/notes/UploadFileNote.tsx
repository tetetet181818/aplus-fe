'use client'

import { useRef, useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, FileUp, X, FileText } from 'lucide-react'
import { toast } from 'sonner'
import { FormikProps } from 'formik'
import { AddNoteValues } from './AddNoteForm'

/** ========== Upload File Step (Updated with Preview) ========== */
export default function UploadFileNote({
  formik,
  prevTab,
  nextTab,
}: {
  formik: FormikProps<AddNoteValues>
  prevTab: () => void
  nextTab: () => Promise<void> | void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  // Create preview URL when file changes
  useEffect(() => {
    const file = formik.values.file?.file
    if (file && file instanceof File) {
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
      return () => URL.revokeObjectURL(url)
    } else {
      setPreviewUrl(null)
    }
  }, [formik.values.file?.file])

  /** Handle PDF file change */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

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

  /** Remove the uploaded file */
  const handleRemoveFile = () => {
    formik.setFieldValue('file.file', null)
    setStatus(null)
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
    toast.info('تم إزالة الملف')
  }

  /** Validate and move to next step */
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

  return (
    <>
      <div className="flex flex-col items-center rounded-lg bg-gray-50 p-6">
        {/* Show upload area if no file is uploaded */}
        {!uploadedFile ? (
          <div className="flex flex-col items-center gap-3">
            <div
              className="cursor-pointer rounded-full border-2 border-dashed p-6 transition hover:border-blue-400"
              onClick={() => fileInputRef.current?.click()}
            >
              <FileUp className="size-10 text-blue-400" />
            </div>
            <p className="mt-2 font-medium">اختر ملف الملخص</p>
            <p className="text-sm text-gray-500">PDF فقط</p>

            {/* Error message from Formik */}
            {formik.errors.file?.file && (
              <p className="mt-1 text-sm text-red-500">
                {String(formik.errors.file.file)}
              </p>
            )}

            <Button
              variant="default"
              onClick={() => fileInputRef.current?.click()}
              className="mt-5"
              type="button"
            >
              رفع الملف
            </Button>
          </div>
        ) : (
          /* Show preview if file is uploaded */
          <div className="flex w-full flex-col items-center gap-4">
            {/* File info header */}
            <div className="flex w-full items-center justify-between rounded-lg bg-white p-3 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-blue-100 p-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">
                    {uploadedFile instanceof File
                      ? uploadedFile.name
                      : 'ملف PDF'}
                  </p>
                  <p className="text-sm text-gray-500">
                    {uploadedFile instanceof File
                      ? `${(uploadedFile.size / 1024 / 1024).toFixed(2)} MB`
                      : ''}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemoveFile}
                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                type="button"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* PDF Preview */}
            {previewUrl && (
              <div className="w-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
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
                  status.includes('✅') ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {status}
              </p>
            )}

            {/* Change file button */}
            <Button
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              className="mt-2"
              type="button"
            >
              تغيير الملف
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      <div dir="rtl" className="flex justify-between pt-6">
        <Button
          type="button"
          onClick={prevTab}
          variant="outline"
          className="gap-2"
        >
          <ArrowRight className="h-4 w-4" /> السابق
        </Button>
        <Button
          type="button"
          onClick={handleNext}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          التالي <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
