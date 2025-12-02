import ConversionsOverview from '../atoms/ConversionsOverview';
import ScenarioPerformance from '../atoms/ScenarioPerformance';

export default function ScenarioPerformanceAnalytics() {
  return (
    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
      <ScenarioPerformance />
      <ConversionsOverview />
    </div>
  );
}
