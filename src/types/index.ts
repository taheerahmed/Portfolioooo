export interface Project {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  github?: string;
  demo?: string;
  featured: boolean;
}

export interface Experience {
  id: number;
  company: string;
  role: string;
  duration: string;
  description: string;
  achievements: string[];
  skills: string[];
  logo: string;
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  text: string;
  image: string;
}

export interface Skill {
  name: string;
  icon: string;
  level: number;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}