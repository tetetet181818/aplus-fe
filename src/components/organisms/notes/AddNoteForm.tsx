"use client";

import { useState, useMemo, useCallback, JSX } from "react";
import { useFormik, FormikProps } from "formik";
import * as Yup from "yup";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import BasicInfo from "./BasicInfo";
import UploadFileNote from "./UploadFileNote";
import UploadCoverNote from "./UploadCoverNote";
import ReviewNote from "./ReviewNote";
import useNotes from "@/hooks/useNotes";
import SuccessUploadNoteDialog from "@/components/molecules/dialogs/SuccessUploadNoteDialog";

/* ============================================================
 * Types
 * ============================================================ */

export type AddNoteValues = {
  basic: {
    title: string;
    price: number;
    description: string;
    university: string;
    college: string;
    subject: string;
    pagesNumber: number;
    year: number | null;
    contactMethod: string;
  };
  file: { file: File | null };
  cover: { cover: File | null };
  review: { termsAccepted: boolean };
};

/* ============================================================
 * Initial Values
 * ============================================================ */

const initialValues: AddNoteValues = {
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
  file: { file: null },
  cover: { cover: null },
  review: { termsAccepted: false },
};

/* ============================================================
 * Validation Schemas
 * ============================================================ */

const stepValidationSchemas = [
  // Step 0: Basic Info
  Yup.object({
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
  }),
  // Step 1: File Upload
  Yup.object({
    file: Yup.object({
      file: Yup.mixed<File>()
        .required("يجب رفع الملف")
        .test("fileType", "الملف يجب أن يكون PDF", (v) =>
          v ? v.type === "application/pdf" : false
        ),
    }),
  }),
  // Step 2: Cover Upload
  Yup.object({
    cover: Yup.object({
      cover: Yup.mixed<File>()
        .required("يجب رفع الغلاف")
        .test("fileType", "الغلاف يجب أن يكون صورة", (v) =>
          v ? ["image/jpeg", "image/png", "image/jpg"].includes(v.type) : false
        ),
    }),
  }),
  // Step 3: Review
  Yup.object({
    review: Yup.object({
      termsAccepted: Yup.boolean().oneOf([true], "يجب الموافقة على الشروط"),
    }),
  }),
];

/* ============================================================
 * Helper Functions
 * ============================================================ */

/** Build FormData for upload */
function buildFormData(values: AddNoteValues): FormData {
  const formData = new FormData();
  Object.entries(values.basic).forEach(([key, val]) => {
    if (val !== null && val !== undefined) formData.append(key, String(val));
  });
  if (values.file.file) formData.append("file", values.file.file);
  if (values.cover.cover) formData.append("cover", values.cover.cover);
  formData.append("termsAccepted", String(values.review.termsAccepted));
  return formData;
}

/** Get progress percentage */
function getProgress(currentStep: number, totalSteps: number): number {
  return ((currentStep + 1) / totalSteps) * 100;
}

/** Simple animation variants */
const motionVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

/* ============================================================
 * Component
 * ============================================================ */

const AddNoteForm = (): JSX.Element => {
  const { handleCreateNote, createNoteLoading } = useNotes();
  const steps = useMemo(
    () => [
      { key: "basic", component: BasicInfo },
      { key: "file", component: UploadFileNote },
      { key: "cover", component: UploadCoverNote },
      { key: "review", component: ReviewNote },
    ],
    []
  );

  const [currentStep, setCurrentStep] = useState(0);
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false);

  const formik: FormikProps<AddNoteValues> = useFormik<AddNoteValues>({
    initialValues,
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema: stepValidationSchemas[currentStep],
    onSubmit: async (values, { resetForm }) => {
      const formData = buildFormData(values);
      const success = await handleCreateNote(formData);
      if (success) {
        toast.success("تم رفع المذكرة بنجاح!");
        resetForm();
        setCurrentStep(0);
        setOpenSuccessDialog(true);
      }
    },
  });

  const nextStep = useCallback(async () => {
    await stepValidationSchemas[currentStep].validate(formik.values, {
      abortEarly: false,
    });
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep, formik.values, steps.length]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const progress = getProgress(currentStep, steps.length);
  const CurrentStepComponent = steps[currentStep].component;
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

            {/* Step Content */}
            <CardContent className="p-0" dir="rtl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={steps[currentStep].key}
                  variants={motionVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <Tabs
                    value={steps[currentStep].key}
                    onValueChange={() => {}}
                    className="w-full"
                  >
                    <TabsContent value={steps[currentStep].key} className="p-6">
                      <CurrentStepComponent
                        formik={formik}
                        prevTab={prevStep}
                        nextTab={nextStep}
                        loading={createNoteLoading}
                      />
                    </TabsContent>
                  </Tabs>
                </motion.div>
              </AnimatePresence>
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
