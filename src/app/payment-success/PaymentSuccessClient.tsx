"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import LoadingSpinner from "@/components/atoms/LoadingSpinner";
import useNotes from "@/hooks/useNotes";
import { toast } from "sonner";

/**
 * Handles the client-side confirmation of a successful payment.
 * Retrieves payment parameters from the URL, calls the purchase API,
 * and redirects the user to their purchased note.
 */
const PaymentSuccessClient = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { handlePurchaseNote, purchaseLoading } = useNotes();

  // Extract query parameters
  const noteId = searchParams.get("noteId");
  const userId = searchParams.get("userId");
  const invoice_id = searchParams.get("invoice_id");
  const status = searchParams.get("status");
  const message = searchParams.get("message");

  useEffect(() => {
    /**
     * Confirms the purchase once payment is successful.
     * Calls backend purchase handler and redirects to the note page.
     */
    const confirmPurchase = async () => {
      if (!noteId || !userId) {
        toast.error("بيانات الدفع غير صالحة.");
        return;
      }

      try {
        const res = await handlePurchaseNote({
          noteId,
          invoice_id: invoice_id || "",
          status: status || "completed",
          message: message || "Payment confirmed successfully",
        });

        if (res?.data) {
          router.push(`/notes/${noteId}`);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("حدث خطأ أثناء تأكيد عملية الدفع.");
      }
    };

    confirmPurchase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [noteId, userId]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-50 dark:bg-gray-900">
      {purchaseLoading ? (
        <LoadingSpinner message="جاري تأكيد عملية الدفع..." />
      ) : (
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-bold text-green-600 dark:text-green-400">
            تمت عملية الدفع بنجاح
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            شكراً لشرائك من منصتنا. يمكنك الآن الوصول إلى الملخص الخاص بك.
          </p>
          <button
            onClick={() => router.push(`/notes/${noteId}`)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-md transition-colors duration-200"
          >
            الذهاب إلى الملخص
          </button>
        </div>
      )}
    </div>
  );
};

export default PaymentSuccessClient;
