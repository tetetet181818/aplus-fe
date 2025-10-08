import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import UserDashboardPage from "@/components/pages/profile/UserDashboardPage";
import { Suspense } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "تفاصيل حسابك | منصة أ+",
  description: "تفاصيل حسابك في منصة أ+",
  keywords: [
    "تفاصيل حسابك",
    "تتبع حسابك",
    "إدارة حسابك",
    "ملخصاتك",
    "مشترياتك",
    "اعجاباتك",
  ],
};

function ProfileWrapper() {
  return <UserDashboardPage />;
}

export default function Profile() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <ProfileWrapper />
    </Suspense>
  );
}
