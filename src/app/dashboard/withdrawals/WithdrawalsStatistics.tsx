"use client";

import WithdrawalStatsCard from "@/components/atoms/WithdrawalStatsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface WithdrawalStatus {
  status: string;
  count: number;
}

/**
 * عرض إحصائيات حالة السحب
 * - يعرض هياكل التحميل عند التحميل
 * - يعرض بطاقة إحصائيات السحب لكل حالة عند التحميل
 */
export default function WithdrawalsStatistics({
  withdrawalStatuses,
  loading,
}: {
  withdrawalStatuses: WithdrawalStatus[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        dir="rtl"
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl"
          >
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <Skeleton className="h-6 w-32 rounded-full" />
                <Skeleton className="h-10 w-20 rounded-xl" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
      dir="rtl"
    >
      {withdrawalStatuses?.map((status: WithdrawalStatus, index) => {
        // تحديد الألوان بناءً على الحالة
        const getGradient = (status: string, index: number) => {
          const statusLower = status.toLowerCase();

          if (
            statusLower.includes("pending") ||
            statusLower.includes("processing") ||
            statusLower.includes("قيد الانتظار")
          ) {
            return "from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20";
          } else if (
            statusLower.includes("completed") ||
            statusLower.includes("success") ||
            statusLower.includes("مكتمل")
          ) {
            return "from-emerald-50 to-green-100 dark:from-emerald-900/20 dark:to-green-900/20";
          } else if (
            statusLower.includes("failed") ||
            statusLower.includes("rejected") ||
            statusLower.includes("فشل")
          ) {
            return "from-rose-50 to-red-100 dark:from-rose-900/20 dark:to-red-900/20";
          } else if (
            statusLower.includes("cancelled") ||
            statusLower.includes("ملغى")
          ) {
            return "from-gray-50 to-slate-100 dark:from-gray-800 dark:to-slate-900";
          }

          // ألوان احتياطية بناءً على الفهرس
          const gradients = [
            "from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20",
            "from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-900/20",
            "from-cyan-50 to-teal-100 dark:from-cyan-900/20 dark:to-teal-900/20",
            "from-orange-50 to-amber-100 dark:from-orange-900/20 dark:to-amber-900/20",
          ];
          return gradients[index % gradients.length];
        };

        const getBorderColor = (status: string) => {
          const statusLower = status.toLowerCase();

          if (
            statusLower.includes("pending") ||
            statusLower.includes("processing") ||
            statusLower.includes("قيد الانتظار")
          ) {
            return "border-r-4 border-r-amber-400";
          } else if (
            statusLower.includes("completed") ||
            statusLower.includes("success") ||
            statusLower.includes("مكتمل")
          ) {
            return "border-r-4 border-r-emerald-400";
          } else if (
            statusLower.includes("failed") ||
            statusLower.includes("rejected") ||
            statusLower.includes("فشل")
          ) {
            return "border-r-4 border-r-rose-400";
          } else if (
            statusLower.includes("cancelled") ||
            statusLower.includes("ملغى")
          ) {
            return "border-r-4 border-r-gray-400";
          }

          return "border-r-4 border-r-indigo-400";
        };

        // تحويل النص إلى العربية
        const getArabicTitle = (status: string) => {
          const statusLower = status.toLowerCase();

          if (
            statusLower.includes("pending") ||
            statusLower.includes("قيد الانتظار")
          ) {
            return "قيد الانتظار";
          } else if (
            statusLower.includes("completed") ||
            statusLower.includes("success")
          ) {
            return "مكتمل";
          } else if (
            statusLower.includes("failed") ||
            statusLower.includes("rejected")
          ) {
            return "فشل";
          } else if (statusLower.includes("cancelled")) {
            return "ملغى";
          } else if (
            statusLower.includes("accepted") ||
            statusLower.includes("موافق")
          ) {
            return "موافق عليه";
          }

          return status;
        };

        return (
          <Card
            key={status.status}
            className={`relative overflow-hidden border-0 bg-gradient-to-br ${getGradient(
              status.status,
              index
            )} shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 rounded-2xl ${getBorderColor(
              status.status
            )} group`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] bg-[length:20px_20px] opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>

            <CardContent className="p-6 relative z-10">
              <WithdrawalStatsCard
                title={getArabicTitle(status.status)}
                value={status.count}
                className="text-center"
              />
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
