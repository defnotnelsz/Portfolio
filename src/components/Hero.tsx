import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { HalftonePortrait } from './HalftonePortrait';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center py-20 md:py-28">
      {/* Top micro-bar / Editorial index */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex items-center justify-between pb-6 mb-10 border-b border-zinc-200/70 dark:border-zinc-800/70 text-[11px] font-mono text-zinc-400 dark:text-zinc-500 uppercase tracking-widest"
      >
        <span className="flex items-center gap-2">
          <span className="text-zinc-900 dark:text-zinc-100 font-bold">[ 00 ]</span>
          <span>INDEX // INTRODUCTION</span>
        </span>
        <span className="hidden sm:inline">CEBU, PHILIPPINES &middot; 2026</span>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Main Editorial Text Column */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-7 xl:col-span-7 flex flex-col space-y-8"
        >
          <div className="space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              COMPUTER SCIENCE STUDENT &middot; DEVELOPER
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-[1.05]">
              Janelie Sayson Blanco
            </h1>
          </div>

          <div className="text-[15px] md:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed space-y-4 pt-2">
            <p>I'm a Computer Science student and aspiring Full-Stack & AI Engineer. I build web apps and AI-powered tools, and lately I'm diving into how to make them feel fast, smooth, and fun to use. </p>
            <p>Every project I make teaches me something new. I love turning ideas into working products, and I want to grow alongside engineers who care about building things well.</p>
          </div>

          {/* Quick jump navigation actions */}
          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-mono uppercase tracking-wider">
            <a 
              href="#projects" 
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors"
            >
              <span>EXPLORE WORK</span>
              <ArrowDown size={13} />
            </a>
            <a 
              href="#contact" 
              className="inline-flex items-center gap-2 px-4 py-2.5 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
            >
              <span>GET IN TOUCH</span>
              <ArrowUpRight size={13} />
            </a>
          </div>
        </motion.div>

        {/* Art-Directed Portrait Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:col-span-5 xl:col-span-5 self-center lg:self-start w-full max-w-sm lg:max-w-[430px] mx-auto lg:mx-0"
        >
          <div className="border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0a0a0a] p-2 relative frame-corner">
            <div className="aspect-[4/5] bg-zinc-100 dark:bg-black relative overflow-hidden flex items-end justify-center">
              <HalftonePortrait 
                src="/profile-transparent.png" 
                alt="Janelie Sayson Blanco" 
                className="w-full h-full"
              />
              <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/20 dark:from-black/40 to-transparent pointer-events-none" />
            </div>
            <div className="mt-2 pt-2 px-1 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between font-mono text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
              <span>PORTRAIT // 01</span>
              <span>FIGURE &middot; PROFILE</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
