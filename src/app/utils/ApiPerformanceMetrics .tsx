export interface ApiCallHistoryEntry {
    responseTime: number;
    status: number | string;
    time: string;
  }
  
  export interface ApiPerformanceMetrics {
    lastResponseTime: number | null;
    lastStatus: number | string | null;
    callCount: number;
    errorCount: number;
    history: ApiCallHistoryEntry[];
  }
  