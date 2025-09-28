import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import UserDashboardPage from "@/components/pages/profile/UserDashboardPage";
import { Suspense } from "react";

export default function Profile() {
  return (
    <Suspense fallback={<LoadingSpinner message="جاري التحميل..." />}>
      <UserDashboardPage />
    </Suspense>
  );
}
