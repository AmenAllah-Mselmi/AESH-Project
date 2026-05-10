"use client";

import React from 'react';
import { Zap, Bell, FileText } from 'lucide-react';

export default function CitizenDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="glass-card p-10 bg-gradient-to-r from-green-600/10 via-transparent to-transparent border-green-500/20">
         <div className="max-w-xl">
           <h2 className="text-4xl font-black mb-4 tracking-tighter uppercase">Devenez un <span className="text-green-500">Gardien</span>.</h2>
           <p className="text-white/50 text-lg leading-relaxed mb-8">Votre communauté est la première ligne de défense de nos forêts. Signalez tout incident en un clic et protégez l'avenir.</p>
           <button className="px-10 py-5 bg-green-500 text-black font-black rounded-2xl text-sm uppercase tracking-[0.2em] shadow-[0_0_40px_rgba(34,197,94,0.3)] hover:scale-105 active:scale-95 transition-all">SIGNALER UN INCIDENT</button>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-card p-6 border-blue-500/20">
          <div className="flex justify-between items-start mb-6">
            <h3 className="font-bold flex items-center gap-2 text-blue-400"><Bell className="w-5 h-5" /> Alertes Locales</h3>
            <span className="bg-blue-500/20 text-blue-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">Secteur: Nord</span>
          </div>
          <div className="space-y-4">
             <div className="p-3 bg-white/5 rounded-lg text-xs border border-white/5">⚠️ Exercice drone prévu à 14h dans votre zone.</div>
             <div className="p-3 bg-amber-500/10 rounded-lg text-xs border border-amber-500/20 text-amber-200">🔥 Alerte feu maîtrisée à 4km de vous.</div>
          </div>
        </div>

        <div className="glass-card p-6 border-amber-500/20">
          <h3 className="font-bold mb-6 flex items-center gap-2 text-amber-500"><Zap className="w-5 h-5" /> Programme Récompenses</h3>
          <div className="text-center py-6">
             <p className="text-4xl font-black text-amber-500 mb-1">450</p>
             <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold">Points Eco-Citoyen</p>
             <div className="w-full h-1 bg-white/5 rounded-full mt-6 overflow-hidden">
                <div className="w-[45%] h-full bg-amber-500 shadow-[0_0_10px_#f59e0b]"></div>
             </div>
          </div>
        </div>

        <div className="glass-card p-6">
           <h3 className="font-bold mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-white/40" /> Historique</h3>
           <div className="space-y-3">
              {[1, 2].map(i => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/2 rounded-lg border border-white/5">
                  <span className="text-xs text-white/60 font-medium">Signalement #{i}</span>
                  <span className="text-[9px] px-2 py-0.5 bg-green-500/10 text-green-500 rounded uppercase font-bold">Traité</span>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
}
