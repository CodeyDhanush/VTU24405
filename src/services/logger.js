const formatTimestamp = () => new Date().toISOString();

const formatPayload = (data) => {
  if (data === undefined) return '';
  if (typeof data === 'string') return data;
  try {
    return JSON.stringify(data, null, 2);
  } catch {
    return String(data);
  }
};

export const logger = {
  info: (message, data) => {
    const prefix = `[INFO] [${formatTimestamp()}]`;
    if (data !== undefined) {
      console.info(`${prefix} ${message}`, data);
    } else {
      console.info(`${prefix} ${message}`);
    }
  },

  warn: (message, data) => {
    const prefix = `[WARN] [${formatTimestamp()}]`;
    if (data !== undefined) {
      console.warn(`${prefix} ${message}`, data);
    } else {
      console.warn(`${prefix} ${message}`);
    }
  },

  error: (message, data) => {
    const prefix = `[ERROR] [${formatTimestamp()}]`;
    if (data !== undefined) {
      console.error(`${prefix} ${message}`, formatPayload(data));
    } else {
      console.error(`${prefix} ${message}`);
    }
  },

  debug: (message, data) => {
    if (import.meta.env.DEV) {
      const prefix = `[DEBUG] [${formatTimestamp()}]`;
      if (data !== undefined) {
        console.debug(`${prefix} ${message}`, data);
      } else {
        console.debug(`${prefix} ${message}`);
      }
    }
  },
};
