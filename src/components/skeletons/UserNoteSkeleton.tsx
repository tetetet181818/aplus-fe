import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton loader for the note card component
 * Displays a loading state with shimmer effects matching the note card layout
 *
 * Note card skeleton component
 */
export default function NoteCardSkeleton() {
  return (
    <div className="flex justify-center items-center flex-col gap-5">
      {Array.from({ length: 5 }, (_, index) => (
        <Card key={index} className="py-0 overflow-hidden shadow-md">
          <div className="flex flex-col sm:flex-row">
            {/* Note Cover Skeleton */}
            <div className="relative w-full sm:w-1/3 lg:w-1/4 aspect-video sm:aspect-[4/3]">
              <Skeleton className="w-full h-full bg-gray-300 dark:bg-gray-700" />
            </div>

            {/* Note Info Skeleton */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                {/* Price Badge & Header */}
                <div className="flex justify-between items-start mb-1">
                  <Skeleton className="h-6 w-16 bg-gray-300 dark:bg-gray-700" />
                </div>

                {/* Title */}
                <Skeleton className="h-5 w-3/4 mb-2 bg-gray-300 dark:bg-gray-700" />

                {/* Description */}
                <Skeleton className="h-4 w-full mb-2 bg-gray-200 dark:bg-gray-600" />
                <Skeleton className="h-4 w-2/3 mb-2 bg-gray-200 dark:bg-gray-600" />

                {/* University & Subject Badges */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <Skeleton className="h-5 w-20 bg-gray-300 dark:bg-gray-700" />
                  <Skeleton className="h-5 w-16 bg-gray-300 dark:bg-gray-700" />
                </div>
              </div>

              {/* Actions Skeleton */}
              <div className="flex flex-col sm:flex-row justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                {/* Downloads & Rating */}
                <Skeleton className="h-4 w-32 mb-2 sm:mb-0 bg-gray-200 dark:bg-gray-600" />

                {/* Action Buttons */}
                <div className="flex gap-2 flex-wrap">
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
  );
}
