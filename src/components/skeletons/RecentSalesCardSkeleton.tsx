'use client'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

/**
 * Skeleton placeholder for RecentSalesCard while loading.
 */
export default function RecentSalesCardSkeleton() {
  return (
    <Card className="card-hover border-0 shadow-lg">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold">
          المبيعات الحديثة
        </CardTitle>
        <CardDescription>أحدث مشتريات الدورات</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="bg-muted/30 flex items-center justify-between rounded-lg p-3"
            >
              <div className="space-y-1">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
              <div className="space-y-1 text-right">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-5 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
