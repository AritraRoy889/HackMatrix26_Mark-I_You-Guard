export interface DashboardStats
{
  totalScans: number;
  threatsBlocked: number;
  safeDomains: number;
  activeWatchlist: number;
  averageRiskScore: number;
  scansTrend: number;
  threatsTrend: number;
  globalAttacksLastHour: number;
}

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalScans: 48924,
  threatsBlocked: 14210,
  safeDomains: 34714,
  activeWatchlist: 18,
  averageRiskScore: 32,
  scansTrend: 14.8,
  threatsTrend: -3.2,
  globalAttacksLastHour: 1842,
};

export const MOCK_THREAT_DISTRIBUTION = [
  { name: 'Credential Phishing', count: 6840, percentage: 48, color: '#ef4444' },
  { name: 'Malware Delivery', count: 3420, percentage: 24, color: '#f97316' },
  { name: 'C2 Infrastructure', count: 1850, percentage: 13, color: '#eab308' },
  { name: 'Defacement / Scam', count: 1280, percentage: 9, color: '#06b6d4' },
  { name: 'Cryptojacking', count: 820, percentage: 6, color: '#a855f7' },
];

export const MOCK_REALTIME_TICKER = [
  { id: '1', target: 'login-apple-icloud-secure.app', type: 'Phishing', risk: 'critical', time: '12s ago' },
  { id: '2', target: 'cdn-static-assets-script.su', type: 'Malware Dropper', risk: 'critical', time: '35s ago' },
  { id: '3', target: 'stripe-billing-portal.top', type: 'Credential Theft', risk: 'malicious', time: '1m ago' },
  { id: '4', target: 'api.okta-recovery-auth.cc', type: 'Zero-day Phish', risk: 'critical', time: '2m ago' },
  { id: '5', target: 'microsoft-office-update365.info', type: 'Trojan Dropper', risk: 'malicious', time: '3m ago' },
  { id: '6', target: 'binance-support-verification.link', type: 'Crypto Stealer', risk: 'critical', time: '4m ago' },
];
