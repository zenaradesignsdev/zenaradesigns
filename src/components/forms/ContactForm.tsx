'use client';

import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SecureInput, SecureTextarea } from '@/components/ui/secure-input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail, contactFormSchema, type ContactFormData } from '@/lib/email-service';

/**
 * The interactive half of /contact, split out so the surrounding page (hero,
 * contact details, "what to expect") can stay a Server Component. Only this
 * subtree needs to ship as client JS.
 */
const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: undefined,
    company: undefined,
    projectType: '',
    budget: '',
    timeline: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = contactFormSchema.parse(formData) as ContactFormData;
      const result = await sendContactEmail(validatedData);

      if (result.success) {
        toast({
          title: "Message sent successfully!",
          description: result.message,
        });
        setFormData({
          name: '',
          email: '',
          phone: undefined,
          company: undefined,
          projectType: '',
          budget: '',
          timeline: '',
          message: ''
        });
      } else {
        toast({
          title: "Failed to send message",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      if (error instanceof Error && error.name === 'ZodError') {
        const zodError = error as any;
        const fieldErrors: Record<string, string> = {};
        zodError.errors?.forEach((err: any) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message;
          }
        });
        setErrors(fieldErrors);
        toast({
          title: "Please check your form",
          description: "Some fields need to be corrected.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Something went wrong",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value === '' && (field === 'phone' || field === 'company') ? undefined : value
    }));
  };

  return (
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-cyan-500/15 shadow-2xl relative overflow-hidden">
          {/* Card glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/8 via-transparent to-purple-500/8 pointer-events-none" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />

          <div className="relative z-10">
            <h2 className="text-xl sm:text-2xl font-semibold text-white mb-6 tracking-tight">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5" role="form" aria-label="Contact form">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name" className="text-white/70 font-light text-sm mb-1.5 block">Name *</Label>
                  <SecureInput
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    required
                    autoComplete="name"
                    className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/10 ${errors.name ? 'border-red-400/60' : ''}`}
                    sanitizeMode="none"
                    maxLength={100}
                    aria-describedby={errors.name ? 'name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-red-400 text-xs mt-1" role="alert">{errors.name}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email" className="text-white/70 font-light text-sm mb-1.5 block">Email *</Label>
                  <SecureInput
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    required
                    autoComplete="email"
                    className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/10 ${errors.email ? 'border-red-400/60' : ''}`}
                    sanitizeMode="basic"
                    maxLength={254}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-red-400 text-xs mt-1" role="alert">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="phone" className="text-white/70 font-light text-sm mb-1.5 block">Phone</Label>
                  <SecureInput
                    id="phone"
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
                  <Label htmlFor="company" className="text-white/70 font-light text-sm mb-1.5 block">Company</Label>
                  <SecureInput
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    autoComplete="organization"
                    className="bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/10"
                    sanitizeMode="none"
                    maxLength={100}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="projectType" className="text-white/70 font-light text-sm mb-1.5 block">Project Type *</Label>
                <Select onValueChange={(value) => handleChange('projectType', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-cyan-400/50 focus:ring-cyan-400/10 h-11 text-base">
                    <SelectValue placeholder="What type of project?" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800/50 text-white">
                    <SelectItem value="website" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Website Design &amp; Development</SelectItem>
                    <SelectItem value="ecommerce" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">E-commerce Store</SelectItem>
                    <SelectItem value="webapp" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Web Application</SelectItem>
                    <SelectItem value="redesign" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Website Redesign</SelectItem>
                    <SelectItem value="maintenance" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Maintenance &amp; Support</SelectItem>
                    <SelectItem value="consulting" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Consulting</SelectItem>
                    <SelectItem value="other" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Other</SelectItem>
                  </SelectContent>
                </Select>
                {errors.projectType && (
                  <p className="text-red-400 text-xs mt-1">{errors.projectType}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budget" className="text-white/70 font-light text-sm mb-1.5 block">Budget Range *</Label>
                  <Select onValueChange={(value) => handleChange('budget', value)}>
                    <SelectTrigger className={`bg-white/5 border-white/10 text-white focus:border-cyan-400/50 focus:ring-cyan-400/10 h-11 text-base ${errors.budget ? 'border-red-400/60' : ''}`}>
                      <SelectValue placeholder="Select budget range" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800/50 text-white">
                      <SelectItem value="under-1k" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Under $1,000</SelectItem>
                      <SelectItem value="1k-3k" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">$1,000 - $3,000</SelectItem>
                      <SelectItem value="3k-5k" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">$3,000 - $5,000</SelectItem>
                      <SelectItem value="5k-10k" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">$5,000 - $10,000</SelectItem>
                      <SelectItem value="10k-plus" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">$10,000+</SelectItem>
                      <SelectItem value="discuss" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Let&apos;s discuss</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.budget && (
                    <p className="text-red-400 text-xs mt-1">{errors.budget}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="timeline" className="text-white/70 font-light text-sm mb-1.5 block">Timeline *</Label>
                  <Select onValueChange={(value) => handleChange('timeline', value)}>
                    <SelectTrigger className={`bg-white/5 border-white/10 text-white focus:border-cyan-400/50 focus:ring-cyan-400/10 h-11 text-base ${errors.timeline ? 'border-red-400/60' : ''}`}>
                      <SelectValue placeholder="When do you need this?" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-900 border-slate-800/50 text-white">
                      <SelectItem value="asap" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">ASAP</SelectItem>
                      <SelectItem value="1-month" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Within 1 month</SelectItem>
                      <SelectItem value="1-3-months" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">1-3 months</SelectItem>
                      <SelectItem value="exploring" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm">Just exploring</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.timeline && (
                    <p className="text-red-400 text-xs mt-1">{errors.timeline}</p>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="message" className="text-white/70 font-light text-sm mb-1.5 block">Tell us about your project *</Label>
                <SecureTextarea
                  id="message"
                  rows={4}
                  placeholder="Describe your project goals, target audience, and any specific requirements..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  required
                  className={`bg-white/5 border-white/10 text-white placeholder:text-white/30 focus:border-cyan-400/50 focus:ring-cyan-400/10 resize-none ${errors.message ? 'border-red-400/60' : ''}`}
                  sanitizeMode="none"
                  maxLength={2000}
                />
                {errors.message && (
                  <p className="text-red-400 text-xs mt-1">{errors.message}</p>
                )}
              </div>

              {/* Honeypot field for spam protection — off-screen, not display:none */}
              <input
                type="text"
                name="website_url"
                style={{ position: 'absolute', left: '-9999px', top: 'auto', width: '1px', height: '1px', overflow: 'hidden' }}
                tabIndex={-1}
                autoComplete="off"
                aria-label="Leave this field empty"
              />

              <div className="w-full pt-1">
                <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-full">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="relative overflow-hidden w-full bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm font-semibold disabled:opacity-100 disabled:cursor-not-allowed min-h-[44px] group"
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full" />
                    {isSubmitting ? (
                      <span className="flex items-center justify-center relative z-10">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending Message...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                        Send Message
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>

              <p className="text-xs text-white/40 text-center font-light">
                We&apos;ll get back to you within 24-48 hours with next steps.
              </p>
            </form>
          </div>
        </div>
  );
};

export default ContactForm;
