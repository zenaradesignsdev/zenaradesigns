// Centralized error handling utilities

export class AppError extends Error {
  public code: string;
  public details?: any;
  public timestamp: number;

  constructor(code: string, message: string, details?: any) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.details = details;
    this.timestamp = Date.now();
  }
}

export const ERROR_CODES = {
  NETWORK_ERROR: 'NETWORK_ERROR',
  VALIDATION_ERROR: 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR: 'AUTHENTICATION_ERROR',
  PERMISSION_ERROR: 'PERMISSION_ERROR',
  NOT_FOUND_ERROR: 'NOT_FOUND_ERROR',
  SERVER_ERROR: 'SERVER_ERROR',
  UNKNOWN_ERROR: 'UNKNOWN_ERROR',
} as const;

export function createError(code: string, message: string, details?: any): AppError {
  return new AppError(code, message, details);
}

export function handleError(error: unknown): AppError {
  if (error instanceof AppError) {
    return error;
  }

  if (error instanceof Error) {
    return new AppError(ERROR_CODES.UNKNOWN_ERROR, error.message, { originalError: error });
  }

  return new AppError(ERROR_CODES.UNKNOWN_ERROR, 'An unknown error occurred', { originalError: error });
}

export function logError(error: AppError, context?: string): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[${context || 'App'}] Error:`, {
      code: error.code,
      message: error.message,
      details: error.details,
      timestamp: new Date(error.timestamp).toISOString(),
    });
  }
}

export function isNetworkError(error: unknown): boolean {
  return error instanceof AppError && error.code === ERROR_CODES.NETWORK_ERROR;
}

export function isValidationError(error: unknown): boolean {
  return error instanceof AppError && error.code === ERROR_CODES.VALIDATION_ERROR;
}
