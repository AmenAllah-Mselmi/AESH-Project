"use client";

import React from 'react';
import { Globe, Zap, Shield, AlertTriangle, Map as MapIcon, ChevronRight, Users } from 'lucide-react';
import { StatCard } from '../shared';

export default function GovernmentDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="glass-card p-8 bg-gradient-to-br from-green-600/20 to-blue-600/10 border-green-500/30">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-3xl font-bold mb-2 tracking-tight">Portail National de Souveraineté Forestière</h2>
            <p className="text-white/50 text-sm max-w-2xl">Gestion stratégique inter-ministérielle et coordination des interventions d'urgence nationale.</p>
          </div>
          <div className="bg-green-500 text-black text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-[0_0_15px_rgba(34,197,94,0.4)]">MFA ACTIVE</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard icon={<Globe className="text-blue-400" />} label="Couverture Nationale" value="94.2%" trend="Stable" />
        <StatCard icon={<Zap className="text-amber-400" />} label="Budget Consommé" value="4.2M DT" trend="62% de l'annuel" />
        <StatCard icon={<Shield className="text-green-400" />} label="Zones Protégées" value="24" trend="+2 cette année" />
        <StatCard icon={<AlertTriangle className="text-red-400" />} label="Niveau Alerte" value="MODÉRÉ" trend="Risque incendie" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-green-400"><MapIcon className="w-5 h-5" /> Gestion des Régions & Districts</h3>
            <div className="space-y-4">
              {[
                { name: 'Nord-Ouest (Tabarka)', teams: 12 },
                { name: 'Cap Bon', teams: 8 },
                { name: 'Centre-Ouest (Kasserine)', teams: 15 },
                { name: 'Sud (Oasis)', teams: 4 }
              ].map((region, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5 hover:border-green-500/30 transition-all cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center font-bold text-green-500">{i+1}</div>
                    <div>
                      <p className="font-bold text-sm">{region.name}</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest">Équipes assignées: {region.teams}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-green-500 transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 text-sm flex items-center gap-2"><Users className="w-4 h-4" /> Partenaires & Orgs</h3>
            <div className="space-y-4">
              {['WWF Tunisia', 'Direction des Forêts', 'Ministère de Défense'].map((org, i) => (
                <div key={org} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold italic">{org[0]}</div>
                  <span className="text-sm font-medium text-white/70">{org}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
