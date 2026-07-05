import { useState, useEffect, useRef, useCallback } from 'react';

interface ScrollSpyOptions {
  /** offset from top in px that triggers active state */
  topOffset?: number;
  /** throttle via requestAnimationFrame */
  enabled?: boolean;
}

/**
 * Tracks which section is currently active based on scroll position.
 * Returns the active section id + a ref to register sections.
 */
export function useScrollSpy(
  sectionIds: string[],
  options: ScrollSpyOptions = {},
) {
  const { topOffset = 120, enabled = true } = options;
  const [activeId, setActiveId] = useState<string>(sectionIds[0] ?? '');
  const tickingRef = useRef(false);

  const update = useCallback(() => {
    let current = sectionIds[0] ?? '';
    for (const id of sectionIds) {
      const el = document.getElementById(id);
      if (!el) continue;
      const rect = el.getBoundingClientRect();
      if (rect.top <= topOffset) {
        current = id;
      }
    }
    setActiveId(current);
    tickingRef.current = false;
  }, [sectionIds, topOffset]);

  useEffect(() => {
    if (!enabled) return;
    const onScroll = () => {
      if (!tickingRef.current) {
        window.requestAnimationFrame(update);
        tickingRef.current = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, [update, enabled]);

  return activeId;
}
