import React from 'react';
import { socials, email } from '../data/socials';
import { ArrowUpRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  GitHub: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
  ),
  Facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
  ),
  Instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
  ),
  LinkedIn: (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
  ),
};

export const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 border-t border-zinc-200/70 dark:border-zinc-800/70 min-h-[60vh] flex flex-col justify-center">
      <div className="mb-14">
        <div className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
          GET IN TOUCH // INQUIRIES & NETWORKING
        </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          <span className="text-zinc-400 font-mono text-sm mr-3 font-normal">05</span>
          CONTACT
        </h2>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Direct Email Card */}
        <div className="lg:col-span-5 border border-zinc-200 dark:border-zinc-800 p-6 md:p-8 bg-white dark:bg-[#0a0a0a] frame-corner flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <div className="font-mono text-[11px] uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              DIRECT INQUIRIES
            </div>
            <a 
              href={`mailto:${email}`}
              className="text-lg md:text-xl font-bold hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors break-all"
            >
              {email}
            </a>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-900 flex items-center justify-between text-xs font-mono uppercase tracking-wider">
            <span className="text-zinc-400 dark:text-zinc-500">LOCATION</span>
            <span className="font-medium text-zinc-700 dark:text-zinc-300">CEBU, PHILIPPINES</span>
          </div>

          <a
            href={`mailto:${email}`}
            className="w-full text-center py-3 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-mono uppercase tracking-widest font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors block"
          >
            SEND AN EMAIL &rarr;
          </a>
        </div>

        {/* Social Platforms Grid */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {socials.map((social) => (
            <a 
              key={social.name}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group border border-zinc-200 dark:border-zinc-800 p-5 bg-white dark:bg-[#0a0a0a] frame-corner flex items-center justify-between hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
            >
              <div className="flex items-center gap-3.5">
                <span className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  {iconMap[social.name]}
                </span>
                <span className="text-sm md:text-base font-semibold text-zinc-800 dark:text-zinc-200 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors">
                  {social.name}
                </span>
              </div>
              <ArrowUpRight size={16} className="text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};
