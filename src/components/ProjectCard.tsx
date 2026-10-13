import React, { useState } from 'react';
import type { Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
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
        return 'max-h-[82%] max-w-[80%] object-contain select-none';
      case 'lifevent':
        return 'max-h-[55%] max-w-[85%] object-contain select-none';
      case 'savi':
        return 'max-h-[55%] max-w-[80%] object-contain select-none';
      default:
        return 'max-h-full max-w-full object-contain select-none';
    }
  };

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.2 }}
      className="border border-zinc-200 dark:border-zinc-800 p-1 flex flex-col h-full bg-white dark:bg-[#0a0a0a] transition-colors duration-200 hover:border-zinc-300 dark:hover:border-zinc-700"
    >
      <Link
        to={`/projects#${project.id}`}
        aria-label={`View ${project.name} case study`}
        className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 mb-4 overflow-hidden relative flex items-center justify-center p-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100"
      >
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
          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-sm font-mono">
            {project.name} Preview
          </div>
        )}
      </Link>

      <div className="px-4 pb-4 flex flex-col flex-1">
        <div className="flex justify-between items-baseline mb-1">
          <Link
            to={`/projects#${project.id}`}
            className="text-lg font-semibold hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-sm"
          >
            {project.name}
          </Link>
          <span className="text-[10px] md:text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
            {project.category}
          </span>
        </div>

        <p className="text-[13px] md:text-sm text-zinc-600 dark:text-zinc-400 mb-4 flex-1 leading-relaxed">
          {project.description}
        </p>

        {project.tags && project.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-[10px] font-mono px-2 py-0.5 border border-zinc-200 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-zinc-50 dark:bg-zinc-900/40 rounded-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-3 border-t border-zinc-100 dark:border-zinc-900 text-[11px] md:text-xs font-mono uppercase tracking-wider">
          <Link
            to={`/projects#${project.id}`}
            className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-sm"
          >
            CASE STUDY &rarr;
          </Link>

          {externalLink && (
            <a
              href={externalLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open external link for ${project.name}`}
              className="inline-flex items-center gap-1 text-zinc-900 dark:text-zinc-100 font-medium hover:opacity-70 transition-opacity focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 rounded-sm"
            >
              {externalLabel} <ArrowUpRight size={13} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
};
