import React, { useState, useEffect } from "react";
import { Volume2, VolumeX, Navigation, ShieldCheck, Menu, X, Calendar } from "lucide-react";
import { soundEngine } from "../utils/audio";

interface NavbarProps {
  onOpenBooking: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleSound = () => {
    const muted = soundEngine.toggleMute();
    setIsMuted(muted);
  };

  const navLinks = [
    { name: "Início", href: "#hero" },
    { name: "Módulos", href: "#servicos" },
    { name: "Blueprint 3D", href: "#blueprint" },
    { name: "Simulador AR", href: "#simulador" },
    { name: "Frota & Instrução", href: "#frota" },
    { name: "Planos VIP", href: "#planos" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-slate-950/85 backdrop-blur-md border-b border-cyan-500/15 py-3 shadow-2xl shadow-cyan-950/20"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#hero"
          onClick={() => soundEngine.playClick()}
          className="flex items-center gap-3 group focus:outline-none"
        >
          <div className="relative w-10 h-10 rounded-xl bg-slate-900 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:border-cyan-400 group-hover:bg-cyan-500/10 transition-all duration-300">
            <Navigation className="w-5 h-5 transform group-hover:rotate-45 transition-transform duration-300" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-black tracking-tight text-white uppercase font-display flex items-center gap-1.5">
              NEXUS <span className="text-cyan-400 text-xs font-mono font-semibold">// AR</span>
            </span>
            <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
              Escola de Condução Premium
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/60 border border-slate-800 rounded-full px-4 py-1.5 backdrop-blur-lg">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => soundEngine.playClick()}
              className="px-3.5 py-1.5 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:bg-slate-800/60 rounded-full transition-all duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Controls & Status */}
        <div className="hidden md:flex items-center gap-3">
          {/* Status Badge */}
          <div className="hidden xl:flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full text-[10px] font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>HUD IA: ONLINE</span>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={isMuted ? "Ativar som de cockpit" : "Silenciar som de cockpit"}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-500/40 transition-all duration-200"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400 animate-pulse" />}
          </button>

          {/* CTA Button */}
          <button
            onClick={() => {
              soundEngine.playClick();
              onOpenBooking();
            }}
            className="relative group overflow-hidden rounded-full p-[1px] focus:outline-none"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-sky-400 to-orange-500 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
            <div className="relative px-4 py-2 rounded-full bg-slate-950 flex items-center gap-2 text-xs font-bold font-mono text-white group-hover:bg-slate-900 transition-colors duration-200">
              <Calendar className="w-3.5 h-3.5 text-cyan-400" />
              <span>Agendar Simulação</span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleSound}
            className="w-9 h-9 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>

          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-950/95 backdrop-blur-2xl border-b border-cyan-500/20 px-4 py-6 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  soundEngine.playClick();
                  setMobileMenuOpen(false);
                }}
                className="px-4 py-2.5 text-sm font-mono text-slate-200 hover:text-cyan-400 hover:bg-slate-900 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-800 flex flex-col gap-3">
            <button
              onClick={() => {
                soundEngine.playClick();
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-sky-500 text-slate-950 font-bold text-sm font-mono flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Agendar Simulação com IA</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
