import React from 'react';
import { stack } from '../data/stack';
import { motion } from 'framer-motion';

export const Stack: React.FC = () => {
  return (
    <section id="stack" className="py-16 md:py-20 lg:py-24 border-t border-zinc-200/70 dark:border-zinc-800/70">
      <div className="mb-10 md:mb-12">
        <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
          TECHNOLOGY MATRIX &middot; {stack.length} DISCIPLINES
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          <span className="text-zinc-400 font-mono text-sm mr-3 font-normal">03</span>
          STACK
        </h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
        {stack.map((cat, i) => (
          <motion.div
            key={cat.category}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-[#0a0a0a] frame-corner group hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-zinc-100 dark:border-zinc-900 font-mono text-[11px]">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wider">
                [ 0{i + 1} // {cat.category} ]
              </span>
              <span className="text-zinc-400 dark:text-zinc-500">
                {cat.items.length} items
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {cat.items.map((item) => (
                <span 
                  key={item}
                  className="px-2.5 py-1 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xs font-mono text-xs text-zinc-700 dark:text-zinc-300 bg-zinc-50/60 dark:bg-zinc-900/40 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
