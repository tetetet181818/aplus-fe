"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Zap, Shield, Coins, Banknote, Info } from "lucide-react";

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
        <Card className="bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 border-0 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>

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
        <Card className="shadow-lg border-gray-200 dark:border-gray-700">
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
              <Skeleton className="h-4 w-32 mb-2 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-11 w-full bg-gray-200 dark:bg-gray-600" />
            </div>

            {/* Bank Select Field */}
            <div className="mb-4">
              <Skeleton className="h-4 w-20 mb-2 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-11 w-full bg-gray-200 dark:bg-gray-600" />
            </div>

            {/* IBAN Field */}
            <div className="mb-4">
              <Skeleton className="h-4 w-28 mb-2 bg-gray-300 dark:bg-gray-700" />
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center px-3 bg-gray-100 dark:bg-gray-700 border border-r-0 border-gray-300 dark:border-gray-600 rounded-l-md">
                  <span className="text-gray-400">SA</span>
                </div>
                <Skeleton className="h-11 w-full bg-gray-200 dark:bg-gray-600 rounded-md" />
              </div>
            </div>

            {/* Withdrawal Amount Field */}
            <div className="mb-4">
              <Skeleton className="h-4 w-28 mb-2 bg-gray-300 dark:bg-gray-700" />
              <Skeleton className="h-11 w-full bg-gray-200 dark:bg-gray-600" />
            </div>

            {/* Withdrawal Info */}
            <div className="p-3 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md mb-4">
              <div className="flex items-start gap-2">
                <Info className="h-5 w-5 text-gray-400 mt-0.5 shrink-0" />
                <Skeleton className="h-4 flex-1 bg-gray-200 dark:bg-gray-600" />
              </div>
            </div>

            {/* Submit Button */}
            <Skeleton className="h-11 w-full bg-gray-300 dark:bg-gray-700" />

            {/* Form Messages */}
            <div className="flex flex-col items-center gap-2 mt-2">
              <Skeleton className="h-4 w-64 bg-gray-200 dark:bg-gray-600" />
              <Skeleton className="h-4 w-56 bg-gray-200 dark:bg-gray-600" />
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Fees and Info Skeleton */}
      <section>
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-slate-50 dark:bg-gray-800 border-b">
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-gray-400" />
              <Skeleton className="h-6 w-48 bg-gray-300 dark:bg-gray-700" />
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Column Skeleton */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-gray-400" />
                  <Skeleton className="h-6 w-40 bg-gray-300 dark:bg-gray-700" />
                </div>
                <ul className="space-y-2">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Skeleton className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-2" />
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
                <ul className="space-y-2 text-sm rounded-xl p-4 bg-gray-50 dark:bg-gray-800">
                  {[1, 2, 3].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <Skeleton className="h-2 w-2 rounded-full bg-gray-300 dark:bg-gray-600 mt-2" />
                      <Skeleton className="h-4 flex-1 bg-gray-200 dark:bg-gray-600" />
                    </li>
                  ))}
                </ul>
                <div className="flex items-start gap-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <Info className="h-4 w-4 text-gray-400 mt-0.5" />
                  <Skeleton className="h-4 flex-1 bg-gray-200 dark:bg-gray-600" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Withdrawal Table Skeleton */}
      <section>
        <Card className="shadow-xl border-0">
          <CardHeader className="bg-slate-50 dark:bg-gray-800 border-b">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <Skeleton className="h-6 w-40 bg-gray-300 dark:bg-gray-700" />
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Desktop Table Skeleton */}
            <div className="hidden md:block overflow-x-auto rounded-lg border">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50 dark:bg-gray-800 text-start">
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
                      className="hover:bg-slate-50 dark:hover:bg-gray-800 transition-colors"
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
            <div className="md:hidden space-y-4">
              {[1, 2, 3].map((card) => (
                <div
                  key={card}
                  className="border rounded-lg p-4 shadow-sm bg-white dark:bg-gray-800 space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <Skeleton className="h-5 w-24 bg-gray-300 dark:bg-gray-700" />
                    <Skeleton className="h-6 w-16 bg-gray-300 dark:bg-gray-700" />
                  </div>
                  <Skeleton className="h-4 w-32 bg-gray-200 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-40 bg-gray-200 dark:bg-gray-600" />
                  <Skeleton className="h-4 w-20 bg-gray-200 dark:bg-gray-600" />
                  <Skeleton className="h-3 w-28 bg-gray-200 dark:bg-gray-600" />
                  <div className="flex gap-2 justify-end">
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
  );
}
