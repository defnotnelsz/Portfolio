import React, { useEffect } from 'react';
import { projects } from '../data/projects';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import { scrollToHash } from '../utils/scrollToHash';

const currentYear = new Date().getFullYear();

export const ProjectsPage: React.FC = () => {
  const { theme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const cleanup = scrollToHash(location.hash);
      return cleanup;
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.hash, location.pathname]);

  const getImageClass = (id: string) => {
    switch (id) {
      case 'aura':
        return 'max-h-[85%] max-w-[55%] md:max-w-[40%] object-contain select-none';
      case 'lifevent':
        return 'max-h-[55%] max-w-[75%] object-contain select-none';
      case 'savi':
        return 'max-h-[55%] max-w-[65%] object-contain select-none';
      default:
        return 'max-h-full max-w-full object-contain select-none';
    }
  };

  return (
    <div className="min-h-screen px-5 sm:px-8 md:px-10 lg:px-12 max-w-5xl mx-auto py-12 md:py-16">
      <nav className="mb-10 md:mb-16">
        <Link 
          to="/#projects" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors text-sm font-medium focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-sm"
        >
          <ArrowLeft size={16} />
          Back to portfolio
        </Link>
      </nav>

      <div className="mb-14 md:mb-20">
        <div className="font-mono text-xs uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
          [ 01 // SELECTED WORKS &middot; ARCHIVE ]
        </div>
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">projects</h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Detailed case studies and engineering notes across native mobile applications, full-stack intelligence platforms, and voice AI systems.
        </p>
      </div>

      <div className="space-y-32 md:space-y-48">
        {projects.map((project, i) => {
          const rawSrc: string | undefined =
            typeof project.image === 'object' && project.image !== null
              ? theme === 'dark'
                ? project.image.dark
                : project.image.light
              : typeof project.image === 'string'
                ? project.image
                : undefined;

          const imageSrc: string | undefined =
            typeof rawSrc === 'string' && rawSrc.trim().length > 0
              ? encodeURI(decodeURI(rawSrc))
              : undefined;

          return (
            <motion.article 
              key={project.id}
              id={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="scroll-mt-24 group"
            >
              <div className="flex flex-wrap items-baseline justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs text-zinc-400 dark:text-zinc-500">
                    0{i + 1}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    {project.category}
                  </span>
                </div>
                {project.role && (
                  <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-900 px-2.5 py-1 rounded-sm border border-zinc-200 dark:border-zinc-800">
                    {project.role}
                  </span>
                )}
              </div>

              <h2 className="text-2xl md:text-3xl font-semibold mb-2">{project.name}</h2>
              {project.tagline && (
                <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 mb-8 max-w-2xl">
                  {project.tagline}
                </p>
              )}
              
              <div className="aspect-[16/9] md:aspect-[21/9] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 mb-8 md:mb-10 relative overflow-hidden flex items-center justify-center p-6 md:p-12 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors frame-corner">
                {imageSrc ? (
                  <img
                    src={imageSrc}
                    alt={`${project.name} preview`}
                    className={getImageClass(project.id)}
                    onError={(e) => {
                      console.warn(`[ProjectsPage] Failed to load image for ${project.name}: ${imageSrc}`);
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                ) : (
                  <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs tracking-widest uppercase">
                    {project.name} Visual
                  </span>
                )}
              </div>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-10">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 text-xs font-mono border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-white dark:bg-[#0a0a0a] rounded-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              <div className="max-w-3xl">
                <p className="text-sm md:text-base text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8">
                  {project.fullDescription || project.description}
                </p>

                {project.sections && project.sections.length > 0 && (
                  <div className="space-y-8 my-8 border-t border-zinc-100 dark:border-zinc-900 pt-8">
                    {project.sections.map((section) => (
                      <div key={section.title} className="space-y-3">
                        <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                          {section.title}
                        </h3>
                        {Array.isArray(section.content) ? (
                          <ul className="space-y-2">
                            {section.content.map((item, idx) => (
                              <li
                                key={idx}
                                className="text-[13px] md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex items-start gap-2.5"
                              >
                                <span className="text-zinc-400 dark:text-zinc-600 font-mono text-xs mt-0.5 select-none">&bull;</span>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-[13px] md:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {section.content}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-6 pt-8 border-t border-zinc-200 dark:border-zinc-800 text-[11px] md:text-xs font-mono uppercase tracking-wider">
                  {project.url && (
                    <a 
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-sm"
                    >
                      VISIT SITE
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-zinc-900 dark:text-zinc-100 font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-sm"
                    >
                      VIEW GITHUB
                      <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      <footer className="mt-24 py-10 border-t border-zinc-200 dark:border-zinc-800/50 text-[11px] md:text-xs text-zinc-500 font-mono flex justify-between">
        <span>&copy; {currentYear} Janelie Sayson Blanco.</span>
        <span>Professional Portfolio</span>
      </footer>
    </div>
  );
};
