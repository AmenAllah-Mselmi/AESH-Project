"use client";

import React from 'react';
import { Database, Camera, Globe, BarChart3, FileText } from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area } from 'recharts';
import { StatCard } from '../shared';

const alertData = [
  { name: 'Mon', alerts: 4, forest: 2 },
  { name: 'Tue', alerts: 7, forest: 5 },
  { name: 'Wed', alerts: 3, forest: 1 },
  { name: 'Thu', alerts: 9, forest: 4 },
  { name: 'Fri', alerts: 12, forest: 8 },
  { name: 'Sat', alerts: 5, forest: 3 },
  { name: 'Sun', alerts: 2, forest: 1 },
];

export default function ResearchersDashboard() {
  return (
    <div className="space-y-8 animate-in slide-in-from-top-4 duration-700">
      <div className="glass-card p-8 bg-[#0a0f14] border-blue-500/30">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-3"><Database className="text-blue-500" /> Scientific Research Hub</h2>
        <p className="text-white/40 text-sm">Accès aux datasets haute résolution et API d'entraînement pour modèles de vision par ordinateur.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Camera className="text-blue-400" />} label="Images Dataset" value="250k+" trend="HQ Labelled" />
        <StatCard icon={<Globe className="text-cyan-400" />} label="Données Satellite" value="Sentinel-2" trend="Update 2h ago" />
        <StatCard icon={<BarChart3 className="text-green-400" />} label="Modèles Scientifiques" value="08" trend="Accuracy 98.4%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
           <h3 className="font-bold mb-6 flex items-center justify-between">
             <span>Analyse de Corrélation Historique</span>
             <button className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold uppercase tracking-widest hover:text-green-400 transition-colors">Export CSV</button>
           </h3>
           <div className="h-[350px]">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={alertData}>
                 <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                 <XAxis dataKey="name" stroke="#ffffff20" />
                 <YAxis stroke="#ffffff20" />
                 <Tooltip />
                 <Area type="monotone" dataKey="forest" stroke="#22c55e" fill="#22c55e10" strokeWidth={3} />
                 <Area type="monotone" dataKey="alerts" stroke="#ef4444" fill="#ef444410" strokeWidth={3} />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold mb-6 text-sm uppercase tracking-widest text-white/40">API Documentation</h3>
          <div className="bg-black/50 rounded-xl p-4 font-mono text-[11px] text-blue-400 space-y-2 border border-white/5">
             <p className="text-white/20">// Get real-time detections</p>
             <p>GET /api/v1/science/detections</p>
             <p className="text-white/20 mt-4">// Fetch raw satellite imagery</p>
             <p>POST /api/v1/science/imagery</p>
          </div>
          <button className="w-full mt-6 py-3 bg-blue-500 text-black font-bold rounded-xl text-xs uppercase tracking-widest">Générer Clé API</button>
        </div>
      </div>
    </div>
  );
}
