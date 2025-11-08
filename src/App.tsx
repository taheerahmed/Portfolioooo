import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { PageTransition } from './components/ui/PageTransition';
import { HomePage } from './pages/HomePage';
import { AllProjects } from './pages/AllProjects';
import { initSmoothScroll } from './utils/smoothScroll';

function AppContent() {
  const location = useLocation();

  useEffect(() => {
    // Initialize smooth scrolling
    const lenis = initSmoothScroll();

    return () => {
      // Clean up if needed
      lenis.destroy();
    };
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
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

      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<AllProjects />} />
        </Routes>
      </PageTransition>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;