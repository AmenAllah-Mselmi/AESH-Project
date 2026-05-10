"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Video, Phone, MoreVertical, Search, MessageSquare } from 'lucide-react';

const MOCK_CONTACTS = [
  { id: 1, name: 'Commissariat Central', role: 'Police', status: 'online' },
  { id: 2, name: 'Garde Forestier 04', role: 'Field', status: 'online' },
  { id: 3, name: 'Directeur ONG Vert', role: 'NGO', status: 'offline' },
  { id: 4, name: 'Admin Système', role: 'Admin', status: 'online' },
];

const INITIAL_MESSAGES: Record<number, any[]> = {
  1: [
    { id: 101, text: "Avez-vous reçu les images du drone D-04 ? Un camion suspect est stationné zone B.", sender: 'contact', time: '14:32' },
    { id: 102, text: "Oui, unité d'intervention dépêchée sur place. Arrivée prévue dans 5 minutes.", sender: 'me', time: '14:35' }
  ],
  2: [
    { id: 201, text: "Rapport de patrouille terminé pour le secteur Nord.", sender: 'contact', time: '10:15' }
  ],
  3: [],
  4: [
    { id: 401, text: "Mise à jour du système prévue à 02:00.", sender: 'contact', time: '09:00' }
  ]
};

export function ChatSystem() {
  const [activeContact, setActiveContact] = useState(MOCK_CONTACTS[0]);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeContact]);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputValue,
      sender: 'me',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => ({
      ...prev,
      [activeContact.id]: [...(prev[activeContact.id] || []), newMessage]
    }));
    setInputValue('');

    // Simulate response
    setTimeout(() => {
      const response = {
        id: Date.now() + 1,
        text: "Bien reçu. Nous traitons l'information.",
        sender: 'contact',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => ({
        ...prev,
        [activeContact.id]: [...(prev[activeContact.id] || []), response]
      }));
    }, 2000);
  };

  return (
    <div className="flex h-[600px] glass-card overflow-hidden animate-in fade-in duration-700">
      {/* Sidebar */}
      <div className="w-80 border-r border-white/5 flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input 
              type="text" 
              placeholder="Rechercher contact..." 
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-xs outline-none focus:border-green-500/50"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {MOCK_CONTACTS.map(contact => (
            <button 
              key={contact.id}
              onClick={() => setActiveContact(contact)}
              className={`w-full p-4 flex items-center gap-4 transition-all hover:bg-white/5 ${activeContact.id === contact.id ? 'bg-white/5 border-l-2 border-green-500' : ''}`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs uppercase">{contact.name[0]}</div>
                {contact.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#05080a] rounded-full"></div>}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">{contact.name}</p>
                <div className="flex items-center gap-2">
                  <p className="text-[9px] text-white/30 uppercase font-black tracking-widest">{contact.role}</p>
                  {messages[contact.id]?.length > 0 && (
                    <span className="text-[8px] text-green-500 font-bold">• Message reçu</span>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white/2">
        {/* Chat Header */}
        <div className="p-4 border-b border-white/5 flex justify-between items-center bg-black/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center font-bold text-[10px]">{activeContact.name[0]}</div>
            <div>
              <p className="text-sm font-bold">{activeContact.name}</p>
              <p className="text-[10px] text-green-500 font-bold uppercase">{activeContact.status === 'online' ? 'En ligne' : 'Hors ligne'} • Canal Sécurisé</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-green-500 transition-all"><Video className="w-5 h-5" /></button>
             <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-green-500 transition-all"><Phone className="w-5 h-5" /></button>
             <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 transition-all"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto custom-scrollbar">
          {messages[activeContact.id]?.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-white/20 gap-4">
              <MessageSquare className="w-12 h-12 opacity-20" />
              <p className="text-xs uppercase tracking-widest font-bold">Aucun message pour le moment</p>
            </div>
          )}
          {messages[activeContact.id]?.map((msg) => (
            <div key={msg.id} className={`flex ${msg.sender === 'me' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
              <div className={`${msg.sender === 'me' ? 'bg-green-600/20 border-green-500/20 text-green-50' : 'bg-white/5 border-white/5'} p-4 rounded-2xl ${msg.sender === 'me' ? 'rounded-tr-none' : 'rounded-tl-none'} max-w-[70%] border shadow-xl`}>
                <p className="text-xs leading-relaxed">{msg.text}</p>
                <p className={`text-[9px] mt-2 text-right ${msg.sender === 'me' ? 'text-green-500/40' : 'text-white/20'}`}>{msg.time}</p>
              </div>
            </div>
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-white/5">
          <div className="flex gap-4 items-center">
            <input 
              type="text" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Écrivez votre message..." 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-green-500/50 transition-all"
            />
            <button 
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:cursor-not-allowed text-white p-3 rounded-xl shadow-lg transition-all active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-[9px] text-white/20 mt-3 flex items-center gap-2">
            <div className="w-1 h-1 bg-green-500 rounded-full"></div>
            Chiffrement de bout en bout actif
          </div>
        </div>
      </div>
    </div>
  );
}

