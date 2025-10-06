import { Suspense } from "react";
import SellerProfilePage from "./SellerClient";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";

export default function page({ params }: { params: { userId: string } }) {
  const { userId } = params;
  return (
    <Suspense fallback={<LoadingSpinner message="" />}>
      <SellerProfilePage userId={userId} />
    </Suspense>
  );
}
