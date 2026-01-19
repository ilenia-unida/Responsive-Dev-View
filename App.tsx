import React, { useState, useCallback, useRef } from 'react';
import { DeviceFrame } from './components/DeviceFrame';
import { DEVICES } from './types';

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState('https://www.wikipedia.org');
  const [activeUrl, setActiveUrl] = useState('https://www.wikipedia.org');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateAndSetUrl = useCallback(() => {
    let url = inputValue.trim();
    if (!url) return;

    // Aggiunta automatica del protocollo se mancante
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    try {
      new URL(url);
      setActiveUrl(url);
      setInputValue(url);
      setError(null);
    } catch (e) {
      setError('Inserisci un URL valido (es. https://google.com)');
    }
  }, [inputValue]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      validateAndSetUrl();
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-900 text-slate-100 font-sans selection:bg-blue-500/30">
      {/* Header Professionale */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/50 px-6 py-4 shadow-2xl">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 shrink-0 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg shadow-blue-900/40 group-hover:scale-105 transition-transform duration-300">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                Responsive Dev-View
              </h1>
              <p className="text-[10px] text-blue-400 uppercase tracking-[0.2em] font-bold">Simulator v1.0</p>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl relative">
            <div className="flex items-center bg-slate-800/50 border border-slate-700 rounded-2xl overflow-hidden shadow-2xl focus-within:ring-2 focus-within:ring-blue-500/50 focus-within:border-blue-500/50 transition-all duration-300 group">
              <div className="pl-5 text-slate-500 group-focus-within:text-blue-400 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Inserisci l'URL da testare..."
                className="w-full bg-transparent px-5 py-4 text-slate-100 placeholder-slate-500 focus:outline-none font-medium"
              />
              <button
                onClick={validateAndSetUrl}
                className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white px-8 py-4 font-bold transition-all flex items-center gap-2 group/btn"
              >
                <span>Simula</span>
                <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
            {error && (
              <div className="absolute top-full left-0 mt-3 flex items-center gap-2 text-red-400 text-xs font-bold animate-in fade-in slide-in-from-top-1">
                <span className="w-1 h-1 bg-red-400 rounded-full"></span>
                {error}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Area dei Frame */}
      <main className="flex-1 overflow-x-auto custom-scrollbar bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-slate-800/50 via-slate-900 to-slate-900">
        <div className="min-w-max flex items-start justify-center gap-16 p-12 lg:p-20">
          {DEVICES.map((device) => (
            <DeviceFrame key={device.id} device={device} url={activeUrl} />
          ))}
        </div>

        {/* Banner Informativo */}
        <div className="max-w-4xl mx-auto mb-16 px-6">
          <div className="bg-blue-500/5 border border-blue-500/20 rounded-3xl p-8 backdrop-blur-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
              <svg className="w-24 h-24 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="relative z-10">
              <h3 className="text-blue-400 font-black mb-3 uppercase tracking-tighter text-sm">Security & Compatibility Note:</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                Alcuni domini applicano criteri di sicurezza rigorosi (<code className="text-blue-300 font-mono">X-Frame-Options: DENY/SAMEORIGIN</code>) che impediscono la visualizzazione in un iframe. Per i test più accurati, usa URL di sviluppo locale o siti che consentono l'embedding.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer Minimalista */}
      <footer className="bg-slate-950/50 border-t border-slate-800/50 py-6 px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4 text-slate-500 text-xs font-medium">
          <span>&copy; 2026 Responsive Dev-View</span>
          <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
          <span>Pro v1.0.4</span>
        </div>
        <p className="text-slate-400 text-xs tracking-wide uppercase font-bold">
          Made with <span className="text-red-500 animate-pulse">❤</span> by <span className="text-blue-500 hover:text-blue-400 cursor-default transition-colors">Ilenia Unida</span>
        </p>
      </footer>
    </div>
  );
};

export default App;