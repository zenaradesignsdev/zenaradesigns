// Image loading utility for better performance
export const preloadImage = (src: string): Promise<HTMLImageElement> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
    // Add decoding attribute for better performance
    img.decoding = 'async';
  });
};

// Preload critical images
export const preloadCriticalImages = async () => {
  const criticalImages = [
    '/src/assets/new-zenara-logo.svg',
    '/src/assets/saturn.png',
    '/src/assets/moon.png'
  ];

  try {
    await Promise.all(criticalImages.map(preloadImage));
  } catch (error) {
    console.warn('Failed to preload some critical images:', error);
  }
};

// Add loaded class to lazy images
export const handleLazyImageLoad = (img: HTMLImageElement) => {
  img.classList.add('loaded');
};

// Initialize lazy loading for images
export const initLazyLoading = () => {
  const lazyImages = document.querySelectorAll('img[loading="lazy"]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.addEventListener('load', () => handleLazyImageLoad(img));
        imageObserver.unobserve(img);
      }
    });
  });

  lazyImages.forEach((img) => imageObserver.observe(img));
};
