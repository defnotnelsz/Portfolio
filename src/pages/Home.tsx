import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Hero } from '../components/Hero';
import { Projects } from '../components/Projects';
import { Experience } from '../components/Experience';
import { Stack } from '../components/Stack';
import { TypingTest } from '../components/TypingTest';
import { Contact } from '../components/Contact';
import { useActiveSection } from '../hooks/useActiveSection';
import { scrollToHash } from '../utils/scrollToHash';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'typing-test', label: 'Typing Test' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = ['home', 'projects', 'experience', 'stack', 'typing-test', 'contact'];
const currentYear = new Date().getFullYear();

export const Home = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(SECTION_IDS);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash === '#about') {
      navigate('/about');
      return;
    }
    if (location.hash) {
      const cleanup = scrollToHash(location.hash);
      return cleanup;
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname, navigate]);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800 flex justify-center">
      <div className="w-full max-w-[1380px] flex min-h-screen relative">
        <Sidebar 
          sections={sections} 
          activeSection={activeSection} 
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main className="flex-1 min-w-0 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14">
          <Hero />
          <Projects />
          <Experience />
          <Stack />
          <TypingTest />
          <Contact />
          
          <footer className="py-10 border-t border-zinc-200 dark:border-zinc-800/50 text-[11px] md:text-xs text-zinc-500 font-mono flex justify-between">
            <span>&copy; {currentYear} Janelie Sayson Blanco.</span>
            <span>Professional Portfolio</span>
          </footer>
        </main>
      </div>
    </div>
  );
};
