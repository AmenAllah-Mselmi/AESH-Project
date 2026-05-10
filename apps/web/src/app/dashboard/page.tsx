"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  Shield, Map as MapIcon, AlertTriangle, Activity, Zap, Navigation, 
  Bell, Settings, User, Camera, Database, HardDrive, Globe, Users, Droplets, MessageSquare
} from 'lucide-react';

// Shared & Role Components
import { Logo, LoadingScreen } from '@/components/dashboard/shared';
import { SystemControls } from '@/components/dashboard/SystemControls';
import { ChatSystem } from '@/components/dashboard/ChatSystem';
import OverviewDashboard from '@/components/dashboard/roles/OverviewDashboard';
import GovernmentDashboard from '@/components/dashboard/roles/GovernmentDashboard';
import AdminDashboard from '@/components/dashboard/roles/AdminDashboard';
import PoliceDashboard from '@/components/dashboard/roles/PoliceDashboard';
import ForestGuardDashboard from '@/components/dashboard/roles/ForestGuardDashboard';
import NGODashboard from '@/components/dashboard/roles/NGODashboard';
import ResearchersDashboard from '@/components/dashboard/roles/ResearchersDashboard';
import TechnicianDashboard from '@/components/dashboard/roles/TechnicianDashboard';
import CitizenDashboard from '@/components/dashboard/roles/CitizenDashboard';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/login');
        return;
      }
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(profile);
      
      // Intelligent Landing: Set default tab based on role
      if (profile) {
        const defaultTabs: Record<string, string> = {
          'gov_super_admin': 'national',
          'admin': 'admin',
          'police': 'police',
          'forest_guard': 'live',
          'NGO': 'ngo',
          'scientist': 'science',
          'technician': 'tech',
          'citizen': 'citizen'
        };
        setActiveTab(defaultTabs[profile.role] || 'overview');
      }
      
      setLoading(false);
    };
    checkUser();
  }, [router]);

  const refreshProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      setProfile(profile);
    }
  };

  if (loading) return <LoadingScreen />;
  if (profile && !profile.is_validated && profile.role !== 'citizen') return <PendingScreen router={router} />;

  return (
    <div className="flex min-h-screen bg-[#05080a] text-white selection:bg-green-500/30">
      {/* Sidebar */}
      <aside className="w-72 border-r border-white/5 bg-black/40 backdrop-blur-3xl p-8 flex flex-col fixed h-full z-50">
        <Logo />
        <nav className="flex-1 space-y-3">
          <NavItem icon={<Activity />} label="Aperçu Global" active={activeTab === 'overview'} onClick={() => setActiveTab('overview')} />
          
          {/* Role Based Navigation */}
          {profile?.role === 'gov_super_admin' && <NavItem icon={<Globe />} label="Gouvernement" active={activeTab === 'national'} onClick={() => setActiveTab('national')} />}
          {profile?.role === 'admin' && <NavItem icon={<Shield />} label="Plateforme" active={activeTab === 'admin'} onClick={() => setActiveTab('admin')} />}
          {(profile?.role === 'police' || profile?.role === 'admin' || profile?.role === 'gov_super_admin') && <NavItem icon={<AlertTriangle />} label="Police" active={activeTab === 'police'} onClick={() => setActiveTab('police')} />}
          {(profile?.role === 'forest_guard' || profile?.role === 'admin' || profile?.role === 'gov_super_admin') && <NavItem icon={<Camera />} label="Garde" active={activeTab === 'live'} onClick={() => setActiveTab('live')} />}
          {(profile?.role === 'NGO' || profile?.role === 'admin' || profile?.role === 'gov_super_admin') && <NavItem icon={<Droplets />} label="Impact ONG" active={activeTab === 'ngo'} onClick={() => setActiveTab('ngo')} />}
          {(profile?.role === 'scientist' || profile?.role === 'admin' || profile?.role === 'gov_super_admin') && <NavItem icon={<Database />} label="Recherche" active={activeTab === 'science'} onClick={() => setActiveTab('science')} />}
          {(profile?.role === 'technician' || profile?.role === 'admin') && <NavItem icon={<HardDrive />} label="Maintenance" active={activeTab === 'tech'} onClick={() => setActiveTab('tech')} />}
          {profile?.role === 'citizen' && <NavItem icon={<Users />} label="Communauté" active={activeTab === 'citizen'} onClick={() => setActiveTab('citizen')} />}
          
          <NavItem icon={<MapIcon />} label="Carte Interactive" active={activeTab === 'map'} onClick={() => setActiveTab('map')} />
          <NavItem icon={<MessageSquare />} label="Messagerie" active={activeTab === 'messages'} onClick={() => setActiveTab('messages')} />
        </nav>
        <FooterNav profile={profile} onLogout={() => supabase.auth.signOut().then(() => router.push('/login'))} onProfile={() => setActiveTab('profile')} />
      </aside>

      <main className="flex-1 ml-72 p-10 overflow-y-auto">
        <Header profile={profile} />
        {activeTab === 'overview' && <OverviewDashboard role={profile?.role} />}
        {activeTab === 'national' && <GovernmentDashboard />}
        {activeTab === 'admin' && <AdminDashboard />}
        {activeTab === 'police' && <PoliceDashboard />}
        {activeTab === 'live' && <ForestGuardDashboard />}
        {activeTab === 'ngo' && <NGODashboard />}
        {activeTab === 'science' && <ResearchersDashboard />}
        {activeTab === 'tech' && <TechnicianDashboard />}
        {activeTab === 'citizen' && <CitizenDashboard />}
        {activeTab === 'messages' && <ChatSystem />}
        {activeTab === 'map' && <RealTimeMap />}
        {activeTab === 'profile' && <ProfileView profile={profile} onUpdate={refreshProfile} />}
      </main>

      <SystemControls />
    </div>
  );
}

// --- INTERNAL COMPONENTS ---

function NavItem({ icon, label, active = false, onClick }: any) {
  return (
    <button onClick={onClick} className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group ${active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'text-white/30 hover:text-white/80 hover:bg-white/5'}`}>
      <span className={`${active ? 'text-green-400' : 'group-hover:text-green-500'}`}>{icon}</span> 
      <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
    </button>
  );
}

function Header({ profile }: any) {
  return (
    <header className="flex justify-between items-center mb-12">
      <div className="space-y-1">
        <h2 className="text-3xl font-black uppercase tracking-tighter">Console {profile?.role?.replace('_', ' ')}</h2>
        <p className="text-[10px] text-white/30 uppercase tracking-widest font-bold font-mono">Session Active • Système Sécurisé</p>
      </div>
      <div className="flex items-center gap-4 p-1 pr-6 rounded-full bg-white/2 border border-white/5">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center font-black text-xs shadow-lg">{profile?.full_name?.charAt(0)}</div>
        <div className="flex flex-col"><span className="font-bold text-sm leading-none">{profile?.full_name}</span><span className="text-[10px] text-white/20 uppercase font-bold tracking-widest mt-1">Status: En Ligne</span></div>
      </div>
    </header>
  );
}

function FooterNav({ profile, onLogout, onProfile }: any) {
  return (
    <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-3">
      <NavItem icon={<Settings />} label="Paramètres" />
      <NavItem icon={<User />} label="Profil" onClick={onProfile} />
      <button onClick={onLogout} className="text-[10px] text-red-500/40 hover:text-red-500 mt-6 uppercase font-black tracking-widest text-left px-4 transition-all">DÉCONNEXION</button>
    </div>
  );
}

function PendingScreen({ router }: any) {
  return (
    <div className="min-h-screen bg-[#05080a] flex items-center justify-center p-6 text-center">
      <div className="max-w-md glass-card p-10 border-amber-500/30">
        <Shield className="w-16 h-16 text-amber-500 mx-auto mb-6 opacity-50" />
        <h2 className="text-2xl font-bold mb-4 uppercase">Compte en Attente</h2>
        <p className="text-white/40 mb-8 text-sm">Validation administrative requise pour votre rôle.</p>
        <button onClick={() => supabase.auth.signOut().then(() => router.push('/login'))} className="px-8 py-3 bg-amber-500/10 border border-amber-500/20 text-amber-500 font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-amber-500/20 transition-all">Quitter</button>
      </div>
    </div>
  );
}

function RealTimeMap() {
  const [drones, setDrones] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: dronesData } = await supabase.from('drones').select('*');
      const { data: alertsData } = await supabase.from('alerts').select('*');
      if (dronesData) setDrones(dronesData);
      if (alertsData) setAlerts(alertsData);
    };
    fetchData();

    const droneSub = supabase.channel('drones-ch').on('postgres_changes', { event: '*', schema: 'public', table: 'drones' }, fetchData).subscribe();
    const alertSub = supabase.channel('alerts-ch').on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, fetchData).subscribe();

    return () => {
      supabase.removeChannel(droneSub);
      supabase.removeChannel(alertSub);
    };
  }, []);

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Carte de Surveillance Géo-Spatiale</h3>
        <div className="flex gap-4 text-xs font-mono">
           <div className="flex items-center gap-2 text-blue-400"><div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div> DRONES: {drones.length}</div>
           <div className="flex items-center gap-2 text-red-400"><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div> ALERTES: {alerts.length}</div>
        </div>
      </div>
      <div className="flex-1 glass-card relative bg-[#0a0f14] overflow-hidden min-h-[550px]">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <Globe className="w-32 h-32 text-green-500/10" />
            <div className="absolute text-[10px] text-white/5 uppercase tracking-[1em] font-bold mt-48">Scanning Territory...</div>
        </div>
        
        {/* Simplified Visualization of markers */}
        {drones.map((d, i) => (
          <div key={d.id} className="absolute transition-all duration-1000" style={{ left: `${20 + (i*15)}%`, top: `${30 + (i*10)}%` }}>
            <Navigation className="w-6 h-6 text-blue-400 rotate-45 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function ProfileView({ profile, onUpdate }: { profile: any, onUpdate: () => void }) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile?.full_name || '');
  const [phone, setPhone] = useState(profile?.phone || '');

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    await supabase.from('profiles').update({ full_name: fullName, phone: phone }).eq('id', profile.id);
    setIsEditing(false);
    onUpdate();
  };

  return (
    <div className="max-w-3xl mx-auto py-10 animate-in slide-in-from-bottom-8 duration-700">
      <div className="glass-card p-12 border-green-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5"><Shield className="w-48 h-48 text-green-500" /></div>
        <div className="flex items-center gap-10 mb-12">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-green-500 to-emerald-400 flex items-center justify-center text-3xl font-black shadow-2xl">{profile?.full_name?.charAt(0)}</div>
          <div>
            <h3 className="text-3xl font-black tracking-tighter">{profile?.full_name}</h3>
            <p className="text-green-500 font-bold uppercase tracking-[0.2em] text-xs">{profile?.role?.replace('_', ' ')}</p>
          </div>
        </div>

        <form onSubmit={handleUpdate} className="space-y-8">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <div className="space-y-2">
               <label className="text-[10px] text-white/30 uppercase font-black tracking-widest">Nom Complet</label>
               <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} disabled={!isEditing} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-green-500/50 outline-none transition-all disabled:opacity-50" />
             </div>
             <div className="space-y-2">
               <label className="text-[10px] text-white/30 uppercase font-black tracking-widest">Téléphone</label>
               <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-green-500/50 outline-none transition-all disabled:opacity-50" />
             </div>
           </div>
           <div className="pt-8 border-t border-white/5 flex gap-4">
             {!isEditing ? (
               <button type="button" onClick={() => setIsEditing(true)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Modifier Profile</button>
             ) : (
               <>
                 <button type="submit" className="px-8 py-3 bg-green-500 text-black font-bold rounded-xl text-xs uppercase tracking-widest hover:bg-green-400 transition-all">Enregistrer</button>
                 <button type="button" onClick={() => setIsEditing(false)} className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Annuler</button>
               </>
             )}
           </div>
        </form>
      </div>
    </div>
  );
}
