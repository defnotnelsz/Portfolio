import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Stack } from '../components/Stack';
import { TypingTest } from '../components/TypingTest';
import { Contact } from '../components/Contact';
import { useActiveSection } from '../hooks/useActiveSection';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'typing-test', label: 'Typing Test' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = sections.map((s) => s.id);
const currentYear = new Date().getFullYear();

export const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  return (
    <>
      <Sidebar 
        sections={sections} 
        activeSection={activeSection} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="md:ml-56 lg:ml-64 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl">
        <Hero />
        <Projects />
        <Experience />
        <Stack />
        <TypingTest />
        <Contact />
        
        <footer className="py-12 border-t border-zinc-200 dark:border-zinc-800/50 text-[11px] md:text-xs text-zinc-500 font-mono flex justify-between">
          <span>&copy; {currentYear} Janelie Sayson Blanco.</span>
          <span>Professional Portfolio</span>
        </footer>
      </main>
    </>
  );
};
