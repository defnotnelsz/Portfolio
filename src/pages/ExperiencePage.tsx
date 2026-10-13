import React, { useEffect } from 'react';
import { experiences } from '../data/experience';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();

export const ExperiencePage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 max-w-5xl mx-auto py-16 md:py-24">
      <nav className="mb-16 md:mb-24">
        <Link 
          to="/#experience" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
      </nav>

      <div className="mb-20 md:mb-28">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
          [ 02 // CHRONOLOGY &middot; FULL HISTORY ]
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">experience</h1>
        <p className="text-base md:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
          Building across software engineering, AI, and technology leadership &mdash; from freelance development and student organizations to voice-based AI systems and real-world software engineering experience.
        </p>
      </div>

      <div className="relative border-l border-zinc-200 dark:border-zinc-800 ml-4 md:ml-8 space-y-20 py-8">
        {experiences.map((company, i) => (
          <motion.div 
            key={company.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="relative pl-10 md:pl-16"
          >
            {/* Company Marker */}
            <div className="absolute -left-[20px] top-0 w-10 h-10 bg-white dark:bg-[#0a0a0a] border border-zinc-200 dark:border-zinc-800 rounded flex items-center justify-center text-sm font-semibold shadow-xs text-zinc-700 dark:text-zinc-300 z-10 frame-corner">
              {company.marker}
            </div>
            
            {/* Company Header */}
            <div className="mb-10 pt-1">
              <h2 className="text-lg md:text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
                {company.company}
              </h2>
              {(company.employmentType || company.location) && (
                <div className="text-[11px] md:text-xs text-zinc-500 mt-2 flex flex-col md:flex-row md:items-center gap-1 md:gap-2 font-mono">
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
            <div className="space-y-12">
              {company.roles.map((role, j) => (
                <div 
                  key={j} 
                  className={`relative ${company.roles.length > 1 ? 'pl-6 md:pl-8 border-l border-zinc-200 dark:border-zinc-800/50' : ''}`}
                >
                  {/* Nested timeline dot if multiple roles */}
                  {company.roles.length > 1 && (
                    <div className="absolute -left-[5px] top-2.5 w-[9px] h-[9px] rounded-full bg-zinc-200 dark:bg-zinc-800" />
                  )}

                  <h3 className="text-[15px] md:text-base font-medium text-zinc-900 dark:text-zinc-100">
                    {role.title}
                  </h3>
                  <div className="font-mono text-[11px] md:text-xs text-zinc-500 mt-2 mb-4">
                    {role.date}
                  </div>
                  
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-3xl whitespace-pre-line text-[13px] md:text-sm">
                    {role.description}
                  </p>
                  
                  {role.skills && (
                    <div className="flex flex-wrap gap-2 mt-6">
                      {role.skills.map((skill, k) => (
                        <motion.span 
                          key={skill}
                          initial={{ opacity: 0, scale: 0.95 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: k * 0.05 }}
                          className="px-2.5 py-1 text-[10px] md:text-[11px] border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 font-medium font-mono"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      <footer className="mt-32 py-12 border-t border-zinc-200 dark:border-zinc-800/50 text-[11px] md:text-xs text-zinc-500 font-mono flex justify-between">
        <span>&copy; {currentYear} Janelie Sayson Blanco.</span>
        <span>Professional Portfolio</span>
      </footer>
    </div>
  );
};
