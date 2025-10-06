"use client";

import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ResetPassword from "@/components/pages/ResetPassword";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const resetPasswordToken = searchParams.get("resetPasswordToken");

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPassword userId={userId} resetPasswordToken={resetPasswordToken} />
    </Suspense>
  );
}
