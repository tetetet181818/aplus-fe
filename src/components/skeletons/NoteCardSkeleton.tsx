// "use client";

import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function NoteCardSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <div className="flex flex-col gap-3" key={index}>
          <Card className="py-0 overflow-hidden shadow-md">
            <div className="flex flex-col sm:flex-row">
              {/* Cover Skeleton */}
              <div className="relative w-full sm:w-1/3 lg:w-1/4 aspect-video sm:aspect-[4/3]">
                <Skeleton className="w-full h-full" />
              </div>

              {/* Info Skeleton */}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <Skeleton className="h-5 w-16 rounded-md" />
                  </div>
                  <Skeleton className="h-6 w-2/3 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-5/6 mb-2" />
                  <div className="flex flex-wrap gap-2 text-xs mb-3">
                    <Skeleton className="h-5 w-20 rounded-md" />
                    <Skeleton className="h-5 w-20 rounded-md" />
                  </div>
                </div>

                {/* Actions Skeleton */}
                <div className="flex flex-col sm:flex-row justify-between items-center mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Skeleton className="h-4 w-40 mb-2 sm:mb-0" />
                  <div className="flex gap-2 flex-wrap">
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
  );
}
