import { Card, CardContent } from '../ui/card'
import { Skeleton } from '../ui/skeleton'

export default function NotificationSkeleton() {
  return (
    <Card className="from-primary/5 border bg-gradient-to-r to-blue-500/5">
      <CardContent className="flex items-start gap-3 p-3 sm:p-4">
        <Skeleton className="bg-primary/10 h-5 w-5 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-5/6" />
          <div className="mt-2 flex items-center gap-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="mt-2 flex justify-between">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
