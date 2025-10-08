import { Suspense } from "react";
import SellerProfilePage from "./SellerClient";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تفاصيل البائع | منصة أ+",
  description:
    "اطلب ملخصاتك الدراسية في مكان واحد، واطلب ملخصات جاهزة بسرعة وسهولة.",
  keywords: [
    "تفاصيل البائع",
    "بائع",
    "تتبع البائع",
    "إدارة البائع",
    "بائع سريعة",
    "بائع جاهز",
    "منصة تلخيص",
  ],
};

export default function page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  return (
    <Suspense fallback={<LoadingSpinner message="" />}>
      <SellerProfilePage userId={userId} />
    </Suspense>
  );
}
