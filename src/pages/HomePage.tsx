import React from 'react';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Projects } from '../components/sections/Projects';
import { Experience } from '../components/sections/Experience';
import { Companies } from '../components/sections/Companies';
import { Testimonials } from '../components/sections/Testimonials';
import { Contact } from '../components/sections/Contact';

export const HomePage: React.FC = () => {
  return (
    <main className="relative z-10 pt-24 lg:pt-6">
      <Hero />
      <Projects />
      <About />
      <Experience />
      <Companies />
      <Testimonials />
      <Contact />
    </main>
  );
};
