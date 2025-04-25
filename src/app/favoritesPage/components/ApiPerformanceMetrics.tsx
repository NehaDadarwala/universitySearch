import { ApiPerformanceMetrics as Metrics } from "../../utils/ApiPerformanceMetrics ";

interface ApiPerformanceDisplayProps {
  metrics: Metrics;
}

const ApiPerformanceDisplay = ({ metrics }: ApiPerformanceDisplayProps) => {
  return (
    <div className="space-y-4 p-4 border rounded-lg">
      <h2 className="text-lg font-semibold">API Performance</h2>
      <div className="space-y-2">
        <p>Last Response Time: {metrics.lastResponseTime}ms</p>
        <p>Last Status: {metrics.lastStatus}</p>
        <p>Total Calls: {metrics.callCount}</p>
        <p>Error Count: {metrics.errorCount}</p>
      </div>
      <div>
        <h3 className="font-medium mb-2">Recent History</h3>
        <div className="space-y-1">
          {metrics.history.map((entry, index) => (
            <div key={index} className="text-sm">
              {entry.time} - {entry.responseTime}ms - Status: {entry.status}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiPerformanceDisplay; 