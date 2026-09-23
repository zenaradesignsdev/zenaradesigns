import { isValidElement, type ReactNode } from 'react';
import type { BlogPost } from '@/types';

export interface PostHeading {
  id: string;
  text: string;
}

export interface PostOutline {
  headings: PostHeading[];
  readingMinutes: number;
}

const WORDS_PER_MINUTE = 220;

// Post bodies are plain JSX with no hooks, so calling the component returns
// its element tree directly. Walking that tree on the server gives the section
// headings (for the on-page outline) and a real word count (for reading time)
// without keeping a second, hand-maintained copy of either.
const renderContent = (post: BlogPost): ReactNode => (post.content as () => ReactNode)();

const textOf = (node: ReactNode): string => {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return textOf(node.props.children);
  return '';
};

const collectHeadings = (node: ReactNode, out: PostHeading[]): void => {
  if (Array.isArray(node)) {
    node.forEach((child) => collectHeadings(child, out));
    return;
  }
  if (!isValidElement<{ id?: string; children?: ReactNode }>(node)) return;
  if (node.type === 'h2' && node.props.id) {
    out.push({ id: node.props.id, text: textOf(node.props.children).trim() });
    return;
  }
  collectHeadings(node.props.children, out);
};

export const getPostOutline = (post: BlogPost): PostOutline => {
  const tree = renderContent(post);
  const headings: PostHeading[] = [];
  collectHeadings(tree, headings);
  const words = textOf(tree).split(/\s+/).filter(Boolean).length;
  return { headings, readingMinutes: Math.max(1, Math.round(words / WORDS_PER_MINUTE)) };
};

// Most shared tags first, then newest. `posts` is already sorted newest-first.
export const getRelatedPosts = (post: BlogPost, posts: BlogPost[], limit = 2): BlogPost[] => {
  const tags = new Set(post.tags ?? []);
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p, index) => ({ p, index, shared: (p.tags ?? []).filter((t) => tags.has(t)).length }))
    .sort((a, b) => b.shared - a.shared || a.index - b.index)
    .slice(0, limit)
    .map(({ p }) => p);
};
