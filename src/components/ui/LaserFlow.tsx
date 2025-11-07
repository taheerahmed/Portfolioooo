import { useEffect, useRef } from 'react';

interface LaserFlowProps {
  horizontalBeamOffset?: number;
  verticalBeamOffset?: number;
  color?: string;
}

const LaserFlow: React.FC<LaserFlowProps> = ({
  horizontalBeamOffset = 0.0,
  verticalBeamOffset = 0.0,
  color = '#FF79C6',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl as WebGLRenderingContext;

    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fragmentShaderSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec3 u_color;
      uniform float u_horizontalOffset;
      uniform float u_verticalOffset;

      float random(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = random(i);
        float b = random(i + vec2(1.0, 0.0));
        float c = random(i + vec2(0.0, 1.0));
        float d = random(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 st = gl_FragCoord.xy / u_resolution.xy;
        vec2 pos = st * 2.0 - 1.0;
        pos.x *= u_resolution.x / u_resolution.y;

        float t = u_time * 0.3;

        // Create flowing laser beams
        float beams = 0.0;

        // Horizontal beams
        for (float i = 0.0; i < 8.0; i++) {
          float y = sin(i * 0.8 + t) * 0.6 + u_horizontalOffset;
          float wave = sin(pos.x * 3.0 + t * 2.0 + i * 0.5) * 0.1;
          y += wave;

          float beam = 1.0 / (abs(pos.y - y) * 80.0);
          beam *= 0.5 + 0.5 * sin(t * 3.0 + i);
          beams += beam;
        }

        // Vertical beams
        for (float i = 0.0; i < 8.0; i++) {
          float x = cos(i * 0.9 + t * 1.1) * 0.7 + u_verticalOffset;
          float wave = cos(pos.y * 3.0 + t * 2.0 + i * 0.5) * 0.1;
          x += wave;

          float beam = 1.0 / (abs(pos.x - x) * 80.0);
          beam *= 0.5 + 0.5 * cos(t * 2.5 + i);
          beams += beam;
        }

        // Diagonal flowing lines
        for (float i = 0.0; i < 4.0; i++) {
          float angle = t * 0.5 + i * 1.57;
          vec2 dir = vec2(cos(angle), sin(angle));
          float dist = abs(dot(pos, dir) - sin(t + i) * 0.5);
          float line = 1.0 / (dist * 100.0);
          line *= 0.3 + 0.3 * sin(t * 2.0 + i);
          beams += line;
        }

        // Add flowing particles
        float particles = 0.0;
        for (float i = 0.0; i < 20.0; i++) {
          vec2 particlePos = vec2(
            cos(t * 1.5 + i * 0.314) * 0.8,
            sin(t * 2.0 + i * 0.628) * 0.8
          );
          float dist = length(pos - particlePos);
          particles += 0.015 / dist;
        }

        // Combine effects
        float intensity = beams + particles * 0.5;

        // Add glow and color
        vec3 col = u_color * intensity;
        col += u_color * 0.5 * pow(intensity, 3.0);

        // Add subtle noise texture
        float noiseValue = fbm(st * 3.0 + t * 0.1) * 0.1;
        col += noiseValue * u_color * 0.2;

        // Vignette effect
        float vignette = 1.0 - length(pos) * 0.3;
        col *= vignette;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    // Compile shaders
    const compileShader = (source: string, type: number) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER);
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER);

    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1,
      1, -1,
      -1, 1,
      1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const colorLocation = gl.getUniformLocation(program, 'u_color');
    const horizontalOffsetLocation = gl.getUniformLocation(program, 'u_horizontalOffset');
    const verticalOffsetLocation = gl.getUniformLocation(program, 'u_verticalOffset');

    // Parse color
    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? [
            parseInt(result[1], 16) / 255,
            parseInt(result[2], 16) / 255,
            parseInt(result[3], 16) / 255,
          ]
        : [1.0, 0.48, 0.78];
    };

    const rgbColor = hexToRgb(color);

    // Resize
    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resize();
    window.addEventListener('resize', resize);

    // Animation loop
    let startTime = Date.now();
    let animationFrameId: number;

    const render = () => {
      const time = (Date.now() - startTime) * 0.001;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, time);
      gl.uniform3f(colorLocation, rgbColor[0], rgbColor[1], rgbColor[2]);
      gl.uniform1f(horizontalOffsetLocation, horizontalBeamOffset);
      gl.uniform1f(verticalOffsetLocation, verticalBeamOffset);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [color, horizontalBeamOffset, verticalBeamOffset]);

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
