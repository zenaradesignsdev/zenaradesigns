import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { BlogMetadata } from './BlogMetadata';
import type { BlogPost } from '@/types';

interface BlogListItemProps {
  post: BlogPost;
  readingMinutes: number;
  headingLevel?: 'h2' | 'h3';
}

export const BlogListItem = ({ post, readingMinutes, headingLevel: Heading = 'h2' }: BlogListItemProps) => {
  const tag = post.tags?.[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group grid grid-cols-[1fr_auto] sm:grid-cols-[9rem_1fr_auto] gap-x-5 sm:gap-x-8 gap-y-4 items-start py-7 sm:py-8 border-t border-white/10 transition-colors hover:border-white/25"
    >
      {post.featuredImage && (
        <div className="relative hidden sm:block aspect-[4/3] rounded-xl overflow-hidden bg-white/5">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            sizes="144px"
            className="object-cover opacity-80 grayscale-[30%] transition duration-500 group-hover:opacity-100 group-hover:grayscale-0"
          />
        </div>
      )}

      <div className="min-w-0">
        {tag && (
          <p className="text-[11px] uppercase tracking-[0.2em] text-cyan-300/70 font-medium mb-2">{tag}</p>
        )}
        <Heading className="text-lg sm:text-xl md:text-2xl font-light text-white leading-snug tracking-[-0.02em] transition-colors group-hover:text-cyan-200">
          {post.title}
        </Heading>
        <p className="mt-2 text-sm sm:text-base text-white/55 font-light leading-relaxed line-clamp-2 max-w-2xl">
          {post.excerpt ?? post.description}
        </p>
        <BlogMetadata post={post} readingMinutes={readingMinutes} className="mt-3" />
      </div>

      <span
        aria-hidden="true"
        className="mt-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/50 transition-all group-hover:border-cyan-300/60 group-hover:text-cyan-200 group-hover:rotate-45"
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </Link>
  );
};
