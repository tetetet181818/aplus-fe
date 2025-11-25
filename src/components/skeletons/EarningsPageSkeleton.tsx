'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Calendar, Zap, Shield, Coins, Banknote, Info } from 'lucide-react'

/**
 * Skeleton loader for the EarningsPage component
 * Combines FinanceDashboard and WithdrawalForm skeletons
 *
 * Complete earnings page skeleton component
 */
export default function EarningsPageSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <header className="flex items-center gap-2">
        <Skeleton className="h-10 w-10 bg-gray-300 dark:bg-gray-700" />
        <Skeleton className="h-8 w-48 bg-gray-300 dark:bg-gray-700" />
      </header>

      {/* Balance Card Skeleton */}
      <section>
        <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-200 to-gray-300 shadow-xl dark:from-gray-700 dark:to-gray-800">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-white/10"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-white/10"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <Skeleton className="h-8 w-8 bg-gray-400 dark:bg-gray-600" />
              <Skeleton className="h-6 w-40 bg-gray-400 dark:bg-gray-600" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-64 bg-gray-400/80 dark:bg-gray-600/80" />
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <Skeleton className="h-12 w-32 bg-gray-400 dark:bg-gray-600" />
          </CardContent>
        </Card>
      </section>

      {/* Withdrawal Form Skeleton */}
      <section>
        <Card className="border-gray-200 shadow-lg dark:border-gray-700">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Banknote className="h-6 w-6 text-gray-400" />
              <Skeleton className="h-6 w-32 bg-gray-300 dark:bg-gray-700" />
            </CardTitle>
            <CardDescription>
              <Skeleton className="h-4 w-64 bg-gray-200 dark:bg-gray-600" />
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Account Holder Name Field */}
            <div className="mb-4">
              <Skeleton className="mb-2 h-4 w-32 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-11 w-full bg-gray-200 dark:bg-gray-600" />
            </div>

            {/* Bank Select Field */}
            <div className="mb-4">
              <Skeleton className="mb-2 h-4 w-20 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-11 w-full bg-gray-200 dark:bg-gray-600" />
            </div>

            {/* IBAN Field */}
            <div className="mb-4">
              <Skeleton className="mb-2 h-4 w-28 bg-gray-300 dark:bg-gray-700" />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center rounded-l-md border border-r-0 border-gray-300 bg-gray-100 px-3 dark:border-gray-600 dark:bg-gray-700">
                  <span className="text-gray-400">SA</span>
                </div>
                <Skeleton className="h-11 w-full rounded-md bg-gray-200 dark:bg-gray-600" />
              </div>
            </div>

            {/* Withdrawal Amount Field */}
            <div className="mb-4">
              <Skeleton className="mb-2 h-4 w-28 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-11 w-full bg-gray-200 dark:bg-gray-600" />
            </div>

            {/* Withdrawal Info */}
            <div className="mb-4 rounded-md border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
              <div className="flex items-start gap-2">
                <Info className="mt-0.5 h-5 w-5 shrink-0 text-gray-400" />
                <Skeleton className="h-4 flex-1 bg-gray-200 dark:bg-gray-600" />
              </div>
            </div>

            {/* Submit Button */}
            <Skeleton className="h-11 w-full bg-gray-300 dark:bg-gray-700" />

            {/* Form Messages */}
            <div className="mt-2 flex flex-col items-center gap-2">
              <Skeleton className="h-4 w-64 bg-gray-200 dark:bg-gray-600" />
              <Skeleton className="h-4 w-56 bg-gray-200 dark:bg-gray-600" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Fees and Info Skeleton */}
      <section>
        <Card className="border-0 shadow-xl">
          <CardHeader className="border-b bg-slate-50 dark:bg-gray-800">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <Skeleton className="h-6 w-48 bg-gray-300 dark:bg-gray-700" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Left Column Skeleton */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gray-400" />
                  <Skeleton className="h-6 w-40 bg-gray-300 dark:bg-gray-700" />
                </div>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Skeleton className="mt-2 h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <Skeleton className="h-4 flex-1 bg-gray-200 dark:bg-gray-600" />
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column Skeleton */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Coins className="h-5 w-5 text-gray-400" />
                  <Skeleton className="h-6 w-44 bg-gray-300 dark:bg-gray-700" />
                </div>
                <ul className="space-y-2 rounded-xl bg-gray-50 p-4 text-sm dark:bg-gray-800">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Skeleton className="mt-2 h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600" />
                      <Skeleton className="h-4 flex-1 bg-gray-200 dark:bg-gray-600" />
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3 dark:border-gray-700 dark:bg-gray-800">
                  <Info className="mt-0.5 h-4 w-4 text-gray-400" />
                  <Skeleton className="h-4 flex-1 bg-gray-200 dark:bg-gray-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Withdrawal Table Skeleton */}
      <section>
        <Card className="border-0 shadow-xl">
          <CardHeader className="border-b bg-slate-50 dark:bg-gray-800">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <Skeleton className="h-6 w-40 bg-gray-300 dark:bg-gray-700" />
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Desktop Table Skeleton */}
            <div className="hidden overflow-x-auto rounded-lg border md:block">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 text-start dark:bg-gray-800">
                  <tr>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((header) => (
                      <th key={header} className="px-4 py-3 text-start">
                        <Skeleton className="h-4 w-20 bg-gray-300 dark:bg-gray-700" />
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {[1, 2, 3].map((row) => (
                    <tr
                      key={row}
                      className="transition-colors hover:bg-slate-50 dark:hover:bg-gray-800"
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((cell) => (
                        <td key={cell} className="px-4 py-3">
                          <Skeleton className="h-4 w-16 bg-gray-200 dark:bg-gray-600" />
                        </td>
                      ))}
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          <Skeleton className="h-8 w-8 bg-gray-300 dark:bg-gray-700" />
                          <Skeleton className="h-8 w-8 bg-gray-300 dark:bg-gray-700" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards Skeleton */}
            <div className="space-y-4 md:hidden">
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="space-y-3 rounded-lg border bg-white p-4 shadow-sm dark:bg-gray-800"
                >
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-5 w-24 bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-6 w-16 bg-gray-300 dark:bg-gray-700" />
                  </div>
                  <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-600" />
                  <Skeleton className="h-3 w-28 bg-gray-200 dark:bg-gray-600" />
                  <div className="flex justify-end gap-2">
                    <Skeleton className="h-8 w-8 bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-8 w-8 bg-gray-300 dark:bg-gray-700" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
