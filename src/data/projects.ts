export interface Project {
  id: string;
  name: string;
  description: string;
  fullDescription?: string;
  github?: string;
  url?: string;
  image?: string;
}

export const projects: Project[] = [
  {
    id: 'aura',
    name: 'Aura',
    description: 'A native Android wardrobe organizer and outfit builder, designed to make getting dressed faster and more fun.',
    fullDescription: '', // TODO: To be provided later
    github: 'https://github.com/justnelsz/Aura',
  },
  {
    id: 'lifevent',
    name: 'Lifevent',
    description: 'A full-stack exhibition intelligence platform that uses AI crawling and fit scoring to help a global data company decide which tech events to attend.',
    fullDescription: '', // TODO: To be provided later
    url: 'https://phlifevent.vercel.app/',
  },
  {
    id: 'savi',
    name: 'Savi',
    description: 'A voice-first AI interview coach that asks role-specific questions, gives live feedback on your answers, and exports a full interview review.',
    fullDescription: '', // TODO: To be provided later
    url: 'https://savi-interview-review.vercel.app/',
  },
];
