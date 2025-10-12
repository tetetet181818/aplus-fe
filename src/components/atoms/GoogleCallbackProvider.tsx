"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { setCookie } from "@/utils/cookies";
import useAuth from "@/hooks/useAuth";

export default function GoogleCallbackProvider() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setToken } = useAuth();
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);
  useEffect(() => {
    const token = searchParams.get("token");
    if (token) {
      setCookie("access_token", `Bearer ${token}`);
      setCookie("isAuthenticated", "true");
      setToken(`Bearer ${token}`);
      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", `Bearer ${token}`);
      }
    }
    if (typeof window !== "undefined" && localStorage.getItem("access_token")) {
      router.push("/");
    }
  }, [searchParams, router, setToken]);

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-md bg-white/70 z-50">
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
        <p className="mt-4 text-blue-700 text-sm font-medium">
          جاري تسجيل الدخول عبر Google...
        </p>
      </div>
    </div>
  );
}
