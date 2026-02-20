import { Calendar, Clock, User, Edit } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

interface BlogMetadataProps {
  post: BlogPost;
}

// Estimate reading time based on word count (average reading speed: 200 words per minute)
const calculateReadingTime = (content: React.ComponentType): number => {
  // Rough estimate for typical blog posts
  return 5;
};

export const BlogMetadata = ({ post }: BlogMetadataProps) => {
  const readingTime = calculateReadingTime(post.content);
  const formattedDate = format(post.publishedAt, 'MMMM d, yyyy');
  const formattedUpdatedDate = post.updatedAt ? format(post.updatedAt, 'MMMM d, yyyy') : null;

  return (
    <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm sm:text-base text-white/50 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-white/10 font-light">
      <div className="flex items-center gap-2">
        <User className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
        <span>{post.author}</span>
      </div>
      <div className="flex items-center gap-2">
        <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
        <span>Published {formattedDate}</span>
      </div>
      {formattedUpdatedDate && formattedUpdatedDate !== formattedDate && (
        <div className="flex items-center gap-2">
          <Edit className="h-4 w-4 sm:h-5 sm:w-5 text-purple-400" />
          <span>Updated {formattedUpdatedDate}</span>
        </div>
      )}
      <div className="flex items-center gap-2">
        <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-cyan-400" />
        <span>{readingTime} min read</span>
      </div>
    </div>
  );
};
