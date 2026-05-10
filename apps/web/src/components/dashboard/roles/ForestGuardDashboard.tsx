"use client";

import React from 'react';
import { Navigation, Camera, Droplets, Shield, FileText } from 'lucide-react';

export default function ForestGuardDashboard() {
  return (
    <div className="space-y-8 animate-in slide-in-from-right-4 duration-700">
      <div className="glass-card aspect-[21/9] relative overflow-hidden bg-black">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071')] bg-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080a] via-transparent to-transparent"></div>
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-red-500/80 px-3 py-1 rounded-full text-[10px] font-bold animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]">
          <div className="w-2 h-2 bg-white rounded-full"></div> DRONE LINK • STABLE
        </div>
        <div className="absolute bottom-10 left-10 space-y-2">
          <h2 className="text-4xl font-black italic tracking-tighter uppercase">Secteur Delta-09</h2>
          <p className="text-white/40 text-sm font-mono tracking-widest uppercase">Latitude: 36.80 | Longitude: 10.18 | Wind: 12km/h</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-amber-500/20 bg-amber-500/5">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-amber-400"><Navigation className="w-5 h-5" /> Navigation Incident</h3>
          <p className="text-xs text-white/60 mb-6 leading-relaxed">Incendie suspecté à 2.4km au Nord-Est. Terrain difficile (Pente 15%).</p>
          <button className="w-full py-4 bg-amber-500 text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">Démarrer Navigation GPS</button>
        </div>
        
        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Camera className="w-5 h-5 text-blue-400" /> Capture Terrain</h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
             <div className="aspect-square bg-white/5 rounded-lg border border-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer"><Camera className="w-6 h-6 text-white/20" /></div>
             <div className="aspect-square bg-white/5 rounded-lg border border-white/5 flex items-center justify-center hover:bg-white/10 cursor-pointer"><Droplets className="w-6 h-6 text-white/20" /></div>
          </div>
          <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Upload Photos Evidence</button>
        </div>

        <div className="glass-card p-6 border-red-500/20">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-red-500"><Shield className="w-5 h-5" /> Contrôles Tactiques</h3>
          <div className="grid grid-cols-2 gap-3 mb-6">
             <button className="py-3 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase hover:bg-green-500/10 hover:text-green-400 transition-all">Scan 360°</button>
             <button className="py-3 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase hover:bg-blue-500/10 hover:text-blue-400 transition-all">Suivi Auto</button>
             <button className="py-3 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase hover:bg-amber-500/10 hover:text-amber-400 transition-all">Lumière IR</button>
             <button className="py-3 bg-white/5 border border-white/10 rounded-lg text-[9px] font-black uppercase hover:bg-red-500/10 hover:text-red-400 transition-all">Mode Furtif</button>
          </div>
          <button className="w-full py-4 bg-red-500/20 border border-red-500/40 text-red-500 font-black rounded-xl text-xs uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-[0_0_15px_rgba(239,68,68,0.2)]">APPEL D'URGENCE (SOS)</button>
        </div>
      </div>

      <div className="glass-card p-6">
        <h3 className="font-bold mb-6 flex items-center gap-2 text-green-400"><FileText className="w-5 h-5" /> Rapport d'Intervention</h3>
        <textarea className="w-full bg-white/2 border border-white/5 rounded-xl p-4 text-sm focus:outline-none focus:border-green-500/30 min-h-[120px] mb-4" placeholder="Décrivez l'état de la zone et les actions entreprises..."></textarea>
        <button className="px-8 py-3 bg-green-500 text-black font-bold rounded-xl text-xs uppercase tracking-widest shadow-[0_0_20px_rgba(34,197,94,0.3)]">Soumettre Rapport</button>
      </div>
    </div>
  );
}
