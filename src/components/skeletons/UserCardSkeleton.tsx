import { Skeleton } from "@/components/ui/skeleton";

export default function UserCardSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <Skeleton className="h-16 w-16 mb-3 rounded-full" />
          <Skeleton className="h-4 w-32 mb-2" />
          <Skeleton className="h-3 w-40 mb-3" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  );
}
