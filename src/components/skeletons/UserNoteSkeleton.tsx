import React from 'react'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton loader for the note card component
 * Displays a loading state with shimmer effects matching the note card layout
 *
 * Note card skeleton component
 */
export default function NoteCardSkeleton() {
  return (
    <div className="flex flex-col items-center justify-center gap-5">
      {Array.from({ length: 5 }, (_, index) => (
        <Card key={index} className="overflow-hidden py-0 shadow-md">
          <div className="flex flex-col sm:flex-row">
            {/* Note Cover Skeleton */}
            <div className="relative aspect-video w-full sm:aspect-[4/3] sm:w-1/3 lg:w-1/4">
              <Skeleton className="h-full w-full bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* Note Info Skeleton */}
            <div className="flex flex-1 flex-col justify-between p-4">
              <div>
                {/* Price Badge & Header */}
                <div className="mb-1 flex items-start justify-between">
                  <Skeleton className="h-6 w-16 bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Title */}
                <Skeleton className="mb-2 h-5 w-3/4 bg-gray-300 dark:bg-gray-700" />

                {/* Description */}
                <Skeleton className="mb-2 h-4 w-full bg-gray-200 dark:bg-gray-600" />
                <Skeleton className="mb-2 h-4 w-2/3 bg-gray-200 dark:bg-gray-600" />

                {/* University & Subject Badges */}
                <div className="mb-3 flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-20 bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-5 w-16 bg-gray-300 dark:bg-gray-700" />
                </div>
              </div>

              {/* Actions Skeleton */}
              <div className="mt-3 flex flex-col items-center justify-between border-t border-gray-200 pt-3 sm:flex-row dark:border-gray-700">
                {/* Downloads & Rating */}
                <Skeleton className="mb-2 h-4 w-32 bg-gray-200 sm:mb-0 dark:bg-gray-600" />

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-8 w-16 bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-8 w-20 bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-8 w-16 bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-8 w-14 bg-gray-300 dark:bg-gray-700" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
