'use client';

import { useState, memo, useEffect, useRef } from 'react';
import { Mail, Clock, CheckCircle, ArrowRight, Phone, Calendar } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SecureInput, SecureTextarea } from '@/components/ui/secure-input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail, contactFormSchema, type ContactFormData } from '@/lib/email-service';
import { BUSINESS_EMAIL, BUSINESS_PHONE } from '@/lib/constants';
import type { ProcessStepInfo } from '@/types';
import StructuredData from '@/components/StructuredData';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

// Single line component that can be controlled externally
const TypingTextLine = ({ text, startTyping, onComplete, className = '' }: { 
  text: string; 
  startTyping: boolean; 
  onComplete: () => void;
  className?: string;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (startTyping && !isTyping && !hasCompleted) {
      setIsTyping(true);
      setDisplayedText('');
    }
  }, [startTyping, isTyping, hasCompleted]);

  useEffect(() => {
    if (isTyping && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 25);

      return () => clearTimeout(timeout);
    } else if (isTyping && displayedText.length === text.length) {
      setIsTyping(false);
      setHasCompleted(true);
      onComplete();
    }
  }, [isTyping, displayedText, text, onComplete]);

  return (
    <span className={className}>
      {hasCompleted ? text : displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Component for multi-line typing animation (sequential)
const TypingTextLines = ({ lines, className = '', lineClassName = '' }: { 
  lines: string[]; 
  className?: string; 
  lineClassName?: string | ((index: number, totalLines: number) => string);
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  const handleLineComplete = (index: number) => {
    setCompletedLines(prev => [...prev, index]);
    if (index < lines.length - 1) {
      setTimeout(() => setCurrentLineIndex(index + 1), 200);
    }
  };

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {lines.map((line, index) => {
        const shouldStart = isVisible && index === currentLineIndex && !completedLines.includes(index);
        
        // Apply lineClassName to the span wrapper for styling
        const spanClasses = typeof lineClassName === 'function' ? lineClassName(index, lines.length) : (lineClassName || '');
        
        return (
          <div key={index} className="relative w-full" style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
            {/* Invisible placeholder to reserve space */}
            <span className="invisible block w-full break-words" aria-hidden="true">{line}</span>
            {/* Typing text overlay */}
            <span className={`absolute left-0 top-0 block w-full break-words ${spanClasses}`}>
              <TypingTextLine
                text={line}
                startTyping={shouldStart}
                onComplete={() => handleLineComplete(index)}
                className=""
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

const Contact = () => {
  // Scroll to top when component mounts  
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
      // Validate form data
      const validatedData = contactFormSchema.parse(formData) as ContactFormData;
      
      // Send email
      const result = await sendContactEmail(validatedData);
      
      if (result.success) {
        toast({
          title: "Message sent successfully!",
          description: result.message,
        });
        
        // Reset form
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
        // Handle validation errors
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


  const processSteps: ProcessStepInfo[] = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Send us a message",
      description: "Tell us about your project and goals"
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "24-48 hour response", 
      description: "We'll review and get back to you quickly"
    },
    {
      icon: <CheckCircle className="h-6 w-6" />,
      title: "Discovery call",
      description: "30-minute call to discuss your needs and timeline"
    }
  ];

  return (
    <div className="min-h-screen" role="main" aria-label="Contact page">

      {/* Contact Form & Info - Space Theme */}
      <section id="contact-form" className="pt-24 sm:pt-28 md:pt-32 lg:pt-40 pb-16 sm:pb-20 md:pb-24 relative overflow-hidden bg-black">
        {/* Gradient Background Layers */}
        <div className="absolute inset-0">
          {/* Base gradient layer */}
          <div className="absolute inset-0 bg-gradient-to-br from-black via-cyan-900/60 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tl from-black via-purple-900/50 to-black"></div>
          {/* Accent gradients with theme colors */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-300/20 via-transparent to-purple-300/20"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/35 to-transparent"></div>
        </div>
        
        {/* Space Background Elements */}
        <div className="absolute inset-0">
          {/* Background Stars */}
          <div className="bg-star" style={{ top: '5%', left: '3%' }}></div>
          <div className="bg-star" style={{ top: '8%', left: '12%' }}></div>
          <div className="bg-star" style={{ top: '12%', left: '25%' }}></div>
          <div className="bg-star" style={{ top: '6%', left: '38%' }}></div>
          <div className="bg-star" style={{ top: '15%', left: '45%' }}></div>
          <div className="bg-star" style={{ top: '9%', left: '58%' }}></div>
          <div className="bg-star" style={{ top: '18%', left: '68%' }}></div>
          <div className="bg-star" style={{ top: '7%', left: '78%' }}></div>
          <div className="bg-star" style={{ top: '14%', left: '88%' }}></div>
          <div className="bg-star" style={{ top: '11%', left: '95%' }}></div>
          <div className="bg-star" style={{ top: '25%', left: '5%' }}></div>
          <div className="bg-star" style={{ top: '28%', left: '15%' }}></div>
          <div className="bg-star" style={{ top: '32%', left: '28%' }}></div>
          <div className="bg-star" style={{ top: '26%', left: '42%' }}></div>
          <div className="bg-star" style={{ top: '35%', left: '55%' }}></div>
          <div className="bg-star" style={{ top: '29%', left: '68%' }}></div>
          <div className="bg-star" style={{ top: '38%', left: '82%' }}></div>
          <div className="bg-star" style={{ top: '27%', left: '92%' }}></div>
          
          {/* Nebula Effects */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/8 to-purple-500/8 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/8 to-cyan-500/8 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight mb-6 sm:mb-8 text-white leading-[1.1] tracking-[-0.04em]">
              <TypingTextLines
                lines={['Ready to Transform Your', 'Digital Presence?']}
                className="[&>div:first-child]:block [&>div:last-child]:block [&>div:last-child]:mt-2"
                lineClassName={(index) => {
                  if (index === 0) return "block font-light opacity-90";
                  if (index === 1) return "block bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1";
                  return "";
                }}
              />
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/60 max-w-4xl mx-auto leading-[1.7] font-light tracking-[0.01em] px-4">
              Whether you're a startup looking to make a splash or an established business ready to modernize, we're here to help. Professional web design services in Toronto & GTA.
            </p>
          </div>
          
          <h2 className="sr-only">Contact Information and Form</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Info */}
            <div className="space-y-6 sm:space-y-8">
              <div className="contact-card bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-white tracking-tight">Get in touch</h3>
                  <p className="text-white/60 mb-6 sm:mb-8 leading-[1.7] font-light tracking-[0.01em] text-base sm:text-lg">
                    Our team responds to all inquiries personally and promptly. We're here to help you succeed.
                  </p>
                  
                  <div className="space-y-4 sm:space-y-6">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                        <Mail className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-light text-white text-base sm:text-lg">Email us directly</p>
                        <a 
                          href={`mailto:${BUSINESS_EMAIL}`}
                          className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient hover:opacity-80 transition-opacity text-sm sm:text-base break-all font-light"
                          rel="noopener noreferrer"
                        >
                          {BUSINESS_EMAIL}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                        <Phone className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-light text-white text-base sm:text-lg">Call us directly</p>
                        <a 
                          href={`tel:${BUSINESS_PHONE}`} 
                          className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient hover:opacity-80 transition-opacity text-sm sm:text-base font-light"
                          rel="noopener noreferrer"
                        >
                          {BUSINESS_PHONE}
                        </a>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 sm:space-x-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center text-white shadow-lg flex-shrink-0">
                        <Clock className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="font-light text-white text-base sm:text-lg">Business Hours</p>
                        <p className="text-white/60 text-sm sm:text-base font-light">Monday - Friday: 9:00 AM - 5:00 PM EST</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="contact-card bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden">
                <div className="relative z-10">
                  <h4 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-white tracking-tight">What to expect:</h4>
                  <div className="space-y-4 sm:space-y-6">
                    {processSteps.map((step, index) => (
                      <div key={index} className="flex space-x-3 sm:space-x-4">
                        <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-cyan-300 via-purple-300 to-cyan-300 rounded-xl flex items-center justify-center text-white shadow-lg">
                          <div className="h-5 w-5 sm:h-6 sm:w-6">{step.icon}</div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <h5 className="font-light mb-1 sm:mb-2 text-white text-base sm:text-lg">{step.title}</h5>
                          <p className="text-white/60 text-sm sm:text-base font-light">{step.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-white tracking-tight">Send us a message</h3>
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6" role="form" aria-label="Contact form">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-white font-light text-sm sm:text-base">Name *</Label>
                      <SecureInput 
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange('name', e.target.value)}
                        required 
                        className={`bg-slate-800/50 border-slate-700/50 text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-cyan-300/20 h-10 sm:h-11 text-sm sm:text-base ${errors.name ? 'border-red-400' : ''}`}
                        sanitizeMode="none"
                        maxLength={100}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-red-400 text-xs sm:text-sm mt-1" role="alert">{errors.name}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-white font-light text-sm sm:text-base">Email *</Label>
                      <SecureInput 
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange('email', e.target.value)}
                        required 
                        className={`bg-slate-800/50 border-slate-700/50 text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-cyan-300/20 h-10 sm:h-11 text-sm sm:text-base ${errors.email ? 'border-red-400' : ''}`}
                        sanitizeMode="basic"
                        maxLength={254}
                        aria-describedby={errors.email ? 'email-error' : undefined}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-red-400 text-xs sm:text-sm mt-1" role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-white font-light text-sm sm:text-base">Phone</Label>
                      <SecureInput 
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange('phone', e.target.value)}
                        className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-cyan-300/20 h-10 sm:h-11 text-sm sm:text-base"
                        sanitizeMode="xss"
                        maxLength={20}
                      />
                    </div>
                    <div>
                      <Label htmlFor="company" className="text-white font-light text-sm sm:text-base">Company</Label>
                      <SecureInput 
                        id="company"
                        value={formData.company}
                        onChange={(e) => handleChange('company', e.target.value)}
                        className="bg-slate-800/50 border-slate-700/50 text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-cyan-300/20 h-10 sm:h-11 text-sm sm:text-base"
                        sanitizeMode="none"
                        maxLength={100}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="projectType" className="text-white font-light text-sm sm:text-base">Project Type *</Label>
                    <Select onValueChange={(value) => handleChange('projectType', value)}>
                      <SelectTrigger className="bg-slate-800/50 border-slate-700/50 text-white focus:border-cyan-300 focus:ring-cyan-300/20 h-10 sm:h-11 text-sm sm:text-base">
                        <SelectValue placeholder="What type of project?" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-900 border-slate-800/50 text-white">
                        <SelectItem value="website" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Website Design & Development</SelectItem>
                        <SelectItem value="ecommerce" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">E-commerce Store</SelectItem>
                        <SelectItem value="webapp" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Web Application</SelectItem>
                        <SelectItem value="redesign" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Website Redesign</SelectItem>
                        <SelectItem value="maintenance" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Maintenance & Support</SelectItem>
                        <SelectItem value="consulting" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Consulting</SelectItem>
                        <SelectItem value="other" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Other</SelectItem>
                      </SelectContent>
                    </Select>
                    {errors.projectType && (
                      <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.projectType}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="budget" className="text-white font-light text-sm sm:text-base">Budget Range *</Label>
                      <Select onValueChange={(value) => handleChange('budget', value)}>
                        <SelectTrigger className={`bg-slate-800/50 border-slate-700/50 text-white focus:border-cyan-300 focus:ring-cyan-300/20 h-10 sm:h-11 text-sm sm:text-base ${errors.budget ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800/50 text-white">
                          <SelectItem value="under-1k" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Under $1,000</SelectItem>
                          <SelectItem value="1k-3k" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">$1,000 - $3,000</SelectItem>
                          <SelectItem value="3k-5k" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">$3,000 - $5,000</SelectItem>
                          <SelectItem value="5k-10k" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">$5,000 - $10,000</SelectItem>
                          <SelectItem value="10k-plus" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">$10,000+</SelectItem>
                          <SelectItem value="discuss" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Let's discuss</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.budget && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.budget}</p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="timeline" className="text-white font-light text-sm sm:text-base">Timeline *</Label>
                      <Select onValueChange={(value) => handleChange('timeline', value)}>
                        <SelectTrigger className={`bg-slate-800/50 border-slate-700/50 text-white focus:border-cyan-300 focus:ring-cyan-300/20 h-10 sm:h-11 text-sm sm:text-base ${errors.timeline ? 'border-red-400' : ''}`}>
                          <SelectValue placeholder="When do you need this?" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-900 border-slate-800/50 text-white">
                          <SelectItem value="asap" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">ASAP</SelectItem>
                          <SelectItem value="1-month" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Within 1 month</SelectItem>
                          <SelectItem value="1-3-months" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">1-3 months</SelectItem>
                          <SelectItem value="exploring" className="text-white hover:bg-slate-700 focus:bg-slate-700 text-sm sm:text-base">Just exploring</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.timeline && (
                        <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.timeline}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-white font-light text-sm sm:text-base">Tell us about your project *</Label>
                    <SecureTextarea 
                      id="message"
                      rows={4}
                      placeholder="Describe your project goals, target audience, and any specific requirements..."
                      value={formData.message}
                      onChange={(e) => handleChange('message', e.target.value)}
                      required
                      className={`bg-slate-800/50 border-slate-700/50 text-white placeholder:text-white/40 focus:border-cyan-300 focus:ring-cyan-300/20 text-sm sm:text-base resize-none ${errors.message ? 'border-red-400' : ''}`}
                      sanitizeMode="none"
                      maxLength={2000}
                    />
                    {errors.message && (
                      <p className="text-red-400 text-xs sm:text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Honeypot field for spam protection */}
                  <input 
                    type="text" 
                    name="website_url" 
                    style={{ display: 'none' }} 
                    tabIndex={-1}
                    autoComplete="off"
                    aria-label="Leave this field empty"
                  />

                  <div className="w-full">
                    <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 w-full">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="relative overflow-hidden w-full bg-black rounded-full text-white shadow-lg transition-all duration-300 px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold disabled:opacity-100 disabled:cursor-not-allowed min-h-[44px] group"
                      >
                        {/* Gradient fill animation */}
                        <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                        
                        {isSubmitting ? (
                          <span className="flex items-center justify-center relative z-10">
                            <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:h-5 border-b-2 border-white mr-2"></div>
                            Sending Message...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                            Send Message
                            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                          </span>
                        )}
                      </Button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-white/60 text-center font-light">
                    We'll get back to you within 24-48 hours with next steps.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section - Schedule a Meeting */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 mt-12 sm:mt-16">
          <div className="bg-slate-900/90 backdrop-blur-sm rounded-xl p-8 sm:p-12 md:p-16 border border-slate-800/50 shadow-2xl relative overflow-hidden">
            {/* Box glow */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            
            <div className="relative z-10 text-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-extralight mb-4 sm:mb-6 text-white leading-[1.1] tracking-[-0.04em]">
                <span className="block font-light opacity-90">Ready to Get Started?</span>
                <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">Schedule a Meeting</span>
              </h3>
              <p className="text-white/60 text-base sm:text-lg md:text-xl mb-8 sm:mb-10 leading-[1.7] font-light tracking-[0.01em] max-w-2xl mx-auto">
                Prefer to chat? Book a time that works for you and let's discuss your project.
              </p>
              <div className="relative inline-block rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
                <Button
                  asChild
                  className="relative overflow-hidden bg-black rounded-full text-white shadow-lg transition-all duration-300 px-8 py-4 sm:px-10 sm:py-5 text-base sm:text-lg font-semibold group animate-jiggle"
                >
                  <Link href="/contact/schedule">
                    <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out z-0 rounded-full"></span>
                    <span className="flex items-center justify-center relative z-10 group-hover:text-white">
                      <Calendar className="mr-2 h-5 w-5 sm:h-6 sm:w-6" />
                      Schedule a Meeting
                      <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6" />
                    </span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumb Schema */}
      <StructuredData 
        type="breadcrumb" 
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Contact', url: '/contact' }
        ]} 
      />

    </div>
  );
};

export default memo(Contact);