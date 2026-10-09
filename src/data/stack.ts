export interface TechCategory {
  category: string;
  items: string[];
}

export const stack: TechCategory[] = [
  {
    category: 'Frontend',
    items: ['React', 'TypeScript', 'JavaScript', 'Next.js', 'Vite', 'Tailwind CSS', 'Framer Motion', 'Styled Components', 'Prettier', 'WebPack', 'ESLint', 'Vue.js'],
  },
  {
    category: 'Backend',
    items: ['Python', 'FastAPI', 'PostreSQL', 'Laravel', 'Node.js', 'Java', 'Express.js'],
  },
  {
    category: 'DevOps & Cloud',
    items: ['AWS', 'GitHub Actions', 'AWS CloudFormation', 'Docker'],
  },
  {
    category: 'Developer Tools',
    items: ['Git', 'GitHub', 'GitLab', 'VS Code', 'JetBrains IntelliJ', 'Discord', 'Teams'],
  },
];
