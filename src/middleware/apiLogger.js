import { logger } from '../services/logger';

export const setupApiLogger = (axiosInstance) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      config.metadata = { startTime: Date.now() };
      logger.info('API Request', {
        url: config.url,
        method: (config.method || 'GET').toUpperCase(),
        baseURL: config.baseURL,
      });
      return config;
    },
    (error) => {
      logger.error('API Request Error', {
        message: error.message,
        url: error.config?.url,
        method: error.config?.method?.toUpperCase(),
      });
      return Promise.reject(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      const duration = Date.now() - (response.config.metadata?.startTime || Date.now());
      logger.info('API Response', {
        url: response.config.url,
        method: (response.config.method || 'GET').toUpperCase(),
        status: response.status,
        responseTime: `${duration}ms`,
      });
      return response;
    },
    (error) => {
      const config = error.config || {};
      const duration = Date.now() - (config.metadata?.startTime || Date.now());

      if (error.response) {
        logger.error('API Response Error', {
          url: config.url,
          method: (config.method || 'GET').toUpperCase(),
          status: error.response.status,
          responseTime: `${duration}ms`,
          message: error.response.data?.message || error.message,
        });
      } else if (error.request) {
        logger.error('API Network Error', {
          url: config.url,
          method: (config.method || 'GET').toUpperCase(),
          responseTime: `${duration}ms`,
          message: 'No response received from server',
        });
      } else {
        logger.error('API Error', {
          message: error.message,
        });
      }

      return Promise.reject(error);
    }
  );

  return axiosInstance;
};
