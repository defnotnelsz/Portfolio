import React, { useEffect } from 'react';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ProjectsPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen px-6 md:px-16 lg:px-24 xl:px-32 max-w-5xl mx-auto py-16 md:py-24">
      <nav className="mb-16 md:mb-24">
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors text-sm font-medium"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
      </nav>

      <div className="mb-20 md:mb-32">
        <h1 className="text-3xl md:text-4xl font-medium tracking-tight">projects</h1>
      </div>

      <div className="space-y-32 md:space-y-48">
        {projects.map((project, i) => (
          <motion.article 
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="group"
          >
            <h2 className="text-lg md:text-xl font-semibold mb-8 md:mb-12">{project.name}</h2>
            
            <div className="aspect-[16/9] md:aspect-[21/9] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 md:mb-12 relative overflow-hidden flex items-center justify-center group-hover:border-zinc-300 dark:group-hover:border-zinc-700 transition-colors">
              <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs tracking-widest uppercase">
                {project.name} Visual
              </span>
            </div>

            <div className="max-w-2xl">
              <p className="text-[13px] md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed mb-8">
                {project.fullDescription || project.description}
              </p>

              <a 
                href={project.url || project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-zinc-900 dark:text-zinc-100 font-medium font-mono text-[11px] md:text-xs uppercase tracking-wider hover:opacity-70 transition-opacity"
              >
                {project.url ? 'VISIT SITE' : 'VIEW GITHUB'}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>

      <footer className="mt-32 py-12 border-t border-zinc-200 dark:border-zinc-800/50 text-[11px] md:text-xs text-zinc-500 font-mono flex justify-between">
        <span>&copy; {new Date().getFullYear()} Janelie Sayson Blanco.</span>
        <span>Professional Portfolio</span>
      </footer>
    </div>
  );
};
