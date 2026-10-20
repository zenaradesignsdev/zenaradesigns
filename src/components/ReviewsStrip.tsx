import type { ReactNode } from 'react';
import Image from 'next/image';
import { ArrowUpRight, Star } from 'lucide-react';
import { GOOGLE_MAPS_URL } from '@/lib/constants';
import { fetchGoogleReviews, type GoogleReview } from '@/lib/google-reviews';
import { cn } from '@/lib/utils';

interface ReviewsStripProps {
  /** Heading id, so the section can be labelled by it. */
  headingId?: string;
  /** Classes for the outer <section> (padding and background). */
  className?: string;
  /** Decorative background layer, matching the host page's sections. */
  background?: ReactNode;
}

interface StarsProps {
  rating: number;
  className?: string;
}

const Stars = ({ rating, className }: StarsProps) => (
  <span className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={cn(className, i < Math.round(rating) ? 'text-cyan-300 fill-cyan-300' : 'text-white/15')}
      />
    ))}
  </span>
);

const ReviewQuote = ({ review }: { review: GoogleReview }) => (
  <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-slate-950/60 p-6">
    <Stars rating={review.rating} className="h-3.5 w-3.5" />
    <blockquote className="mt-4 flex-1">
      <p className="line-clamp-6 text-sm sm:text-base font-light leading-[1.7] text-white/70">{review.text}</p>
    </blockquote>
    <figcaption className="mt-5 flex items-center gap-3 border-t border-white/10 pt-4">
      {review.photoUri ? (
        <Image
          src={review.photoUri}
          alt=""
          width={32}
          height={32}
          className="h-8 w-8 rounded-full object-cover ring-1 ring-cyan-400/30"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-xs font-medium text-cyan-200"
        >
          {review.name.charAt(0).toUpperCase()}
        </span>
      )}
      <span className="min-w-0">
        <span className="block truncate text-sm font-medium text-white">{review.name}</span>
        <span className="block text-[11px] uppercase tracking-[0.15em] text-white/40">{review.relativeTime} · Google</span>
      </span>
    </figcaption>
  </figure>
);

// Compact, server-rendered version of the homepage review carousel for the
// pages we want to rank: three recent reviews plus the overall rating, in the
// initial HTML. Deliberately no AggregateRating/Review JSON-LD — Google ignores
// self-serving review markup a business puts on its own site.
//
// Renders nothing — not even the section wrapper — when the Places API is
// unconfigured or has no reviews, so a missing key never leaves an empty band.
export const ReviewsStrip = async ({ headingId = 'client-reviews', className, background }: ReviewsStripProps) => {
  const result = await fetchGoogleReviews();
  if (result.ok === false || result.data.reviews.length === 0) return null;

  const { rating, userRatingCount, reviews } = result.data;
  const shown = reviews.filter((r) => r.text.trim().length > 0).slice(0, 3);
  if (shown.length === 0) return null;

  return (
    <section aria-labelledby={headingId} className={cn('relative overflow-hidden', className)}>
      {background}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-8 sm:mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-mono text-cyan-400/60 tracking-[0.2em] uppercase mb-4">Google Reviews</p>
            <h2 id={headingId} className="text-3xl sm:text-4xl font-extralight text-white leading-[1.1] tracking-[-0.04em]">
              <span className="font-light opacity-90">What our clients </span>
              <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">say</span>
            </h2>
          </div>
          <a
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-4 self-start rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors duration-300 hover:border-cyan-400/40 sm:self-auto"
          >
            <span className="text-4xl font-extralight leading-none tracking-[-0.04em] text-white">{rating.toFixed(1)}</span>
            <span className="flex flex-col gap-1">
              <Stars rating={rating} className="h-4 w-4" />
              <span className="inline-flex items-center gap-1 text-xs text-white/50 group-hover:text-cyan-300 transition-colors">
                {userRatingCount} Google {userRatingCount === 1 ? 'review' : 'reviews'}
                <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
              </span>
            </span>
          </a>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-3">
          {shown.map((review) => (
            <ReviewQuote key={`${review.name}-${review.publishTime}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
};
