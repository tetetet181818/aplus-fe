import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function FinancialDashboardSkeleton() {
  return (
    <div className="space-y-8">
      {/* Header Skeleton */}
      <header className="flex items-center gap-2">
        <div className="p-2 bg-gray-200 rounded-lg animate-pulse">
          <div className="h-6 w-6 bg-gray-300 rounded"></div>
        </div>
        <div className="h-8 w-64 bg-gray-200 rounded animate-pulse"></div>
      </header>

      {/* Balance Card Skeleton */}
      <section>
        <Card className="bg-gray-100 border-0 shadow-xl overflow-hidden relative animate-pulse">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gray-200 rounded-full translate-y-12 -translate-x-12"></div>

          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-gray-300 rounded-full">
                <div className="h-5 w-5 bg-gray-400 rounded"></div>
              </div>
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
            </CardTitle>
            <CardDescription>
              <div className="h-4 w-64 bg-gray-300 rounded mt-2"></div>
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <div className="h-12 w-40 bg-gray-300 rounded animate-pulse"></div>
          </CardContent>
        </Card>
      </section>

      {/* Fees and Info Skeleton */}
      <section>
        <Card className="shadow-xl border-0 animate-pulse">
          <CardHeader className="bg-gray-100 border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
              <div className="h-6 w-48 bg-gray-300 rounded"></div>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-gray-300 rounded"></div>
                  <div className="h-6 w-40 bg-gray-300 rounded"></div>
                </div>
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-300 mt-2"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <div className="h-5 w-5 bg-gray-300 rounded"></div>
                  <div className="h-6 w-40 bg-gray-300 rounded"></div>
                </div>
                <div className="space-y-3 rounded-xl p-4 bg-gray-50">
                  {[1, 2, 3].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-300 mt-2"></div>
                      <div className="h-4 bg-gray-200 rounded flex-1"></div>
                    </div>
                  ))}
                </div>
                <div className="flex items-start gap-2 p-3 rounded-lg border border-gray-200 bg-gray-50">
                  <div className="h-4 w-4 bg-gray-300 rounded mt-0.5"></div>
                  <div className="h-4 bg-gray-200 rounded flex-1"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Withdrawal Table Skeleton */}
      <section>
        <Card className="shadow-xl border-0 animate-pulse">
          <CardHeader className="bg-gray-100 border-b">
            <CardTitle className="flex items-center gap-2">
              <div className="h-5 w-5 bg-gray-300 rounded"></div>
              <div className="h-6 w-40 bg-gray-300 rounded"></div>
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6">
            {/* Desktop Table Skeleton */}
            <div className="hidden md:block overflow-x-auto rounded-lg border">
              <div className="min-w-full">
                {/* Table Header */}
                <div className="bg-gray-50 p-4 border-b">
                  <div className="grid grid-cols-10 gap-4">
                    {[...Array(10)].map((_, i) => (
                      <div key={i} className="h-4 bg-gray-300 rounded"></div>
                    ))}
                  </div>
                </div>

                {/* Table Rows */}
                <div className="divide-y">
                  {[...Array(3)].map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-10 gap-4">
                        {[...Array(10)].map((_, colIndex) => (
                          <div
                            key={colIndex}
                            className="h-4 bg-gray-200 rounded"
                          ></div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Cards Skeleton */}
            <div className="md:hidden space-y-4">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-4 shadow-sm bg-white space-y-3 animate-pulse"
                >
                  <div className="flex justify-between items-center">
                    <div className="h-5 w-24 bg-gray-300 rounded"></div>
                    <div className="h-6 w-16 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-32 bg-gray-200 rounded"></div>
                    <div className="h-4 w-40 bg-gray-200 rounded"></div>
                    <div className="h-4 w-28 bg-gray-200 rounded"></div>
                    <div className="h-3 w-24 bg-gray-200 rounded"></div>
                  </div>
                  <div className="flex gap-2 justify-end">
                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
                    <div className="h-8 w-8 bg-gray-300 rounded"></div>
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
