import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import useSales from '@/hooks/useSales'
import SalesClientTableSkeleton from '../skeletons/SalesClientTableSkeleton'
import formatArabicDate from '@/utils/formateTime'
import { SalesUser } from '@/types'

export default function SalesPerformance() {
  const { userStatisticsSales, userStatisticsSalesLoading } = useSales()

  if (userStatisticsSalesLoading) {
    return <SalesClientTableSkeleton />
  }

  return (
    <Card
      className="col-span-2 gap-3 border-none bg-transparent shadow-none"
      dir="rtl"
    >
      <CardHeader className="p-2">
        <CardTitle className="text-right text-xl font-semibold">
          أداء مبيعات الملخصات
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Desktop Table View - hidden on mobile */}
        <div className="hidden overflow-hidden rounded-2xl border border-gray-200 shadow-sm md:block dark:border-gray-700">
          <Table>
            <TableHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30">
              <TableRow className="border-b border-gray-200 hover:bg-transparent dark:border-gray-600">
                <TableHead className="border-l border-gray-200 px-6 py-4 text-right text-lg font-bold text-blue-900 dark:border-gray-600 dark:text-blue-100">
                  اسم الملخص
                </TableHead>
                <TableHead className="border-l border-gray-200 px-6 py-4 text-right text-lg font-bold text-blue-900 dark:border-gray-600 dark:text-blue-100">
                  عدد المبيعات
                </TableHead>
                <TableHead className="border-l border-gray-200 px-6 py-4 text-right text-lg font-bold text-blue-900 dark:border-gray-600 dark:text-blue-100">
                  الإيرادات
                </TableHead>
                <TableHead className="px-6 py-4 text-right text-lg font-bold text-blue-900 dark:text-blue-100">
                  تاريخ المبيعات
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {userStatisticsSales?.sales?.map(
                (sale: SalesUser, index: number) => (
                  <TableRow
                    key={sale?._id}
                    className={`border-b border-gray-100 transition-all duration-200 ease-in-out hover:bg-blue-50/50 dark:border-gray-700 dark:hover:bg-blue-900/20 ${
                      index % 2 === 0
                        ? 'bg-white/50 dark:bg-gray-800/50'
                        : 'bg-gray-50/30 dark:bg-gray-700/30'
                    } `}
                  >
                    <TableCell className="border-l border-gray-100 px-6 py-4 text-right font-medium text-gray-700 dark:border-gray-700 dark:text-gray-200">
                      <div className="flex items-center justify-end gap-3">
                        {sale.note_title}
                      </div>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <span className="inline-flex min-w-[60px] items-center justify-center rounded-full bg-blue-100 px-3 py-1 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {sale?.count}
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right">
                      <span className="inline-flex min-w-[80px] items-center justify-center rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                        {sale?.totalProfit?.toFixed(2)} ر.س
                      </span>
                    </TableCell>
                    <TableCell className="px-6 py-4 text-right font-medium text-gray-600 dark:text-gray-300">
                      {formatArabicDate(sale.date)}
                    </TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </div>

        {/* Mobile Card View - shown only on mobile */}
        <div className="space-y-4 md:hidden">
          {userStatisticsSales?.sales?.map((sale: SalesUser, index: number) => (
            <Card
              key={sale?._id}
              className={`border border-gray-200 shadow-sm transition-all duration-200 ease-in-out hover:shadow-md dark:border-gray-700 ${
                index % 2 === 0
                  ? 'bg-white/50 dark:bg-gray-800/50'
                  : 'bg-gray-50/30 dark:bg-gray-700/30'
              } `}
            >
              <CardContent className="p-4">
                {/* Summary Title */}
                <div className="mb-4 flex items-center justify-between border-b border-gray-100 pb-3 dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                    {sale.note_title}
                  </h3>
                  <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                </div>

                {/* Sales Data Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Sales Count */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      عدد المبيعات
                    </p>
                    <span className="inline-flex w-full items-center justify-center rounded-lg bg-blue-100 px-3 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                      {sale?.count}
                    </span>
                  </div>

                  {/* Revenue */}
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      الإيرادات
                    </p>
                    <span className="inline-flex w-full items-center justify-center rounded-lg bg-green-100 px-3 py-2 text-sm font-semibold text-green-700 dark:bg-green-900/30 dark:text-green-300">
                      {sale?.totalProfit?.toFixed(2)} ر.س
                    </span>
                  </div>

                  {/* Sales Date */}
                  <div className="col-span-2 space-y-2 border-t border-gray-100 pt-2 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      تاريخ المبيعات
                    </p>
                    <p className="text-right font-medium text-gray-700 dark:text-gray-300">
                      {formatArabicDate(sale.date)}
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
          <div className="py-12 text-center">
            <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
              <svg
                className="h-12 w-12 text-gray-400"
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
            <h3 className="mb-2 text-lg font-semibold text-gray-600 dark:text-gray-300">
              لا توجد مبيعات حالياً
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              سيظهر هنا أي ملخصات تم بيعها
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
