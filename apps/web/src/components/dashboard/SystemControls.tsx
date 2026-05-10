"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, ShieldAlert, Globe, Moon, Sun, X, Send, Loader2 } from 'lucide-react';

export function SystemControls() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [language, setLanguage] = useState('FR');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Bonjour ! Je suis l'IA de surveillance Forest Guardian. Comment puis-je vous aider aujourd'hui ?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;

    const userMsg = { id: Date.now(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    const query = inputValue.toLowerCase();
    setInputValue('');
    
    setIsTyping(true);

    // Simulate AI thinking and responding
    setTimeout(() => {
      let aiText = "Je traite votre demande. Je ne vois aucune anomalie majeure actuellement dans votre secteur. Souhaitez-vous une analyse plus approfondie d'une zone spécifique ?";
      
      if (query.includes("salut") || query.includes("bonjour") || query.includes("hello")) {
        aiText = "Bonjour ! Je suis l'unité IA de Forest Guardian. Je surveille actuellement 1,200 hectares de forêt. Comment puis-je vous assister dans vos opérations ?";
      } else if (query.includes("merci") || query.includes("thanks")) {
        aiText = "À votre service. La protection de notre écosystème est ma priorité absolue.";
      } else if (query.includes("feu") || query.includes("fire") || query.includes("incendie")) {
        aiText = "ALERTE CRITIQUE : Un foyer thermique inhabituel a été détecté par le drone D-04 dans le secteur Nord-Est. Coordonnées : 36.8475, 10.3214. L'unité d'intervention la plus proche a été prévenue et les protocoles d'urgence sont activés.";
      } else if (query.includes("camion") || query.includes("truck") || query.includes("véhicule")) {
        aiText = "ANALYSE VISUELLE : Deux camions suspects ont été identifiés zone B (piste forestière 03) à 14:45. Les plaques TN-123-456 sont en cours de comparaison avec la liste noire du ministère. Je continue le suivi en temps réel.";
      } else if (query.includes("aide") || query.includes("help") || query.includes("quoi faire")) {
        aiText = "Je peux effectuer plusieurs tâches : \n1. Rapporter l'état des drones et batteries.\n2. Identifier des signatures thermiques suspectes.\n3. Analyser les plaques d'immatriculation.\n4. Envoyer un signal SOS prioritaire.";
      } else if (query.includes("drone")) {
        aiText = "ÉTAT DE LA FLOTTE : 5 drones en patrouille. D-01: OK, D-02: Retour base (12%), D-03: Scanning Zone C, D-04: Alerte Nord-Est, D-05: Backup.";
      } else if (query.includes("météo") || query.includes("weather") || query.includes("temps")) {
        aiText = "MÉTÉO LOCALE : Température 24°C, Vent Nord-Est 15km/h, Humidité 45%. Conditions optimales pour le vol des drones. Risque d'incendie : MODÉRÉ.";
      }
      
      setMessages(prev => [...prev, { id: Date.now() + 1, text: aiText, sender: 'ai' }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col gap-4 z-50">
        <button 
          onClick={() => alert("SOS SIGNAL SENT TO ALL NEARBY UNITS!")}
          className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(220,38,38,0.5)] animate-pulse hover:scale-110 transition-all border-4 border-white/20 active:scale-95"
          title="EMERGENCY SOS"
        >
          <ShieldAlert className="w-6 h-6" />
        </button>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className={`w-14 h-14 ${isChatOpen ? 'bg-white text-black' : 'bg-blue-600 text-white'} rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-110 transition-all border-4 border-white/20 active:scale-95`}
          title="AI Assistant"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>

      {/* Top Bar Controls */}
      <div className="fixed top-8 right-8 flex gap-3 z-50">
        <button 
          onClick={() => setLanguage(language === 'FR' ? 'EN' : 'FR')}
          className="glass-card px-3 py-2 text-[10px] font-black tracking-widest flex items-center gap-2 hover:bg-white/10 active:scale-95 transition-all"
        >
          <Globe className="w-3 h-3" /> {language}
        </button>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="glass-card p-2 hover:bg-white/10 active:scale-95 transition-all"
        >
          {isDarkMode ? <Moon className="w-4 h-4 text-blue-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
        </button>
      </div>

      {/* Chatbot Modal */}
      {isChatOpen && (
        <div className="fixed bottom-28 right-8 w-80 md:w-96 h-[450px] glass-card flex flex-col z-50 animate-in slide-in-from-bottom-4 shadow-2xl border-white/10 overflow-hidden">
          <div className="p-4 border-b border-white/5 bg-gradient-to-r from-blue-600/20 to-transparent flex justify-between items-center">
            <h4 className="text-[10px] font-black flex items-center gap-3 uppercase tracking-[0.2em] text-blue-400">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_#22c55e]"></div>
              Assistant Forestier IA
            </h4>
            <button onClick={() => setIsChatOpen(false)} className="p-1 hover:bg-white/5 rounded-full transition-colors">
              <X className="w-4 h-4 text-white/30 hover:text-white" />
            </button>
          </div>
          
          <div className="flex-1 p-5 overflow-y-auto space-y-4 custom-scrollbar bg-black/20">
            {messages.map(msg => (
              <div key={msg.id} className={`${msg.sender === 'ai' ? 'bg-white/5' : 'bg-blue-600/20 border border-blue-500/30 text-blue-100 ml-8'} p-3 rounded-2xl ${msg.sender === 'ai' ? 'rounded-tl-none' : 'rounded-tr-none'} border border-white/5 shadow-lg animate-in fade-in slide-in-from-bottom-1`}>
                <p className="text-[11px] leading-relaxed font-medium">{msg.text}</p>
              </div>
            ))}
            {isTyping && (
              <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5 w-16 flex justify-center">
                <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="p-4 border-t border-white/5 bg-black/40">
            <div className="flex gap-2 bg-white/5 p-1 rounded-xl border border-white/10 focus-within:border-blue-500/50 transition-all">
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Posez votre question..." 
                className="flex-1 bg-transparent px-3 py-2 text-[11px] outline-none placeholder:text-white/20"
              />
              <button 
                onClick={handleSend}
                disabled={!inputValue.trim() || isTyping}
                className="p-2 bg-blue-600 rounded-lg hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-lg active:scale-95"
              >
                <Send className="w-3 h-3 text-white" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
