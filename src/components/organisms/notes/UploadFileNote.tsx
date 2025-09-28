import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, FileUp } from "lucide-react";
import { useRef, useState } from "react";

type UploadFileNoteProps = {
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
};

/**
 * Component for uploading PDF file in the note creation form
 */
export default function UploadFileNote({
  formik,
  prevTab,
  nextTab,
}: UploadFileNoteProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileUploadedStatus, setFileUploadedStatus] = useState<string | null>(
    null
  );

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;

    if (file && file.type === "application/pdf") {
      formik.setFieldValue("files.file", file);
      setFileUploadedStatus("تم رفع الملف بنجاح");
    } else {
      formik.setFieldValue("files.file", null);
      setFileUploadedStatus("الملف يجب أن يكون بصيغة PDF");
      formik.setFieldError("files.file", "الملف يجب أن يكون بصيغة PDF");
    }
  };

  return (
    <>
      <div className="p-6 rounded-lg flex flex-col items-center justify-between bg-gray-50">
        <div className="flex flex-col items-center gap-3">
          <div className="border-2 border-dashed rounded-full p-6">
            <FileUp
              className="size-10 text-blue-200 cursor-pointer"
              onClick={() => fileInputRef.current?.click()}
            />
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="font-medium">اختر ملف الملخص</p>
            <p className="text-sm text-gray-500">PDF بصيغة</p>
            {formik.errors.files?.file && (
              <p className="text-red-500 text-sm mt-1">
                {String(formik.errors.files.file)}
              </p>
            )}
            {fileUploadedStatus && (
              <p
                className={`text-sm mt-2 ${
                  fileUploadedStatus.includes("نجاح")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {fileUploadedStatus}
              </p>
            )}
          </div>
        </div>

        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
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
          className="gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!!formik.errors.files?.file || !formik.values.files.file}
        >
          التالي <ArrowLeft className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
