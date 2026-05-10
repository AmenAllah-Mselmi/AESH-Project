"use client";

import React from 'react';
import { AlertTriangle, Navigation, Droplets, Zap, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell } from 'recharts';
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

const pieData = [
  { name: 'Feu', value: 400 },
  { name: 'Coupe', value: 300 },
  { name: 'Humain', value: 300 },
  { name: 'Véhicule', value: 200 },
];
const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b'];

export default function OverviewDashboard({ role }: { role?: string }) {
  const getRoleTheme = () => {
    switch(role) {
      case 'police': return { title: 'Sécurité Territoriale', color: 'text-blue-400', desc: 'Surveillance des infractions et interventions légales.' };
      case 'forest_guard': return { title: 'Protection de la Faune', color: 'text-green-400', desc: 'Détection incendie et monitoring biodiversité.' };
      case 'technician': return { title: 'Infrastructure Drone', color: 'text-amber-400', desc: 'État de santé de la flotte et maintenance capteurs.' };
      case 'scientist': return { title: 'Analyse Écosystème', color: 'text-cyan-400', desc: 'Corrélation de données et modèles prédictifs.' };
      default: return { title: 'Aperçu Global de la Forêt', color: 'text-white', desc: 'État général des ressources et alertes actives.' };
    }
  };

  const theme = getRoleTheme();

  return (
    <div className="space-y-10 animate-in fade-in duration-700">
      <div className="glass-card p-8 border-l-4 border-l-green-500 bg-gradient-to-r from-green-500/5 to-transparent">
        <h2 className={`text-2xl font-black uppercase tracking-tighter ${theme.color}`}>{theme.title}</h2>
        <p className="text-white/40 text-xs font-bold uppercase tracking-widest mt-1">{theme.desc}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={<AlertTriangle className="text-red-400" />} label="Alertes Actives" value="12" trend="+15%" />
        <StatCard icon={<Navigation className="text-blue-400" />} label="Drones en Vol" value="3" trend="Stable" />
        <StatCard icon={<Droplets className="text-cyan-400" />} label="Pluviométrie" value="78%" trend="-2%" />
        <StatCard icon={<Zap className="text-amber-400" />} label="Energie Solaire" value="94%" trend="Optimal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2"><BarChart3 className="w-5 h-5 text-green-500" /> Activité de Surveillance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={alertData}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff20" fontSize={12} />
                <YAxis stroke="#ffffff20" fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f14', border: '1px solid rgba(255,255,255,0.1)' }} />
                <Area type="monotone" dataKey="alerts" stroke="#22c55e" fillOpacity={1} fill="url(#colorAlerts)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-6">
          <h3 className="font-bold mb-6">Répartition des Risques</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
