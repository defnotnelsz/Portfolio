export interface ExperienceRole {
  title: string;
  date: string;
  previewDate?: string;
  description: string;
  skills?: string[];
}

export interface ExperienceCompany {
  id: string;
  company: string;
  marker: string;
  employmentType?: string;
  duration?: string;
  location?: string;
  roles: ExperienceRole[];
}

export const experiences: ExperienceCompany[] = [
  {
    id: 'lifewood',
    company: 'Lifewood Data Technology',
    marker: 'LW',
    roles: [
      {
        title: 'Software Engineer Intern',
        date: '2026',
        description: 'Worked across AI engineering, full-stack development, data analytics, and digital market research. Supported the development and exploration of AI-powered applications while analyzing business and search data using Power BI, Excel, and Google Data Studio. Researched high-interest search topics and emerging trends to help identify opportunities for the company\'s digital content and business strategy.',
        skills: [
          'AI-Generated Content (AIGC)',
          'Full-Stack AI Engineering',
          'Data Analytics & Visualization',
          'Digital Market Research & SEO',
        ],
      },
    ],
  },
  {
    id: 'contactpoint360',
    company: 'ContactPoint360',
    marker: 'CP',
    employmentType: 'Full-time',
    duration: '1 yr 9 mos',
    location: 'Cebu, Central Visayas, Philippines · On-site',
    roles: [
      {
        title: 'Provider Support - Voice Agent',
        date: 'Jun 2025 - Sep 2026 \u00b7 1 yr 4 mos',
        previewDate: '2025 \u2013 2026',
        description: 'Provided comprehensive provider and laboratory support across multiple diagnostic testing workflows, coordinating specimen management, logistics and case follow-ups. Monitored delivery and testing progress, and communicated with pathology departments and ordering providers to obtain updates on specimens, tumor availability, and outstanding requirements. Maintained a strong focus on accuracy, timely communication, and seamless coordination throughout the testing process.\n\nManaged and reviewed CRM cases for a variety of laboratory tests, including Oncotype DX, OncoDetect, and OncoExtra, ensuring case information was accurately documented and appropriately followed up. Collaborated closely with providers, pathology teams, laboratories, and internal stakeholders to resolve case-related concerns, track pending requests, and facilitate timely processing of tests. Demonstrated strong attention to detail, organizational skills, and the ability to effectively manage multiple healthcare cases while providing professional and reliable support.',
        skills: [
          'Customer Relationship Management',
          'Medical Terminology',
          'Pathology Coordination',
          'Case Management',
          'Data Entry',
        ],
      },
      {
        title: 'Patient Support - Voice Agent',
        date: 'Jan 2025 - May 2025 \u00b7 5 mos',
        previewDate: '2025 \u2013 2026',
        description: 'Provided patient support for Cologuard screening services, assisting patients throughout the testing process and ensuring they understood the necessary steps for specimen collection and submission. Coordinated stool specimen shipments through UPS and FedEx, monitored shipment status, and helped ensure samples were properly routed for processing. Verified patient insurance information and eligibility to determine coverage for Cologuard testing while maintaining accuracy and confidentiality when handling patient and insurance information.\n\nServed as a key point of contact for patients by addressing questions, resolving shipment and testing concerns, and coordinating with relevant teams to facilitate a smooth testing experience. Managed multiple patient cases while maintaining detailed documentation, following established healthcare processes, and delivering professional and compassionate support throughout the screening journey.',
        skills: [
          'Documentation',
          'Customer Service',
          'Insurance Verification',
        ],
      },
    ],
  },
  {
    id: 'uc-main',
    company: 'UC Main - CCS CARES',
    marker: 'UC',
    roles: [
      {
        title: 'Auditor',
        date: '2025 - 2026',
        description: 'Audited and monitored financial contributions collected from students and volunteers to ensure accurate and transparent allocation of funds for community outreach programs. Helped oversee budgeting for technical education activities, seminars, and community initiatives for partner barangays, including support for special occasions and essential goods based on available funds. Maintained accurate financial records and ensured that expenditures aligned with approved contributions and program objectives.',
        skills: [
          'Financial Auditing',
          'Budget Management',
          'Financial Accountability',
          'Community Outreach',
          'Fund Monitoring',
        ],
      },
      {
        title: 'Student Volunteer',
        date: '2023 - Present',
        description: 'Supported the organization\u2019s events and community initiatives by assisting with event operations, documentation, and hands-on activities. Collaborated with fellow volunteers to help ensure programs and outreach activities were organized and successfully delivered.',
        skills: [
          'Event Coordination',
          'Documentation',
          'Teamwork',
          'Community Outreach',
        ],
      },
    ],
  },
  {
    id: 'csps',
    company: 'CSP-S UC Main',
    marker: 'CS',
    roles: [
      {
        title: 'Auditor',
        date: '2025 - 2026',
        description: 'Managed and audited student contributions for organizational activities, ensuring that collected funds were accurately recorded, properly allocated, and aligned with planned events and initiatives. Monitored budgets and expenditures to maintain financial transparency, accountability, and responsible use of organizational funds.',
        skills: [
          'Financial Auditing',
          'Budget Management',
          'Fund Management',
          'Financial Reporting',
          'Accountability',
        ],
      },
      {
        title: '2nd Year Representative',
        date: '2024 - 2025',
        description: 'Served as a communication bridge between the organization and second-year CCS students, ensuring that announcements, academic information, and organizational updates from department and student leaders were accurately communicated and clearly delivered to the student body.',
        skills: [
          'Communication',
          'Student Representation',
          'Information Coordination',
          'Leadership',
        ],
      },
    ],
  },
  {
    id: 'olympuz',
    company: 'Olympuz powered by Edward Belacse Career Consultancy Services',
    marker: 'OP',
    roles: [
      {
        title: 'Freelance',
        date: '2020 - 2023',
        description: 'Provided freelance support in career and recruitment-related activities, assisting with job-seeker coordination and employment opportunities while developing communication, organization, and client-facing skills.',
      },
    ],
  },
];
