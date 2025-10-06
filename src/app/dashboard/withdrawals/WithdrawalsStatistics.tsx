"use client";

import WithdrawalStatsCard from "@/components/atoms/WithdrawalStatsCard";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface WithdrawalStatus {
  status: string;
  count: number;
}

/**
 * Display withdrawal status statistics.
 * - Shows Skeleton placeholders when loading is true.
 * - Shows WithdrawalStatsCard for each status when loaded.
 */
export default function WithdrawalsStatistics({
  withdrawalStatuses,
  loading,
}: {
  withdrawalStatuses: WithdrawalStatus[];
  loading: boolean;
}) {
  if (loading) {
    return (
      <div className="flex gap-4 flex-wrap">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card
            key={i}
            className="flex-1 text-center transition-all hover:shadow-md"
          >
            <CardContent className="p-4">
              <Skeleton className="h-5 w-1/2 mx-auto mb-3" />
              <Skeleton className="h-8 w-16 mx-auto" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="flex gap-4 flex-wrap">
      {withdrawalStatuses?.map((status: WithdrawalStatus) => (
        <WithdrawalStatsCard
          key={status.status}
          title={status.status}
          value={status.count}
        />
      ))}
    </div>
  );
}
