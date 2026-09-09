import React, { useState, useCallback, useRef } from 'react';
import { X, Plus, FolderPlus, Image, Video, Trash2, Edit3, RefreshCw, Download, Move, Grid, List, Upload, ChevronRight, ChevronDown, Check, AlertCircle } from 'lucide-react';
import { MediaSection, ImportedMedia } from '@/types/template';

interface Props { onClose: () => void; }

const AdminMediaManager: React.FC<Props> = ({ onClose }) => {
  const [sections, setSections] = useState<MediaSection[]>([
    { id: 'default', name: 'عمومی کلیکشن', items: [], createdAt: Date.now() },
    { id: 'templates', name: 'ٹیمپلیٹس', items: [], createdAt: Date.now() },
    { id: 'slides', name: 'سلائیڈز', items: [], createdAt: Date.now() },
    { id: 'videos', name: 'ویڈیوز', items: [], createdAt: Date.now() },
  ]);
  const [activeSectionId, setActiveSectionId] = useState('default');
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['default']));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [newSectionName, setNewSectionName] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedItems, setSelectedItems] = useState<Set<string>>(new Set());
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [editSectionName, setEditSectionName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);

  const activeSection = sections.find(s => s.id === activeSectionId);

  const handleFileImport = useCallback(async (files: FileList | null, type: 'image' | 'video') => {
    if (!files || files.length === 0) return;
    setUploading(true);
    setUploadProgress(0);
    const newItems: ImportedMedia[] = [];
    const total = files.length;
    for (let i = 0; i < Math.min(total, 100); i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newItems.push({ id: `${Date.now()}-${i}`, name: file.name, type, url, size: file.size, section: activeSectionId, addedAt: Date.now() });
      setUploadProgress(Math.round(((i + 1) / Math.min(total, 100)) * 100));
      await new Promise(r => setTimeout(r, 20));
    }
    setSections(prev => prev.map(s => s.id === activeSectionId ? { ...s, items: [...s.items, ...newItems] } : s));
    setUploading(false);
    setUploadProgress(0);
  }, [activeSectionId]);

  const handleDeleteSelected = () => {
    setSections(prev => prev.map(s => s.id === activeSectionId
      ? { ...s, items: s.items.filter(item => !selectedItems.has(item.id)) } : s));
    setSelectedItems(new Set());
  };

  const handleAddSection = () => {
    if (!newSectionName.trim()) return;
    const newSection: MediaSection = { id: `sec-${Date.now()}`, name: newSectionName.trim(), items: [], createdAt: Date.now() };
    setSections(prev => [...prev, newSection]);
    setActiveSectionId(newSection.id);
    setExpandedSections(prev => new Set([...prev, newSection.id]));
    setNewSectionName('');
    setShowAddSection(false);
  };

  const handleDeleteSection = (sectionId: string) => {
    if (sectionId === 'default') return;
    setSections(prev => prev.filter(s => s.id !== sectionId));
    if (activeSectionId === sectionId) setActiveSectionId('default');
  };

  const handleMoveItem = (itemId: string, targetSectionId: string) => {
    let movedItem: ImportedMedia | null = null;
    setSections(prev => prev.map(s => {
      const item = s.items.find(i => i.id === itemId);
      if (item) { movedItem = { ...item, section: targetSectionId }; return { ...s, items: s.items.filter(i => i.id !== itemId) }; }
      return s;
    }));
    if (movedItem) {
      setSections(prev => prev.map(s => s.id === targetSectionId ? { ...s, items: [...s.items, movedItem!] } : s));
    }
  };

  const toggleItemSelection = (id: string) => {
    setSelectedItems(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };

  const formatSize = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)}KB` : `${(bytes / 1024 / 1024).toFixed(1)}MB`;

  return (
    <div className="flex h-full">
      {/* Sidebar - Section List */}
      <div className="w-56 flex-shrink-0 flex flex-col" style={{ borderRight: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.3)' }}>
        <div className="px-3 py-3 flex items-center justify-between" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <span className="text-xs font-semibold text-slate-300">سیکشنز</span>
          <button onClick={() => setShowAddSection(!showAddSection)} className="w-6 h-6 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
            <Plus className="w-4 h-4 text-yellow-400" />
          </button>
        </div>
        {showAddSection && (
          <div className="px-3 py-2 flex gap-1" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <input value={newSectionName} onChange={e => setNewSectionName(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAddSection()}
              placeholder="نیا سیکشن..." className="flex-1 text-xs rounded px-2 py-1 outline-none"
              style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', color: 'white', direction: 'rtl' }} autoFocus/>
            <button onClick={handleAddSection} className="w-6 h-6 rounded flex items-center justify-center" style={{ background: '#c41e3a' }}>
              <Check className="w-3 h-3 text-white" />
            </button>
          </div>
        )}
        <div className="flex-1 overflow-y-auto py-1">
          {sections.map(section => (
            <div key={section.id}>
              <button onClick={() => { setActiveSectionId(section.id); setExpandedSections(prev => { const n = new Set(prev); n.has(section.id) ? n.delete(section.id) : n.add(section.id); return n; }); }}
                className="w-full flex items-center gap-2 px-3 py-2 text-left transition-all duration-150 group"
                style={{ background: activeSectionId === section.id ? 'rgba(196,30,58,0.2)' : 'transparent', borderLeft: activeSectionId === section.id ? '2px solid #c41e3a' : '2px solid transparent' }}>
                {expandedSections.has(section.id) ? <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" /> : <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />}
                {editingSection === section.id ? (
                  <input value={editSectionName} onChange={e => setEditSectionName(e.target.value)}
                    onKeyDown={e => { if (e.key === 'Enter') { setSections(prev => prev.map(s => s.id === section.id ? { ...s, name: editSectionName } : s)); setEditingSection(null); } }}
                    onBlur={() => setEditingSection(null)} className="flex-1 text-xs bg-transparent outline-none text-white" autoFocus onClick={e => e.stopPropagation()}/>
                ) : (
                  <span className="flex-1 text-xs text-slate-200 truncate" style={{ direction: 'rtl' }}>{section.name}</span>
                )}
                <span className="text-xs text-slate-500">{section.items.length}</span>
                {section.id !== 'default' && (
                  <button onClick={e => { e.stopPropagation(); handleDeleteSection(section.id); }} className="opacity-0 group-hover:opacity-100 transition-opacity">
                    <Trash2 className="w-3 h-3 text-red-400" />
                  </button>
                )}
              </button>
            </div>
          ))}
        </div>
        <div className="px-3 py-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs text-slate-500">کل آئٹمز: {sections.reduce((a, s) => a + s.items.length, 0)}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Toolbar */}
        <div className="flex items-center gap-2 px-4 py-2 flex-wrap" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(0,0,0,0.2)' }}>
          <h3 className="text-sm font-semibold text-white flex-shrink-0" style={{ direction: 'rtl' }}>{activeSection?.name}</h3>
          <div className="flex-1"/>
          {/* Upload buttons */}
          <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
            style={{ background: 'linear-gradient(135deg, #c41e3a, #8b0000)', color: '#ffd700', border: '1px solid rgba(255,215,0,0.2)' }}>
            <Image className="w-3 h-3" />
            امیجز امپورٹ (100+)
          </button>
          <button onClick={() => videoInputRef.current?.click()} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:scale-105"
            style={{ background: 'rgba(255,255,255,0.08)', color: '#94a3b8', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Video className="w-3 h-3" />
            ویڈیو (30s)
          </button>
          {selectedItems.size > 0 && (
            <button onClick={handleDeleteSelected} className="flex items-center gap-1 px-2 py-1.5 rounded text-xs text-red-400 hover:bg-red-900/20 transition-colors">
              <Trash2 className="w-3 h-3" />
              ڈیلیٹ ({selectedItems.size})
            </button>
          )}
          <button onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')} className="w-7 h-7 rounded flex items-center justify-center hover:bg-white/10 transition-colors">
            {viewMode === 'grid' ? <List className="w-4 h-4 text-slate-400" /> : <Grid className="w-4 h-4 text-slate-400" />}
          </button>
        </div>

        {/* Upload progress */}
        {uploading && (
          <div className="px-4 py-2" style={{ background: 'rgba(196,30,58,0.1)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-1">
              <Upload className="w-4 h-4 text-yellow-400 animate-bounce" />
              <span className="text-xs text-slate-300">امپورٹ ہو رہا ہے... {uploadProgress}%</span>
            </div>
            <div className="w-full rounded-full overflow-hidden" style={{ height: '4px', background: 'rgba(255,255,255,0.1)' }}>
              <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'linear-gradient(90deg, #c41e3a, #ffd700)', transition: 'width 0.1s linear' }}/>
            </div>
          </div>
        )}

        {/* Content area */}
        <div className="flex-1 overflow-y-auto p-4">
          {!activeSection || activeSection.items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mb-4" style={{ background: 'rgba(255,255,255,0.05)', border: '2px dashed rgba(255,255,255,0.15)' }}>
                <Plus className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-sm text-slate-400 mb-2">ابھی کوئی میڈیا نہیں</p>
              <p className="text-xs text-slate-600 mb-4">امیجز یا ویڈیوز امپورٹ کریں</p>
              <button onClick={() => fileInputRef.current?.click()} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #c41e3a, #8b0000)', color: '#ffd700' }}>
                <Image className="w-4 h-4" />
                امیجز منتخب کریں
              </button>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2">
              {activeSection.items.map(item => (
                <div key={item.id} onClick={() => toggleItemSelection(item.id)}
                  className="relative cursor-pointer group rounded-lg overflow-hidden transition-all duration-200 hover:scale-105"
                  style={{ aspectRatio: '1/1', border: selectedItems.has(item.id) ? '2px solid #ffd700' : '2px solid transparent', boxShadow: selectedItems.has(item.id) ? '0 0 8px rgba(255,215,0,0.4)' : 'none', background: '#111' }}>
                  {item.type === 'image' ? (
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover"/>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(0,100,200,0.2)' }}>
                      <Video className="w-8 h-8 text-blue-400" />
                    </div>
                  )}
                  {selectedItems.has(item.id) && (
                    <div className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{ background: '#ffd700' }}>
                      <Check className="w-3 h-3 text-black" />
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-end">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity w-full p-1">
                      <p className="text-white text-xs truncate">{item.name}</p>
                      <p className="text-slate-300 text-xs">{formatSize(item.size)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {activeSection.items.map(item => (
                <div key={item.id} onClick={() => toggleItemSelection(item.id)}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg cursor-pointer transition-all hover:bg-white/5"
                  style={{ border: selectedItems.has(item.id) ? '1px solid rgba(255,215,0,0.3)' : '1px solid transparent', background: selectedItems.has(item.id) ? 'rgba(255,215,0,0.05)' : 'transparent' }}>
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0">
                    {item.type === 'image' ? <img src={item.url} alt={item.name} className="w-full h-full object-cover"/> : <div className="w-full h-full flex items-center justify-center bg-blue-900/30"><Video className="w-4 h-4 text-blue-400"/></div>}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-200 truncate">{item.name}</p>
                    <p className="text-xs text-slate-500">{formatSize(item.size)} • {item.type === 'video' ? 'ویڈیو' : 'امیج'}</p>
                  </div>
                  {selectedItems.has(item.id) && <Check className="w-4 h-4 text-yellow-400 flex-shrink-0" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Hidden file inputs */}
      <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden"
        onChange={e => handleFileImport(e.target.files, 'image')} />
      <input ref={videoInputRef} type="file" accept="video/*" multiple className="hidden"
        onChange={e => handleFileImport(e.target.files, 'video')} />
    </div>
  );
};

export default AdminMediaManager;
