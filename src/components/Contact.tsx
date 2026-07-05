import { Mail, Phone, Globe, MessageCircle, type LucideIcon } from 'lucide-react';
import { resumeData, type ContactItem } from '@/data/resume';
import { useClipboard } from '@/hooks/useClipboard';

const iconMap: Record<ContactItem['icon'], LucideIcon> = {
  mail: Mail,
  phone: Phone,
  globe: Globe,
  messageCircle: MessageCircle,
};

export default function Contact() {
  const { copy } = useClipboard();

  return (
    <section
      className="contact-card relative mx-3 rounded-2xl bg-surface"
      style={{
        marginTop: '-36px',
        padding: '4px 20px',
        boxShadow: 'var(--shadow-card)',
        zIndex: 10,
      }}
      aria-label="联系方式"
    >
      {resumeData.contacts.map((item, idx) => {
        const Icon = iconMap[item.icon];
        const isLast = idx === resumeData.contacts.length - 1;
        const isFirst = idx === 0;
        return (
          <div
            key={idx}
            className="contact-row flex items-center"
            style={{
              padding: '12px 0',
              minHeight: '44px',
              borderBottom: isLast ? 'none' : '1px solid var(--color-border-light)',
              paddingBottom: isLast ? 0 : undefined,
              paddingTop: isFirst ? 0 : undefined,
            }}
          >
            <Icon
              className="contact-icon mr-3 flex-shrink-0"
              size={20}
              strokeWidth={1.8}
              color="var(--color-text-tertiary)"
            />
            <span
              className="contact-text flex-1 truncate"
              style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-regular)',
                color: 'var(--color-text-primary)',
                minWidth: 0,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.text}
            </span>
            <button
              onClick={() => copy(item.text)}
              className="copy-btn ml-3 inline-flex items-center justify-center rounded-full transition-all"
              style={{
                minHeight: '32px',
                minWidth: '48px',
                padding: '0 12px',
                border: '1px solid var(--color-border)',
                background: 'transparent',
                color: 'var(--color-text-secondary)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-medium)',
                flexShrink: 0,
                WebkitTapHighlightColor: 'transparent',
              }}
              aria-label={`复制 ${item.text}`}
            >
              复制
            </button>
          </div>
        );
      })}
    </section>
  );
}
