import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  Zap,
  Cpu,
  Compass,
  Play,
  Pause,
  RotateCcw,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Gauge,
  Activity,
  Sliders,
  Car
} from "lucide-react";
import { soundEngine } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

interface AssemblyStep {
  id: number;
  threshold: number; // 0 to 100
  title: string;
  subtitle: string;
  description: string;
  techSpecs: { label: string; value: string }[];
  tag: string;
  color: string;
}

const ASSEMBLY_STEPS: AssemblyStep[] = [
  {
    id: 1,
    threshold: 0,
    title: "1. ESTRUTURA BASE & BATERIA 800V",
    subtitle: "Chassi em Alumínio de Alta Rigidez Métrica",
    description: "Estrutura do veículo suspensa no ar. Absorção de impacto lateral de 42,000 Nm e alojamento de baterias de estado sólido no centro de gravidade.",
    techSpecs: [
      { label: "TORÇÃO", value: "42,000 Nm/°" },
      { label: "PESO CHASSI", value: "310 kg" },
      { label: "CENTRO GRAVIDADE", value: "385 mm" },
    ],
    tag: "CHASSI NAKED",
    color: "from-cyan-500 to-blue-500",
  },
  {
    id: 2,
    threshold: 25,
    title: "2. COCKPIT DUPLEX & GRUPO MOTOPROPULSOR",
    subtitle: "Injeção de Motor Híbrido & Pedais Duplos de Segurança",
    description: "Montagem do bloco de motor híbrido ultra-eficiente e habitáculo interior com volante e pedais duplos telemetricamente sincronizados para o instrutor.",
    techSpecs: [
      { label: "SISTEMA", value: "Pedais Duplos AR" },
      { label: "TELEMETRIA", value: "CAN-Bus 1ms" },
      { label: "INTERVENÇÃO IA", value: "< 0.05s" },
    ],
    tag: "DUAL CONTROL",
    color: "from-orange-500 to-amber-500",
  },
  {
    id: 3,
    threshold: 50,
    title: "3. SUSPENSÃO ADAPTATIVA & JANTAS 18\"",
    subtitle: "Eixos Inteligentes com Regeneração de Travagem",
    description: "Expansão hidráulica das quatro rodas e discos de travão ventilados com sistema ABS de 5ª geração para máxima aderência no piso citadino.",
    techSpecs: [
      { label: "JANTAS", value: "18\" Liga Leve" },
      { label: "TRAVAGEM", value: "Discos Carbono-Cerâmicos" },
      { label: "AMORTECIMENTO", value: "Pneumático Ativo" },
    ],
    tag: "TREM DE ROLAMENTO",
    color: "from-emerald-500 to-teal-500",
  },
  {
    id: 4,
    threshold: 75,
    title: "4. CARROÇARIA AERODINÂMICA 'ESCOLA DE CONDUÇÃO'",
    subtitle: "Capa Protetora com Sensores LiDAR Incorporados",
    description: "Encaixe da carroçaria branca personalizada com vinil oficial de instrução, câmaras 360° e zonas de deformação programada.",
    techSpecs: [
      { label: "SENSORES", value: "12 Câmaras + LiDAR" },
      { label: "COR", value: "Branco Pérola EV" },
      { label: "COEFICIENTE", value: "Cd 0.22" },
    ],
    tag: "MONOCOQUE FINAL",
    color: "from-sky-400 to-indigo-500",
  },
  {
    id: 5,
    threshold: 100,
    title: "5. CERTIFICAÇÃO 'L' & IGNIÇÃO FARÓIS LED",
    subtitle: "Fecho das Portas e Ativação do Sinal de Instrução Oficial",
    description: "Instalação do identificador de topo 'L ESCOLA DE CONDUÇÃO', fecho estanque das portas e acendimento dos faróis Matrix-LED. Pronto para a estrada!",
    techSpecs: [
      { label: "IDENTIFICADOR", value: "L LED Homologado" },
      { label: "ILUMINAÇÃO", value: "Matrix-LED Adaptive" },
      { label: "STATUS", value: "APROVADO PARA AULAS" },
    ],
    tag: "SISTEMA PRONTO",
    color: "from-indigo-500 to-purple-500",
  },
];

export const BlueprintToRender: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0); // 0 to 100
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState<"video" | "xray" | "blueprint">("video");
  const lastSoundStep = useRef<number>(-1);

  // Setup GSAP ScrollTrigger for Video & Canvas Assembly Frame Scrubbing
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom+=150% top",
        scrub: 0.8,
        pin: true,
        onUpdate: (self) => {
          const progressPct = Math.round(self.progress * 100);
          setScrollProgress(progressPct);

          // Video scrub control if video element is present and loaded
          if (videoRef.current && videoRef.current.duration) {
            const targetTime = self.progress * videoRef.current.duration;
            videoRef.current.currentTime = targetTime;
          }

          // Calculate current assembly step based on threshold
          let stepIdx = 0;
          if (progressPct >= 85) stepIdx = 4;
          else if (progressPct >= 65) stepIdx = 3;
          else if (progressPct >= 40) stepIdx = 2;
          else if (progressPct >= 18) stepIdx = 1;

          if (stepIdx !== lastSoundStep.current) {
            lastSoundStep.current = stepIdx;
            setCurrentStepIndex(stepIdx);
            soundEngine.playAiNotification();
            soundEngine.playCockpitHum(0.7);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  // Handle Autoplay preview
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setScrollProgress((prev) => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 100;
          }
          const next = prev + 1;
          const targetStep = Math.min(
            4,
            Math.floor((next / 100) * ASSEMBLY_STEPS.length)
          );
          setCurrentStepIndex(targetStep);
          return next;
        });
      }, 50);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const currentStep = ASSEMBLY_STEPS[currentStepIndex];

  return (
    <section
      id="blueprint"
      ref={containerRef}
      className="relative w-full h-screen bg-slate-950 text-white flex flex-col justify-between py-6 px-4 md:px-8 overflow-hidden border-t border-slate-900 select-none"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />

      {/* Top Header */}
      <div className="max-w-7xl w-full mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 z-20">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-1">
            <Car className="w-4 h-4 text-orange-400 animate-pulse" />
            <span>ENGENHARIA REVERSA // MONTAGEM SCROLLTRIGGER</span>
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight text-white font-display">
            Do <span className="text-cyan-400">Chassi</span> ao <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400">Veículo de Instrução</span>
          </h2>
        </div>

        {/* Mode Selector & Play Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-900/90 p-1 rounded-2xl border border-slate-800 text-xs font-mono">
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMode("video");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                viewMode === "video"
                  ? "bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Simulação 3D
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMode("xray");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                viewMode === "xray"
                  ? "bg-orange-500 text-slate-950 font-bold shadow-lg shadow-orange-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Raio-X EV
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setViewMode("blueprint");
              }}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                viewMode === "blueprint"
                  ? "bg-indigo-500 text-white font-bold shadow-lg shadow-indigo-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              CAD Blueprint
            </button>
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              setIsPlaying(!isPlaying);
            }}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-900 border border-slate-800 hover:border-cyan-500/50 rounded-xl text-cyan-400 text-xs font-mono transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden sm:inline">{isPlaying ? "PAUSAR" : "REPRODUZIR"}</span>
          </button>
        </div>
      </div>

      {/* Main Interactive Assembly Stage */}
      <div className="relative w-full max-w-7xl mx-auto flex-1 my-3 bg-slate-900/60 rounded-3xl border border-slate-800/80 overflow-hidden shadow-2xl flex flex-col md:flex-row items-stretch z-10">
        
        {/* 3D Visual Screen Container */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden group">
          
          {/* Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-40 pointer-events-none" />

          {/* Interactive Render Stage depending on scrollProgress */}
          {viewMode === "video" && (
            <div className="relative w-full h-full flex items-center justify-center p-4">
              
              {/* Dynamic 3D Vehicle Render Frame Interpolator */}
              <div className="relative w-full max-w-5xl h-[45vh] md:h-[55vh] rounded-2xl overflow-hidden border border-cyan-500/40 bg-slate-950 flex items-center justify-center shadow-2xl group/video">
                
                {/* ScrollTrigger Scrubbed Assembly Video */}
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  preload="auto"
                  poster="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=1600&q=80"
                  className="w-full h-full object-cover origin-center transition-all duration-300"
                  onError={(e) => {
                    console.log("Assembly video load fallback triggered");
                  }}
                >
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
                    type="video/mp4"
                  />
                  <source
                    src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
                    type="video/mp4"
                  />
                </video>

                {/* Cybernetic HUD Overlays dynamically matching assembly progress */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/60 pointer-events-none" />

                {/* Assembly Stage Overlaid HUD Markers */}
                <div className="absolute top-4 left-4 z-20 flex flex-col gap-1.5 font-mono text-[10px] pointer-events-none">
                  <div className="inline-flex items-center gap-2 bg-slate-950/90 border border-cyan-500/50 px-3 py-1.5 rounded-xl text-cyan-300 backdrop-blur-md shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="font-bold">MONTAGEM EM SCROLL: {scrollProgress}%</span>
                  </div>
                  <div className="bg-slate-950/80 px-2.5 py-1 rounded-lg text-slate-400 border border-slate-800">
                    ETAPA: <span className="text-white font-bold">{currentStep.tag}</span>
                  </div>
                </div>

                {/* Illuminated Roof Sign Badge when assembly reaches final step (100%) */}
                {scrollProgress >= 85 && (
                  <div className="absolute top-6 center z-30 bg-amber-500 text-slate-950 font-black text-xs px-4 py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_25px_rgba(245,158,11,0.9)] border-2 border-white flex items-center gap-2 animate-bounce">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping" />
                    L ESCOLA DE CONDUÇÃO - HOMOLOGADO
                  </div>
                )}

                {/* Floating Interactive Assembly Graphics Overlay */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                  {scrollProgress < 25 && (
                    <div className="bg-slate-950/80 border border-cyan-500/30 p-3 rounded-2xl backdrop-blur-md text-cyan-400 font-mono text-xs flex items-center gap-2 animate-pulse">
                      <Cpu className="w-4 h-4 text-cyan-400" />
                      <span>SCROLL PARA BAIXO PARA ACOPLAR O MOTOR & PEDAIS DUPLOS</span>
                    </div>
                  )}
                  {scrollProgress >= 25 && scrollProgress < 65 && (
                    <div className="bg-slate-950/80 border border-orange-500/40 p-3 rounded-2xl backdrop-blur-md text-orange-400 font-mono text-xs flex items-center gap-2 animate-pulse">
                      <Zap className="w-4 h-4 text-orange-400" />
                      <span>ACOPLAMENTO DO COCKPIT DUPLEX & SUSPENSÃO ATIVA</span>
                    </div>
                  )}
                  {scrollProgress >= 65 && (
                    <div className="bg-slate-950/80 border border-emerald-500/40 p-3 rounded-2xl backdrop-blur-md text-emerald-400 font-mono text-xs flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>CARROÇARIA 'ESCOLA DE CONDUÇÃO' PRONTA PARA INSTRUTOR</span>
                    </div>
                  )}
                </div>

                {/* Laser Scanning Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent blur-[1px] animate-scan-fast pointer-events-none" />

              </div>
            </div>
          )}

          {/* Alternate X-Ray EV View */}
          {viewMode === "xray" && (
            <div className="relative w-full h-full flex items-center justify-center p-6 bg-slate-950">
              <div className="relative w-full max-w-3xl h-[45vh] border border-orange-500/30 rounded-2xl p-6 bg-slate-900/80 flex flex-col justify-between">
                <div className="flex justify-between items-center text-xs font-mono text-orange-400">
                  <span>MODO RAIO-X // DIAGNÓSTICO DE COMPONENTES</span>
                  <span className="text-emerald-400">STATUS: TELEMETRIA ATIVA</span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs font-mono">
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px]">INVERSOR DUAL</div>
                    <div className="text-white font-bold text-sm">800V Silicon Carbide</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px]">PEDAL DUPLO INSTRUTOR</div>
                    <div className="text-orange-400 font-bold text-sm">Cabo de Aço + Sensor AR</div>
                  </div>
                  <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-slate-500 text-[10px]">CÂMARAS DE TELEMETRIA</div>
                    <div className="text-cyan-400 font-bold text-sm">12x 4K HDR 120fps</div>
                  </div>
                </div>
                <div className="text-[10px] font-mono text-slate-400">
                  *Todos os componentes são monitorizados em tempo real pelo servidor central de instrução Nexus em Lisboa.
                </div>
              </div>
            </div>
          )}

          {/* Alternate Blueprint View */}
          {viewMode === "blueprint" && (
            <div className="relative w-full h-full flex items-center justify-center p-6 bg-[#0a1424]">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#112240_1px,transparent_1px),linear-gradient(to_bottom,#112240_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-70" />
              <div className="relative z-10 w-full max-w-3xl h-[45vh] border border-cyan-400/40 rounded-2xl p-6 flex flex-col justify-between font-mono text-cyan-300 text-xs">
                <div className="flex justify-between items-center border-b border-cyan-500/20 pb-2">
                  <span>PLANTA DE ENGENHARIA AUTOMÓVEL VETORIAL</span>
                  <span>ESCALA 1:20</span>
                </div>
                <div className="flex items-center justify-center text-center text-cyan-400/80">
                  <p className="max-w-md">
                    CAD MENSURAÇÃO: COMPRIMENTO 4,460mm | LARGURA 1,825mm | ALTURA 1,620mm | DISTÂNCIA ENTRE EIXOS 2,640mm
                  </p>
                </div>
                <div className="flex justify-between text-[10px] text-cyan-500/60">
                  <span>DESENHO TÉCNICO HOMOLOGADO</span>
                  <span>IMPA / ANIECA COMPLIANT</span>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Right Telemetry & Assembly Specs Sidebar */}
        <div className="w-full md:w-80 bg-slate-950/90 border-t md:border-t-0 md:border-l border-slate-800 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg bg-gradient-to-r ${currentStep.color} text-slate-950`}>
                {currentStep.tag}
              </span>
              <span className="text-xs font-mono text-cyan-400 font-bold">
                {scrollProgress}% CONCLUÍDO
              </span>
            </div>

            <h3 className="text-sm font-bold text-white uppercase tracking-tight mb-1">
              {currentStep.title}
            </h3>
            <p className="text-[11px] text-cyan-400 font-mono mb-2">
              {currentStep.subtitle}
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {currentStep.description}
            </p>

            {/* Tech Specs */}
            <div className="space-y-2 mb-4">
              <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">ESPECIFICAÇÕES TÉCNICAS:</div>
              {currentStep.techSpecs.map((spec, i) => (
                <div key={i} className="flex justify-between items-center bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono">
                  <span className="text-slate-400 text-[11px]">{spec.label}</span>
                  <span className="text-white font-bold">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Jump Stage Buttons */}
          <div>
            <div className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-2">PONTOS DE MONTAGEM:</div>
            <div className="grid grid-cols-5 gap-1.5">
              {ASSEMBLY_STEPS.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setScrollProgress(step.threshold);
                    setCurrentStepIndex(idx);
                  }}
                  className={`py-1.5 rounded-lg text-[10px] font-mono font-bold border transition-all ${
                    currentStepIndex === idx
                      ? "bg-cyan-500 text-slate-950 border-cyan-400 shadow-lg shadow-cyan-500/20"
                      : "bg-slate-900 text-slate-400 border-slate-800 hover:text-white"
                  }`}
                >
                  0{step.id}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Scroll Progress Slider Bar */}
      <div className="max-w-7xl w-full mx-auto bg-slate-900/90 p-3 rounded-2xl border border-slate-800 flex items-center gap-4 z-20">
        <span className="text-[10px] font-mono text-cyan-400 font-bold whitespace-nowrap flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5" />
          CHASSI [0%]
        </span>

        <input
          type="range"
          min="0"
          max="100"
          value={scrollProgress}
          onChange={(e) => {
            const val = Number(e.target.value);
            setScrollProgress(val);
            let idx = 0;
            if (val >= 85) idx = 4;
            else if (val >= 65) idx = 3;
            else if (val >= 40) idx = 2;
            else if (val >= 18) idx = 1;
            setCurrentStepIndex(idx);
          }}
          className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
        />

        <span className="text-[10px] font-mono text-amber-400 font-bold whitespace-nowrap flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" />
          CARRO PRONTO [100%]
        </span>
      </div>

    </section>
  );
};

export default BlueprintToRender;
