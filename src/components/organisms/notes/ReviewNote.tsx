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
  Loader2,
} from "lucide-react";
import { FormikProps } from "formik";
import { AddNoteValues } from "./AddNoteForm";
import Link from "next/link";

/** Final review step in Add Note form with loading indicator during creation */
export default function ReviewNote({
  formik,
  prevTab,
  loading,
}: {
  formik: FormikProps<AddNoteValues>;
  prevTab: () => void;
  loading: boolean;
}) {
  const { basic, file, cover, review } = formik.values;

  const summaryItems = [
    { label: "العنوان", value: basic.title },
    { label: "السعر", value: `${basic.price || "—"} ريال` },
    { label: "الوصف", value: basic.description },
    { label: "الجامعة", value: basic.university },
    { label: "الكلية", value: basic.college },
    { label: "المادة", value: basic.subject },
    { label: "عدد الصفحات", value: basic.pagesNumber },
    { label: "السنة", value: basic.year },
    { label: "طريقة التواصل", value: basic.contactMethod },
  ];

  const fileItems = [
    {
      label: "ملف الملخص",
      value: file.file ? "تم رفع الملف" : "لم يتم رفع الملف",
      ok: !!file.file,
      icon: FileText,
    },
    {
      label: "صورة الغلاف",
      value: cover.cover ? "تم رفع الصورة" : "لم يتم رفع الصورة",
      ok: !!cover.cover,
      icon: ImageIcon,
    },
  ];

  return (
    <div
      className={`space-y-8 max-w-4xl mx-auto p-4 transition-opacity ${
        loading ? "opacity-60 pointer-events-none" : "opacity-100"
      }`}
    >
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="bg-blue-50 dark:bg-blue-900/20 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-bold text-2xl text-gray-900 dark:text-white">
          مراجعة البيانات قبل الإرسال
        </h3>
        <p className="text-gray-600 dark:text-gray-300 text-lg">
          تأكد من صحة جميع البيانات قبل تأكيد الإرسال
        </p>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Basic Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h4 className="font-semibold text-lg mb-4 flex items-center gap-2 text-gray-900 dark:text-white">
              <FileText className="h-5 w-5 text-blue-600" />
              المعلومات الأساسية
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {summaryItems.map((item, i) => (
                <div key={i} className="space-y-1">
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

          {/* Uploaded Files */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              الملفات المرفوعة
            </h4>
            <div className="space-y-4">
              {fileItems.map((item, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        item.ok
                          ? "bg-green-100 dark:bg-green-900/20"
                          : "bg-red-100 dark:bg-red-900/20"
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 ${
                          item.ok
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
                          item.ok
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {item.value}
                      </p>
                    </div>
                  </div>
                  {item.ok ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
                  ) : (
                    <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms & Actions */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h4 className="font-semibold text-lg mb-4 text-gray-900 dark:text-white">
              الشروط والأحكام
            </h4>
            <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800/30">
              <Checkbox
                id="terms"
                checked={review.termsAccepted}
                onCheckedChange={(v) =>
                  formik.setFieldValue("review.termsAccepted", v === true)
                }
                className="mt-0.5 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 data-[state=checked]:text-white flex-shrink-0"
              />
              <Label
                htmlFor="terms"
                className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 cursor-pointer flex-1"
              >
                أوافق على{" "}
                <Link
                  className="hover:underline text-blue-600 dark:text-blue-400 font-medium underline-offset-2"
                  href="/terms-of-service"
                >
                  الشروط والأحكام الخاصة
                </Link>{" "}
                برفع الملخص ونشره
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <Button
              type="submit"
              disabled={!review.termsAccepted || loading}
              className="w-full bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600 gap-2 h-12 text-lg font-medium rounded-xl transition transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  جارٍ إنشاء الملخص...
                </>
              ) : (
                <>
                  <CheckCircle2 className="h-5 w-5" />
                  تأكيد الإنشاء
                </>
              )}
            </Button>

            <Button
              type="button"
              onClick={prevTab}
              variant="outline"
              disabled={loading}
              className="w-full gap-2 h-11 rounded-xl border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              <ArrowRight className="h-4 w-4" /> السابق
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
