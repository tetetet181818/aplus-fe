import React, { Suspense } from "react";
import VerifyClient from "./VerifyClient";
import { Loader } from "lucide-react";

export default function page() {
  return (
    <Suspense fallback={<Loader className="animate-spin" />}>
      <VerifyClient />
    </Suspense>
  );
}
