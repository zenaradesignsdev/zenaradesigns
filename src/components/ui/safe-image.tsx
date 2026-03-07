interface ImageProps {
  src: string; // e.g., import myImg from './assets/photo.png'
  alt: string;
  className?: string;
  priority?: boolean; // If true, it's for Hero images
  sizes?: string; // Optional custom sizes attribute
}

export const SafeImage = ({ src, alt, className, priority = false, sizes }: ImageProps) => {
  // Generate responsive srcsets with multiple widths
  // vite-imagetools generates 3 image variants: 400px (mobile), 800px (tablet), 1200px (desktop)
  const avifSet = `${src}?w=400;800;1200&format=avif&as=srcset`;
  const webpSet = `${src}?w=400;800;1200&format=webp&as=srcset`;
  
  // Default sizes attribute (can be overridden via prop)
  // Mobile: full width, Tablet: 50% width, Desktop: max 1200px
  const defaultSizes = sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px";

  return (
    <picture className={className}>
      <source srcSet={avifSet} type="image/avif" sizes={defaultSizes} />
      <source srcSet={webpSet} type="image/webp" sizes={defaultSizes} />
      <img
        src={`${src}?w=800`} // Fallback: 800px width for browsers without srcset support
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={className ? `w-full h-auto ${className}` : 'w-full h-auto'}
        sizes={defaultSizes}
      />
    </picture>
  );
};
