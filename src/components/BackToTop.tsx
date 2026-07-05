import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const scrollY = window.pageYOffset || document.documentElement.scrollTop;
      setVisible(scrollY > window.innerHeight);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="回到顶部"
      className="back-to-top fixed z-40 flex items-center justify-center rounded-full transition-all"
      style={{
        bottom: '32px',
        right: '20px',
        width: '44px',
        height: '44px',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border-light)',
        boxShadow: 'var(--shadow-md)',
        cursor: 'pointer',
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? 'auto' : 'none',
        transform: visible ? 'scale(1)' : 'scale(0.92)',
        transitionProperty: 'opacity, transform',
        transitionDuration: '250ms',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      <ArrowUp
        size={20}
        strokeWidth={2}
        color="var(--color-text-primary)"
      />
    </button>
  );
}
