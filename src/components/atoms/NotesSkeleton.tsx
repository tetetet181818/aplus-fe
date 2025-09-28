import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

const NoteCardSkeleton = () => {
  return (
    <div className="flex justify-center flex-wrap gap-3">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index}>
          <div className="h-full w-full rounded-xl overflow-x-hidden">
            <Card className="h-full flex flex-col py-0 border-1 rounded-xl overflow-hidden">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Skeleton className="w-full h-full rounded-lg" />
                <div className="absolute bottom-3 left-3">
                  <Skeleton className="h-5 w-14 rounded-full" />
                </div>
              </div>

              <CardContent className="p-4 pt-0 flex flex-col flex-grow space-y-3 h-fit">
                <Skeleton className="h-5 w-3/4" />

                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-6 w-20 rounded-full" />
                  <Skeleton className="h-6 w-24 rounded-full" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-6 w-14 rounded-full" />
                </div>

                <div className="mt-auto pt-3 border-t border-border">
                  <div className="flex justify-between items-center text-sm">
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
