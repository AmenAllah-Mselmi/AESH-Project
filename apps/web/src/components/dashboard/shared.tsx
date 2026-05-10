"use client";

import React from 'react';
import { Shield } from 'lucide-react';

export function StatCard({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) {
  return (
    <div className="glass-card p-6 group hover:border-white/20 transition-all">
      <div className="flex justify-between items-start mb-6">
        <div className="p-3 bg-white/5 rounded-2xl group-hover:bg-white/10 transition-colors">{icon}</div>
        <div className="text-[10px] font-bold bg-green-500/10 border border-green-500/20 px-3 py-1 rounded-full text-green-400 uppercase tracking-widest">{trend}</div>
      </div>
      <p className="text-white/30 text-[10px] font-black uppercase tracking-widest">{label}</p>
      <h4 className="text-3xl font-black mt-2 tracking-tighter">{value}</h4>
    </div>
  );
}

export function Logo() {
  return (
    <div className="flex items-center gap-3 mb-12">
      <div className="p-2.5 bg-green-500/20 rounded-2xl border border-green-500/30"><Shield className="w-7 h-7 text-green-400 shadow-glow" /></div>
      <h1 className="text-2xl font-black tracking-tighter">FOREST <span className="text-green-500">GUARDIAN</span></h1>
    </div>
  );
}

export function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#05080a] flex flex-col items-center justify-center gap-6">
      <div className="relative">
        <div className="w-16 h-16 rounded-full border-t-2 border-green-500 animate-spin"></div>
        <Shield className="absolute inset-0 m-auto w-6 h-6 text-green-500/40" />
      </div>
      <p className="text-[10px] text-white/20 uppercase tracking-[0.4em] font-bold animate-pulse">Chargement des Systèmes...</p>
    </div>
  );
}
