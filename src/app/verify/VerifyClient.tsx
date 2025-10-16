"use client";

import { useEffect } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { useVerifyMutation, useLazyCheckAuthQuery } from "@/store/api/auth.api";
import { toast } from "sonner";

/**
 * Email verification page.
 * Verifies the user account via token passed in the URL,
 * then triggers authentication check and redirects to home.
 */
export default function VerifyClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verify, { isLoading, isSuccess, isError, error }] =
    useVerifyMutation();
  const [triggerCheckAuth, { data: authData, isLoading: authLoading }] =
    useLazyCheckAuthQuery();

  // Redirect to 404 if token is missing
  if (!token) notFound();

  useEffect(() => {
    /**
     * Executes the verification process when the component mounts.
     * - Calls verify API with token.
     * - Updates authentication data.
     * - Shows success or error toasts.
     * - Redirects to home page after success.
     */
    const runVerification = async () => {
      try {
        const res = await verify({ token }).unwrap();
        await triggerCheckAuth(undefined).unwrap();
        toast.success(res?.message || "Verification successful");
        setTimeout(() => router.push("/"), 1500);
      } catch (err) {
        console.error("Verification failed:", err);
        toast.error(
          (err as { data?: { message?: string } })?.data?.message ||
            "Account verification failed"
        );
      }
    };

    runVerification();
  }, [token, verify, triggerCheckAuth, router]);

  /** Defines gradient color based on verification state */
  const bgClass = isLoading
    ? "from-gray-50 to-gray-100"
    : isSuccess
    ? "from-green-50 to-green-100"
    : isError
    ? "from-red-50 to-red-100"
    : "from-gray-50 to-gray-100";

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gradient-to-br ${bgClass} p-4`}
    >
      <div className="bg-white shadow-xl rounded-2xl p-8 text-center max-w-md w-full">
        {/* Status icon */}
        <div className="flex justify-center mb-4">
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ${
              isSuccess
                ? "bg-green-100"
                : isError
                ? "bg-red-100"
                : "bg-gray-100"
            }`}
          >
            {isSuccess ? (
              <span className="text-4xl">✅</span>
            ) : isError ? (
              <span className="text-4xl">❌</span>
            ) : (
              <Loader className="animate-spin size-10 text-gray-500" />
            )}
          </div>
        </div>

        {/* Loading state */}
        {(isLoading || authLoading) && (
          <>
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              Verifying...
            </h1>
            <p className="text-gray-600 mb-6">
              Please wait while we verify your account.
            </p>
          </>
        )}

        {/* Success state */}
        {isSuccess && !authLoading && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              Verification Successful
            </h1>
            <p className="text-gray-600 mb-6">
              Your account has been activated. You can now use the platform
              normally.
            </p>
            {authData?.data && (
              <div className="bg-green-50 text-green-700 p-3 rounded-md mb-4 text-sm">
                <p>Hello, {authData.data.name || "User"} 🎉</p>
                <p>Email: {authData.data.email}</p>
              </div>
            )}
          </>
        )}

        {/* Error state */}
        {isError && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Verification Failed
            </h1>
            <p className="text-gray-600 mb-6">
              {(error as { data?: { message?: string } })?.data?.message ||
                "An error occurred while verifying your account."}
            </p>
          </>
        )}

        {/* Return button */}
        <Link href="/" passHref>
          <Button
            className={`${
              isError
                ? "bg-red-500 hover:bg-red-600"
                : isSuccess
                ? "bg-green-500 hover:bg-green-600"
                : "bg-gray-500 hover:bg-gray-600"
            } text-white px-6 py-2 rounded-lg font-semibold transition`}
          >
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
