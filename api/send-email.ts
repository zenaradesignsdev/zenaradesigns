import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

// Security headers
const SECURITY_HEADERS = {
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Cross-Origin-Embedder-Policy': 'require-corp',
  'Cross-Origin-Opener-Policy': 'same-origin',
  'Cross-Origin-Resource-Policy': 'same-origin',
};

// Rate limiting store (in production, use Redis or similar)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS = 3;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const key = ip;
  const userLimit = rateLimitStore.get(key);

  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }

  if (userLimit.count >= MAX_REQUESTS) {
    return false;
  }

  userLimit.count++;
  return true;
}

// Input sanitization
function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  
  // Remove null bytes and control characters
  let sanitized = input.replace(/\0/g, '').replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');
  
  // Normalize unicode
  sanitized = sanitized.normalize('NFC');
  
  // Trim and limit length
  sanitized = sanitized.trim().substring(0, 10000);
  
  return sanitized;
}

// XSS protection
function sanitizeForXSS(input: string): string {
  let sanitized = sanitizeInput(input);
  
  // Remove dangerous patterns
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:(?!image\/)/gi,
    /vbscript:/gi,
    /<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi,
    /<object\b[^<]*(?:(?!<\/object>)<[^<]*)*<\/object>/gi,
    /<embed\b[^<]*(?:(?!<\/embed>)<[^<]*)*<\/embed>/gi,
    /<form\b[^<]*(?:(?!<\/form>)<[^<]*)*<\/form>/gi,
    /<input\b[^<]*(?:(?!<\/input>)<[^<]*)*<\/input>/gi,
    /<meta\s+http-equiv\s*=\s*["']refresh["']/gi,
  ];
  
  dangerousPatterns.forEach(pattern => {
    sanitized = sanitized.replace(pattern, '');
  });
  
  // HTML encode
  sanitized = sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
  
  return sanitized;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set security headers
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    res.setHeader(key, value);
  });

  // Set CORS headers (more restrictive)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || 'https://zenaradesigns.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Rate limiting
  const clientIP = req.headers['x-forwarded-for'] as string || 
                   req.headers['x-real-ip'] as string || 
                   req.connection?.remoteAddress || 
                   'unknown';
  
  if (!checkRateLimit(clientIP)) {
    return res.status(429).json({ 
      error: 'Too many requests. Please try again later.',
      success: false 
    });
  }

  try {
    // Validate request body exists
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({ 
        error: 'Invalid request body',
        success: false 
      });
    }

    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      message
    } = req.body;

    // Sanitize all inputs
    const sanitizedData = {
      name: sanitizeForXSS(sanitizeInput(name || '')),
      email: sanitizeInput(email || ''),
      phone: phone ? sanitizeForXSS(sanitizeInput(phone)) : '',
      company: company ? sanitizeForXSS(sanitizeInput(company)) : '',
      projectType: sanitizeForXSS(sanitizeInput(projectType || '')),
      budget: sanitizeForXSS(sanitizeInput(budget || '')),
      timeline: sanitizeForXSS(sanitizeInput(timeline || '')),
      message: sanitizeForXSS(sanitizeInput(message || ''))
    };

    // Basic validation
    if (!sanitizedData.name || !sanitizedData.email || !sanitizedData.projectType || 
        !sanitizedData.budget || !sanitizedData.timeline || !sanitizedData.message) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        success: false 
      });
    }

    // Enhanced email validation
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(sanitizedData.email) || sanitizedData.email.length > 254) {
      return res.status(400).json({ 
        error: 'Invalid email address',
        success: false 
      });
    }

    // Validate input lengths
    if (sanitizedData.name.length < 2 || sanitizedData.name.length > 100) {
      return res.status(400).json({ 
        error: 'Name must be between 2 and 100 characters',
        success: false 
      });
    }

    if (sanitizedData.message.length < 10 || sanitizedData.message.length > 2000) {
      return res.status(400).json({ 
        error: 'Message must be between 10 and 2000 characters',
        success: false 
      });
    }

    // Send email using Resend with sanitized data
    const { data, error } = await resend.emails.send({
      from: 'Zenara Designs <noreply@mail.zenaradesigns.com>',
      to: ['zenaradesigns.team@gmail.com'],
      replyTo: sanitizedData.email,
      subject: `New Contact Form Submission from ${sanitizedData.name}`,
      html: generateEmailHTML(sanitizedData),
      text: generateEmailText(sanitizedData),
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ 
        error: 'Failed to send email',
        success: false 
      });
    }

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully! We\'ll get back to you within 24-48 hours.',
      id: data?.id
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Internal server error',
      success: false 
    });
  }
}

function generateEmailText(data: any): string {
  return `
ZENARA DESIGNS - New Contact Form Submission

CONTACT INFORMATION:
Name: ${data.name}
Email: ${data.email}
${data.phone ? `Phone: ${data.phone}` : ''}
${data.company ? `Company: ${data.company}` : ''}

PROJECT DETAILS:
Project Type: ${data.projectType}
Budget Range: ${data.budget}
Timeline: ${data.timeline}

MESSAGE:
${data.message}

---
This email was sent from the Zenara Designs contact form.
Reply directly to this email to respond to ${data.name}.
  `;
}

function generateEmailHTML(data: any): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Contact Form Submission</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f8fafc;">
      <div style="max-width: 600px; margin: 0 auto; background: #ffffff; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #7c3aed 100%); padding: 30px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: bold; letter-spacing: 1px;">
            ZENARA DESIGNS
          </h1>
          <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 16px;">
            New Contact Form Submission
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 30px;">
          <!-- Contact Information -->
          <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #06b6d4;">
            <h2 style="color: #1e293b; margin-top: 0; font-size: 20px; font-weight: 600; margin-bottom: 15px;">
              👤 Contact Information
            </h2>
            <div style="color: #475569; line-height: 1.6;">
              <p style="margin: 8px 0;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
              <p style="margin: 8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color: #06b6d4; text-decoration: none;">${escapeHtml(data.email)}</a></p>
              ${data.phone ? `<p style="margin: 8px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(data.phone)}" style="color: #06b6d4; text-decoration: none;">${escapeHtml(data.phone)}</a></p>` : ''}
              ${data.company ? `<p style="margin: 8px 0;"><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ''}
            </div>
          </div>

          <!-- Project Details -->
          <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #7c3aed;">
            <h2 style="color: #1e293b; margin-top: 0; font-size: 20px; font-weight: 600; margin-bottom: 15px;">
              🚀 Project Details
            </h2>
            <div style="color: #475569; line-height: 1.6;">
              <p style="margin: 8px 0;"><strong>Project Type:</strong> ${escapeHtml(data.projectType)}</p>
              <p style="margin: 8px 0;"><strong>Budget Range:</strong> ${escapeHtml(data.budget)}</p>
              <p style="margin: 8px 0;"><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>
            </div>
          </div>

          <!-- Message -->
          <div style="background: #f8fafc; padding: 25px; border-radius: 12px; margin-bottom: 25px; border-left: 4px solid #10b981;">
            <h2 style="color: #1e293b; margin-top: 0; font-size: 20px; font-weight: 600; margin-bottom: 15px;">
              💬 Message
            </h2>
            <div style="color: #475569; line-height: 1.6; white-space: pre-wrap; background: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0;">${escapeHtml(data.message)}</div>
          </div>

          <!-- Footer -->
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0;">
            <p style="color: #64748b; font-size: 14px; margin: 0;">
              This email was sent from the Zenara Designs contact form.
            </p>
            <p style="color: #64748b; font-size: 14px; margin: 5px 0 0 0;">
              Reply directly to this email to respond to ${escapeHtml(data.name)}.
            </p>
            <p style="color: #94a3b8; font-size: 12px; margin: 10px 0 0 0;">
              Zenara Designs - Digital Solutions for the Modern World
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
