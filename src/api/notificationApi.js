import axios from 'axios';
import { setupApiLogger } from '../middleware/apiLogger';
import { isValidNotificationType } from '../utils/priority';

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  'http://4.224.186.213/evaluation-service';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const authToken = import.meta.env.VITE_API_AUTH_TOKEN;
if (authToken) {
  apiClient.defaults.headers.common.Authorization = `Bearer ${authToken}`;
}

setupApiLogger(apiClient);

const normalizeNotification = (item, index) => {
  if (!item || typeof item !== 'object') {
    throw new Error(`Invalid notification at index ${index}`);
  }

  const ID = item.ID ?? item.id ?? `unknown-${index}`;
  const Type = item.Type ?? item.type;
  const Message = item.Message ?? item.message ?? '';
  const Timestamp = item.Timestamp ?? item.timestamp;

  if (!Type || !Message || !Timestamp) {
    throw new Error(`Notification at index ${index} is missing required fields`);
  }

  if (!isValidNotificationType(Type)) {
    throw new Error(`Notification at index ${index} has invalid type: ${Type}`);
  }

  const parsedDate = new Date(Timestamp);
  if (Number.isNaN(parsedDate.getTime())) {
    throw new Error(`Notification at index ${index} has invalid timestamp`);
  }

  return { ID: String(ID), Type, Message: String(Message), Timestamp };
};

const extractNotificationsArray = (data) => {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.notifications)) return data.notifications;
  if (data && Array.isArray(data.data)) return data.data;
  throw new Error('API response does not contain a valid notifications array');
};

export const fetchNotifications = async () => {
  const response = await apiClient.get('/notifications');
  const rawNotifications = extractNotificationsArray(response.data);

  if (rawNotifications.length === 0) {
    return [];
  }

  return rawNotifications.map((item, index) => normalizeNotification(item, index));
};

export const getApiErrorMessage = (error) => {
  if (!error) return 'An unknown error occurred';

  if (error.response) {
    const status = error.response.status;
    const serverMessage = error.response.data?.message;

    if (status === 401) {
      return serverMessage || 'Authorization required. Please configure VITE_API_AUTH_TOKEN.';
    }
    if (status === 403) {
      return serverMessage || 'Access denied. Invalid or expired credentials.';
    }
    if (status === 404) {
      return 'Notifications endpoint not found.';
    }
    if (status >= 500) {
      return serverMessage || 'Server error. Please try again later.';
    }
    return serverMessage || `Request failed with status ${status}`;
  }

  if (error.request) {
    return 'Network error. Unable to reach the server. Check your connection.';
  }

  return error.message || 'An unexpected error occurred';
};

export default apiClient;
