import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { Skeleton } from '../ui/skeleton';

/**
 * Skeleton placeholder for RecentStudentsCard while loading.
 */
export default function RecentStudentsCardSkeleton() {
  return (
    <Card className="card-hover border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">الطلاب الجدد</CardTitle>
        <CardDescription>أحدث تسجيلات الطلاب</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/30 flex items-center space-x-4 space-x-reverse rounded-lg p-3"
            >
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
