import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

// FAQ list on native <details>/<summary>. It replaced the Radix Accordion,
// which unmounts closed answers: the answer text never reached the server
// HTML that crawlers index, though the pages' FAQPage JSON-LD quoted it.
// <details> keeps every answer in the HTML, opens without JavaScript and is
// keyboard-accessible by default. Server Component.

export interface FaqDisclosureItem {
  question: string;
  answer: string;
}

interface FaqDisclosureListProps {
  faqs: FaqDisclosureItem[];
  /** "gradient": industry hubs and /faq. "card": two-column lists on /pricing, /process, /services. */
  variant: 'gradient' | 'card';
  className?: string;
}

interface FaqItemProps {
  faq: FaqDisclosureItem;
}

const SUMMARY_BASE =
  'flex w-full cursor-pointer list-none items-center gap-4 text-left [&::-webkit-details-marker]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-xl';

const GradientItem = ({ faq }: FaqItemProps) => (
  <details className="group/faq border border-white/10 rounded-xl bg-white/[0.02] open:bg-gradient-to-r open:from-cyan-500/15 open:via-purple-500/15 open:to-cyan-500/15 open:border-cyan-500/40 transition-all duration-200">
    <summary className={cn(SUMMARY_BASE, 'justify-between px-5 py-4 text-white/80 group-open/faq:text-white')}>
      <span className="font-light text-sm pr-4">{faq.question}</span>
      <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 group-open/faq:rotate-180" aria-hidden="true" />
    </summary>
    <p className="px-5 pb-4 text-white/55 text-sm leading-[1.6] font-light">{faq.answer}</p>
  </details>
);

const CardItem = ({ faq }: FaqItemProps) => (
  <details className="group/faq overflow-hidden border border-white/[0.09] rounded-xl bg-slate-900/50 hover:border-cyan-500/20 open:border-cyan-500/35 open:bg-slate-900/80 transition-all duration-300">
    <summary className={cn(SUMMARY_BASE, 'group/q relative overflow-hidden px-5 sm:px-6 py-4 sm:py-5')}>
      <span
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/[0.11] via-purple-500/[0.07] to-transparent -translate-x-full group-hover/q:translate-x-0 transition-transform duration-500 ease-out pointer-events-none"
        aria-hidden="true"
      />
      <span className="font-light text-sm sm:text-base text-white/70 group-hover/q:text-white group-open/faq:text-white pr-4 flex-1 transition-colors duration-300 relative z-10">
        {faq.question}
      </span>
      <ChevronDown
        className="h-4 w-4 text-white/30 group-hover/q:text-cyan-400 shrink-0 transition-all duration-300 group-open/faq:rotate-180 relative z-10"
        aria-hidden="true"
      />
    </summary>
    <p className="px-5 sm:px-6 pb-4 sm:pb-5 text-white/55 text-sm leading-[1.75] font-light tracking-[0.01em]">{faq.answer}</p>
  </details>
);

export const FaqDisclosureList = ({ faqs, variant, className }: FaqDisclosureListProps) => {
  const Item = variant === 'gradient' ? GradientItem : CardItem;
  return (
    <div className={cn('w-full', variant === 'gradient' ? 'space-y-2 sm:space-y-3' : 'space-y-3 flex flex-col', className)}>
      {faqs.map((faq) => (
        <Item key={faq.question} faq={faq} />
      ))}
    </div>
  );
};
