"use client";

import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import ResetPassword from "@/components/pages/ResetPassword";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ResetPasswordWrapper() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const resetPasswordToken = searchParams.get("resetPasswordToken");

  return (
    <ResetPassword userId={userId} resetPasswordToken={resetPasswordToken} />
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ResetPasswordWrapper />
    </Suspense>
  );
}
