"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, FileUp } from "lucide-react";

/** Upload PDF step in Add Note form */
export default function UploadFileNote({
  formik,
  prevTab,
  nextTab,
}: {
  formik: {
    setFieldValue: (
      field: string,
      value: unknown,
      shouldValidate?: boolean
    ) => void;
    setFieldError: (field: string, message: string) => void;
    values: { files: { file: File | null } };
    errors: { files?: { file?: string } } & Record<string, unknown>;
  };
  prevTab: () => void;
  nextTab: () => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file && file.type === "application/pdf") {
      formik.setFieldValue("files.file", file);
      setStatus("تم رفع الملف بنجاح");
    } else {
      formik.setFieldValue("files.file", null);
      formik.setFieldError("files.file", "الملف يجب أن يكون بصيغة PDF");
      setStatus("الملف يجب أن يكون بصيغة PDF");
    }
  };

  return (
    <>
      <div className="p-6 rounded-lg flex flex-col items-center bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div
            className="border-2 border-dashed rounded-full p-6 cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <FileUp className="size-10 text-blue-300" />
          </div>

          <p className="font-medium">اختر ملف الملخص</p>
          <p className="text-sm text-gray-500">PDF بصيغة</p>

          {formik.errors.files?.file && (
            <p className="text-red-500 text-sm mt-1">
              {String(formik.errors.files.file)}
            </p>
          )}

          {status && (
            <p
              className={`text-sm mt-2 ${
                status.includes("نجاح") ? "text-green-500" : "text-red-500"
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
        >
          رفع الملف
        </Button>
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
          onClick={nextTab}
          disabled={!!formik.errors.files?.file || !formik.values.files.file}
          className="gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          التالي <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
