import Image from 'next/image';
import Link from 'next/link';
import { BlogMetadata } from './BlogMetadata';
import { BlogOutline } from './BlogOutline';
import type { PostOutline } from '@/lib/blog-outline';
import type { BlogPost } from '@/types';

interface BlogPostLayoutProps {
  post: BlogPost;
  outline: PostOutline;
}

export const BlogPostLayout = ({ post, outline }: BlogPostLayoutProps) => {
  const ContentComponent = post.content;
  const tag = post.tags?.[0];

  return (
    <article>
      <header className="max-w-4xl">
        <nav aria-label="Breadcrumb" className="mb-6 sm:mb-8">
          <ol className="flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-medium">
            <li>
              <Link href="/blog" className="text-white/40 hover:text-white transition-colors">Blog</Link>
            </li>
            {tag && (
              <>
                <li aria-hidden="true" className="text-white/20">/</li>
                <li className="text-cyan-300/70">{tag}</li>
              </>
            )}
          </ol>
        </nav>

        <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-extralight text-white leading-[1.08] tracking-[-0.04em]">
          {post.title}
        </h1>
        <p className="mt-6 max-w-3xl text-base sm:text-lg md:text-xl text-white/60 font-light leading-relaxed">
          {post.description}
        </p>
        <BlogMetadata post={post} readingMinutes={outline.readingMinutes} showAuthor className="mt-6" />
      </header>

      {post.featuredImage && (
        <div className="relative mt-10 sm:mt-14 aspect-[16/9] sm:aspect-[21/8] rounded-2xl overflow-hidden border border-white/10 bg-white/5">
          <Image
            src={post.featuredImage}
            alt={post.featuredImageAlt ?? ''}
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1152px"
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      )}

      <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_15rem] gap-12 xl:gap-20">
        <div className="blog-prose min-w-0 max-w-[42rem]">
          <ContentComponent />
        </div>

        {outline.headings.length > 1 && (
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <BlogOutline headings={outline.headings} />
            </div>
          </aside>
        )}
      </div>

      {post.tags && post.tags.length > 0 && (
        <ul className="mt-14 flex flex-wrap gap-2" aria-label="Topics">
          {post.tags.map((t) => (
            <li key={t} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50">
              {t}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
};
