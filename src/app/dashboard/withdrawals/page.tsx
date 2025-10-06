"use client";
import WithdrawalHistoryTable from "@/components/organisms/dashboard/withdrawals/WithdrawalHistoryTable";
import WithdrawalsStatistics from "./WithdrawalsStatistics";
import useDashboard from "@/hooks/useDashboard";
import ChartLineWithdrawals from "@/components/organisms/dashboard/ChartLineWithdrawals";

export default function WithdrawalsDashboard() {
  const {
    withdrawalStatuses,
    withdrawalStatusesLoading,
    withdrawalsStats,
    withdrawalsPagination,
  } = useDashboard();
  return (
    <div className="space-y-8 animate-fade-in">
      <WithdrawalsStatistics
        loading={withdrawalStatusesLoading}
        withdrawalStatuses={withdrawalStatuses}
      />
      <ChartLineWithdrawals
        total={withdrawalsPagination?.totalItems}
        data={withdrawalsStats}
      />
      <WithdrawalHistoryTable />
    </div>
  );
}
