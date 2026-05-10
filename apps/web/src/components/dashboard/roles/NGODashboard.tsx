"use client";

import React from 'react';
import { Droplets, TrendingUp, Users, Database, PieChart as PieChartIcon, Globe } from 'lucide-react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { StatCard } from '../shared';

const pieData = [
  { name: 'Feu', value: 400 },
  { name: 'Coupe', value: 300 },
  { name: 'Humain', value: 300 },
  { name: 'Véhicule', value: 200 },
];
const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b'];

export default function NGODashboard() {
  return (
    <div className="space-y-8 animate-in fade-in duration-1000">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<Droplets className="text-cyan-400" />} label="Impact Carbone" value="1,240 T" trend="-15% ce mois" />
        <StatCard icon={<TrendingUp className="text-green-400" />} label="Reforestation" value="12,500" trend="Arbres plantés" />
        <StatCard icon={<Users className="text-blue-400" />} label="Bénévoles" value="452" trend="Actifs" />
        <StatCard icon={<Database className="text-amber-400" />} label="Dons" value="245k DT" trend="Support ONG" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8 bg-gradient-to-br from-green-500/5 to-transparent">
          <h3 className="text-xl font-bold mb-8 flex items-center gap-2 text-green-400"><TrendingUp className="w-6 h-6" /> Suivi Impact Biodiversité</h3>
          <div className="h-[300px]">
             <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={pieData} innerRadius={80} outerRadius={110} paddingAngle={5} dataKey="value">
                   {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                 </Pie>
                 <Tooltip />
               </PieChart>
             </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {pieData.map((d, i) => (
              <div key={d.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }}></div>
                <span className="text-xs text-white/60 font-bold uppercase">{d.name}: {d.value}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-8">
          <div className="glass-card p-6">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-blue-400"><PieChartIcon className="w-5 h-5" /> Projets de Reforestation</h3>
            <div className="space-y-4">
               {['Jebel Ressas', 'Forêt de Gammarth', 'Barrage Sidi Salem'].map((project, i) => (
                 <div key={project} className="flex justify-between items-center p-4 bg-white/2 rounded-xl border border-white/5">
                   <span className="text-sm font-bold">{project}</span>
                   <span className="text-xs text-green-500 font-mono">68% Replanté</span>
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase hover:bg-white/10 transition-all">VOIR TOUS LES PROJETS</button>
          </div>
          <div className="glass-card p-6 border-blue-500/20 bg-blue-500/5">
            <h3 className="font-bold mb-4 flex items-center gap-2 text-blue-400"><Globe className="w-5 h-5" /> Objectif Reforestation 2026</h3>
            <div className="space-y-4">
               <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                  <span>Progression</span>
                  <span>72%</span>
               </div>
               <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500" style={{ width: '72%' }}></div>
               </div>
               <p className="text-[10px] text-white/40 leading-relaxed italic">"Plus que 45,000 DT pour atteindre l'objectif de 10,000 arbres à Jebel Ressas."</p>
            </div>
            <button className="w-full mt-6 py-3 bg-blue-500 text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-blue-400 transition-all">Lancer Campagne</button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-6 border-emerald-500/20">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-emerald-400"><Droplets className="w-5 h-5" /> Marketplace Carbone</h3>
          <p className="text-xs text-white/50 mb-6">Achetez des crédits carbone certifiés par IA pour financer la reforestation.</p>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between text-[10px] uppercase font-bold text-white/30"><span>Total Crédits</span><span>Prix/T</span></div>
            <div className="flex justify-between text-sm font-bold"><span>1,240 T</span><span className="text-emerald-400">$24.50</span></div>
          </div>
          <button className="w-full py-3 bg-emerald-500 text-black font-black rounded-xl text-[10px] uppercase tracking-widest">Acheter Crédits</button>
        </div>

        <div className="glass-card p-6 border-blue-500/20">
          <h3 className="font-bold mb-4 flex items-center gap-2 text-blue-400"><FileText className="w-5 h-5" /> Smart Contracts</h3>
          <div className="space-y-4">
            {['Reforestation B-12', 'Protection Faune'].map(c => (
              <div key={c} className="p-3 bg-white/5 rounded-lg border border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-bold">{c}</span>
                <span className="text-[9px] px-2 py-0.5 bg-blue-500/20 text-blue-400 rounded uppercase">Actif</span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-blue-500/10 border border-blue-500/20 text-blue-400 font-bold rounded-xl text-[10px] uppercase tracking-widest">Gérer Contrats</button>
        </div>

        <div className="glass-card p-6">
          <h3 className="font-bold mb-4 flex items-center gap-2"><Globe className="w-5 h-5 text-white/40" /> Digital Twin 3D</h3>
          <div className="aspect-square bg-black/40 rounded-xl mb-4 border border-white/5 flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013')] bg-cover opacity-20 grayscale group-hover:grayscale-0 transition-all"></div>
            <Navigation className="w-12 h-12 text-white/10 group-hover:text-white/40 transition-all" />
            <div className="absolute bottom-4 text-[9px] font-bold uppercase tracking-widest text-white/40">Cesium/Unity Engine</div>
          </div>
          <button className="w-full py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Explorer la Forêt 3D</button>
        </div>
      </div>
    </div>
  );
}
