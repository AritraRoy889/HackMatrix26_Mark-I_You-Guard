import { useUiStore } from '../store/ui.store';

export function useNotifications ()
{
  const {
    notifications,
    unreadAlertCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification,
  } = useUiStore();

  return {
    notifications,
    unreadAlertCount,
    markNotificationAsRead,
    markAllNotificationsAsRead,
    addNotification,
  };
}
