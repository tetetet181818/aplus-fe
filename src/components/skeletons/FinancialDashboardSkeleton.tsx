import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export default function FinancialDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <header className="flex items-center gap-2">
        <div className="animate-pulse rounded-lg bg-gray-200 p-2">
          <div className="h-6 w-6 rounded bg-gray-300"></div>
        </div>
        <div className="h-8 w-64 animate-pulse rounded bg-gray-200"></div>
      </header>

      {/* Balance Card Skeleton */}
      <section>
        <Card className="relative animate-pulse overflow-hidden border-0 bg-gray-100 shadow-xl">
          <div className="absolute top-0 right-0 h-32 w-32 translate-x-16 -translate-y-16 rounded-full bg-gray-200"></div>
          <div className="absolute bottom-0 left-0 h-24 w-24 -translate-x-12 translate-y-12 rounded-full bg-gray-200"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <div className="rounded-full bg-gray-300 p-2">
                <div className="h-5 w-5 rounded bg-gray-400"></div>
              </div>
              <div className="h-6 w-48 rounded bg-gray-300"></div>
            </CardTitle>
            <CardDescription>
              <div className="mt-2 h-4 w-64 rounded bg-gray-300"></div>
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="h-12 w-40 animate-pulse rounded bg-gray-300"></div>
          </CardContent>
        </Card>
      </section>

      {/* Fees and Info Skeleton */}
      <section>
        <Card className="animate-pulse border-0 shadow-xl">
          <CardHeader className="border-b bg-gray-100">
            <CardTitle className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-gray-300"></div>
              <div className="h-6 w-48 rounded bg-gray-300"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-gray-300"></div>
                  <div className="h-6 w-40 rounded bg-gray-300"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="mt-2 h-2 w-2 rounded-full bg-gray-300"></div>
                      <div className="h-4 flex-1 rounded bg-gray-200"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 rounded bg-gray-300"></div>
                  <div className="h-6 w-40 rounded bg-gray-300"></div>
                </div>
                <div className="space-y-3 rounded-xl bg-gray-50 p-4">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="mt-2 h-2 w-2 rounded-full bg-gray-300"></div>
                      <div className="h-4 flex-1 rounded bg-gray-200"></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 rounded-lg border border-gray-200 bg-gray-50 p-3">
                  <div className="mt-0.5 h-4 w-4 rounded bg-gray-300"></div>
                  <div className="h-4 flex-1 rounded bg-gray-200"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Withdrawal Table Skeleton */}
      <section>
        <Card className="animate-pulse border-0 shadow-xl">
          <CardHeader className="border-b bg-gray-100">
            <CardTitle className="flex items-center gap-2">
              <div className="h-5 w-5 rounded bg-gray-300"></div>
              <div className="h-6 w-40 rounded bg-gray-300"></div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Desktop Table Skeleton */}
            <div className="hidden overflow-x-auto rounded-lg border md:block">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="border-b bg-gray-50 p-4">
                  <div className="grid grid-cols-10 gap-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="h-4 rounded bg-gray-300"></div>
                    ))}
                  </div>
                </div>

                {/* Table Rows */}
                <div className="divide-y">
                  {[...Array(3)].map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="p-4 transition-colors hover:bg-gray-50"
                    >
                      <div className="grid grid-cols-10 gap-4">
                        {[...Array(10)].map((_, colIndex) => (
                          <div
                            key={colIndex}
                            className="h-4 rounded bg-gray-200"
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Cards Skeleton */}
            <div className="space-y-4 md:hidden">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse space-y-3 rounded-lg border bg-white p-4 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <div className="h-5 w-24 rounded bg-gray-300"></div>
                    <div className="h-6 w-16 rounded-full bg-gray-300"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 rounded bg-gray-200"></div>
                    <div className="h-4 w-40 rounded bg-gray-200"></div>
                    <div className="h-4 w-28 rounded bg-gray-200"></div>
                    <div className="h-3 w-24 rounded bg-gray-200"></div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <div className="h-8 w-8 rounded bg-gray-300"></div>
                    <div className="h-8 w-8 rounded bg-gray-300"></div>
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
