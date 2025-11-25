import DailyAICallsAnalytics from '@/components/molecules/DailyAICallsAnalytics'
import ScenarioPerformanceAnalytics from '@/components/molecules/ScenarioPerformanceAnalytics'
import StatictisCards from '@/components/molecules/StatictisCards'
import useSales from '@/hooks/useSales'

export default function MyStatisticsTab() {
  const { userStatisticsSales, userStatisticsSalesLoading } = useSales()
  return (
    <div className="px-0 sm:px-10">
      <StatictisCards
        userStatisticsSales={userStatisticsSales}
        loading={userStatisticsSalesLoading}
      />
      <DailyAICallsAnalytics />
      <ScenarioPerformanceAnalytics />
    </div>
  )
}
