"use client";

import React from 'react';
import { AlertTriangle, Users, Truck, FileText, Camera, Activity } from 'lucide-react';
import { StatCard } from '../shared';

export default function PoliceDashboard() {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<AlertTriangle className="text-red-400" />} label="Alertes Crimes" value="08" trend="+2 ce matin" />
        <StatCard icon={<Users className="text-blue-400" />} label="FaceID Actif" value="3 Identifiés" trend="Base de données INTERPOL" />
        <StatCard icon={<Truck className="text-amber-400" />} label="LPR Scanning" value="12 Plaques" trend="Auto-logging" />
        <StatCard icon={<FileText className="text-white" />} label="Rapports Scellés" value="22" trend="Preuves blockchain" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card overflow-hidden">
          <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/2">
            <h3 className="font-bold flex items-center gap-2"><Camera className="w-5 h-5 text-red-500" /> Flux de Preuves Vidéo + IA Vision</h3>
            <div className="flex gap-2">
              <span className="px-2 py-1 bg-red-500 text-white text-[9px] font-bold rounded uppercase animate-pulse">Live Preuve</span>
              <span className="px-2 py-1 bg-blue-500/20 text-blue-400 text-[9px] font-bold rounded uppercase">FACE_RECOGNITION: ON</span>
              <span className="px-2 py-1 bg-green-500/20 text-green-400 text-[9px] font-bold rounded uppercase">LPR: ACTIVE</span>
            </div>
          </div>
          <div className="aspect-video bg-black relative flex items-center justify-center">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            <Activity className="w-12 h-12 text-white/10" />
            <div className="absolute top-6 left-6 space-y-2">
               <div className="bg-blue-500/20 border border-blue-500/40 p-2 rounded text-[10px] backdrop-blur-md">
                 <p className="font-black text-blue-400 uppercase tracking-widest">Face Match Found [88%]</p>
                 <p className="text-white">ID: #4492-SK | Nom: Unknown Suspect</p>
               </div>
               <div className="bg-green-500/20 border border-green-500/40 p-2 rounded text-[10px] backdrop-blur-md">
                 <p className="font-black text-green-400 uppercase tracking-widest">Plate Detected</p>
                 <p className="text-white">TN-442-901 | Type: Truck | Status: Blacklisted</p>
               </div>
            </div>
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              <div className="space-y-1">
                <p className="text-xs font-mono text-white/80">LAT: 36.8012 | LNG: 10.1712</p>
                <p className="text-[10px] text-green-400 font-bold uppercase tracking-widest">Suspect Détecté - Camion d'exploitation</p>
              </div>
              <button className="px-4 py-2 bg-red-500 text-white text-[10px] font-bold rounded-lg">CAPTURER PREUVE</button>
            </div>
          </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2 text-blue-400"><Activity className="w-5 h-5" /> Dispatch Unités</h3>
          <div className="space-y-4">
             {['Unité Mobile 01', 'Garde Nationale-4', 'Brigade Intervention'].map((u, i) => (
               <div key={u} className="p-4 bg-white/5 rounded-xl border border-white/5 space-y-3">
                 <div className="flex justify-between items-center">
                   <span className="text-sm font-bold">{u}</span>
                   <span className="text-[10px] text-green-400 font-bold">Disponible</span>
                 </div>
                 <button className="w-full py-2 bg-blue-500 text-black text-[10px] font-bold rounded-lg uppercase tracking-widest">Envoyer à l'incident</button>
               </div>
             ))}
          </div>
        </div>

        <div className="lg:col-span-3 glass-card p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2 text-red-500"><FileText className="w-5 h-5" /> Registre des Infractions Récentes</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/5 text-white/30 uppercase tracking-widest font-bold">
                  <th className="pb-4">Date</th>
                  <th className="pb-4">Type</th>
                  <th className="pb-4">Zone</th>
                  <th className="pb-4">Statut</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>
              <tbody className="text-white/70">
                {[
                  { date: '10/05 14:20', type: 'Coupe Illégale', zone: 'Jebel Ressas', status: 'En Fuite' },
                  { date: '10/05 12:15', type: 'Véhicule Suspect', zone: 'Gammarth', status: 'Intervention' },
                  { date: '09/05 21:00', type: 'Braconnage', zone: 'Sidi Salem', status: 'Résolu' },
                ].map((inf, i) => (
                  <tr key={i} className="border-b border-white/5 hover:bg-white/2 transition-colors">
                    <td className="py-4 font-mono">{inf.date}</td>
                    <td className="py-4 font-bold">{inf.type}</td>
                    <td className="py-4 uppercase tracking-tighter">{inf.zone}</td>
                    <td className="py-4">
                      <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${inf.status === 'Résolu' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {inf.status}
                      </span>
                    </td>
                    <td className="py-4">
                      <button className="text-blue-400 hover:underline font-bold uppercase text-[9px]">Détails</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
