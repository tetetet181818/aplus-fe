"use client";

import ResetPassword from "@/components/pages/ResetPassword";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordWrapper() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const resetPasswordToken = searchParams.get("resetPasswordToken");
  if (!userId || !resetPasswordToken) {
    return (
      <div>
        <h1>الرجاء التحقق من رابط إعادة تعيين كلمة المرور</h1>
      </div>
    );
  }
  return (
    <ResetPassword userId={userId} resetPasswordToken={resetPasswordToken} />
  );
}
