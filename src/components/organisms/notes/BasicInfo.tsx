"use client";

import { useState } from "react";
import { FormikProps } from "formik";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useAuth from "@/hooks/useAuth";
import { universityColleges } from "@/constants";
import { Button } from "@/components/ui/button";
import AddNoteInstructions from "./AddNoteInstructions";
import { AddNoteValues } from "./AddNoteForm";
import { toast } from "sonner";

/** ========== Basic Info Step (Updated) ========== */
export default function BasicInfo({
  formik,
  nextTab,
}: {
  formik: FormikProps<AddNoteValues>;
  nextTab: () => Promise<void> | void;
}) {
  const { user } = useAuth();
  const [isUsingRegisteredEmail, setIsUsingRegisteredEmail] = useState(false);
  const [email, setEmail] = useState("");

  // safely get nested Formik errors and touched
  const err = (path: string): string | undefined | { [key: string]: any } =>
    path
      .split(".")
      .reduce(
        (acc: any, k: string) => (acc ? acc[k] : undefined),
        formik.errors
      );

  const touched = (
    path: string
  ): boolean | undefined | { [key: string]: any } =>
    path
      .split(".")
      .reduce(
        (acc: any, k: string) => (acc ? acc[k] : undefined),
        formik.touched
      );

  const handleToggleEmail = () => {
    const next = !isUsingRegisteredEmail;
    setIsUsingRegisteredEmail(next);

    const newEmail = next ? user?.email || "" : "";
    setEmail(newEmail);

    formik.setFieldValue("basic.contactMethod", newEmail);
  };

  const selectedUniversity = formik.values.basic.university;
  const selectedKey = formik.values.basic.university as
    | keyof typeof universityColleges
    | "";
  const colleges =
    selectedKey && selectedKey in universityColleges
      ? universityColleges[selectedKey]
      : [];

  /** Handle step validation before moving forward */
  const handleNext = async () => {
    try {
      await formik.validateForm();
      const errors = await formik.validateForm();
      if (Object.keys(errors).length > 0) {
        toast.error("تحقق من البيانات قبل المتابعة");
        return;
      }
      await nextTab();
    } catch {
      toast.error("حدث خطأ أثناء التحقق من البيانات");
    }
  };

  return (
    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-4">
      <div className="md:col-span-3 sm:p-0 md:p-6 space-y-6">
        {/* عنوان وسعر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* عنوان الملخص */}
          <div className="space-y-2">
            <Label className="font-bold">
              عنوان الملخص <span className="text-blue-500">*</span>
            </Label>
            <Input
              name="basic.title"
              placeholder="اكتب عنوان الملخص"
              value={formik.values.basic.title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-3xl py-6 px-5 border-2"
            />
            {err("basic.title") && err("basic.title") && (
              <p className="text-xs text-red-500">
                {String(err("basic.title"))}
              </p>
            )}
          </div>

          {/* السعر */}
          <div className="space-y-2">
            <Label className="font-bold">
              السعر (ريال) <span className="text-blue-500">*</span>
            </Label>
            <Input
              type="number"
              name="basic.price"
              placeholder="أدخل السعر المناسب"
              value={formik.values.basic.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={0}
              className="rounded-3xl py-6 px-5 border-2"
            />
            {err("basic.price") && err("basic.price") && (
              <p className="text-xs text-red-500">
                {String(err("basic.price"))}
              </p>
            )}
          </div>
        </div>

        {/* الوصف */}
        <div className="space-y-2">
          <Label className="font-bold">
            وصف الملخص <span className="text-blue-500">*</span>
          </Label>
          <Textarea
            name="basic.description"
            rows={4}
            placeholder="اكتب وصفًا مختصرًا يوضح محتوى الملخص"
            value={formik.values.basic.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="rounded-3xl py-6 px-5 border-2"
          />
          {err("basic.description") && err("basic.description") && (
            <p className="text-xs text-red-500">
              {String(err("basic.description"))}
            </p>
          )}
        </div>

        {/* الجامعة والكلية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* الجامعة */}
          <div className="space-y-2">
            <Label className="font-bold">
              الجامعة <span className="text-blue-500">*</span>
            </Label>
            <Select
              value={formik.values.basic.university}
              onValueChange={(v) => {
                formik.setFieldValue("basic.university", v);
                formik.setFieldValue("basic.college", ""); // reset college
              }}
            >
              <SelectTrigger className="rounded-3xl py-6 px-5 w-full border-2">
                <SelectValue placeholder="اختر الجامعة" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(universityColleges).map((uni) => (
                  <SelectItem key={uni} value={uni}>
                    {uni}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {err("basic.university") && err("basic.university") && (
              <p className="text-xs text-red-500">
                {String(err("basic.university"))}
              </p>
            )}
          </div>

          {/* الكلية */}
          <div className="space-y-2">
            <Label className="font-bold">
              الكلية <span className="text-blue-500">*</span>
            </Label>
            <Select
              value={formik.values.basic.college}
              onValueChange={(v) => formik.setFieldValue("basic.college", v)}
              disabled={!selectedUniversity}
            >
              <SelectTrigger className="rounded-3xl py-6 px-5 w-full border-2">
                <SelectValue placeholder="اختر الكلية" />
              </SelectTrigger>
              <SelectContent>
                {colleges.length > 0 ? (
                  colleges.map((col: string) => (
                    <SelectItem key={col} value={col}>
                      {col}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled value="no-college">
                    اختر الجامعة أولاً
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            {err("basic.college") && err("basic.college") && (
              <p className="text-xs text-red-500">
                {String(err("basic.college"))}
              </p>
            )}
          </div>
        </div>

        {/* المادة / الصفحات / السنة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* المادة */}
          <div className="space-y-2">
            <Label className="font-bold">
              المادة <span className="text-blue-500">*</span>
            </Label>
            <Input
              name="basic.subject"
              placeholder="مثال: فسيولوجي"
              value={formik.values.basic.subject}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-3xl py-6 px-5 border-2"
            />
            {err("basic.subject") && err("basic.subject") && (
              <p className="text-xs text-red-500">
                {String(err("basic.subject"))}
              </p>
            )}
          </div>

          {/* عدد الصفحات */}
          <div className="space-y-2">
            <Label className="font-bold">
              عدد الصفحات <span className="text-blue-500">*</span>
            </Label>
            <Input
              type="number"
              name="basic.pagesNumber"
              placeholder="عدد الصفحات"
              value={formik.values.basic.pagesNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              min={1}
              className="rounded-3xl py-6 px-5 border-2"
            />
            {err("basic.pagesNumber") && err("basic.pagesNumber") && (
              <p className="text-xs text-red-500">
                {String(err("basic.pagesNumber"))}
              </p>
            )}
          </div>

          {/* السنة */}
          <div className="space-y-2">
            <Label className="font-bold">السنة</Label>
            <Input
              type="number"
              name="basic.year"
              placeholder="سنة الإصدار"
              value={formik.values.basic.year ?? ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="rounded-3xl py-6 px-5 border-2"
            />
          </div>
        </div>

        {/* طريقة التواصل */}
        <div className="space-y-2">
          <Label className="font-bold">
            طريقة التواصل <span className="text-blue-500">*</span>
          </Label>
          <div className="flex items-center gap-3">
            <span className="ml-2 text-sm">
              {isUsingRegisteredEmail
                ? "استخدم البريد المسجل"
                : "استخدم بريدًا آخر"}
            </span>
            <Switch
              checked={isUsingRegisteredEmail}
              onCheckedChange={handleToggleEmail}
              aria-label="استخدم بريدك المسجل"
              type="button"
            />
          </div>
          <Input
            name="basic.contactMethod"
            placeholder="اكتب بريدك الإلكتروني أو رقم التواصل"
            value={
              isUsingRegisteredEmail
                ? email || (user?.email ?? "")
                : formik.values.basic.contactMethod
            }
            onChange={(e) => {
              setEmail(e.target.value);
              formik.setFieldValue("basic.contactMethod", e.target.value);
            }}
            onBlur={formik.handleBlur}
            className="rounded-3xl py-6 px-5 border-2"
          />
          {err("basic.contactMethod") && err("basic.contactMethod") && (
            <p className="text-xs text-red-500">
              {String(err("basic.contactMethod"))}
            </p>
          )}
        </div>

        {/* زر التالي */}
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={handleNext}
            className="gap-2 w-full py-6 bg-blue-500 hover:bg-blue-600"
          >
            التالي <ArrowLeft className="size-5" />
          </Button>
        </div>
      </div>

      {/* قسم التعليمات */}
      <AddNoteInstructions />
    </div>
  );
}
