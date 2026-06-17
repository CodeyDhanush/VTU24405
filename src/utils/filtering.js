export const filterByType = (notifications, type) => {
  if (!type || type === 'All') return notifications;
  return notifications.filter((notification) => notification.Type === type);
};

export const filterBySearch = (notifications, searchTerm) => {
  const trimmed = searchTerm?.trim();
  if (!trimmed) return notifications;

  const term = trimmed.toLowerCase();
  return notifications.filter((notification) =>
    notification.Message?.toLowerCase().includes(term)
  );
};

export const paginate = (items, page, limit) => {
  const safePage = Math.max(1, page);
  const safeLimit = Math.max(1, limit);
  const start = (safePage - 1) * safeLimit;
  return items.slice(start, start + safeLimit);
};

export const getTotalPages = (totalItems, limit) => {
  const safeLimit = Math.max(1, limit);
  return Math.max(1, Math.ceil(totalItems / safeLimit));
};
