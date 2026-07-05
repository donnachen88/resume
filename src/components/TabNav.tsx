import { useRef, useState, useEffect } from 'react';
import { clsx } from 'clsx';

interface TabItem {
  id: string;
  label: string;
}

interface TabNavProps {
  items: TabItem[];
  activeId: string;
  stuck: boolean;
  onTabClick: (id: string) => void;
}

export default function TabNav({
  items,
  activeId,
  stuck,
  onTabClick,
}: TabNavProps) {
  const tabBarRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<string | null>(null);

  useEffect(() => {
    if (!tabBarRef.current) return;
    const updateHeight = () => {
      if (tabBarRef.current) {
        setHeight(tabBarRef.current.offsetHeight);
      }
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  const displayActiveId = clickedId || activeId;

  const handleClick = (id: string) => {
    setClickedId(id);
    onTabClick(id);
    setTimeout(() => setClickedId(null), 800);
  };

  return (
    <div
      className="tab-bar-wrapper relative z-20"
      style={{ height: height ? `${height}px` : undefined }}
    >
      <div
        ref={tabBarRef}
        className={clsx('tab-bar flex items-center justify-center gap-8')}
        style={{
          position: stuck ? 'fixed' : 'relative',
          top: stuck ? 0 : undefined,
          left: stuck ? '50%' : undefined,
          transform: stuck ? 'translateX(-50%)' : undefined,
          width: stuck ? '100%' : undefined,
          maxWidth: stuck ? '720px' : undefined,
          background: stuck ? 'var(--color-bg)' : 'transparent',
          borderBottom: stuck ? '1px solid var(--color-border-light)' : '1px solid transparent',
          boxShadow: stuck ? 'var(--shadow-sm)' : 'none',
          padding: '12px 0',
          zIndex: 20,
          transitionProperty: 'padding, background, box-shadow, border-color',
          transitionDuration: '300ms',
          transitionTimingFunction: 'ease',
        }}
        role="tablist"
      >
        {items.map((item) => {
          const isActive = item.id === displayActiveId;
          return (
            <button
              key={item.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleClick(item.id)}
              className={clsx(
                'tab-item flex flex-col items-center justify-center gap-0.5 border-none bg-transparent',
                'min-h-[44px] min-w-[44px] py-1 px-2',
              )}
              style={{
                fontSize: '16px',
                fontWeight: 'var(--font-bold)',
                color: isActive ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)',
                cursor: 'pointer',
                WebkitTapHighlightColor: 'transparent',
                transition: 'color 200ms ease',
              }}
            >
              <span>{item.label}</span>
              <span
                className="tab-indicator"
                style={{
                  width: isActive ? 16 : 4,
                  height: 4,
                  borderRadius: '2px',
                  background: isActive ? 'var(--color-text-primary)' : 'transparent',
                  transition: 'width 250ms ease, background-color 200ms ease',
                }}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
