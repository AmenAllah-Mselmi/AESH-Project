import Link from 'next/link';
import { Shield, ArrowRight, TreePine, Eye, Zap, Lock } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#05080a] text-white selection:bg-green-500/30">
      {/* Navigation */}
      <nav className="max-w-7xl mx-auto px-6 py-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-500/20 rounded-lg border border-green-500/30">
            <Shield className="w-6 h-6 text-green-400" />
          </div>
          <span className="text-xl font-bold tracking-tight uppercase">Forest <span className="text-green-500">Guardian</span></span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
          <a href="#" className="hover:text-green-400 transition-colors">Technology</a>
          <a href="#" className="hover:text-green-400 transition-colors">Drones</a>
          <a href="#" className="hover:text-green-400 transition-colors">Case Studies</a>
          <a href="#" className="hover:text-green-400 transition-colors">About</a>
        </div>
        <Link href="/dashboard" className="px-5 py-2 rounded-full bg-green-500 text-black text-sm font-bold hover:bg-green-400 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)]">
          Launch Console
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 pt-20 pb-32 grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 text-xs font-bold mb-6 uppercase tracking-widest">
            <Zap className="w-3 h-3" /> Autonomous AI Surveillance
          </div>
          <h1 className="text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-8">
            Protecting the <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600">Earth's Lungs</span> with AI.
          </h1>
          <p className="text-lg text-white/50 mb-10 max-w-lg leading-relaxed">
            Forest Guardian Drone uses advanced autonomous drones and real-time computer vision to detect illegal logging, fires, and poaching before it's too late.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-white text-black font-bold flex items-center justify-center gap-2 hover:bg-white/90 transition-all">
              Enter Dashboard <ArrowRight className="w-5 h-5" />
            </Link>
            <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2">
              View Live Demo
            </button>
          </div>
          
          <div className="mt-12 flex items-center gap-6">
            <div className="flex -space-x-3">
              {[1,2,3,4].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-[#05080a] bg-white/10"></div>
              ))}
            </div>
            <p className="text-xs text-white/40"><span className="text-white font-bold">50+</span> Governments & NGOs already monitoring</p>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 bg-green-500/10 blur-[100px] rounded-full"></div>
          <div className="relative glass-card aspect-square lg:aspect-video flex items-center justify-center p-8">
             <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-[10px] font-bold uppercase animate-pulse">
               <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div> Live Detection Feed
             </div>
             <div className="text-center">
               <TreePine className="w-24 h-24 text-green-500/20 mx-auto mb-4" />
               <p className="text-white/20 font-mono text-sm tracking-widest">SCANNING SECTOR 7G...</p>
             </div>
             
             {/* Decorative UI elements */}
             <div className="absolute bottom-8 right-8 w-32 h-32 border-r-2 border-b-2 border-green-500/30"></div>
             <div className="absolute top-8 left-8 w-32 h-32 border-l-2 border-t-2 border-green-500/30"></div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white/[0.02] border-y border-white/5 py-24">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-12">
          <FeatureCard 
            icon={<Eye className="w-8 h-8 text-blue-400" />}
            title="Real-time Vision"
            description="YOLOv8 powered computer vision detects chainsaw activity and illegal vehicles with 99.2% accuracy."
          />
          <FeatureCard 
            icon={<Zap className="w-8 h-8 text-amber-400" />}
            title="Instant Alerts"
            description="Automatic notifications via SMS, WhatsApp, and email to local authorities and forest guards."
          />
          <FeatureCard 
            icon={<Lock className="w-8 h-8 text-green-400" />}
            title="Blockchain Proof"
            description="All detections are hashed and stored on-chain to provide immutable evidence for legal proceedings."
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 text-center border-t border-white/5 mt-20">
        <p className="text-white/20 text-sm">© 2026 Forest Guardian Drone Project. Built for the Planet.</p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: any, title: string, description: string }) {
  return (
    <div className="p-8 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all group">
      <div className="mb-6 p-4 bg-white/5 rounded-xl w-fit group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-white/40 leading-relaxed">{description}</p>
    </div>
  );
}
