import { Skeleton } from '@/components/ui/skeleton'

export default function UserCardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md"
        >
          <Skeleton className="mb-3 h-16 w-16 rounded-full" />
          <Skeleton className="mb-2 h-4 w-32" />
          <Skeleton className="mb-3 h-3 w-40" />
          <Skeleton className="h-4 w-24" />
        </div>
      ))}
    </div>
  )
}
