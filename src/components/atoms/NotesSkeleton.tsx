import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

const NoteCardSkeleton = () => {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <div className="h-full w-full overflow-x-hidden rounded-xl">
            <Card className="flex h-full flex-col overflow-hidden rounded-xl border-1 py-0">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Skeleton className="h-full w-full rounded-lg" />
                <div className="absolute bottom-3 left-3">
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </div>

              <CardContent className="flex h-fit flex-grow flex-col space-y-3 p-4 pt-0">
                <Skeleton className="h-5 w-3/4" />

                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>

                <div className="border-border mt-auto border-t pt-3">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-4 w-20" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteCardSkeleton;
