import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds: string[]) {
  const [activeSection, setActiveSection] = useState<string>(sectionIds[0] ?? '');
  const sectionIdsKey = sectionIds.join(',');

  useEffect(() => {
    const ids = sectionIdsKey ? sectionIdsKey.split(',') : [];
    let ticking = false;

    const updateActiveSection = () => {
      let currentSection = ids[0] ?? '';
      
      // Check if we're at the bottom of the page
      const isAtBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 50;
      if (isAtBottom && ids.length > 0) {
        setActiveSection(ids[ids.length - 1]);
        ticking = false;
        return;
      }

      // Find the last section whose top is above the reading line (1/3rd of viewport height)
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 3) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Trigger once on mount
    updateActiveSection();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIdsKey]);

  return activeSection;
}
