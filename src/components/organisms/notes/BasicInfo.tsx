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
import { Info } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { FormikProps, FormikValues } from "formik";

export default function BasicInfo({
  formik,
}: {
  formik: FormikProps<FormikValues>;
}) {
  const { user } = useAuth();

  const [isUsingRegisteredEmail, setIsUsingRegisteredEmail] = useState(false);
  const [email, setEmail] = useState("");

  const handleToggleEmail = () => {
    setIsUsingRegisteredEmail(!isUsingRegisteredEmail);
    if (!isUsingRegisteredEmail) {
      setEmail(user?.email);
      formik.setFieldValue("basic.contactMethod", user?.email);
    } else {
      setEmail("");
      formik.setFieldValue("basic.contactMethod", "");
    }
  };

  return (
    <div dir="rtl" className="grid grid-cols-1 md:grid-cols-4 gap-0">
      <div className="md:col-span-3 p-6 space-y-6">
        {/* عنوان و السعر */}
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
              className="rounded-3xl py-6 px-5 border-2"
            />
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
              className="rounded-3xl py-6 px-5 border-2"
            />
          </div>
        </div>

        {/* وصف */}
        <div className="space-y-2">
          <Label className="font-bold">
            وصف الملخص <span className="text-blue-500">*</span>
          </Label>
          <Textarea
            name="basic.description"
            rows={4}
            placeholder="اكتب وصفًا مختصرًا يوضح محتوى الملخص بشكل جميل"
            value={formik.values.basic.description}
            onChange={formik.handleChange}
            className="rounded-3xl py-6 px-5 border-2"
          />
        </div>

        {/* الجامعة والكلية */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label className="font-bold">
              الجامعة <span className="text-blue-500">*</span>
            </Label>
            <Select
              value={formik.values.basic.university}
              onValueChange={(val) =>
                formik.setFieldValue("basic.university", val)
              }
            >
              <SelectTrigger className="rounded-3xl py-6 px-5 w-full border-2">
                <SelectValue placeholder="اختر الجامعة" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="جامعة القاهرة">جامعة القاهرة</SelectItem>
                <SelectItem value="جامعة عين شمس">جامعة عين شمس</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-bold">
              الكلية <span className="text-blue-500">*</span>
            </Label>
            <Select
              value={formik.values.basic.college}
              onValueChange={(val) =>
                formik.setFieldValue("basic.college", val)
              }
            >
              <SelectTrigger className="rounded-3xl py-6 px-5 w-full border-2">
                <SelectValue placeholder="اختر الكلية" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="كلية الطب">كلية الطب</SelectItem>
                <SelectItem value="كلية العلوم">كلية العلوم</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* المادة - الصفحات - السنة */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label className="font-bold">
              المادة <span className="text-blue-500">*</span>
            </Label>
            <Input
              className="rounded-3xl py-6 px-5 border-2"
              name="basic.subject"
              placeholder="مثال: فسيولوجي"
              value={formik.values.basic.subject}
              onChange={formik.handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold">
              عدد الصفحات <span className="text-blue-500">*</span>
            </Label>
            <Input
              className="rounded-3xl py-6 px-5 border-2"
              type="number"
              name="basic.pagesNumber"
              placeholder="اكتب عدد الصفحات"
              value={formik.values.basic.pagesNumber}
              onChange={formik.handleChange}
            />
          </div>
          <div className="space-y-2">
            <Label className="font-bold">
              السنة <span className="text-blue-500">*</span>
            </Label>
            <Input
              className="rounded-3xl py-6 px-5 border-2"
              type="number"
              name="basic.year"
              placeholder="اكتب سنة الإصدار"
              value={formik.values.basic.year}
              onChange={formik.handleChange}
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
                ? "استخدم بريدك الإلكتروني المسجل"
                : "استخدم بريدك الإلكتروني الخاص"}
            </span>
            <Switch
              checked={isUsingRegisteredEmail}
              onCheckedChange={handleToggleEmail}
              aria-label="استخدم بريدك الإلكتروني المسجل"
            />
          </div>
          <div className="flex items-center gap-3">
            <Input
              className="rounded-3xl py-6 px-5 border-2"
              name="basic.contactMethod"
              placeholder="اكتب بريدك الإلكتروني أو رقمك للتواصل"
              value={
                isUsingRegisteredEmail
                  ? email || user?.email
                  : formik.values.basic.contactMethod
              }
              onChange={(e) => {
                setEmail(e.target.value);
                formik.setFieldValue("basic.contactMethod", e.target.value);
              }}
            />
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className="md:col-span-1 bg-blue-50 p-6 border-l">
        <div className="flex items-center gap-2 mb-4">
          <Info className="h-5 w-5 text-blue-600" />
          <h3 className="font-semibold text-blue-800">إرشادات مهمة</h3>
        </div>
        <p className="text-sm text-blue-700">✦ اكتب عنوانًا واضحًا وجذابًا</p>
        <p className="text-sm text-blue-700">
          ✦ اجعل الوصف قصيرًا ومعبرًا عن المحتوى
        </p>
        <p className="text-sm text-blue-700">✦ اختر الجامعة والكلية بعناية</p>
      </div>
    </div>
  );
}
