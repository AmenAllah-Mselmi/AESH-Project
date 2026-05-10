"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Shield, Lock, Mail, User, Phone, Briefcase } from 'lucide-react';

type AuthMode = 'signin' | 'signup';

const ROLES_ALLOWED_FOR_SIGNUP = [
  { id: 'forest_guard', label: 'Garde Forestier (Requiert Validation)' },
  { id: 'NGO', label: 'ONG Environnementale' },
  { id: 'scientist', label: 'Chercheur / Scientifique' },
  { id: 'citizen', label: 'Communauté Locale / Citoyen' },
];

const DEMO_ACCOUNTS = [
  { role: 'Admin', email: 'administrator@forest.gov', pass: 'admin123', icon: '🛡️' },
  { role: 'Police', email: 'commandant@agency.gov', pass: 'police123', icon: '👮' },
  { role: 'Garde', email: 'ranger@forest.gov', pass: 'guard123', icon: '🌲' },
  { role: 'NGO', email: 'ngo@nature.org', pass: 'ngo123', icon: '🌍' },
  { role: 'Science', email: 'science@lab.org', pass: 'science123', icon: '🧬' },
  { role: 'Tech', email: 'maintenance@drones.com', pass: 'tech123', icon: '🔧' },
  { role: 'Citizen', email: 'citizen@tunisie.tn', pass: 'citizen123', icon: '👤' },
  { role: 'Gov', email: 'gov@ministere.gov', pass: 'gov123', icon: '🏛️' },
];

export default function AuthForm({ mode }: { mode: AuthMode }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState('citizen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showDemo, setShowDemo] = useState(false);
  const router = useRouter();

  const fillDemo = (e: string, p: string) => {
    setEmail(e);
    setPassword(p);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (mode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone: phone,
              role: role,
              is_validated: role === 'citizen' || role === 'NGO' || role === 'scientist' ? true : false,
            }
          }
        });
        if (error) throw error;
        alert('Inscription réussie ! Vérifiez vos emails.');
        router.push('/login');
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 glass-card">
      <div className="flex justify-center mb-8">
        <div className="p-3 bg-green-500/20 rounded-2xl border border-green-500/30">
          <Shield className="w-8 h-8 text-green-500" />
        </div>
      </div>
      
      <h2 className="text-2xl font-bold text-center mb-2 uppercase tracking-tight">
        {mode === 'signin' ? 'Connexion Console' : 'Créer un Compte'}
      </h2>
      <p className="text-white/40 text-center text-sm mb-8">
        {mode === 'signin' ? 'Accédez au système de surveillance Forest Guardian' : 'Rejoignez le réseau de protection des forêts'}
      </p>

      {error && (
        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleAuth} className="space-y-4">
        {mode === 'signup' && (
          <>
            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase ml-1">Nom Complet</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500/50 transition-all text-sm"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase ml-1">Téléphone</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <input
                  type="tel"
                  required
                  placeholder="+216 ..."
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500/50 transition-all text-sm"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-white/40 uppercase ml-1">Rôle</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
                <select
                  className="w-full bg-[#0a0f14] border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500/50 transition-all text-sm appearance-none"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  {ROLES_ALLOWED_FOR_SIGNUP.map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </>
        )}

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase ml-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="email"
              required
              placeholder="name@agency.gov"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500/50 transition-all text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold text-white/40 uppercase ml-1">Mot de passe</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              type="password"
              required
              placeholder="••••••••"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-green-500/50 transition-all text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(34,197,94,0.2)] disabled:opacity-50 disabled:cursor-not-allowed mt-4"
        >
          {loading ? 'Traitement...' : mode === 'signin' ? 'Se Connecter' : 'Créer le Compte'}
        </button>
      </form>

      <div className="mt-8 text-center text-sm">
        <span className="text-white/20">
          {mode === 'signin' ? "Vous n'avez pas de compte ?" : "Vous avez déjà un compte ?"}
        </span>
        <button
          onClick={() => router.push(mode === 'signin' ? '/signup' : '/login')}
          className="ml-2 text-green-500 hover:underline font-bold"
        >
          {mode === 'signin' ? "S'inscrire" : "Se connecter"}
        </button>
      </div>
      
      {mode === 'signin' && (
        <div className="mt-6 pt-6 border-t border-white/5">
          <button 
            type="button"
            onClick={() => setShowDemo(!showDemo)}
            className="w-full text-[10px] text-white/20 uppercase tracking-widest hover:text-green-500 transition-colors mb-4"
          >
            {showDemo ? 'Cacher les Comptes de Test' : 'Afficher les Comptes de Test'}
          </button>
          
          {showDemo && (
            <div className="grid grid-cols-2 gap-2 mb-4">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.email}
                  type="button"
                  onClick={() => fillDemo(acc.email, acc.pass)}
                  className="p-2 bg-white/5 border border-white/10 rounded-lg text-left hover:border-green-500/50 transition-all group"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs">{acc.icon}</span>
                    <span className="text-[10px] font-bold text-white/60 group-hover:text-green-500">{acc.role}</span>
                  </div>
                  <div className="text-[9px] text-white/30 truncate">{acc.email}</div>
                </button>
              ))}
            </div>
          )}
          
          <p className="text-[10px] text-white/20 uppercase tracking-widest text-center">
            Certains rôles (Admin, Police, Tech) ne peuvent être créés que par le système.
          </p>
        </div>
      )}
    </div>
  );
}
