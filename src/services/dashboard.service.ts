import {
  MOCK_DASHBOARD_STATS,
  MOCK_THREAT_DISTRIBUTION,
  MOCK_REALTIME_TICKER,
  DashboardStats,
} from '../mocks/mockDashboard';

export const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    return MOCK_DASHBOARD_STATS;
  },

  getThreatDistribution: async () => {
    return MOCK_THREAT_DISTRIBUTION;
  },

  getRealtimeTicker: async () => {
    return MOCK_REALTIME_TICKER;
  },
};
