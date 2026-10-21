import React, { useEffect, useState } from 'react';
import { stack } from '../data/stack';
import { motion } from 'framer-motion';
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

export const StackPage: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] text-zinc-100 font-sans selection:bg-zinc-800 flex justify-center">
      <div className="w-full max-w-[1380px] flex min-h-screen relative">
        <Sidebar 
          sections={sections} 
          activeSection="stack"
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
        
        <main className="flex-1 min-w-0 px-5 sm:px-8 md:px-10 lg:px-12 xl:px-14">
          <div className="py-12 md:py-16 max-w-4xl">
            <nav className="mb-10 md:mb-16">
              <Link 
                to="/#stack" 
                className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
              >
                <ArrowLeft size={16} />
                Back to portfolio
              </Link>
            </nav>

            <div className="mb-14 md:mb-18">
              <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                [ 03 // TECHNICAL INVENTORY &middot; FULL STACK ]
              </div>
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">tech stack</h1>
              <p className="text-[14px] md:text-base leading-relaxed max-w-2xl text-zinc-600 dark:text-zinc-400">
                The tools, frameworks, and platforms I reach for — across the front end, back end, infrastructure, and AI.
              </p>
            </div>

            <div className="space-y-8 md:space-y-12">
              {stack.map((category, i) => (
                <motion.section 
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="border border-zinc-200 dark:border-zinc-800 p-5 md:p-7 bg-white dark:bg-[#0a0a0a] frame-corner"
                >
                  <div className="flex items-center justify-between pb-3.5 mb-5 border-b border-zinc-100 dark:border-zinc-900 font-mono text-xs">
                    <h2 className="font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                      [ 0{i + 1} // {category.category} ]
                    </h2>
                    <span className="text-zinc-400 dark:text-zinc-500">
                      {category.items.length} tools
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 md:gap-2.5">
                    {category.items.map((item) => (
                      <span 
                        key={item}
                        className="px-3 py-1 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xs font-mono text-xs md:text-[13px] text-zinc-700 dark:text-zinc-300 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.section>
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
