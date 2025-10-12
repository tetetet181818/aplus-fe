"use client";
import { useFormik } from "formik";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, ArrowRight } from "lucide-react";
import { validationForgetPassword } from "@/utils/validation/authValidation";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
export default function ForgetPassword() {
  const { forgetPasswordLoading, handleForgetPassword } = useAuth();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: validationForgetPassword,
    onSubmit: async (values, { resetForm }) => {
      const res = await handleForgetPassword({ email: values.email });
      if (res) {
        resetForm();
      }
    },
  });

  return (
    <>
      <div className="max-w-md mx-auto mt-20 p-6 border rounded-xl shadow-sm my-20">
        <h2 className="text-2xl font-semibold text-center mb-4 flex items-center justify-start gap-2">
          <Button onClick={() => router.back()}>
            <ArrowRight className="size-5" />
          </Button>
          نسيت كلمة المرور
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          أدخل بريدك الإلكتروني وسنرسل لك رابطًا لإعادة تعيين كلمة المرور
        </p>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">البريد الإلكتروني</Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@email.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="pr-10 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-100"
                disabled={forgetPasswordLoading}
              />
              <Mail className="absolute right-3 top-3 h-5 w-5 text-gray-400" />
            </div>
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={forgetPasswordLoading}
            className="w-full disabled:opacity-50"
          >
            {forgetPasswordLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin ml-2" />
                جارٍ الإرسال...
              </>
            ) : (
              "إرسال رابط إعادة التعيين"
            )}
          </Button>
        </form>
      </div>
    </>
  );
}
