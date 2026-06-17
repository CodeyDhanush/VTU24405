import { NotificationContext } from './notificationContext';
import { useNotificationProviderState } from '../hooks/useNotificationContext';

export const NotificationProvider = ({ children }) => {
  const value = useNotificationProviderState();

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};
