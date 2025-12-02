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

import useCustomerRating from '@/hooks/useCustomerRating';

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
  loading: boolean;
}

const AddCoustomerRateDialog = ({
  isOpen,
  onOpenChange,
  loading,
}: ReviewDialogProps) => {
  const { handelCreateCustomerRating } = useCustomerRating();
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
      try {
        const res = await handelCreateCustomerRating(reviewData);
        if (res) {
          resetForm();
          onOpenChange(false);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {}
    },
  });

  const handleClose = () => {
    formik.resetForm();
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader className="space-y-1">
          <DialogTitle className="text-center text-lg font-semibold">
            نُقدّر رأيك!
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center">
            ساعدنا في تحسين تجربتك من خلال مشاركة تقييمك وتعليقك اللطيف
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={formik.handleSubmit} className="space-y-5 py-4">
          <div>
            <Label htmlFor="rating" className="mb-2 block font-medium">
              كم تمنحنا من النجوم؟
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

          <div>
            <Label htmlFor="comment" className="font-medium">
              تعليقك الجميل
            </Label>
            <Textarea
              id="comment"
              name="comment"
              value={formik.values.comment}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="اكتب ملاحظتك أو رأيك هنا بكل لطف..."
              rows={4}
              className="mt-1"
            />
            {formik.touched.comment && formik.errors.comment && (
              <p className="mt-1 text-sm text-red-500">
                {formik.errors.comment}
              </p>
            )}
          </div>

          <DialogFooter className="mt-6 gap-2">
            <Button
              variant="outline"
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              إغلاق
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto"
            >
              {loading ? (
                <div className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  جاري الإرسال...
                </div>
              ) : (
                'إرسال التقييم '
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoustomerRateDialog;
