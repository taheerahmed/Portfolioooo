import { useEffect, useRef } from 'react';

interface LaserFlowProps {
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  color?: string;
  speed?: number;
}

const LaserFlow: React.FC<LaserFlowProps> = ({
  horizontalBeamOffset = 0.0,
  verticalBeamOffset = 0.0,
  color = '#3b82f6',
  speed = 0.5,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resize();
    window.addEventListener('resize', resize);

    // Convert hex color to RGB
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 59, g: 130, b: 246 };
    };

    const rgb = hexToRgb(color);

    const drawLaser = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      ctx.clearRect(0, 0, width, height);

      // Create gradient background
      const bgGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width, height) / 2
      );
      bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Number of laser beams
      const numBeams = 8;

      for (let i = 0; i < numBeams; i++) {
        // Horizontal beams
        const yPos =
          (height / (numBeams + 1)) * (i + 1) +
          Math.sin(time * speed + i * 0.5) * 30 +
          height * horizontalBeamOffset;

        const gradient = ctx.createLinearGradient(0, yPos, width, yPos);
        gradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        gradient.addColorStop(0.1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
        gradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.4)`);
        gradient.addColorStop(0.9, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
        gradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2 + Math.sin(time * speed * 2 + i) * 1;
        ctx.shadowBlur = 20;
        ctx.shadowColor = color;

        ctx.beginPath();
        const segments = 50;
        for (let j = 0; j <= segments; j++) {
          const x = (width / segments) * j;
          const y =
            yPos +
            Math.sin((x / width) * Math.PI * 4 + time * speed + i * 0.5) * 5;
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();

        // Vertical beams
        const xPos =
          (width / (numBeams + 1)) * (i + 1) +
          Math.cos(time * speed + i * 0.5) * 30 +
          width * verticalBeamOffset;

        const vGradient = ctx.createLinearGradient(xPos, 0, xPos, height);
        vGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);
        vGradient.addColorStop(0.1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
        vGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.3)`);
        vGradient.addColorStop(0.9, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.1)`);
        vGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

        ctx.strokeStyle = vGradient;
        ctx.lineWidth = 2 + Math.cos(time * speed * 2 + i) * 1;

        ctx.beginPath();
        for (let j = 0; j <= segments; j++) {
          const y = (height / segments) * j;
          const x =
            xPos +
            Math.cos((y / height) * Math.PI * 4 + time * speed + i * 0.5) * 5;
          if (j === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      }

      // Draw glowing dots along some beams
      for (let i = 0; i < 6; i++) {
        const dotX =
          ((time * speed * 100 + i * 200) % width) +
          Math.sin(time * speed + i) * 20;
        const dotY =
          (height / 7) * (i + 1) + Math.sin(time * speed + i * 0.5) * 30;

        const dotGradient = ctx.createRadialGradient(
          dotX,
          dotY,
          0,
          dotX,
          dotY,
          10
        );
        dotGradient.addColorStop(0, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`);
        dotGradient.addColorStop(0.5, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.5)`);
        dotGradient.addColorStop(1, `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0)`);

        ctx.fillStyle = dotGradient;
        ctx.shadowBlur = 15;
        ctx.shadowColor = color;
        ctx.beginPath();
        ctx.arc(dotX, dotY, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      time += 0.016; // ~60fps
      animationFrameId = requestAnimationFrame(drawLaser);
    };

    drawLaser();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, horizontalBeamOffset, verticalBeamOffset, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
};

export default LaserFlow;
