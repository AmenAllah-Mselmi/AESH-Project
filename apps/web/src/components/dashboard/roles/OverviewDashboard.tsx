"use client";

import React, { useState, useEffect } from 'react';
import { AlertTriangle, Navigation, Droplets, Zap, BarChart3 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, Area, PieChart, Pie, Cell } from 'recharts';
import { StatCard } from '../shared';
import { supabase } from '@/lib/supabase';

const COLORS = ['#ef4444', '#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6'];

export default function OverviewDashboard({ role }: { role?: string }) {
  const [stats, setStats] = useState({
    alerts: 0,
    drones: 0,
    humidity: 78,
    energy: 94
  });
  const [chartData, setChartData] = useState<any[]>([]);
  const [distributionData, setDistributionData] = useState<any[]>([]);

  const fetchDashboardData = async () => {
    // 1. Get Totals
    const { count: alertsCount } = await supabase.from('alerts').select('*', { count: 'exact', head: true });
    const { count: dronesCount } = await supabase.from('drones').select('*', { count: 'exact', head: true });
    
    setStats(prev => ({ ...prev, alerts: alertsCount || 0, drones: dronesCount || 0 }));

    // 2. Get Distribution by Type
    const { data: alerts } = await supabase.from('alerts').select('type');
    if (alerts) {
      const counts: Record<string, number> = {};
      alerts.forEach(a => counts[a.type] = (counts[a.type] || 0) + 1);
      setDistributionData(Object.entries(counts).map(([name, value]) => ({ name, value })));
    }

    // 3. Get Activity (Last 7 days simulation based on real data)
    // For demo, we group the existing alerts by day name
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const { data: recentAlerts } = await supabase.from('alerts').select('created_at');
    if (recentAlerts) {
      const activityMap: Record<string, number> = { 'Sun': 0, 'Mon': 0, 'Tue': 0, 'Wed': 0, 'Thu': 0, 'Fri': 0, 'Sat': 0 };
      recentAlerts.forEach(a => {
        const day = days[new Date(a.created_at).getDay()];
        activityMap[day]++;
      });
      setChartData(days.map(d => ({ name: d, alerts: activityMap[d] })));
    }
  };

  useEffect(() => {
    fetchDashboardData();

    // Listen for changes
    const sub = supabase.channel('dashboard-stats')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, fetchDashboardData)
      .on('postgres_changes', { event: '*', schema: 'public', table: 'drones' }, fetchDashboardData)
      .subscribe();

    return () => { supabase.removeChannel(sub); };
  }, []);

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
        <StatCard icon={<AlertTriangle className="text-red-400" />} label="Alertes Actives" value={stats.alerts.toString()} trend="+15%" />
        <StatCard icon={<Navigation className="text-blue-400" />} label="Drones en Vol" value={stats.drones.toString()} trend="Stable" />
        <StatCard icon={<Droplets className="text-cyan-400" />} label="Pluviométrie" value={`${stats.humidity}%`} trend="-2%" />
        <StatCard icon={<Zap className="text-amber-400" />} label="Energie Solaire" value={`${stats.energy}%`} trend="Optimal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <h3 className="font-bold mb-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30"><BarChart3 className="w-4 h-4 text-green-500" /> Activité de Surveillance Hebdomadaire</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData.length > 0 ? chartData : [{name: 'Loading', alerts: 0}]}>
                <defs>
                  <linearGradient id="colorAlerts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff20" fontSize={10} fontWeight="bold" />
                <YAxis stroke="#ffffff20" fontSize={10} fontWeight="bold" />
                <Tooltip contentStyle={{ backgroundColor: '#0a0f14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
                <Area type="monotone" dataKey="alerts" stroke="#22c55e" fillOpacity={1} fill="url(#colorAlerts)" strokeWidth={4} animationDuration={2000} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="glass-card p-6 border-white/5">
          <h3 className="font-bold mb-6 text-[10px] uppercase tracking-widest text-white/30">Répartition des Menaces</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={distributionData.length > 0 ? distributionData : [{name: 'Aucune', value: 1}]} innerRadius={70} outerRadius={100} paddingAngle={8} dataKey="value" stroke="none">
                  {distributionData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a0f14', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
             {distributionData.map((d, i) => (
               <div key={d.name} className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-white/40">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i % COLORS.length] }}></div>
                    <span>{d.name}</span>
                  </div>
                  <span className="text-white">{d.value}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
}
