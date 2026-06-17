import { getPriority } from './priority';

export const sortByPriorityAndTimestamp = (notifications) => {
  return [...notifications].sort((a, b) => {
    const priorityDiff = getPriority(b.Type) - getPriority(a.Type);
    if (priorityDiff !== 0) return priorityDiff;
    return new Date(b.Timestamp) - new Date(a.Timestamp);
  });
};

export const sortByTimestamp = (notifications, order = 'desc') => {
  return [...notifications].sort((a, b) => {
    const diff = new Date(a.Timestamp) - new Date(b.Timestamp);
    return order === 'asc' ? diff : -diff;
  });
};
