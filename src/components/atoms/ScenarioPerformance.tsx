import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSales from "@/hooks/useSales";
import SalesClientTableSkeleton from "../skeletons/SalesClientTableSkeleton";
import formatArabicDate from "@/utils/formateTime";
import { SalesUser } from "@/types";

export default function SalesPerformance() {
  const { userStatisticsSales, userStatisticsSalesLoading } = useSales();

  if (userStatisticsSalesLoading) {
    return <SalesClientTableSkeleton />;
  }

  return (
    <Card
      className="border-none bg-transparent shadow-none gap-3 col-span-2"
      dir="rtl"
    >
      <CardHeader className="p-2">
        <CardTitle className="font-semibold text-xl text-right">
          أداء مبيعات الملخصات
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Desktop Table View - hidden on mobile */}
        <div className="hidden md:block rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-sm">
          <Table>
            <TableHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
              <TableRow className="hover:bg-transparent border-b border-gray-200 dark:border-gray-600">
                <TableHead className="text-right py-4 px-6 font-bold text-blue-900 dark:text-blue-100 text-lg border-l border-gray-200 dark:border-gray-600">
                  اسم الملخص
                </TableHead>
                <TableHead className="text-right py-4 px-6 font-bold text-blue-900 dark:text-blue-100 text-lg border-l border-gray-200 dark:border-gray-600">
                  عدد المبيعات
                </TableHead>
                <TableHead className="text-right py-4 px-6 font-bold text-blue-900 dark:text-blue-100 text-lg border-l border-gray-200 dark:border-gray-600">
                  الإيرادات
                </TableHead>
                <TableHead className="text-right py-4 px-6 font-bold text-blue-900 dark:text-blue-100 text-lg">
                  تاريخ المبيعات
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {userStatisticsSales?.sales?.map(
                (sale: SalesUser, index: number) => (
                  <TableRow
                    key={sale?._id}
                    className={`
                    transition-all duration-200 ease-in-out 
                    border-b border-gray-100 dark:border-gray-700
                    hover:bg-blue-50/50 dark:hover:bg-blue-900/20
                    ${
                      index % 2 === 0
                        ? "bg-white/50 dark:bg-gray-800/50"
                        : "bg-gray-50/30 dark:bg-gray-700/30"
                    }
                  `}
                  >
                    <TableCell className="text-right py-4 px-6 font-medium text-gray-700 dark:text-gray-200 border-l border-gray-100 dark:border-gray-700">
                      <div className="flex items-center justify-end gap-3">
                        {sale.note_title}
                      </div>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-semibold min-w-[60px]">
                        {sale.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6">
                      <span className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-sm font-semibold min-w-[80px]">
                        {sale.amount.toFixed(2)} ر.س
                      </span>
                    </TableCell>
                    <TableCell className="text-right py-4 px-6 text-gray-600 dark:text-gray-300 font-medium">
                      {formatArabicDate(sale.createdAt)}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View - shown only on mobile */}
        <div className="md:hidden space-y-4">
          {userStatisticsSales?.sales?.map((sale: SalesUser, index: number) => (
            <Card
              key={sale?._id}
              className={`
                transition-all duration-200 ease-in-out 
                border border-gray-200 dark:border-gray-700 
                shadow-sm hover:shadow-md
                ${
                  index % 2 === 0
                    ? "bg-white/50 dark:bg-gray-800/50"
                    : "bg-gray-50/30 dark:bg-gray-700/30"
                }
              `}
            >
              <CardContent className="p-4">
                {/* Summary Title */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-600">
                  <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-200">
                    {sale.note_title}
                  </h3>
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                </div>

                {/* Sales Data Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Sales Count */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      عدد المبيعات
                    </p>
                    <span className="inline-flex items-center justify-center bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-2 rounded-lg text-sm font-semibold w-full">
                      {sale.amount.toFixed(2)}
                    </span>
                  </div>

                  {/* Revenue */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      الإيرادات
                    </p>
                    <span className="inline-flex items-center justify-center bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 px-3 py-2 rounded-lg text-sm font-semibold w-full">
                      {sale.amount.toFixed(2)} ر.س
                    </span>
                  </div>

                  {/* Sales Date */}
                  <div className="col-span-2 space-y-2 pt-2 border-t border-gray-100 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      تاريخ المبيعات
                    </p>
                    <p className="text-right text-gray-700 dark:text-gray-300 font-medium">
                      {formatArabicDate(sale.createdAt)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty state for both desktop and mobile */}
        {(!userStatisticsSales?.sales ||
          userStatisticsSales.sales.length === 0) && (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300 mb-2">
              لا توجد مبيعات حالياً
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              سيظهر هنا أي ملخصات تم بيعها
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
