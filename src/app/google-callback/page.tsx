import GoogleCallbackProvider from "@/components/atoms/GoogleCallbackProvider";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Google Callback",
  description: "Google Callback",
};

export default function GoogleCallback() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GoogleCallbackProvider />
    </Suspense>
  );
}
