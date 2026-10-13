import React, { useEffect, useState } from 'react';
import { stack } from '../data/stack';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

const sections = [
  { id: 'home', label: 'Home' },
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
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Sidebar 
        sections={sections} 
        activeSection="stack"
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      <main className="md:ml-56 lg:ml-64 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl">
        <div className="py-16 md:py-24 max-w-4xl">
          <nav className="mb-16 md:mb-24">
            <Link 
              to="/#stack" 
              className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
            >
              <ArrowLeft size={16} />
              Back to portfolio
            </Link>
          </nav>

          <div className="mb-20 md:mb-24">
            <h1 className="text-3xl md:text-4xl font-medium tracking-tight mb-8">tech stack</h1>
            <p className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl text-zinc-600 dark:text-zinc-400">
              The tools, frameworks, and platforms I reach for — across the front end, back end, infrastructure, and AI.
            </p>
          </div>

          <div className="space-y-24 md:space-y-32">
            {stack.map((category, i) => (
              <motion.section 
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
              >
                <h2 className="text-sm md:text-[15px] font-semibold mb-8 uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-mono">
                  {category.category}
                </h2>
                
                <div className="flex flex-wrap gap-3 md:gap-4">
                  {category.items.map((item) => (
                    <span 
                      key={item}
                      className="px-4 py-2 border border-zinc-200 dark:border-zinc-800/80 rounded-md font-mono text-[13px] md:text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0a0a0a]"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </div>

        <footer className="mt-32 py-12 border-t border-zinc-200 dark:border-zinc-800/50 text-[11px] md:text-xs text-zinc-500 font-mono flex justify-between max-w-4xl">
          <span>&copy; {currentYear} Janelie Sayson Blanco.</span>
          <span>Professional Portfolio</span>
        </footer>
      </main>
    </>
  );
};
