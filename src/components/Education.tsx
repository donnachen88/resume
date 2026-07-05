import { GraduationCap } from 'lucide-react';
import { resumeData } from '@/data/resume';

export default function Education() {
  return (
    <section id="section-education" className="education-section px-3 mb-8">
      <div
        className="section-title mb-3 flex items-center gap-2"
        style={{ padding: '0 12px 0 20px' }}
      >
        <GraduationCap
          className="section-title-icon"
          size={22}
          strokeWidth={2}
          color="var(--color-text-primary)"
        />
        <span
          style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-text-primary)',
          }}
        >
          教育背景
        </span>
      </div>

      <div
        className="education-card rounded-2xl bg-surface"
        style={{
          padding: '12px 20px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        {resumeData.educations.map((edu, idx) => (
          <div key={idx}>
            {idx > 0 && (
              <div
                aria-hidden
                style={{
                  height: 1,
                  margin: '12px 0',
                  background: 'var(--color-border-light)',
                  borderRadius: 1,
                }}
              />
            )}
            {/* Row 1: school + degree (right-aligned) */}
            <div
              className="education-row1 flex items-center justify-between mb-2"
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-text-primary)',
              }}
            >
              <span>{edu.school}</span>
              <span>{edu.degree}</span>
            </div>
            {/* Row 2: period | major */}
            <div
              className="education-row2 flex items-center"
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--color-text-body)',
              }}
            >
              <span className="shrink-0">{edu.period}</span>
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
              <span className="shrink-0">{edu.major}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}