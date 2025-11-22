'use client'

import React, { useRef, useState, useCallback } from 'react'
import Image from 'next/image'
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
  FlipHorizontal,
  FlipVertical,
  RefreshCw,
  Crop,
  Move,
} from 'lucide-react'
import { AddNoteValues } from './AddNoteForm'
import { FormikProps } from 'formik'
import { toast } from 'sonner'

/** ========== Upload Cover Step (with Preview & Controls) ========== */
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
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(
    null,
  )
  const [isDragging, setIsDragging] = useState(false)

  // Image control states
  const [zoom, setZoom] = useState(100)
  const [rotation, setRotation] = useState(0)
  const [flipH, setFlipH] = useState(false)
  const [flipV, setFlipV] = useState(false)
  const [brightness, setBrightness] = useState(100)
  const [contrast, setContrast] = useState(100)

  // Position for panning
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState({ x: 0, y: 0 })

  /** Reset all controls to default */
  const resetControls = () => {
    setZoom(100)
    setRotation(0)
    setFlipH(false)
    setFlipV(false)
    setBrightness(100)
    setContrast(100)
    setPosition({ x: 0, y: 0 })
  }

  /** Process and load image file */
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

      // Load image for manipulation
      const img = new window.Image()
      img.onload = () => setOriginalImage(img)
      img.src = result

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
    setPreviewUrl(null)
    setOriginalImage(null)
    formik.setFieldValue('cover.cover', null)
    if (fileInputRef.current) fileInputRef.current.value = ''
    resetControls()
  }

  /** Apply transformations and save */
  const applyChanges = useCallback(async () => {
    if (!originalImage || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Calculate dimensions based on rotation
    const isRotated90 = rotation === 90 || rotation === 270
    const width = isRotated90 ? originalImage.height : originalImage.width
    const height = isRotated90 ? originalImage.width : originalImage.height

    canvas.width = width
    canvas.height = height

    ctx.clearRect(0, 0, width, height)
    ctx.save()

    // Apply transformations
    ctx.translate(width / 2, height / 2)
    ctx.rotate((rotation * Math.PI) / 180)
    ctx.scale(flipH ? -1 : 1, flipV ? -1 : 1)
    ctx.filter = `brightness(${brightness}%) contrast(${contrast}%)`

    // Draw image centered
    const drawWidth = isRotated90 ? originalImage.height : originalImage.width
    const drawHeight = isRotated90 ? originalImage.width : originalImage.height
    ctx.drawImage(
      originalImage,
      -originalImage.width / 2,
      -originalImage.height / 2,
      originalImage.width,
      originalImage.height,
    )

    ctx.restore()

    // Convert to blob and update formik
    canvas.toBlob(
      (blob) => {
        if (blob) {
          const file = new File([blob], 'cover-edited.jpg', {
            type: 'image/jpeg',
          })
          formik.setFieldValue('cover.cover', file)
          toast.success('تم تطبيق التغييرات بنجاح ✅')
        }
      },
      'image/jpeg',
      0.9,
    )
  }, [originalImage, rotation, flipH, flipV, brightness, contrast, formik])

  /** Handle mouse events for panning */
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsPanning(true)
    setPanStart({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isPanning) return
    setPosition({
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y,
    })
  }

  const handleMouseUp = () => setIsPanning(false)

  /** Validate and move to next step */
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

  // CSS transform string for preview
  const transformStyle = {
    transform: `
      translate(${position.x}px, ${position.y}px)
      scale(${zoom / 100})
      rotate(${rotation}deg)
      scaleX(${flipH ? -1 : 1})
      scaleY(${flipV ? -1 : 1})
    `,
    filter: `brightness(${brightness}%) contrast(${contrast}%)`,
    transition: isPanning ? 'none' : 'transform 0.2s ease',
  }

  return (
    <div className="space-y-6">
      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />

      <div
        className={`relative rounded-xl border-2 border-dashed p-8 transition-all duration-200 ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : previewUrl
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

        {previewUrl ? (
          <div className="text-center">
            {/* Image Preview Container */}
            <div
              className="relative mx-auto mb-4 h-72 w-full max-w-lg cursor-move overflow-hidden rounded-lg bg-gray-800"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            >
              <Image
                src={previewUrl}
                alt="Preview"
                fill
                className="object-contain"
                style={transformStyle}
                draggable={false}
              />
              {/* Remove button */}
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 z-10 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition hover:bg-red-600"
              >
                <X className="h-4 w-4" />
              </button>
              {/* Pan indicator */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded bg-black/50 px-2 py-1 text-xs text-white">
                <Move className="h-3 w-3" /> اسحب للتحريك
              </div>
            </div>

            {/* Control Panel */}
            <div className="mx-auto max-w-lg space-y-4 rounded-lg bg-white p-4 shadow-md">
              {/* Zoom Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-1 font-medium text-gray-700">
                    <ZoomIn className="h-4 w-4" /> التكبير
                  </span>
                  <span className="text-gray-500">{zoom}%</span>
                </div>
                <div className="flex items-center gap-3">
                  <ZoomOut className="h-4 w-4 text-gray-400" />
                  <Slider
                    value={[zoom]}
                    onValueChange={(v) => setZoom(v[0])}
                    min={50}
                    max={200}
                    step={5}
                    className="flex-1"
                  />
                  <ZoomIn className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              {/* Brightness Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">☀️ السطوع</span>
                  <span className="text-gray-500">{brightness}%</span>
                </div>
                <Slider
                  value={[brightness]}
                  onValueChange={(v) => setBrightness(v[0])}
                  min={50}
                  max={150}
                  step={5}
                />
              </div>

              {/* Contrast Control */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-gray-700">◐ التباين</span>
                  <span className="text-gray-500">{contrast}%</span>
                </div>
                <Slider
                  value={[contrast]}
                  onValueChange={(v) => setContrast(v[0])}
                  min={50}
                  max={150}
                  step={5}
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
                  <RotateCcw className="h-4 w-4" /> يسار
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setRotation((r) => (r + 90) % 360)}
                  className="gap-1"
                >
                  <RotateCw className="h-4 w-4" /> يمين
                </Button>
                <Button
                  type="button"
                  variant={flipH ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFlipH(!flipH)}
                  className="gap-1"
                >
                  <FlipHorizontal className="h-4 w-4" /> أفقي
                </Button>
                <Button
                  type="button"
                  variant={flipV ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFlipV(!flipV)}
                  className="gap-1"
                >
                  <FlipVertical className="h-4 w-4" /> عمودي
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
