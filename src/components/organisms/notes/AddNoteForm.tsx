"use client";

import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import BasicInfo from "./BasicInfo";
import UploadFileNote from "./UploadFileNote";
import UploadCoverNote from "./UploadCoverNote";
import ReviewNote from "./ReviewNote";
import useNotes from "@/hooks/useNotes";
import SuccessUploadNoteDialog from "@/components/molecules/dialogs/SuccessUploadNoteDialog";

/** Default form values */
const initialValues = {
  basic: {
    title: "",
    price: 0,
    description: "",
    university: "",
    college: "",
    subject: "",
    pagesNumber: 0,
    year: new Date().getFullYear(),
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

/** Validation schema per section */
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

/** Build FormData for API submission */
function buildFormData(values: typeof initialValues): FormData {
  const formData = new FormData();

  Object.entries(values.basic).forEach(([key, val]) => {
    if (val !== null && val !== undefined) formData.append(key, String(val));
  });

  if (values.files.cover) formData.append("cover", values.files.cover);
  if (values.files.file) formData.append("file", values.files.file);

  formData.append("termsAccepted", String(values.review.termsAccepted));
  return formData;
}

/**
 * Multi-step form for creating a new note
 */
const AddNoteForm = () => {
  const [tab, setTab] = useState("basic");
  const { handleCreateNote, createNoteLoading } = useNotes();
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      basic: validationSchemas.basic,
      files: validationSchemas.files,
      review: validationSchemas.review,
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = buildFormData(values);
      const res = await handleCreateNote(formData);

      if (res) {
        setOpenSuccessDialog(true);
        resetForm();
      }
    },
  });

  const tabs = ["basic", "file", "cover", "review"];
  const progress = ((tabs.indexOf(tab) + 1) / tabs.length) * 100;

  return (
    <>
      <div dir="rtl" className="min-h-screen py-8 md:px-6">
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <Card className="w-full shadow-xl border-0 rounded-2xl overflow-hidden">
            {/* Progress Header */}
            <div className="bg-white py-4 px-6 border-b">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-bold text-blue-600">
                  {progress.toFixed(0)}%
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

            {/* Form Steps */}
            <CardContent className="p-0" dir="rtl">
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                {/* Step 1 */}
                <TabsContent value="basic" className="p-6">
                  <BasicInfo formik={formik} nextTab={() => setTab("file")} />
                </TabsContent>

                {/* Step 2 */}
                <TabsContent value="file" className="p-6">
                  <UploadFileNote
                    formik={formik}
                    prevTab={() => setTab("basic")}
                    nextTab={() => setTab("cover")}
                  />
                </TabsContent>

                {/* Step 3 */}
                <TabsContent value="cover" className="p-6">
                  <UploadCoverNote
                    formik={formik}
                    prevTab={() => setTab("file")}
                    nextTab={() => setTab("review")}
                  />
                </TabsContent>

                {/* Step 4 */}
                <TabsContent value="review" className="p-6">
                  <ReviewNote
                    loading={createNoteLoading}
                    formik={formik}
                    prevTab={() => setTab("cover")}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </form>
      </div>
      <SuccessUploadNoteDialog
        open={openSuccessDialog}
        onOpenChange={setOpenSuccessDialog}
      />
    </>
  );
};

export default AddNoteForm;
