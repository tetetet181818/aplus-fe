'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

/**
 * Skeleton loader for the ProfileInfoTab component
 * Displays a loading state with shimmer effects
 *
 * @returns Loading skeleton component
 */
export default function ProfileInfoSkeleton() {
  return (
    <div className="mx-auto w-full max-w-3xl">
      <Card className="border-gray-200 shadow-lg dark:border-gray-700">
        <CardHeader className="border-b border-gray-200 px-4 pb-4 sm:px-6 dark:border-gray-700">
          <CardTitle className="text-xl font-bold sm:text-2xl">
            <Skeleton className="h-7 w-48 bg-gray-300 dark:bg-gray-700" />
          </CardTitle>
          <CardDescription>
            <Skeleton className="mt-2 h-5 w-64 bg-gray-200 dark:bg-gray-600" />
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4 p-4 sm:space-y-6 sm:p-6">
          {/* Name Field Skeleton */}
          <InfoFieldSkeleton />

          {/* Email Field Skeleton */}
          <InfoFieldSkeleton />

          {/* University Field Skeleton */}
          <InfoFieldSkeleton />

          {/* Action Buttons Skeleton */}
          <div className="flex flex-col justify-center gap-3 border-t border-gray-200 pt-4 sm:flex-row sm:pt-6 dark:border-gray-700">
            <Skeleton className="h-10 w-32 bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-10 w-36 bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-10 w-36 bg-gray-300 dark:bg-gray-700" />
            <Skeleton className="h-10 w-28 bg-gray-300 dark:bg-gray-700" />
          </div>

          {/* Warning Text Skeleton */}
          <Skeleton className="mx-auto h-4 w-full max-w-2xl bg-gray-200 dark:bg-gray-600" />
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * Reusable skeleton component for info fields
 *
 * @returns {JSX.Element} Info field skeleton
 */
const InfoFieldSkeleton = () => (
  <div className="flex items-start gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-800/50">
    <Skeleton className="h-9 w-9 rounded-full bg-gray-300 dark:bg-gray-700" />
    <div className="flex-1 space-y-2">
      <Skeleton className="h-4 w-24 bg-gray-200 dark:bg-gray-600" />
      <Skeleton className="h-5 w-40 bg-gray-300 dark:bg-gray-700" />
    </div>
  </div>
);
