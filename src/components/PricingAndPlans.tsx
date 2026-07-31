import React, { useState } from "react";
import { Check, Sparkles, Zap, ShieldCheck, ArrowRight, Clock } from "lucide-react";
import { soundEngine } from "../utils/audio";

interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  standardPrice: number;
  expressPrice: number;
  description: string;
  features: string[];
}

const plans: PricingPlan[] = [
  {
    id: "carta-b-ar",
    name: "Carta B AR & IA",
    description: "Habilitação completa de condução com simulador HUD em realidade aumentada e instrução assistida.",
    standardPrice: 690,
    expressPrice: 890,
    features: [
      "28 Aulas Práticas em Veículos Elétricos EV",
      "10 Horas de Simulador Holográfico AR",
      "Projeção HUD Básica no Para-brisas",
      "Exame de Código e Condução Incluídos",
      "Acompanhamento Telemétrico por App",
    ],
  },
  {
    id: "pro-cyber",
    name: "Pro Cyber Performance",
    badge: "MAIS POPULAR",
    popular: true,
    description: "O programa definitivo com controle de derrapagem, telemetria biométrica e simuladores ilimitados.",
    standardPrice: 980,
    expressPrice: 1250,
    features: [
      "36 Aulas Práticas em Taycan EV e Model S",
      "Simulador de Cockpit AR Ilimitado 24/7",
      "Módulo Prático de Drift & Derrapagem",
      "Navegação Noturna com Visão Térmica HUD",
      "Relatório de Bio-Feedback e Stress",
      "Co-piloto com Inteligência Artificial Gemini",
    ],
  },
  {
    id: "executive-vip",
    name: "Executive Cyber-VIP",
    badge: "EXCLUSIVO VIP",
    description: "Instrução individual em pista privada, frota de supercarros e treino de reação avançada F1.",
    standardPrice: 1650,
    expressPrice: 1990,
    features: [
      "Aulas 100% Individuais e Personalizadas",
      "Acesso Total à Frota (Taycan, Model S, Rimac)",
      "Pista Privada de Teste e Derrapagem",
      "Tutor Biométrico Dedicado",
      "Garantia de Aprovação no Exame",
      "Certificado Internacional de Condução Preditiva",
    ],
  },
];

interface PricingProps {
  onSelectPlan: (planName: string, price: number) => void;
}

export const PricingAndPlans: React.FC<PricingProps> = ({ onSelectPlan }) => {
  const [isExpress, setIsExpress] = useState(false);

  return (
    <section id="planos" className="relative w-full py-28 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase mb-3">
            <Zap className="w-3.5 h-3.5 text-orange-400" />
            <span>PROGRAMAS DE ADMISSÃO // INVISTA NA SUA SEGURANÇA</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display">
            Planos de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Treino & Habilitação</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm font-mono text-slate-400 leading-relaxed">
            Escolha o nível de imersão tecnológica ideal para a sua jornada de condução adaptativa.
          </p>

          {/* Express Toggle Switcher */}
          <div className="mt-8 inline-flex items-center gap-4 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                soundEngine.playClick();
                setIsExpress(false);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                !isExpress ? "bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20" : "text-slate-400"
              }`}
            >
              Ritmo Standard (6-8 Semanas)
            </button>

            <button
              onClick={() => {
                soundEngine.playClick();
                setIsExpress(true);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-bold flex items-center gap-2 transition-all ${
                isExpress ? "bg-orange-500 text-slate-950 shadow-md shadow-orange-500/20" : "text-slate-400"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Modalidade Express (2 Semanas)</span>
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {plans.map((plan) => {
            const currentPrice = isExpress ? plan.expressPrice : plan.standardPrice;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-8 backdrop-blur-xl flex flex-col justify-between transition-all duration-300 shadow-2xl ${
                  plan.popular
                    ? "bg-slate-900/90 border-2 border-cyan-500 shadow-cyan-500/10 scale-105"
                    : "bg-slate-900/50 border border-slate-800 hover:border-slate-700"
                }`}
              >
                {/* Popular Badge */}
                {plan.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-mono font-black text-[10px] tracking-wider uppercase shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-slate-950 fill-current" />
                    <span>{plan.badge}</span>
                  </div>
                )}

                <div>
                  <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                    {plan.id.replace("-", " ")}
                  </div>
                  <h3 className="text-2xl font-black font-display text-white uppercase">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs font-mono text-slate-400 leading-relaxed min-h-[40px]">
                    {plan.description}
                  </p>

                  {/* Price Tag */}
                  <div className="mt-6 mb-6 pb-6 border-b border-slate-800">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl md:text-5xl font-black font-mono text-white">
                        €{currentPrice}
                      </span>
                      <span className="text-xs font-mono text-slate-400">/ CURSO COMPLETO</span>
                    </div>
                    {isExpress && (
                      <span className="inline-block mt-2 text-[10px] font-mono text-orange-400 font-bold bg-orange-500/10 px-2.5 py-1 rounded-md border border-orange-500/20">
                        ▲ MODO EXPRESS ACELERADO
                      </span>
                    )}
                  </div>

                  {/* Features List */}
                  <div className="space-y-3 font-mono text-xs text-slate-300">
                    {plan.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-3">
                        <div className="w-4 h-4 rounded-full bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 flex-shrink-0 mt-0.5">
                          <Check className="w-3 h-3" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Select Button */}
                <div className="mt-8 pt-4">
                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onSelectPlan(plan.name, currentPrice);
                    }}
                    className={`w-full py-3.5 rounded-2xl font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all duration-200 ${
                      plan.popular
                        ? "bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 hover:brightness-110 shadow-lg shadow-cyan-500/30"
                        : "bg-slate-900 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500 hover:text-slate-950"
                    }`}
                  >
                    <span>Inscrever em {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Guarantee Banner */}
        <div className="mt-16 bg-slate-900/60 p-6 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 backdrop-blur-md">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase font-mono">
                GARANTIA DE REPETIÇÃO DE EXAME IA
              </div>
              <div className="text-xs font-mono text-slate-400">
                Se não for aprovado à primeira tentativa, cobrimos 100% das horas de simulador adicionais sem custos extras.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default PricingAndPlans;
