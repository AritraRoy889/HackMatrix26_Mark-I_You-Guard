import { create } from 'zustand';
import { AlertNotification, WatchlistItem } from '../types/api.types';

interface UiStoreState {
  isSidebarCollapsed: boolean;
  isMobileNavOpen: boolean;
  theme: 'dark' | 'light';
  notifications: AlertNotification[];
  unreadAlertCount: number;
  watchlist: WatchlistItem[];

  // Modals
  isExportModalOpen: boolean;
  isSubmitReportModalOpen: boolean;
  isAddDomainModalOpen: boolean;

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  addNotification: (notif: Omit<AlertNotification, 'id' | 'timestamp' | 'read'>) => void;

  // Watchlist actions
  addToWatchlist: (item: Omit<WatchlistItem, 'id' | 'lastScanDate' | 'lastRiskScore' | 'sslDaysRemaining'>) => void;
  removeFromWatchlist: (id: string) => void;

  // Modal actions
  setExportModalOpen: (open: boolean) => void;
  setSubmitReportModalOpen: (open: boolean) => void;
  setAddDomainModalOpen: (open: boolean) => void;
}

const DEFAULT_NOTIFICATIONS: AlertNotification[] = [
  {
    id: 'notif-1',
    title: 'Phishing Target Detected',
    message: 'New deceptive phishing domain imitating Chase Bank identified.',
    severity: 'critical',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    read: false,
    targetDomain: 'accounts-verification.xyz',
    link: '/scanner/results',
  },
  {
    id: 'notif-2',
    title: 'Watchlist Certificate Expiring',
    message: 'SSL Certificate for monitoring node api.internal-auth.io expires in 6 days.',
    severity: 'warning',
    timestamp: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    read: false,
    targetDomain: 'api.internal-auth.io',
    link: '/monitoring/watchlist',
  },
  {
    id: 'notif-3',
    title: 'New Zero-Day IOC Published',
    message: 'CVE-2024-3400 PAN-OS exploit indicators loaded into active filter.',
    severity: 'info',
    timestamp: new Date(Date.now() - 1000 * 60 * 240).toISOString(),
    read: true,
    link: '/intelligence/threats',
  },
];

const DEFAULT_WATCHLIST: WatchlistItem[] = [
  {
    id: 'watch-1',
    domain: 'api.production-gateway.com',
    status: 'healthy',
    lastScanDate: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    lastRiskScore: 0,
    sslDaysRemaining: 184,
    autoScanFrequency: 'hourly',
    alertEmail: true,
    tags: ['Core API', 'Production', 'PCI-DSS'],
  },
  {
    id: 'watch-2',
    domain: 'auth.client-portal.net',
    status: 'warning',
    lastScanDate: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    lastRiskScore: 38,
    sslDaysRemaining: 14,
    autoScanFrequency: 'daily',
    alertEmail: true,
    tags: ['OAuth', 'Expiring SSL'],
  },
  {
    id: 'watch-3',
    domain: 'storage.cdn-cloudnodes.org',
    status: 'healthy',
    lastScanDate: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    lastRiskScore: 5,
    sslDaysRemaining: 289,
    autoScanFrequency: 'weekly',
    alertEmail: false,
    tags: ['CDN', 'Static Assets'],
  },
];

export const useUiStore = create<UiStoreState>((set, get) => {
  return {
    isSidebarCollapsed: false,
    isMobileNavOpen: false,
    theme: 'dark',
    notifications: DEFAULT_NOTIFICATIONS,
    unreadAlertCount: DEFAULT_NOTIFICATIONS.filter((n) => !n.read).length,
    watchlist: DEFAULT_WATCHLIST,

    isExportModalOpen: false,
    isSubmitReportModalOpen: false,
    isAddDomainModalOpen: false,

    toggleSidebar: () => set((state) => ({ isSidebarCollapsed: !state.isSidebarCollapsed })),
    setSidebarCollapsed: (collapsed) => set({ isSidebarCollapsed: collapsed }),
    setMobileNavOpen: (open) => set({ isMobileNavOpen: open }),
    setTheme: (theme) => {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      set({ theme });
    },

    markNotificationAsRead: (id) => {
      const updated = get().notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
      set({
        notifications: updated,
        unreadAlertCount: updated.filter((n) => !n.read).length,
      });
    },

    markAllNotificationsAsRead: () => {
      const updated = get().notifications.map((n) => ({ ...n, read: true }));
      set({
        notifications: updated,
        unreadAlertCount: 0,
      });
    },

    addNotification: (notif) => {
      const newNotif: AlertNotification = {
        ...notif,
        id: `notif-${Date.now()}`,
        timestamp: new Date().toISOString(),
        read: false,
      };
      const updated = [newNotif, ...get().notifications];
      set({
        notifications: updated,
        unreadAlertCount: updated.filter((n) => !n.read).length,
      });
    },

    addToWatchlist: (item) => {
      const newItem: WatchlistItem = {
        ...item,
        id: `watch-${Date.now()}`,
        lastScanDate: new Date().toISOString(),
        lastRiskScore: Math.floor(Math.random() * 15),
        sslDaysRemaining: 90,
      };
      set({ watchlist: [newItem, ...get().watchlist] });
    },

    removeFromWatchlist: (id) => {
      set({ watchlist: get().watchlist.filter((w) => w.id !== id) });
    },

    setExportModalOpen: (open) => set({ isExportModalOpen: open }),
    setSubmitReportModalOpen: (open) => set({ isSubmitReportModalOpen: open }),
    setAddDomainModalOpen: (open) => set({ isAddDomainModalOpen: open }),
  };
});
