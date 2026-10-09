import React from 'react';
import { projects } from '../data/projects';
import { ProjectCard } from './ProjectCard';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

export const Projects: React.FC = () => {
  return (
    <section id="projects" className="py-24">
      <div className="flex justify-between items-end mb-12">
        <h2 className="text-2xl font-semibold tracking-tight">
          <span className="text-zinc-400 font-mono text-[11px] md:text-xs mr-4">01</span>
          PROJECTS
        </h2>
        <Link to="/projects" className="text-[11px] md:text-xs font-mono uppercase tracking-wider hover:text-zinc-500 transition-colors hidden md:block">
          SEE ALL &rarr;
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="h-full"
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 md:hidden">
        <Link to="/projects" className="text-[11px] md:text-xs font-mono uppercase tracking-wider hover:text-zinc-500 transition-colors">
          SEE ALL &rarr;
        </Link>
      </div>
    </section>
  );
};
