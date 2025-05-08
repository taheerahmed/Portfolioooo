import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from '../ui/SectionTitle';
import { Button } from '../ui/Button';
import { socialLinks } from '../../data/social';
import { Github as GitHub, Linkedin, Twitter, Mail, Send, CheckCircle, Terminal, Code, Braces } from 'lucide-react';
import { fadeIn, staggerContainer } from '../../utils/motion';

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
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    
    // Clear error when typing
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
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-white dark:bg-black relative overflow-hidden">
      {/* Cyberpunk grid background */}
      <div className="absolute inset-0 bg-cyberpunk-grid dark:bg-cyberpunk-grid bg-[size:40px_40px] opacity-10"></div>
      <div className="absolute inset-0 bg-noise opacity-20"></div>
      
      {/* Terminal-like line accents */}
      <div className="absolute top-0 left-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      <div className="absolute top-0 right-0 w-[2px] h-full bg-gray-900 dark:bg-white opacity-10"></div>
      {/* <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gray-900 dark:bg-white opacity-10"></div> */}
      
      {/* Code elements as background decoration */}
      <Terminal className="absolute top-10 right-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <Code className="absolute bottom-10 left-10 text-black/10 dark:text-white/10 w-16 h-16 hidden lg:block" />
      <Braces className="absolute top-1/2 -translate-y-1/2 right-20 text-black/10 dark:text-white/10 w-12 h-12 hidden lg:block" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <SectionTitle 
          title="<Contact />" 
          subtitle="// Have a project in mind? Let's talk about it"
          align="center" 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <motion.div
            variants={fadeIn('right', 'tween', 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            <h3 className="text-2xl font-mono font-bold text-black dark:text-white mb-6 border-b border-black/20 dark:border-white/20 pb-3 inline-block">
              <span className="text-black/50 dark:text-white/50">const</span> contactInfo = {"{"};
            </h3>
            
            <p className="text-black/80 dark:text-white/80 mb-8 text-sm border-l-2 border-black/20 dark:border-white/20 pl-3 font-mono">
              /* I'm currently available for freelance work and full-time positions. If you have a project that needs coding or want to discuss potential collaborations, feel free to reach out. */
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center flex-shrink-0 shadow-code-block dark:shadow-inner-glow border border-black/50 dark:border-white/50">
                  <Mail className="w-5 h-5 text-white dark:text-black animate-glitch" />
                </div>
                <div>
                  <h4 className="font-mono font-medium text-black dark:text-white">email: {"{"};</h4>
                  <a href="mailto:hello@example.com" className="text-black/80 dark:text-white/80 hover:text-black hover:dark:text-white transition-colors duration-300 font-mono text-sm pl-4 border-l border-black/10 dark:border-white/10 block mt-1">"hello@example.com"</a>
                  <span className="font-mono text-black/70 dark:text-white/70 text-sm">{"}"};</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-10 h-10 bg-black dark:bg-white flex items-center justify-center flex-shrink-0 shadow-code-block dark:shadow-inner-glow border border-black/50 dark:border-white/50">
                  <GitHub className="w-5 h-5 text-white dark:text-black animate-glitch" />
                </div>
                <div>
                  <h4 className="font-mono font-medium text-black dark:text-white">github: {"{"};</h4>
                  <a href="https://github.com" className="text-black/80 dark:text-white/80 hover:text-black hover:dark:text-white transition-colors duration-300 font-mono text-sm pl-4 border-l border-black/10 dark:border-white/10 block mt-1">"github.com"</a>
                  <span className="font-mono text-black/70 dark:text-white/70 text-sm">{"}"};</span>
                </div>
              </div>
            </div>
            
            <div className="mt-8">
              <h4 className="font-mono font-medium text-lg text-black dark:text-white mb-4">socials: ["..."];</h4>
              <div className="flex space-x-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-white dark:bg-black border-2 border-black dark:border-white flex items-center justify-center shadow-sm dark:shadow-code-block dark:shadow-inner-glow hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                    aria-label={`Connect on ${link.platform}`}
                  >
                    {iconMap[link.platform] ?? null}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
          
          <motion.div
            variants={fadeIn('left', 'tween', 0.2, 1)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-50px' }}
          >
            <div className="bg-white dark:bg-dark-surface rounded-xl shadow-sm dark:shadow-lg p-8">
              <h3 className="text-2xl font-mono font-bold text-black dark:text-white mb-6 border-b border-black/20 dark:border-white/20 pb-3 inline-block">
              <span className="text-black/50 dark:text-white/50">function</span> sendMessage() {"{"};
            </h3>
              
              {isSubmitted ? (
                <motion.div
                  className="flex flex-col items-center justify-center py-12"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 120 }}
                >
                  <p className="bg-black dark:bg-white text-white dark:text-black p-4 border border-black dark:border-white shadow-sm dark:shadow-code-block dark:shadow-inner-glow flex items-center mb-6 font-mono text-sm">
                  <CheckCircle className="w-5 h-5 mr-2 flex-shrink-0 animate-glitch" />
                  // Your message has been sent successfully
                  <span className="animate-cursor-blink ml-1">|</span>
                </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <motion.div
                    variants={staggerContainer()}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="space-y-6"
                  >
                    <motion.div variants={fadeIn('up', 'spring', 0.1, 0.75)}>
                      <label htmlFor="name" className="block text-sm font-mono text-black dark:text-white mb-1">
                        name: string;
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.name 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-black/50 dark:border-white/50'
                        } bg-white dark:bg-black text-black dark:text-white focus:outline-none shadow-sm dark:shadow-code-block dark:shadow-inner-glow`}
                        placeholder="const name = 'Taheer';"
                      />
                      {formErrors.name && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.name}</p>
                      )}
                    </motion.div>
                    
                    <motion.div variants={fadeIn('up', 'spring', 0.2, 0.75)}>
                      <label htmlFor="email" className="block text-sm font-mono text-black dark:text-white mb-1">
                        email: string;
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border ${
                          formErrors.email 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-black/50 dark:border-white/50'
                        } bg-white dark:bg-black text-black dark:text-white focus:outline-none shadow-sm dark:shadow-code-block dark:shadow-inner-glow`}
                        placeholder="const email = 'john@example.com';"
                      />
                      {formErrors.email && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.email}</p>
                      )}
                    </motion.div>
                    
                    <motion.div variants={fadeIn('up', 'spring', 0.3, 0.75)}>
                      <label htmlFor="message" className="block text-sm font-mono text-black dark:text-white mb-1">
                        message: string;
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 border font-mono ${
                          formErrors.message 
                            ? 'border-red-500 dark:border-red-500' 
                            : 'border-black/50 dark:border-white/50'
                        } bg-white dark:bg-black text-black dark:text-white focus:outline-none shadow-sm dark:shadow-code-block dark:shadow-inner-glow`}
                        placeholder="/* Hello, I'd like to talk about... */"
                      />
                      {formErrors.message && (
                        <p className="mt-1 text-sm text-red-500">{formErrors.message}</p>
                      )}
                    </motion.div>
                    
                    <motion.div variants={fadeIn('up', 'spring', 0.4, 0.75)}>
                      <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        className="w-full bg-black dark:bg-white text-white dark:text-black border border-black dark:border-white shadow-sm dark:shadow-code-block dark:shadow-inner-glow hover:bg-black/90 dark:hover:bg-white/90"
                        isLoading={isSubmitting}
                        icon={<Code size={18} />}
                      >
                        message.send();
                      </Button>
                    </motion.div>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};