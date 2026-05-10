"use client";

import React, { useState } from 'react';
import { Send, User, Video, Phone, MoreVertical, Search } from 'lucide-react';

const MOCK_CONTACTS = [
  { id: 1, name: 'Commissariat Central', role: 'Police', status: 'online' },
  { id: 2, name: 'Garde Forestier 04', role: 'Field', status: 'online' },
  { id: 3, name: 'Directeur ONG Vert', role: 'NGO', status: 'offline' },
  { id: 4, name: 'Admin Système', role: 'Admin', status: 'online' },
];

export function ChatSystem() {
  const [activeContact, setActiveContact] = useState(MOCK_CONTACTS[0]);

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
              className={`w-full p-4 flex items-center gap-4 transition-all hover:bg-white/5 ${activeContact.id === contact.id ? 'bg-white/5' : ''}`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center font-bold text-xs">{contact.name[0]}</div>
                {contact.status === 'online' && <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#05080a] rounded-full"></div>}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold">{contact.name}</p>
                <p className="text-[10px] text-white/30 uppercase font-black">{contact.role}</p>
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
              <p className="text-[10px] text-green-500 font-bold uppercase">En ligne • Canal Sécurisé</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-green-500 transition-all"><Video className="w-5 h-5" /></button>
             <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 hover:text-green-500 transition-all"><Phone className="w-5 h-5" /></button>
             <button className="p-2 hover:bg-white/5 rounded-lg text-white/40 transition-all"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          <div className="flex justify-start">
            <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none max-w-[70%] border border-white/5">
              <p className="text-xs">Avez-vous reçu les images du drone D-04 ? Un camion suspect est stationné zone B.</p>
              <p className="text-[9px] text-white/20 mt-2 text-right">14:32</p>
            </div>
          </div>
          <div className="flex justify-end">
            <div className="bg-green-600/20 p-4 rounded-2xl rounded-tr-none max-w-[70%] border border-green-500/20">
              <p className="text-xs text-green-50">Oui, unité d'intervention dépêchée sur place. Arrivée prévue dans 5 minutes.</p>
              <p className="text-[9px] text-green-500/40 mt-2 text-right">14:35</p>
            </div>
          </div>
        </div>

        {/* Chat Input */}
        <div className="p-6 border-t border-white/5 flex gap-4">
          <input 
            type="text" 
            placeholder="Écrivez votre message..." 
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs outline-none focus:border-green-500/50"
          />
          <button className="bg-green-600 hover:bg-green-500 text-white p-3 rounded-xl shadow-lg transition-all">
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
