// "use client";

import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

export function NoteCardSkeleton() {
  return (
    <>
      {Array.from({ length: 8 }).map((_, index) => (
        <div className="flex flex-col gap-3" key={index}>
          <Card className="overflow-hidden py-0 shadow-md">
            <div className="flex flex-col sm:flex-row">
              {/* Cover Skeleton */}
              <div className="relative aspect-video w-full sm:aspect-[4/3] sm:w-1/3 lg:w-1/4">
                <Skeleton className="h-full w-full" />
              </div>

              {/* Info Skeleton */}
              <div className="flex flex-1 flex-col justify-between p-4">
                <div>
                  <div className="mb-1 flex items-start justify-between">
                    <Skeleton className="h-5 w-16 rounded-md" />
                  </div>
                  <Skeleton className="mb-2 h-6 w-2/3" />
                  <Skeleton className="mb-2 h-4 w-full" />
                  <Skeleton className="mb-2 h-4 w-5/6" />
                  <div className="mb-3 flex flex-wrap gap-2 text-xs">
                    <Skeleton className="h-5 w-20 rounded-md" />
                    <Skeleton className="h-5 w-20 rounded-md" />
                  </div>
                </div>

                {/* Actions Skeleton */}
                <div className="mt-3 flex flex-col items-center justify-between border-t border-gray-200 pt-3 sm:flex-row dark:border-gray-700">
                  <Skeleton className="mb-2 h-4 w-40 sm:mb-0" />
                  <div className="flex flex-wrap gap-2">
                    <Skeleton className="h-8 w-16 rounded-md" />
                    <Skeleton className="h-8 w-20 rounded-md" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                    <Skeleton className="h-8 w-16 rounded-md" />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ))}
    </>
  )
}
