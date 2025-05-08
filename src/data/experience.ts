import { Experience } from '../types';

export const experiences: Experience[] = [
  {
    id: 1,
    company: "Tech Innovations Inc.",
    role: "Senior Software Engineer",
    duration: "2022 - Present",
    description: "Leading development of flagship products and mentoring junior developers. Architected microservices infrastructure that improved system scalability by 300%.",
    achievements: [
      "Reduced API response time by 60% through caching strategies and query optimization",
      "Led migration from monolith to microservices architecture",
      "Implemented CI/CD pipeline reducing deployment time by 75%",
      "Mentored 5 junior developers who were promoted to mid-level positions"
    ],
    skills: ["React", "Node.js", "AWS", "Docker", "Kubernetes", "TypeScript"],
    logo: "https://images.pexels.com/photos/13852940/pexels-photo-13852940.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 2,
    company: "DataDrive Solutions",
    role: "Full Stack Developer",
    duration: "2020 - 2022",
    description: "Developed and maintained full-stack applications for enterprise clients. Created scalable backend services and responsive front-end interfaces.",
    achievements: [
      "Built real-time dashboard for monitoring system performance",
      "Optimized database queries reducing load times by 40%",
      "Implemented secure authentication system with MFA",
      "Developed RESTful APIs consumed by mobile and web applications"
    ],
    skills: ["JavaScript", "React", "Python", "Django", "PostgreSQL", "Redis"],
    logo: "https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  },
  {
    id: 3,
    company: "Web Solutions Co.",
    role: "Frontend Developer",
    duration: "2018 - 2020",
    description: "Designed and implemented responsive user interfaces for client websites. Collaborated with design team to create seamless user experiences.",
    achievements: [
      "Developed component library used across multiple projects",
      "Improved page load speed by 50% through code optimization",
      "Created accessible UI components compliant with WCAG 2.1",
      "Integrated third-party APIs for enhanced functionality"
    ],
    skills: ["HTML", "CSS", "JavaScript", "React", "Redux", "Sass"],
    logo: "https://images.pexels.com/photos/4050291/pexels-photo-4050291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
  }
];