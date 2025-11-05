import React, { useRef, useEffect } from 'react';
import { experiences } from '../../data/experience';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const Companies: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate heading
      gsap.fromTo(
        '.companies-heading',
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Animate company logos with stagger
      const logos = gsap.utils.toArray('.company-item');

      logos.forEach((logo: any, index) => {
        // Entrance animation
        gsap.fromTo(
          logo,
          {
            opacity: 0,
            scale: 0.8,
            y: 50,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 0.6,
            delay: index * 0.1,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: logo,
              start: 'top 85%',
            },
          }
        );

        // Continuous subtle float
        gsap.to(logo, {
          y: -10,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });

      // Parallax on scroll
      gsap.to('.companies-container', {
        y: -50,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const companies = experiences.map((exp) => ({
    name: exp.company,
    logo: exp.logo,
  }));

  return (
    <section
      ref={sectionRef}
      className="py-32 bg-white dark:bg-black overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Heading */}
        <div className="text-center mb-20">
          <h2 className="companies-heading text-sm uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600 font-light">
            Trusted by
          </h2>
        </div>

        {/* Companies grid */}
        <div className="companies-container max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-16 items-center justify-items-center">
            {companies.map((company, index) => (
              <div
                key={index}
                className="company-item group relative"
                style={{ perspective: '1000px' }}
              >
                <div className="relative w-32 h-32 md:w-40 md:h-40">
                  {/* Logo container with 3D effect */}
                  <div
                    className="absolute inset-0 rounded-full overflow-hidden bg-gray-50 dark:bg-gray-900 transition-all duration-500 group-hover:scale-110"
                    style={{
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    <img
                      src={company.logo}
                      alt={company.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  </div>

                  {/* Subtle ring on hover */}
                  <div className="absolute inset-0 rounded-full border-2 border-black dark:border-white opacity-0 group-hover:opacity-20 transition-opacity duration-500 scale-110" />
                </div>

                {/* Company name on hover */}
                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  <p className="text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400">
                    {company.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
