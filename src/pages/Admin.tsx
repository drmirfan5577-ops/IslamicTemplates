import React, { useState } from 'react';
import { X, Shield, Settings, Image, Database, Info, Download, RefreshCw, Users, Lock, Eye, EyeOff, ChevronRight, Zap, Globe, Code2, Smartphone, BookOpen } from 'lucide-react';
import AdminMediaManager from '@/components/features/AdminMediaManager';
import { templates, categories } from '@/data/templates';

interface Props { onClose: () => void; }

const PWA_INFO = `
اس ایپ کو PWA (Progressive Web App) کے طور پر انسٹال کیا جا سکتا ہے۔

1. Chrome/Edge میں: ایڈریس بار میں انسٹال آئیکن پر کلک کریں
2. Safari (iOS) میں: Share → Add to Home Screen
3. Android: "Install App" نوٹیفکیشن

manifest.json اور service worker مکمل کنفیگر ہے۔
`;

const NOTES = `
اہم نوٹس:
• 200+ ٹیمپلیٹس - ڈارک اور لائٹ ویرییشنز
• 20 عربی/اردو فانٹس سسٹم
• PWA انسٹال سپورٹ
• 9:16 ریشو تمام ٹیمپلیٹس
• سلائیڈشو آٹو پلے (1s/3s/5s/8s)
• ٹیکسٹ ایڈیٹر - عربی/اردو ٹیکسٹ
• بلک امیج امپورٹ (100+ ایک ساتھ)
• ویڈیو امپورٹ (30 سیکنڈ تک)
• ملٹیپل سیکشنز میڈیا مینیجر
`;

type AdminTab = 'dashboard' | 'media' | 'templates' | 'pwa' | 'notes' | 'fonts';

const AdminPanel: React.FC<Props> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('dashboard');

  const tabs: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'ڈیش بورڈ', icon: <Zap className="w-4 h-4" /> },
    { id: 'media', label: 'میڈیا مینیجر', icon: <Image className="w-4 h-4" /> },
    { id: 'templates', label: 'ٹیمپلیٹس', icon: <Database className="w-4 h-4" /> },
    { id: 'fonts', label: 'فانٹس', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'pwa', label: 'PWA', icon: <Smartphone className="w-4 h-4" /> },
    { id: 'notes', label: 'نوٹس', icon: <Info className="w-4 h-4" /> },
  ];

  const fontList = [
    { name: 'Amiri', class: "'Amiri', serif", url: 'https://fonts.google.com/specimen/Amiri' },
    { name: 'Scheherazade New', class: "'Scheherazade New', serif", url: '' },
    { name: 'Lateef', class: "'Lateef', serif", url: '' },
    { name: 'Reem Kufi', class: "'Reem Kufi', sans-serif", url: '' },
    { name: 'Mada', class: "'Mada', sans-serif", url: '' },
    { name: 'Cairo', class: "'Cairo', sans-serif", url: '' },
    { name: 'Tajawal', class: "'Tajawal', sans-serif", url: '' },
    { name: 'Noto Naskh Arabic', class: "'Noto Naskh Arabic', serif", url: '' },
    { name: 'IBM Plex Arabic', class: "'IBM Plex Sans Arabic', sans-serif", url: '' },
    { name: 'Aref Ruqaa', class: "'Aref Ruqaa Ink', serif", url: '' },
    { name: 'Harmattan', class: "'Harmattan', serif", url: '' },
    { name: 'Alkalami', class: "'Alkalami', serif", url: '' },
    { name: 'Jomhuria', class: "'Jomhuria', serif", url: '' },
    { name: 'Mirza', class: "'Mirza', serif", url: '' },
    { name: 'Rakkas', class: "'Rakkas', cursive", url: '' },
    { name: 'El Messiri', class: "'El Messiri', sans-serif", url: '' },
    { name: 'Markazi Text', class: "'Markazi Text', serif", url: '' },
    { name: 'Noto Kufi Arabic', class: "'Noto Kufi Arabic', sans-serif", url: '' },
    { name: 'Lemonada', class: "'Lemonada', cursive", url: '' },
    { name: 'Vibes', class: "'Vibes', cursive", url: '' },
  ];

  const catCounts = categories.map(c => ({ ...c, count: c.id === 'all' ? templates.length : templates.filter(t => t.category === c.id).length }));
  const lightCount = templates.filter(t => t.isLight).length;
  const darkCount = templates.filter(t => !t.isLight).length;

  return (
    <div className="fixed inset-0 z-[100] flex" style={{ background: 'rgba(0,0,0,0.97)', backdropFilter: 'blur(20px)' }}>
      {/* Sidebar */}
      <div className="w-48 flex-shrink-0 flex flex-col" style={{ background: 'linear-gradient(180deg, #0d0000, #050000)', borderRight: '1px solid rgba(196,30,58,0.25)' }}>
        {/* Logo */}
        <div className="px-4 py-4 flex items-center gap-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #c41e3a, #ffd700)', boxShadow: '0 0 10px rgba(196,30,58,0.5)' }}>
            <Shield className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-bold" style={{ color: '#ffd700' }}>ایڈمن پینل</p>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>
        {/* Nav */}
        <nav className="flex-1 px-2 py-3 space-y-1">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium transition-all duration-200 text-left"
              style={activeTab === tab.id ? { background: 'linear-gradient(135deg, rgba(196,30,58,0.3), rgba(139,0,0,0.2))', color: '#ffd700', border: '1px solid rgba(196,30,58,0.3)' } : { color: '#64748b', border: '1px solid transparent' }}>
              {tab.icon}
              <span>{tab.label}</span>
              {activeTab === tab.id && <ChevronRight className="w-3 h-3 ml-auto" />}
            </button>
          ))}
        </nav>
        <div className="px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <p className="text-xs text-slate-600">v2.0 • 200+ Templates</p>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
          <h1 className="text-sm font-bold" style={{ background: 'linear-gradient(90deg, #ffd700, #c41e3a)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            {tabs.find(t => t.id === activeTab)?.label}
          </h1>
          <button onClick={onClose} className="w-8 h-8 rounded-full flex items-center justify-center hover:scale-110 transition-transform"
            style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)' }}>
            <X className="w-4 h-4 text-slate-300" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {activeTab === 'dashboard' && (
            <div className="p-6 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'کل ٹیمپلیٹس', value: templates.length, color: '#ffd700', icon: '🎨' },
                  { label: 'روشن', value: lightCount, color: '#00c8ff', icon: '☀️' },
                  { label: 'ڈارک', value: darkCount, color: '#c41e3a', icon: '🌙' },
                  { label: 'کیٹیگریز', value: categories.length - 1, color: '#a855f7', icon: '📂' },
                ].map((stat, i) => (
                  <div key={i} className="rounded-xl p-4" style={{ background: `${stat.color}11`, border: `1px solid ${stat.color}33` }}>
                    <div className="text-2xl mb-1">{stat.icon}</div>
                    <div className="text-2xl font-black" style={{ color: stat.color }}>{stat.value}</div>
                    <div className="text-xs text-slate-400 mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
              {/* Quick actions */}
              <div>
                <h3 className="text-sm font-semibold text-slate-300 mb-3">فوری اعمال</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'میڈیا امپورٹ', desc: '100+ امیجز ایک ساتھ', icon: <Image className="w-4 h-4" />, tab: 'media' as AdminTab },
                    { label: 'ٹیمپلیٹس دیکھیں', desc: 'تمام 200+ ٹیمپلیٹس', icon: <Database className="w-4 h-4" />, tab: 'templates' as AdminTab },
                    { label: 'فانٹس', desc: '20 عربی/اردو فانٹس', icon: <BookOpen className="w-4 h-4" />, tab: 'fonts' as AdminTab },
                    { label: 'PWA معلومات', desc: 'انسٹالیشن گائیڈ', icon: <Smartphone className="w-4 h-4" />, tab: 'pwa' as AdminTab },
                  ].map((action, i) => (
                    <button key={i} onClick={() => setActiveTab(action.tab)}
                      className="flex items-start gap-3 p-4 rounded-xl text-left transition-all hover:scale-105"
                      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}>
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(196,30,58,0.2)', color: '#ffd700' }}>{action.icon}</div>
                      <div>
                        <p className="text-xs font-semibold text-white">{action.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{action.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'media' && (
            <div className="h-full" style={{ minHeight: '500px' }}>
              <AdminMediaManager onClose={() => {}} />
            </div>
          )}

          {activeTab === 'templates' && (
            <div className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {catCounts.filter(c => c.id !== 'all').map(cat => (
                  <div key={cat.id} className="rounded-xl p-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="text-xl font-black text-white">{cat.count}</div>
                    <div className="text-xs text-yellow-400 font-semibold mt-1">{cat.label}</div>
                    <div className="text-xs text-slate-500">{cat.labelEn}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 rounded-xl" style={{ background: 'rgba(196,30,58,0.08)', border: '1px solid rgba(196,30,58,0.2)' }}>
                <h3 className="text-sm font-bold text-yellow-400 mb-2">ٹیمپلیٹس کی معلومات</h3>
                <div className="space-y-1 text-xs text-slate-300">
                  <p>• ڈارک ٹیمپلیٹس: {darkCount} (ID 1-110)</p>
                  <p>• لائٹ/روشن ٹیمپلیٹس: {lightCount} (ID 111-200)</p>
                  <p>• فارمیٹ: 9:16 پورٹریٹ ریشو</p>
                  <p>• 20 مختلف رنگ سکیمز</p>
                  <p>• 15+ اینیمیشن ٹائپس</p>
                  <p>• 10 موڈ کیٹیگریز</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'fonts' && (
            <div className="p-6">
              <p className="text-xs text-slate-500 mb-4">20 عربی/اردو فانٹس - Google Fonts سے لوڈ</p>
              <div className="space-y-2">
                {fontList.map((font, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <span className="text-xs text-slate-500 w-5 flex-shrink-0">{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm text-white font-medium">{font.name}</p>
                      <p className="text-xs text-slate-500 font-mono">{font.class}</p>
                    </div>
                    <div className="text-lg text-yellow-300" style={{ fontFamily: font.class, direction: 'rtl' }}>محمد</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-4 rounded-xl" style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)' }}>
                <p className="text-xs text-yellow-400 font-semibold mb-2">⚠️ نوٹ</p>
                <p className="text-xs text-slate-400">تمام فانٹس Google Fonts API سے لوڈ ہوتے ہیں۔ انٹرنیٹ کنیکشن ضروری ہے۔ آف لائن استعمال کے لیے فانٹس کو لوکلی انسٹال کریں۔</p>
              </div>
            </div>
          )}

          {activeTab === 'pwa' && (
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(0,180,100,0.08)', border: '1px solid rgba(0,180,100,0.2)' }}>
                <h3 className="text-sm font-bold text-green-400 mb-2 flex items-center gap-2"><Smartphone className="w-4 h-4" /> PWA سٹیٹس</h3>
                <div className="space-y-2 text-xs">
                  {[
                    { label: 'manifest.json', status: true },
                    { label: '9:16 آئیکنز', status: true },
                    { label: 'HTTPS رڈائریکٹ', status: true },
                    { label: 'آف لائن کیشنگ', status: false },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.status ? 'bg-green-400' : 'bg-yellow-400'}`}/>
                      <span className="text-slate-300">{item.label}</span>
                      <span className={`ml-auto text-xs ${item.status ? 'text-green-400' : 'text-yellow-400'}`}>{item.status ? '✓' : '~'}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-sm font-semibold text-white mb-2">انسٹالیشن گائیڈ</h3>
                <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed" style={{ fontFamily: 'monospace' }}>{PWA_INFO}</pre>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="text-sm font-semibold text-white mb-2">App Store پبلشنگ</h3>
                <div className="space-y-2 text-xs text-slate-400">
                  <p>• <span className="text-yellow-400">Google Play:</span> TWA (Trusted Web Activity) کے ذریعے</p>
                  <p>• <span className="text-yellow-400">Apple App Store:</span> WKWebView Wrapper</p>
                  <p>• <span className="text-yellow-400">Capacitor/Cordova:</span> Native App Wrapper</p>
                  <p>• <span className="text-yellow-400">OnSpace:</span> Download Source Code → Convert</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'notes' && (
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <pre className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed">{NOTES}</pre>
              </div>
              <div className="p-4 rounded-xl" style={{ background: 'rgba(255,215,0,0.05)', border: '1px solid rgba(255,215,0,0.15)' }}>
                <h3 className="text-sm font-semibold text-yellow-400 mb-2">کلاؤڈ انٹیگریشن</h3>
                <div className="space-y-2 text-xs text-slate-400">
                  {['OnSpace Cloud (فعال)', 'Supabase (انٹیگریٹ ہو سکتا ہے)', 'Cloudflare R2 (انٹیگریٹ ہو سکتا ہے)', 'Firebase (انٹیگریٹ ہو سکتا ہے)', 'Google Cloud Storage (انٹیگریٹ ہو سکتا ہے)'].map((item, i) => (
                    <p key={i}>• {item}</p>
                  ))}
                </div>
                <p className="text-xs text-slate-500 mt-3">کلاؤڈ انٹیگریشن کے لیے OnSpace Cloud کو فعال کریں اور API کیز شامل کریں۔</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
