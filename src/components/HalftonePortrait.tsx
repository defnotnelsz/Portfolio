import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useTheme } from '../hooks/useTheme';

interface HalftonePortraitProps {
  src: string;
  alt?: string;
  className?: string;
}

interface DotData {
  normX: number;
  normY: number;
  val: number;
  alpha: number;
}

// Pseudo-random deterministic hash for irregular stippling
function hash2D(x: number, y: number): number {
  const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
  return n - Math.floor(n);
}

export const HalftonePortrait: React.FC<HalftonePortraitProps> = ({
  src,
  alt = 'Janelie Sayson Blanco',
  className = '',
}) => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isLoaded, setIsLoaded] = useState(false);

  // Cached image element
  const imageRef = useRef<HTMLImageElement | null>(null);

  // Grid dot data cached per dimensions
  const dotsRef = useRef<DotData[]>([]);
  const gridDimsRef = useRef<{ cols: number; rows: number; width: number; height: number }>({
    cols: 0,
    rows: 0,
    width: 0,
    height: 0,
  });

  // Pointer state for interaction
  const targetPointerRef = useRef({ x: -1000, y: -1000, active: false });
  const currentPointerRef = useRef({ x: -1000, y: -1000, intensity: 0 });
  const rafIdRef = useRef<number | null>(null);

  // Check prefers-reduced-motion
  const prefersReducedMotionRef = useRef(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotionRef.current = media.matches;
    const listener = (e: MediaQueryListEvent) => {
      prefersReducedMotionRef.current = e.matches;
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Sample image into dot grid
  const sampleImageGrid = useCallback((img: HTMLImageElement, width: number, height: number) => {
    if (width <= 0 || height <= 0) return;

    // Cell size ~4.2px creates the optimal balance between facial clarity and stipple pixel texture
    const cellSize = 4.2;
    const cols = Math.max(50, Math.min(110, Math.round(width / cellSize)));
    const rows = Math.round(cols * (height / width));

    const offscreen = document.createElement('canvas');
    offscreen.width = cols;
    offscreen.height = rows;
    const offCtx = offscreen.getContext('2d', { willReadFrequently: true });
    if (!offCtx) return;

    // Emulate CSS object-cover object-top
    const imgWidth = img.naturalWidth;
    const imgHeight = img.naturalHeight;
    const targetAspect = width / height;
    const imgAspect = imgWidth / imgHeight;

    let sx = 0;
    let sy = 0;
    let sWidth = imgWidth;
    let sHeight = imgHeight;

    if (imgAspect > targetAspect) {
      sWidth = imgHeight * targetAspect;
      sx = (imgWidth - sWidth) / 2;
    } else {
      sHeight = imgWidth / targetAspect;
      sy = 0;
    }

    offCtx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, cols, rows);
    const imgData = offCtx.getImageData(0, 0, cols, rows).data;

    const newDots: DotData[] = [];

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const idx = (r * cols + c) * 4;
        const red = imgData[idx];
        const green = imgData[idx + 1];
        const blue = imgData[idx + 2];
        const alpha = imgData[idx + 3] / 255;

        if (alpha < 0.12) continue; // Pure background

        // Perceptual luminance
        const lum = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

        // High-contrast S-curve stretch so facial contours and highlights stand out crisply
        let val = (lum - 0.10) / 0.80;
        val = Math.max(0, Math.min(1, val));
        val = val * val * (3 - 2 * val);

        // Preserve silhouette of dark hair and clothing against the pure black background
        val = Math.max(0.08, val);

        // Pseudo-random stipple dither offset for authentic irregular dot density
        const stippleNoise = (hash2D(c, r) - 0.5) * 0.16;
        const finalVal = Math.max(0.04, Math.min(1, val + stippleNoise));

        newDots.push({
          normX: (c + 0.5) / cols,
          normY: (r + 0.5) / rows,
          val: finalVal,
          alpha,
        });
      }
    }

    dotsRef.current = newDots;
    gridDimsRef.current = { cols, rows, width, height };
  }, []);

  // Main render pass
  const drawHalftone = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { width, height } = gridDimsRef.current;
    if (width <= 0 || height <= 0) return;

    const isDark = theme === 'dark';
    const isReducedMotion = prefersReducedMotionRef.current;

    // Background fill
    ctx.fillStyle = isDark ? '#000000' : '#f4f4f5';
    ctx.fillRect(0, 0, width, height);

    const dots = dotsRef.current;
    const dotCount = dots.length;
    if (dotCount === 0) return;

    const pointer = currentPointerRef.current;
    const pointerActive = pointer.intensity > 0.005;
    const interactionRadius = Math.min(width, height) * 0.32;
    const radiusSq = interactionRadius * interactionRadius;
    const maxDisplacement = isReducedMotion ? 0 : 4.5;

    // Base cell size in pixels
    const cellWidth = width / gridDimsRef.current.cols;
    const minSize = Math.max(1, cellWidth * 0.22);
    const maxSize = cellWidth * 0.96;

    for (let i = 0; i < dotCount; i++) {
      const dot = dots[i];
      const baseX = dot.normX * width;
      const baseY = dot.normY * height;

      let renderX = baseX;
      let renderY = baseY;

      if (isDark) {
        // DARK MODE: White, silver, and gray dots on pure black background
        let dotSize = minSize + Math.pow(dot.val, 0.82) * (maxSize - minSize);
        let alpha = 0.45 + dot.val * 0.55;

        // Pointer response: subtle shift and highlight
        if (pointerActive) {
          const dx = baseX - pointer.x;
          const dy = baseY - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / interactionRadius;
            const influence = factor * factor * pointer.intensity;

            if (dist > 0.1 && maxDisplacement > 0) {
              renderX += (dx / dist) * influence * maxDisplacement;
              renderY += (dy / dist) * influence * maxDisplacement;
            }

            dotSize *= 1 + influence * 0.32;
            alpha = Math.min(1, alpha + influence * 0.3);
          }
        }

        // Tonal color mapping
        let r = 255;
        let g = 255;
        let b = 255;

        if (dot.val < 0.16) {
          r = 95;
          g = 95;
          b = 100;
        } else if (dot.val < 0.42) {
          r = 160;
          g = 160;
          b = 165;
        } else if (dot.val < 0.7) {
          r = 220;
          g = 220;
          b = 225;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
        const s = Math.max(1, Math.round(dotSize));
        ctx.fillRect(
          Math.round(renderX - s / 2),
          Math.round(renderY - s / 2),
          s,
          s
        );
      } else {
        // LIGHT MODE: Monochrome dark ink dots on clean light background
        const inkVal = 1 - dot.val;
        const effectiveInk = Math.max(0.1, inkVal);
        let dotSize = minSize + Math.pow(effectiveInk, 0.88) * (maxSize - minSize);
        let alpha = 0.38 + effectiveInk * 0.6;

        if (pointerActive) {
          const dx = baseX - pointer.x;
          const dy = baseY - pointer.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < radiusSq) {
            const dist = Math.sqrt(distSq);
            const factor = 1 - dist / interactionRadius;
            const influence = factor * factor * pointer.intensity;

            if (dist > 0.1 && maxDisplacement > 0) {
              renderX += (dx / dist) * influence * maxDisplacement;
              renderY += (dy / dist) * influence * maxDisplacement;
            }

            dotSize *= 1 + influence * 0.32;
            alpha = Math.min(1, alpha + influence * 0.3);
          }
        }

        let r = 18;
        let g = 18;
        let b = 20;

        if (effectiveInk < 0.25) {
          r = 113;
          g = 113;
          b = 122;
        } else if (effectiveInk < 0.52) {
          r = 63;
          g = 63;
          b = 70;
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${alpha.toFixed(2)})`;
        const s = Math.max(1, Math.round(dotSize));
        ctx.fillRect(
          Math.round(renderX - s / 2),
          Math.round(renderY - s / 2),
          s,
          s
        );
      }
    }
  }, [theme]);

  const startAnimation = useCallback(() => {
    if (rafIdRef.current !== null) return;

    function step() {
      const target = targetPointerRef.current;
      const current = currentPointerRef.current;

      const targetIntensity = target.active ? 1 : 0;
      const easeRate = target.active ? 0.18 : 0.08;

      current.intensity += (targetIntensity - current.intensity) * easeRate;

      if (target.active) {
        current.x += (target.x - current.x) * 0.2;
        current.y += (target.y - current.y) * 0.2;
      }

      drawHalftone();

      // Check if motion has settled to resting state
      if (!target.active && current.intensity < 0.001) {
        current.intensity = 0;
        drawHalftone();
        rafIdRef.current = null;
        return;
      }

      rafIdRef.current = requestAnimationFrame(step);
    }

    rafIdRef.current = requestAnimationFrame(step);
  }, [drawHalftone]);

  // Load source image
  useEffect(() => {
    const img = new Image();
    img.src = src;

    const handleLoad = () => {
      imageRef.current = img;
      setIsLoaded(true);
    };

    if (img.complete && img.naturalWidth > 0) {
      handleLoad();
    } else {
      img.onload = handleLoad;
    }

    return () => {
      img.onload = null;
    };
  }, [src]);

  // ResizeObserver to handle container scaling and retina DPI
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas || !isLoaded || !imageRef.current) return;

    const updateDimensions = () => {
      const rect = container.getBoundingClientRect();
      const width = Math.floor(rect.width);
      const height = Math.floor(rect.height);

      if (width <= 0 || height <= 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }

      sampleImageGrid(imageRef.current!, width, height);
      drawHalftone();
    };

    updateDimensions();

    const resizeObserver = new ResizeObserver(() => {
      updateDimensions();
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isLoaded, sampleImageGrid, drawHalftone]);

  // Redraw when theme changes
  useEffect(() => {
    if (isLoaded) {
      drawHalftone();
    }
  }, [theme, isLoaded, drawHalftone]);

  // Pointer event listeners for interactive cursor response
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    targetPointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };

    startAnimation();
  };

  const handlePointerLeave = () => {
    targetPointerRef.current.active = false;
    startAnimation();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();

    targetPointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };

    startAnimation();
  };

  const handlePointerUp = () => {
    targetPointerRef.current.active = false;
    startAnimation();
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerLeave}
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      style={{ touchAction: 'pan-y' }}
      role="img"
      aria-label={alt}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Fallback image for accessibility and search indexing */}
      <img
        src={src}
        alt={alt}
        className="sr-only"
      />
    </div>
  );
};
