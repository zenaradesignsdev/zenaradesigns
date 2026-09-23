import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const BlogCta = () => (
  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-950/40 via-black to-purple-950/40 px-6 py-10 sm:px-10 sm:py-12">
    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-8 md:items-center">
      <div>
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/70 mb-3">Work with us</p>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extralight text-white leading-[1.15] tracking-[-0.03em]">
          <span className="font-light opacity-90">Want this done for </span>
          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent font-normal">your business?</span>
        </h2>
        <p className="mt-3 text-base text-white/60 font-light leading-relaxed max-w-xl">
          Get a free consultation and a fixed quote within 24 hours. No obligation, no pressure — just a clear answer.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row md:flex-col lg:flex-row gap-3">
        <div className="relative rounded-full p-[2px] bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300">
          <Button asChild className="relative overflow-hidden h-auto w-full bg-black rounded-full text-white px-6 py-3 text-sm sm:text-base font-semibold group">
            <Link href="/contact" className="flex items-center justify-center">
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-in-out rounded-full" />
              <span className="relative z-10 flex items-center gap-2 whitespace-nowrap">
                Book Free Consultation
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </Button>
        </div>
        <Link
          href="/pricing"
          className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm sm:text-base font-medium text-white/70 transition-colors hover:border-cyan-400/40 hover:text-white whitespace-nowrap"
        >
          See Pricing
        </Link>
      </div>
    </div>
  </div>
);
