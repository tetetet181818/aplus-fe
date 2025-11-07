"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useNotes from "@/hooks/useNotes";
import StarRatingInput from "@/components/atoms/StarRatingInput";
import { Label } from "@/components/ui/label";

/**
 * Props for UpdateReviewsDialog component
 * @typedef {Object} UpdateReviewsDialogProps
 * @property {boolean} open - Whether the dialog is visible.
 * @property {(open: boolean) => void} onOpenChange - Function to toggle dialog visibility.
 * @property {string} noteId - ID of the note being reviewed.
 * @property {string} reviewId - ID of the review to update.
 */

/**
 * Modal dialog to update a review's rating and comment.
 * Uses Formik for form state and Yup for validation.
 *
 * @param {UpdateReviewsDialogProps} props
 */
export default function UpdateReviewsDialog({
  open,
  onOpenChange,
  noteId,
  reviewId,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noteId: string;
  reviewId: string;
}) {
  const { handleUpdateReview } = useNotes();

  /** Initialize formik with validation and submit logic */
  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: "",
    },
    validationSchema: Yup.object({
      rating: Yup.number()
        .min(1, "الحد الأدنى هو 1")
        .max(5, "الحد الأقصى هو 5")
        .required("يجب إدخال التقييم"),
      comment: Yup.string()
        .trim()
        .min(3, "التعليق قصير جدًا")
        .required("يجب إدخال تعليق"),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const res = await handleUpdateReview({
          noteId,
          reviewId,
          reviewData: values,
        });
        if (res) resetForm();
        onOpenChange(false);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            تحديث التقييم
          </DialogTitle>
          <DialogDescription className="text-gray-500">
            يمكنك تعديل تقييمك وتعليقك على هذا الملخص.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="flex flex-col gap-4 mt-4"
        >
          {/* Rating field */}
          <div>
            <Label htmlFor="rating" className="mb-2 block font-medium">
              تقييمك (النجوم)
            </Label>
            <StarRatingInput
              rating={formik.values.rating}
              setRating={(value) => formik.setFieldValue("rating", value)}
            />
            {formik.touched.rating && formik.errors.rating && (
              <p className="text-sm text-red-500 mt-1">
                {formik.errors.rating}
              </p>
            )}
          </div>

          {/* Comment field */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="comment"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              التعليق
            </label>
            <Textarea
              id="comment"
              name="comment"
              rows={4}
              placeholder="اكتب تعليقك هنا..."
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.comment && formik.errors.comment && (
              <p className="text-red-500 text-xs">{formik.errors.comment}</p>
            )}
          </div>

          {/* Submit button */}
          <div className="flex justify-end mt-4">
            <Button
              type="submit"
              disabled={formik.isSubmitting}
              className="px-6"
            >
              {formik.isSubmitting ? "جارٍ التحديث..." : "تحديث"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
