import React, { useEffect, useState } from 'react';
import { experiences } from '../data/experience';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'stack', label: 'Stack' },
  { id: 'typing-test', label: 'Typing Test' },
  { id: 'contact', label: 'Contact' },
];

const currentYear = new Date().getFullYear();

export const ExperiencePage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800 flex justify-center">
      <div className="w-full max-w-[1380px] flex min-h-screen relative">
        <Sidebar 
          sections={sections} 
          activeSection="experience"
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main className="flex-1 min-w-0 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14">
          <div className="py-12 md:py-16 max-w-4xl">
            <nav className="mb-10 md:mb-16">
              <Link 
                to="/#experience" 
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors text-sm font-medium font-mono"
              >
                <ArrowLeft size={16} />
                Back to portfolio
              </Link>
            </nav>

            <div className="mb-14 md:mb-20">
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                [ 02 // CHRONOLOGY &middot; FULL HISTORY ]
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">experience</h1>
              <p className="text-[14px] md:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
                Building across software engineering, AI, and technology leadership &mdash; from freelance development and student organizations to voice-based AI systems and real-world software engineering experience.
              </p>
            </div>

            <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-5 md:ml-8 space-y-12 md:space-y-16 py-4">
              {experiences.map((company) => (
                <div 
                  key={company.id}
                  className="relative pl-10 md:pl-14"
                >
                  {/* Company Marker - centered on the vertical timeline border */}
                  <div className="absolute -left-[20px] top-0 w-10 h-10 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-center text-xs md:text-sm font-mono font-semibold shadow-xs text-zinc-700 dark:text-zinc-300 z-10 frame-corner shrink-0 select-none">
                    {company.marker}
                  </div>
                  
                  {/* Company Header */}
                  <div className="mb-6 pt-1">
                    <h2 className="text-base md:text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-100 leading-snug">
                      {company.company}
                    </h2>
                    {(company.employmentType || company.location) && (
                      <div className="text-[11px] md:text-xs text-zinc-500 mt-1.5 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 font-mono">
                        {company.employmentType && (
                          <span>
                            {company.employmentType} {company.duration && `\u00b7 ${company.duration}`}
                          </span>
                        )}
                        {company.employmentType && company.location && <span className="hidden md:inline">&middot;</span>}
                        {company.location && <span>{company.location}</span>}
                      </div>
                    )}
                  </div>
                  
                  {/* Roles List */}
                  <div className="space-y-8 md:space-y-10">
                    {company.roles.map((role, j) => (
                      <div 
                        key={j} 
                        className={`relative ${company.roles.length > 1 ? 'pl-6 md:pl-8 border-l border-zinc-200 dark:border-zinc-800/50' : ''}`}
                      >
                        {/* Nested timeline dot if multiple roles */}
                        {company.roles.length > 1 && (
                          <div className="absolute -left-[5px] top-2.5 w-[9px] h-[9px] rounded-full bg-zinc-300 dark:bg-zinc-700" />
                        )}

                        <h3 className="text-[14px] md:text-[15px] font-medium text-zinc-900 dark:text-zinc-100">
                          {role.title}
                        </h3>
                        <div className="font-mono text-[10px] md:text-[11px] text-zinc-500 mt-1 mb-3">
                          {role.date}
                        </div>
                        
                        <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed max-w-3xl whitespace-pre-line text-[13px] md:text-sm">
                          {role.description}
                        </p>
                        
                        {role.skills && role.skills.length > 0 && (
                          <div className="flex flex-wrap gap-1.5 mt-4">
                            {role.skills.map((skill) => (
                              <span 
                                key={skill}
                                className="px-2 py-0.5 text-[10px] md:text-[11px] border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 font-medium font-mono bg-zinc-50/50 dark:bg-zinc-900/30"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <footer className="mt-24 py-10 border-t border-zinc-200 dark:border-zinc-800/50 text-[11px] md:text-xs text-zinc-500 font-mono flex justify-between">
              <span>&copy; {currentYear} Janelie Sayson Blanco.</span>
              <span>Professional Portfolio</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
};
