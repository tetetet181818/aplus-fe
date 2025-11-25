import { Skeleton } from '../ui/skeleton'

export function StatisticsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          dir="rtl"
          className="flex flex-col gap-[12px] rounded-xl border border-gray-100 p-[16px] shadow-sm shadow-gray-100"
        >
          <Skeleton className="size-6 animate-pulse rounded-md bg-gray-200" />
          <Skeleton className="h-8 w-3/4 animate-pulse rounded-md bg-gray-200" />
          <Skeleton className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200" />
        </div>
      ))}
    </div>
  )
}
