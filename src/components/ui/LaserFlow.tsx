import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface LaserFlowProps {
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  color?: string;
}

const LaserFlow: React.FC<LaserFlowProps> = ({
  color = '#3b82f6',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      // Animate connection lines
      gsap.utils.toArray<SVGPathElement>('.connection-line').forEach((line, index) => {
        gsap.fromTo(
          line,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 3,
            ease: 'none',
            repeat: -1,
            delay: index * 0.2,
          }
        );

        // Pulsing opacity
        gsap.to(line, {
          opacity: [0.3, 0.8, 0.3],
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          delay: index * 0.3,
        });
      });

      // Animate data particles
      gsap.utils.toArray<SVGCircleElement>('.data-particle').forEach((particle, index) => {
        const pathIndex = Math.floor(index / 3) % 6;

        gsap.to(particle, {
          motionPath: {
            path: `.connection-line-${pathIndex}`,
            align: `.connection-line-${pathIndex}`,
            alignOrigin: [0.5, 0.5],
            start: (index % 3) * 0.33,
            end: (index % 3) * 0.33 + 1,
          },
          duration: 4 + (index % 3) * 0.5,
          ease: 'none',
          repeat: -1,
        });

        // Pulsing particle
        gsap.to(particle, {
          opacity: [0, 1, 1, 0],
          scale: [0.5, 1, 1, 0.5],
          duration: 4 + (index % 3) * 0.5,
          ease: 'none',
          repeat: -1,
        });
      });

      // Animate tool icons
      gsap.utils.toArray('.tool-icon').forEach((icon: any, index) => {
        // Float animation
        gsap.to(icon, {
          y: '+=10',
          duration: 2 + index * 0.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });

        // Glow pulse
        gsap.to(icon, {
          filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.6)) drop-shadow(0 0 16px rgba(59, 130, 246, 0.3))',
          duration: 2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, [color]);

  // Tool configuration with icon content
  const tools = [
    { name: 'Cursor', icon: '⚡', color: '#3b82f6' },
    { name: 'Claude', icon: '🧠', color: '#8b5cf6' },
    { name: 'Gemini', icon: '✨', color: '#ec4899' },
    { name: 'Notion', icon: '📝', color: '#6366f1' },
    { name: 'GitHub', icon: '🐙', color: '#3b82f6' },
    { name: 'Windsurf', icon: '🌊', color: '#06b6d4' },
  ];

  return (
    <div ref={containerRef} className="absolute inset-0 flex items-center justify-center">
      <svg
        className="w-full h-full"
        viewBox="0 0 1200 800"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Gradient for lines */}
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.1" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.1" />
          </linearGradient>

          {/* Glow filter */}
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Connection lines forming a network */}
        {/* Center to top-left */}
        <path
          className="connection-line connection-line-0"
          d="M 600 400 Q 450 300 300 250"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity="0.5"
          filter="url(#glow)"
        />

        {/* Center to top-right */}
        <path
          className="connection-line connection-line-1"
          d="M 600 400 Q 750 300 900 250"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity="0.5"
          filter="url(#glow)"
        />

        {/* Center to bottom-left */}
        <path
          className="connection-line connection-line-2"
          d="M 600 400 Q 450 500 300 550"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity="0.5"
          filter="url(#glow)"
        />

        {/* Center to bottom-right */}
        <path
          className="connection-line connection-line-3"
          d="M 600 400 Q 750 500 900 550"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity="0.5"
          filter="url(#glow)"
        />

        {/* Left side connection */}
        <path
          className="connection-line connection-line-4"
          d="M 300 250 Q 200 400 300 550"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity="0.5"
          filter="url(#glow)"
        />

        {/* Right side connection */}
        <path
          className="connection-line connection-line-5"
          d="M 900 250 Q 1000 400 900 550"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity="0.5"
          filter="url(#glow)"
        />

        {/* Data particles */}
        {Array.from({ length: 18 }).map((_, i) => (
          <circle
            key={i}
            className="data-particle"
            r="4"
            fill={i % 3 === 0 ? '#3b82f6' : i % 3 === 1 ? '#8b5cf6' : '#ec4899'}
            opacity="0"
            filter="url(#glow)"
          />
        ))}

        {/* Tool icons as SVG groups */}
        {/* Top-left - Cursor */}
        <g className="tool-icon" transform="translate(300, 250)">
          <circle cx="0" cy="0" r="40" fill="#1e293b" stroke="#3b82f6" strokeWidth="2" />
          <text x="0" y="0" fontSize="32" textAnchor="middle" dominantBaseline="central">
            {tools[0].icon}
          </text>
        </g>

        {/* Top-right - Claude */}
        <g className="tool-icon" transform="translate(900, 250)">
          <circle cx="0" cy="0" r="40" fill="#1e293b" stroke="#8b5cf6" strokeWidth="2" />
          <text x="0" y="0" fontSize="32" textAnchor="middle" dominantBaseline="central">
            {tools[1].icon}
          </text>
        </g>

        {/* Bottom-left - Gemini */}
        <g className="tool-icon" transform="translate(300, 550)">
          <circle cx="0" cy="0" r="40" fill="#1e293b" stroke="#ec4899" strokeWidth="2" />
          <text x="0" y="0" fontSize="32" textAnchor="middle" dominantBaseline="central">
            {tools[2].icon}
          </text>
        </g>

        {/* Bottom-right - Notion */}
        <g className="tool-icon" transform="translate(900, 550)">
          <circle cx="0" cy="0" r="40" fill="#1e293b" stroke="#6366f1" strokeWidth="2" />
          <text x="0" y="0" fontSize="32" textAnchor="middle" dominantBaseline="central">
            {tools[3].icon}
          </text>
        </g>

        {/* Center - GitHub */}
        <g className="tool-icon" transform="translate(600, 400)">
          <circle cx="0" cy="0" r="45" fill="#1e293b" stroke="#3b82f6" strokeWidth="3" />
          <text x="0" y="0" fontSize="36" textAnchor="middle" dominantBaseline="central">
            {tools[4].icon}
          </text>
        </g>

        {/* Add Windsurf to complete the network */}
        <g className="tool-icon" transform="translate(600, 200)">
          <circle cx="0" cy="0" r="40" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
          <text x="0" y="0" fontSize="32" textAnchor="middle" dominantBaseline="central">
            {tools[5].icon}
          </text>
        </g>

        {/* Additional connection to Windsurf */}
        <path
          className="connection-line connection-line-6"
          d="M 600 400 L 600 200"
          fill="none"
          stroke="url(#line-gradient)"
          strokeWidth="2"
          strokeDasharray="10 5"
          opacity="0.5"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
};

export default LaserFlow;
