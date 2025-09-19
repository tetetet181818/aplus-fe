"use client";

import { useState, useCallback } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";
import { registerSchema } from "@/utils/validation/authValidation";
import {
  Building2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import GoogleLoginButton from "@/components/atoms/GoogleLoginButton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { universities } from "@/constants";
import Link from "next/link";
import { Checkbox } from "@/components/ui/checkbox";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import Image from "next/image";
import successImage from "../../../../public/success-icon.png";
import useAuth from "@/hooks/useAuth";
import { RegisterCredentials } from "@/types";

interface RegisterProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const initialValues: RegisterCredentials = {
  fullName: "",
  email: "",
  password: "",
  university: "",
};

const RegisterDialog = ({
  isOpen,
  onClose,
  onSwitchToLogin,
}: RegisterProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [activeTab, setActiveTab] = useState("register");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const { registerUser, isRegisterLoading } = useAuth();
  const togglePassword = useCallback(
    () => setShowPassword((prev) => !prev),
    []
  );

  const formik = useFormik({
    initialValues,
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values, { resetForm }) => {
      if (!termsAccepted) return;
      setRegisteredEmail(values.email);
      registerUser(values);
      resetForm();
      setActiveTab("verify");
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl scrollbar-thin scrollbar-thumb-slate-400 scrollbar-track-transparent">
        <DialogHeader>
          {activeTab === "register" && (
            <>
              <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                إنشاء حساب جديد
              </DialogTitle>
              <DialogDescription className="text-gray-600 dark:text-gray-400">
                انضم إلينا للوصول إلى كل المميزات الأكاديمية بسهولة
              </DialogDescription>
            </>
          )}
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
          <TabsContent value="register">
            <form onSubmit={formik.handleSubmit} className="mt-4 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="fullName">اسم المستخدم</Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="fullName"
                    placeholder="اكتب اسمك هنا"
                    className="pr-10"
                    {...formik.getFieldProps("fullName")}
                  />
                </div>
                {formik.errors.fullName && (
                  <p className="text-xs text-red-500">
                    {formik.errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="pr-10"
                    {...formik.getFieldProps("email")}
                  />
                </div>
                {formik.errors.email && (
                  <p className="text-xs text-red-500">{formik.errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="university">الجامعة</Label>
                <div className="relative">
                  <Building2 className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Select
                    value={formik.values.university}
                    onValueChange={(val) =>
                      formik.setFieldValue("university", val)
                    }
                  >
                    <SelectTrigger id="university" className="pr-10 w-full">
                      <SelectValue placeholder="اختر الجامعة" />
                    </SelectTrigger>
                    <SelectContent>
                      {universities.map((uni) => (
                        <SelectItem key={uni} value={uni}>
                          {uni}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {formik.errors.university && (
                  <p className="text-xs text-red-500">
                    {formik.errors.university}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    className="pr-10"
                    {...formik.getFieldProps("password")}
                  />
                  <button
                    type="button"
                    onClick={togglePassword}
                    className="absolute left-3 top-1/2 -translate-y-1/2"
                    aria-label="إظهار أو إخفاء كلمة المرور"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
                <p className="text-xs text-gray-500">
                  يجب أن تحتوي كلمة المرور على 8 أحرف على الأقل
                </p>
                {formik.errors.password && (
                  <p className="text-xs text-red-500">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(!!checked)}
                />
                <label
                  htmlFor="terms"
                  className="text-sm leading-none text-gray-700 dark:text-gray-300"
                >
                  أوافق على{" "}
                  <Link
                    href="/terms-of-service"
                    className="text-primary hover:underline"
                  >
                    الشروط والأحكام
                  </Link>{" "}
                  و{" "}
                  <Link
                    href="/privacy-policy"
                    className="text-primary hover:underline"
                  >
                    سياسة الخصوصية
                  </Link>
                </label>
              </div>

              <Button
                type="submit"
                className="w-full rounded-lg shadow-md hover:shadow-lg transition-all"
                disabled={
                  isRegisterLoading || formik.isSubmitting || !termsAccepted
                }
              >
                {isRegisterLoading || formik.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري التسجيل...
                  </>
                ) : (
                  "إنشاء حساب"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="bg-background px-2 text-gray-400">أو</span>
              </div>
            </div>

            <GoogleLoginButton />

            <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
              لديك حساب؟{" "}
              <button
                type="button"
                className="font-semibold text-primary hover:underline"
                onClick={onSwitchToLogin}
              >
                تسجيل الدخول
              </button>
            </p>
          </TabsContent>

          <TabsContent value="verify" className="py-6 text-center space-y-4">
            <Image
              src={successImage}
              alt="نجاح"
              width={60}
              height={60}
              className="mx-auto"
            />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              تحقق من بريدك الإلكتروني
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              تم إرسال رسالة تحقق إلى:
              <span className="font-medium block mt-1">{registeredEmail}</span>
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              يرجى فتح الرسالة والضغط على رابط التفعيل لإكمال التسجيل.
            </p>
            <Button onClick={() => setActiveTab("register")} className="mt-4">
              العودة إلى التسجيل
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default RegisterDialog;
