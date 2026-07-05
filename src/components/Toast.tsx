import { useToastStore } from '@/store/toast';

export default function Toast() {
  const { message, visible } = useToastStore();

  return (
    <div
      className="toast fixed z-[100] whitespace-nowrap rounded-full"
      style={{
        top: '60px',
        left: '50%',
        transform: visible
          ? 'translateX(-50%) translateY(0)'
          : 'translateX(-50%) translateY(-8px)',
        padding: '8px 20px',
        background: 'var(--color-text-primary)',
        color: 'var(--color-text-inverse)',
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-medium)',
        boxShadow: 'var(--shadow-md)',
        opacity: visible ? 1 : 0,
        pointerEvents: 'none',
        transitionProperty: 'opacity, transform',
        transitionDuration: '150ms',
      }}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
