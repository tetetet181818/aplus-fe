import React from 'react'
import { Loader } from 'lucide-react'

/**
 * Full-screen blur overlay with a centered loading spinner.
 * Covers entire viewport, including any fixed headers/navbars.
 */
export default function BlurInterface() {
  return (
    <div className="fixed inset-0 z-[9999] flex h-screen w-screen items-center justify-center bg-black/20 backdrop-blur-sm">
      <Loader className="size-10 animate-spin text-white" />
    </div>
  )
}
