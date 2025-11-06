/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
      },
      colors: {
        // Dark Theme - Ultra-sharp monochrome with dramatic contrast
        dark: {
          background: '#000000', // Pure black for maximum contrast
          surface: '#0a0a0a',    // Almost black - creates depth without losing darkness
          border: '#1a1a1a',     // Very dark border for subtle separation
          primary: '#ffffff',    // Pure white - creates maximum contrast
          secondary: '#8a8a8a',  // Medium gray - high contrast secondary elements
          accent: '#f0f0f0',     // Near-white accent - for sharp highlights
        },
        // Light Theme - High-contrast monochrome with edgy feel
        light: {
          background: '#ffffff', // Pure white
          surface: '#f4f4f4',    // Very slightly off-white - maintains cleanliness
          border: '#d9d9d9',     // Light gray border - subtle but defined
          primary: '#000000',    // Pure black - maximum contrast
          secondary: '#404040',  // Dark gray - strong contrast but not full black
          accent: '#171717',     // Nearly black - for striking accents
        },
      },
      animation: {
        'pulse-line': 'pulse-line 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'line-flow': 'line-flow 2s linear infinite',
        'border-pulse': 'border-pulse 2s ease-in-out infinite',
        'light-pulse': 'light-pulse-line 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'light-float': 'float 8s ease-in-out infinite',
        'light-border-pulse': 'light-border-pulse 3s ease-in-out infinite',
        'glitch': 'glitch 1.5s ease-in-out infinite alternate',
        'code-pulse': 'code-pulse 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'cursor-blink': 'cursor-blink 0.75s step-end infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        'pulse-line': {
          '0%, 100%': { opacity: 0.05 },
          '50%': { opacity: 0.4 },
        },
        'light-pulse-line': {
          '0%, 100%': { opacity: 0.03 },
          '50%': { opacity: 0.2 },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'line-flow': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
        'glitch': {
          '0%, 100%': { transform: 'translate(0)' },
          '34%': { transform: 'translate(1px, -1px)' },
          '67%': { transform: 'translate(-1px, 1px)' },
        },
        'code-pulse': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 255, 255, 0)' },
          '50%': { boxShadow: '0 0 10px 2px rgba(255, 255, 255, 0.15)' },
        },
        'border-pulse': {
          '0%, 100%': { borderColor: 'rgba(255, 255, 255, 0.05)' },
          '50%': { borderColor: 'rgba(255, 255, 255, 0.4)' },
        },
        'light-border-pulse': {
          '0%, 100%': { borderColor: 'rgba(0, 0, 0, 0.05)' },
          '50%': { borderColor: 'rgba(0, 0, 0, 0.4)' },
        },
        'typing': {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'cursor-blink': {
          '0%, 100%': { opacity: 0 },
          '50%': { opacity: 1 },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      boxShadow: {
        // Dark mode shadows - angular and edgy for a developer aesthetic
        'sharp': '-15px -15px 30px rgba(255,255,255,0.02), 15px 15px 30px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)',
        'inner-glow': 'inset 0 0 20px rgba(255,255,255,0.07), inset 0 0 0 1px rgba(255,255,255,0.05)',
        'line': '0 0 1px rgba(255,255,255,0.3), 0 0 0 1px rgba(255,255,255,0.05)',
        'code-block': '0 0 0 1px rgba(255,255,255,0.05), 0 16px 32px rgba(0,0,0,0.7)',
        // Light mode shadows - precise and technical
        'light-sharp': '0 20px 40px -20px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.05), 0 0 0 transparent',
        'light-subtle': '0 4px 20px -4px rgba(0, 0, 0, 0.08), 0 0 0 1px rgba(0, 0, 0, 0.03)',
        'light-card': '0 20px 50px -25px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'light-button': '0 4px 12px -2px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
        'light-glow': '0 0 30px 8px rgba(0, 0, 0, 0.15)',
        'light-code-block': '0 10px 30px -10px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        // Dark mode patterns - developer-style grid and line patterns
        'line-pattern': 'repeating-linear-gradient(90deg, rgba(255,255,255,0.08) 0px, rgba(255,255,255,0.08) 1px, transparent 1px, transparent 12px)',
        'grid-pattern': 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
        'gradient-line': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        'code-background': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
        'noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\' opacity=\'0.05\'/%3E%3C/svg%3E")',
        'cyberpunk-grid': 'radial-gradient(circle at 50% 0, rgba(255,255,255,0.15), rgba(0,0,0,0) 70%), linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)',
        // Light mode patterns - subtle techie patterns
        'light-line-pattern': 'repeating-linear-gradient(90deg, rgba(0,0,0,0.05) 0px, rgba(0,0,0,0.05) 1px, transparent 1px, transparent 12px)',
        'light-grid-pattern': 'linear-gradient(rgba(0,0,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.04) 1px, transparent 1px)',
        'light-gradient-line': 'linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)',
        'light-code-background': 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0) 100%)',
        'light-noise': 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
        'light-cyberpunk-grid': 'radial-gradient(circle at 50% 0, rgba(0,0,0,0.03), rgba(0,0,0,0) 70%), linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
};