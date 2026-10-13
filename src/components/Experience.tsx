import React from 'react';
import { experiences } from '../data/experience';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Experience: React.FC = () => {
  // Flatten the nested experience structure into individual roles for the preview table
  const flattenedRoles = experiences.flatMap(company => 
    company.roles.map(role => ({
      id: `${company.id}-${role.title.replace(/\s+/g, '-').toLowerCase()}`,
      organization: company.company,
      marker: company.marker,
      position: role.title,
      // Use previewDate if available, otherwise extract just the date part before bullet
      date: role.previewDate || role.date.split(' \u00b7 ')[0]
    }))
  );

  return (
    <section id="experience" className="py-24 border-t border-zinc-200/70 dark:border-zinc-800/70">
      <div className="flex justify-between items-end mb-14">
        <div>
          <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
            TIMELINE &middot; CAREER & LEADERSHIP
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-zinc-400 font-mono text-sm mr-3 font-normal">02</span>
            EXPERIENCE
          </h2>
        </div>
        <Link to="/experience" className="text-[11px] md:text-xs hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors hidden md:block uppercase tracking-wider font-mono">
          SEE FULL HISTORY &rarr;
        </Link>
      </div>
      
      {/* Column Headers for Desktop */}
      <div className="hidden md:grid grid-cols-[140px_1fr_1.2fr_40px] gap-6 mb-2 pb-3 border-b border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
        <div>Date</div>
        <div>Position</div>
        <div>Organization</div>
        <div className="text-right">#</div>
      </div>

      <div className="space-y-0">
        {flattenedRoles.map((exp, i) => (
          <motion.div
            key={exp.id + i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="group"
          >
            <div className="grid grid-cols-1 md:grid-cols-[140px_1fr_1.2fr_40px] gap-2 md:gap-6 items-center py-5 border-b border-zinc-100 dark:border-zinc-800/60 hover:bg-zinc-50/80 dark:hover:bg-zinc-900/30 px-2 -mx-2 rounded-sm transition-colors">
              <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400">
                {exp.date}
              </div>
              <div className="font-semibold text-[15px] md:text-base text-zinc-900 dark:text-zinc-100 group-hover:text-zinc-700 dark:group-hover:text-zinc-200 transition-colors">
                {exp.position}
              </div>
              <div className="flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 text-[13px] md:text-sm">
                <span className="font-mono text-[10px] px-1.5 py-0.5 border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/60 rounded-xs text-zinc-500">
                  {exp.marker}
                </span>
                <span className="truncate">{exp.organization}</span>
              </div>
              <div className="hidden md:block text-right font-mono text-[10px] text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-500">
                0{i + 1}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-10 md:hidden">
        <Link to="/experience" className="text-[11px] md:text-xs font-mono hover:text-zinc-500 transition-colors uppercase tracking-wider">
          SEE FULL HISTORY &rarr;
        </Link>
      </div>
    </section>
  );
};
