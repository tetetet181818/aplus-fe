/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useRef, useState, useCallback } from 'react'
import Cropper from 'react-easy-crop'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import {
  ArrowLeft,
  ArrowRight,
  ImageUp,
  Upload,
  X,
  ZoomIn,
  ZoomOut,
  RotateCw,
  RotateCcw,
  RefreshCw,
  Crop,
} from 'lucide-react'
import { toast } from 'sonner'
import 'react-easy-crop/react-easy-crop.css'
import { FormikProps } from 'formik'
import { AddNoteValues } from './AddNoteForm'
// Helper function to get cropped image
const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    image.setAttribute('crossOrigin', 'anonymous')
    image.src = url
  })

async function getCroppedImg(
  imageSrc: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pixelCrop: any,
  rotation = 0
): Promise<Blob | null> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) return null

  const maxSize = Math.max(image.width, image.height)
  const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2))

  canvas.width = safeArea
  canvas.height = safeArea

  ctx.translate(safeArea / 2, safeArea / 2)
  ctx.rotate((rotation * Math.PI) / 180)
  ctx.translate(-safeArea / 2, -safeArea / 2)

  ctx.drawImage(
    image,
    safeArea / 2 - image.width * 0.5,
    safeArea / 2 - image.height * 0.5
  )

  const data = ctx.getImageData(0, 0, safeArea, safeArea)

  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height

  ctx.putImageData(
    data,
    Math.round(0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x),
    Math.round(0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y)
  )

  return new Promise((resolve) => {
    canvas.toBlob((file) => resolve(file), 'image/jpeg', 0.95)
  })
}

interface UploadCoverNoteProps {
  formik: FormikProps<AddNoteValues>
  prevTab: () => void
  nextTab: () => void
}

export default function UploadCoverNote({
  formik,
  prevTab,
  nextTab,
}: UploadCoverNoteProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)

  // react-easy-crop states
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)

  // Additional controls
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)

  const onCropComplete = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (croppedArea: any, croppedAreaPixels: any) => {
      setCroppedAreaPixels(croppedAreaPixels)
    },
    []
  )

  const resetControls = () => {
    setCrop({ x: 0, y: 0 })
    setZoom(1)
    setRotation(0)
    setFlipH(false)
    setFlipV(false)
  }

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
      setImageSrc(result)
      formik.setFieldValue('cover.cover', file)
      resetControls()
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
    setImageSrc(null)
    formik.setFieldValue('cover.cover', null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    resetControls()
  }

  const applyChanges = async () => {
    if (!imageSrc || !croppedAreaPixels) return

    try {
      const croppedBlob = await getCroppedImg(
        imageSrc,
        croppedAreaPixels,
        rotation
      )

      if (croppedBlob) {
        const file = new File([croppedBlob], 'cover-edited.jpg', {
          type: 'image/jpeg',
        })
        formik.setFieldValue('cover.cover', file)
        toast.success('تم تطبيق التغييرات بنجاح ✅')
      }
    } catch (error) {
      toast.error('حدث خطأ أثناء معالجة الصورة')
    }
  }

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
            : imageSrc
              ? 'border-green-500 bg-gray-900'
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

        {imageSrc ? (
          <div className="text-center">
            {/* Cropper Container */}
            <div className="relative mx-auto mb-4 h-96 w-full max-w-2xl overflow-hidden rounded-lg bg-gray-800">
              <div className="absolute inset-0">
                <Cropper
                  image={imageSrc}
                  crop={crop}
                  zoom={zoom}
                  rotation={rotation}
                  aspect={16 / 9}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onRotationChange={setRotation}
                  onCropComplete={onCropComplete}
                  style={{
                    containerStyle: {
                      width: '100%',
                      height: '100%',
                      backgroundColor: '#1f2937',
                    },
                  }}
                />
              </div>
              {/* Remove button */}
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 z-50 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Control Panel */}
            <div className="mx-auto max-w-lg space-y-4 rounded-lg bg-white p-4 shadow-md">
              {/* Zoom Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 font-medium text-gray-700">
                    <ZoomIn className="h-4 w-4" /> التكبير
                  </span>
                  <span className="text-gray-500">
                    {Math.round(zoom * 100)}%
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomOut className="h-4 w-4 text-gray-400" />
                  <Slider
                    value={[zoom]}
                    onValueChange={(v) => setZoom(v[0])}
                    min={1}
                    max={3}
                    step={0.1}
                    className="flex-1"
                  />
                  <ZoomIn className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Rotation Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">🔄 الدوران</span>
                  <span className="text-gray-500">{rotation}°</span>
                </div>
                <Slider
                  value={[rotation]}
                  onValueChange={(v) => setRotation(v[0])}
                  min={0}
                  max={360}
                  step={1}
                />
              </div>

              {/* Rotation & Flip Controls */}
              <div className="flex flex-wrap items-center justify-center gap-2 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation((r) => (r - 90 + 360) % 360)}
                  className="gap-1"
                >
                  <RotateCcw className="h-4 w-4" /> يسار 90°
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="gap-1"
                >
                  <RotateCw className="h-4 w-4" /> يمين 90°
                </Button>
                <Button
                  type="button"
                  variant={flipH ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFlipH(!flipH)}
                  className="gap-1"
                >
                  ⇄ قلب أفقي
                </Button>
                <Button
                  type="button"
                  variant={flipV ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFlipV(!flipV)}
                  className="gap-1"
                >
                  ⇵ قلب عمودي
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2 border-t pt-4">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={resetControls}
                  className="gap-1"
                >
                  <RefreshCw className="h-4 w-4" /> إعادة تعيين
                </Button>
                <Button
                  type="button"
                  variant="default"
                  size="sm"
                  onClick={applyChanges}
                  className="gap-1 bg-green-600 hover:bg-green-700"
                >
                  <Crop className="h-4 w-4" /> تطبيق التغييرات
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="gap-1"
                >
                  <Upload className="h-4 w-4" /> تغيير الصورة
                </Button>
              </div>
            </div>

            <p className="mt-4 font-medium text-green-400">
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

      {!imageSrc && (
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

      {/* Navigation Buttons */}
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
