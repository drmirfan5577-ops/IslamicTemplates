import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, Pause, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
import { Template } from '@/types/template';
import TemplateRenderer from './TemplateRenderer';

interface Props {
  templates: Template[];
  startIndex?: number;
  onClose: () => void;
  overlayTexts?: Record<number, { main?: string; sub?: string }>;
}

const SPEEDS = [
  { label: '1s', value: 1000 },
  { label: '3s', value: 3000 },
  { label: '5s', value: 5000 },
  { label: '8s', value: 8000 },
];

type TransitionType = 'fade' | 'slide-left' | 'slide-up';

const SlideshowMode: React.FC<Props> = ({ templates, startIndex = 0, onClose, overlayTexts = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(startIndex);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(3000);
  const [transitioning, setTransitioning] = useState(false);
  const [transitionDir, setTransitionDir] = useState<'forward' | 'backward'>('forward');
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const controlsTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const transitions: TransitionType[] = ['fade', 'slide-left', 'slide-up'];
  const [transitionStyle] = useState<TransitionType>(() => transitions[Math.floor(Math.random() * transitions.length)]);

  const goTo = useCallback((nextIdx: number, dir: 'forward' | 'backward' = 'forward') => {
    if (transitioning || nextIdx === currentIndex) return;
    setTransitionDir(dir);
    setTransitioning(true);
    setPrevIndex(currentIndex);
    setTimeout(() => {
      setCurrentIndex(nextIdx);
      setProgress(0);
      setTimeout(() => {
        setTransitioning(false);
        setPrevIndex(null);
      }, 350);
    }, 50);
  }, [transitioning, currentIndex]);

  const goNext = useCallback(() => {
    const next = (currentIndex + 1) % templates.length;
    goTo(next, 'forward');
  }, [currentIndex, templates.length, goTo]);

  const goPrev = useCallback(() => {
    const prev = (currentIndex - 1 + templates.length) % templates.length;
    goTo(prev, 'backward');
  }, [currentIndex, templates.length, goTo]);

  // Autoplay
  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    if (progressRef.current) clearInterval(progressRef.current);
    if (!isPlaying) { setProgress(0); return; }

    setProgress(0);
    const step = 100 / (speed / 80);
    progressRef.current = setInterval(() => {
      setProgress(p => Math.min(p + step, 100));
    }, 80);

    intervalRef.current = setInterval(() => {
      setProgress(0);
      goNext();
    }, speed);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [isPlaying, speed, goNext]);

  // Keyboard
  useEffect(() => {
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') goNext();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') goPrev();
      if (e.key === ' ') setIsPlaying(p => !p);
    };
    window.addEventListener('keydown', handle);
    return () => window.removeEventListener('keydown', handle);
  }, [onClose, goNext, goPrev]);

  // Auto-hide controls
  const resetControlsTimer = useCallback(() => {
    setShowControls(true);
    if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current);
    controlsTimerRef.current = setTimeout(() => setShowControls(false), 3500);
  }, []);

  useEffect(() => {
    resetControlsTimer();
    return () => { if (controlsTimerRef.current) clearTimeout(controlsTimerRef.current); };
  }, []);

  const current = templates[currentIndex];
  const prev = prevIndex !== null ? templates[prevIndex] : null;
  const currentText = overlayTexts[current?.id] || {};

  const getExitStyle = (): React.CSSProperties => {
    if (!transitioning) return {};
    switch (transitionStyle) {
      case 'slide-left':
        return { transform: transitionDir === 'forward' ? 'translateX(-100%)' : 'translateX(100%)', opacity: 0, transition: 'all 400ms ease-in-out' };
      case 'slide-up':
        return { transform: transitionDir === 'forward' ? 'translateY(-100%)' : 'translateY(100%)', opacity: 0, transition: 'all 400ms ease-in-out' };
      default:
        return { opacity: 0, transition: 'opacity 400ms ease-in-out' };
    }
  };

  const getEnterStyle = (): React.CSSProperties => {
    if (!transitioning) return { opacity: 1 };
    switch (transitionStyle) {
      case 'slide-left':
        return { transform: transitionDir === 'forward' ? 'translateX(100%)' : 'translateX(-100%)', opacity: 0 };
      case 'slide-up':
        return { transform: transitionDir === 'forward' ? 'translateY(100%)' : 'translateY(-100%)', opacity: 0 };
      default:
        return { opacity: 0 };
    }
  };

  if (!current) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: '#000000', cursor: showControls ? 'default' : 'none' }}
      onMouseMove={resetControlsTimer}
      onTouchStart={resetControlsTimer}
    >
      {/* Slideshow canvas */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* Previous template (exit) */}
        {prev && transitioning && (
          <div className="absolute inset-0 flex items-center justify-center" style={{ ...getExitStyle(), zIndex: 1 }}>
            <div style={{ height: '100%', maxHeight: '100vh', aspectRatio: '9/16', maxWidth: '100vw' }}>
              <TemplateRenderer template={prev} mini={false} overlayText={overlayTexts[prev.id] || {}} />
            </div>
          </div>
        )}
        {/* Current template (enter) */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            zIndex: 2,
            ...(transitioning ? { ...getEnterStyle(), transition: 'all 400ms ease-in-out' } : { opacity: 1, transform: 'none' }),
          }}
        >
          <div style={{ height: '100%', maxHeight: '100vh', aspectRatio: '9/16', maxWidth: '100vw' }}>
            <TemplateRenderer template={current} mini={false} overlayText={currentText} />
          </div>
        </div>
      </div>

      {/* Progress bar */}
      {isPlaying && (
        <div className="absolute top-0 left-0 right-0 h-1 z-20" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'linear-gradient(90deg, #c41e3a, #ffd700)',
            transition: 'width 80ms linear',
          }}/>
        </div>
      )}

      {/* Controls overlay */}
      <div className="absolute inset-0 z-20 pointer-events-none" style={{
        opacity: showControls ? 1 : 0,
        transition: 'opacity 0.4s ease',
      }}>
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 pb-6 pointer-events-auto"
          style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.7) 0%, transparent 100%)' }}>
          <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <X className="w-5 h-5 text-white" />
          </button>
          <div className="text-center">
            <p className="text-white text-sm font-semibold">{currentIndex + 1} / {templates.length}</p>
          </div>
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-300 text-xs font-bold">Slideshow</span>
          </div>
        </div>

        {/* Side nav buttons */}
        <button onClick={goPrev} className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center pointer-events-auto"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}>
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button onClick={goNext} className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full flex items-center justify-center pointer-events-auto"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.25)' }}>
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Bottom controls */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pt-10 pb-5 flex flex-col items-center gap-3 pointer-events-auto"
          style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.75) 0%, transparent 100%)' }}>

          {/* Speed selector */}
          <div className="flex items-center gap-2">
            <span className="text-white text-xs opacity-70">Speed:</span>
            {SPEEDS.map(s => (
              <button key={s.value} onClick={() => setSpeed(s.value)}
                className="px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200"
                style={speed === s.value ? {
                  background: 'linear-gradient(135deg, #c41e3a, #8b0000)',
                  color: '#ffd700',
                  boxShadow: '0 0 10px rgba(196,30,58,0.5)',
                } : {
                  background: 'rgba(255,255,255,0.1)',
                  color: 'rgba(255,255,255,0.7)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}>
                {s.label}
              </button>
            ))}
          </div>

          {/* Play/Pause */}
          <button onClick={() => setIsPlaying(p => !p)}
            className="w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
            style={{
              background: 'linear-gradient(135deg, #c41e3a, #8b0000)',
              boxShadow: '0 0 20px rgba(196,30,58,0.6), 0 0 40px rgba(196,30,58,0.2)',
              border: '2px solid rgba(255,215,0,0.3)',
            }}>
            {isPlaying
              ? <Pause className="w-6 h-6 text-yellow-300" fill="#fcd34d" />
              : <Play className="w-6 h-6 text-yellow-300" fill="#fcd34d" style={{ marginLeft: '2px' }} />
            }
          </button>

          {/* Dot indicators */}
          <div className="flex gap-1.5 flex-wrap justify-center max-w-xs">
            {templates.slice(Math.max(0, currentIndex - 4), Math.min(templates.length, currentIndex + 5)).map((_, i) => {
              const realIdx = Math.max(0, currentIndex - 4) + i;
              return (
                <button key={realIdx} onClick={() => goTo(realIdx)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: realIdx === currentIndex ? '20px' : '6px',
                    height: '6px',
                    background: realIdx === currentIndex
                      ? 'linear-gradient(90deg, #c41e3a, #ffd700)'
                      : 'rgba(255,255,255,0.3)',
                  }}/>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideshowMode;
