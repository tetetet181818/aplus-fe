"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, FileUp } from "lucide-react";
import { toast } from "sonner";
import { FormikProps } from "formik";
import { AddNoteValues } from "./AddNoteForm";

/** ========== Upload File Step (Updated) ========== */
export default function UploadFileNote({
  formik,
  prevTab,
  nextTab,
}: {
  formik: FormikProps<AddNoteValues>;
  prevTab: () => void;
  nextTab: () => Promise<void> | void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  /** Handle PDF file change */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (!file) {
      setStatus("يجب اختيار ملف");
      formik.setFieldValue("file.file", null);
      return;
    }

    if (file.type === "application/pdf") {
      formik.setFieldValue("file.file", file);
      setStatus("تم رفع الملف بنجاح ✅");
      toast.success("تم رفع الملف بنجاح");
    } else {
      formik.setFieldValue("file.file", null);
      formik.setFieldError("file.file", "الملف يجب أن يكون بصيغة PDF");
      setStatus("الملف يجب أن يكون بصيغة PDF ❌");
      toast.error("الملف يجب أن يكون بصيغة PDF");
    }
  };

  /** Validate and move to next step */
  const handleNext = async () => {
    try {
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        toast.error("تحقق من رفع الملف قبل المتابعة");
        return;
      }

      if (!formik.values.file.file) {
        toast.error("الرجاء رفع ملف PDF أولاً");
        return;
      }

      await nextTab();
    } catch {
      toast.error("حدث خطأ أثناء الانتقال للخطوة التالية");
    }
  };

  return (
    <>
      <div className="p-6 rounded-lg flex flex-col items-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div
            className="border-2 border-dashed rounded-full p-6 cursor-pointer hover:border-blue-400 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="size-10 text-blue-400" />
          </div>

          <p className="font-medium mt-2">اختر ملف الملخص</p>
          <p className="text-sm text-gray-500">PDF فقط</p>

          {/* Error message from Formik */}
          {formik.errors.file?.file && (
            <p className="text-red-500 text-sm mt-1">
              {String(formik.errors.file.file)}
            </p>
          )}

          {/* Status message */}
          {status && (
            <p
              className={`text-sm mt-2 ${
                status.includes("✅") ? "text-green-600" : "text-red-500"
              }`}
            >
              {status}
            </p>
          )}
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
        />

        <Button
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="mt-5"
          type="button"
        >
          رفع الملف
        </Button>
      </div>

      {/* Navigation Buttons */}
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
  );
}
