'use client'
import WithdrawalHistoryTable from '@/components/organisms/dashboard/withdrawals/WithdrawalHistoryTable'
import WithdrawalsStatistics from './WithdrawalsStatistics'
import useDashboard from '@/hooks/useDashboard'
import ChartLineWithdrawals from '@/components/organisms/dashboard/ChartLineWithdrawals'
import FiltrationOperation from './FiltrationOperation'

export default function WithdrawalsDashboard() {
  const {
    withdrawals,
    withdrawalStatuses,
    withdrawalStatusesLoading,
    withdrawalsStats,
    setWithdrawalStatus,
    withdrawalStatus,
    ibanFilter,
    setIbanFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    refetchWithdrawals,
    withdrawalsLoading,
    withdrawalsPagination,
    nextWithdrawalPage,
    prevWithdrawalPage,
    handleAcceptWithdrawal,
    handleRejectWithdrawal,
    handleCompleteWithdrawal,
    loading,
    handleAddAdminNote,
    addAdminNoteLoading,
  } = useDashboard()
  return (
    <div className="animate-fade-in space-y-8">
      <WithdrawalsStatistics
        loading={withdrawalStatusesLoading}
        withdrawalStatuses={withdrawalStatuses}
      />
      <ChartLineWithdrawals
        total={withdrawalsPagination?.totalItems}
        data={withdrawalsStats}
      />
      <FiltrationOperation
        withdrawalStatus={withdrawalStatus}
        setWithdrawalStatus={setWithdrawalStatus}
        ibanFilter={ibanFilter}
        setIbanFilter={setIbanFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        refetchWithdrawals={refetchWithdrawals}
      />
      <WithdrawalHistoryTable
        withdrawals={withdrawals}
        withdrawalsLoading={withdrawalsLoading}
        withdrawalsPagination={withdrawalsPagination}
        nextWithdrawalPage={nextWithdrawalPage}
        prevWithdrawalPage={prevWithdrawalPage}
        handleAcceptWithdrawal={handleAcceptWithdrawal}
        handleRejectWithdrawal={handleRejectWithdrawal}
        handleCompleteWithdrawal={handleCompleteWithdrawal}
        loading={loading}
        handleAddAdminNote={handleAddAdminNote}
        addAdminNoteLoading={addAdminNoteLoading}
      />
    </div>
  )
}
