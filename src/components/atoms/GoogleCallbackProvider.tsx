"use client";
import { useEffect } from "react";

export default function GoogleCallbackProvider() {
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

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
