import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import UserDashboardPage from "@/components/pages/profile/UserDashboardPage";
import { Suspense } from "react";

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
