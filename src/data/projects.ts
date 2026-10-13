export interface ProjectImage {
  dark: string;
  light: string;
}

export interface ProjectSection {
  title: string;
  content: string | string[];
}

export interface Project {
  id: string;
  name: string;
  tagline?: string;
  category: string;
  description: string;
  fullDescription?: string;
  github?: string;
  url?: string;
  image?: ProjectImage | string;
  tags: string[];
  role?: string;
  sections?: ProjectSection[];
}

export const projects: Project[] = [
  {
    id: 'aura',
    name: 'Aura',
    category: 'Native Android App',
    tagline: 'Smart personal wardrobe organizer and daily outfit planner',
    description: 'A native Android wardrobe organizer and outfit builder, designed to make getting dressed faster and more fun.',
    fullDescription: 'Aura is a native Android application built in Kotlin that transforms everyday closet management into an intuitive, offline-ready mobile experience. It allows users to catalog individual clothing pieces by category, track garment status (clean vs. laundry), assemble custom outfit combinations, and manage personal wardrobe data locally with SQLite.',
    github: 'https://github.com/justnelsz/Aura',
    image: {
      dark: '/Aura%20dark.png',
      light: '/Aura%20light.png',
    },
    tags: ['Kotlin', 'Android SDK', 'SQLite', 'Mobile Architecture', 'XML Layouts'],
    role: 'Sole Developer · Academic Project',
    sections: [
      {
        title: 'Overview & Problem',
        content: 'Keeping track of personal wardrobe items and styling coordinated outfits can quickly become disorganized without a dedicated tool. Many users struggle with forgetting what items they own, whether garments are clean or in the laundry, and putting together outfits on busy mornings. Aura was developed as an offline-first mobile assistant to streamline personal style and garment tracking.',
      },
      {
        title: 'Key Features',
        content: [
          'Wardrobe Cataloging: Categorize clothing into structured groups (tops, bottoms, shoes, accessories) with custom subcategories.',
          'Status Tracking: Monitor laundry and availability state for each garment with timestamped status updates.',
          'Outfit Builder: Compose and preview mix-and-match outfits from existing wardrobe items and save favorite ensembles.',
          'Offline Persistence: Local SQLite database implementation ensures full functionality without requiring an internet connection.',
          'User Profiles: Account management enabling private closet catalogs for multiple users.',
        ],
      },
      {
        title: 'Architecture & Implementation',
        content: [
          'Database Architecture: Designed a normalized SQLite relational schema (AuraDBHelper) managing Users, Categories, Subcategories, Status, Clothes, Outfits, and Outfit Items with foreign key constraints.',
          'Native Android UI: Built using Kotlin and native Android Views with custom XML layouts tailored for mobile navigation.',
          'State & Timestamp Management: Tracked garment lifecycles using millisecond Unix timestamps to record when clothing items were last updated or washed.',
        ],
      },
      {
        title: 'My Role & Contributions',
        content: 'As the sole mobile developer on this project, I planned the relational database schema, implemented the complete SQLiteOpenHelper database layer, and built the native Android user interface and business logic in Kotlin.',
      },
      {
        title: 'Results & Key Learnings',
        content: [
          'Strengthened foundational mobile development skills in Android lifecycle management, relational SQLite schemas, and offline data handling.',
          'TODO: Add target Android API level benchmarks and any planned camera integration details.',
        ],
      },
    ],
  },
  {
    id: 'lifevent',
    name: 'Lifevent',
    category: 'Full-Stack AI Platform',
    tagline: 'Exhibition intelligence & event match-scoring platform for enterprise decision-makers',
    description: 'A full-stack exhibition intelligence platform that uses AI crawling and fit scoring to help a global data company decide which tech events to attend.',
    fullDescription: 'Lifevent is a full-stack exhibition intelligence platform developed to help Lifewood Data Technology systematically discover, evaluate, and prioritize technology events worldwide. By combining automated web crawling with an AI fit-scoring engine, Lifevent evaluates conferences against corporate strategic priorities, attendee demographics, and business development objectives.',
    url: 'https://phlifevent.vercel.app/',
    image: {
      dark: '/Lifevent%20dark.png',
      light: '/Lifevent%20light.png',
    },
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'AI Crawling', 'Data Analytics', 'Vercel'],
    role: 'Software Engineer Intern · Lifewood Data Technology',
    sections: [
      {
        title: 'Overview & Problem',
        content: 'Global data and technology companies encounter hundreds of potential exhibitions, trade shows, and industry summits annually. Manually vetting each event for relevance, delegate profile fit, and commercial value consumes extensive research hours and leads to inconsistent participation choices. Lifevent was created to replace ad-hoc event selection with an automated, intelligence-driven evaluation workflow.',
      },
      {
        title: 'Key Features',
        content: [
          'Automated Event Discovery: Crawls and aggregates conference information across international technology summits.',
          'Strategic Fit Scoring: Evaluates events using AI scoring algorithms calibrated against corporate data and domain focus areas.',
          'Decision Dashboard: Provides leadership with structured overviews, filtering by industry, geography, and strategic relevance.',
          'Centralized Event Pipeline: Organizes deadlines, attendance feasibility, and executive recommendations in a single responsive web interface.',
        ],
      },
      {
        title: 'Engineering & Implementation',
        content: [
          'Full-Stack Architecture: Built with a modern Next.js/React front end styled with Tailwind CSS, deployed on Vercel for high performance and responsiveness.',
          'Data & Intelligence Pipeline: Integrated AI crawling methods and analytics routines to ingest heterogeneous conference agendas and speaker rosters.',
          'Scoring Algorithm: Formulated weighted evaluation heuristics measuring audience alignment, sector relevance, and company objectives.',
        ],
      },
      {
        title: 'My Role & Team Context',
        content: 'Built during my Software Engineer Internship at Lifewood Data Technology. I collaborated with engineering and market research team members to develop front-end interfaces, analyze search trends, and support AI crawling and scoring workflows.',
      },
      {
        title: 'Results & Practical Impact',
        content: [
          'Successfully deployed the live platform at phlifevent.vercel.app to empower data-driven decisions on event participation.',
          'TODO: Add specific event volume processed and team adoption metrics upon company clearance.',
        ],
      },
    ],
  },
  {
    id: 'savi',
    name: 'Savi',
    category: 'Voice AI Web Application',
    tagline: 'Voice-first AI interview coach with real-time feedback and comprehensive review reports',
    description: 'A voice-first AI interview coach that asks role-specific questions, gives live feedback on your answers, and exports a full interview review.',
    fullDescription: 'Savi is an interactive, voice-driven AI interview preparation platform that simulates realistic mock interviews across diverse professional fields. Drawing on my industry experience in high-volume voice support at ContactPoint360, Savi asks role-tailored technical and behavioral questions, evaluates spoken candidate answers dynamically, and exports comprehensive recruiter-ready PDF performance evaluations.',
    url: 'https://savi-interview-review.vercel.app/',
    image: {
      dark: '/Savi%20dark.png',
      light: '/projects/Savi%20light.png',
    },
    tags: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Voice AI', 'Web Speech API', 'PDF Generation', 'Vercel'],
    role: 'Creator & Full-Stack Developer',
    sections: [
      {
        title: 'Overview & Problem',
        content: 'Candidates across various career disciplines face significant barriers preparing for real interviews: generic mock question lists lack real-time conversational pressure, and personalized human coaching is either expensive or inaccessible. Savi addresses this gap by creating an accessible, realistic, voice-first simulator that evaluates both technical accuracy and spoken delivery.',
      },
      {
        title: 'Key Features',
        content: [
          'Voice-First Conversational Practice: Simulates natural interview dialogues using speech synthesis and voice recognition.',
          'Multi-Role Interview Tracks: Specialized question banks for roles such as Data Analyst, Project Manager, Virtual Assistant, Technical Support, Teacher, and Healthcare / Pathology Nurse.',
          'Adaptive Follow-Ups: Dynamically responds to candidate answers with clarifying prompts and follow-up inquiries.',
          'Automated PDF Review Export: Generates structured, downloadable performance reviews detailing strengths, areas of growth, and quantitative scores.',
        ],
      },
      {
        title: 'Engineering & Implementation',
        content: [
          'Speech Integration: Leveraged Web Speech and voice processing interfaces to capture audio and deliver natural turn-taking dialogues.',
          'Prompt Architecture: Crafted evaluation prompts engineered to measure clarity, domain competence, and structure (STAR method alignment).',
          'Report Generation Engine: Built client/server PDF generation pipelines converting live transcript evaluations into recruiter-grade post-interview documents.',
          'Deployment & Optimization: Hosted on Vercel with responsive, accessible layout designed for desktop and mobile prep sessions.',
        ],
      },
      {
        title: 'My Role & Perspective',
        content: 'Solo project conceptualized and engineered from end to end. I drew directly on my professional voice agent and CRM case management experience at ContactPoint360 to build realistic evaluation criteria and empathetic coaching flows.',
      },
      {
        title: 'Results & Takeaways',
        content: [
          'Publicly deployed at savi-interview-review.vercel.app with verified end-to-end PDF generation across multiple professional tracks.',
          'TODO: Add audio latency optimization benchmarks and user feedback metrics.',
        ],
      },
    ],
  },
];
