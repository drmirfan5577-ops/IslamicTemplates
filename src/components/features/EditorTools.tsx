import React, { useState, useRef, useCallback, useEffect } from 'react';
import { Mic, MicOff, Upload, Download, Heart, Share2, Cloud, CloudOff, Layers, Trash2, Eye, EyeOff, Lock, Unlock, ChevronUp, ChevronDown, Plus } from 'lucide-react';
import { Layer } from '@/types/editor';
import { supabase, uploadToStorage } from '@/lib/supabase';
import { toast } from 'sonner';

// ─── VOICE INPUT ───
export const VoiceInput: React.FC<{ onResult: (text: string) => void; lang?: string }> = ({ onResult, lang = 'ar-SA' }) => {
  const [listening, setListening] = useState(false);
  const recRef = useRef<SpeechRecognition | null>(null);

  const toggle = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('آپ کا براؤزر وائس ان پٹ سپورٹ نہیں کرتا'); return;
    }
    if (listening) { recRef.current?.stop(); setListening(false); return; }
    const Rec = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const rec = new Rec();
    rec.lang = lang; rec.interimResults = false; rec.maxAlternatives = 1;
    rec.onresult = (e: SpeechRecognitionEvent) => { onResult(e.results[0][0].transcript); setListening(false); };
    rec.onerror = () => setListening(false);
    rec.onend = () => setListening(false);
    rec.start(); recRef.current = rec; setListening(true);
  };

  return (
    <button onClick={toggle} title="وائس ان پٹ"
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${listening ? 'bg-red-100 text-red-500 animate-pulse' : 'bg-amber-50 text-amber-600 hover:bg-amber-100'}`}>
      {listening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
    </button>
  );
};

// ─── DOWNLOAD TEMPLATE ───
export const DownloadBtn: React.FC<{ canvasRef: React.RefObject<HTMLDivElement>; filename?: string }> = ({ canvasRef, filename = 'template' }) => {
  const [loading, setLoading] = useState(false);

  const download = async () => {
    if (!canvasRef.current) return;
    setLoading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(canvasRef.current, { scale: 3, useCORS: true, allowTaint: true, backgroundColor: null, logging: false });
      const link = document.createElement('a');
      link.download = `${filename}-${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png', 1.0);
      link.click();
      toast.success('ٹیمپلیٹ ڈاؤنلوڈ ہو گیا');
    } catch (e) {
      toast.error('ڈاؤنلوڈ میں خرابی');
    }
    setLoading(false);
  };

  return (
    <button onClick={download} disabled={loading} title="ڈاؤنلوڈ"
      className="w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all disabled:opacity-50">
      <Download className={`w-4 h-4 ${loading ? 'animate-bounce' : ''}`} />
    </button>
  );
};

// ─── FAVORITES ───
const FAV_KEY = 'islamic_template_favs';

export function useFavorites() {
  const [favs, setFavs] = useState<number[]>(() => {
    try { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); } catch { return []; }
  });

  const toggle = useCallback((id: number) => {
    setFavs(prev => {
      const next = prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id];
      localStorage.setItem(FAV_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  return { favs, toggle, isFav: (id: number) => favs.includes(id) };
}

export const FavBtn: React.FC<{ id: number; isFav: boolean; onToggle: () => void }> = ({ id, isFav, onToggle }) => (
  <button onClick={onToggle} title={isFav ? 'پسندیدہ سے ہٹائیں' : 'پسندیدہ میں شامل کریں'}
    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${isFav ? 'bg-red-50 text-red-500' : 'bg-gray-50 text-gray-400 hover:text-red-400'}`}>
    <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
  </button>
);

// ─── SHARE TO WHATSAPP ───
export const ShareBtn: React.FC<{ text?: string; canvasRef?: React.RefObject<HTMLDivElement> }> = ({ text = 'اسلامی ڈیجیٹل ٹیمپلیٹ', canvasRef }) => {
  const share = async () => {
    if (navigator.share && canvasRef?.current) {
      try {
        const html2canvas = (await import('html2canvas')).default;
        const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true, backgroundColor: null });
        canvas.toBlob(async (blob) => {
          if (!blob) return;
          const file = new File([blob], 'template.png', { type: 'image/png' });
          if (navigator.canShare?.({ files: [file] })) {
            await navigator.share({ files: [file], title: 'اسلامی ٹیمپلیٹ', text });
            return;
          }
          const wa = `https://wa.me/?text=${encodeURIComponent(text + '\n' + window.location.href)}`;
          window.open(wa, '_blank');
        }, 'image/png');
        return;
      } catch {}
    }
    const wa = `https://wa.me/?text=${encodeURIComponent(text + '\n' + window.location.href)}`;
    window.open(wa, '_blank');
  };

  return (
    <button onClick={share} title="شیئر کریں"
      className="w-8 h-8 rounded-full flex items-center justify-center bg-green-50 text-green-600 hover:bg-green-100 transition-all">
      <Share2 className="w-4 h-4" />
    </button>
  );
};

// ─── CLOUD UPLOAD ───
export const CloudUploadBtn: React.FC<{ canvasRef: React.RefObject<HTMLDivElement>; onUploaded?: (url: string) => void }> = ({ canvasRef, onUploaded }) => {
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const upload = async () => {
    if (!canvasRef.current) return;
    setLoading(true);
    try {
      const html2canvas = (await import('html2canvas')).default;
      const canvas = await html2canvas(canvasRef.current, { scale: 2, useCORS: true, backgroundColor: null, logging: false });
      const blob = await new Promise<Blob | null>((res) => canvas.toBlob(res, 'image/png', 0.92));
      if (!blob) throw new Error('No blob');
      const path = `templates/${Date.now()}.png`;
      const url = await uploadToStorage('templates', path, blob);
      if (url) { setUploaded(true); onUploaded?.(url); toast.success('کلاؤڈ پر محفوظ ہو گیا'); }
      else toast.error('کلاؤڈ اپلوڈ میں خرابی');
    } catch (e) {
      toast.error('کلاؤڈ اپلوڈ میں خرابی');
    }
    setLoading(false);
  };

  return (
    <button onClick={upload} disabled={loading} title="کلاؤڈ پر محفوظ کریں"
      className={`w-8 h-8 rounded-full flex items-center justify-center transition-all disabled:opacity-50 ${uploaded ? 'bg-blue-50 text-blue-600' : 'bg-sky-50 text-sky-600 hover:bg-sky-100'}`}>
      {loading ? <Cloud className="w-4 h-4 animate-pulse" /> : uploaded ? <Cloud className="w-4 h-4 fill-current" /> : <Cloud className="w-4 h-4" />}
    </button>
  );
};

// ─── LAYERS PANEL ───
export const LayersPanel: React.FC<{
  layers: Layer[];
  selectedLayerId: string | null;
  onSelect: (id: string) => void;
  onToggleVisible: (id: string) => void;
  onToggleLock: (id: string) => void;
  onDelete: (id: string) => void;
  onReorder: (fromIdx: number, toIdx: number) => void;
}> = ({ layers, selectedLayerId, onSelect, onToggleVisible, onToggleLock, onDelete, onReorder }) => {
  const sorted = [...layers].sort((a, b) => b.zIndex - a.zIndex);

  return (
    <div className="flex flex-col gap-0.5 px-1">
      {sorted.map((layer, idx) => (
        <div key={layer.id} onClick={() => onSelect(layer.id)}
          className={`flex items-center gap-1.5 px-2 py-1.5 rounded-lg cursor-pointer transition-all ${selectedLayerId === layer.id ? 'bg-amber-50 border border-amber-200' : 'hover:bg-gray-50'}`}>
          <div className="flex flex-col gap-0">
            <button onClick={e => { e.stopPropagation(); onReorder(idx, idx - 1); }} className="w-4 h-3 flex items-center justify-center hover:text-amber-600 text-gray-300 transition-colors">
              <ChevronUp className="w-3 h-3" />
            </button>
            <button onClick={e => { e.stopPropagation(); onReorder(idx, idx + 1); }} className="w-4 h-3 flex items-center justify-center hover:text-amber-600 text-gray-300 transition-colors">
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-gray-700 truncate">{layer.name}</p>
            <p className="text-xs text-gray-400 capitalize">{layer.type}</p>
          </div>
          <div className="flex items-center gap-1">
            <button onClick={e => { e.stopPropagation(); onToggleVisible(layer.id); }}
              className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${layer.visible ? 'text-gray-500' : 'text-gray-200'}`}>
              {layer.visible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
            </button>
            <button onClick={e => { e.stopPropagation(); onToggleLock(layer.id); }}
              className={`w-5 h-5 flex items-center justify-center rounded transition-colors ${layer.locked ? 'text-amber-500' : 'text-gray-300'}`}>
              {layer.locked ? <Lock className="w-3 h-3" /> : <Unlock className="w-3 h-3" />}
            </button>
            <button onClick={e => { e.stopPropagation(); onDelete(layer.id); }}
              className="w-5 h-5 flex items-center justify-center rounded text-gray-300 hover:text-red-400 transition-colors">
              <Trash2 className="w-3 h-3" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

// ─── IMAGE IMPORTER ───
export const ImageImporter: React.FC<{ onImport: (files: File[]) => void; sectionId: string }> = ({ onImport, sectionId }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFiles = async (files: FileList | null) => {
    if (!files || !files.length) return;
    setUploading(true);
    const arr = Array.from(files).slice(0, 100);
    for (let i = 0; i < arr.length; i++) {
      const file = arr[i];
      if (file.size > 10 * 1024 * 1024) continue; // Skip >10MB
      const path = `${sectionId}/${Date.now()}-${i}-${file.name.replace(/\s/g, '_')}`;
      await uploadToStorage('templates', path, file);
      setProgress(Math.round(((i + 1) / arr.length) * 100));
    }
    onImport(arr);
    setUploading(false);
    setProgress(0);
    toast.success(`${arr.length} فائلیں امپورٹ ہو گئیں`);
  };

  return (
    <div>
      <button onClick={() => fileRef.current?.click()}
        className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 w-full justify-center"
        style={{ background: 'linear-gradient(135deg, #d4af37, #b8960c)', color: 'white', boxShadow: '0 2px 12px rgba(212,175,55,0.3)' }}>
        <Plus className="w-4 h-4" />
        امیجز امپورٹ (100+)
      </button>
      {uploading && (
        <div className="mt-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>اپلوڈ ہو رہا ہے...</span><span>{progress}%</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-gray-100 overflow-hidden">
            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg, #d4af37, #b8960c)' }}/>
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*,video/mp4" multiple className="hidden"
        onChange={e => handleFiles(e.target.files)} />
    </div>
  );
};
