import { Card, CardContent } from "../ui/card";
import { Skeleton } from "../ui/skeleton";

export default function NotificationSkeleton() {
  return (
    <Card className="border bg-gradient-to-r from-primary/5 to-blue-500/5">
      <CardContent className="p-3 sm:p-4 flex gap-3 items-start">
        <Skeleton className="h-5 w-5 rounded-full bg-primary/10" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-2/3" />
          <Skeleton className="h-3 w-5/6" />
          <div className="flex items-center gap-2 mt-2">
            <Skeleton className="h-6 w-6 rounded-full" />
            <Skeleton className="h-3 w-16" />
          </div>
          <div className="flex justify-between mt-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-4 w-10 rounded-md" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
