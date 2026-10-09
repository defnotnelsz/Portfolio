import React from 'react';
import { stack } from '../data/stack';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Stack: React.FC = () => {
  // Select a compact subset from the centralized data
  const previewItems = stack.flatMap(category => category.items.slice(0, 3)).slice(0, 11);

  return (
    <section id="stack" className="py-24 border-t border-zinc-200 dark:border-zinc-800/50">
      <div className="flex items-center justify-between mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          <span className="text-zinc-400 font-mono text-[11px] md:text-xs mr-4">03</span>
          STACK
        </h2>
        <Link 
          to="/stack"
          className="text-[11px] md:text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors"
        >
          VIEW ALL &rarr;
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-wrap gap-3 md:gap-4 max-w-4xl">
          {previewItems.map((item) => (
            <span 
              key={item}
              className="px-4 py-2 border border-zinc-200 dark:border-zinc-800/80 rounded-md font-mono text-[13px] md:text-sm text-zinc-700 dark:text-zinc-300 bg-white dark:bg-[#0a0a0a]"
            >
              {item}
            </span>
          ))}
          <span className="px-4 py-2 border border-zinc-200 dark:border-zinc-800/80 rounded-md font-mono text-[13px] md:text-sm text-zinc-500 dark:text-zinc-500 bg-zinc-50/50 dark:bg-zinc-900/30">
            + more
          </span>
        </div>
      </motion.div>
    </section>
  );
};
