import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, ImageUp, X, Upload } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { FormikProps } from "formik";
import { FormValues } from "@/types";

/**
 * Component for uploading and previewing cover image in the note creation form
 */
export default function UploadCoverNote({
  formik,
  prevTab,
  nextTab,
}: {
  formik: FormikProps<FormValues>;
  prevTab: () => void;
  nextTab: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.match("image/jpeg") && !file.type.match("image/png")) {
      alert("الرجاء اختيار صورة بصيغة JPG أو PNG فقط");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("حجم الصورة يجب أن لا يتجاوز 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      formik.setFieldValue("files.cover", file);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  };

  const removeImage = () => {
    setPreviewUrl(null);
    formik.setFieldValue("files.cover", null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-6">
      <div
        className={`relative p-8 border-2 border-dashed rounded-xl transition-all duration-200 ${
          isDragging
            ? "border-blue-500 bg-blue-50"
            : previewUrl
            ? "border-green-500"
            : "border-gray-300 hover:border-gray-400"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.png"
          className="hidden"
        />

        {previewUrl ? (
          <div className="text-center">
            <div className="relative inline-block">
              <Image
                src={previewUrl}
                alt="Preview"
                className="max-h-64 max-w-full rounded-lg shadow-md object-cover"
                width={500}
                height={500}
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-green-600 font-medium mt-4">
              ✓ تم رفع الصورة بنجاح
            </p>
          </div>
        ) : (
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 rounded-full">
                <ImageUp className="h-8 w-8 text-blue-600" />
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <p className="font-semibold text-lg text-gray-800">
                اسحب وأفلت الصورة هنا
              </p>
              <p className="text-gray-500">أو</p>
              <Button
                type="button"
                onClick={triggerFileInput}
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                <Upload className="h-4 w-4" />
                اختر صورة من الجهاز
              </Button>
            </div>
            <div className="text-xs text-gray-400 space-y-1">
              <p>الصيغ المدعومة: JPG, PNG</p>
              <p>الحجم الأقصى: 5MB</p>
            </div>
          </div>
        )}
      </div>

      {!previewUrl && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-800 mb-2">
            مواصفات الصورة المثالية:
          </h4>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• نسبة الأبعاد: 16:9 (مثالية للعرض)</li>
            <li>• الدقة: 1200x675 بكسل أو أعلى</li>
            <li>• الخلفية: فاتحة وواضحة</li>
            <li>• الحجم: لا تتجاوز 5MB</li>
          </ul>
        </div>
      )}

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
          onClick={nextTab}
          disabled={!formik.values.files?.cover}
          className="gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          التالي <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
