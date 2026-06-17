export const PRIORITY_MAP = {
  Placement: 3,
  Result: 2,
  Event: 1,
};

export const TYPE_COLORS = {
  Placement: 'success',
  Result: 'primary',
  Event: 'warning',
};

export const NOTIFICATION_TYPES = ['Placement', 'Result', 'Event'];

export const getPriority = (type) => PRIORITY_MAP[type] ?? 0;

export const isValidNotificationType = (type) =>
  NOTIFICATION_TYPES.includes(type);
