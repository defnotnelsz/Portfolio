import React from 'react';
import { clsx } from 'clsx';
import { ThemeToggle } from './ThemeToggle';
import { email } from '../data/socials';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface SidebarProps {
  sections: { id: string; label: string }[];
  activeSection: string;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ sections, activeSection, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);

    if (id === 'home') {
      if (location.pathname !== '/' || (location.hash && location.hash !== '#home')) {
        navigate('/#home');
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      return;
    }

    const targetHash = `#${id}`;
    if (location.pathname !== '/' || location.hash !== targetHash) {
      navigate(`/#${id}`);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const navContent = (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="mb-10 pb-6 border-b border-zinc-200/70 dark:border-zinc-800/70">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-500" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
              PORTFOLIO // 2026
            </span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Janelie Blanco
          </h1>
        </div>

        <nav className="space-y-2 flex flex-col" aria-label="Main Navigation">
          {sections.map((section, idx) => {
            const isActive = activeSection === section.id;
            return (
              <button
                type="button"
                key={section.id}
                onClick={() => scrollTo(section.id)}
                className={clsx(
                  "group text-left flex items-center justify-between transition-all duration-200 w-full text-[13px] md:text-[14px] py-1.5 px-2 rounded-sm",
                  isActive
                    ? "text-zinc-900 dark:text-zinc-100 font-medium bg-zinc-100 dark:bg-zinc-900/80" 
                    : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30"
                )}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-3.5 inline-block flex-shrink-0 transition-opacity duration-200 font-mono text-xs text-zinc-900 dark:text-zinc-100">
                    {isActive ? '\u2192' : ' '}
                  </span>
                  <span>{section.label}</span>
                </div>
                <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600 transition-colors group-hover:text-zinc-500">
                  0{idx}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="pt-8 border-t border-zinc-200/70 dark:border-zinc-800/70 space-y-5">
        <ThemeToggle />
        <div className="space-y-1">
          <div className="font-mono text-[10px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            CONTACT
          </div>
          <a 
            href={`mailto:${email}`} 
            className="block text-[11px] md:text-xs font-mono text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors truncate"
          >
            {email}
          </a>
        </div>
        <div className="font-mono text-[10px] text-zinc-400 dark:text-zinc-600">
          Cebu, Philippines
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md z-40 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between px-6">
        <h1 className="text-lg font-medium">Janelie Blanco</h1>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle Menu">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-30 bg-white dark:bg-[#0a0a0a] pt-24 px-6 pb-6 overflow-y-auto">
          {navContent}
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-56 lg:w-64 border-r border-zinc-200 dark:border-zinc-800/50 p-8 py-12 z-30">
        {navContent}
      </aside>
    </>
  );
};
