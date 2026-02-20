import { Link } from 'react-router-dom';
import { Calendar, Clock, User } from 'lucide-react';
import { BlogPost } from '@/lib/types';
import { format } from 'date-fns';

interface BlogCardProps {
  post: BlogPost;
}

// Estimate reading time based on word count (average reading speed: 200 words per minute)
const calculateReadingTime = (content: React.ComponentType): number => {
  // Since we're using JSX components, we'll estimate based on typical blog post length
  // This is a rough estimate - in a real implementation, you might want to count actual words
  // For now, we'll use a default estimate of 5 minutes for typical posts
  return 5;
};

export const BlogCard = ({ post }: BlogCardProps) => {
  const readingTime = calculateReadingTime(post.content);
  const formattedDate = format(post.publishedAt, 'MMMM d, yyyy');

  return (
    <Link
      to={`/blog/${post.slug}`}
      className="group block bg-slate-900/90 backdrop-blur-sm rounded-xl p-6 sm:p-8 border border-slate-800/50 hover:border-cyan-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-cyan-500/20 h-full flex flex-col relative overflow-hidden"
    >
      {/* Box glow */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
      
      {/* Background gradient on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>

      <div className="relative z-10 flex flex-col h-full">
        {/* Featured Image Placeholder - can be enhanced later */}
        {post.featuredImage ? (
          <div className="w-full h-48 sm:h-56 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 relative group/image">
            <img
              src={post.featuredImage}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>
        ) : (
          <div className="w-full h-48 sm:h-56 mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-cyan-500/20 flex items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-cyan-500/10 blur-2xl opacity-50"></div>
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-sm relative z-10">
              <span className="text-3xl sm:text-4xl">📝</span>
            </div>
          </div>
        )}

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1.5 text-xs font-medium bg-gradient-to-r from-cyan-500/20 to-purple-500/20 text-cyan-300 rounded-full border border-cyan-400/30 group-hover:border-cyan-400/50 transition-colors duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-semibold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300 line-clamp-2 tracking-tight">
          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient group-hover:opacity-100">{post.title}</span>
        </h2>

        {/* Description */}
        <p className="text-white/60 text-sm sm:text-base leading-relaxed mb-6 flex-grow line-clamp-3 font-light">
          {post.description}
        </p>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-white/50 border-t border-white/10 pt-4 mt-auto font-light">
          <div className="flex items-center gap-2 group-hover:text-cyan-300 transition-colors duration-300">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-2 group-hover:text-purple-300 transition-colors duration-300">
            <Clock className="h-4 w-4" />
            <span>{readingTime} min read</span>
          </div>
        </div>
      </div>
    </Link>
  );
};
