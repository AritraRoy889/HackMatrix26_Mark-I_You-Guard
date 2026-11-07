import { LoginCredentials, RegisterCredentials, User } from '../types/auth.types';

export const authService = {
  login: async (creds: LoginCredentials): Promise<{ user: User; token: string }> => {
    await new Promise((r) => setTimeout(r, 500));
    const user: User = {
      id: 'usr-analyst-1',
      email: creds.email,
      name: creds.email.split('@')[0],
      role: 'analyst',
      twoFactorEnabled: true,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      preferences: {
        theme: 'dark',
        emailAlerts: true,
        criticalAlertsOnly: false,
        autoScanSavedDomains: true,
      },
    };
    return { user, token: 'mock-jwt-auth-token' };
  },

  register: async (creds: RegisterCredentials): Promise<{ user: User; token: string }> => {
    await new Promise((r) => setTimeout(r, 600));
    const user: User = {
      id: `usr-${Date.now()}`,
      email: creds.email,
      name: creds.name,
      role: 'member',
      organization: creds.organization,
      twoFactorEnabled: false,
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
      preferences: {
        theme: 'dark',
        emailAlerts: true,
        criticalAlertsOnly: false,
        autoScanSavedDomains: true,
      },
    };
    return { user, token: 'mock-jwt-auth-token' };
  },

  logout: async (): Promise<void> => {
    await new Promise((r) => setTimeout(r, 200));
  },
};
