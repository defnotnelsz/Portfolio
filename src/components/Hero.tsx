import React from 'react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center pt-16 md:pt-0">
      <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start md:items-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-48 h-48 md:w-64 md:h-64 flex-shrink-0 relative overflow-hidden"
        >
          <img 
            src="/profile-transparent.png" 
            alt="Janelie Sayson Blanco" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-col space-y-6"
        >
          <h1 className="text-3xl md:text-4xl font-medium tracking-tight">Janelie Sayson Blanco</h1>
          <div className="text-[13px] md:text-[15px] text-zinc-600 dark:text-zinc-400 max-w-xl leading-relaxed space-y-4">
            <p>I'm a Computer Science student and aspiring Full-Stack & AI Engineer. I build web apps and AI-powered tools, and lately I'm diving into how to make them feel fast, smooth, and fun to use. </p>
            <p>Every project I make teaches me something new. I love turning ideas into working products, and I want to grow alongside engineers who care about building things well.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
