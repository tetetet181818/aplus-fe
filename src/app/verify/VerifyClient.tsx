"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useVerifyMutation } from "@/store/api/auth.api";
import { Loader } from "lucide-react";

export default function VerifyClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [verify, { isLoading, isSuccess, isError, error }] =
    useVerifyMutation();

  useEffect(() => {
    if (token) {
      localStorage.setItem("access_token", `Bearer ${token}`);
      verify(token);
    }
  }, [token, verify]);

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

        {isLoading && (
          <>
            <h1 className="text-2xl font-bold text-gray-700 mb-2">
              جاري التحقق...
            </h1>
            <p className="text-gray-600 mb-6">
              يتم التحقق من حسابك، يرجى الانتظار
            </p>
          </>
        )}

        {isSuccess && (
          <>
            <h1 className="text-2xl font-bold text-green-600 mb-2">
              تم التحقق بنجاح
            </h1>
            <p className="text-gray-600 mb-6">
              تم حفظ التوكن الخاص بك، يمكنك الآن استخدام حسابك بشكل طبيعي.
            </p>
          </>
        )}

        {isError && (
          <>
            <h1 className="text-2xl font-bold text-red-600 mb-2">فشل التحقق</h1>
            <p className="text-gray-600 mb-6">
              {(() => {
                if (
                  error &&
                  "data" in error &&
                  (error as { data: { message: string } }).data?.message
                ) {
                  return (error as { data: { message: string } }).data.message;
                }
                return "حدث خطأ أثناء التحقق من الرابط.";
              })()}
            </p>
          </>
        )}

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
            العودة إلى الصفحة الرئيسية
          </Button>
        </Link>
      </div>
    </div>
  );
}
