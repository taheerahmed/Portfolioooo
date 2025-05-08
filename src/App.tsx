import { useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Experience } from './components/sections/Experience';
import { Testimonials } from './components/sections/Testimonials';
import { Contact } from './components/sections/Contact';
import { initSmoothScroll } from './utils/smoothScroll';

function App() {
  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll();
    
    return () => {
      // Clean up if needed
      lenis.destroy();
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="relative min-h-screen overflow-hidden bg-light-background dark:bg-dark-background text-gray-900 dark:text-white">
        {/* Background decorative elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {/* Light mode subtle gradients */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-blue-100/30 via-indigo-100/20 to-transparent dark:opacity-0 transform translate-x-1/3 -translate-y-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-100/20 via-blue-100/20 to-transparent dark:opacity-0 transform -translate-x-1/3 translate-y-1/3 blur-3xl" />
          
          {/* Dark mode subtle gradients */}
          <div className="absolute top-0 right-0 w-[800px] h-[800px] rounded-full bg-gradient-to-bl from-blue-900/10 via-indigo-900/5 to-transparent opacity-0 dark:opacity-100 transform translate-x-1/3 -translate-y-1/3 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-purple-900/10 via-blue-900/5 to-transparent opacity-0 dark:opacity-100 transform -translate-x-1/3 translate-y-1/3 blur-3xl" />
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-light-grid-pattern dark:bg-grid-pattern bg-[size:40px_40px] opacity-[0.015] dark:opacity-[0.03]" />
        </div>
        
        <Navbar />
        <main className="relative z-10 pt-24 lg:pt-6">
          <Hero />
          <Projects />
          <About />
          <Experience />
          <Testimonials />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;