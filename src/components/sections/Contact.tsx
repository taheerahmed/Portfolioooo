import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { socialLinks } from '../../data/social';
import { Github as GitHub, Linkedin, Twitter, Mail, Send, CheckCircle } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FormState {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  github: <GitHub className="w-6 h-6" />,
  linkedin: <Linkedin className="w-6 h-6" />,
  twitter: <Twitter className="w-6 h-6" />,
  mail: <Mail className="w-6 h-6" />,
};

export const Contact: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    message: '',
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle fade in animation
      if (sectionRef.current) {
        gsap.fromTo(
          sectionRef.current.querySelectorAll('.contact-content'),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (formErrors[name as keyof FormErrors]) {
      setFormErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const errors: FormErrors = {};

    if (!formState.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formState.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formState.message.trim()) {
      errors.message = 'Message is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section ref={sectionRef} id="contact" className="py-32 bg-white dark:bg-black">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section header */}
        <div className="max-w-3xl mb-20 contact-content">
          <h2 className="text-5xl md:text-7xl font-bold text-black dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 max-w-6xl">
          {/* Contact info */}
          <div className="lg:col-span-2 contact-content">
            <div className="space-y-8">
              <div>
                <h3 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
                  Email
                </h3>
                <a
                  href="mailto:hello@example.com"
                  className="text-xl text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                >
                  hello@example.com
                </a>
              </div>

              <div>
                <h3 className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-600 mb-4">
                  Social
                </h3>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <a
                      key={link.platform}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-black dark:text-white hover:text-gray-600 dark:hover:text-gray-400 transition-colors"
                      aria-label={`Connect on ${link.platform}`}
                    >
                      {iconMap[link.platform] ?? null}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3 contact-content">
            {isSubmitted ? (
              <motion.div
                className="flex flex-col items-center justify-center py-20"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
              >
                <CheckCircle className="w-16 h-16 text-black dark:text-white mb-4" />
                <p className="text-xl text-black dark:text-white">
                  Message sent successfully!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm text-gray-600 dark:text-gray-400 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white ${
                      formErrors.name ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Your name"
                  />
                  {formErrors.name && (
                    <p className="mt-2 text-sm text-red-500">{formErrors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm text-gray-600 dark:text-gray-400 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white ${
                      formErrors.email ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {formErrors.email && (
                    <p className="mt-2 text-sm text-red-500">{formErrors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm text-gray-600 dark:text-gray-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    rows={6}
                    className={`w-full px-6 py-4 bg-gray-50 dark:bg-gray-900 text-black dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white resize-none ${
                      formErrors.message ? 'ring-2 ring-red-500' : ''
                    }`}
                    placeholder="Tell me about your project..."
                  />
                  {formErrors.message && (
                    <p className="mt-2 text-sm text-red-500">{formErrors.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-4 bg-black dark:bg-white text-white dark:text-black text-lg font-medium rounded-full hover:shadow-xl transition-shadow duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
