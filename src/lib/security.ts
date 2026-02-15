// Security configuration and utilities
import { FORM_LIMITS } from './constants';
import type { SecurityConfig, SecurityHeaders, CSPConfig } from './types';

// Security constants
export const SECURITY_CONFIG: SecurityConfig = {
  // Rate limiting
  RATE_LIMIT_WINDOW: 15 * 60 * 1000, // 15 minutes
  MAX_REQUESTS_PER_WINDOW: 3,
  MAX_REQUESTS_PER_IP: 100,
  
  // Input validation
  MAX_INPUT_LENGTH: 10000,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  
  // Session security
  SESSION_TIMEOUT: 30 * 60 * 1000, // 30 minutes
  CSRF_TOKEN_LENGTH: 32,
  
  // Content Security Policy
  CSP_NONCE_LENGTH: 16,
  
  // Password requirements (if needed in future)
  MIN_PASSWORD_LENGTH: 12,
  MAX_PASSWORD_LENGTH: 128,
  
  // API security
  API_TIMEOUT: 10000, // 10 seconds
  MAX_RETRIES: 3,
} as const;

// XSS Protection patterns
export const XSS_PATTERNS = {
  SCRIPT_TAGS: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
  JAVASCRIPT_PROTOCOL: /javascript:/gi,
  ON_EVENTS: /on\w+\s*=/gi,
  DATA_PROTOCOL: /data:(?!image\/)/gi,
  VBSCRIPT: /vbscript:/gi,
  IFRAME: /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
  OBJECT: /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
  EMBED: /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
  FORM: /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,
  INPUT: /<input\b[^<]*(?:(?!<\/input>)<[^<]*)*<\/input>/gi,
  META_REFRESH: /<meta\s+http-equiv\s*=\s*["']refresh["']/gi,
} as const;

// SQL Injection patterns (for future database operations)
export const SQL_INJECTION_PATTERNS = {
  UNION: /union\s+select/gi,
  DROP: /drop\s+table/gi,
  DELETE: /delete\s+from/gi,
  INSERT: /insert\s+into/gi,
  UPDATE: /update\s+set/gi,
  SELECT: /select\s+.*\s+from/gi,
  OR_1_1: /or\s+1\s*=\s*1/gi,
  AND_1_1: /and\s+1\s*=\s*1/gi,
  SEMICOLON: /;/g,
  COMMENT: /--/g,
  QUOTES: /['"]/g,
} as const;

// Input sanitization functions
export function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  // Remove null bytes
  let sanitized = input.replace(/\0/g, '');
  
  // Normalize unicode
  sanitized = sanitized.normalize('NFC');
  
  // Remove control characters except newlines and tabs
  sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Trim whitespace
  sanitized = sanitized.trim();
  
  // Limit length
  sanitized = sanitized.substring(0, SECURITY_CONFIG.MAX_INPUT_LENGTH);
  
  return sanitized;
}

// XSS protection
export function sanitizeForXSS(input: string): string {
  if (typeof input !== 'string') return '';
  
  let sanitized = sanitizeInput(input);
  
  // Remove dangerous patterns
  Object.values(XSS_PATTERNS).forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  // HTML encode special characters
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  return sanitized;
}

// Disposable email domains (common ones for spam prevention)
const DISPOSABLE_EMAIL_DOMAINS = new Set([
  '10minutemail.com', 'tempmail.org', 'guerrillamail.com', 'mailinator.com',
  'temp-mail.org', 'throwaway.email', 'getnada.com', 'maildrop.cc',
  'yopmail.com', 'sharklasers.com', 'guerrillamailblock.com', 'pokemail.net',
  'spam4.me', 'bccto.me', 'chacuo.net', 'dispostable.com', 'mailnesia.com',
  'mailcatch.com', 'inboxalias.com', 'mailmetrash.com', 'trashmail.net',
  'trashmail.com', 'mytrashmail.com', 'jetable.org', 'mailin8r.com',
  'spamgourmet.com', 'spam.la', 'binkmail.com', 'bobmail.info', 'chammy.info',
  'devnullmail.com', 'letthemeatspam.com', 'mailinater.com', 'mailinator2.com',
  'notmailinator.com', 'reallymymail.com', 'sogetthis.com', 'spamhereplease.com',
  'superrito.com', 'thisisnotmyrealemail.com', 'tradermail.info', 'veryrealemail.com',
  'wegwerfmail.de', 'wegwerfmail.net', 'wegwerfmail.org', 'wegwerpmailadres.nl',
  'wegwerpmailadres.nl', 'wegwerpmailadres.nl', 'wegwerpmailadres.nl'
]);

// Common email typos for better UX
const EMAIL_TYPO_SUGGESTIONS: Record<string, string> = {
  'gmial.com': 'gmail.com',
  'gmail.co': 'gmail.com',
  'gmail.cm': 'gmail.com',
  'yahooo.com': 'yahoo.com',
  'yahoo.co': 'yahoo.com',
  'hotmial.com': 'hotmail.com',
  'hotmail.co': 'hotmail.com',
  'outlok.com': 'outlook.com',
  'outlook.co': 'outlook.com'
};

// Validate email format with additional security checks
export function validateEmail(email: string): boolean {
  if (typeof email !== 'string') return false;
  
  const sanitized = sanitizeInput(email);
  
  // Check length
  if (sanitized.length > FORM_LIMITS.EMAIL_MAX) return false;
  
  // Check for dangerous characters
  if (XSS_PATTERNS.SCRIPT_TAGS.test(sanitized)) return false;
  if (XSS_PATTERNS.JAVASCRIPT_PROTOCOL.test(sanitized)) return false;
  
  // Standard email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  if (!emailRegex.test(sanitized)) return false;
  
  // Extract domain
  const domain = sanitized.split('@')[1]?.toLowerCase();
  if (!domain) return false;
  
  // Check against disposable email domains
  if (DISPOSABLE_EMAIL_DOMAINS.has(domain)) return false;
  
  return true;
}

// Get email typo suggestion for better UX
export function getEmailTypoSuggestion(email: string): string | null {
  if (typeof email !== 'string') return null;
  
  const domain = email.split('@')[1]?.toLowerCase();
  if (!domain) return null;
  
  return EMAIL_TYPO_SUGGESTIONS[domain] || null;
}

// Validate phone number with security checks
export function validatePhone(phone: string): boolean {
  if (typeof phone !== 'string') return false;
  
  const sanitized = sanitizeInput(phone);
  
  // Check for dangerous characters
  if (XSS_PATTERNS.SCRIPT_TAGS.test(sanitized)) return false;
  if (XSS_PATTERNS.JAVASCRIPT_PROTOCOL.test(sanitized)) return false;
  
  // Phone regex (international format)
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
  const cleanPhone = sanitized.replace(/[\s\-\(\)]/g, '');
  
  return phoneRegex.test(cleanPhone);
}

// Generate secure random string
export function generateSecureToken(length: number = SECURITY_CONFIG.CSRF_TOKEN_LENGTH): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  
  if (typeof window !== 'undefined' && window.crypto && window.crypto.getRandomValues) {
    // Use crypto.getRandomValues if available
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      result += chars[array[i] % chars.length];
    }
  } else {
    // Fallback to Math.random (less secure but better than nothing)
    for (let i = 0; i < length; i++) {
      result += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  
  return result;
}

// Generate CSP nonce
export function generateCSPNonce(): string {
  return generateSecureToken(SECURITY_CONFIG.CSP_NONCE_LENGTH);
}

// Validate URL for security
export function validateUrl(url: string): boolean {
  if (typeof url !== 'string') return false;
  
  try {
    const parsed = new URL(url);
    
    // Only allow http and https protocols
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return false;
    }
    
    // Check for dangerous protocols in the URL
    if (XSS_PATTERNS.JAVASCRIPT_PROTOCOL.test(url)) return false;
    if (XSS_PATTERNS.DATA_PROTOCOL.test(url)) return false;
    if (XSS_PATTERNS.VBSCRIPT.test(url)) return false;
    
    return true;
  } catch {
    return false;
  }
}

// Content Security Policy configuration
export const CSP_CONFIG: CSPConfig = {
  'default-src': ["'self'"],
  'script-src': [
    "'self'",
    "'unsafe-inline'", // Note: This should be removed in production with nonces
    'https://fonts.googleapis.com',
    'https://www.googletagmanager.com',
    'https://assets.calendly.com',
    'https://js.stripe.com',
  ],
  'style-src': [
    "'self'",
    "'unsafe-inline'", // Note: This should be removed in production with nonces
    'https://fonts.googleapis.com',
  ],
  'img-src': [
    "'self'",
    'data:',
    'https:',
  ],
  'font-src': [
    "'self'",
    'https://fonts.gstatic.com',
  ],
  'connect-src': [
    "'self'",
    'https://api.resend.com',
    'https://www.google-analytics.com',
    'https://analytics.google.com',
    'https://calendly.com',
    'https://api.stripe.com',
  ],
  'frame-src': [
    "'self'",
    'https://calendly.com',
    'https://checkout.stripe.com',
    'https://js.stripe.com',
  ],
  'frame-ancestors': ["'none'"],
  'base-uri': ["'self'"],
  'form-action': ["'self'", 'https://b15138b6.sibforms.com', 'https://sibforms.com'],
  'object-src': ["'none'"],
  'media-src': ["'self'"],
  'worker-src': ["'self'"],
  'manifest-src': ["'self'"],
  'upgrade-insecure-requests': [],
} as const;

// Generate CSP header string
export function generateCSPHeader(nonce?: string): string {
  const policies = Object.entries(CSP_CONFIG).map(([directive, sources]) => {
    if (sources.length === 0) {
      return directive;
    }
    
    let sourceList = sources.join(' ');
    
    // Add nonce if provided
    if (nonce && ['script-src', 'style-src'].includes(directive)) {
      sourceList += ` 'nonce-${nonce}'`;
    }
    
    return `${directive} ${sourceList}`;
  });
  
  return policies.join('; ');
}

// Security headers configuration
export const SECURITY_HEADERS: SecurityHeaders = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Embedder-Policy': 'unsafe-none',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
} as const;
