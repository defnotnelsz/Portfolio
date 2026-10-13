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
    if (location.pathname !== '/') {
      navigate('/#' + id);
      setIsMobileMenuOpen(false);
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsMobileMenuOpen(false);
    }
  };

  const navContent = (
    <div className="flex flex-col h-full">
      <div className="mb-12">
        <h1 className="text-lg font-medium tracking-tight">Janelie Blanco</h1>
      </div>

      <nav className="flex-1 space-y-4 flex flex-col">
        {sections.map((section) => (
          <button
            type="button"
            key={section.id}
            onClick={() => scrollTo(section.id)}
            className={clsx(
              "text-left flex items-center gap-3 transition-colors duration-200 w-fit text-[14px]",
              activeSection === section.id 
                ? "text-zinc-900 dark:text-zinc-100 font-medium" 
                : "text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
            )}
          >
            <span className="w-4 inline-block flex-shrink-0 transition-opacity duration-200 font-mono text-sm">
              {activeSection === section.id ? '\u2192' : ' '}
            </span>
            {section.label}
          </button>
        ))}
      </nav>

      <div className="mt-12 space-y-6">
        <ThemeToggle />
        <div>
          <a href={`mailto:${email}`} className="text-[11px] md:text-xs font-mono text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors">
            {email}
          </a>
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
      <aside className="hidden md:block fixed top-0 left-0 h-screen w-56 lg:w-64 border-r border-zinc-200 dark:border-zinc-800/50 p-8 py-12">
        {navContent}
      </aside>
    </>
  );
};
