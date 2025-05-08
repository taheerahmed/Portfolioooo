import { Project } from '../types';

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce platform built with React, Node.js, and MongoDB. Includes user authentication, product management, cart functionality, and payment processing.",
    tags: ["React", "Node.js", "MongoDB", "Express", "Redux", "Stripe"],
    image: "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    github: "https://github.com/username/ecommerce-platform",
    demo: "https://ecommerce-demo.example.com",
    featured: true
  },
  {
    id: 2,
    title: "Project Management Dashboard",
    description: "A comprehensive project management tool with task tracking, team collaboration features, and real-time updates. Built with React and Firebase.",
    tags: ["React", "Firebase", "Tailwind CSS", "TypeScript", "Chart.js"],
    image: "https://images.pexels.com/photos/5926382/pexels-photo-5926382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    github: "https://github.com/username/project-dashboard",
    demo: "https://project-mgmt.example.com",
    featured: true
  },
  {
    id: 3,
    title: "AI Image Generator",
    description: "A web application that generates images from text descriptions using OpenAI's API. Includes user galleries and sharing functionality.",
    tags: ["Next.js", "OpenAI API", "MongoDB", "Tailwind CSS", "TypeScript"],
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    github: "https://github.com/username/ai-image-generator",
    demo: "https://ai-image-gen.example.com",
    featured: true
  },
  {
    id: 4,
    title: "Fitness Tracking App",
    description: "A mobile-first web application for tracking workouts, nutrition, and fitness goals. Features include progress visualizations and social sharing.",
    tags: ["React Native", "GraphQL", "Node.js", "Express", "MongoDB"],
    image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",

    github: "https://github.com/username/fitness-tracker",
    featured: false
  },
  {
    id: 5,
    title: "Weather Dashboard",
    description: "A weather application that provides current conditions and forecasts for locations worldwide. Features include interactive maps and historical data.",
    tags: ["JavaScript", "HTML", "CSS", "Weather API", "Chart.js"],
    image: "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    github: "https://github.com/username/weather-app",
    demo: "https://weather.example.com",
    featured: false
  },
  {
    id: 6,
    title: "Personal Finance Tracker",
    description: "A web application for tracking personal finances, including income, expenses, investments, and financial goals. Features visualizations and reports.",
    tags: ["React", "Firebase", "D3.js", "Tailwind CSS"],
    image: "https://images.pexels.com/photos/6801874/pexels-photo-6801874.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    github: "https://github.com/username/finance-tracker",
    demo: "https://finance-tracker.example.com",
    featured: false
  }
];