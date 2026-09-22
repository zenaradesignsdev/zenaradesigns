import { ExternalLink } from 'lucide-react';

// Each industry hub links to the matching concept demo. These are fictional
// businesses we built to show the design direction, and they are noindexed at
// their own source — rel="nofollow" here keeps this page from passing them
// authority, and the label makes clear they are not client work.

export interface ConceptDemo {
  name: string;
  url: string;
  blurb: string;
}

export const CONCEPT_DEMOS: Record<string, ConceptDemo> = {
  renovations: {
    name: 'Luxury Renovation',
    url: 'https://projectone.zenaradesigns.com',
    blurb:
      'A concept build for a high-end renovation company — project gallery, trade credentials, and a quote request designed to arrive with enough detail to estimate against.',
  },
  clinics: {
    name: 'Nova Motion Physio',
    url: 'https://projectthree.zenaradesigns.com',
    blurb:
      'A concept build for a physiotherapy clinic — practitioner profiles, condition-specific pages, online booking, and insurance information where patients look for it.',
  },
  accountants: {
    name: 'North Ledger Advisory',
    url: 'https://projectfour.zenaradesigns.com',
    blurb:
      'A concept build for an accounting practice — service structure by client type, secure document intake, and the restrained visual language finance clients expect.',
  },
  lawyers: {
    name: 'Pickering Law Firm',
    url: 'https://projecttwo.zenaradesigns.com',
    blurb:
      'A concept build for a general practice law firm — practice-area structure, lawyer bios, and a consultation request flow built for trust rather than volume.',
  },
};

interface ConceptDemoCalloutProps {
  demo: ConceptDemo;
  industryLabel: string;
}

const ConceptDemoCallout = ({ demo, industryLabel }: ConceptDemoCalloutProps) => (
  <section className="mb-16 sm:mb-20 md:mb-24">
    <div className="bg-slate-900/90 backdrop-blur-sm rounded-2xl p-8 sm:p-10 md:p-12 border border-slate-800/50 shadow-2xl relative overflow-hidden max-w-4xl mx-auto">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
      <div className="relative z-10 text-center">
        <span className="inline-block text-[11px] uppercase tracking-[0.2em] text-cyan-300/80 border border-cyan-500/30 rounded-full px-3 py-1 mb-5 font-medium">
          Concept demo
        </span>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white mb-4 leading-[1.1] tracking-[-0.04em]">
          <span className="block font-light opacity-90">See a {industryLabel} site</span>
          <span className="block mt-2 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal pb-1">
            we built end to end
          </span>
        </h2>
        <p className="text-white/60 mb-3 text-base sm:text-lg max-w-2xl mx-auto leading-[1.7] font-light tracking-[0.01em]">
          {demo.blurb}
        </p>
        <p className="text-white/40 mb-8 text-sm max-w-2xl mx-auto font-light">
          {demo.name} is a fictional business we created to demonstrate the work — not a client.
        </p>
        <a
          href={demo.url}
          target="_blank"
          rel="nofollow noopener noreferrer"
          className="inline-flex items-center gap-2 text-cyan-400 hover:text-purple-400 transition-colors text-sm sm:text-base font-medium group/link"
        >
          Explore the {demo.name} demo
          <ExternalLink className="h-4 w-4 group-hover/link:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  </section>
);

export default ConceptDemoCallout;
