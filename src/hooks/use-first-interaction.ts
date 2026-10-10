import { useState, useEffect } from 'react';

// Pointer/touch/key/scroll, plus mousemove so desktop visitors who only move
// the mouse still count. Lighthouse never fires any of these.
const INTERACTION_EVENTS = [
  'pointerdown',
  'touchstart',
  'keydown',
  'scroll',
  'mousemove',
] as const;

/**
 * Becomes true on the visitor's first interaction with the page. Used to defer
 * heavy third-party scripts (analytics, chat) so they stay out of page-load
 * metrics such as Lighthouse TBT.
 */
export function useFirstInteraction() {
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const onInteract = () => {
      setHasInteracted(true);
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, onInteract));
    };
    INTERACTION_EVENTS.forEach((e) =>
      window.addEventListener(e, onInteract, { once: true, passive: true })
    );
    return () => INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, onInteract));
  }, []);

  return hasInteracted;
}
