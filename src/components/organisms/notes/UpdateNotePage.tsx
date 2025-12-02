'use client';

import { useRouter } from 'next/navigation';

import { universityData } from '@/constants/index';
import { FormikHelpers, useFormik } from 'formik';
import { toast } from 'sonner';
import * as Yup from 'yup';

import LoadingSpinner from '@/components/atoms/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

import useNoteDetail from '@/hooks/useNoteDetail';

import AddNoteLoginPrompt from './AddNoteLoginPrompt';

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
      title: note?.title ?? '',
      description: note?.description ?? '',
      university: note?.university ?? '',
      college: note?.college ?? '',
      subject: note?.subject ?? '',
      year: note?.year ?? '',
      price: note?.price ?? 0,
      pagesNumber: note?.pagesNumber ?? 0,
      contactMethod: note?.contactMethod ?? '',
      isPublish: note?.isPublish ?? false,
    },
    validationSchema: Yup.object({
      title: Yup.string().required('العنوان مطلوب'),
      description: Yup.string().required('الوصف مطلوب'),
      university: Yup.string().required('الجامعة مطلوبة'),
      college: Yup.string().required('الكلية مطلوبة'),
      subject: Yup.string().required('المادة مطلوبة'),
      price: Yup.number()
        .min(0, 'السعر لا يمكن أن يكون سالباً')
        .required('السعر مطلوب'),
    }),
    onSubmit: async (
      values: UpdateNoteFormValues,
      { setSubmitting }: FormikHelpers<UpdateNoteFormValues>
    ) => {
      try {
        await handleUpdateNote({ noteId: edit, noteData: values });
      } catch (error: unknown) {
        if (error && typeof error === 'object' && 'data' in error) {
          const err = error as { data?: { messages?: string[] } };
          const msg =
            err.data?.messages?.join(', ') ?? 'حدث خطأ أثناء تحديث الملخص';
          toast.error(msg);
        } else {
          toast.error('حدث خطأ أثناء تحديث الملخص');
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
    u => u.name === formik.values.university
  );
  const colleges = selectedUniversity?.colleges ?? [];

  return (
    <div className="mx-auto max-w-3xl py-8">
      <Card>
        <CardContent className="space-y-6">
          <h2 className="mb-4 text-center text-2xl font-semibold">
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
                className="my-2 rounded-3xl px-5 py-6"
              />
              {formik.touched.title && formik.errors.title && (
                <p className="text-sm text-red-500">{formik.errors.title}</p>
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
                className="my-2 h-28 rounded-3xl px-5 py-6"
              />
              {formik.touched.description && formik.errors.description && (
                <p className="text-sm text-red-500">
                  {formik.errors.description}
                </p>
              )}
            </div>

            {/* University */}
            <div>
              <Label htmlFor="university">الجامعة</Label>
              <Select
                value={formik.values.university}
                onValueChange={value => {
                  formik.setFieldValue('university', value);
                  formik.setFieldValue('college', '');
                }}
              >
                <SelectTrigger className="my-2 w-full rounded-3xl px-5 py-6">
                  <SelectValue placeholder="اختر الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  {universityData.map(u => (
                    <SelectItem key={u.id} value={u.name}>
                      {u.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {formik.touched.university && formik.errors.university && (
                <p className="text-sm text-red-500">
                  {formik.errors.university}
                </p>
              )}
            </div>

            {/* College */}
            <div>
              <Label htmlFor="college">الكلية</Label>
              <Select
                value={formik.values.college}
                onValueChange={value => formik.setFieldValue('college', value)}
                disabled={!formik.values.university}
              >
                <SelectTrigger className="my-2 w-full rounded-3xl px-5 py-6">
                  <SelectValue placeholder="اختر الكلية" />
                </SelectTrigger>
                <SelectContent>
                  {colleges.length > 0 ? (
                    colleges.map(c => (
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
                <p className="text-sm text-red-500">{formik.errors.college}</p>
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
                className="my-2 rounded-3xl px-5 py-6"
              />
              {formik.touched.subject && formik.errors.subject && (
                <p className="text-sm text-red-500">{formik.errors.subject}</p>
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
                className="my-2 rounded-3xl px-5 py-6"
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
                className="my-2 rounded-3xl px-5 py-6"
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
                className="my-2 rounded-3xl px-5 py-6"
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
                className="my-2 rounded-3xl px-5 py-6"
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
                  ? 'جاري التحديث...'
                  : 'تحديث الملخص'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
