"use client";

import { useRouter } from "next/navigation";
import { useFormik, FormikHelpers } from "formik";
import * as Yup from "yup";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import AddNoteLoginPrompt from "./AddNoteLoginPrompt";
import useNoteDetail from "@/hooks/useNoteDetail";
import { toast } from "sonner";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { universityData } from "@/constants/index";

// ===== Types =====
interface UpdateNoteFormValues {
  title: string;
  description: string;
  university: string;
  college: string;
  subject: string;
  year: number | string;
  price: number;
  pagesNumber: number;
  contactMethod: string;
  isPublish: boolean;
}

interface UpdateNotePageProps {
  edit: string;
  isAuthenticated: boolean;
  loading: boolean;
}

export default function UpdateNotePage({
  edit,
  isAuthenticated,
  loading,
}: UpdateNotePageProps) {
  const router = useRouter();
  const { note, updateNoteLoading, handleUpdateNote } = useNoteDetail(edit);

  const formik = useFormik<UpdateNoteFormValues>({
    enableReinitialize: true,
    initialValues: {
      title: note?.title ?? "",
      description: note?.description ?? "",
      university: note?.university ?? "",
      college: note?.college ?? "",
      subject: note?.subject ?? "",
      year: note?.year ?? "",
      price: note?.price ?? 0,
      pagesNumber: note?.pagesNumber ?? 0,
      contactMethod: note?.contactMethod ?? "",
      isPublish: note?.isPublish ?? false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("العنوان مطلوب"),
      description: Yup.string().required("الوصف مطلوب"),
      university: Yup.string().required("الجامعة مطلوبة"),
      college: Yup.string().required("الكلية مطلوبة"),
      subject: Yup.string().required("المادة مطلوبة"),
      price: Yup.number()
        .min(0, "السعر لا يمكن أن يكون سالباً")
        .required("السعر مطلوب"),
    }),
    onSubmit: async (
      values: UpdateNoteFormValues,
      { setSubmitting }: FormikHelpers<UpdateNoteFormValues>
    ) => {
      try {
        await handleUpdateNote({ noteId: edit, noteData: values });
      } catch (error: unknown) {
        if (error && typeof error === "object" && "data" in error) {
          const err = error as { data?: { messages?: string[] } };
          const msg =
            err.data?.messages?.join(", ") ?? "حدث خطأ أثناء تحديث الملخص";
          toast.error(msg);
        } else {
          toast.error("حدث خطأ أثناء تحديث الملخص");
        }
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <AddNoteLoginPrompt onNavigate={router.push} />;

  const selectedUniversity = universityData.find(
    (u) => u.name === formik.values.university
  );
  const colleges = selectedUniversity?.colleges ?? [];

  return (
    <div className="max-w-3xl mx-auto py-8">
      <Card>
        <CardContent className="space-y-6">
          <h2 className="text-2xl font-semibold text-center mb-4">
            تحديث الملخص
          </h2>

          <form onSubmit={formik.handleSubmit} className="space-y-4">
            {/* Title */}
            <div>
              <Label htmlFor="title">العنوان</Label>
              <Input
                id="title"
                name="title"
                value={formik.values.title}
                onChange={formik.handleChange}
                className="py-6 my-2 rounded-3xl px-5"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-red-500 text-sm">{formik.errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <Label htmlFor="description">الوصف</Label>
              <Textarea
                id="description"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                className="h-28 py-6 my-2 rounded-3xl px-5"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-red-500 text-sm">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* University */}
            <div>
              <Label htmlFor="university">الجامعة</Label>
              <Select
                value={formik.values.university}
                onValueChange={(value) => {
                  formik.setFieldValue("university", value);
                  formik.setFieldValue("college", "");
                }}
              >
                <SelectTrigger className="py-6 my-2 rounded-3xl px-5 w-full">
                  <SelectValue placeholder="اختر الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  {universityData.map((u) => (
                    <SelectItem key={u.id} value={u.name}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.university && formik.errors.university && (
                <p className="text-red-500 text-sm">
                  {formik.errors.university}
                </p>
              )}
            </div>

            {/* College */}
            <div>
              <Label htmlFor="college">الكلية</Label>
              <Select
                value={formik.values.college}
                onValueChange={(value) =>
                  formik.setFieldValue("college", value)
                }
                disabled={!formik.values.university}
              >
                <SelectTrigger className="py-6 my-2 rounded-3xl px-5 w-full">
                  <SelectValue placeholder="اختر الكلية" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.length > 0 ? (
                    colleges.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))
                  ) : (
                    // ✅ Fix: Provide a non-empty fallback value
                    <SelectItem value="__disabled__" disabled>
                      اختر الجامعة أولاً
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {formik.touched.college && formik.errors.college && (
                <p className="text-red-500 text-sm">{formik.errors.college}</p>
              )}
            </div>

            {/* Subject */}
            <div>
              <Label htmlFor="subject">المادة</Label>
              <Input
                id="subject"
                name="subject"
                value={formik.values.subject}
                onChange={formik.handleChange}
                className="py-6 my-2 rounded-3xl px-5"
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="text-red-500 text-sm">{formik.errors.subject}</p>
              )}
            </div>

            {/* Year */}
            <div>
              <Label htmlFor="year">السنة الدراسية</Label>
              <Input
                id="year"
                name="year"
                type="number"
                value={formik.values.year}
                onChange={formik.handleChange}
                className="py-6 my-2 rounded-3xl px-5"
              />
            </div>

            {/* Price */}
            <div>
              <Label htmlFor="price">السعر</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formik.values.price}
                onChange={formik.handleChange}
                className="py-6 my-2 rounded-3xl px-5"
              />
            </div>

            {/* Contact */}
            <div>
              <Label htmlFor="contactMethod">وسيلة التواصل</Label>
              <Input
                id="contactMethod"
                name="contactMethod"
                value={formik.values.contactMethod}
                onChange={formik.handleChange}
                className="py-6 my-2 rounded-3xl px-5"
              />
            </div>

            {/* Pages */}
            <div>
              <Label htmlFor="pagesNumber">عدد الصفحات</Label>
              <Input
                id="pagesNumber"
                name="pagesNumber"
                type="number"
                value={formik.values.pagesNumber}
                onChange={formik.handleChange}
                className="py-6 my-2 rounded-3xl px-5"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={updateNoteLoading || formik.isSubmitting}
                className="w-full sm:w-1/2"
              >
                {updateNoteLoading || formik.isSubmitting
                  ? "جاري التحديث..."
                  : "تحديث الملخص"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
