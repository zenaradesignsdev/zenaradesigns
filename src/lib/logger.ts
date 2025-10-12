/**
 * Logger utility for consistent logging across the application
 * - Development: All logs are shown
 * - Production: Only errors are shown (for debugging)
 */

const isDev = process.env.NODE_ENV === 'development';

export const logger = {
  log: (...args: any[]) => isDev && console.log(...args),
  warn: (...args: any[]) => isDev && console.warn(...args),
  error: (...args: any[]) => console.error(...args), // Always log errors
  info: (...args: any[]) => isDev && console.info(...args),
  debug: (...args: any[]) => isDev && console.debug(...args)
};
