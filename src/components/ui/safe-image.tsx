import Image from 'next/image';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  width?: number;
  height?: number;
  onLoad?: React.ReactEventHandler<HTMLImageElement>;
}

export const SafeImage = ({
  src,
  alt,
  className,
  priority = false,
  sizes,
  quality,
  width,
  height,
  onLoad,
}: ImageProps) => {
  const defaultSizes = sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 1200px';
  const objectFitClass = className?.includes('object-contain') ? 'object-contain' : 'object-cover';
  const needsIntrinsicSize = className?.includes('h-auto');

  if (needsIntrinsicSize) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 600}
        className={className}
        priority={priority}
        sizes={defaultSizes}
        quality={quality}
        onLoad={onLoad}
      />
    );
  }

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      <Image
        src={src}
        alt={alt}
        fill
        className={objectFitClass}
        priority={priority}
        sizes={defaultSizes}
        quality={quality}
        onLoad={onLoad}
      />
    </div>
  );
};
