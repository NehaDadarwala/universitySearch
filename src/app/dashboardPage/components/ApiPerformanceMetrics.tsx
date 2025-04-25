import { ApiPerformanceMetrics } from "@/app/utils/ApiPerformanceMetrics ";

const ApiPerformanceDisplay = ({ metrics } : {metrics : ApiPerformanceMetrics})  => {
    return (
      <div className="p-4 border rounded max-w-md">
        <div>
          <b>Last Response Time:</b> {metrics.lastResponseTime ?? "--"} ms
        </div>
        <div>
          <b>Last Status:</b> {metrics.lastStatus ?? "--"}
        </div>
        <div>
          <b>Total Calls:</b> {metrics.callCount}
        </div>
        <div>
          <b>Error Rate:</b>{" "}
          {metrics.callCount > 0
            ? ((metrics.errorCount / metrics.callCount) * 100).toFixed(1)
            : 0}
          %
        </div>
        <div className="mt-4">
          <b>Last 10 Calls:</b>
          <ul className="text-sm mt-2">
            {metrics.history.map((h, i) => (
              <li key={i}>
                [{h.time}] Status: {h.status}, Response: {h.responseTime} ms
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
  
  export default ApiPerformanceDisplay;
  