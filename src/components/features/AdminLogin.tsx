import React, { useState } from 'react';
import { Shield, Eye, EyeOff, X } from 'lucide-react';

interface Props {
  onSuccess: () => void;
  onClose: () => void;
}

const ADMIN_PASSWORD = 'Admin5577';

const AdminLogin: React.FC<Props> = ({ onSuccess, onClose }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setError('');
      onSuccess();
    } else {
      setAttempts(a => a + 1);
      setError(`غلط پاس ورڈ (${attempts + 1}/5)`);
      if (attempts >= 4) setError('بہت زیادہ غلط کوششیں۔ بعد میں کوشش کریں۔');
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.96)', backdropFilter: 'blur(20px)' }}>
      <div className="w-full max-w-sm rounded-2xl p-6 relative" style={{ background: 'linear-gradient(160deg, #0d0000 0%, #050000 100%)', border: '1px solid rgba(196,30,58,0.3)', boxShadow: '0 0 60px rgba(196,30,58,0.2)' }}>
        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.08)' }}>
          <X className="w-4 h-4 text-slate-400" />
        </button>
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ background: 'linear-gradient(135deg, #c41e3a, #8b0000)', boxShadow: '0 0 30px rgba(196,30,58,0.5)' }}>
            <Shield className="w-8 h-8 text-yellow-400" />
          </div>
          <h2 className="text-lg font-black text-white">ایڈمن پینل</h2>
          <p className="text-sm text-slate-500 mt-1">Admin Panel Access</p>
        </div>
        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={e => { setPassword(e.target.value); setError(''); }}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              placeholder="پاس ورڈ درج کریں..."
              className="w-full px-4 py-3 pr-12 rounded-xl outline-none text-sm"
              style={{ background: 'rgba(255,255,255,0.07)', border: `1px solid ${error ? 'rgba(239,68,68,0.5)' : 'rgba(255,215,0,0.2)'}`, color: 'white', direction: 'rtl', letterSpacing: '2px' }}
            />
            <button onClick={() => setShowPassword(!showPassword)} className="absolute left-3 top-1/2 -translate-y-1/2">
              {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
            </button>
          </div>
          {error && <p className="text-xs text-red-400 text-center" style={{ direction: 'rtl' }}>{error}</p>}
          <button onClick={handleLogin} disabled={attempts >= 5}
            className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'linear-gradient(135deg, #c41e3a, #8b0000)', color: '#ffd700', boxShadow: '0 0 20px rgba(196,30,58,0.4)' }}>
            لاگ ان کریں
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
