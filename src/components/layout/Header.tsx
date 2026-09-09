import React from 'react';
import { Sparkles, Star } from 'lucide-react';
import { categories } from '@/data/templates';

interface Props {
  activeCategory: string;
  onCategoryChange: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  totalCount: number;
}

const Header: React.FC<Props> = ({ activeCategory, onCategoryChange, searchQuery, onSearchChange, totalCount }) => {
  return (
    <header className="sticky top-0 z-40 w-full" style={{
      background: 'linear-gradient(180deg, #0a0000 0%, #0a0000ee 80%, transparent 100%)',
      backdropFilter: 'blur(16px)',
    }}>
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{
            background: 'linear-gradient(135deg, #c41e3a, #ffd700)',
            boxShadow: '0 0 15px rgba(196,30,58,0.6)',
          }}>
            <Star className="w-4 h-4 text-white" fill="white" />
          </div>
          <div>
            <h1 className="text-sm font-bold leading-tight" style={{
              background: 'linear-gradient(90deg, #ffd700, #c41e3a, #ffd700)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              اسلامی ڈیجیٹل ٹیمپلیٹس
            </h1>
            <p className="text-xs text-slate-500">Islamic Digital Templates</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400" />
          <span className="text-xs text-yellow-400 font-semibold">{totalCount} Templates</span>
        </div>
      </div>

      {/* Search bar */}
      <div className="px-4 pb-2">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={e => onSearchChange(e.target.value)}
            placeholder="تلاش کریں... Search templates..."
            className="w-full text-sm py-2 pl-4 pr-10 rounded-full outline-none"
            style={{
              background: 'rgba(255,255,255,0.07)',
              border: '1px solid rgba(255,215,0,0.2)',
              color: '#e2e8f0',
              direction: 'rtl',
            }}
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* Category filter */}
      <div className="flex gap-2 px-4 pb-3 overflow-x-auto scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => onCategoryChange(cat.id)}
            className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
            style={activeCategory === cat.id ? {
              background: 'linear-gradient(135deg, #c41e3a, #8b0000)',
              color: '#ffd700',
              boxShadow: '0 0 12px rgba(196,30,58,0.5)',
              border: '1px solid rgba(255,215,0,0.3)',
            } : {
              background: 'rgba(255,255,255,0.07)',
              color: '#94a3b8',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <span>{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Divider glow */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(196,30,58,0.4), rgba(255,215,0,0.3), rgba(196,30,58,0.4), transparent)',
      }}/>
    </header>
  );
};

export default Header;
