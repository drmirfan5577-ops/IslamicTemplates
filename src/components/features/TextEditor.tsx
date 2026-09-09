import React, { useState } from 'react';
import { X, Type, Palette, RotateCcw, Check } from 'lucide-react';
import { Template, ColorScheme } from '@/types/template';
import TemplateRenderer from './TemplateRenderer';

interface OverlayText {
  main?: string;
  sub?: string;
}

interface Props {
  template: Template;
  initialText?: OverlayText;
  onSave: (text: OverlayText) => void;
  onClose: () => void;
}

const colorSchemes: { id: ColorScheme; label: string; color: string }[] = [
  { id: 'crimson-gold', label: 'سرخ', color: '#c41e3a' },
  { id: 'emerald-silver', label: 'سبز', color: '#00c87a' },
  { id: 'royal-blue', label: 'نیلا', color: '#2563eb' },
  { id: 'purple-gold', label: 'جامنی', color: '#9333ea' },
  { id: 'amber-gold', label: 'سنہری', color: '#d97706' },
  { id: 'sapphire', label: 'نیلم', color: '#1d4ed8' },
  { id: 'teal-silver', label: 'فیروزی', color: '#0d9488' },
  { id: 'rose-silver', label: 'گلابی', color: '#e11d48' },
  { id: 'dark-red', label: 'گہرا سرخ', color: '#991b1b' },
  { id: 'midnight-blue', label: 'رات نیلا', color: '#1e40af' },
];

const TextEditor: React.FC<Props> = ({ template, initialText = {}, onSave, onClose }) => {
  const [mainText, setMainText] = useState(initialText.main || '');
  const [subText, setSubText] = useState(initialText.sub || '');
  const [selectedScheme, setSelectedScheme] = useState<ColorScheme>(template.colorScheme);
  const [editedTemplate, setEditedTemplate] = useState<Template>(template);
  const [activeTab, setActiveTab] = useState<'text' | 'color'>('text');

  const handleSchemeChange = (scheme: ColorScheme) => {
    setSelectedScheme(scheme);
    setEditedTemplate(prev => ({ ...prev, colorScheme: scheme }));
  };

  const handleSave = () => {
    onSave({ main: mainText, sub: subText });
    onClose();
  };

  const handleReset = () => {
    setMainText('');
    setSubText('');
  };

  const overlayText = { main: mainText || undefined, sub: subText || undefined };

  return (
    <div
      className="fixed inset-0 z-50 flex"
      style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
    >
      {/* Left: Preview */}
      <div className="flex-1 flex items-center justify-center p-4 relative overflow-hidden">
        {/* BG glow */}
        <div className="absolute inset-0" style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(196,30,58,0.08) 0%, transparent 100%)',
        }}/>
        <div style={{ width: '100%', maxWidth: '300px', maxHeight: '80vh' }}>
          <TemplateRenderer
            template={editedTemplate}
            mini={false}
            overlayText={overlayText}
          />
        </div>
        {/* Preview label */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <span className="text-xs text-slate-500 tracking-widest">LIVE PREVIEW</span>
        </div>
      </div>

      {/* Right: Editor panel */}
      <div className="w-80 flex flex-col" style={{
        background: 'linear-gradient(180deg, #0d0000 0%, #050000 100%)',
        borderLeft: '1px solid rgba(196,30,58,0.25)',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          background: 'rgba(255,255,255,0.02)',
        }}>
          <h2 className="text-sm font-bold" style={{
            background: 'linear-gradient(90deg, #ffd700, #c41e3a)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>ٹیکسٹ ایڈیٹر</h2>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          {[
            { id: 'text' as const, label: 'متن', icon: <Type className="w-3.5 h-3.5" /> },
            { id: 'color' as const, label: 'رنگ', icon: <Palette className="w-3.5 h-3.5" /> },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-all duration-200"
              style={activeTab === tab.id ? {
                color: '#ffd700',
                borderBottom: '2px solid #c41e3a',
                background: 'rgba(196,30,58,0.08)',
              } : { color: '#64748b' }}>
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {activeTab === 'text' ? (
            <>
              {/* Main text */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: '#ffd700' }}>
                  مرکزی متن (عربی/اردو)
                </label>
                <textarea
                  value={mainText}
                  onChange={e => setMainText(e.target.value)}
                  placeholder="یہاں عربی یا اردو متن لکھیں..."
                  rows={4}
                  className="w-full rounded-lg p-3 text-base resize-none outline-none transition-all duration-200 focus:ring-1"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,215,0,0.2)',
                    color: '#f8fafc',
                    direction: 'rtl',
                    fontFamily: "'Amiri', serif",
                    fontSize: '20px',
                    lineHeight: '1.6',
                  }}
                />
              </div>

              {/* Sub text */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: '#94a3b8' }}>
                  ذیلی متن (Subtitle)
                </label>
                <textarea
                  value={subText}
                  onChange={e => setSubText(e.target.value)}
                  placeholder="ذیلی عبارت یا ترجمہ..."
                  rows={3}
                  className="w-full rounded-lg p-3 text-sm resize-none outline-none"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#cbd5e1',
                    direction: 'rtl',
                    fontFamily: "'Amiri', serif",
                    fontSize: '14px',
                  }}
                />
              </div>

              {/* Quick phrases */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: '#64748b' }}>
                  فوری اضافہ
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'بِسْمِ اللَّهِ', 'الْحَمْدُ لِلَّهِ', 'اللَّهُ أَكْبَرُ',
                    'سُبْحَانَ اللَّهِ', 'مُحَمَّدٌ ﷺ', 'لَا إِلَهَ إِلَّا اللَّهُ',
                    'يَا اللَّهُ', 'يَا رَحْمَنُ',
                  ].map(phrase => (
                    <button key={phrase}
                      onClick={() => setMainText(phrase)}
                      className="px-2 py-1 rounded text-xs transition-all duration-150 hover:scale-105"
                      style={{
                        background: 'rgba(196,30,58,0.15)',
                        border: '1px solid rgba(196,30,58,0.3)',
                        color: '#fca5a5',
                        direction: 'rtl',
                        fontFamily: "'Amiri', serif",
                      }}>
                      {phrase}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <>
              <label className="block text-xs font-medium mb-3" style={{ color: '#94a3b8' }}>
                رنگ منتخب کریں
              </label>
              <div className="grid grid-cols-2 gap-2">
                {colorSchemes.map(cs => (
                  <button key={cs.id} onClick={() => handleSchemeChange(cs.id)}
                    className="relative flex items-center gap-2 p-2.5 rounded-lg transition-all duration-200 hover:scale-105"
                    style={selectedScheme === cs.id ? {
                      background: `${cs.color}28`,
                      border: `2px solid ${cs.color}`,
                      boxShadow: `0 0 12px ${cs.color}44`,
                    } : {
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255,255,255,0.1)',
                    }}>
                    <div className="w-6 h-6 rounded-full flex-shrink-0" style={{
                      background: `radial-gradient(circle, ${cs.color} 0%, ${cs.color}88 100%)`,
                      boxShadow: `0 0 8px ${cs.color}66`,
                    }}/>
                    <span className="text-xs text-slate-300">{cs.label}</span>
                    {selectedScheme === cs.id && (
                      <Check className="w-3 h-3 absolute top-1 right-1" style={{ color: cs.color }} />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="px-4 py-3 flex gap-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <button onClick={handleReset}
            className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
            <RotateCcw className="w-4 h-4 text-slate-400" />
          </button>
          <button onClick={handleSave}
            className="flex-1 h-10 rounded-lg flex items-center justify-center gap-2 font-semibold text-sm transition-all duration-200 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #c41e3a, #8b0000)',
              color: '#ffd700',
              boxShadow: '0 0 16px rgba(196,30,58,0.4)',
              border: '1px solid rgba(255,215,0,0.2)',
            }}>
            <Check className="w-4 h-4" />
            محفوظ کریں
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextEditor;
