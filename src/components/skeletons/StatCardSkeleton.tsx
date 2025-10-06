"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

/**
 * Skeleton placeholder for StatCard while loading.
 *
 * @param compact - If true, render a smaller skeleton variant
 */
export default function StatCardSkeleton({
  compact = false,
}: {
  compact?: boolean;
}) {
  return (
    <Card className="card-hover border-0 shadow-lg bg-gradient-to-br from-muted/30 to-muted/50 dark:from-muted/10 dark:to-muted/20">
      <CardHeader
        className={`flex flex-row items-center justify-between ${
          compact ? "pb-3" : "pb-4"
        }`}
      >
        <CardTitle className="text-sm font-medium text-muted-foreground">
          <Skeleton className="h-4 w-24" />
        </CardTitle>
        <div className="p-2 bg-muted/40 rounded-lg">
          <Skeleton className="h-5 w-5 rounded" />
        </div>
      </CardHeader>
      <CardContent>
        <div className={`${compact ? "text-2xl" : "text-3xl"} font-bold`}>
          <Skeleton className="h-7 w-20" />
        </div>
        <div className="mt-2">
          <Skeleton className="h-4 w-16" />
        </div>
        <div className="mt-2">
          <Skeleton className="h-4 w-32" />
        </div>
      </CardContent>
    </Card>
  );
}
