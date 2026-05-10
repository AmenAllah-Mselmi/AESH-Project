"use client";

import React from 'react';
import { Users, Database, Zap, Settings, AlertTriangle, HardDrive } from 'lucide-react';
import { StatCard } from '../shared';

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Users className="text-green-400" />} label="Utilisateurs Actifs" value="1,248" trend="+12 ce jour" />
        <StatCard icon={<Database className="text-blue-400" />} label="Volume Data" value="4.2 TB" trend="92% capacité" />
        <StatCard icon={<Zap className="text-amber-400" />} label="Modèles IA" value="12" trend="v4.2 Actif" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2"><Users className="w-6 h-6 text-green-500" /> Gestion des Comptes</h3>
            <button className="px-4 py-2 bg-green-500 text-black text-xs font-bold rounded-lg hover:bg-green-400 transition-all">+ NOUVEL UTILISATEUR</button>
          </div>
          <div className="space-y-4">
             {['Admin Tech', 'Commissariat Regional', 'Equipe Drone 04'].map((u, i) => (
               <div key={u} className="flex items-center justify-between p-4 bg-white/2 rounded-xl border border-white/5 group hover:bg-white/5 transition-all">
                 <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-white/10 to-white/5 flex items-center justify-center font-bold text-xs">{u[0]}</div>
                   <div><p className="text-sm font-bold">{u}</p><p className="text-[10px] text-white/30 uppercase">Role: {i === 0 ? 'Admin' : 'Police'}</p></div>
                 </div>
                 <div className="flex gap-2">
                   <button className="p-2 hover:bg-white/10 rounded-lg transition-all text-white/20 hover:text-white"><Settings className="w-4 h-4" /></button>
                   <button className="p-2 hover:bg-red-500/10 rounded-lg transition-all text-white/20 hover:text-red-500"><AlertTriangle className="w-4 h-4" /></button>
                 </div>
               </div>
             ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6 border-blue-500/20">
            <h3 className="font-bold mb-6 flex items-center gap-2"><Zap className="w-5 h-5 text-blue-400" /> Configuration IA & Vision</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60">Seuil de Détection Feu</span>
                <span className="text-sm font-mono text-green-400">0.92</span>
              </div>
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div className="w-[92%] h-full bg-green-500"></div>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-xs font-bold hover:bg-blue-500/20 transition-all">DÉPLOYER NOUVEAU MODÈLE</button>
          </div>
          
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2"><HardDrive className="w-5 h-5 text-white/40" /> Monitoring Serveur</h3>
            <div className="flex gap-4">
               <div className="flex-1 p-3 bg-green-500/5 border border-green-500/20 rounded-xl text-center">
                 <p className="text-[10px] text-white/40 uppercase mb-1">CPU</p>
                 <p className="text-xl font-bold">14%</p>
               </div>
               <div className="flex-1 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl text-center">
                 <p className="text-[10px] text-white/40 uppercase mb-1">RAM</p>
                 <p className="text-xl font-bold">68%</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
