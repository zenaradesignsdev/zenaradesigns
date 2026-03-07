interface ImageProps {
  src: string; // The base path to your PNG in src/assets
  alt: string;
  className?: string;
  priority?: boolean; // If true, it's for Hero images
}

export const SafeImage = ({ src, alt, className, priority = false }: ImageProps) => {
  // These are handled by vite-imagetools at build time
  const avif = `${src}?format=avif`;
  const webp = `${src}?format=webp`;

  return (
    <picture className={className}>
      <source srcSet={avif} type="image/avif" />
      <source srcSet={webp} type="image/webp" />
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className ? `w-full h-auto ${className}` : 'w-full h-auto'}
      />
    </picture>
  );
};
