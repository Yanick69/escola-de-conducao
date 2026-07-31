import React, { useState } from "react";
import { X, Calendar, User, Phone, Mail, CheckCircle2, Navigation, Sparkles } from "lucide-react";
import confetti from "canvas-confetti";
import { soundEngine } from "../utils/audio";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialSelection?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  initialSelection = "",
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    module: initialSelection || "Carta B AR & IA (Simulação HUD)",
    date: "2026-08-05",
    shift: "Manhã (09:00 - 12:00)",
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundEngine.playEnginePulse();

    const randomId = "NEXUS-" + Math.floor(100000 + Math.random() * 900000) + "-AR";
    setTicketId(randomId);
    setSubmitted(true);

    // Confetti celebration
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#06b6d4", "#38bdf8", "#f97316", "#10b981"],
      });
    } catch {
      // Ignore confetti fallback
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-cyan-500/30 rounded-3xl p-6 md:p-8 shadow-2xl shadow-cyan-950/50 hud-glow">
        
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-2">
              <Calendar className="w-4 h-4 text-orange-400" />
              <span>AGENDAMENTO EM REAL-TIME</span>
            </div>
            <h3 className="text-2xl font-black font-display text-white uppercase">
              Reservar Sessão de Simulação
            </h3>
            <p className="mt-1 text-xs font-mono text-slate-400">
              Preencha os dados para garantir a sua vaga na cabine de realidade aumentada.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4 font-mono text-xs">
              
              {/* Full Name */}
              <div>
                <label className="block text-slate-300 mb-1">NOME COMPLETO</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    placeholder="Ex: Carlos Silva"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">EMAIL</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="carlos@exemplo.pt"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">TELEMÓVEL</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      required
                      placeholder="+351 910 000 000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-cyan-400"
                    />
                  </div>
                </div>
              </div>

              {/* Course / Module Selection */}
              <div>
                <label className="block text-slate-300 mb-1">MÓDULO DE INTERESSE</label>
                <select
                  value={formData.module}
                  onChange={(e) => setFormData({ ...formData, module: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-cyan-400"
                >
                  <option value="Carta B AR & IA (Simulação HUD)">Carta B AR & IA (Simulação HUD)</option>
                  <option value="Pro Cyber Performance (Drift & Pista)">Pro Cyber Performance (Drift & Pista)</option>
                  <option value="Executive Cyber-VIP (Treino F1)">Executive Cyber-VIP (Treino F1)</option>
                  <option value="Sessão Experimental no Porsche Taycan">Sessão Experimental no Porsche Taycan</option>
                  <option value="Módulo de Reação Biométrica">Módulo de Reação Biométrica</option>
                </select>
              </div>

              {/* Date & Shift */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 mb-1">DATA PREFERIDA</label>
                  <input
                    type="date"
                    required
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-cyan-400"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 mb-1">TURNO</label>
                  <select
                    value={formData.shift}
                    onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2.5 px-3 text-white focus:outline-none focus:border-cyan-400"
                  >
                    <option value="Manhã (09:00 - 12:00)">Manhã (09:00 - 12:00)</option>
                    <option value="Tarde (14:00 - 17:00)">Tarde (14:00 - 17:00)</option>
                    <option value="Noturno AR (19:00 - 22:00)">Noturno AR (19:00 - 22:00)</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full mt-4 py-3.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-black font-mono text-xs uppercase flex items-center justify-center gap-2 hover:brightness-110 shadow-lg shadow-cyan-500/20"
              >
                <Sparkles className="w-4 h-4 fill-current" />
                <span>Confirmar Reserva Telemétrica</span>
              </button>

            </form>
          </div>
        ) : (
          /* Confirmation Ticket Display */
          <div className="text-center py-4">
            <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
              RESERVA CONFIRMADA COM SUCESSO
            </span>

            <h3 className="text-2xl font-black font-display text-white mt-3 uppercase">
              Bem-vindo à NEXUS
            </h3>

            <p className="mt-2 text-xs font-mono text-slate-300 max-w-md mx-auto">
              A sua cabine de simulação foi reservada. Enviamos as credenciais de acesso ao cockpit para <span className="text-cyan-400 font-bold">{formData.email}</span>.
            </p>

            {/* Ticket Card */}
            <div className="mt-6 bg-slate-950 p-4 rounded-2xl border border-slate-800 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-800 pb-2">
                <span className="text-slate-500">CÓDIGO TICKET:</span>
                <span className="text-cyan-400 font-bold">{ticketId}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">ALUNO:</span>
                <span className="text-white font-bold">{formData.fullName}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">MÓDULO:</span>
                <span className="text-white">{formData.module}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-500">DATA & TURNO:</span>
                <span className="text-emerald-400">{formData.date} // {formData.shift}</span>
              </div>
            </div>

            <button
              onClick={handleReset}
              className="mt-6 px-6 py-2.5 rounded-xl bg-slate-800 text-white font-mono text-xs font-bold hover:bg-slate-700 transition-colors"
            >
              Concluir & Voltar ao Site
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default BookingModal;
