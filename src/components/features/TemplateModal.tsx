import React, { useEffect } from 'react';
import { X, Download, Share2, ChevronLeft, ChevronRight, Edit2, Play } from 'lucide-react';
import { Template } from '@/types/template';
import TemplateRenderer from './TemplateRenderer';

interface OverlayText {
  main?: string;
  sub?: string;
}

interface Props {
  template: Template | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onEdit?: () => void;
  onStartSlideshow?: () => void;
  overlayText?: OverlayText;
}

const TemplateModal: React.FC<Props> = ({
  template, onClose, onPrev, onNext, hasPrev, hasNext,
  onEdit, onStartSlideshow, overlayText,
}) => {
  useEffect(() => {
    if (!template) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [template, onClose, onPrev, onNext]);

  if (!template) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(20px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-xs mx-auto"
        onClick={e => e.stopPropagation()}
        style={{ animation: 'modalIn 0.3s ease-out' }}
      >
        {/* Navigation */}
        <button onClick={onPrev} disabled={!hasPrev}
          className="absolute -left-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button onClick={onNext} disabled={!hasNext}
          className="absolute -right-12 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 disabled:opacity-20 hover:scale-110"
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <ChevronRight className="w-5 h-5 text-white" />
        </button>

        {/* Template */}
        <TemplateRenderer template={template} mini={false} overlayText={overlayText} />

        {/* Info + actions */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-white leading-tight truncate">{template.title}</h3>
            {overlayText?.main && (
              <p className="text-xs mt-0.5 truncate" style={{ color: 'rgba(255,215,0,0.7)', direction: 'rtl' }}>
                {overlayText.main}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0 ml-2">
            {onStartSlideshow && (
              <button onClick={onStartSlideshow}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,215,0,0.12)', border: '1px solid rgba(255,215,0,0.25)' }}
                title="Slideshow">
                <Play className="w-4 h-4 text-yellow-300" fill="#fcd34d" />
              </button>
            )}
            {onEdit && (
              <button onClick={onEdit}
                className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}
                title="Edit Text">
                <Edit2 className="w-4 h-4 text-white" />
              </button>
            )}
            <button
              className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              style={{ background: 'linear-gradient(135deg, #c41e3a, #8b0000)', boxShadow: '0 0 12px rgba(196,30,58,0.5)' }}
              title="Download">
              <Download className="w-4 h-4 text-yellow-300" />
            </button>
          </div>
        </div>

        {/* Close */}
        <button onClick={onClose}
          className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-20"
          style={{ background: 'rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.2)' }}>
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

export default TemplateModal;
