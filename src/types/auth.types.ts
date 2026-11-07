export type UserRole = 'admin' | 'analyst' | 'member' | 'guest';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  organization?: string;
  twoFactorEnabled: boolean;
  createdAt: string;
  lastLoginAt: string;
  preferences: {
    theme: 'dark' | 'light' | 'system';
    emailAlerts: boolean;
    criticalAlertsOnly: boolean;
    autoScanSavedDomains: boolean;
  };
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password?: string;
  rememberMe?: boolean;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  password?: string;
  organization?: string;
  agreeToTerms: boolean;
}
