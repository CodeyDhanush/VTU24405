import { useMemo, useState } from 'react';
import { useNotificationContext } from '../hooks/useNotificationContext';
import { sortByPriorityAndTimestamp } from '../utils/sorting';

const TOP_N_OPTIONS = [5, 10, 15, 20];
const DEFAULT_TOP_N = 10;

export const usePriorityNotifications = () => {
  const { notifications, loading, error, refreshNotifications, isEmpty } =
    useNotificationContext();

  const [topN, setTopN] = useState(DEFAULT_TOP_N);

  const priorityNotifications = useMemo(() => {
    const sorted = sortByPriorityAndTimestamp(notifications);
    return sorted.slice(0, topN);
  }, [notifications, topN]);

  return {
    notifications: priorityNotifications,
    totalCount: notifications.length,
    topN,
    topNOptions: TOP_N_OPTIONS,
    setTopN,
    loading,
    error,
    isEmpty,
    refreshNotifications,
  };
};
