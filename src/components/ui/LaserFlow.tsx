import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';

gsap.registerPlugin(MotionPathPlugin);

interface NetworkNode {
  id: string;
  x: number;
  y: number;
  size: number;
  color: string;
  label: string;
  icon: string;
}

const LaserFlow: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Define sophisticated network nodes
  const nodes: NetworkNode[] = [
    { id: 'center', x: 50, y: 50, size: 80, color: '#3b82f6', label: 'YOU', icon: '⚡' },
    { id: 'cursor', x: 20, y: 25, size: 60, color: '#06b6d4', label: 'Cursor', icon: '◆' },
    { id: 'claude', x: 80, y: 25, size: 60, color: '#8b5cf6', label: 'Claude', icon: '◆' },
    { id: 'gemini', x: 15, y: 65, size: 55, color: '#ec4899', label: 'Gemini', icon: '◆' },
    { id: 'github', x: 85, y: 65, size: 55, color: '#10b981', label: 'GitHub', icon: '◆' },
    { id: 'notion', x: 35, y: 85, size: 50, color: '#f59e0b', label: 'Notion', icon: '◆' },
    { id: 'windsurf', x: 65, y: 15, size: 50, color: '#06b6d4', label: 'Windsurf', icon: '◆' },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let time = 0;

    const resize = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Convert percentage to pixels
    const toPixels = (node: NetworkNode) => ({
      x: (node.x / 100) * canvas.width,
      y: (node.y / 100) * canvas.height,
    });

    // Draw connections with flowing gradients
    const drawConnections = () => {
      const centerNode = nodes[0];
      const centerPos = toPixels(centerNode);

      nodes.slice(1).forEach((node, index) => {
        const nodePos = toPixels(node);

        // Create flowing gradient
        const gradient = ctx.createLinearGradient(
          centerPos.x,
          centerPos.y,
          nodePos.x,
          nodePos.y
        );

        const offset = (time * 0.5 + index * 0.3) % 1;

        gradient.addColorStop(0, `${node.color}00`);
        gradient.addColorStop(Math.max(0, offset - 0.2), `${node.color}00`);
        gradient.addColorStop(offset, node.color);
        gradient.addColorStop(Math.min(1, offset + 0.2), `${node.color}00`);
        gradient.addColorStop(1, `${node.color}00`);

        // Draw glowing line
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 3;
        ctx.shadowBlur = 20;
        ctx.shadowColor = node.color;

        ctx.beginPath();
        ctx.moveTo(centerPos.x, centerPos.y);

        // Curved connection
        const cpX = (centerPos.x + nodePos.x) / 2 + Math.sin(time + index) * 50;
        const cpY = (centerPos.y + nodePos.y) / 2 + Math.cos(time + index) * 50;
        ctx.quadraticCurveTo(cpX, cpY, nodePos.x, nodePos.y);

        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // Draw connecting lines between outer nodes
      for (let i = 1; i < nodes.length - 1; i++) {
        const node1 = nodes[i];
        const node2 = nodes[i + 1];
        const pos1 = toPixels(node1);
        const pos2 = toPixels(node2);

        const gradient = ctx.createLinearGradient(pos1.x, pos1.y, pos2.x, pos2.y);
        gradient.addColorStop(0, `${node1.color}40`);
        gradient.addColorStop(0.5, `${node2.color}60`);
        gradient.addColorStop(1, `${node2.color}40`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.globalAlpha = 0.3 + Math.sin(time * 2 + i) * 0.2;
        ctx.shadowBlur = 10;
        ctx.shadowColor = node1.color;

        ctx.beginPath();
        ctx.moveTo(pos1.x, pos1.y);
        ctx.lineTo(pos2.x, pos2.y);
        ctx.stroke();

        ctx.globalAlpha = 1;
        ctx.shadowBlur = 0;
      }
    };

    // Draw particles
    const drawParticles = () => {
      nodes.slice(1).forEach((node, index) => {
        const centerPos = toPixels(nodes[0]);
        const nodePos = toPixels(node);

        const progress = ((time * 0.3 + index * 0.15) % 1);

        // Curved path calculation
        const cpX = (centerPos.x + nodePos.x) / 2 + Math.sin(time + index) * 50;
        const cpY = (centerPos.y + nodePos.y) / 2 + Math.cos(time + index) * 50;

        const t = progress;
        const x = (1 - t) * (1 - t) * centerPos.x + 2 * (1 - t) * t * cpX + t * t * nodePos.x;
        const y = (1 - t) * (1 - t) * centerPos.y + 2 * (1 - t) * t * cpY + t * t * nodePos.y;

        // Draw particle
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 15);
        gradient.addColorStop(0, node.color);
        gradient.addColorStop(0.5, `${node.color}80`);
        gradient.addColorStop(1, `${node.color}00`);

        ctx.fillStyle = gradient;
        ctx.shadowBlur = 15;
        ctx.shadowColor = node.color;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Trail
        for (let i = 1; i <= 3; i++) {
          const trailT = Math.max(0, progress - i * 0.05);
          const tx = (1 - trailT) * (1 - trailT) * centerPos.x + 2 * (1 - trailT) * trailT * cpX + trailT * trailT * nodePos.x;
          const ty = (1 - trailT) * (1 - trailT) * centerPos.y + 2 * (1 - trailT) * trailT * cpY + trailT * trailT * nodePos.y;

          ctx.fillStyle = `${node.color}${Math.floor((1 - i / 4) * 50).toString(16).padStart(2, '0')}`;
          ctx.beginPath();
          ctx.arc(tx, ty, 3, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      drawConnections();
      drawParticles();

      time += 0.016;
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Animate HTML nodes
    const htmlCtx = gsap.context(() => {
      gsap.utils.toArray('.network-node').forEach((node: any, index) => {
        gsap.to(node, {
          y: '+=8',
          duration: 2 + index * 0.2,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      htmlCtx.revert();
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      {/* Canvas for connections and particles */}
      <canvas ref={canvasRef} className="absolute inset-0" />

      {/* HTML nodes for crisp rendering */}
      <div className="absolute inset-0">
        {nodes.map((node, index) => (
          <div
            key={node.id}
            className="network-node absolute"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: 'translate(-50%, -50%)',
            }}
          >
            {/* Node circle */}
            <div
              className="relative flex items-center justify-center rounded-full transition-all duration-300"
              style={{
                width: `${node.size}px`,
                height: `${node.size}px`,
                background: `radial-gradient(circle at 30% 30%, ${node.color}40, ${node.color}20)`,
                border: `2px solid ${node.color}`,
                boxShadow: `0 0 30px ${node.color}60, 0 0 60px ${node.color}30, inset 0 0 20px ${node.color}20`,
              }}
            >
              {/* Icon */}
              <span
                className="text-2xl font-bold"
                style={{ color: node.color, filter: 'brightness(1.5)' }}
              >
                {node.icon}
              </span>

              {/* Pulse rings */}
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{
                  background: `radial-gradient(circle, ${node.color}40, transparent)`,
                  opacity: 0.3,
                  animationDuration: `${2 + index * 0.3}s`,
                }}
              />
            </div>

            {/* Label */}
            <div
              className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-semibold tracking-wider opacity-80"
              style={{ color: node.color }}
            >
              {node.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LaserFlow;
