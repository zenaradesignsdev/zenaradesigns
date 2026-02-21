import { useState, useEffect, useRef } from 'react';

export const useTypingAnimation = (text: string, speed: number = 25) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const containerRef = useRef<HTMLSpanElement>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasStartedRef.current) {
            hasStartedRef.current = true;
            setIsTyping(true);
            setDisplayedText('');
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px'
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (isTyping && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, speed);

      return () => clearTimeout(timeout);
    } else if (isTyping && displayedText.length === text.length) {
      setIsTyping(false);
      setHasCompleted(true);
    }
  }, [isTyping, displayedText, text, speed]);

  return { displayedText: hasCompleted ? text : displayedText, isTyping, containerRef };
};
