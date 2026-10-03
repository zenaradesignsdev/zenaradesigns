'use client';

import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CheckCircle, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { FadeIn } from '@/components/ui/fade-in';
import { TextReveal } from '@/components/ui/text-reveal';
import { GOOGLE_MAPS_URL } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface GoogleReview {
  name: string;
  rating: number;
  text: string;
  relativeTime: string;
  publishTime: string;
  photoUri?: string;
}

interface GoogleReviewsData {
  displayName: string;
  rating: number;
  userRatingCount: number;
  reviews: GoogleReview[];
}

interface GoogleReviewsResponse {
  success: boolean;
  data?: GoogleReviewsData;
  error?: string;
}

interface StarRowProps {
  rating: number;
  className?: string;
}

interface ReviewCardProps {
  review: GoogleReview;
  index: number;
  total: number;
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const StarRow = ({ rating, className }: StarRowProps) => (
  <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
    {Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        aria-hidden="true"
        className={cn(className, i < Math.round(rating) ? 'text-cyan-300 fill-cyan-300' : 'text-white/15')}
      />
    ))}
  </div>
);

const ReviewCard = ({ review, index, total }: ReviewCardProps) => (
  <article
    role="group"
    aria-roledescription="slide"
    aria-label={`${index + 1} of ${total}`}
    data-review-slide={index}
    className="group relative snap-start shrink-0 basis-[85%] sm:basis-[60%] md:basis-[calc((100%-1.5rem)/2)] lg:basis-[calc((100%-3rem)/3)] rounded-2xl sm:rounded-3xl border border-cyan-500/20 hover:border-cyan-400/50 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-purple-950/30 overflow-hidden shadow-[inset_0_1px_0_rgba(6,182,212,0.08)] transition-colors duration-500"
  >
    <div className="absolute -top-16 -right-16 w-44 h-44 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-400/20 transition-colors duration-700" />
    <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/8 rounded-full blur-3xl group-hover:bg-purple-500/15 transition-colors duration-700" />
    <span
      aria-hidden="true"
      className="absolute top-2 right-6 text-[7rem] sm:text-[8rem] font-serif leading-none text-cyan-400/[0.08] select-none pointer-events-none"
    >
      &ldquo;
    </span>

    <div className="relative z-10 flex h-full flex-col p-6 sm:p-8">
      <StarRow rating={review.rating} className="h-4 w-4" />

      <blockquote className="mt-5 flex-1">
        <p className="line-clamp-5 text-base sm:text-[1.0625rem] font-light leading-[1.7] tracking-[0.01em] text-white/75">
          {review.text}
        </p>
      </blockquote>

      <footer className="mt-8 flex items-center gap-3 border-t border-white/10 pt-5">
        {review.photoUri ? (
          <Image
            src={review.photoUri}
            alt={`${review.name}'s Google profile photo`}
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover ring-1 ring-cyan-400/30"
          />
        ) : (
          <div
            aria-hidden="true"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-sm font-medium text-cyan-200"
          >
            {review.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="min-w-0">
          <p className="truncate text-sm sm:text-base font-medium text-white">{review.name}</p>
          <p className="text-xs uppercase tracking-[0.15em] text-white/40">{review.relativeTime}</p>
        </div>
      </footer>
    </div>
  </article>
);

const GoogleReviews = () => {
  const [reviewsData, setReviewsData] = useState<GoogleReviewsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);
  // Scroll stops, not slides: with three cards in view on desktop there are
  // only three positions to land on, so the dots shouldn't promise five.
  const [stopCount, setStopCount] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch('/api/reviews');
        if (!response.ok) throw new Error('Failed to fetch reviews');
        const data: GoogleReviewsResponse = await response.json();
        if (data.success && data.data) setReviewsData(data.data);
      } catch (err) {
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  // Derive arrow state and the active dot from the scroll position, so swipe,
  // trackpad and keyboard scrolling all stay in sync with the controls.
  const syncControls = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const maxScroll = track.scrollWidth - track.clientWidth;
    setCanPrev(track.scrollLeft > 4);
    setCanNext(track.scrollLeft < maxScroll - 4);

    const slides = track.querySelectorAll<HTMLElement>('[data-review-slide]');
    if (slides.length === 0) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const perView = Math.max(1, Math.round((track.clientWidth + gap) / (slides[0].offsetWidth + gap)));
    const stops = Math.max(1, slides.length - perView + 1);
    setStopCount(stops);

    const atEnd = track.scrollLeft >= maxScroll - 4;
    let nearest = 0;
    let nearestDistance = Infinity;
    slides.forEach((slide, i) => {
      const distance = Math.abs(slide.offsetLeft - track.offsetLeft - track.scrollLeft);
      if (distance < nearestDistance) {
        nearest = i;
        nearestDistance = distance;
      }
    });
    setActiveIndex(atEnd ? stops - 1 : Math.min(nearest, stops - 1));
  }, []);

  const handleScroll = () => {
    if (frameRef.current !== null) return;
    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      syncControls();
    });
  };

  useEffect(() => {
    syncControls();
    window.addEventListener('resize', syncControls);
    return () => window.removeEventListener('resize', syncControls);
  }, [reviewsData, syncControls]);

  const scrollToSlide = (index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelectorAll<HTMLElement>('[data-review-slide]')[index];
    if (!track || !slide) return;
    track.scrollTo({
      left: slide.offsetLeft - track.offsetLeft,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  const step = (direction: 1 | -1) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>('[data-review-slide]');
    if (!track || !slide) return;
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.scrollBy({
      left: direction * (slide.offsetWidth + gap),
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  if (loading) {
    return <section aria-hidden="true" className="min-h-[640px] bg-black" />;
  }

  if (!reviewsData || reviewsData.reviews.length === 0) return null;

  const { rating, userRatingCount, reviews } = reviewsData;
  const averageRating = rating || 0;
  const totalReviews = userRatingCount || 0;

  return (
    <section aria-labelledby="reviews-heading" className="relative overflow-hidden bg-black py-20 sm:py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 right-0 h-[420px] w-[620px] rounded-full bg-purple-600/[0.12] blur-[130px]" />
        <div className="absolute -bottom-24 -left-20 h-[420px] w-[620px] rounded-full bg-cyan-500/[0.10] blur-[130px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/15 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 sm:mb-16 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="mb-4 sm:mb-6 text-xs sm:text-sm font-medium uppercase tracking-[0.2em] text-white/40">
                Google Reviews
              </p>
            </FadeIn>
            <div id="reviews-heading">
              <TextReveal
                as="h2"
                className="mb-6 sm:mb-8 text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight leading-[0.95] tracking-[-0.04em]"
                staggerMs={120}
                lines={[
                  <span key="l1">
                    <span className="font-light text-white">What Our </span>
                    <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-[length:200%_auto] bg-clip-text font-normal text-transparent animate-gradient">
                      Clients Say
                    </span>
                  </span>,
                ]}
              />
            </div>
            <FadeIn delay={240}>
              <p className="text-base sm:text-lg md:text-xl font-light leading-[1.7] tracking-[0.01em] text-white/50">
                Real reviews from real businesses who trusted us with their digital transformation
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={320} className="shrink-0">
            <a
              href={GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 transition-colors duration-300 hover:border-cyan-400/40"
            >
              <span className="text-5xl sm:text-6xl font-extralight leading-none tracking-[-0.04em] text-white">
                {averageRating.toFixed(1)}
              </span>
              <span className="flex flex-col gap-1.5">
                <StarRow rating={averageRating} className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="text-sm text-white/50">
                  Based on {totalReviews} {totalReviews === 1 ? 'review' : 'reviews'}
                </span>
                <span className="flex items-center gap-1.5 text-xs uppercase tracking-[0.15em] text-cyan-400/70 group-hover:text-cyan-300 transition-colors duration-300">
                  <CheckCircle aria-hidden="true" className="h-3.5 w-3.5" />
                  Verified Google Business
                </span>
              </span>
            </a>
          </FadeIn>
        </div>

        <div
          ref={trackRef}
          onScroll={handleScroll}
          role="region"
          aria-roledescription="carousel"
          aria-label="Client reviews"
          tabIndex={0}
          className="-mx-4 flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto scroll-px-4 px-4 pb-2 sm:-mx-6 sm:scroll-px-6 sm:px-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 rounded-3xl"
        >
          {reviews.map((review, index) => (
            <ReviewCard key={`${review.name}-${review.publishTime}`} review={review} index={index} total={reviews.length} />
          ))}
        </div>

        <div className="mt-8 sm:mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            {Array.from({ length: stopCount }, (_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => scrollToSlide(index)}
                aria-label={`Go to review ${index + 1}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                className="flex h-6 items-center"
              >
                <span
                  className={cn(
                    'block h-1 rounded-full transition-all duration-500',
                    activeIndex === index ? 'w-8 bg-cyan-300' : 'w-3 bg-white/20 hover:bg-white/40'
                  )}
                />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              disabled={!canPrev}
              aria-label="Previous review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] text-cyan-300 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/20 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronLeft aria-hidden="true" className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              disabled={!canNext}
              aria-label="Next review"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-500/25 bg-cyan-500/[0.08] text-cyan-300 transition-all duration-300 hover:border-cyan-400/60 hover:bg-cyan-500/20 disabled:pointer-events-none disabled:opacity-30"
            >
              <ChevronRight aria-hidden="true" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GoogleReviews;
