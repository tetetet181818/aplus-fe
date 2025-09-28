"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import BasicInfo from "./BasicInfo";
import UploadFileNote from "./UploadFileNote";
import UploadCoverNote from "./UploadCoverNote";
import ReviewNote from "./ReviewNote";
import useNotes from "@/hooks/useNotes";

/**
 * Initial values for AddNoteForm
 */
const initialValues = {
  basic: {
    title: "",
    price: 0,
    description: "",
    university: "",
    college: "",
    subject: "",
    pagesNumber: 0,
    year: null as number | null,
    contactMethod: "",
  },
  files: {
    cover: null as File | null,
    file: null as File | null,
  },
  review: {
    termsAccepted: false,
  },
};

/**
 * Yup validation schemas for each form step
 */
const validationSchemas = {
  basic: Yup.object({
    title: Yup.string().required("العنوان مطلوب"),
    price: Yup.number().positive("يجب أن يكون موجب").required("السعر مطلوب"),
    description: Yup.string().required("الوصف مطلوب"),
    university: Yup.string().required("الجامعة مطلوبة"),
    college: Yup.string().required("الكلية مطلوبة"),
    subject: Yup.string().required("المادة مطلوبة"),
    pagesNumber: Yup.number()
      .positive("عدد الصفحات يجب أن يكون موجب")
      .required("عدد الصفحات مطلوب"),
    year: Yup.number().nullable(),
    contactMethod: Yup.string()
      .email("البريد الإلكتروني غير صالح")
      .required("طريقة التواصل مطلوبة"),
  }),
  files: Yup.object({
    cover: Yup.mixed()
      .required("يجب رفع الغلاف")
      .test("fileType", "الغلاف يجب أن يكون صورة", (value: File) =>
        value
          ? ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
          : false
      ),
    file: Yup.mixed()
      .required("يجب رفع الملف")
      .test("fileType", "الملف يجب أن يكون PDF", (value: File) =>
        value ? value.type === "application/pdf" : false
      ),
  }),
  review: Yup.object({
    termsAccepted: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط"),
  }),
};

/**
 * Build FormData from form values for API submission
 * @param values - Form values from Formik
 * @returns FormData object ready for upload
 */
function buildFormData(values: typeof initialValues): FormData {
  const formData = new FormData();

  formData.append("title", values.basic.title);
  formData.append("price", values.basic.price.toString());
  formData.append("description", values.basic.description);
  formData.append("university", values.basic.university);
  formData.append("college", values.basic.college);
  formData.append("subject", values.basic.subject);
  formData.append("pagesNumber", values.basic.pagesNumber.toString());
  if (values.basic.year !== null) {
    formData.append("year", values.basic.year.toString());
  }
  formData.append("contactMethod", values.basic.contactMethod);

  if (values.files.cover) {
    formData.append("cover", values.files.cover);
  }
  if (values.files.file) {
    formData.append("file", values.files.file);
  }

  formData.append(
    "termsAccepted",
    values.review.termsAccepted ? "true" : "false"
  );

  return formData;
}

/**
 * Multi-step form component for adding a new note
 */
const AddNoteForm = () => {
  const [tab, setTab] = useState("basic");
  const { handleCreateNote } = useNotes();

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      basic: validationSchemas.basic,
      files: validationSchemas.files,
      review: validationSchemas.review,
    }),
    onSubmit: async (values) => {
      const formData = buildFormData(values);
      console.log(formData);
      await handleCreateNote(formData);
    },
  });

  const tabs = ["basic", "file", "cover", "review"];
  const tabIndex = tabs.indexOf(tab);
  const progress = ((tabIndex + 1) / tabs.length) * 100;

  return (
    <div dir="rtl" className="min-h-screen py-8 md:px-6">
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <Card className="w-full shadow-xl border-0 rounded-2xl overflow-hidden">
          <div className="bg-white py-4 px-6 border-b">
            <div dir="rtl" className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-blue-600">
                {progress}%
              </span>
              <span className="text-sm font-medium text-gray-600">
                تقدم الإضافة
              </span>
            </div>
            <Progress
              value={progress}
              className="h-2 bg-gray-200 [&>div]:!left-0 [&>div]:!right-0 transform rotate-180"
            />
          </div>

          <CardContent className="p-0" dir="rtl">
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsContent value="basic" className="p-6">
                <BasicInfo formik={formik} />
                <div className="flex justify-start pt-6">
                  <Button
                    type="button"
                    onClick={() => setTab("file")}
                    className="gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      !!formik.errors.basic &&
                      Object.keys(formik.errors.basic).length > 0
                    }
                  >
                    التالي <ArrowLeft className="h-4 w-4" />
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="file" className="p-6">
                <UploadFileNote
                  formik={formik}
                  prevTab={() => setTab("basic")}
                  nextTab={() => setTab("cover")}
                />
              </TabsContent>

              <TabsContent value="cover" className="p-6">
                <UploadCoverNote
                  formik={formik}
                  prevTab={() => setTab("file")}
                  nextTab={() => setTab("review")}
                />
              </TabsContent>

              <TabsContent value="review" className="p-6">
                <ReviewNote formik={formik} prevTab={() => setTab("cover")} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddNoteForm;
