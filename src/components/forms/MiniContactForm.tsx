'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { SecureInput, SecureTextarea } from '@/components/ui/secure-input';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail, contactFormSchema } from '@/lib/email-service';
import type { ContactFormData } from '@/types';

interface MiniContactFormProps {
  /** Unique id for this instance — used to namespace field ids when the form appears more than once on a page. */
  id: string;
  /** Sent as the projectType field so replies land in the right context — not shown to the visitor. */
  projectType: string;
  heading: string;
  subheading?: string;
  messagePlaceholder?: string;
}

/**
 * A short-form quote request: name, email, optional phone, and a message.
 * Submits through the same validated /api/send-email pipeline as the full
 * /contact form, filling budget/timeline with a placeholder since this form
 * skips those fields to stay low-friction.
 */
const MiniContactForm = ({ id, projectType, heading, subheading, messagePlaceholder }: MiniContactFormProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    const payload: ContactFormData = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || undefined,
      projectType,
      budget: 'Not specified — quick quote request',
      timeline: 'Not specified — quick quote request',
      message: formData.message,
    };

    try {
      const validatedData = contactFormSchema.parse(payload) as ContactFormData;
      const result = await sendContactEmail(validatedData);

      if (result.success) {
        toast({ title: 'Message sent', description: result.message });
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        toast({ title: 'Failed to send', description: result.message, variant: 'destructive' });
      }
    } catch (error) {
      if (error instanceof Error && error.name === 'ZodError') {
        const zodError = error as { errors?: Array<{ path?: string[]; message: string }> };
        const fieldErrors: Record<string, string> = {};
        zodError.errors?.forEach((err) => {
          if (err.path?.[0]) fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
        toast({ title: 'Please check your form', description: 'Some fields need to be corrected.', variant: 'destructive' });
      } else {
        toast({ title: 'Something went wrong', description: 'Please try again later.', variant: 'destructive' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-3xl mx-auto">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50" />
      <div className="relative z-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-3 leading-[1.1] tracking-[-0.04em] text-center">
          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">
            {heading}
          </span>
        </h2>
        {subheading && (
          <p className="text-white/60 text-sm sm:text-base text-center mb-8 max-w-xl mx-auto font-light leading-relaxed">
            {subheading}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" role="form" aria-label={heading}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor={`${id}-name`} className="text-white/70 font-light text-sm mb-1.5 block">Name *</Label>
              <SecureInput
                id={`${id}-name`}
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                required
                autoComplete="name"
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/10 ${errors.name ? 'border-red-400/60' : ''}`}
                sanitizeMode="none"
                maxLength={100}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? `${id}-name-error` : undefined}
              />
              {errors.name && <p id={`${id}-name-error`} className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>}
            </div>
            <div>
              <Label htmlFor={`${id}-email`} className="text-white/70 font-light text-sm mb-1.5 block">Email *</Label>
              <SecureInput
                id={`${id}-email`}
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                required
                autoComplete="email"
                className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/10 ${errors.email ? 'border-red-400/60' : ''}`}
                sanitizeMode="basic"
                maxLength={254}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? `${id}-email-error` : undefined}
              />
              {errors.email && <p id={`${id}-email-error`} className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor={`${id}-phone`} className="text-white/70 font-light text-sm mb-1.5 block">Phone (optional)</Label>
            <SecureInput
              id={`${id}-phone`}
              type="tel"
              value={formData.phone}
              onChange={(e) => handleChange('phone', e.target.value)}
              autoComplete="tel"
              className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/10"
              sanitizeMode="xss"
              maxLength={20}
            />
          </div>

          <div>
            <Label htmlFor={`${id}-message`} className="text-white/70 font-light text-sm mb-1.5 block">Tell us about your project *</Label>
            <SecureTextarea
              id={`${id}-message`}
              value={formData.message}
              onChange={(e) => handleChange('message', e.target.value)}
              required
              rows={4}
              placeholder={messagePlaceholder}
              className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/10 ${errors.message ? 'border-red-400/60' : ''}`}
              sanitizeMode="xss"
              maxLength={2000}
              aria-invalid={!!errors.message}
              aria-describedby={errors.message ? `${id}-message-error` : undefined}
            />
            {errors.message && <p id={`${id}-message-error`} className="text-red-400 text-xs mt-1" role="alert">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="relative overflow-hidden w-full bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm font-semibold disabled:opacity-100 disabled:cursor-not-allowed min-h-[44px] group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
            {isSubmitting ? (
              <span className="flex items-center justify-center relative z-10">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                Sending...
              </span>
            ) : (
              <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                Get My Free Quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </span>
            )}
          </Button>
          <p className="text-white/30 text-xs text-center font-light">
            We reply within 24–48 hours. No spam, ever.
          </p>
        </form>
      </div>
    </div>
  );
};

export default MiniContactForm;
