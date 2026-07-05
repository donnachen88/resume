import { Briefcase } from 'lucide-react';
import { resumeData, type SkillTag } from '@/data/resume';

function SkillTagPill({ tag }: { tag: SkillTag }) {
  return (
    <span
      className="skill-tag inline-flex items-center rounded-full transition-all"
      style={{
        padding: '2px 12px',
        fontSize: '14px',
        fontWeight: 'var(--font-regular)',
        color: tag.highlighted
          ? 'var(--color-text-primary)'
          : 'var(--color-text-body)',
        background: tag.highlighted
          ? 'var(--color-surface)'
          : 'var(--color-bg-tertiary)',
        border: tag.highlighted
          ? '1px solid var(--color-border)'
          : '1px solid transparent',
      }}
    >
      {tag.name}
    </span>
  );
}

export default function Experience() {
  return (
    <section id="section-experience" className="experience-section px-3 mb-8">
      <div
        className="section-title mb-3 flex items-center gap-2"
        style={{ padding: '0 12px 0 20px' }}
      >
        <Briefcase
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
          工作经历
        </span>
      </div>

      {resumeData.experiences.map((exp, idx) => (
        <div key={idx} className="timeline-item mb-5 last:mb-0">
          <div
            className="experience-card rounded-2xl bg-surface"
            style={{
              padding: '12px 20px 20px 20px',
              boxShadow: 'var(--shadow-card)',
            }}
          >
            <div
              className="experience-company mb-1"
              style={{
                fontSize: 'var(--text-base)',
                fontWeight: 'var(--font-semibold)',
                color: 'var(--color-text-primary)',
              }}
            >
              {exp.company}
            </div>
            <div
              className="experience-period mb-3"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-regular)',
                color: 'var(--color-text-body)',
              }}
            >
              {exp.period}
            </div>

            {(() => {
              const reordered = [
                { ...exp.phases[1], label: '阶段一 · 视觉设计师' },
                { ...exp.phases[0], label: '阶段二 · 产品设计师' },
              ];
              return reordered.map((phase, pIdx) => (
                <div key={pIdx}>
                  {pIdx > 0 && (
                    <div className="my-5 flex items-center">
                      <div
                        className="h-px flex-1"
                        style={{
                          background: 'var(--color-border-light)',
                          borderRadius: '1px',
                        }}
                      />
                    </div>
                  )}
                  <div
                    className="phase-label mb-2 mt-5 flex items-center first:mt-0"
                    style={{
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-semibold)',
                      color: 'var(--color-text-primary)',
                    }}
                  >
                    <span
                      aria-hidden
                      className="mr-1.5 flex-shrink-0 rounded"
                      style={{
                        width: 3,
                        height: 14,
                        background: 'var(--color-text-primary)',
                        borderRadius: 2,
                      }}
                    />
                    <span className="flex-1">{phase.label}</span>
                  </div>
                  <ul className="experience-desc m-0 list-none pl-0">
                    {phase.descriptions.map((d, dIdx) => (
                      <li
                        key={dIdx}
                        className="mb-1 last:mb-0 ml-[9px]"
                        style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: /^[①②]/.test(d) ? 'var(--font-semibold)' : 'var(--font-light)',
                          color: 'var(--color-text-body)',
                          lineHeight: 'var(--leading-relaxed)',
                        }}
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                  <div
                    className="experience-skills mt-2 ml-[9px] flex flex-wrap gap-2"
                  >
                    {phase.skills.map((tag, tIdx) => (
                      <SkillTagPill key={tIdx} tag={tag} />
                    ))}
                  </div>
                </div>
              ));
            })()}
          </div>
        </div>
      ))}
    </section>
  );
}
