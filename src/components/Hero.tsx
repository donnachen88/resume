import { useEffect, useRef, useState, useCallback } from 'react';
import { Download } from 'lucide-react';
import { resumeData } from '@/data/resume';

const SLIDE_COUNT = resumeData.profile.heroImages.length;

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState<boolean[]>(() => SLIDE_COUNT > 0 ? Array(SLIDE_COUNT).fill(false) : []);
  const heroRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const isSwiping = useRef(false);

  // Preload hero images and trigger entrance animation
  useEffect(() => {
    resumeData.profile.heroImages.forEach((item, idx) => {
      const img = new Image();
      img.src = item.src;
      const markLoaded = () =>
        setLoaded((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
      if (img.complete) {
        requestAnimationFrame(markLoaded);
      } else {
        img.onload = markLoaded;
        // Fallback: force show after 800ms
        setTimeout(() => {
          setLoaded((prev) => (prev[idx] ? prev : (() => {
            const next = [...prev];
            next[idx] = true;
            return next;
          })()));
        }, 800);
      }
    });
  }, []);

  const goToSlide = useCallback((index: number) => {
    if (SLIDE_COUNT === 0) return;
    let next = index;
    if (next < 0) next = SLIDE_COUNT - 1;
    if (next >= SLIDE_COUNT) next = 0;
    setCurrentSlide(next);
  }, []);

  // Touch / swipe handling
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    isSwiping.current = false;
  };
  const onTouchMove = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - touchStartX.current;
    const dy = e.touches[0].clientY - touchStartY.current;
    if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 10) {
      isSwiping.current = true;
    }
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (dx < -40) goToSlide(currentSlide + 1);
    else if (dx > 40) goToSlide(currentSlide - 1);
  };

  const { profile } = resumeData;

  return (
    <section
      ref={heroRef}
      className="hero-immersive relative w-full overflow-hidden"
      style={{ height: 'clamp(450px, 60vh, 560px)' }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      aria-label="个人介绍"
    >
      {/* Slider track */}
      <div
        className="hero-slider flex h-full"
        style={{
          width: `${SLIDE_COUNT * 100}%`,
          transform: `translateX(-${currentSlide * (100 / SLIDE_COUNT)}%)`,
          transition: 'transform 400ms ease-out',
        }}
      >
        {profile.heroImages.map((img, idx) => (
          <div
            key={idx}
            className="hero-slide relative h-full flex-shrink-0 overflow-hidden"
            style={{ width: `${100 / SLIDE_COUNT}%` }}
          >
            <div
              className="hero-slide__image absolute inset-0"
              style={{
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center 30%',
                backgroundRepeat: 'no-repeat',
                transform: loaded[idx] ? 'scale(1)' : 'scale(1.03)',
                opacity: loaded[idx] ? 1 : 0,
                transition: 'transform 600ms ease-out, opacity 600ms ease-out',
              }}
              aria-label={img.alt}
            />
            {/* Blurred copy for progressive blur effect (works on all browsers) */}
            <div
              className="hero-slide__blur pointer-events-none absolute left-0 right-0 bottom-0"
              style={{
                height: '60%',
                backgroundImage: `url(${img.src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundRepeat: 'no-repeat',
                filter: 'blur(100px)',
                WebkitFilter: 'blur(100px)',
                transform: 'scale(1.2)',
                opacity: loaded[idx] ? 1 : 0,
                transition: 'opacity 600ms ease-out',
                maskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,1) 100%)',
              }}
            />
          </div>
        ))}
      </div>

      {/* Gradient overlay */}
      <div
        className="hero-immersive__gradient pointer-events-none absolute inset-0 z-[2]"
        style={{
          background: 'var(--hero-gradient)',
        }}
      />

      {/* Slide indicators — top left, vertically aligned with PDF button */}
      {SLIDE_COUNT > 1 && (
        <div className="hero-slide-dots absolute left-5 z-[4] flex items-center gap-2" style={{ top: 31 }}>
          {profile.heroImages.map((_, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className="hero-slide-dot transition-all"
              style={{
                width: idx === currentSlide ? 16 : 6,
                height: 6,
                borderRadius: idx === currentSlide ? 3 : '50%',
                background: idx === currentSlide ? '#ffffff' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              aria-label={`切换到第 ${idx + 1} 张图片`}
            />
          ))}
        </div>
      )}

      {/* Content overlay */}
      <div className="hero-immersive__content absolute inset-x-0 bottom-14 z-[3] px-3 text-center">
        <div className="hero-immersive__name mb-2" style={{ fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-bold)', color: 'var(--color-text-primary)', lineHeight: 'var(--leading-tight)' }}>
          {profile.name}
        </div>
        <div className="hero-immersive__role mb-2" style={{ fontSize: 'var(--text-base)', fontWeight: 'var(--font-medium)', color: 'var(--color-text-secondary)', lineHeight: 'var(--leading-normal)' }}>
          {profile.role}
        </div>
        <div className="hero-immersive__tagline mb-4" style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-light)', color: 'var(--color-text-tertiary)', lineHeight: 'var(--leading-normal)' }}>
          {profile.tagline}
        </div>
        <div
          className="hero-immersive__tags flex items-center justify-center"
          style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--color-text-secondary)',
            lineHeight: 'var(--leading-normal)',
          }}
        >
          {profile.tags.split(/[｜|]/).map((t, i, arr) => (
            <span key={i} className="flex items-center">
              <span className="shrink-0">{t.trim()}</span>
              {i < arr.length - 1 && (
                <span
                  aria-hidden
                  className="mx-3 flex-shrink-0"
                  style={{
                    width: 1,
                    height: 12,
                    background: 'var(--color-border-light)',
                    borderRadius: 1,
                  }}
                />
              )}
            </span>
          ))}
        </div>
      </div>

      {/* Download PDF button */}
      <a
        href="/陈豆豆-产品设计师.pdf"
        download
        className="download-btn absolute right-5 top-5 z-50 inline-flex items-center gap-1 rounded-full px-4 py-2 text-xs font-medium transition-all"
        style={{
          background: 'var(--glass-bg)',
          backdropFilter: 'var(--glass-blur)',
          WebkitBackdropFilter: 'var(--glass-blur)',
          border: '1px solid var(--glass-border)',
          color: 'var(--color-text-primary)',
          textDecoration: 'none',
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label="下载 PDF"
      >
        <Download width={14} height={14} strokeWidth={2} />
        PDF
      </a>
    </section>
  );
}
