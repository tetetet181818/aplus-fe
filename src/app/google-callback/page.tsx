import GoogleCallbackProvider from "@/components/atoms/GoogleCallbackProvider";
import { Metadata } from "next";
import React, { Suspense } from "react";

export const metadata: Metadata = {
  title: "Google Callback",
  description: "Google Callback",
};

export default function GoogleCallback() {
  return (
    <Suspense fallback={<GoogleCallbackProvider />}>
      <GoogleCallbackProvider />
    </Suspense>
  );
}
