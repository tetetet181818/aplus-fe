"use client";

import { useState } from "react";
import { FormikProps, FormikValues } from "formik";
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
import { ArrowLeft, Info } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useAuth from "@/hooks/useAuth";
import { universityColleges } from "@/constants";
import { Button } from "@/components/ui/button";

/** Basic info step in Add Note form (title, price, description, university, college, etc.) */
export default function BasicInfo({
  formik,
  nextTab,
}: {
  formik: FormikProps<FormikValues>;
  nextTab: () => void;
}) {
  const { user } = useAuth();
  const [isUsingRegisteredEmail, setIsUsingRegisteredEmail] = useState(false);
  const [email, setEmail] = useState("");

  const err = (path: string) =>
    path
      .split(".")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((acc: any, k) => (acc ? acc[k] : undefined), formik.errors);
  const touched = (path: string) =>
    path
      .split(".")
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .reduce((acc: any, k) => (acc ? acc[k] : undefined), formik.touched);

  const handleToggleEmail = () => {
    const next = !isUsingRegisteredEmail;
    setIsUsingRegisteredEmail(next);
    const newEmail = next ? user?.email || "" : "";
    setEmail(newEmail);
    formik.setFieldValue("basic.contactMethod", newEmail);
    formik.setFieldTouched("basic.contactMethod", true, true);
  };

  const selectedUniversity = formik.values.basic.university;
  const selectedKey = formik.values.basic.university as
    | keyof typeof universityColleges
    | "";
  const colleges =
    selectedKey && selectedKey in universityColleges
      ? universityColleges[selectedKey]
      : [];

  return (
    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-4 gap-0">
      <div className="md:col-span-3 p-6 space-y-6">
        {/* العنوان والسعر */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            {touched("basic")?.title && err("basic")?.title && (
              <p className="text-xs text-red-500">
                {String(err("basic").title)}
              </p>
            )}
          </div>

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
            {touched("basic")?.price && err("basic")?.price && (
              <p className="text-xs text-red-500">
                {String(err("basic").price)}
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
          {touched("basic")?.description && err("basic")?.description && (
            <p className="text-xs text-red-500">
              {String(err("basic").description)}
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
                formik.setFieldTouched("basic.university", true, true);
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
            {touched("basic")?.university && err("basic")?.university && (
              <p className="text-xs text-red-500">
                {String(err("basic").university)}
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
              onValueChange={(v) => {
                formik.setFieldValue("basic.college", v);
                formik.setFieldTouched("basic.college", true, true);
              }}
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
            {touched("basic")?.college && err("basic")?.college && (
              <p className="text-xs text-red-500">
                {String(err("basic").college)}
              </p>
            )}
          </div>
        </div>

        {/* المادة / الصفحات / السنة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            {touched("basic")?.subject && err("basic")?.subject && (
              <p className="text-xs text-red-500">
                {String(err("basic").subject)}
              </p>
            )}
          </div>

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
            {touched("basic")?.pagesNumber && err("basic")?.pagesNumber && (
              <p className="text-xs text-red-500">
                {String(err("basic").pagesNumber)}
              </p>
            )}
          </div>

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

        {/* وسيلة التواصل */}
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
        </div>
        <div className="flex justify-end">
          <Button
            type="button"
            onClick={nextTab}
            className="gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={
              !!formik.errors.basic &&
              Object.keys(formik.errors.basic).length > 0
            }
          >
            التالي <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Sidebar */}
      <div className="md:col-span-1 bg-blue-50 p-6 border-l">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">إرشادات مهمة</h3>
        </div>
        <ul className="space-y-1 text-sm text-blue-700">
          <li>✦ اكتب عنوانًا واضحًا وجذابًا</li>
          <li>✦ اجعل الوصف قصيرًا ومعبرًا</li>
          <li>✦ اختر الجامعة ثم الكلية المرتبطة بها</li>
        </ul>
      </div>
    </div>
  );
}
