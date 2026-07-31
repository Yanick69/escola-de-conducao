import React, { useState, useEffect } from "react";
import { Navigation, MapPin, Phone, Mail, Clock, ArrowRight, ShieldCheck, Github, Instagram, Linkedin } from "lucide-react";
import { soundEngine } from "../utils/audio";

export const Footer: React.FC = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(" ")[0] + " UTC");
    };
    updateClock();
    const timer = setInterval(updateClock, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      soundEngine.playEnginePulse();
      setSubscribed(true);
    }
  };

  return (
    <footer className="relative bg-slate-950 text-slate-400 border-t border-slate-900 overflow-hidden font-mono text-xs">
      {/* Cyber Grid Pattern */}
      <div className="absolute inset-0 bg-cyber-grid opacity-15 pointer-events-none" />

      {/* Top Live Telemetry Status Bar */}
      <div className="border-b border-slate-900 bg-slate-950/90 py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-4 text-[10px] uppercase text-cyan-400/70">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              SISTEMA_OPERACIONAL: 100% ONLINE
            </span>
            <span className="text-slate-600">|</span>
            <span>SERVIDOR_LUSO: LISBOA_HUB_01</span>
          </div>

          <div className="flex items-center gap-4">
            <span>RELÓGIO ATÓMICO: <span className="text-white font-bold">{currentTime}</span></span>
            <span className="text-slate-600">|</span>
            <span>GPS: 38.7223° N, 9.1393° W</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Navigation className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-black tracking-tight text-white uppercase font-display">
                  NEXUS <span className="text-cyan-400 text-xs font-mono">// CONDUÇÃO</span>
                </span>
                <span className="text-[9px] text-slate-500 uppercase -mt-0.5">
                  Escola de Condução Premium & IA
                </span>
              </div>
            </a>

            <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
              Líderes europeus em instrução de condução adaptativa, cockpits holográficos com realidade aumentada e simulação preditiva para automóveis elétricos.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center hover:text-cyan-400 hover:border-cyan-500/40 transition-colors">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4 border-b border-slate-800 pb-2">
              SEDE & CONTATO
            </h4>
            <div className="flex items-start gap-2.5 text-slate-300">
              <MapPin className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5" />
              <span>Avenida da Liberdade 245, Edifício CyberHub, Lisboa</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Phone className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>+351 210 998 800</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-300">
              <Mail className="w-4 h-4 text-cyan-400 flex-shrink-0" />
              <span>info@nexus-conducao.pt</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400 text-[11px] pt-1">
              <Clock className="w-4 h-4 text-orange-400 flex-shrink-0" />
              <span>Seg - Sáb: 07:00 - 22:00</span>
            </div>
          </div>

          {/* Fast Navigation */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4 border-b border-slate-800 pb-2">
              ACESSO RÁPIDO
            </h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-cyan-400 transition-colors">Início // Cockpit HUD</a></li>
              <li><a href="#servicos" className="hover:text-cyan-400 transition-colors">Cybernetic Bento Grid</a></li>
              <li><a href="#blueprint" className="hover:text-cyan-400 transition-colors">Blueprint 3D Interativo</a></li>
              <li><a href="#simulador" className="hover:text-cyan-400 transition-colors">Simulador de Reação AR</a></li>
              <li><a href="#frota" className="hover:text-cyan-400 transition-colors">Frota Elétrica EV</a></li>
              <li><a href="#planos" className="hover:text-cyan-400 transition-colors">Planos & Preços VIP</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs mb-4 border-b border-slate-800 pb-2">
              BOLETIM TELEMÉTRICO
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Receba atualizações mensais sobre novas vagas de simulação e atualizações do algoritmo de IA.
            </p>

            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="space-y-2 pt-1">
                <input
                  type="email"
                  required
                  placeholder="seu.email@exemplo.pt"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-cyan-400 transition-colors"
                >
                  <span>Subscrever Avisos</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            ) : (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Email subscrito no sistema!</span>
              </div>
            )}
          </div>

        </div>

        {/* Bottom Rights Statement */}
        <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500">
          <div>
            © 2026 NEXUS Escola de Condução Premium. Todos os direitos reservados.
          </div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacidade & DPO</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Termos de Telemetria</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Certificação AEO/GEO</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
