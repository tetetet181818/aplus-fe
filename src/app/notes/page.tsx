"use client";
import { toast } from "sonner";

export default function NotesPage() {
  return (
    <div className="p-6">
      <button
        onClick={() => toast.success("تم التسجيل بنجاح 🎉")}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Show Success Toast
      </button>

      <button
        onClick={() => toast.error("حدث خطأ 🚨")}
        className="px-4 py-2 bg-red-500 text-white rounded ml-4"
      >
        Show Error Toast
      </button>
    </div>
  );
}
