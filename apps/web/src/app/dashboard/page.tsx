"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { 
  Shield, Map as MapIcon, AlertTriangle, Activity, Zap, Navigation, 
  Bell, Settings, User, Camera, Database, HardDrive, Globe, Users, Droplets, MessageSquare, X
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
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showToast, setShowToast] = useState<any>(null);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
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
      
      // Load initial notifications
      const { data: alerts } = await supabase.from('alerts').select('*').order('created_at', { ascending: false }).limit(10);
      if (alerts) setNotifications(alerts);

      setLoading(false);
    };
    checkUser();

    // Global Alert Listener
    const alertSub = supabase.channel('global-alerts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'alerts' }, (payload) => {
        setNotifications(prev => [payload.new, ...prev]);
        setShowToast(payload.new);
        setTimeout(() => setShowToast(null), 8000);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(alertSub);
    };
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
          
          <NavItem 
            icon={<Bell />} 
            label="Centre d'Alertes" 
            active={activeTab === 'alerts'} 
            onClick={() => setActiveTab('alerts')}
            badge={notifications.length > 0 ? notifications.length : null}
          />
        </nav>
        <FooterNav profile={profile} onLogout={() => supabase.auth.signOut().then(() => router.push('/login'))} onProfile={() => setActiveTab('profile')} />
      </aside>

      <main className="flex-1 ml-72 p-10 overflow-y-auto relative">
        {/* Global Toast */}
        {showToast && (
          <div className="fixed top-10 right-10 z-[100] glass-card p-5 border-red-500/50 bg-red-950/40 backdrop-blur-3xl animate-in slide-in-from-right-10 duration-500 flex items-center gap-5 shadow-[0_0_50px_rgba(239,68,68,0.4)] border-2 cursor-pointer" onClick={() => { setSelectedAlert(showToast); setShowToast(null); }}>
            <div className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center animate-bounce shadow-lg">
              <AlertTriangle className="w-7 h-7 text-white" />
            </div>
            <div className="pr-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-400 mb-1">Alerte Critique Détectée</p>
              <p className="text-lg font-black text-white uppercase tracking-tighter">{showToast.type}</p>
              <p className="text-[11px] text-white/60 font-mono">Cliquer pour voir les images</p>
            </div>
            <button onClick={(e) => { e.stopPropagation(); setShowToast(null); }} className="absolute top-4 right-4 p-1 hover:bg-white/10 rounded-full transition-colors"><X className="w-4 h-4 text-white/40 hover:text-white" /></button>
          </div>
        )}

        {/* Alert Detail Modal */}
        {selectedAlert && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-[#05080a]/90 backdrop-blur-md animate-in fade-in duration-300">
             <div className="w-full max-w-4xl glass-card border-white/10 overflow-hidden relative shadow-[0_0_100px_rgba(34,197,94,0.1)]">
                <button onClick={() => setSelectedAlert(null)} className="absolute top-6 right-6 z-10 w-10 h-10 bg-black/60 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors border border-white/10"><X className="w-5 h-5 text-white" /></button>
                
                <div className="grid grid-cols-1 md:grid-cols-2">
                   <div className="aspect-square bg-black relative">
                      <img src={selectedAlert.image_url || 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2013'} alt="Detection Evidence" className="w-full h-full object-cover opacity-80" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                      <div className="absolute bottom-6 left-6 flex items-center gap-2">
                        <div className="px-3 py-1 bg-red-500 text-white text-[10px] font-black rounded uppercase">Preuve visuelle IA</div>
                        <div className="px-3 py-1 bg-black/60 text-white/60 text-[10px] font-mono rounded uppercase border border-white/10">Ref: {selectedAlert.id?.slice(0,8)}</div>
                      </div>
                   </div>
                   <div className="p-10 flex flex-col justify-center">
                      <div className="space-y-6">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-green-500 mb-2">Détection de Menace</p>
                          <h3 className="text-4xl font-black italic uppercase tracking-tighter text-white">{selectedAlert.type}</h3>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                           <div className="p-4 bg-white/2 rounded-2xl border border-white/5">
                              <p className="text-[8px] uppercase font-bold text-white/20 mb-1">Latitude</p>
                              <p className="text-lg font-mono font-bold text-blue-400">{selectedAlert.latitude?.toFixed(6)}</p>
                           </div>
                           <div className="p-4 bg-white/2 rounded-2xl border border-white/5">
                              <p className="text-[8px] uppercase font-bold text-white/20 mb-1">Longitude</p>
                              <p className="text-lg font-mono font-bold text-blue-400">{selectedAlert.longitude?.toFixed(6)}</p>
                           </div>
                        </div>

                        <div className="space-y-3">
                           <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                              <span className="text-white/40 uppercase font-bold tracking-widest">Date & Heure</span>
                              <span className="font-mono">{new Date(selectedAlert.created_at).toLocaleString()}</span>
                           </div>
                           <div className="flex justify-between items-center text-xs border-b border-white/5 pb-3">
                              <span className="text-white/40 uppercase font-bold tracking-widest">Drone Assigné</span>
                              <span className="font-bold text-blue-400">UNIT-AIR-09</span>
                           </div>
                           <div className="flex justify-between items-center text-xs">
                              <span className="text-white/40 uppercase font-bold tracking-widest">Statut</span>
                              <span className="px-2 py-0.5 bg-red-500/10 text-red-500 rounded font-black text-[10px] uppercase">En attente d'intervention</span>
                           </div>
                        </div>

                        <div className="pt-6 flex gap-4">
                           <button className="flex-1 py-4 bg-red-500 text-black font-black rounded-xl text-xs uppercase tracking-widest hover:bg-red-400 transition-all shadow-[0_0_30px_rgba(239,68,68,0.3)]">Dépêcher Police</button>
                           <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all">Archiver</button>
                        </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        )}

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
        {activeTab === 'map' && <RealTimeMap onSelectAlert={setSelectedAlert} />}
        {activeTab === 'alerts' && <AlertCenter alerts={notifications} onSelectAlert={setSelectedAlert} />}
        {activeTab === 'profile' && <ProfileView profile={profile} onUpdate={refreshProfile} />}
      </main>

      <SystemControls />
    </div>
  );
}

// --- INTERNAL COMPONENTS ---

function NavItem({ icon, label, active = false, onClick, badge }: any) {
  return (
    <button onClick={onClick} className={`w-full flex justify-between items-center px-4 py-3.5 rounded-xl transition-all duration-300 group ${active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'text-white/30 hover:text-white/80 hover:bg-white/5'}`}>
      <div className="flex items-center gap-3">
        <span className={`${active ? 'text-green-400' : 'group-hover:text-green-500'}`}>{icon}</span> 
        <span className="font-bold text-xs uppercase tracking-widest">{label}</span>
      </div>
      {badge && (
        <span className="bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-full animate-pulse shadow-[0_0_10px_rgba(239,68,68,0.5)]">
          {badge}
        </span>
      )}
    </button>
  );
}

function AlertCenter({ alerts, onSelectAlert }: { alerts: any[], onSelectAlert: (alert: any) => void }) {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-black italic tracking-tighter uppercase mb-2">Historique des Alertes</h2>
          <p className="text-white/30 text-xs font-bold uppercase tracking-widest">Registre complet des détections IA • Temps Réel</p>
        </div>
        <div className="flex gap-4">
           <div className="px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-[10px] font-black uppercase tracking-widest">
             {alerts.length} ALERTES TOTALES
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {alerts.length === 0 ? (
          <div className="glass-card p-20 text-center border-white/5 opacity-20">
            <Bell className="w-16 h-16 mx-auto mb-4" />
            <p className="font-bold uppercase tracking-widest text-sm">Aucune alerte récente</p>
          </div>
        ) : (
          alerts.map((alert) => (
            <div key={alert.id} onClick={() => onSelectAlert(alert)} className="glass-card p-6 border-white/5 hover:border-red-500/20 transition-all group flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 bg-red-500/10 rounded-2xl flex items-center justify-center border border-red-500/20 group-hover:bg-red-500 group-hover:text-black transition-all">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-black text-lg uppercase tracking-tighter">{alert.type}</h4>
                    <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[8px] font-black rounded uppercase">Critique</span>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-white/40 font-bold uppercase tracking-widest">
                    <span className="flex items-center gap-1"><MapIcon className="w-3 h-3" /> {alert.latitude}, {alert.longitude}</span>
                    <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Drone: {alert.drone_id?.slice(0,8) || 'UNIT-01'}</span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-mono text-white/20 mb-2">{new Date(alert.created_at).toLocaleString()}</p>
                <button className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all">Voir Preuves</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
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

function RealTimeMap({ onSelectAlert }: { onSelectAlert: (alert: any) => void }) {
  const [drones, setDrones] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  const fetchData = async () => {
    const { data: dronesData } = await supabase.from('drones').select('*');
    const { data: alertsData } = await supabase.from('alerts').select('*').order('created_at', { ascending: false });
    if (dronesData) setDrones(dronesData);
    if (alertsData) setAlerts(alertsData);
  };

  useEffect(() => {
    fetchData();
    const droneSub = supabase.channel('drones-map').on('postgres_changes', { event: '*', schema: 'public', table: 'drones' }, fetchData).subscribe();
    const alertSub = supabase.channel('alerts-map').on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, fetchData).subscribe();
    return () => {
      supabase.removeChannel(droneSub);
      supabase.removeChannel(alertSub);
    };
  }, []);

  // Map coordinates to percentage (Center around Tunisia Forest areas)
  // Ref: Lat 36.8, Lng 10.3
  const mapCoords = (lat: number, lng: number) => {
    const minLat = 36.6, maxLat = 37.0;
    const minLng = 10.1, maxLng = 10.5;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100; // Invert Y
    
    return { 
      x: Math.max(5, Math.min(95, x)), 
      y: Math.max(5, Math.min(95, y)) 
    };
  };

  return (
    <div className="space-y-6 h-full flex flex-col animate-in fade-in duration-700">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-black uppercase tracking-tighter italic flex items-center gap-3">
            <Globe className="w-6 h-6 text-green-500 animate-spin-slow" />
            Interface Géo-Spatiale Alpha-01
          </h3>
          <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest mt-1">Données Satellite Multi-Spectrales • Résolution 15cm</p>
        </div>
        <div className="flex gap-6">
           <div className="glass-card px-4 py-2 flex items-center gap-3 border-blue-500/20">
             <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse shadow-[0_0_10px_#3b82f6]"></div>
             <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{drones.length} Unités Air</span>
           </div>
           <div className="glass-card px-4 py-2 flex items-center gap-3 border-red-500/20">
             <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_10px_#ef4444]"></div>
             <span className="text-[10px] font-black text-red-400 uppercase tracking-widest">{alerts.length} Incidents</span>
           </div>
        </div>
      </div>

      <div className="flex-1 glass-card relative bg-[#0a0f14] overflow-hidden min-h-[600px] border-white/5 cursor-crosshair">
        {/* Real Satellite Forest Background */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2071')] bg-cover opacity-40 grayscale-[0.5] hover:grayscale-0 transition-all duration-1000 scale-110"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#05080a] via-transparent to-[#05080a]/50"></div>
        
        {/* Scanner Radar Effect */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-green-500/10 rounded-full animate-ping-slow"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-green-500/5 rounded-full"></div>
          <div className="absolute top-0 left-0 right-0 h-[1px] bg-green-500/20 animate-scan shadow-[0_0_15px_rgba(34,197,94,0.5)]"></div>
        </div>

        {/* Tactical Grid */}
        <div className="absolute inset-0 grid grid-cols-12 grid-rows-12 pointer-events-none opacity-[0.05]">
          {Array.from({ length: 144 }).map((_, i) => (
            <div key={i} className="border border-white/20 relative group">
               <span className="absolute top-1 left-1 text-[6px] text-white/20 font-mono hidden group-hover:block">{i.toString(16).toUpperCase()}</span>
            </div>
          ))}
        </div>
        
        {/* Drones Visualization */}
        {drones.map((d) => {
          const pos = mapCoords(d.latitude || 36.8, d.longitude || 10.3);
          return (
            <div key={d.id} className="absolute transition-all duration-1000 group z-20" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
              <div className="relative -translate-x-1/2 -translate-y-1/2">
                <Navigation className="w-7 h-7 text-blue-400 rotate-45 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)] group-hover:scale-125 transition-transform" />
                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 border border-blue-500/40 p-2 rounded-lg text-[9px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-xl backdrop-blur-md">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-white uppercase">{d.name}</span>
                  </div>
                  <div className="space-y-0.5 text-white/50">
                    <p>BAT: {d.battery}%</p>
                    <p>ALT: 120m</p>
                    <p className="text-blue-400 font-mono">{d.latitude?.toFixed(4)}, {d.longitude?.toFixed(4)}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Alerts Visualization */}
        {alerts.map((a) => {
          const pos = mapCoords(a.latitude || 36.8, a.longitude || 10.3);
          return (
            <div key={a.id} onClick={() => onSelectAlert(a)} className="absolute transition-all duration-700 group z-30 cursor-pointer" style={{ left: `${pos.x}%`, top: `${pos.y}%` }}>
               <div className="relative -translate-x-1/2 -translate-y-1/2">
                 <div className="absolute inset-0 w-12 h-12 -left-3 -top-3 bg-red-500/30 rounded-full animate-ping"></div>
                 <div className="absolute inset-0 w-16 h-16 -left-5 -top-5 bg-red-500/10 rounded-full animate-pulse"></div>
                 <AlertTriangle className="w-8 h-8 text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.8)] group-hover:scale-110 transition-transform" />
                 <div className="absolute top-10 left-1/2 -translate-x-1/2 bg-red-600/95 border border-red-400/50 p-3 rounded-xl text-[10px] font-black whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all shadow-2xl backdrop-blur-md min-w-[150px]">
                  <p className="text-red-200 mb-1 tracking-widest uppercase text-[8px]">Cliquer pour voir l'image</p>
                  <p className="text-white text-sm mb-2 uppercase">{a.type}</p>
                  <div className="flex justify-between border-t border-white/10 pt-2 text-white/60 font-mono text-[9px]">
                    <span>{a.latitude?.toFixed(4)}</span>
                    <span>{a.longitude?.toFixed(4)}</span>
                  </div>
                </div>
               </div>
            </div>
          );
        })}

        {/* Map UI Overlay */}
        <div className="absolute bottom-6 left-6 flex flex-col gap-2 z-40">
           <div className="glass-card p-3 border-white/10 bg-black/60 backdrop-blur-md">
             <div className="flex items-center gap-2 mb-2">
               <div className="w-3 h-3 bg-green-500/20 rounded-sm border border-green-500/50"></div>
               <span className="text-[9px] font-bold uppercase text-white/60">Couverture Forestière: 88%</span>
             </div>
             <div className="flex items-center gap-2">
               <div className="w-3 h-3 bg-red-500/20 rounded-sm border border-red-500/50"></div>
               <span className="text-[9px] font-bold uppercase text-white/60">Zones de Risque: 12%</span>
             </div>
           </div>
        </div>

        <div className="absolute bottom-6 right-6 z-40 space-y-2">
           <button className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white/10 transition-colors text-white/60">+</button>
           <button className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white/10 transition-colors text-white/60">-</button>
           <button className="w-10 h-10 glass-card flex items-center justify-center hover:bg-white/10 transition-colors text-green-500"><Navigation className="w-4 h-4" /></button>
        </div>
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
