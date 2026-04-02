import React, { forwardRef, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { sanitizeInput, sanitizeForXSS } from '@/lib/security';

interface SecureInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  sanitizeMode?: 'basic' | 'xss' | 'none';
  maxLength?: number;
}

const SecureInput = forwardRef<HTMLInputElement, SecureInputProps>(
  ({ className, type, sanitizeMode = 'basic', maxLength = 10000, onChange, ...props }, ref) => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (sanitizeMode === 'none') {
        onChange?.(e);
        return;
      }

      const originalValue = e.target.value;
      let sanitizedValue = originalValue;

      if (sanitizeMode === 'basic') {
        sanitizedValue = sanitizeInput(originalValue);
      } else if (sanitizeMode === 'xss') {
        sanitizedValue = sanitizeForXSS(originalValue);
      }

      // Limit length
      if (sanitizedValue.length > maxLength) {
        sanitizedValue = sanitizedValue.substring(0, maxLength);
      }

      // Only call onChange if the value actually changed
      if (sanitizedValue !== originalValue) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: sanitizedValue,
          },
        };
        onChange?.(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      } else {
        onChange?.(e);
      }
    }, [onChange, sanitizeMode, maxLength]);

    return (
      <input
        type={type}
        className={cn(
          "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={handleChange}
        maxLength={maxLength}
        {...props}
      />
    );
  }
);

SecureInput.displayName = "SecureInput";

interface SecureTextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  sanitizeMode?: 'basic' | 'xss' | 'none';
  maxLength?: number;
}

const SecureTextarea = forwardRef<HTMLTextAreaElement, SecureTextareaProps>(
  ({ className, sanitizeMode = 'basic', maxLength = 10000, onChange, ...props }, ref) => {
    const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (sanitizeMode === 'none') {
        onChange?.(e);
        return;
      }

      const originalValue = e.target.value;
      let sanitizedValue = originalValue;

      if (sanitizeMode === 'basic') {
        sanitizedValue = sanitizeInput(originalValue);
      } else if (sanitizeMode === 'xss') {
        sanitizedValue = sanitizeForXSS(originalValue);
      }

      // Limit length
      if (sanitizedValue.length > maxLength) {
        sanitizedValue = sanitizedValue.substring(0, maxLength);
      }

      // Only call onChange if the value actually changed
      if (sanitizedValue !== originalValue) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: sanitizedValue,
          },
        };
        onChange?.(syntheticEvent as React.ChangeEvent<HTMLTextAreaElement>);
      } else {
        onChange?.(e);
      }
    }, [onChange, sanitizeMode, maxLength]);

    return (
      <textarea
        className={cn(
          "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        onChange={handleChange}
        maxLength={maxLength}
        {...props}
      />
    );
  }
);

SecureTextarea.displayName = "SecureTextarea";

export { SecureInput, SecureTextarea };
