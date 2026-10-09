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
      position: role.title,
      // Use previewDate if available, otherwise extract just the date part before bullet
      date: role.previewDate || role.date.split(' \u00b7 ')[0]
    }))
  );

  return (
    <section id="experience" className="py-24 border-t border-zinc-200 dark:border-zinc-800/50">
      <div className="flex justify-between items-end mb-16">
        <h2 className="text-2xl font-semibold tracking-tight">
          <span className="text-zinc-400 font-mono text-[11px] md:text-xs mr-4">02</span>
          EXPERIENCE
        </h2>
        <Link to="/experience" className="text-[11px] md:text-xs hover:text-zinc-500 transition-colors hidden md:block uppercase tracking-wider font-mono">
          SEE FULL HISTORY &rarr;
        </Link>
      </div>
      
      {/* Column Headers for Desktop */}
      <div className="hidden md:grid grid-cols-[160px_1fr_1fr] gap-8 mb-4 pb-4 border-b border-zinc-200 dark:border-zinc-800 text-[11px] md:text-xs font-mono text-zinc-500 uppercase tracking-wider">
        <div>Date</div>
        <div>Position</div>
        <div>Organization</div>
      </div>

      <div className="space-y-0">
        {flattenedRoles.map((exp, i) => (
          <motion.div
            key={exp.id + i}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="group"
          >
            <div className="grid grid-cols-1 md:grid-cols-[160px_1fr_1fr] gap-2 md:gap-8 items-start py-6 border-b border-zinc-100 dark:border-zinc-800/50 hover:bg-zinc-50 dark:hover:bg-zinc-900/20 transition-colors">
              <div className="font-mono text-[11px] md:text-xs text-zinc-500">
                {exp.date}
              </div>
              <div className="font-semibold text-[15px] md:text-base">
                {exp.position}
              </div>
              <div className="text-zinc-500 dark:text-zinc-400 text-[13px] md:text-sm">
                {exp.organization}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-12 md:hidden">
        <Link to="/experience" className="text-[11px] md:text-xs font-mono hover:text-zinc-500 transition-colors uppercase tracking-wider">
          SEE FULL HISTORY &rarr;
        </Link>
      </div>
    </section>
  );
};
