import { useCallback, useRef } from 'react';
import Hero from '@/components/Hero';
import Contact from '@/components/Contact';
import TabNav from '@/components/TabNav';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Footer from '@/components/Footer';
import BackToTop from '@/components/BackToTop';
import Toast from '@/components/Toast';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import { useStickyAfter } from '@/hooks/useStickyAfter';
import avatar from '../images/avatar.jpg'

const SECTION_IDS = ['section-experience', 'section-education'];
const TAB_ITEMS = [
  { id: 'section-experience', label: '工作经历' },
  { id: 'section-education', label: '教育背景' },
];

export default function Home() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const { stuck } = useStickyAfter(heroWrapperRef);
  const activeId = useScrollSpy(SECTION_IDS, { topOffset: 120 });

  const handleTabClick = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const tabBarHeight = 60;
    const top = el.getBoundingClientRect().top + window.pageYOffset - tabBarHeight;
    window.scrollTo({ top, behavior: 'smooth' });
  }, []);

  return (
    <main className="page-container min-h-screen font-sans antialiased">
      <div ref={heroWrapperRef}>
        <Hero />
      </div>

      <Contact />

      <TabNav
        items={TAB_ITEMS}
        activeId={activeId}
        stuck={stuck}
        onTabClick={handleTabClick}
      />

      <Experience />
      <Education />
      <Footer />

      <BackToTop />
      <Toast />
    </main>
  );
}
