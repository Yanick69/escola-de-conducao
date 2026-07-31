import React, { useState, useEffect } from "react";
import { Play, RotateCcw, CloudRain, Sun, CloudFog, Eye, ShieldAlert, Cpu, Sparkles, CheckCircle2 } from "lucide-react";
import { soundEngine } from "../utils/audio";

export const CockpitSimulator: React.FC = () => {
  // Reaction Test States
  const [testState, setTestState] = useState<"idle" | "waiting" | "ready" | "result">("idle");
  const [startTime, setStartTime] = useState<number>(0);
  const [reactionTime, setReactionTime] = useState<number | null>(null);
  const [tooEarly, setTooEarly] = useState(false);

  // Weather & HUD Environment States
  const [weather, setWeather] = useState<"clear" | "rain" | "fog">("rain");
  const [arVision, setArVision] = useState(true);
  const [aiAssist, setAiAssist] = useState(true);

  // Handle reaction test
  const startReactionTest = () => {
    soundEngine.playAiNotification();
    soundEngine.playCockpitHum(1.0);
    setTooEarly(false);
    setReactionTime(null);
    setTestState("waiting");

    const delay = Math.floor(Math.random() * 2500) + 1500; // 1.5s - 4s random delay
    setTimeout(() => {
      setStartTime(Date.now());
      setTestState("ready");
      soundEngine.playHudBeep(900, 0.1);
    }, delay);
  };

  const handleTestClick = () => {
    if (testState === "waiting") {
      setTooEarly(true);
      setTestState("idle");
      soundEngine.playHudBeep(300, 0.2);
    } else if (testState === "ready") {
      const ms = Date.now() - startTime;
      setReactionTime(ms);
      setTestState("result");
      soundEngine.playEnginePulse();
      soundEngine.playAiNotification();
    }
  };

  return (
    <section id="simulador" className="relative w-full py-28 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-left mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-mono text-xs uppercase mb-3">
            <Cpu className="w-3.5 h-3.5 text-orange-400" />
            <span>LABORATÓRIO_INTERATIVO // COCKPIT SIMULATOR</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display">
            Simulador de <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">Reação & Realidade Aumentada</span>
          </h2>
          <p className="mt-3 text-xs md:text-sm font-mono text-slate-400 max-w-2xl">
            Teste os seus reflexos biológicos e experimente a interface HUD de realidade aumentada sob diferentes cenários climáticos adversos.
          </p>
        </div>

        {/* Cockpit Simulation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Main Simulated AR Road View (7 cols) */}
          <div className="lg:col-span-7 bg-slate-900/80 rounded-3xl border border-slate-800 p-5 backdrop-blur-xl shadow-2xl relative overflow-hidden">
            
            {/* Top Environment Control Toggles */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-800 text-xs font-mono">
              <div className="flex items-center gap-2 text-slate-300">
                <span className="text-slate-500">CLIMA:</span>
                <button
                  onClick={() => { soundEngine.playCockpitHum(0.8); setWeather("clear"); }}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                    weather === "clear" ? "bg-amber-500/20 text-amber-300 border border-amber-500/40" : "text-slate-400"
                  }`}
                >
                  <Sun className="w-3.5 h-3.5" /> Limpo
                </button>
                <button
                  onClick={() => { soundEngine.playCockpitHum(0.8); setWeather("rain"); }}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                    weather === "rain" ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40" : "text-slate-400"
                  }`}
                >
                  <CloudRain className="w-3.5 h-3.5" /> Chuva
                </button>
                <button
                  onClick={() => { soundEngine.playCockpitHum(0.8); setWeather("fog"); }}
                  className={`px-2.5 py-1 rounded-lg flex items-center gap-1.5 transition-all ${
                    weather === "fog" ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40" : "text-slate-400"
                  }`}
                >
                  <CloudFog className="w-3.5 h-3.5" /> Nevoeiro
                </button>
              </div>

              <div className="flex items-center gap-3">
                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={arVision}
                    onChange={() => { soundEngine.playAiNotification(); setArVision(!arVision); }}
                    className="accent-cyan-400 rounded"
                  />
                  <span>HUD AR</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={aiAssist}
                    onChange={() => { soundEngine.playAiNotification(); setAiAssist(!aiAssist); }}
                    className="accent-orange-400 rounded"
                  />
                  <span>IA ASSIST</span>
                </label>
              </div>
            </div>

            {/* Simulated Road Canvas Window */}
            <div className="relative w-full h-[360px] md:h-[420px] rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 flex items-center justify-center">
              
              {/* Road Background Image */}
              <img
                src="https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1200&q=80"
                alt="Simulated Highway View"
                className={`w-full h-full object-cover transition-all duration-500 ${
                  weather === "rain"
                    ? "filter brightness-50 contrast-125 saturate-150"
                    : weather === "fog"
                    ? "filter brightness-40 blur-[1.5px]"
                    : "filter brightness-90"
                }`}
              />

              {/* Rain / Fog Simulated Overlay */}
              {weather === "rain" && (
                <div className="absolute inset-0 bg-cyan-950/20 scanline pointer-events-none animate-pulse" />
              )}
              {weather === "fog" && (
                <div className="absolute inset-0 bg-slate-800/40 backdrop-blur-[2px] pointer-events-none" />
              )}

              {/* AR HUD Overlay Boxes & LiDAR Trajectory */}
              {arVision && (
                <div className="absolute inset-0 p-6 pointer-events-none flex flex-col justify-between text-cyan-400 font-mono text-[10px]">
                  {/* Projected Pathing Vectors */}
                  <svg className="absolute inset-0 w-full h-full text-cyan-400/40 stroke-current" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <line x1="15" y1="100" x2="45" y2="55" strokeWidth="0.5" strokeDasharray="1 1" />
                    <line x1="85" y1="100" x2="55" y2="55" strokeWidth="0.5" strokeDasharray="1 1" />
                    <line x1="30" y1="100" x2="48" y2="55" stroke="#f97316" strokeWidth="0.8" />
                    <line x1="70" y1="100" x2="52" y2="55" stroke="#f97316" strokeWidth="0.8" />
                  </svg>

                  {/* Detected Bounding Boxes */}
                  <div className="absolute top-[42%] left-[45%] w-24 h-16 border-2 border-orange-500 rounded p-1 flex flex-col justify-between bg-orange-500/10">
                    <span className="text-[8px] bg-orange-500 text-slate-950 px-1 font-bold w-max">VEÍCULO À FRENTE</span>
                    <span className="text-[8px] text-orange-300 font-bold">42m // 78 KPH</span>
                  </div>

                  <div className="absolute top-[38%] right-[22%] w-16 h-20 border border-cyan-400 rounded p-1 flex flex-col justify-between bg-cyan-500/10">
                    <span className="text-[8px] bg-cyan-400 text-slate-950 px-1 font-bold w-max">PEDESTRE</span>
                    <span className="text-[8px] text-cyan-200">65m // SEGURO</span>
                  </div>

                  {/* Top Cockpit Telemetry Bar */}
                  <div className="flex justify-between items-center bg-slate-950/80 p-2 rounded-xl border border-cyan-500/30 backdrop-blur-md">
                    <div className="flex items-center gap-2">
                      <Eye className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>VISÃO DE PISTA: AR_LIDAR_v2</span>
                    </div>
                    <div>
                      {aiAssist ? (
                        <span className="text-emerald-400 font-bold flex items-center gap-1">
                          <CheckCircle2 className="w-3 h-3" /> FRENAGEM AUTOMÁTICA IA: ATIVA
                        </span>
                      ) : (
                        <span className="text-amber-400 flex items-center gap-1">
                          <ShieldAlert className="w-3 h-3" /> MODO MANUAL PURO
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Bottom HUD Dashboard */}
                  <div className="flex justify-between items-end bg-slate-950/80 p-2.5 rounded-xl border border-cyan-500/30 backdrop-blur-md">
                    <div>
                      <div className="text-[8px] text-slate-400">DISTÂNCIA DE PARAGEM</div>
                      <div className="text-sm font-bold text-white">
                        {weather === "rain" ? "32 METROS (PISTA MOLHADA)" : weather === "fog" ? "45 METROS (NEVOEIRO)" : "22 METROS (OPTIMAL)"}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] text-slate-400">TEMPERATURA PNEUS</div>
                      <div className="text-xs font-bold text-cyan-300">82°C // PRESSÃO 2.8 BAR</div>
                    </div>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Reaction Time Tester Box (5 cols) */}
          <div className="lg:col-span-5 bg-slate-900/80 rounded-3xl border border-slate-800 p-6 backdrop-blur-xl shadow-2xl flex flex-col justify-between h-full min-h-[480px]">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-3">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <span>BIOMETRIA // TEMPO DE REAÇÃO</span>
              </div>
              <h3 className="text-2xl font-black uppercase text-white font-display">
                Teste Telemétrico de Reflexos
              </h3>
              <p className="mt-2 text-xs font-mono text-slate-400 leading-relaxed">
                Clique em "Iniciar Teste", aguarde a luz mudar para verde e reaja o mais rápido possível.
              </p>

              {/* Reaction Tester Interactive Zone */}
              <div className="mt-6 flex flex-col items-center justify-center p-8 rounded-2xl border border-slate-800 bg-slate-950 text-center relative overflow-hidden min-h-[220px]">
                {testState === "idle" && (
                  <button
                    onClick={startReactionTest}
                    className="px-6 py-3 rounded-full bg-gradient-to-r from-cyan-500 to-sky-400 text-slate-950 font-black font-mono text-sm flex items-center gap-2 hover:scale-105 transition-transform shadow-lg shadow-cyan-500/20"
                  >
                    <Play className="w-4 h-4 fill-current" /> Iniciar Teste de Reação
                  </button>
                )}

                {testState === "waiting" && (
                  <button
                    onClick={handleTestClick}
                    className="w-full h-full py-12 rounded-xl bg-rose-950/60 border border-rose-500/50 text-rose-300 font-mono font-bold text-sm animate-pulse"
                  >
                    AGUARDE A LUZ VERDE... <br />
                    <span className="text-xs font-normal text-rose-400">(Não clique antes!)</span>
                  </button>
                )}

                {testState === "ready" && (
                  <button
                    onClick={handleTestClick}
                    className="w-full h-full py-12 rounded-xl bg-emerald-500 text-slate-950 font-black font-mono text-xl animate-bounce shadow-2xl shadow-emerald-500/50"
                  >
                    ▲ CLIQUE AGORA! ▲
                  </button>
                )}

                {testState === "result" && reactionTime && (
                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">SEU TEMPO DE REAÇÃO:</span>
                    <span className="text-5xl font-black font-mono text-cyan-400">{reactionTime} ms</span>
                    
                    <div className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900 border border-cyan-500/40 text-cyan-300">
                      {reactionTime < 220
                        ? "PERFEITO // NÍVEL PILOTO DE F1"
                        : reactionTime < 320
                        ? "EXCELENTE // DENTRO DO PADRÃO VIP"
                        : "BOM // RECOMENDADO MÓDULO DE REAÇÃO IA"}
                    </div>

                    <button
                      onClick={startReactionTest}
                      className="mt-3 text-xs font-mono text-slate-400 hover:text-white flex items-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Tentar Novamente
                    </button>
                  </div>
                )}

                {tooEarly && (
                  <div className="text-rose-400 font-mono text-xs space-y-2">
                    <p className="font-bold">CLICOU MUITO CEDO!</p>
                    <button
                      onClick={startReactionTest}
                      className="px-4 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-white hover:text-cyan-400 text-xs"
                    >
                      Tentar Novamente
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Test Summary Footer */}
            <div className="mt-6 pt-4 border-t border-slate-800 flex justify-between items-center text-[10px] font-mono text-slate-400">
              <span>MÉDIA HUMANA: 250ms</span>
              <span className="text-cyan-400">BENCHMARK IA: 0.05ms</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default CockpitSimulator;
