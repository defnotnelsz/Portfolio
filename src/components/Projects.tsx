import React from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  const featured = projects[0];
  const rest = projects.slice(1);

  return (
    <section id="projects" className="py-24 border-t border-zinc-200/70 dark:border-zinc-800/70">
      <div className="flex justify-between items-end mb-14">
        <div>
          <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
            SELECTED WORKS &middot; 03 FEATURED BUILDS
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
            <span className="text-zinc-400 font-mono text-sm mr-3 font-normal">01</span>
            PROJECTS
          </h2>
        </div>
        <Link 
          to="/projects" 
          className="text-[11px] md:text-xs font-mono uppercase tracking-wider hover:text-zinc-500 dark:hover:text-zinc-300 transition-colors hidden md:block"
        >
          SEE ALL &rarr;
        </Link>
      </div>
      
      <div className="space-y-8">
        {featured && (
          <motion.div
            key={featured.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <ProjectCard project={featured} variant="featured" index={0} />
          </motion.div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {rest.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: (i + 1) * 0.1 }}
              className="h-full"
            >
              <ProjectCard project={project} variant="standard" index={i + 1} />
            </motion.div>
          ))}
        </div>
      </div>
      
      <div className="mt-10 md:hidden">
        <Link 
          to="/projects" 
          className="text-[11px] md:text-xs font-mono uppercase tracking-wider hover:text-zinc-500 transition-colors"
        >
          SEE ALL &rarr;
        </Link>
      </div>
    </section>
  );
};
