import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * Returns true when the target element has scrolled fully out of view (its bottom is <= 0).
 */
export function useStickyAfter(targetRef: React.RefObject<HTMLElement | null>) {
  const [stuck, setStuck] = useState(false);
  const tickingRef = useRef(false);

  const update = useCallback(() => {
    if (!targetRef.current) return;
    const heroBottom = targetRef.current.getBoundingClientRect().bottom;
    setStuck(heroBottom <= 0);
    tickingRef.current = false;
  }, [targetRef]);

  useEffect(() => {
    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(update);
        tickingRef.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [update]);

  return { stuck };
}
