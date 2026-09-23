import Link from 'next/link';
import { cn } from '@/lib/utils';

interface RelatedGuideProps {
  href: string;
  title: string;
  className?: string;
}

// One quiet link from a service page to the blog post that supports it. The
// title is passed in rather than looked up from the blog content so service
// pages don't bundle every post body.
export const RelatedGuide = ({ href, title, className }: RelatedGuideProps) => (
  <p className={cn('text-center text-sm sm:text-base font-light text-white/45', className)}>
    Related guide:{' '}
    <Link
      href={href}
      className="text-cyan-300/80 underline decoration-cyan-300/30 underline-offset-4 transition-colors hover:text-cyan-300"
    >
      {title}
    </Link>
  </p>
);
