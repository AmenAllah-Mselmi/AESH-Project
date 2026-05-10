"use client";

import React from 'react';
import { Zap, Activity, HardDrive, Wind, AlertTriangle, Settings } from 'lucide-react';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { StatCard } from '../shared';

const techData = [
  { time: '10:00', temp: 42, battery: 85 },
  { time: '10:30', temp: 45, battery: 70 },
  { time: '11:00', temp: 48, battery: 60 },
  { time: '11:30', temp: 44, battery: 55 },
];

export default function TechnicianDashboard() {
  return (
    <div className="space-y-8 animate-in zoom-in-95 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard icon={<Zap className="text-amber-400" />} label="État Batterie Moyenne" value="82%" trend="Nominal" />
        <StatCard icon={<Activity className="text-green-400" />} label="RPM Moteurs" value="12,400" trend="Sync OK" />
        <StatCard icon={<HardDrive className="text-blue-400" />} label="Stockage Local" value="1.2TB" trend="Purge auto" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
             <Settings className="w-64 h-64 animate-spin-slow" />
           </div>
           <h3 className="text-xl font-bold mb-8 flex items-center gap-2"><Wind className="w-6 h-6 text-cyan-400" /> Télémétrie Hardware en Temps Réel</h3>
           <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={techData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" />
                  <XAxis dataKey="time" stroke="#ffffff20" />
                  <YAxis stroke="#ffffff20" />
                  <Tooltip />
                  <Line type="monotone" dataKey="temp" stroke="#ef4444" strokeWidth={4} dot={false} />
                  <Line type="monotone" dataKey="battery" stroke="#3b82f6" strokeWidth={4} dot={false} />
                </LineChart>
              </ResponsiveContainer>
           </div>
           <div className="flex gap-8 mt-8">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full"></div> <span className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Température (°C)</span></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full"></div> <span className="text-[10px] font-bold uppercase text-white/40 tracking-widest">Tension Batterie (V)</span></div>
           </div>
        </div>

        <div className="glass-card p-6 flex flex-col justify-between border-amber-500/20 bg-amber-500/5">
            <h3 className="font-bold mb-6 flex items-center gap-2 text-amber-500"><AlertTriangle className="w-5 h-5" /> État de la Flotte</h3>
            <div className="space-y-4 flex-1">
               {[
                 { name: 'Guardian-01', bat: 94, status: 'Patrouille' },
                 { name: 'Guardian-02', bat: 12, status: 'Charge' },
                 { name: 'Guardian-03', bat: 65, status: 'Patrouille' },
                 { name: 'Guardian-04', bat: 45, status: 'Alerte' },
               ].map((d) => (
                 <div key={d.name} className="flex flex-col gap-2 p-3 bg-black/20 rounded-xl border border-white/5">
                    <div className="flex justify-between items-center text-[10px] font-black uppercase">
                      <span>{d.name}</span>
                      <span className={d.bat < 20 ? 'text-red-500' : 'text-green-400'}>{d.bat}%</span>
                    </div>
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full transition-all ${d.bat < 20 ? 'bg-red-500' : 'bg-green-500'}`} style={{ width: `${d.bat}%` }}></div>
                    </div>
                    <span className="text-[9px] text-white/30 uppercase tracking-widest">{d.status}</span>
                 </div>
               ))}
            </div>
            <button className="w-full mt-6 py-3 bg-amber-500 text-black font-bold rounded-xl text-xs uppercase tracking-widest">Update Firmware v6.1</button>
        </div>
      </div>
    </div>
  );
}
