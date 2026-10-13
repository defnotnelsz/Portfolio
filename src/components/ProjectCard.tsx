import React, { useState } from 'react';
import type { Project } from '../data/projects';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';

interface ProjectCardProps {
  project: Project;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const { theme } = useTheme();
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const link = project.url || project.github;

  const rawSrc =
    typeof project.image === 'object' && project.image !== null
      ? theme === 'dark'
        ? project.image.dark
        : project.image.light
      : project.image;

  const imageSrc = rawSrc ? encodeURI(decodeURI(rawSrc)) : undefined;
  const isImageBroken = Boolean(imageSrc && failedSrc === imageSrc);

  return (
    <motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <div className="border border-zinc-200 dark:border-zinc-800 p-1 flex flex-col h-full bg-white dark:bg-[#0a0a0a]">
        <div className="aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 mb-4 overflow-hidden relative flex items-center justify-center p-4">
          {imageSrc && !isImageBroken ? (
            <img
              src={imageSrc}
              alt={`${project.name} preview`}
              className={
                project.id === 'savi'
                  ? 'max-h-[60%] max-w-[80%] object-contain'
                  : 'max-h-full max-w-full object-contain'
              }
              onError={() => {
                console.warn(`[ProjectCard] Failed to load image for ${project.name}: ${imageSrc}`);
                setFailedSrc(imageSrc ?? null);
              }}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-zinc-400 dark:text-zinc-600 text-sm">
              {project.name} Image
            </div>
          )}
        </div>
        <div className="px-4 pb-4 flex flex-col flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{project.name}</h3>
          </div>
          <p className="text-[13px] md:text-sm text-zinc-600 dark:text-zinc-400 mb-6 flex-1 leading-relaxed">
            {project.description}
          </p>
          <div className="flex items-center text-[11px] md:text-xs font-mono uppercase tracking-wider font-medium text-zinc-900 dark:text-zinc-100 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-200">
            {project.url ? 'VISIT SITE' : 'VIEW GITHUB'} <ArrowUpRight size={14} className="ml-1" />
          </div>
        </div>
      </div>
    </motion.a>
  );
};
