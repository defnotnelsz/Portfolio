import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useProgress } from '@react-three/drei';
import { AboutRoomScene } from './AboutRoomScene';
import { ROOM_OBJECTS, type RoomObjectData } from '../data/aboutObjects';
import { ArrowLeft, ChevronLeft, ChevronRight, Sparkles, X, Box } from 'lucide-react';

function isWebGLSupported(): boolean {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

export const About: React.FC = () => {
  const navigate = useNavigate();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [hasWebGL] = useState<boolean>(() => isWebGLSupported());

  const { progress, active } = useProgress();

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    typeof window !== 'undefined'
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
      : false
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Safe navigation handler: uses in-app history back if available, otherwise falls back to '/'
  const handleGoBack = useCallback(() => {
    if (
      window.history.state &&
      typeof window.history.state.idx === 'number' &&
      window.history.state.idx > 0
    ) {
      navigate(-1);
    } else {
      navigate('/', { replace: true });
    }
  }, [navigate]);

  // Lock body scroll and prevent background page scrolling while the full-screen room is active
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    const originalOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = 'hidden';
    document.body.style.overscrollBehavior = 'none';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.overscrollBehavior = originalOverscroll;
    };
  }, []);

  const selectedObject: RoomObjectData | null =
    ROOM_OBJECTS.find((o) => o.id === selectedId) || null;
  const hoveredObject: RoomObjectData | null =
    ROOM_OBJECTS.find((o) => o.id === hoveredId) || null;

  // Keyboard navigation: Escape to deselect or return to portfolio, Left/Right to cycle objects
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (selectedId) {
          setSelectedId(null);
        } else {
          handleGoBack();
        }
      } else if (e.key === 'ArrowRight' && selectedId) {
        const curIdx = ROOM_OBJECTS.findIndex((o) => o.id === selectedId);
        const nextIdx = (curIdx + 1) % ROOM_OBJECTS.length;
        setSelectedId(ROOM_OBJECTS[nextIdx].id);
      } else if (e.key === 'ArrowLeft' && selectedId) {
        const curIdx = ROOM_OBJECTS.findIndex((o) => o.id === selectedId);
        const prevIdx = (curIdx - 1 + ROOM_OBJECTS.length) % ROOM_OBJECTS.length;
        setSelectedId(ROOM_OBJECTS[prevIdx].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedId, handleGoBack]);

  const handleNext = useCallback(() => {
    if (!selectedId) return;
    const curIdx = ROOM_OBJECTS.findIndex((o) => o.id === selectedId);
    const nextIdx = (curIdx + 1) % ROOM_OBJECTS.length;
    setSelectedId(ROOM_OBJECTS[nextIdx].id);
  }, [selectedId]);

  const handlePrev = useCallback(() => {
    if (!selectedId) return;
    const curIdx = ROOM_OBJECTS.findIndex((o) => o.id === selectedId);
    const prevIdx = (curIdx - 1 + ROOM_OBJECTS.length) % ROOM_OBJECTS.length;
    setSelectedId(ROOM_OBJECTS[prevIdx].id);
  }, [selectedId]);

  const getPositionClass = (pos: RoomObjectData['textPosition']) => {
    switch (pos) {
      case 'top-left':
        return 'top-28 md:top-32 left-5 md:left-8';
      case 'top-right':
        return 'top-20 md:top-24 right-5 md:right-8';
      case 'bottom-right':
        return 'bottom-24 md:bottom-28 right-5 md:right-8';
      case 'bottom-left':
      default:
        return 'bottom-24 md:bottom-28 left-5 md:left-8';
    }
  };

  return (
    <div
      id="about-room-experience"
      className="fixed inset-0 w-screen h-[100vh] h-[100dvh] bg-[#0a0a0a] text-white overflow-hidden select-none z-50"
      aria-label="About 3D gaming room"
    >
      {/* Loading Overlay */}
      <AnimatePresence>
        {active && progress < 100 && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-white font-mono px-4"
          >
            <div className="flex items-center gap-2 mb-3 text-xs tracking-widest uppercase text-zinc-400">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>INITIALIZING 3D GAMING ROOM</span>
            </div>
            <div className="w-56 h-1.5 bg-zinc-800 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full bg-white rounded-full"
                style={{ width: `${Math.max(5, progress)}%` }}
              />
            </div>
            <span className="text-[11px] text-zinc-500 tracking-wider">
              {Math.round(progress)}% LOADED
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D WebGL Canvas Scene or Accessible Fallback */}
      {hasWebGL ? (
        <AboutRoomScene
          selectedId={selectedId}
          hoveredId={hoveredId}
          onSelectObject={(id) => setSelectedId(id)}
          onHoverObject={(id) => setHoveredId(id)}
          prefersReducedMotion={prefersReducedMotion}
        />
      ) : (
        /* Accessible 2D Fallback */
        <div className="relative w-full h-full flex flex-col items-center justify-center bg-[#0a0a0a] p-8 text-center">
          <Box size={48} className="text-zinc-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">3D Gaming Room</h3>
          <p className="text-sm text-zinc-400 max-w-md mb-6">
            WebGL is not supported in this browser. You can still explore the personal stories below:
          </p>
          <div className="flex flex-wrap gap-2 justify-center max-w-lg">
            {ROOM_OBJECTS.map((obj) => (
              <button
                key={obj.id}
                type="button"
                onClick={() => setSelectedId(obj.id)}
                className="px-3 py-1.5 rounded-sm bg-zinc-900 border border-zinc-700 text-xs font-mono text-zinc-300 hover:text-white cursor-pointer"
              >
                [{obj.number}] {obj.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fixed Top-Left "Go Back" Navigation Control */}
      <div className="fixed top-5 left-5 md:top-6 md:left-8 z-40 flex flex-col gap-3">
        <button
          type="button"
          onClick={handleGoBack}
          aria-label="Go back to portfolio"
          className="self-start inline-flex items-center gap-2 px-3.5 py-2 rounded-xs bg-black/85 hover:bg-zinc-900 border border-zinc-700/80 hover:border-zinc-400 text-zinc-200 hover:text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 backdrop-blur-md shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black cursor-pointer group"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform duration-200" />
          <span>Go Back</span>
        </button>

        {/* Minimalist Editorial Header */}
        <div className="flex flex-col gap-0.5 pointer-events-none">
          <div className="flex items-center gap-2 text-[10px] md:text-[11px] font-mono text-zinc-400 uppercase tracking-widest">
            <span className="text-white font-bold">[ 01 ]</span>
            <span>INDEX // ABOUT &middot; 3D GAMING ROOM</span>
          </div>
          <p className="text-[11px] md:text-xs text-zinc-400 font-sans hidden sm:block max-w-sm">
            Explore the 3D space. Click highlighted artifacts to view personal stories.
          </p>
        </div>
      </div>

      {/* Top-Right HUD Controls: Focused Return Control or Status Badge */}
      <div className="fixed top-5 right-5 md:top-6 md:right-8 z-40 flex items-center gap-2">
        {selectedObject ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="inline-flex items-center gap-2 px-3.5 py-2 bg-black/90 hover:bg-zinc-900 text-white rounded-sm border border-zinc-600 hover:border-zinc-400 text-xs font-mono uppercase tracking-wider transition-all shadow-xl group cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
              aria-label="Return to full room view"
            >
              <ArrowLeft size={13} className="group-hover:-translate-x-0.5 transition-transform" />
              <span>BACK TO ROOM</span>
              <span className="text-zinc-400 text-[10px] hidden sm:inline ml-1 font-sans">
                (ESC)
              </span>
            </button>

            {/* Prev / Next Quick Switcher */}
            <div className="flex items-center gap-1 bg-black/90 backdrop-blur-md px-2 py-1.5 rounded-sm border border-zinc-800 text-zinc-300">
              <button
                type="button"
                onClick={handlePrev}
                className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
                aria-label="Previous object"
                title="Previous object"
              >
                <ChevronLeft size={15} />
              </button>
              <span className="text-[11px] font-mono px-1.5 text-zinc-400">
                {selectedObject.number} / {String(ROOM_OBJECTS.length).padStart(2, '0')}
              </span>
              <button
                type="button"
                onClick={handleNext}
                className="p-1 hover:text-white hover:bg-zinc-800 rounded transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
                aria-label="Next object"
                title="Next object"
              >
                <ChevronRight size={15} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-sm border border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-zinc-400 bg-black/80 backdrop-blur-md">
            <Sparkles size={13} className="text-zinc-300" />
            <span>
              {hoveredObject ? `HOVER: ${hoveredObject.shortLabel}` : `${ROOM_OBJECTS.length} INTERACTIVE ARTIFACTS`}
            </span>
          </div>
        )}
      </div>

      {/* Overview Hover Cue Pill */}
      <AnimatePresence>
        {!selectedObject && hoveredObject && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.15 }}
            className="fixed top-24 left-5 md:left-8 z-30 pointer-events-none"
          >
            <div className="bg-black/90 backdrop-blur-md border border-zinc-700 px-3 py-1.5 rounded-sm text-xs font-mono text-zinc-200 shadow-xl flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-zinc-400">[{hoveredObject.number}]</span>
              <span className="font-semibold text-white">{hoveredObject.name}</span>
              <span className="text-[10px] text-zinc-400 uppercase tracking-widest ml-1">
                &middot; CLICK TO FOCUS
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Focused Story Text Card */}
      <AnimatePresence mode="wait">
        {selectedObject && (
          <motion.div
            key={selectedObject.id}
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            className={`fixed z-40 pointer-events-auto max-md:bottom-24 max-md:inset-x-4 max-md:top-auto max-md:left-auto max-md:right-auto max-md:max-h-[50vh] max-md:overflow-y-auto ${getPositionClass(
              selectedObject.textPosition
            )}`}
          >
            <div className="bg-black/90 backdrop-blur-md border border-zinc-700/80 text-zinc-100 p-6 md:p-7 rounded-sm shadow-2xl max-w-lg w-full relative">
              {/* Header row */}
              <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-widest text-zinc-400 mb-2">
                <span>{selectedObject.category}</span>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="hover:text-white p-1 text-zinc-500 hover:bg-zinc-800 rounded transition-colors cursor-pointer"
                  aria-label="Close story"
                  title="Close"
                >
                  <X size={15} />
                </button>
              </div>

              {/* Title */}
              <h3 className="text-xl md:text-2xl font-bold tracking-tight text-white mb-3">
                {selectedObject.name}
              </h3>

              {/* Exact verbatim story text */}
              <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans">
                {selectedObject.story}
              </p>

              {/* Bottom navigation helper */}
              <div className="mt-5 pt-3.5 border-t border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ArrowLeft size={12} />
                  <span>RETURN TO ROOM</span>
                </button>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handlePrev}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    PREV
                  </button>
                  <span>&middot;</span>
                  <button
                    type="button"
                    onClick={handleNext}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    NEXT
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Bottom Dock: Click-to-Explore Artifacts Bar */}
      <div className="fixed bottom-6 inset-x-4 md:inset-x-8 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 z-40 pointer-events-none">
        <div className="bg-black/85 backdrop-blur-md px-3 py-1.5 rounded-sm border border-zinc-800 shadow-2xl flex items-center gap-1.5 flex-wrap justify-center pointer-events-auto">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider px-1 hidden md:inline">
            ROOM ARTIFACTS:
          </span>
          {ROOM_OBJECTS.map((obj) => {
            const isSelected = selectedId === obj.id;
            const isHovered = hoveredId === obj.id;

            return (
              <button
                type="button"
                key={obj.id}
                onClick={() => setSelectedId(isSelected ? null : obj.id)}
                onMouseEnter={() => setHoveredId(obj.id)}
                onMouseLeave={() => setHoveredId(null)}
                className={`px-2.5 py-1 text-[11px] font-mono rounded-sm transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400 ${
                  isSelected
                    ? 'bg-white text-black font-semibold shadow-md'
                    : isHovered
                    ? 'bg-zinc-800 text-white border border-zinc-600'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 border border-transparent'
                }`}
              >
                <span className="opacity-60 text-[9px] mr-1">{obj.number}</span>
                <span>{obj.shortLabel}</span>
              </button>
            );
          })}

          {selectedId && (
            <button
              type="button"
              onClick={() => setSelectedId(null)}
              className="px-2.5 py-1 text-[10px] font-mono text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-sm ml-1.5 transition-colors cursor-pointer flex items-center gap-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-400"
            >
              <ArrowLeft size={11} />
              <span>ROOM</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
