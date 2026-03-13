import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 15 * 60 * 1000;
const MAX_REQUESTS = 3;
const CLEANUP_INTERVAL = 5 * 60 * 1000;
let lastCleanup = Date.now();

function cleanupExpiredEntries() {
  const now = Date.now();
  for (const [key, value] of rateLimitStore.entries()) {
    if (now > value.resetTime) rateLimitStore.delete(key);
  }
  lastCleanup = now;
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  if (now - lastCleanup > CLEANUP_INTERVAL) cleanupExpiredEntries();

  const userLimit = rateLimitStore.get(ip);
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitStore.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (userLimit.count >= MAX_REQUESTS) return false;
  userLimit.count++;
  return true;
}

function sanitizeInput(input: string): string {
  if (typeof input !== 'string') return '';
  return input
    .replace(/\0/g, '')
    // eslint-disable-next-line no-control-regex
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .normalize('NFC')
    .trim()
    .substring(0, 10000);
}

function sanitizeForXSS(input: string): string {
  let sanitized = sanitizeInput(input);
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /data:(?!image\/)/gi,
    /vbscript:/gi,
  ];
  dangerousPatterns.forEach((p) => { sanitized = sanitized.replace(p, ''); });
  return sanitized
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const allowedOrigins = ['https://zenaradesigns.com', 'https://www.zenaradesigns.com'];

function getCorsHeaders(origin: string | null) {
  const isAllowed = origin && allowedOrigins.includes(origin);
  return {
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Origin': isAllowed ? origin! : (process.env.ALLOWED_ORIGIN || 'https://zenaradesigns.com'),
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'X-CSRF-Token, X-Requested-With, Accept, Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

export async function OPTIONS(request: NextRequest) {
  const origin = request.headers.get('origin');
  return new NextResponse(null, { status: 200, headers: getCorsHeaders(origin) });
}

export async function POST(request: NextRequest) {
  const origin = request.headers.get('origin');
  const corsHeaders = getCorsHeaders(origin);

  if (!process.env.RESEND_API_KEY || !process.env.ALLOWED_ORIGIN) {
    return NextResponse.json({ error: 'Server configuration error', success: false }, { status: 500, headers: corsHeaders });
  }

  const clientIP =
    request.headers.get('x-forwarded-for')?.split(',')[0] ||
    request.headers.get('x-real-ip') ||
    'unknown';

  if (!checkRateLimit(clientIP)) {
    return NextResponse.json(
      { error: 'Too many requests. Please try again later.', success: false },
      { status: 429, headers: corsHeaders }
    );
  }

  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid request body', success: false }, { status: 400, headers: corsHeaders });
  }

  const { name, email, phone, company, projectType, budget, timeline, message } = body as Record<string, string>;

  const sanitized = {
    name: sanitizeForXSS(sanitizeInput(name || '')),
    email: sanitizeInput(email || ''),
    phone: phone ? sanitizeForXSS(sanitizeInput(phone)) : '',
    company: company ? sanitizeForXSS(sanitizeInput(company)) : '',
    projectType: sanitizeForXSS(sanitizeInput(projectType || '')),
    budget: sanitizeForXSS(sanitizeInput(budget || '')),
    timeline: sanitizeForXSS(sanitizeInput(timeline || '')),
    message: sanitizeForXSS(sanitizeInput(message || '')),
  };

  if (!sanitized.name || !sanitized.email || !sanitized.projectType || !sanitized.budget || !sanitized.timeline || !sanitized.message) {
    return NextResponse.json({ error: 'Missing required fields', success: false }, { status: 400, headers: corsHeaders });
  }

  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  if (!emailRegex.test(sanitized.email) || sanitized.email.length > 254) {
    return NextResponse.json({ error: 'Invalid email address', success: false }, { status: 400, headers: corsHeaders });
  }

  if (sanitized.name.length < 2 || sanitized.name.length > 100) {
    return NextResponse.json({ error: 'Name must be between 2 and 100 characters', success: false }, { status: 400, headers: corsHeaders });
  }

  if (sanitized.message.length < 10 || sanitized.message.length > 2000) {
    return NextResponse.json({ error: 'Message must be between 10 and 2000 characters', success: false }, { status: 400, headers: corsHeaders });
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: 'Zenara Designs <noreply@zenaradesigns.com>',
      to: ['info@zenaradesigns.com'],
      replyTo: sanitized.email,
      subject: `New Contact Form Submission from ${sanitized.name}`,
      html: generateEmailHTML(sanitized),
      text: generateEmailText(sanitized),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email', success: false },
        { status: 500, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      { success: true, message: "Email sent successfully! We'll get back to you within 24-48 hours." },
      { status: 200, headers: corsHeaders }
    );
  } catch (err) {
    console.error('Email sending error:', err);
    return NextResponse.json({ error: 'Internal server error', success: false }, { status: 500, headers: corsHeaders });
  }
}

function generateEmailText(data: Record<string, string>): string {
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
  `.trim();
}

function generateEmailHTML(data: Record<string, string>): string {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><title>New Contact Form Submission</title></head>
<body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f8fafc;">
  <div style="max-width:600px;margin:0 auto;background:#fff;box-shadow:0 4px 6px rgba(0,0,0,0.1);">
    <div style="background:linear-gradient(135deg,#0f172a 0%,#1e293b 50%,#7c3aed 100%);padding:30px;text-align:center;">
      <h1 style="color:#fff;margin:0;font-size:28px;font-weight:bold;">ZENARA DESIGNS</h1>
      <p style="color:#cbd5e1;margin:10px 0 0 0;">New Contact Form Submission</p>
    </div>
    <div style="padding:30px;">
      <div style="background:#f8fafc;padding:25px;border-radius:12px;margin-bottom:25px;border-left:4px solid #06b6d4;">
        <h2 style="color:#1e293b;margin-top:0;font-size:20px;">👤 Contact Information</h2>
        <p style="color:#475569;margin:8px 0;"><strong>Name:</strong> ${escapeHtml(data.name)}</p>
        <p style="color:#475569;margin:8px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(data.email)}" style="color:#06b6d4;">${escapeHtml(data.email)}</a></p>
        ${data.phone ? `<p style="color:#475569;margin:8px 0;"><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ''}
        ${data.company ? `<p style="color:#475569;margin:8px 0;"><strong>Company:</strong> ${escapeHtml(data.company)}</p>` : ''}
      </div>
      <div style="background:#f8fafc;padding:25px;border-radius:12px;margin-bottom:25px;border-left:4px solid #7c3aed;">
        <h2 style="color:#1e293b;margin-top:0;font-size:20px;">🚀 Project Details</h2>
        <p style="color:#475569;margin:8px 0;"><strong>Project Type:</strong> ${escapeHtml(data.projectType)}</p>
        <p style="color:#475569;margin:8px 0;"><strong>Budget Range:</strong> ${escapeHtml(data.budget)}</p>
        <p style="color:#475569;margin:8px 0;"><strong>Timeline:</strong> ${escapeHtml(data.timeline)}</p>
      </div>
      <div style="background:#f8fafc;padding:25px;border-radius:12px;margin-bottom:25px;border-left:4px solid #10b981;">
        <h2 style="color:#1e293b;margin-top:0;font-size:20px;">💬 Message</h2>
        <div style="color:#475569;background:#fff;padding:15px;border-radius:8px;border:1px solid #e2e8f0;white-space:pre-wrap;">${escapeHtml(data.message)}</div>
      </div>
      <div style="text-align:center;margin-top:30px;padding-top:20px;border-top:1px solid #e2e8f0;">
        <p style="color:#64748b;font-size:14px;">This email was sent from the Zenara Designs contact form.</p>
        <p style="color:#64748b;font-size:14px;">Reply to respond to ${escapeHtml(data.name)}.</p>
      </div>
    </div>
  </div>
</body>
</html>`;
}
