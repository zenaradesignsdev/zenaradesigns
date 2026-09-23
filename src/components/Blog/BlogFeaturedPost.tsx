import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { BlogMetadata } from './BlogMetadata';
import type { BlogPost } from '@/types';

interface BlogFeaturedPostProps {
  post: BlogPost;
  readingMinutes: number;
}

export const BlogFeaturedPost = ({ post, readingMinutes }: BlogFeaturedPostProps) => (
  <Link
    href={`/blog/${post.slug}`}
    className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
  >
    {post.featuredImage && (
      <div className="lg:col-span-6 relative aspect-[16/10] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
        <Image
          src={post.featuredImage}
          alt=""
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 560px"
          className="object-cover opacity-85 transition duration-700 group-hover:opacity-100 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>
    )}

    <div className={post.featuredImage ? 'lg:col-span-6' : 'lg:col-span-12'}>
      <p className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-400/70 mb-4">Latest article</p>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white leading-[1.15] tracking-[-0.03em] transition-colors group-hover:text-cyan-200">
        {post.title}
      </h2>
      <p className="mt-4 text-base sm:text-lg text-white/60 font-light leading-relaxed">{post.excerpt ?? post.description}</p>
      <BlogMetadata post={post} readingMinutes={readingMinutes} className="mt-5" />
      <span className="mt-7 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 group-hover:text-cyan-200">
        Read the article
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </span>
    </div>
  </Link>
);
