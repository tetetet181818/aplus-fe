import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { Metadata } from "next";

export const metaData: Metadata = {
  title: "إتمام الدفع | منصة أ+",
  description: "إتمام عملية الدفع لشراء الملخصات الدراسية",
  robots: "noindex, nofollow",
};

export default function CheckoutPage() {
  return (
    <>
      <Suspense fallback={<LoadingSpinner message="" />}>
        <CheckoutClient />
      </Suspense>
    </>
  );
}
