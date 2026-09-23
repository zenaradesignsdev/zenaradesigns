import Link from 'next/link';
import { cn, formatPostDate } from '@/lib/utils';
import { findTeamMember } from '@/lib/team';
import type { BlogPost } from '@/types';

interface BlogMetadataProps {
  post: BlogPost;
  readingMinutes: number;
  showAuthor?: boolean;
  className?: string;
}

export const BlogMetadata = ({ post, readingMinutes, showAuthor = false, className }: BlogMetadataProps) => {
  const published = formatPostDate(post.publishedAt);
  const updated = post.updatedAt ? formatPostDate(post.updatedAt) : null;

  return (
    <p className={cn('flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/45 font-light', className)}>
      {showAuthor && (
        <>
          {findTeamMember(post.author) ? (
            <Link href="/about" className="text-white/70 hover:text-white transition-colors">{post.author}</Link>
          ) : (
            <span className="text-white/70">{post.author}</span>
          )}
          <span aria-hidden="true">·</span>
        </>
      )}
      <time dateTime={new Date(post.publishedAt).toISOString()}>{published}</time>
      {updated && updated !== published && (
        <>
          <span aria-hidden="true">·</span>
          <span>Updated {updated}</span>
        </>
      )}
      <span aria-hidden="true">·</span>
      <span>{readingMinutes} min read</span>
    </p>
  );
};
