"use client";

import React, { useState } from 'react';
import { MessageSquare, ShieldAlert, Globe, Moon, Sun, X, Send } from 'lucide-react';

export function SystemControls() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [language, setLanguage] = useState('FR');
  const [isDarkMode, setIsDarkMode] = useState(true);

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button 
          onClick={() => alert("SOS SIGNAL SENT TO ALL NEARBY UNITS!")}
          className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] animate-pulse hover:scale-110 transition-all border-4 border-white/20"
          title="EMERGENCY SOS"
        >
          <ShieldAlert className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-110 transition-all border-4 border-white/20"
          title="AI Assistant"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      </div>

      {/* Top Bar Controls */}
      <div className="fixed top-8 right-8 flex gap-3 z-50">
        <button 
          onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
          className="glass-card px-3 py-2 text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-white/10"
        >
          <Globe className="w-3 h-3" /> {language}
        </button>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="glass-card p-2 hover:bg-white/10"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>
      </div>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-8 w-80 h-96 glass-card flex flex-col z-50 animate-in slide-in-from-bottom-4">
          <div className="p-4 border-b border-white/5 bg-white/5 flex justify-between items-center">
            <h4 className="text-xs font-bold flex items-center gap-2 uppercase tracking-widest">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
              Assistant Forestier
            </h4>
            <button onClick={() => setIsChatOpen(false)}><X className="w-4 h-4 text-white/30 hover:text-white" /></button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-[11px]">
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              Bonjour ! Je suis l'IA de surveillance. Comment puis-je vous aider aujourd'hui ?
            </div>
            <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30 text-blue-100 ml-4">
              Quelles sont les dernières détections dans le secteur Nord ?
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/5">
              Deux camions suspects détectés à 14:45. Les plaques ont été enregistrées (TN-123-456).
            </div>
          </div>
          <div className="p-4 border-t border-white/5 flex gap-2">
            <input 
              type="text" 
              placeholder="Posez votre question..." 
              className="flex-1 bg-white/2 border border-white/10 rounded-lg px-3 py-2 text-[10px] focus:outline-none focus:border-blue-500/50"
            />
            <button className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
              <Send className="w-3 h-3 text-white" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
