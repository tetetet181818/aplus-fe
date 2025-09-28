"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  FileText,
  ImageIcon,
} from "lucide-react";
import React, { useState } from "react";
import { FormikProps, FormikValues } from "formik";
import SuccessUploadNoteDialog from "@/components/molecules/dialogs/SuccessUploadNoteDialog";

/**
 * Final review step for note creation form
 */
export default function ReviewNote({
  formik,
  prevTab,
}: {
  formik: FormikProps<FormikValues>;
  prevTab: () => void;
}) {
  const { basic, files, review } = formik.values as {
    basic: any;
    files: { file: File | null; cover: File | null };
    review: { termsAccepted: boolean };
  };

  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const summaryItems = [
    { label: "العنوان", value: basic.title, icon: FileText },
    { label: "السعر", value: `${basic.price || "—"} ريال`, icon: FileText },
    { label: "الوصف", value: basic.description, icon: FileText },
    { label: "الجامعة", value: basic.university, icon: FileText },
    { label: "الكلية", value: basic.college, icon: FileText },
    { label: "المادة", value: basic.subject, icon: FileText },
    { label: "عدد الصفحات", value: basic.pagesNumber, icon: FileText },
    { label: "السنة", value: basic.year, icon: FileText },
    { label: "طريقة التواصل", value: basic.contactMethod, icon: FileText },
  ];

  const fileItems = [
    {
      label: "ملف الملخص",
      value: files.file ? "تم رفع الملف" : "لم يتم رفع الملف",
      status: files.file ? "success" : "error",
      icon: FileText,
    },
    {
      label: "صورة الغلاف",
      value: files.cover ? "تم رفع الصورة" : "لم يتم رفع الصورة",
      status: files.cover ? "success" : "error",
      icon: ImageIcon,
    },
  ];

  return (
    <>
      <div className="space-y-8 max-w-4xl mx-auto p-4">
        {/* Header Section */}
        <div className="text-center space-y-3">
          <div className="bg-blue-50 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
            مراجعة البيانات قبل الإرسال
          </h3>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            يرجى التأكد من صحة جميع البيانات قبل تأكيد الإرسال
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Basic Information Card */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-blue-600" />
                المعلومات الأساسية
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {summaryItems.map((item, index) => (
                  <div key={index} className="space-y-1">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </span>
                    <p className="text-gray-900 dark:text-white font-medium truncate">
                      {item.value || "—"}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                الملفات المرفوعة
              </h4>
              <div className="space-y-4">
                {fileItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-full ${
                          item.status === "success"
                            ? "bg-green-100 dark:bg-green-900/20"
                            : "bg-red-100 dark:bg-red-900/20"
                        }`}
                      >
                        <item.icon
                          className={`h-4 w-4 ${
                            item.status === "success"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </p>
                        <p
                          className={`text-sm ${
                            item.status === "success"
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-600 dark:text-red-400"
                          }`}
                        >
                          {item.value}
                        </p>
                      </div>
                    </div>
                    {item.status === "success" ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Review & Actions */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
              <h4 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">
                الشروط والأحكام
              </h4>
              <div className="flex items-start gap-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <Checkbox
                  id="terms"
                  checked={review.termsAccepted}
                  onCheckedChange={(checked) =>
                    formik.setFieldValue("review.termsAccepted", checked)
                  }
                  className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                />
                <Label
                  htmlFor="terms"
                  className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  أوافق على الشروط والأحكام الخاصة برفع الملخص ونشره
                </Label>
              </div>
            </div>

            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 gap-2 disabled:opacity-50 disabled:cursor-not-allowed h-12 text-lg font-medium rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
                disabled={!review.termsAccepted}
                onClick={() => {
                  // setOpenSuccessDialog(true);
                }}
              >
                <CheckCircle2 className="h-5 w-5" />
                تأكيد الإنشاء
              </Button>

              <Button
                type="button"
                onClick={prevTab}
                variant="outline"
                className="w-full gap-2 h-11 rounded-xl border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-200"
              >
                <ArrowRight className="h-4 w-4" />
                السابق
              </Button>
            </div>
          </div>
        </div>
      </div>

      <SuccessUploadNoteDialog
        open={openSuccessDialog}
        onOpenChange={() => setOpenSuccessDialog(false)}
      />
    </>
  );
}
