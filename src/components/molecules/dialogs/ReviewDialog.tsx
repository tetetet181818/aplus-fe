import { useFormik } from 'formik';
import { Loader2 } from 'lucide-react';
import * as yup from 'yup';

import StarRatingInput from '@/components/atoms/StarRatingInput';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const validationSchema = yup.object().shape({
  rating: yup
    .number()
    .min(1, 'يرجى تحديد تقييم (عدد النجوم).')
    .required('التقييم مطلوب.'),
  comment: yup.string().trim().required('يرجى كتابة تعليق.'),
});

interface ReviewDialogProps {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  noteTitle: string;
  noteId: string;
  addReviewToNote: (
    noteId: string,
    reviewData: { rating: number; comment: string }
  ) => Promise<void>;
  loading: boolean;
}

/**
 * 💬 ReviewDialog Component
 * Displays a dialog for users to add a star rating and comment
 * on a specific note. Uses Formik for validation and form handling.
 */
const ReviewDialog = ({
  isOpen,
  onOpenChange,
  noteTitle,
  noteId,
  addReviewToNote,
  loading,
}: ReviewDialogProps) => {
  const formik = useFormik({
    initialValues: {
      rating: 0,
      comment: '',
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      const reviewData = {
        rating: values.rating,
        comment: values.comment,
      };
      await addReviewToNote(noteId, reviewData);
      resetForm();
      onOpenChange(false);
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تقييم ملخص: {noteTitle}</DialogTitle>
          <DialogDescription>
            شاركنا رأيك حول هذا الملخص لمساعدة الآخرين.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-4 py-4">
          {/* Star Rating Field */}
          <div>
            <Label htmlFor="rating" className="mb-2 block font-medium">
              تقييمك (النجوم)
            </Label>
            <StarRatingInput
              rating={formik.values.rating}
              setRating={value => formik.setFieldValue('rating', value)}
            />
            {formik.touched.rating && formik.errors.rating && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.rating}
              </p>
            )}
          </div>

          {/* Comment Field */}
          <div>
            <Label htmlFor="comment" className="font-medium">
              تعليقك
            </Label>
            <Textarea
              id="comment"
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="اكتب تعليقك هنا..."
              rows={4}
              className="mt-1"
            />
            {formik.touched.comment && formik.errors.comment && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.comment}
              </p>
            )}
          </div>

          {/* Buttons */}
          <DialogFooter className="mt-4 gap-2">
            <Button
              variant="destructive"
              type="button"
              onClick={handleClose}
              disabled={loading}
            >
              إلغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </div>
              ) : (
                'إرسال التقييم'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewDialog;
