'use client';

import { useState, useEffect, useRef } from 'react';
import { useTypingAnimation } from '@/hooks/useTypingAnimation';

// Single line component that can be controlled externally
export const TypingTextLine = ({ text, startTyping, onComplete, className = '' }: {
  text: string;
  startTyping: boolean;
  onComplete: () => void;
  className?: string;
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);

  useEffect(() => {
    if (startTyping && !isTyping && !hasCompleted) {
      setIsTyping(true);
      setDisplayedText('');
    }
  }, [startTyping, isTyping, hasCompleted]);

  useEffect(() => {
    if (isTyping && displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1));
      }, 25);
      return () => clearTimeout(timeout);
    } else if (isTyping && displayedText.length === text.length) {
      setIsTyping(false);
      setHasCompleted(true);
      onComplete();
    }
  }, [isTyping, displayedText, text, onComplete]);

  return (
    <span className={className}>
      {hasCompleted ? text : displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Multi-line typing animation (sequential)
export const TypingTextLines = ({ lines, className = '', lineClassName = '', customLineRender }: {
  lines: string[];
  className?: string;
  lineClassName?: string | ((index: number, totalLines: number) => string);
  customLineRender?: (line: string, index: number) => React.ReactNode;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [completedLines, setCompletedLines] = useState<number[]>([]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  const handleLineComplete = (index: number) => {
    setCompletedLines(prev => [...prev, index]);
    if (index < lines.length - 1) {
      setTimeout(() => setCurrentLineIndex(index + 1), 200);
    }
  };

  return (
    <div ref={containerRef} className={`w-full ${className}`}>
      {lines.map((line, index) => {
        const shouldStart = isVisible && index === currentLineIndex && !completedLines.includes(index);

        if (customLineRender) {
          return (
            <div key={index} className={`${lineClassName} relative w-full`} style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
              <span className="invisible block w-full break-words" aria-hidden="true">{line}</span>
              <span className="absolute left-0 top-0 block w-full break-words">
                {customLineRender(line, index)}
              </span>
            </div>
          );
        }

        const spanClasses = typeof lineClassName === 'function' ? lineClassName(index, lines.length) : (lineClassName || '');

        return (
          <div key={index} className="relative w-full" style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
            <span className="invisible block w-full break-words" aria-hidden="true">{line}</span>
            <span className={`absolute left-0 top-0 block w-full break-words ${spanClasses}`}>
              <TypingTextLine
                text={line}
                startTyping={shouldStart}
                onComplete={() => handleLineComplete(index)}
                className=""
              />
            </span>
          </div>
        );
      })}
    </div>
  );
};

// Simple single-line typing animation with IntersectionObserver
export const TypingTextSection = ({ text, className = '' }: { text: string; className?: string }) => {
  const { displayedText, isTyping, containerRef } = useTypingAnimation(text, 25);

  return (
    <span ref={containerRef} className={className}>
      {displayedText}
      {isTyping && <span className="animate-pulse">|</span>}
    </span>
  );
};

// Sequential typing for "Bring your" then "ideas to life" with gradient on "ideas"
export const BringIdeasToLifeTyping = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [line2Start, setLine2Start] = useState(false);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2, rootMargin: '0px' }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isVisible]);

  return (
    <div ref={containerRef} className="w-full">
      {/* Line 1: "Bring your" */}
      <div className="relative block font-light opacity-90 w-full" style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
        <span className="invisible block w-full break-words" aria-hidden="true">Bring your</span>
        <span className="absolute left-0 top-0 block w-full break-words">
          <TypingTextLine
            text="Bring your"
            startTyping={isVisible}
            onComplete={() => {
              setTimeout(() => setLine2Start(true), 200);
            }}
            className=""
          />
        </span>
      </div>
      {/* Line 2: "ideas to life" */}
      <div className="relative block mt-1 sm:mt-1.5 w-full" style={{ minHeight: 'clamp(1.2em, 4vw, 1.5em)' }}>
        <span className="invisible block w-full break-words" aria-hidden="true">
          <span className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal">ideas</span>{' '}
          <span className="font-light">to life</span>
        </span>
        <span className="absolute left-0 top-0 block w-full break-words">
          <TypingTextLine
            text="ideas"
            startTyping={line2Start}
            onComplete={() => {}}
            className="bg-gradient-to-r from-cyan-300 via-purple-300 to-cyan-300 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient font-normal"
          />{' '}
          <TypingTextLine
            text="to life"
            startTyping={line2Start}
            onComplete={() => {}}
            className="font-light"
          />
        </span>
      </div>
    </div>
  );
};
