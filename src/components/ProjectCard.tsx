import React, { useState } from 'react';
import type { Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

interface ProjectCardProps {
  project: Project;
  variant?: 'featured' | 'standard';
  index?: number;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  project, 
  variant = 'standard',
  index = 0 
}) => {
  const { theme } = useTheme();
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

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

  const isImageBroken = Boolean(imageSrc && failedSrc === imageSrc);
  const externalLink = project.url || project.github;
  const externalLabel = project.url ? 'VISIT SITE' : 'VIEW GITHUB';

  const getImageClass = (id: string) => {
    switch (id) {
      case 'aura':
        return 'max-h-[82%] max-w-[80%] object-contain select-none transition-transform duration-300 group-hover:scale-105';
      case 'lifevent':
        return 'max-h-[55%] max-w-[85%] object-contain select-none transition-transform duration-300 group-hover:scale-105';
      case 'savi':
        return 'max-h-[55%] max-w-[80%] object-contain select-none transition-transform duration-300 group-hover:scale-105';
      default:
        return 'max-h-full max-w-full object-contain select-none transition-transform duration-300 group-hover:scale-105';
    }
  };

  const imageElement = (
    <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 overflow-hidden relative flex items-center justify-center p-6 group-hover:border-zinc-400 dark:group-hover:border-zinc-600 transition-colors frame-corner">
      {imageSrc && !isImageBroken ? (
        <img
          src={imageSrc}
          alt={`${project.name} preview`}
          className={getImageClass(project.id)}
          onError={() => {
            console.warn(`[ProjectCard] Failed to load image for ${project.name}: ${imageSrc}`);
            setFailedSrc(imageSrc ?? null);
          }}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-xs font-mono uppercase tracking-wider">
          {project.name} Preview
        </div>
      )}
      <div className="absolute bottom-2 right-2 font-mono text-[9px] text-zinc-400 dark:text-zinc-600 uppercase tracking-widest px-1 bg-white/70 dark:bg-black/60 rounded-xs">
        {project.id}
      </div>
    </div>
  );

  if (variant === 'featured') {
    return (
      <motion.div
        whileHover={{ y: -3 }}
        transition={{ duration: 0.2 }}
        className="group border border-zinc-200 dark:border-zinc-800 p-2 md:p-3 bg-white dark:bg-[#0a0a0a] transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <Link
            to={`/projects#${project.id}`}
            aria-label={`View ${project.name} case study`}
            className="lg:col-span-7 aspect-[16/10] md:aspect-[16/9] block focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
          >
            {imageElement}
          </Link>

          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center justify-between gap-3 mb-3 pb-3 border-b border-zinc-100 dark:border-zinc-900 font-mono text-[11px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                <span>[ 0{index + 1} // FEATURED ]</span>
                <span className="text-zinc-600 dark:text-zinc-400 font-semibold">{project.category}</span>
              </div>

              <Link
                to={`/projects#${project.id}`}
                className="block text-2xl md:text-3xl font-bold tracking-tight mb-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none"
              >
                {project.name}
              </Link>

              {project.role && (
                <div className="font-mono text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                  {project.role}
                </div>
              )}

              <p className="text-[14px] md:text-[15px] text-zinc-600 dark:text-zinc-400 leading-relaxed mb-6">
                {project.description}
              </p>

              {project.tags && project.tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/60 rounded-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-100 dark:border-zinc-900 text-xs font-mono uppercase tracking-wider">
              <Link
                to={`/projects#${project.id}`}
                className="text-zinc-900 dark:text-zinc-100 font-semibold hover:opacity-70 transition-opacity inline-flex items-center gap-1.5"
              >
                CASE STUDY &rarr;
              </Link>

              {externalLink && (
                <a
                  href={externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Open external link for ${project.name}`}
                  className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                >
                  {externalLabel} <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="group border border-zinc-200 dark:border-zinc-800 p-2 md:p-3 flex flex-col h-full bg-white dark:bg-[#0a0a0a] transition-all duration-200 hover:border-zinc-400 dark:hover:border-zinc-600"
    >
      <div className="flex items-center justify-between gap-2 mb-3 pb-2.5 border-b border-zinc-100 dark:border-zinc-900 font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
        <span>[ 0{index + 1} ]</span>
        <span className="truncate">{project.category}</span>
      </div>

      <Link
        to={`/projects#${project.id}`}
        aria-label={`View ${project.name} case study`}
        className="aspect-[16/10] block mb-4 overflow-hidden relative focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
      >
        {imageElement}
      </Link>

      <div className="flex flex-col flex-1 px-1">
        <Link
          to={`/projects#${project.id}`}
          className="text-xl font-bold tracking-tight mb-2 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none"
        >
          {project.name}
        </Link>

        {project.role && (
          <div className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400 mb-3 truncate">
            {project.role}
          </div>
        )}

        <p className="text-[13px] md:text-sm text-zinc-600 dark:text-zinc-400 mb-5 flex-1 leading-relaxed">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 4).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/60 rounded-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-900 text-[11px] md:text-xs font-mono uppercase tracking-wider mt-auto">
          <Link
            to={`/projects#${project.id}`}
            className="text-zinc-900 dark:text-zinc-100 font-semibold hover:opacity-70 transition-opacity"
          >
            CASE STUDY &rarr;
          </Link>

          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open external link for ${project.name}`}
              className="inline-flex items-center gap-1 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
            >
              {externalLabel} <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
