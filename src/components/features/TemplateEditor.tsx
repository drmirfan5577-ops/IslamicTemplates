import React, { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { 
  LayoutTemplate, Type, Image, Sparkles, Wand2, Layers, Heart, Download, 
  Share2, Cloud, Mic, ChevronLeft, ChevronRight, Play, Pause, Settings,
  BookOpen, SquareDashedBottom, Palette, Move, RotateCcw, Copy, Trash2,
  PanelLeft, PanelRight, Grid3X3, Plus, Check, X, Sun, Filter, Film,
  ZoomIn, ZoomOut, AlignCenter, AlignLeft, AlignRight, Bold, Italic,
  FileDown, FileUp, Save, FolderOpen, RefreshCw
} from 'lucide-react';
import { templates, categories } from '@/data/templates';
import { backgroundThemes, borderStyles, headerStyles, arabicFonts, urduFonts, englishFonts, colorBlocks, textureBlocks, textEffects, textAnimations, beautyEffects, transitionEffects, animationEffects3D } from '@/data/sectionData';
import { useFavorites, FavBtn, DownloadBtn, ShareBtn, CloudUploadBtn, VoiceInput, LayersPanel, ImageImporter } from './EditorTools';
import { Layer } from '@/types/editor';
import { toast } from 'sonner';

// ─────────────────── TYPES ───────────────────
interface TextConfig {
  main: string; sub: string; font: string; fontSize: number; color: string;
  texture: string; effect: string; animation: string; align: 'left' | 'center' | 'right';
  bold: boolean; italic: boolean; direction: 'rtl' | 'ltr';
  bgColor: string; opacity: number; textShadow: string;
}
interface CanvasConfig {
  bgThemeId: string; bgGradient: string; bgAnimation: string;
  borderId: string; borderColor: string;
  headerId: string; footerId: string;
  effectClass: string;
}
interface EditorState { text: TextConfig; canvas: CanvasConfig; layers: Layer[]; selectedLayerId: string | null; }

const defaultText: TextConfig = { main: '', sub: '', font: "'Amiri', serif", fontSize: 48, color: '#b8960c', texture: 'none', effect: 'none', animation: 'none', align: 'center', bold: false, italic: false, direction: 'rtl', bgColor: 'transparent', opacity: 1, textShadow: '0 0 20px rgba(212,175,55,0.4)' };
const defaultCanvas: CanvasConfig = { bgThemeId: 'vibrant-crystal', bgGradient: 'radial-gradient(ellipse 140% 120% at 30% 20%, #ffffff 0%, #f0f8ff 30%, #e3f2fd 60%, #bbdefb 100%)', bgAnimation: 'bg-shimmer 5s ease-in-out infinite', borderId: '', borderColor: '#d4af37', headerId: '', footerId: '', effectClass: '' };

// ─────────────────── SECTION TABS ───────────────────
const sectionTabs = [
  { id: 1, icon: <SquareDashedBottom className="w-4 h-4" />, label: 'باؤنڈری', labelEn: 'Borders' },
  { id: 2, icon: <Type className="w-4 h-4" />, label: 'متن', labelEn: 'Text' },
  { id: 3, icon: <Image className="w-4 h-4" />, label: 'بیک گراؤنڈ', labelEn: 'Backgrounds' },
  { id: 4, icon: <Sparkles className="w-4 h-4" />, label: 'ایفیکٹس', labelEn: 'Effects' },
  { id: 5, icon: <LayoutTemplate className="w-4 h-4" />, label: 'ٹیمپلیٹس', labelEn: 'Templates' },
];

// ─────────────────── MINI RENDER ───────────────────
const MiniTemplate: React.FC<{ gradient: string; animation: string; borderId: string; children?: React.ReactNode }> = ({ gradient, animation, borderId, children }) => {
  const border = borderStyles.find(b => b.id === borderId);
  return (
    <div className="relative w-full canvas-9-16 rounded-lg overflow-hidden" style={{ background: gradient, animation }}>
      {border && <div className="absolute inset-1 pointer-events-none rounded-sm" style={border.style as React.CSSProperties}/>}
      {children}
    </div>
  );
};

// ─────────────────── SECTION 01: BORDERS ───────────────────
const Section01: React.FC<{ state: EditorState; onUpdate: (c: Partial<CanvasConfig>) => void }> = ({ state, onUpdate }) => {
  const [sub, setSub] = useState<'circular' | 'cornered' | 'dotted' | 'carved' | 'artistic' | 'simple' | 'header' | 'footer'>('cornered');
  const subTabs = [
    { id: 'cornered', label: 'کونہ' }, { id: 'circular', label: 'گول' }, { id: 'dotted', label: 'ڈاٹڈ' },
    { id: 'carved', label: 'نقش' }, { id: 'artistic', label: 'آرٹ' }, { id: 'simple', label: 'سادہ' },
    { id: 'header', label: 'ہیڈر' }, { id: 'footer', label: 'فوٹر' },
  ] as const;

  const filtered = sub === 'header' || sub === 'footer'
    ? headerStyles.filter(h => h.category === sub)
    : borderStyles.filter(b => b.category === sub);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-wrap gap-1 px-1">
        {subTabs.map(t => (
          <button key={t.id} onClick={() => setSub(t.id)}
            className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${sub === t.id ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-white text-gray-500 border border-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 px-1 panel-scroll flex-1">
        {(sub === 'header' || sub === 'footer' ? headerStyles.filter(h => h.category === sub) : borderStyles.filter(b => b.category === sub)).map((item: any) => (
          <button key={item.id} onClick={() => onUpdate(item.category === 'header' ? { headerId: item.id } : item.category === 'footer' ? { footerId: item.id } : { borderId: item.id, borderColor: '#d4af37' })}
            className={`rounded-lg overflow-hidden transition-all hover:scale-105 ${(state.canvas.borderId === item.id || state.canvas.headerId === item.id || state.canvas.footerId === item.id) ? 'ring-2 ring-amber-400' : ''}`}>
            <div className="aspect-video relative rounded-lg" style={{ background: 'linear-gradient(135deg, #fffde7, #fff9c4)' }}>
              <div className="absolute inset-1 rounded pointer-events-none" style={item.style as React.CSSProperties}/>
            </div>
            <p className="text-xs text-center py-1 text-gray-600">{item.label}</p>
          </button>
        ))}
        {/* Remove border button */}
        <button onClick={() => onUpdate({ borderId: '', headerId: '', footerId: '' })}
          className="rounded-lg overflow-hidden transition-all hover:scale-105 border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-1 py-3">
          <X className="w-4 h-4 text-gray-400" />
          <p className="text-xs text-gray-400">ہٹائیں</p>
        </button>
      </div>
    </div>
  );
};

// ─────────────────── SECTION 02: TEXT ───────────────────
const Section02: React.FC<{ state: EditorState; onUpdate: (t: Partial<TextConfig>) => void }> = ({ state, onUpdate }) => {
  const [sub, setSub] = useState<'fonts-ar' | 'fonts-ur' | 'fonts-en' | 'colors' | 'textures' | 'effects' | 'animations'>('fonts-ar');
  const subTabs = [
    { id: 'fonts-ar', label: 'عربی' }, { id: 'fonts-ur', label: 'اردو' }, { id: 'fonts-en', label: 'English' },
    { id: 'colors', label: 'رنگ' }, { id: 'textures', label: 'ساخت' },
    { id: 'effects', label: 'ایفیکٹ' }, { id: 'animations', label: 'حرکت' },
  ] as const;

  const fonts = sub === 'fonts-ar' ? arabicFonts : sub === 'fonts-ur' ? urduFonts : englishFonts;

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex flex-wrap gap-1 px-1">
        {subTabs.map(t => (
          <button key={t.id} onClick={() => setSub(t.id)}
            className={`px-2 py-0.5 rounded-full text-xs font-medium transition-all ${sub === t.id ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-white text-gray-500 border border-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="panel-scroll flex-1 px-1">
        {(sub === 'fonts-ar' || sub === 'fonts-ur' || sub === 'fonts-en') && (
          <div className="grid grid-cols-1 gap-1.5">
            {fonts.map(f => (
              <button key={f.id} onClick={() => onUpdate({ font: f.family })}
                className={`px-3 py-2 rounded-lg text-right transition-all border ${state.text.font === f.family ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-100 hover:border-amber-200'}`}>
                <div style={{ fontFamily: f.family, fontSize: 18, color: '#b8960c', direction: 'rtl', lineHeight: 1.4 }}>محمد ﷺ</div>
                <p className="text-xs text-gray-400 text-left mt-0.5">{f.label}</p>
              </button>
            ))}
          </div>
        )}

        {sub === 'colors' && (
          <div className="grid grid-cols-6 gap-1.5">
            {colorBlocks.map((c, i) => (
              <button key={i} onClick={() => onUpdate({ color: c })}
                className={`rounded-lg transition-all hover:scale-110 aspect-square ${state.text.color === c ? 'ring-2 ring-amber-400' : ''}`}
                style={{ background: c.startsWith('linear') ? c : c, minHeight: 28, border: c === '#ffffff' ? '1px solid #e0e0e0' : 'none' }}/>
            ))}
          </div>
        )}

        {sub === 'textures' && (
          <div className="grid grid-cols-2 gap-2">
            {textureBlocks.map(t => (
              <button key={t.id} onClick={() => onUpdate({ texture: t.id })}
                className={`px-3 py-3 rounded-xl transition-all border ${state.text.texture === t.id ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-100 hover:border-amber-200'}`}>
                <div style={{ ...(t.css as any), fontFamily: "'Amiri', serif", fontSize: 22, direction: 'rtl', lineHeight: 1.4, color: Object.keys(t.css).length === 0 ? '#b8960c' : undefined }}>محمد</div>
                <p className="text-xs text-gray-500 mt-1 text-center">{t.label}</p>
              </button>
            ))}
          </div>
        )}

        {sub === 'effects' && (
          <div className="grid grid-cols-2 gap-2">
            {textEffects.map(e => (
              <button key={e.id} onClick={() => onUpdate({ textShadow: e.shadowCss, effect: e.id })}
                className={`px-2 py-2.5 rounded-xl transition-all border ${state.text.effect === e.id ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-100'}`}>
                <div style={{ fontFamily: "'Amiri', serif", fontSize: 18, color: '#b8960c', textShadow: e.shadowCss !== 'none' ? e.shadowCss : undefined, direction: 'rtl', lineHeight: 1.6 }}>اللہ</div>
                <p className="text-xs text-gray-500 text-center mt-0.5">{e.label}</p>
              </button>
            ))}
          </div>
        )}

        {sub === 'animations' && (
          <div className="grid grid-cols-2 gap-2">
            {textAnimations.map(a => (
              <button key={a.id} onClick={() => onUpdate({ animation: a.cssClass })}
                className={`px-2 py-2.5 rounded-xl transition-all border ${state.text.animation === a.cssClass ? 'bg-amber-50 border-amber-300' : 'bg-white border-gray-100'}`}>
                <div className={a.cssClass} style={{ fontFamily: "'Amiri', serif", fontSize: 18, color: '#b8960c', direction: 'rtl', lineHeight: 1.6, animationDuration: '3s', animationIterationCount: 'infinite' }}>محمد</div>
                <p className="text-xs text-gray-500 text-center mt-0.5">{a.label}</p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────── SECTION 03: BACKGROUNDS ───────────────────
const bgCategories = [
  { id: 'all', label: 'سب' }, { id: 'vibrant', label: 'روشن' }, { id: 'glassy', label: 'شیشہ' },
  { id: 'digital', label: 'ڈیجیٹل' }, { id: 'multicolor', label: 'ملٹی' }, { id: 'emerald', label: 'زمرد' },
  { id: 'crimson', label: 'قرمزی' }, { id: 'spring-forest', label: 'جنگل' }, { id: 'luminous', label: 'روشن' },
  { id: 'transparent', label: 'شفاف' }, { id: 'fluffy', label: 'ملائم' }, { id: 'flowery', label: 'پھول' },
  { id: 'starry', label: 'ستارے' }, { id: '3d', label: '3D' }, { id: '4d', label: '4D' },
];

const Section03: React.FC<{ state: EditorState; onUpdate: (c: Partial<CanvasConfig>) => void }> = ({ state, onUpdate }) => {
  const [cat, setCat] = useState('all');
  const filtered = cat === 'all' ? backgroundThemes : backgroundThemes.filter(b => b.category === cat);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex gap-1 overflow-x-auto scrollbar-none px-1 pb-1">
        {bgCategories.map(c => (
          <button key={c.id} onClick={() => setCat(c.id)}
            className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${cat === c.id ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-white text-gray-500 border border-gray-200'}`}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 px-1 panel-scroll flex-1">
        {filtered.map(bg => (
          <button key={bg.id} onClick={() => onUpdate({ bgThemeId: bg.id, bgGradient: bg.gradient, bgAnimation: bg.animation })}
            className={`rounded-xl overflow-hidden transition-all hover:scale-105 ${state.canvas.bgThemeId === bg.id ? 'ring-2 ring-amber-400' : ''}`}>
            <div className="aspect-video rounded-t-xl" style={{ background: bg.gradient, animation: bg.animation }}/>
            <p className="text-xs text-center py-1.5 text-gray-600 bg-white">{bg.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
};

// ─────────────────── SECTION 04: EFFECTS ───────────────────
const Section04: React.FC<{ state: EditorState; onUpdate: (c: Partial<CanvasConfig>) => void }> = ({ state, onUpdate }) => {
  const [sub, setSub] = useState<'beauty' | 'transitions' | '3d4d'>('beauty');
  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex gap-1.5 px-1">
        {[{ id: 'beauty', label: 'خوبصورتی' }, { id: 'transitions', label: 'منتقلی' }, { id: '3d4d', label: '3D/4D' }].map(t => (
          <button key={t.id} onClick={() => setSub(t.id as any)}
            className={`flex-1 px-2 py-1 rounded-xl text-xs font-medium transition-all ${sub === t.id ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-white text-gray-500 border border-gray-200'}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-2 px-1 panel-scroll flex-1">
        {sub === 'beauty' && beautyEffects.map(e => (
          <button key={e.id} onClick={() => onUpdate({ effectClass: e.cssClass })}
            className={`px-2 py-2 rounded-xl transition-all text-xs text-center border font-medium ${state.canvas.effectClass === e.cssClass ? 'bg-amber-50 border-amber-300 text-amber-800' : 'bg-white border-gray-100 text-gray-600 hover:border-amber-200'}`}>
            {e.label}
          </button>
        ))}
        {sub === 'transitions' && transitionEffects.map(e => (
          <button key={e.id}
            className="px-2 py-2 rounded-xl transition-all text-xs text-center border font-medium bg-white border-gray-100 text-gray-600 hover:border-amber-200 hover:bg-amber-50">
            {e.label}
          </button>
        ))}
        {sub === '3d4d' && animationEffects3D.map(e => (
          <button key={e.id}
            className="px-2 py-2 rounded-xl transition-all text-xs text-center border font-medium bg-white border-gray-100 text-gray-600 hover:border-amber-200 hover:bg-amber-50">
            {e.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ─────────────────── SECTION 05: TEMPLATES ───────────────────
const Section05: React.FC<{ onSelect: (t: any) => void; favs: number[]; onFavToggle: (id: number) => void }> = ({ onSelect, favs, onFavToggle }) => {
  const [cat, setCat] = useState('all');
  const [showFavs, setShowFavs] = useState(false);
  const displayed = showFavs
    ? templates.filter(t => favs.includes(t.id))
    : cat === 'all' ? templates : templates.filter(t => t.category === cat);

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="flex gap-1.5 px-1">
        <button onClick={() => setShowFavs(!showFavs)}
          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 transition-all ${showFavs ? 'bg-red-50 text-red-600 border border-red-200' : 'bg-white text-gray-500 border border-gray-200'}`}>
          <Heart className={`w-3 h-3 ${showFavs ? 'fill-current' : ''}`} />
          پسندیدہ
        </button>
        <div className="flex gap-1 overflow-x-auto scrollbar-none flex-1">
          {categories.map(c => (
            <button key={c.id} onClick={() => { setShowFavs(false); setCat(c.id); }}
              className={`px-2 py-0.5 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0 transition-all ${!showFavs && cat === c.id ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-white text-gray-500 border border-gray-200'}`}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
      {displayed.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-sm text-gray-400">کوئی ٹیمپلیٹ نہیں</div>
      ) : (
        <div className="grid grid-cols-2 gap-2 px-1 panel-scroll flex-1">
          {displayed.map(t => (
            <div key={t.id} className="relative group">
              <button onClick={() => onSelect(t)}
                className="w-full rounded-xl overflow-hidden transition-all hover:scale-105">
                <div className="canvas-9-16 rounded-xl flex items-center justify-center"
                  style={{ background: t.isLight ? 'linear-gradient(135deg, #fffde7, #ffffff)' : 'linear-gradient(135deg, #1a0000, #3d0000)' }}>
                  <div style={{ fontFamily: "'Amiri', serif", color: t.isLight ? '#b8960c' : '#ffd700', fontSize: 14, direction: 'rtl', textAlign: 'center', padding: '4px' }}>{t.arabicText?.slice(0, 12)}</div>
                </div>
              </button>
              <button onClick={() => onFavToggle(t.id)}
                className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center bg-white/80 transition-all">
                <Heart className={`w-3 h-3 ${favs.includes(t.id) ? 'text-red-500 fill-current' : 'text-gray-400'}`} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ─────────────────── MAIN CANVAS ───────────────────
const TemplateCanvas = React.forwardRef<HTMLDivElement, { state: EditorState }>(({ state }, ref) => {
  const { text, canvas } = state;
  const border = borderStyles.find(b => b.id === canvas.borderId);
  const header = headerStyles.find(h => h.id === canvas.headerId);
  const footer = headerStyles.find(h => h.id === canvas.footerId);

  const textStyle: React.CSSProperties = {
    fontFamily: text.font, fontSize: text.fontSize, color: text.color,
    fontWeight: text.bold ? '700' : '400', fontStyle: text.italic ? 'italic' : 'normal',
    textAlign: text.align, direction: text.direction, opacity: text.opacity,
    backgroundColor: text.bgColor !== 'transparent' ? text.bgColor : undefined,
    textShadow: text.textShadow || undefined,
    lineHeight: 1.4, wordBreak: 'break-word', padding: '0 8px',
    ...(() => {
      const tex = textureBlocks.find(t => t.id === text.texture);
      return tex ? tex.css as React.CSSProperties : {};
    })(),
  };

  return (
    <div ref={ref} className="relative w-full canvas-9-16 rounded-2xl overflow-hidden"
      style={{ background: canvas.bgGradient, animation: canvas.bgAnimation }}>
      {/* Header */}
      {header && (
        <div className="absolute top-0 left-0 right-0" style={{ height: header.height, ...header.style as React.CSSProperties }}/>
      )}
      {/* Border overlay */}
      {border && (
        <div className="absolute inset-3 pointer-events-none" style={border.style as React.CSSProperties}/>
      )}
      {/* Text */}
      {(text.main || text.sub) && (
        <div className={`absolute inset-0 flex flex-col items-center justify-center z-10 ${text.animation || ''}`}
          style={{ animationDuration: '3s', animationIterationCount: 'infinite' }}>
          {text.main && <div style={textStyle}>{text.main}</div>}
          {text.sub && <div style={{ ...textStyle, fontSize: Math.round(text.fontSize * 0.42), marginTop: 8, opacity: 0.85 }}>{text.sub}</div>}
        </div>
      )}
      {/* Footer */}
      {footer && (
        <div className="absolute bottom-0 left-0 right-0" style={{ height: footer.height, ...footer.style as React.CSSProperties }}/>
      )}
      {/* Glass sheen */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.25) 0%, transparent 50%)', borderRadius: 'inherit' }}/>
      {/* Sparkle dots */}
      {[10, 80, 25, 70, 50].map((x, i) => (
        <div key={i} className="absolute rounded-full pointer-events-none" style={{ left: `${x}%`, top: `${[15, 30, 60, 75, 45][i]}%`, width: '3px', height: '3px', background: 'rgba(212,175,55,0.6)', boxShadow: '0 0 6px rgba(212,175,55,0.6)', animation: `sparkle-pt ${1.5 + i * 0.4}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}/>
      ))}
    </div>
  );
});
TemplateCanvas.displayName = 'TemplateCanvas';

// ─────────────────── RIGHT PANEL ───────────────────
const RightPanel: React.FC<{
  state: EditorState;
  onTextUpdate: (t: Partial<TextConfig>) => void;
  onLayerUpdate: (layers: Layer[]) => void;
  onSelectLayer: (id: string) => void;
  canvasRef: React.RefObject<HTMLDivElement>;
  onSaveDraft: () => void;
  onLoadDraft: () => void;
  onExport: (fmt: string) => void;
  onImport: (files: File[]) => void;
  voiceLang: string;
  onVoiceLang: (l: string) => void;
}> = ({ state, onTextUpdate, onLayerUpdate, canvasRef, onSaveDraft, onLoadDraft, onExport, onImport, voiceLang, onVoiceLang }) => {
  const [tab, setTab] = useState<'text' | 'layers' | 'files'>('text');
  const tabs = [{ id: 'text', label: 'متن' }, { id: 'layers', label: 'تہیں' }, { id: 'files', label: 'فائل' }] as const;

  const handleLayers = {
    toggleVisible: (id: string) => onLayerUpdate(state.layers.map(l => l.id === id ? { ...l, visible: !l.visible } : l)),
    toggleLock: (id: string) => onLayerUpdate(state.layers.map(l => l.id === id ? { ...l, locked: !l.locked } : l)),
    delete: (id: string) => onLayerUpdate(state.layers.filter(l => l.id !== id)),
    reorder: (from: number, to: number) => {
      const sorted = [...state.layers].sort((a, b) => b.zIndex - a.zIndex);
      if (to < 0 || to >= sorted.length) return;
      const arr = [...sorted]; [arr[from], arr[to]] = [arr[to], arr[from]];
      onLayerUpdate(arr.map((l, i) => ({ ...l, zIndex: arr.length - i })));
    },
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden">
      {/* Tab nav */}
      <div className="flex border-b border-amber-100 bg-white/50">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setTab(t.id)}
            className={`flex-1 py-2 text-xs font-semibold transition-all ${tab === t.id ? 'text-amber-700 border-b-2 border-amber-400 bg-amber-50/60' : 'text-gray-400'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="flex-1 panel-scroll p-2">
        {tab === 'text' && (
          <div className="space-y-3">
            {/* Voice input */}
            <div className="flex items-center gap-2">
              <select value={voiceLang} onChange={e => onVoiceLang(e.target.value)}
                className="flex-1 text-xs rounded-lg px-2 py-1.5 border border-gray-200 bg-white outline-none">
                <option value="ar-SA">عربی</option>
                <option value="ur-PK">اردو</option>
                <option value="en-US">English</option>
              </select>
              <VoiceInput onResult={t => onTextUpdate({ main: state.text.main + t })} lang={voiceLang} />
            </div>
            {/* Main text */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">مرکزی متن</label>
              <textarea value={state.text.main} onChange={e => onTextUpdate({ main: e.target.value })}
                className="w-full text-sm rounded-xl px-3 py-2 border border-gray-200 bg-white outline-none resize-none focus:border-amber-300"
                rows={3} dir="rtl" placeholder="یہاں لکھیں..."/>
            </div>
            {/* Sub text */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">ذیلی متن</label>
              <input value={state.text.sub} onChange={e => onTextUpdate({ sub: e.target.value })}
                className="w-full text-xs rounded-xl px-3 py-2 border border-gray-200 bg-white outline-none focus:border-amber-300"
                dir="rtl" placeholder="ذیلی عنوان..."/>
            </div>
            {/* Font size */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">سائز: {state.text.fontSize}px</label>
              <input type="range" min={12} max={120} value={state.text.fontSize} onChange={e => onTextUpdate({ fontSize: +e.target.value })}
                className="w-full accent-amber-500"/>
            </div>
            {/* Bold / Italic / Align */}
            <div className="flex items-center gap-2">
              <button onClick={() => onTextUpdate({ bold: !state.text.bold })}
                className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${state.text.bold ? 'bg-amber-100 text-amber-800' : 'bg-gray-50 text-gray-500'}`}>B</button>
              <button onClick={() => onTextUpdate({ italic: !state.text.italic })}
                className={`flex-1 py-1.5 rounded-lg text-xs italic transition-all ${state.text.italic ? 'bg-amber-100 text-amber-800' : 'bg-gray-50 text-gray-500'}`}>I</button>
              <button onClick={() => onTextUpdate({ direction: state.text.direction === 'rtl' ? 'ltr' : 'rtl' })}
                className="flex-1 py-1.5 rounded-lg text-xs bg-gray-50 text-gray-500 transition-all hover:bg-amber-50">
                {state.text.direction === 'rtl' ? 'RTL' : 'LTR'}
              </button>
            </div>
            {/* Align */}
            <div className="flex gap-1.5">
              {(['left', 'center', 'right'] as const).map(a => (
                <button key={a} onClick={() => onTextUpdate({ align: a })}
                  className={`flex-1 py-1.5 rounded-lg text-xs transition-all ${state.text.align === a ? 'bg-amber-100 text-amber-700' : 'bg-gray-50 text-gray-400'}`}>
                  {a === 'left' ? '←' : a === 'center' ? '↔' : '→'}
                </button>
              ))}
            </div>
            {/* Opacity */}
            <div>
              <label className="text-xs font-semibold text-gray-600 block mb-1">شفافیت: {Math.round(state.text.opacity * 100)}%</label>
              <input type="range" min={0.1} max={1} step={0.05} value={state.text.opacity} onChange={e => onTextUpdate({ opacity: +e.target.value })}
                className="w-full accent-amber-500"/>
            </div>
          </div>
        )}

        {tab === 'layers' && (
          <div className="space-y-2">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-gray-600">تمام تہیں</span>
              <button onClick={() => {
                const newLayer: Layer = { id: `layer-${Date.now()}`, type: 'text', name: `متن ${state.layers.length + 1}`, visible: true, locked: false, opacity: 1, zIndex: state.layers.length + 1, data: {} };
                onLayerUpdate([...state.layers, newLayer]);
              }} className="w-6 h-6 rounded-lg flex items-center justify-center bg-amber-50 text-amber-600 hover:bg-amber-100 transition-all">
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <LayersPanel layers={state.layers} selectedLayerId={state.selectedLayerId}
              onSelect={() => {}} onToggleVisible={handleLayers.toggleVisible} onToggleLock={handleLayers.toggleLock}
              onDelete={handleLayers.delete} onReorder={handleLayers.reorder} />
            {state.layers.length === 0 && (
              <div className="py-8 text-center text-xs text-gray-400">تہیں شامل کریں</div>
            )}
          </div>
        )}

        {tab === 'files' && (
          <div className="space-y-3">
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">امپورٹ / ایکسپورٹ</p>
              <div className="grid grid-cols-2 gap-2">
                {(['png', 'jpg', 'webp'] as const).map(fmt => (
                  <button key={fmt} onClick={() => onExport(fmt)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all">
                    <FileDown className="w-3.5 h-3.5 text-amber-600" />
                    {fmt.toUpperCase()}
                  </button>
                ))}
                <button onClick={onSaveDraft}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all">
                  <Save className="w-3.5 h-3.5 text-amber-600" />
                  ڈرافٹ
                </button>
                <button onClick={onLoadDraft}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium bg-white border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition-all">
                  <FolderOpen className="w-3.5 h-3.5 text-amber-600" />
                  لوڈ
                </button>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-600 mb-2">میڈیا شامل کریں</p>
              <ImageImporter onImport={onImport} sectionId="media" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────── MAIN EDITOR PAGE ───────────────────
const TemplateEditor: React.FC = () => {
  const { favs, toggle: toggleFav, isFav } = useFavorites();
  const canvasRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState(5);
  const [leftOpen, setLeftOpen] = useState(true);
  const [rightOpen, setRightOpen] = useState(true);
  const [voiceLang, setVoiceLang] = useState('ar-SA');
  const [slideIdx, setSlideIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [slideSpeed, setSlideSpeed] = useState(3000);
  const [importedMedia, setImportedMedia] = useState<File[]>([]);
  const [showSlideshow, setShowSlideshow] = useState(false);

  const [state, setState] = useState<EditorState>({
    text: defaultText,
    canvas: defaultCanvas,
    layers: [
      { id: 'bg-layer', type: 'background', name: 'بیک گراؤنڈ', visible: true, locked: false, opacity: 1, zIndex: 0, data: {} },
      { id: 'text-layer', type: 'text', name: 'مرکزی متن', visible: true, locked: false, opacity: 1, zIndex: 10, data: {} },
    ],
    selectedLayerId: 'text-layer',
  });

  // Slideshow auto-play
  useEffect(() => {
    if (!playing) return;
    const id = setInterval(() => setSlideIdx(i => (i + 1) % templates.length), slideSpeed);
    return () => clearInterval(id);
  }, [playing, slideSpeed]);

  const updateText = useCallback((t: Partial<TextConfig>) => setState(s => ({ ...s, text: { ...s.text, ...t } })), []);
  const updateCanvas = useCallback((c: Partial<CanvasConfig>) => setState(s => ({ ...s, canvas: { ...s.canvas, ...c } })), []);
  const updateLayers = useCallback((layers: Layer[]) => setState(s => ({ ...s, layers })), []);

  const handleTemplateSelect = useCallback((t: any) => {
    const lightGradient = 'radial-gradient(ellipse 140% 120% at 30% 20%, #ffffff 0%, #fffef0 30%, #fffde7 60%, #fff9c4 100%)';
    const darkGradient = 'linear-gradient(160deg, #fffef0 0%, #fff9c4 50%, #fffff0 100%)';
    updateCanvas({ bgGradient: t.isLight ? lightGradient : darkGradient, bgAnimation: 'bg-shimmer 5s ease-in-out infinite' });
    updateText({ main: t.arabicText || '', sub: t.subtitle || '' });
    toast.success('ٹیمپلیٹ منتخب ہوا');
  }, [updateCanvas, updateText]);

  const saveDraft = useCallback(() => {
    try {
      const draft = { state, savedAt: Date.now(), name: `ڈرافٹ ${new Date().toLocaleTimeString('ur')}` };
      const drafts = JSON.parse(localStorage.getItem('drafts') || '[]');
      drafts.unshift(draft);
      localStorage.setItem('drafts', JSON.stringify(drafts.slice(0, 20)));
      toast.success('ڈرافٹ محفوظ ہو گیا');
    } catch { toast.error('ڈرافٹ میں خرابی'); }
  }, [state]);

  const loadDraft = useCallback(() => {
    try {
      const drafts = JSON.parse(localStorage.getItem('drafts') || '[]');
      if (!drafts.length) { toast.info('کوئی ڈرافٹ نہیں'); return; }
      setState(drafts[0].state);
      toast.success('ڈرافٹ لوڈ ہو گیا');
    } catch { toast.error('لوڈ میں خرابی'); }
  }, []);

  const exportCanvas = useCallback(async (format: string) => {
    if (!canvasRef.current) return;
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(canvasRef.current, { scale: 3, useCORS: true, backgroundColor: null, logging: false });
      const link = document.createElement('a');
      link.download = `template-${Date.now()}.${format}`;
      const mime = format === 'jpg' ? 'image/jpeg' : format === 'webp' ? 'image/webp' : 'image/png';
      link.href = canvas.toDataURL(mime, 0.95);
      link.click();
      toast.success('ایکسپورٹ مکمل');
    } catch { toast.error('ایکسپورٹ میں خرابی'); }
  }, []);

  // Active template for slideshow
  const activeTemplate = templates[slideIdx];

  return (
    <div className="h-screen w-screen flex overflow-hidden bright-bg">
      {/* ─── LEFT SIDEBAR ─── */}
      <div className={`flex-shrink-0 flex flex-col transition-all duration-300 ${leftOpen ? 'w-52' : 'w-12'} glass-panel rounded-r-2xl z-20`}>
        {/* Toggle */}
        <div className="flex items-center justify-between px-2 py-2 border-b border-amber-100">
          {leftOpen && <span className="text-xs font-bold gold-text">ٹولز</span>}
          <button onClick={() => setLeftOpen(!leftOpen)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-amber-50 transition-all ml-auto">
            {leftOpen ? <ChevronLeft className="w-4 h-4 text-amber-600" /> : <ChevronRight className="w-4 h-4 text-amber-600" />}
          </button>
        </div>

        {/* Section tabs */}
        <div className={`flex ${leftOpen ? 'flex-row flex-wrap px-2 py-2 gap-1.5' : 'flex-col items-center py-2 gap-2'}`}>
          {sectionTabs.map(tab => (
            <button key={tab.id} onClick={() => { setActiveSection(tab.id); if (!leftOpen) setLeftOpen(true); }}
              className={`flex items-center gap-1.5 rounded-xl transition-all sidebar-btn ${leftOpen ? 'flex-1 min-w-[calc(50%-4px)] px-2 py-1.5 text-xs' : 'w-9 h-9 justify-center'} ${activeSection === tab.id ? 'active' : 'text-gray-500'}`}
              title={tab.label}>
              {tab.icon}
              {leftOpen && <span className="text-xs font-medium">{tab.label}</span>}
            </button>
          ))}
        </div>

        {/* Section panel */}
        {leftOpen && (
          <div className="flex-1 panel-scroll py-2 min-h-0">
            {activeSection === 1 && <Section01 state={state} onUpdate={updateCanvas} />}
            {activeSection === 2 && <Section02 state={state} onUpdate={updateText} />}
            {activeSection === 3 && <Section03 state={state} onUpdate={updateCanvas} />}
            {activeSection === 4 && <Section04 state={state} onUpdate={updateCanvas} />}
            {activeSection === 5 && <Section05 onSelect={handleTemplateSelect} favs={favs} onFavToggle={toggleFav} />}
          </div>
        )}
      </div>

      {/* ─── CENTER CANVAS ─── */}
      <div className="flex-1 flex flex-col items-center justify-center min-w-0 p-3 gap-2">
        {/* Top toolbar */}
        <div className="flex items-center gap-2 glass-panel-light rounded-2xl px-4 py-2 w-full max-w-sm">
          {/* Slideshow controls */}
          <button onClick={() => { setPlaying(!playing); setShowSlideshow(!playing); }}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${playing ? 'bg-amber-100 text-amber-700' : 'bg-white text-gray-500 hover:text-amber-600'}`}>
            {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          {playing && (
            <select value={slideSpeed} onChange={e => setSlideSpeed(+e.target.value)}
              className="text-xs rounded-lg px-2 py-1 border border-gray-200 bg-white outline-none">
              <option value={1000}>1s</option>
              <option value={3000}>3s</option>
              <option value={5000}>5s</option>
              <option value={8000}>8s</option>
            </select>
          )}
          <div className="flex-1"/>
          <DownloadBtn canvasRef={canvasRef} filename="islamic-template" />
          <ShareBtn canvasRef={canvasRef} text={state.text.main || 'اسلامی ٹیمپلیٹ'} />
          <CloudUploadBtn canvasRef={canvasRef} onUploaded={(url) => toast.success('کلاؤڈ لنک: ' + url.slice(0,30) + '...')} />
          <FavBtn id={activeTemplate?.id || 0} isFav={isFav(activeTemplate?.id || 0)} onToggle={() => toggleFav(activeTemplate?.id || 0)} />
        </div>

        {/* Canvas */}
        <div className="flex-1 flex items-center justify-center w-full min-h-0">
          <div className="h-full max-h-full" style={{ aspectRatio: '9/16', maxWidth: '300px' }}>
            <TemplateCanvas ref={canvasRef} state={state} />
          </div>
        </div>

        {/* Navigate slides */}
        {playing && (
          <div className="flex items-center gap-3 glass-panel-light rounded-2xl px-4 py-1.5">
            <button onClick={() => setSlideIdx(i => Math.max(0, i - 1))} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-amber-50 transition-all">
              <ChevronLeft className="w-4 h-4 text-amber-600" />
            </button>
            <span className="text-xs text-gray-500">{slideIdx + 1}/{templates.length}</span>
            <button onClick={() => setSlideIdx(i => Math.min(templates.length - 1, i + 1))} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-amber-50 transition-all">
              <ChevronRight className="w-4 h-4 text-amber-600" />
            </button>
          </div>
        )}
      </div>

      {/* ─── RIGHT SIDEBAR ─── */}
      <div className={`flex-shrink-0 flex flex-col transition-all duration-300 ${rightOpen ? 'w-52' : 'w-12'} glass-panel rounded-l-2xl z-20`}>
        <div className="flex items-center px-2 py-2 border-b border-amber-100">
          <button onClick={() => setRightOpen(!rightOpen)} className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-amber-50 transition-all">
            {rightOpen ? <ChevronRight className="w-4 h-4 text-amber-600" /> : <ChevronLeft className="w-4 h-4 text-amber-600" />}
          </button>
          {rightOpen && <span className="text-xs font-bold gold-text mr-2">خصوصیات</span>}
        </div>
        {rightOpen && (
          <div className="flex-1 min-h-0 p-2">
            <RightPanel state={state} onTextUpdate={updateText} onLayerUpdate={updateLayers}
              onSelectLayer={(id) => setState(s => ({ ...s, selectedLayerId: id }))}
              canvasRef={canvasRef} onSaveDraft={saveDraft} onLoadDraft={loadDraft}
              onExport={exportCanvas} onImport={setImportedMedia}
              voiceLang={voiceLang} onVoiceLang={setVoiceLang} />
          </div>
        )}
        {!rightOpen && (
          <div className="flex flex-col items-center py-2 gap-2">
            {[<Type key="t" className="w-4 h-4" />, <Layers key="l" className="w-4 h-4" />, <FileDown key="f" className="w-4 h-4" />].map((icon, i) => (
              <button key={i} onClick={() => setRightOpen(true)} className="w-9 h-9 rounded-xl flex items-center justify-center hover:bg-amber-50 text-gray-400 transition-all">{icon}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateEditor;
