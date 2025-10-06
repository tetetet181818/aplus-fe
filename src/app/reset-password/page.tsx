"use client";

import ResetPassword from "@/components/pages/ResetPassword";
import { useSearchParams } from "next/navigation";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const resetPasswordToken = searchParams.get("resetPasswordToken");

  return (
    <ResetPassword userId={userId} resetPasswordToken={resetPasswordToken} />
  );
}
