"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";

// ----------------- Validation Schema -----------------
const validationSchema = Yup.object({
  note: Yup.string()
    .trim()
    .required("يجب إدخال الملاحظة")
    .min(5, "الملاحظة يجب أن تكون أطول من 5 أحرف")
    .max(500, "الملاحظة لا يمكن أن تتجاوز 500 حرف"),
});

interface AddAdminNotesDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  withdrawalId: string;
  handleAddAdminNote: (id: string, note: string) => void;
  addAdminNoteLoading: boolean;
}

export default function AddAdminNotesDialog({
  open,
  onOpenChange,
  withdrawalId,
  handleAddAdminNote,
  addAdminNoteLoading,
}: AddAdminNotesDialogProps) {
  const formik = useFormik({
    initialValues: { note: "" },
    validateOnBlur: false,
    validateOnChange: false,
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      await handleAddAdminNote(withdrawalId, values.note);
      resetForm();
      onOpenChange(false);
    },
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    isValid,
    dirty,
    isSubmitting,
  } = formik;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>إضافة ملاحظة إدارية</DialogTitle>
          <DialogDescription>
            أضف ملاحظة تتعلق بطلب السحب. ستكون الملاحظة مرئية لكلٍ من صاحب الطلب
            والمشرفين.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="adminNote">الملاحظة</Label>
            <Textarea
              id="adminNote"
              name="note"
              placeholder="اكتب الملاحظة هنا..."
              value={values.note}
              onChange={handleChange}
              className="min-h-[100px]"
            />
            {touched.note && errors.note && (
              <p className="text-sm text-red-500 mt-1">{errors.note}</p>
            )}
          </div>

          <DialogFooter className="mt-6">
            <Button
              type="button"
              variant="destructive"
              onClick={() => onOpenChange(false)}
            >
              إلغاء
            </Button>

            <Button
              type="submit"
              disabled={
                addAdminNoteLoading || isSubmitting || !dirty || !isValid
              }
            >
              {(addAdminNoteLoading || isSubmitting) && (
                <Loader2 className="animate-spin mr-2 size-4" />
              )}
              حفظ الملاحظة
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
