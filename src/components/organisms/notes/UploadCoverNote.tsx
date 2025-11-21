'use client'

import React, { useRef, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, ImageUp, Upload, X } from 'lucide-react'
import { AddNoteValues } from './AddNoteForm'
import { FormikProps } from 'formik'
import { toast } from 'sonner'

/** ========== Upload Cover Step (Updated) ========== */
export default function UploadCoverNote({
  formik,
  prevTab,
  nextTab,
}: {
  formik: FormikProps<AddNoteValues>
  prevTab: () => void
  nextTab: () => Promise<void> | void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  /** معالجة ملف الصورة */
  const processFile = (file: File) => {
    if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
      toast.error('الرجاء اختيار صورة بصيغة JPG أو PNG فقط')
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error('حجم الصورة يجب ألا يتجاوز 5MB')
      return
    }

    const reader = new FileReader()
    reader.onload = (e) => {
      const result = e.target?.result as string
      setPreviewUrl(result)
      formik.setFieldValue('cover.cover', file)
      toast.success('تم رفع الصورة بنجاح ✅')
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) processFile(file)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    const file = e.dataTransfer.files?.[0]
    if (file) processFile(file)
  }

  const removeImage = () => {
    setPreviewUrl(null)
    formik.setFieldValue('cover.cover', null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  /** تحقق قبل الانتقال للخطوة التالية */
  const handleNext = async () => {
    try {
      const errors = await formik.validateForm()
      if (Object.keys(errors).length > 0) {
        toast.error('تحقق من رفع صورة الغلاف قبل المتابعة')
        return
      }

      if (!formik.values.cover.cover) {
        toast.error('الرجاء رفع صورة الغلاف أولاً')
        return
      }

      await nextTab()
    } catch {
      toast.error('حدث خطأ أثناء التحقق من الصورة')
    }
  }

  return (
    <div className="space-y-6">
      <div
        className={`relative rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : previewUrl
              ? 'border-green-500'
              : 'border-gray-300 hover:border-gray-400'
        }`}
        onDragOver={(e) => {
          e.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={(e) => {
          e.preventDefault()
          setIsDragging(false)
        }}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          accept=".jpg,.jpeg,.png"
          onChange={handleFileChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="text-center">
            <div className="relative inline-block">
              <Image
                src={previewUrl}
                alt="Preview"
                width={500}
                height={500}
                className="max-h-64 max-w-full rounded-lg object-cover shadow-md"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white transition hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-4 font-medium text-green-600">
              ✓ تم رفع الصورة بنجاح
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4 flex justify-center">
              <div className="rounded-full bg-blue-100 p-3">
                <ImageUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="mb-6 space-y-2">
              <p className="text-lg font-semibold text-gray-800">
                اسحب وأفلت الصورة هنا
              </p>
              <p className="text-gray-500">أو</p>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="h-4 w-4" /> اختر صورة من الجهاز
              </Button>
            </div>
            <div className="space-y-1 text-xs text-gray-400">
              <p>الصيغ المدعومة: JPG, PNG</p>
              <p>الحجم الأقصى: 5MB</p>
            </div>
          </div>
        )}
      </div>

      {!previewUrl && (
        <div className="rounded-lg bg-gray-50 p-4">
          <h4 className="mb-2 font-medium text-gray-800">
            مواصفات الصورة المثالية:
          </h4>
          <ul className="list-inside list-disc space-y-1 text-sm text-gray-600">
            <li>نسبة الأبعاد: 16:9 (مثالية للعرض)</li>
            <li>الدقة: 1200x675 بكسل أو أعلى</li>
            <li>الخلفية: فاتحة وواضحة</li>
            <li>الحجم: لا يتجاوز 5MB</li>
          </ul>
        </div>
      )}

      {/* أزرار التنقل */}
      <div dir="rtl" className="flex justify-between pt-4">
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
    </div>
  )
}
