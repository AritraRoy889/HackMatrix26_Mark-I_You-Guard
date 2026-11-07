export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  timestamp: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface WatchlistItem {
  id: string;
  domain: string;
  status: 'healthy' | 'warning' | 'compromised' | 'offline';
  lastScanDate: string;
  lastRiskScore: number;
  sslDaysRemaining: number;
  autoScanFrequency: 'hourly' | 'daily' | 'weekly';
  alertEmail: boolean;
  tags: string[];
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'danger' | 'critical';
  timestamp: string;
  read: boolean;
  targetDomain?: string;
  link?: string;
}
