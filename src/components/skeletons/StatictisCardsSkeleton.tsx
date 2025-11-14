import { Skeleton } from "../ui/skeleton";

export function StatisticsCardsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          dir="rtl"
          className="rounded-xl p-[16px] flex flex-col gap-[12px] border border-gray-100 shadow-sm shadow-gray-100"
        >
          <Skeleton className="size-6 bg-gray-200 rounded-md animate-pulse" />
          <Skeleton className="h-8 bg-gray-200 rounded-md animate-pulse w-3/4" />
          <Skeleton className="h-4 bg-gray-200 rounded-md animate-pulse w-1/2" />
        </div>
      ))}
    </div>
  );
}
