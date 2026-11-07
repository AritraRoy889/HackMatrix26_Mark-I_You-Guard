import { AlertNotification } from '../types/api.types';

export const notificationService = {
  requestPermission: async (): Promise<NotificationPermission> => {
    if ('Notification' in window) {
      return await Notification.requestPermission();
    }
    return 'denied';
  },

  sendBrowserNotification: (title: string, options?: NotificationOptions) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        icon: '/favicon.svg',
        ...options,
      });
    }
  },
};

