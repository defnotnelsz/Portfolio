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
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
              [ 03 // TECHNICAL INVENTORY &middot; FULL STACK ]
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">tech stack</h1>
            <p className="text-[15px] md:text-[17px] leading-relaxed max-w-2xl text-zinc-600 dark:text-zinc-400">
              The tools, frameworks, and platforms I reach for — across the front end, back end, infrastructure, and AI.
            </p>
          </div>

          <div className="space-y-12 md:space-y-16">
            {stack.map((category, i) => (
              <motion.section 
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 bg-white dark:bg-[#0a0a0a] frame-corner"
              >
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-100 dark:border-zinc-900 font-mono text-xs">
                  <h2 className="font-semibold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
                    [ 0{i + 1} // {category.category} ]
                  </h2>
                  <span className="text-zinc-400 dark:text-zinc-500">
                    {category.items.length} tools
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2.5 md:gap-3">
                  {category.items.map((item) => (
                    <span 
                      key={item}
                      className="px-3.5 py-1.5 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xs font-mono text-xs md:text-sm text-zinc-700 dark:text-zinc-300 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
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
