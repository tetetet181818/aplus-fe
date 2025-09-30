import React from "react";
import { Loader } from "lucide-react";

/**
 * Full-screen blur overlay with a centered loading spinner.
 * Covers entire viewport, including any fixed headers/navbars.
 */
export default function BlurInterface() {
  return (
    <div className="fixed inset-0 w-screen h-screen z-[9999] bg-black/20 backdrop-blur-sm flex items-center justify-center">
      <Loader className="size-10 animate-spin text-white" />
    </div>
  );
}
