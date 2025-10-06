import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useFormik } from "formik";
import { updateSchema } from "@/utils/validation/authValidation";
import { Loader2, Building2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universities } from "@/constants/index";
import { UpdateUserInfo, User } from "@/types";

interface UpdateInfoDialogProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  loading: boolean;
  handelUpdateUserInfo: (data: UpdateUserInfo) => Promise<User>;
}

export default function UpdateInfoDialog({
  isOpen,
  onClose,
  user,
  loading,
  handelUpdateUserInfo,
}: UpdateInfoDialogProps) {
  const formik = useFormik({
    initialValues: {
      university: user?.university || "",
    },
    validationSchema: updateSchema,
    onSubmit: async (values) => {
      const res = await handelUpdateUserInfo(values);

      if (res) {
        onClose();
      }
    },
  });

  const handleUniversityChange = (value: string) => {
    formik.setFieldValue("university", value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>تحديث المعلومات</DialogTitle>
          <DialogDescription>قم بتحديث معلومات حسابك</DialogDescription>
        </DialogHeader>
        <form onSubmit={formik.handleSubmit} className="mt-4 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="university">الجامعة</Label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <Select
                name="university"
                value={formik.values.university}
                onValueChange={handleUniversityChange}
              >
                <SelectTrigger
                  id="university"
                  className={
                    !formik.values.university
                      ? "text-muted-foreground w-full"
                      : "w-full"
                  }
                >
                  <SelectValue placeholder="اختر الجامعة" />
                </SelectTrigger>
                <SelectContent>
                  {universities?.map((uni) => (
                    <SelectItem key={uni} value={uni}>
                      {uni}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formik.touched.university && formik.errors.university && (
              <p className="text-sm text-red-500">{formik.errors.university}</p>
            )}
          </div>
          {/* Submit */}
          <button
            type="submit"
            disabled={loading || formik.isSubmitting}
            className="w-full py-2 px-4 bg-primary text-white rounded-md hover:bg-primary-dark transition flex items-center justify-center hover:bg-blue-900 "
          >
            {loading || formik.isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
                جاري التحديث...
              </>
            ) : (
              "تحديث المعلومات"
            )}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
