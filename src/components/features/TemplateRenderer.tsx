import React from 'react';
import { Template, ColorScheme, ArabicFont } from '@/types/template';

/* ─────────────────────────────────────────────
   COLOR CONFIGS (Dark + Light Variants)
───────────────────────────────────────────── */
interface ColorConfig {
  primary: string; secondary: string; accent: string;
  text: string; glow: string; bg1: string; bg2: string;
  highlight: string; isLight?: boolean;
  textShadowDark?: string;
}

const colorConfigs: Record<ColorScheme, ColorConfig> = {
  'crimson-gold': { primary: '#c41e3a', secondary: '#8b0000', accent: '#ffd700', text: '#ffd700', glow: 'rgba(220,20,60,0.9)', bg1: '#1a0000', bg2: '#3d0000', highlight: '#ff6b8a', isLight: false, textShadowDark: 'rgba(196,30,58,0.8)' },
  'emerald-silver': { primary: '#00c87a', secondary: '#006440', accent: '#e8ffe8', text: '#e8ffe8', glow: 'rgba(0,200,122,0.9)', bg1: '#001a08', bg2: '#00331a', highlight: '#80ffcc', isLight: false },
  'royal-blue': { primary: '#2563eb', secondary: '#1e3a8a', accent: '#93c5fd', text: '#bfdbfe', glow: 'rgba(37,99,235,0.9)', bg1: '#00001f', bg2: '#00003d', highlight: '#60a5fa', isLight: false },
  'purple-gold': { primary: '#9333ea', secondary: '#4c1d95', accent: '#fbbf24', text: '#f5e6ff', glow: 'rgba(147,51,234,0.9)', bg1: '#0d0020', bg2: '#1a0040', highlight: '#c084fc', isLight: false },
  'dark-red': { primary: '#991b1b', secondary: '#450a0a', accent: '#fca5a5', text: '#ffe4e4', glow: 'rgba(153,27,27,0.9)', bg1: '#0a0000', bg2: '#1f0000', highlight: '#f87171', isLight: false },
  'teal-silver': { primary: '#0d9488', secondary: '#0f766e', accent: '#f0fdfa', text: '#ccfbf1', glow: 'rgba(13,148,136,0.9)', bg1: '#001a18', bg2: '#003330', highlight: '#2dd4bf', isLight: false },
  'amber-gold': { primary: '#d97706', secondary: '#92400e', accent: '#fef9c3', text: '#fef9c3', glow: 'rgba(217,119,6,0.9)', bg1: '#1a0e00', bg2: '#331d00', highlight: '#fcd34d', isLight: false },
  'sapphire': { primary: '#1d4ed8', secondary: '#1e3a8a', accent: '#bfdbfe', text: '#dbeafe', glow: 'rgba(29,78,216,0.9)', bg1: '#00001f', bg2: '#00003d', highlight: '#93c5fd', isLight: false },
  'rose-silver': { primary: '#e11d48', secondary: '#9d174d', accent: '#fce7f3', text: '#ffe4f0', glow: 'rgba(225,29,72,0.9)', bg1: '#1a0010', bg2: '#330020', highlight: '#fb7185', isLight: false },
  'midnight-blue': { primary: '#1e40af', secondary: '#0f2340', accent: '#bfdbfe', text: '#e0f2fe', glow: 'rgba(30,64,175,0.9)', bg1: '#000a1a', bg2: '#001433', highlight: '#38bdf8', isLight: false },
  // LIGHT SCHEMES
  'pure-white': { primary: '#d4af37', secondary: '#b8960c', accent: '#ffffff', text: '#8b4513', glow: 'rgba(212,175,55,0.7)', bg1: '#f8f4ee', bg2: '#fffef8', highlight: '#ffd700', isLight: true, textShadowDark: 'rgba(139,69,19,0.4)' },
  'pearl-ivory': { primary: '#c8a96e', secondary: '#a07850', accent: '#fffff0', text: '#5c3d1e', glow: 'rgba(200,169,110,0.7)', bg1: '#fefdf5', bg2: '#fff8e8', highlight: '#e8d5a3', isLight: true, textShadowDark: 'rgba(92,61,30,0.4)' },
  'sky-gold': { primary: '#0284c7', secondary: '#0369a1', accent: '#fef9c3', text: '#1e3a5f', glow: 'rgba(2,132,199,0.6)', bg1: '#f0f9ff', bg2: '#e0f2fe', highlight: '#fcd34d', isLight: true, textShadowDark: 'rgba(30,58,95,0.4)' },
  'mint-silver': { primary: '#059669', secondary: '#047857', accent: '#f0fdf4', text: '#064e3b', glow: 'rgba(5,150,105,0.6)', bg1: '#f0fdf9', bg2: '#d1fae5', highlight: '#6ee7b7', isLight: true, textShadowDark: 'rgba(6,78,59,0.4)' },
  'lavender-gold': { primary: '#7c3aed', secondary: '#5b21b6', accent: '#fef9c3', text: '#2e1065', glow: 'rgba(124,58,237,0.6)', bg1: '#f5f3ff', bg2: '#ede9fe', highlight: '#fcd34d', isLight: true, textShadowDark: 'rgba(46,16,101,0.4)' },
  'coral-gold': { primary: '#ea580c', secondary: '#c2410c', accent: '#fef9c3', text: '#431407', glow: 'rgba(234,88,12,0.7)', bg1: '#fff7ed', bg2: '#ffedd5', highlight: '#fcd34d', isLight: true, textShadowDark: 'rgba(67,20,7,0.4)' },
  'ocean-teal': { primary: '#0891b2', secondary: '#0e7490', accent: '#ecfeff', text: '#0c4a6e', glow: 'rgba(8,145,178,0.6)', bg1: '#ecfeff', bg2: '#cffafe', highlight: '#67e8f9', isLight: true, textShadowDark: 'rgba(12,74,110,0.4)' },
  'sunset-orange': { primary: '#dc2626', secondary: '#b91c1c', accent: '#fef9c3', text: '#450a0a', glow: 'rgba(220,38,38,0.7)', bg1: '#fff1f2', bg2: '#ffe4e6', highlight: '#fcd34d', isLight: true, textShadowDark: 'rgba(69,10,10,0.4)' },
  'spring-green': { primary: '#16a34a', secondary: '#15803d', accent: '#f0fdf4', text: '#052e16', glow: 'rgba(22,163,74,0.6)', bg1: '#f0fdf9', bg2: '#dcfce7', highlight: '#86efac', isLight: true, textShadowDark: 'rgba(5,46,22,0.4)' },
  'cherry-blossom': { primary: '#db2777', secondary: '#be185d', accent: '#fdf2f8', text: '#500724', glow: 'rgba(219,39,119,0.6)', bg1: '#fdf4ff', bg2: '#fce7f3', highlight: '#f9a8d4', isLight: true, textShadowDark: 'rgba(80,7,36,0.4)' },
  // ENERGETIC / NEON
  'electric-blue': { primary: '#00d4ff', secondary: '#0090cc', accent: '#ffffff', text: '#00eeff', glow: 'rgba(0,212,255,0.9)', bg1: '#000814', bg2: '#001428', highlight: '#80eeff', isLight: false },
  'neon-green': { primary: '#39ff14', secondary: '#00aa00', accent: '#ffffff', text: '#00ff88', glow: 'rgba(57,255,20,0.9)', bg1: '#001400', bg2: '#002800', highlight: '#aaff88', isLight: false },
  'hot-pink': { primary: '#ff1493', secondary: '#cc0070', accent: '#ffffff', text: '#ff69b4', glow: 'rgba(255,20,147,0.9)', bg1: '#1a000f', bg2: '#330020', highlight: '#ff80cc', isLight: false },
  'fire-orange': { primary: '#ff6600', secondary: '#cc3300', accent: '#ffff00', text: '#ffaa00', glow: 'rgba(255,102,0,0.9)', bg1: '#1a0800', bg2: '#330f00', highlight: '#ffcc44', isLight: false },
  'ice-blue': { primary: '#b8e4f9', secondary: '#90c8e8', accent: '#ffffff', text: '#1a3a5c', glow: 'rgba(184,228,249,0.7)', bg1: '#f0f8ff', bg2: '#e8f4fd', highlight: '#ffffff', isLight: true },
  'velvet-purple': { primary: '#8b00ff', secondary: '#4b0082', accent: '#dda0dd', text: '#e8d5ff', glow: 'rgba(139,0,255,0.9)', bg1: '#0a0015', bg2: '#14002a', highlight: '#cc80ff', isLight: false },
  'bronze-copper': { primary: '#cd7f32', secondary: '#a0522d', accent: '#ffe4b5', text: '#3d1a00', glow: 'rgba(205,127,50,0.7)', bg1: '#2a1500', bg2: '#3d2000', highlight: '#ffd700', isLight: false },
  'platinum-silver': { primary: '#e8e8e8', secondary: '#c0c0c0', accent: '#ffffff', text: '#2c2c2c', glow: 'rgba(232,232,232,0.7)', bg1: '#f5f5f5', bg2: '#ebebeb', highlight: '#ffffff', isLight: true },
  'ruby-red': { primary: '#e0115f', secondary: '#9b0030', accent: '#ffd700', text: '#fff0f5', glow: 'rgba(224,17,95,0.9)', bg1: '#0a0005', bg2: '#1a000a', highlight: '#ff80aa', isLight: false },
  'jade-green': { primary: '#00a86b', secondary: '#00875a', accent: '#e6fff6', text: '#003322', glow: 'rgba(0,168,107,0.7)', bg1: '#f0fff8', bg2: '#e0fff0', highlight: '#80ffc0', isLight: true },
};

/* ─────────────────────────────────────────────
   FONT SYSTEM
───────────────────────────────────────────── */
const fontFamilyMap: Record<string, string> = {
  'amiri': "'Amiri', serif",
  'scheherazade': "'Scheherazade New', serif",
  'lateef': "'Lateef', serif",
  'reem-kufi': "'Reem Kufi', sans-serif",
  'mada': "'Mada', sans-serif",
  'cairo': "'Cairo', sans-serif",
  'tajawal': "'Tajawal', sans-serif",
  'noto-naskh': "'Noto Naskh Arabic', serif",
  'ibm-plex-arabic': "'IBM Plex Sans Arabic', sans-serif",
  'aref-ruqaa': "'Aref Ruqaa Ink', serif",
  'harmattan': "'Harmattan', serif",
  'alkalami': "'Alkalami', serif",
  'jomhuria': "'Jomhuria', serif",
  'mirza': "'Mirza', serif",
  'rakkas': "'Rakkas', cursive",
  'el-messiri': "'El Messiri', sans-serif",
  'markazi': "'Markazi Text', serif",
  'noto-kufi': "'Noto Kufi Arabic', sans-serif",
  'lemonada': "'Lemonada', cursive",
  'vibes': "'Vibes', cursive",
};

/* ─────────────────────────────────────────────
   INTERFACES
───────────────────────────────────────────── */
interface OverlayText { main?: string; sub?: string; }
interface Props {
  template: Template;
  mini?: boolean;
  className?: string;
  overlayText?: OverlayText;
}

/* ─────────────────────────────────────────────
   TEXTURE: CRYSTAL GLASSY DARK
───────────────────────────────────────────── */
const CrystalGlassyBg: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 30% 20%, ${colors.primary}22 0%, transparent 60%), radial-gradient(ellipse 60% 80% at 70% 80%, ${colors.secondary}33 0%, transparent 60%), linear-gradient(160deg, ${colors.bg2} 0%, ${colors.bg1} 40%, ${colors.bg2}88 100%)` }}/>
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.18 }}>
      <defs>
        <pattern id={`micro-${id}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="4.5" height="4.5" fill={colors.primary} opacity="0.9"/>
          <rect x="5" y="0" width="4.5" height="4.5" fill="white" opacity="0.6"/>
          <rect x="0" y="5" width="4.5" height="4.5" fill="white" opacity="0.4"/>
          <rect x="5" y="5" width="4.5" height="4.5" fill={colors.secondary} opacity="0.8"/>
        </pattern>
        <radialGradient id={`vig-${id}`} cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="100%" stopColor={colors.bg1} stopOpacity="0.7"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#micro-${id})`}/>
      <rect width="100%" height="100%" fill={`url(#vig-${id})`}/>
    </svg>
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, transparent 35%), linear-gradient(225deg, rgba(255,255,255,0.10) 0%, transparent 30%)' }}/>
    <div className="absolute" style={{ top: mini ? '5%' : '8%', left: '10%', width: '40%', height: mini ? '20%' : '25%', background: 'linear-gradient(135deg, rgba(255,80,80,0.08), rgba(80,255,150,0.07), rgba(80,120,255,0.08))', borderRadius: '50%', filter: `blur(${mini ? 8 : 20}px)`, transform: 'rotate(-20deg)' }}/>
    <div className="absolute" style={{ top: 0, left: '15%', width: '30%', height: '100%', background: 'linear-gradient(180deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.04) 40%, transparent 70%)', transform: 'skewX(-5deg)' }}/>
    {!mini && Array.from({ length: 16 }).map((_, i) => {
      const positions = [[8,12],[18,28],[32,8],[45,22],[60,5],[72,18],[85,30],[15,45],[28,55],[42,38],[55,62],[68,48],[10,72],[25,82],[65,85],[88,78]];
      const [x, y] = positions[i] || [20, 20];
      return <div key={i} className="absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: '3px', height: '3px', background: 'white', boxShadow: `0 0 6px rgba(255,255,255,0.9), 0 0 12px ${colors.glow}`, animation: `sparklePoint ${1.5 + (i % 5) * 0.4}s ease-in-out infinite`, animationDelay: `${(i * 0.25) % 2.5}s` }}/>;
    })}
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: MILKY WHITE SPARKLING
───────────────────────────────────────────── */
const MilkyWhiteTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `linear-gradient(145deg, ${colors.bg2} 0%, ${colors.bg1} 50%, ${colors.bg2} 100%)` }}/>
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.15 }}>
      <defs>
        <pattern id={`milky-${id}`} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="1.5" fill={colors.primary} opacity="0.8"/>
          <circle cx="0" cy="0" r="1" fill={colors.primary} opacity="0.5"/>
          <circle cx="20" cy="20" r="1" fill={colors.primary} opacity="0.5"/>
        </pattern>
        <radialGradient id={`milky-glow-${id}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="white" stopOpacity="0.4"/>
          <stop offset="100%" stopColor="white" stopOpacity="0.0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#milky-${id})`}/>
    </svg>
    <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.2) 60%, transparent 100%)' }}/>
    {/* Pearl shimmer streaks */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 40%, rgba(255,255,255,0.3) 60%, transparent 100%)' }}/>
    <div className="absolute" style={{ top: '20%', left: '5%', width: '30%', height: '8px', background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent)`, transform: 'rotate(-10deg)', filter: 'blur(2px)' }}/>
    <div className="absolute" style={{ top: '60%', right: '10%', width: '25%', height: '6px', background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)`, transform: 'rotate(8deg)', filter: 'blur(2px)' }}/>
    {/* Gold accents */}
    <div className="absolute inset-x-4 top-4" style={{ height: mini ? '2px' : '3px', background: `linear-gradient(90deg, transparent, ${colors.primary}, ${colors.highlight}, ${colors.primary}, transparent)` }}/>
    <div className="absolute inset-x-4 bottom-4" style={{ height: mini ? '2px' : '3px', background: `linear-gradient(90deg, transparent, ${colors.primary}, ${colors.highlight}, ${colors.primary}, transparent)` }}/>
    {/* Sparkle dots */}
    {!mini && [[15,20],[50,8],[80,25],[25,65],[70,70],[40,85],[90,50]].map(([x,y], i) => (
      <div key={i} className="absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: '4px', height: '4px', background: `radial-gradient(circle, white 0%, ${colors.primary}88 100%)`, boxShadow: `0 0 8px ${colors.glow}, 0 0 3px white`, animation: `sparklePoint ${2 + i * 0.3}s ease-in-out infinite`, animationDelay: `${i * 0.4}s` }}/>
    ))}
    <div className="absolute inset-0" style={{ border: `${mini ? '1px' : '2px'} solid rgba(255,255,255,0.5)`, borderRadius: 'inherit', pointerEvents: 'none' }}/>
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: LIGHT BRIGHT GLASSY
───────────────────────────────────────────── */
const LightBrightTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 90% 70% at 40% 30%, ${colors.bg2} 0%, ${colors.bg1} 80%)` }}/>
    {/* Fine diagonal pattern */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
      <defs>
        <pattern id={`light-fine-${id}`} x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={colors.primary} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#light-fine-${id})`}/>
    </svg>
    {/* Bright glass gloss */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.55) 0%, transparent 45%, rgba(255,255,255,0.2) 100%)' }}/>
    {/* Color wash */}
    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 60% 40% at 70% 70%, ${colors.primary}18 0%, transparent 70%)` }}/>
    {/* Gold border frame */}
    <div className="absolute inset-3 pointer-events-none" style={{ border: `${mini ? 1 : 2}px solid ${colors.primary}66`, borderRadius: '8px' }}/>
    {/* Corner florals */}
    {!mini && ['3% 3%', '97% 3%', '3% 97%', '97% 97%'].map((pos, i) => (
      <div key={i} className="absolute text-xs" style={{ left: pos.split(' ')[0], top: pos.split(' ')[1], transform: 'translate(-50%,-50%)', color: colors.primary, opacity: 0.6, fontSize: '14px' }}>✿</div>
    ))}
    {/* Sparkles */}
    {!mini && [[20,15],[60,10],[85,35],[15,60],[75,70],[45,88]].map(([x,y], i) => (
      <div key={i} className="absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: '3px', height: '3px', background: colors.primary, boxShadow: `0 0 6px ${colors.glow}`, opacity: 0.7, animation: `sparklePoint ${2 + i * 0.35}s ease-in-out infinite`, animationDelay: `${i * 0.3}s` }}/>
    ))}
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: EMBROIDERY
───────────────────────────────────────────── */
const EmbroideryTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${colors.bg2} 0%, ${colors.bg1} 100%)` }}/>
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.6 }}>
      <defs>
        <pattern id={`emb-${id}`} x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="12" cy="12" r="2" fill={colors.primary} opacity="0.8"/>
          <line x1="12" y1="0" x2="12" y2="24" stroke={colors.accent} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2"/>
          <line x1="0" y1="12" x2="24" y2="12" stroke={colors.accent} strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2"/>
          <path d="M 0 0 L 24 24 M 24 0 L 0 24" stroke={colors.highlight} strokeWidth="0.4" opacity="0.25"/>
          <circle cx="0" cy="0" r="1" fill={colors.highlight} opacity="0.5"/>
          <circle cx="24" cy="0" r="1" fill={colors.highlight} opacity="0.5"/>
          <circle cx="0" cy="24" r="1" fill={colors.highlight} opacity="0.5"/>
          <circle cx="24" cy="24" r="1" fill={colors.highlight} opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#emb-${id})`}/>
    </svg>
    {/* Satin sheen */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 40%, rgba(255,255,255,0.1) 100%)' }}/>
    {/* Border frame stitching */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
      <rect x={mini ? "3" : "6"} y={mini ? "3" : "6"} width={`calc(100% - ${mini ? 6 : 12}px)`} height={`calc(100% - ${mini ? 6 : 12}px)`}
        fill="none" stroke={colors.primary} strokeWidth={mini ? "1" : "2"} strokeDasharray={mini ? "4 3" : "8 5"}/>
      <rect x={mini ? "6" : "12"} y={mini ? "6" : "12"} width={`calc(100% - ${mini ? 12 : 24}px)`} height={`calc(100% - ${mini ? 12 : 24}px)`}
        fill="none" stroke={colors.accent} strokeWidth={mini ? "0.5" : "1"} opacity="0.5"/>
    </svg>
    {/* Corner medallions */}
    {!mini && [[8,8],[92,8],[8,92],[92,92]].map(([x,y], i) => (
      <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', width: '20px', height: '20px', borderRadius: '50%', background: `radial-gradient(circle, ${colors.accent}cc, ${colors.primary})`, boxShadow: `0 0 8px ${colors.glow}` }}/>
    ))}
    {/* Top ornament strip */}
    <div className="absolute top-0 left-0 right-0" style={{ height: mini ? '18%' : '12%', background: `linear-gradient(90deg, transparent, ${colors.primary}33, ${colors.accent}22, ${colors.primary}33, transparent)`, borderBottom: `1px solid ${colors.primary}44` }}/>
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: STARRY NIGHT
───────────────────────────────────────────── */
const StarryNightTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 100% 80% at 50% 20%, ${colors.bg2} 0%, ${colors.bg1} 70%)` }}/>
    {/* Star field */}
    <svg className="absolute inset-0 w-full h-full">
      {Array.from({ length: mini ? 30 : 80 }).map((_, i) => {
        const x = (i * 37 + 13) % 97 + 1.5;
        const y = (i * 53 + 7) % 95 + 2.5;
        const r = i % 5 === 0 ? 1.5 : i % 3 === 0 ? 1 : 0.6;
        return <circle key={i} cx={`${x}%`} cy={`${y}%`} r={r} fill="white" opacity={0.3 + (i % 7) * 0.1}/>;
      })}
      {/* Bright featured stars */}
      {[[25,15],[75,8],[15,35],[85,42],[50,25],[60,70],[30,80]].slice(0, mini ? 4 : 7).map(([cx,cy], i) => (
        <g key={i}>
          <circle cx={`${cx}%`} cy={`${cy}%`} r={mini ? 1.5 : 3} fill={colors.accent} opacity="0.9"/>
          <line x1={`${cx - 1.5}%`} y1={`${cy}%`} x2={`${cx + 1.5}%`} y2={`${cy}%`} stroke={colors.accent} strokeWidth={mini ? 0.5 : 1} opacity="0.6"/>
          <line x1={`${cx}%`} y1={`${cy - 1.5}%`} x2={`${cx}%`} y2={`${cy + 1.5}%`} stroke={colors.accent} strokeWidth={mini ? 0.5 : 1} opacity="0.6"/>
        </g>
      ))}
    </svg>
    {/* Milky way band */}
    <div className="absolute" style={{ top: '20%', left: 0, right: 0, height: '25%', background: `linear-gradient(90deg, transparent, ${colors.primary}15, ${colors.highlight}10, ${colors.primary}12, transparent)`, filter: 'blur(15px)', transform: 'rotate(-8deg)' }}/>
    {/* Moon crescent */}
    {!mini && (
      <div className="absolute" style={{ top: '5%', right: '8%', width: '40px', height: '40px', borderRadius: '50%', boxShadow: `inset -10px -5px 0 0 ${colors.accent}`, opacity: 0.5 }}/>
    )}
    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 50% 60% at 50% 85%, ${colors.primary}22 0%, transparent 70%)` }}/>
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: SPRING FLORAL
───────────────────────────────────────────── */
const SpringFloralTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${colors.bg2} 0%, ${colors.bg1} 60%, ${colors.bg2}99 100%)` }}/>
    {/* Petal pattern */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.5 }}>
      <defs>
        <pattern id={`spring-${id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
          <ellipse cx="20" cy="8" rx="4" ry="7" fill={colors.primary} opacity="0.4" transform="rotate(0 20 20)"/>
          <ellipse cx="32" cy="20" rx="4" ry="7" fill={colors.highlight} opacity="0.3" transform="rotate(90 20 20)"/>
          <ellipse cx="20" cy="32" rx="4" ry="7" fill={colors.primary} opacity="0.4" transform="rotate(180 20 20)"/>
          <ellipse cx="8" cy="20" rx="4" ry="7" fill={colors.highlight} opacity="0.3" transform="rotate(270 20 20)"/>
          <circle cx="20" cy="20" r="3" fill={colors.accent} opacity="0.8"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#spring-${id})`}/>
    </svg>
    {/* Bright overlay wash */}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(145deg, rgba(255,255,255,0.5) 0%, transparent 50%, rgba(255,255,255,0.3) 100%)' }}/>
    {/* Central glow */}
    <div className="absolute" style={{ top: '20%', left: '15%', width: '70%', height: '50%', background: `radial-gradient(ellipse, rgba(255,255,255,0.4) 0%, transparent 100%)`, filter: 'blur(20px)' }}/>
    {/* Dewdrops */}
    {!mini && [[20,30],[55,15],[80,40],[15,65],[60,75],[85,60]].map(([x,y], i) => (
      <div key={i} className="absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: '5px', height: '5px', background: `radial-gradient(circle, rgba(255,255,255,0.9) 0%, ${colors.primary}44 100%)`, boxShadow: `0 0 4px rgba(255,255,255,0.8), 0 1px 2px rgba(0,0,0,0.1)` }}/>
    ))}
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: CARVED / ENGRAVED
───────────────────────────────────────────── */
const CarvedTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${colors.bg2} 0%, ${colors.bg1} 50%, ${colors.bg2}cc 100%)` }}/>
    {/* Stone texture */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.35 }}>
      <defs>
        <filter id={`stone-${id}`}>
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="4" result="noise"/>
          <feColorMatrix type="saturate" values="0" in="noise" result="grey"/>
          <feBlend in="SourceGraphic" in2="grey" mode="overlay"/>
        </filter>
        <pattern id={`carved-${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <rect width="30" height="30" fill={colors.bg1}/>
          <rect x="1" y="1" width="28" height="28" fill={colors.bg2} opacity="0.7"/>
          <line x1="0" y1="15" x2="30" y2="15" stroke={colors.primary} strokeWidth="0.3" opacity="0.3"/>
          <line x1="15" y1="0" x2="15" y2="30" stroke={colors.primary} strokeWidth="0.3" opacity="0.3"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#carved-${id})`}/>
    </svg>
    {/* Metallic sheen */}
    <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${colors.highlight}33 0%, transparent 40%, ${colors.highlight}22 100%)` }}/>
    {/* Carved border frame with bevel */}
    <div className="absolute inset-4" style={{ borderTop: `${mini?1:3}px solid ${colors.highlight}88`, borderLeft: `${mini?1:3}px solid ${colors.highlight}66`, borderBottom: `${mini?1:3}px solid ${colors.secondary}88`, borderRight: `${mini?1:3}px solid ${colors.secondary}66`, borderRadius: '4px' }}/>
    <div className="absolute inset-6" style={{ border: `${mini?0.5:1}px solid ${colors.primary}44`, borderRadius: '3px' }}/>
    {/* Engraved lines at top/bottom */}
    <div className="absolute top-8 left-6 right-6" style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${colors.primary}88, transparent)` }}/>
    <div className="absolute bottom-8 left-6 right-6" style={{ height: '1px', background: `linear-gradient(90deg, transparent, ${colors.primary}88, transparent)` }}/>
    {/* Jewel corner inlays */}
    {!mini && [[8,8],[92,8],[8,92],[92,92]].map(([x,y], i) => (
      <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', width: '12px', height: '12px', background: `radial-gradient(circle, ${colors.highlight} 0%, ${colors.primary} 100%)`, clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)', boxShadow: `0 0 6px ${colors.glow}` }}/>
    ))}
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: ENERGETIC / NEON
───────────────────────────────────────────── */
const EnergeticTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${colors.bg1} 0%, ${colors.bg2} 100%)` }}/>
    {/* Scan lines */}
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.12 }}>
      <defs>
        <pattern id={`scanlines-${id}`} x="0" y="0" width="4" height="4" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="4" y2="0" stroke={colors.primary} strokeWidth="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#scanlines-${id})`}/>
    </svg>
    {/* Neon glow rings */}
    {[60, 45, 30, 15].map((r, i) => (
      <div key={i} className="absolute rounded-full" style={{ left: `${50-r}%`, top: `${50-r*1.7}%`, width: `${r*2}%`, height: `${r*3.4}%`, border: `1px solid ${colors.primary}${i===0?'66':'33'}`, boxShadow: i===0 ? `0 0 15px ${colors.glow}44, inset 0 0 15px ${colors.glow}22` : 'none' }}/>
    ))}
    {/* Electric pulse lines */}
    <div className="absolute inset-0" style={{ background: `linear-gradient(0deg, ${colors.primary}22 0%, transparent 20%, transparent 80%, ${colors.primary}22 100%)` }}/>
    <div className="absolute inset-0" style={{ background: `linear-gradient(90deg, ${colors.primary}15 0%, transparent 15%, transparent 85%, ${colors.primary}15 100%)` }}/>
    {/* Corner sparks */}
    {!mini && [[5,5],[95,5],[5,95],[95,95]].map(([x,y], i) => (
      <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', width: '20px', height: '20px', background: 'none' }}>
        <div style={{ width: '100%', height: '100%', background: `radial-gradient(circle, ${colors.primary} 0%, transparent 70%)`, opacity: 0.6, animation: `sparklePoint ${1.2+i*0.3}s ease-in-out infinite`, animationDelay: `${i*0.4}s` }}/>
      </div>
    ))}
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: DRAMATIC
───────────────────────────────────────────── */
const DramaticTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 30%, ${colors.bg2} 0%, ${colors.bg1} 70%)` }}/>
    {/* Dramatic light rays */}
    <div className="absolute inset-0" style={{ background: `conic-gradient(from 180deg at 50% 0%, transparent 75deg, ${colors.primary}22 90deg, transparent 105deg, transparent 255deg, ${colors.primary}15 270deg, transparent 285deg)` }}/>
    {/* Thick border frame */}
    <div className="absolute inset-0" style={{ border: `${mini?2:5}px solid ${colors.primary}`, boxShadow: `inset 0 0 ${mini?15:40}px ${colors.glow}44, 0 0 ${mini?5:15}px ${colors.glow}33`, borderRadius: 'inherit' }}/>
    {/* Inner glow border */}
    <div className="absolute inset-3" style={{ border: `${mini?1:2}px solid ${colors.accent}55`, borderRadius: 'inherit' }}/>
    {/* Central radiance */}
    <div className="absolute" style={{ top: '10%', left: '15%', width: '70%', height: '40%', background: `radial-gradient(ellipse, ${colors.primary}18 0%, transparent 100%)`, filter: 'blur(20px)' }}/>
    {/* Corner flames/sparks */}
    {!mini && [[0,0],[100,0],[0,100],[100,100]].map(([x,y], i) => (
      <div key={i} className="absolute" style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%,-50%)', width: '30px', height: '30px', background: `radial-gradient(circle, ${colors.primary}cc 0%, transparent 70%)`, opacity: 0.8, animation: `sparklePoint ${1+i*0.25}s ease-in-out infinite`, animationDelay: `${i*0.5}s` }}/>
    ))}
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: ORNATE ISLAMIC
───────────────────────────────────────────── */
const OrnateTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <CrystalGlassyBg colors={colors} id={id * 100 + 2} mini={mini} />
    <svg className="absolute top-0 left-0 right-0 w-full" height={mini ? "50%" : "50%"}
      style={{ filter: `drop-shadow(0 0 ${mini ? 3 : 8}px ${colors.glow})`, opacity: 0.8 }}>
      <defs>
        <linearGradient id={`arch-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="25%" stopColor={colors.primary}/>
          <stop offset="50%" stopColor={colors.accent}/>
          <stop offset="75%" stopColor={colors.primary}/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <g fill="none" stroke={`url(#arch-${id})`} strokeWidth={mini ? "0.8" : "1.5"}>
        <path d="M 5% 5% C 5% 15%, 15% 5%, 15% 5%"/>
        <path d="M 85% 5% C 85% 15%, 95% 5%, 95% 5%"/>
        <path d="M 5% 40% C 5% 30%, 15% 40%, 15% 40%"/>
        <path d="M 85% 40% C 85% 30%, 95% 40%, 95% 40%"/>
      </g>
      <rect y="48%" width="100%" height={mini ? "1" : "2"} fill={`url(#arch-${id})`} opacity="0.7"/>
      <text x="50%" y={mini ? "35%" : "40%"} textAnchor="middle" fill={colors.accent} fontSize={mini ? "8" : "14"} fontFamily="serif" opacity="0.9">✦ ✦ ✦</text>
    </svg>
    <svg className="absolute bottom-0 left-0 right-0 w-full" height={mini ? "30%" : "28%"}
      style={{ filter: `drop-shadow(0 0 ${mini ? 2 : 6}px ${colors.glow})`, opacity: 0.75 }}>
      <defs>
        <linearGradient id={`arch2-${id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="transparent"/>
          <stop offset="25%" stopColor={colors.primary}/>
          <stop offset="50%" stopColor={colors.accent}/>
          <stop offset="75%" stopColor={colors.primary}/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
      </defs>
      <rect y="0" width="100%" height={mini ? "1" : "2"} fill={`url(#arch2-${id})`} opacity="0.8"/>
      <text x="50%" y="65%" textAnchor="middle" fill={colors.primary} fontSize={mini ? "7" : "13"} fontFamily="serif" opacity="0.8">☾ ★ ☽</text>
    </svg>
    <div className="absolute left-0 top-0 bottom-0" style={{ width: mini ? '3px' : '5px', background: `linear-gradient(180deg, transparent 0%, ${colors.primary}77 30%, ${colors.accent}55 50%, ${colors.primary}77 70%, transparent 100%)` }}/>
    <div className="absolute right-0 top-0 bottom-0" style={{ width: mini ? '3px' : '5px', background: `linear-gradient(180deg, transparent 0%, ${colors.primary}77 30%, ${colors.accent}55 50%, ${colors.primary}77 70%, transparent 100%)` }}/>
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: FLORAL GLASS
───────────────────────────────────────────── */
const FloralGlassTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <CrystalGlassyBg colors={colors} id={id * 100 + 1} mini={mini} />
    <svg className="absolute inset-0 w-full h-full" style={{ filter: `drop-shadow(0 0 ${mini ? 2 : 6}px ${colors.glow})`, opacity: 0.75 }}>
      <defs>
        <linearGradient id={`vine-${id}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={colors.primary}/>
          <stop offset="50%" stopColor={colors.highlight}/>
          <stop offset="100%" stopColor={colors.primary}/>
        </linearGradient>
      </defs>
      <g stroke={`url(#vine-${id})`} strokeWidth={mini ? "1" : "2"} fill="none">
        <path d="M 25% 95% C 28% 80% 20% 65% 35% 55% S 50% 35% 45% 15%" strokeWidth={mini ? "1.5" : "2.5"}/>
        <path d="M 55% 100% C 58% 82% 48% 68% 62% 58% S 70% 38% 65% 18%" strokeWidth={mini ? "1" : "2"}/>
        <ellipse cx="35%" cy="55%" rx={mini ? "3%" : "4%"} ry={mini ? "5%" : "6%"} fill={colors.primary} opacity="0.4" stroke={colors.highlight} strokeWidth="1"/>
        <ellipse cx="65%" cy="35%" rx={mini ? "3%" : "4%"} ry={mini ? "5%" : "6%"} fill={colors.secondary} opacity="0.3" stroke={colors.highlight} strokeWidth="1"/>
        {!mini && <>
          <ellipse cx="45%" cy="72%" rx="3%" ry="5%" fill={colors.primary} opacity="0.35" stroke={colors.highlight} strokeWidth="1"/>
          <circle cx="38%" cy="28%" r="4%" fill={colors.primary} opacity="0.3" stroke={colors.accent} strokeWidth="1.5"/>
          <circle cx="68%" cy="58%" r="3%" fill={colors.secondary} opacity="0.4" stroke={colors.accent} strokeWidth="1"/>
        </>}
      </g>
    </svg>
    <div className="absolute top-3 left-3" style={{ zIndex: 5 }}>
      <div style={{ width: mini ? 18 : 40, height: mini ? 22 : 46, background: `linear-gradient(145deg, ${colors.highlight}, ${colors.primary}, ${colors.secondary})`, clipPath: 'polygon(50% 0%, 100% 22%, 100% 72%, 50% 100%, 0% 72%, 0% 22%)', boxShadow: `0 0 ${mini ? 6 : 16}px ${colors.glow}, 0 0 ${mini ? 3 : 8}px rgba(255,255,255,0.4)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: mini ? 10 : 22, height: mini ? 12 : 26, background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,255,255,0.5))', clipPath: 'polygon(50% 0%, 100% 22%, 100% 72%, 50% 100%, 0% 72%, 0% 22%)' }}/>
      </div>
    </div>
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: MOSAIC FINE
───────────────────────────────────────────── */
const MosaicFineTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => {
  const tileSize = mini ? 8 : 14;
  return (
    <>
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.85 }}>
        <defs>
          <pattern id={`mosaic-fine-${id}`} x="0" y="0" width={tileSize} height={tileSize} patternUnits="userSpaceOnUse">
            <rect width={tileSize/2-0.5} height={tileSize/2-0.5} fill={colors.primary} opacity="0.9"/>
            <rect x={tileSize/2+0.5} y="0" width={tileSize/2-0.5} height={tileSize/2-0.5} fill={colors.secondary} opacity="0.7"/>
            <rect x="0" y={tileSize/2+0.5} width={tileSize/2-0.5} height={tileSize/2-0.5} fill={colors.highlight} opacity="0.5"/>
            <rect x={tileSize/2+0.5} y={tileSize/2+0.5} width={tileSize/2-0.5} height={tileSize/2-0.5} fill={colors.bg2} opacity="0.8"/>
          </pattern>
          <radialGradient id={`mosaic-glow-${id}`} cx="50%" cy="40%" r="55%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.15)"/>
            <stop offset="100%" stopColor={colors.bg1} stopOpacity="0.5"/>
          </radialGradient>
          <radialGradient id={`mosaic-vig-${id}`} cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent"/>
            <stop offset="100%" stopColor={colors.bg1} stopOpacity="0.8"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill={`url(#mosaic-fine-${id})`}/>
        <rect width="100%" height="100%" fill={`url(#mosaic-glow-${id})`}/>
        <rect width="100%" height="100%" fill={`url(#mosaic-vig-${id})`}/>
      </svg>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.14) 0%, transparent 40%, rgba(255,255,255,0.06) 100%)' }}/>
      {!mini && [[20,15],[45,8],[70,20],[30,50],[60,45],[80,70],[15,75],[50,80],[85,30]].map(([x,y], i) => (
        <div key={i} className="absolute rounded-full" style={{ left: `${x}%`, top: `${y}%`, width: '3px', height: '3px', background: 'white', boxShadow: `0 0 6px rgba(255,255,255,0.9), 0 0 12px ${colors.glow}`, animation: `sparklePoint ${1.8+i*0.3}s ease-in-out infinite`, animationDelay: `${i*0.2}s` }}/>
      ))}
    </>
  );
};

/* ─────────────────────────────────────────────
   TEXTURE: GEOMETRIC
───────────────────────────────────────────── */
const GeometricTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean }> = ({ colors, id, mini }) => (
  <>
    <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 50% 50%, ${colors.bg2} 0%, ${colors.bg1} 100%)` }}/>
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.7 }}>
      <defs>
        <pattern id={`geo-${id}`} x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
          <polygon points="15,2 28,9 28,21 15,28 2,21 2,9" fill="none" stroke={colors.primary} strokeWidth="0.5" opacity="0.8"/>
          <circle cx="15" cy="15" r="4" fill="none" stroke={colors.accent} strokeWidth="0.4" opacity="0.6"/>
          <line x1="15" y1="2" x2="15" y2="28" stroke={colors.highlight} strokeWidth="0.3" opacity="0.4"/>
        </pattern>
        <radialGradient id={`geo-center-${id}`} cx="50%" cy="50%" r="40%">
          <stop offset="0%" stopColor={colors.primary} stopOpacity="0.15"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#geo-${id})`}/>
      <rect width="100%" height="100%" fill={`url(#geo-center-${id})`}/>
    </svg>
    {[42,34,24,14].map((r, i) => (
      <div key={i} className="absolute rounded-full" style={{ left: `${50-r}%`, top: `${50-r*1.5}%`, width: `${r*2}%`, height: `${r*3}%`, border: `1px solid ${colors.primary}${i%2===0?'55':'33'}`, boxShadow: i===0 ? `0 0 20px ${colors.glow}22` : 'none' }}/>
    ))}
    <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)' }}/>
  </>
);

/* ─────────────────────────────────────────────
   TEXTURE: ASMAUL HUSNA
───────────────────────────────────────────── */
const AsmaulHusnaTexture: React.FC<{ colors: ColorConfig; id: number; mini: boolean; isLight?: boolean }> = ({ colors, id, mini, isLight }) => (
  <>
    <div className="absolute inset-0" style={{ background: `linear-gradient(160deg, ${colors.bg2} 0%, ${colors.bg1} 45%, ${colors.bg2}99 100%)` }}/>
    <svg className="absolute inset-0 w-full h-full" style={{ opacity: isLight ? 0.15 : 0.2 }}>
      <defs>
        <pattern id={`asma-fine-${id}`} x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
          <circle cx="8" cy="8" r="0.8" fill={colors.accent} opacity="0.9"/>
          <line x1="0" y1="8" x2="16" y2="8" stroke={colors.primary} strokeWidth="0.3" opacity="0.5"/>
          <line x1="8" y1="0" x2="8" y2="16" stroke={colors.primary} strokeWidth="0.3" opacity="0.5"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#asma-fine-${id})`}/>
    </svg>
    <div className="absolute inset-2 pointer-events-none" style={{ border: `${mini?1:2}px solid ${colors.primary}55`, borderRadius: '4px', boxShadow: `inset 0 0 ${mini?8:20}px ${colors.glow}22` }}/>
    <div className="absolute inset-4 pointer-events-none" style={{ border: `${mini?0.5:1}px solid ${colors.accent}33`, borderRadius: '2px' }}/>
    {[['3%','3%'],['97%','3%'],['3%','97%'],['97%','97%']].map(([l,t], i) => (
      <div key={i} className="absolute" style={{ left: l, top: t, transform: 'translate(-50%,-50%)', width: mini?'5px':'10px', height: mini?'5px':'10px', borderRadius: '50%', background: `radial-gradient(circle, ${colors.accent} 0%, ${colors.primary} 100%)`, boxShadow: `0 0 ${mini?4:8}px ${colors.glow}` }}/>
    ))}
    <div className="absolute inset-0 pointer-events-none" style={{ background: isLight ? 'linear-gradient(135deg, rgba(255,255,255,0.4) 0%, transparent 50%, rgba(255,255,255,0.2) 100%)' : 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 45%, rgba(255,255,255,0.04) 100%)' }}/>
    <div className="absolute top-0 left-0 right-0" style={{ height: mini?'20%':'15%', background: `linear-gradient(90deg, transparent, ${colors.primary}55, ${colors.accent}33, ${colors.primary}55, transparent)`, borderBottom: `1px solid ${colors.primary}44` }}/>
    <div className="absolute bottom-0 left-0 right-0" style={{ height: mini?'18%':'12%', background: `linear-gradient(90deg, transparent, ${colors.primary}44, ${colors.accent}22, ${colors.primary}44, transparent)`, borderTop: `1px solid ${colors.primary}33` }}/>
  </>
);

/* ─────────────────────────────────────────────
   TEXT ANIMATION STYLES
───────────────────────────────────────────── */
const getTextAnimStyle = (animType: string, colors: ColorConfig, mini: boolean): React.CSSProperties => {
  if (mini) return {};
  switch (animType) {
    case 'digital-run':
      return { animation: 'digitalRun 0.1s steps(2) infinite', textShadow: `0 0 10px ${colors.glow}, 0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}` };
    case 'electric':
      return { animation: 'electricFlicker 0.15s steps(1) infinite', textShadow: `0 0 15px ${colors.glow}, 0 0 30px ${colors.glow}, 2px 2px 0px ${colors.secondary}` };
    case 'neon-flicker':
      return { animation: 'neonFlicker 1.5s ease-in-out infinite', textShadow: `0 0 10px ${colors.glow}, 0 0 25px ${colors.glow}, 0 0 50px ${colors.glow}` };
    case 'fire':
      return { animation: 'fireWaver 0.5s ease-in-out infinite alternate', textShadow: `0 0 10px #ff4400, 0 0 20px #ff6600, 0 0 40px #ffaa00` };
    case 'dramatic-flash':
      return { animation: 'dramaticFlash 2s ease-in-out infinite', textShadow: `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}` };
    case 'rainbow':
      return { animation: 'rainbowText 3s linear infinite', backgroundSize: '200%', textShadow: '0 0 15px rgba(255,255,255,0.5)' };
    case 'matrix':
      return { animation: 'matrixGlow 0.8s steps(3) infinite', textShadow: `0 0 10px ${colors.glow}, 0 0 20px ${colors.glow}, 0 5px 15px ${colors.primary}` };
    case 'wave':
      return { animation: 'waveScale 2s ease-in-out infinite', textShadow: `0 0 20px ${colors.glow}` };
    case 'ice-crystal':
      return { animation: 'icePulse 3s ease-in-out infinite', textShadow: `0 0 15px rgba(180,230,255,0.8), 0 0 30px rgba(140,200,255,0.6)` };
    default:
      return {};
  }
};

/* ─────────────────────────────────────────────
   TEXT OVERLAY
───────────────────────────────────────────── */
const TextOverlay: React.FC<{ text: OverlayText; colors: ColorConfig; mini: boolean; template: Template }> = ({ text, colors, mini, template }) => {
  if (!text.main && !text.sub) return null;
  const fontFamily = fontFamilyMap[template.fontFamily || 'amiri'] || fontFamilyMap['amiri'];
  const animStyle = getTextAnimStyle(template.animationType, colors, mini);
  const isRainbow = template.animationType === 'rainbow' && !mini;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center z-20 pointer-events-none">
      {text.main && (
        <div style={{
          fontSize: mini ? '14px' : '42px',
          fontWeight: '900',
          color: isRainbow ? 'transparent' : colors.text,
          background: isRainbow ? 'linear-gradient(90deg, #ff0000, #ff7700, #ffff00, #00ff00, #0000ff, #8800ff, #ff0000)' : 'none',
          WebkitBackgroundClip: isRainbow ? 'text' : 'initial',
          WebkitTextFillColor: isRainbow ? 'transparent' : 'initial',
          backgroundClip: isRainbow ? 'text' : 'initial',
          textShadow: !isRainbow ? `0 0 20px ${colors.glow}, 0 0 40px ${colors.glow}88, 0 3px 6px rgba(0,0,0,0.9)` : 'none',
          direction: 'rtl',
          lineHeight: 1.3,
          letterSpacing: mini ? '0' : '2px',
          marginBottom: mini ? '2px' : '10px',
          wordBreak: 'break-word',
          fontFamily,
          ...animStyle,
        }}>
          {text.main}
        </div>
      )}
      {text.sub && !mini && (
        <div style={{
          fontSize: '14px',
          color: colors.accent,
          textShadow: `0 0 10px ${colors.glow}66`,
          direction: 'rtl',
          letterSpacing: '1px',
          opacity: 0.92,
          wordBreak: 'break-word',
          fontFamily,
        }}>
          {text.sub}
        </div>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   MAIN RENDERER
───────────────────────────────────────────── */
const TemplateRenderer: React.FC<Props> = ({ template, mini = false, className = '', overlayText }) => {
  const colors = colorConfigs[template.colorScheme] || colorConfigs['crimson-gold'];

  const renderTexture = () => {
    switch (template.category) {
      case 'milky-white': return <MilkyWhiteTexture colors={colors} id={template.id} mini={mini} />;
      case 'light-bright': return <LightBrightTexture colors={colors} id={template.id} mini={mini} />;
      case 'spring': return <SpringFloralTexture colors={colors} id={template.id} mini={mini} />;
      case 'starry': return <StarryNightTexture colors={colors} id={template.id} mini={mini} />;
      case 'embroidery': return <EmbroideryTexture colors={colors} id={template.id} mini={mini} />;
      case 'carved': return <CarvedTexture colors={colors} id={template.id} mini={mini} />;
      case 'energetic': return <EnergeticTexture colors={colors} id={template.id} mini={mini} />;
      case 'dramatic': return <DramaticTexture colors={colors} id={template.id} mini={mini} />;
      case 'floral-glass': return <FloralGlassTexture colors={colors} id={template.id} mini={mini} />;
      case 'mosaic': return <MosaicFineTexture colors={colors} id={template.id} mini={mini} />;
      case 'crystal': return <MilkyWhiteTexture colors={{ ...colors, bg1: colors.bg2, bg2: colors.bg1 }} id={template.id} mini={mini} />;
      case 'ornate': return <OrnateTexture colors={colors} id={template.id} mini={mini} />;
      case 'geometric': return <GeometricTexture colors={colors} id={template.id} mini={mini} />;
      case 'asmaul-husna': return <AsmaulHusnaTexture colors={colors} id={template.id} mini={mini} isLight={template.isLight} />;
      case 'calligraphy':
      default: return <OrnateTexture colors={colors} id={template.id} mini={mini} />;
    }
  };

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        aspectRatio: '9/16',
        borderRadius: mini ? '6px' : '16px',
        boxShadow: mini
          ? `0 2px 10px ${colors.glow}55`
          : `0 0 50px ${colors.glow}44, 0 0 100px ${colors.glow}18, 0 12px 40px rgba(0,0,0,0.7)`,
      }}
    >
      {renderTexture()}
      {overlayText && <TextOverlay text={overlayText} colors={colors} mini={mini} template={template} />}
      <div className="absolute top-0 left-0 right-0 pointer-events-none" style={{
        height: '35%',
        background: colors.isLight
          ? 'linear-gradient(180deg, rgba(255,255,255,0.25) 0%, transparent 100%)'
          : 'linear-gradient(180deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.03) 60%, transparent 100%)',
        borderRadius: 'inherit',
      }}/>
    </div>
  );
};

export default TemplateRenderer;
