import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Shield, Eye, Flame, HeartPulse, Zap, ArrowUpRight } from "lucide-react";
import { soundEngine } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: number;
  title: string;
  category: string;
  description: string;
  size: "large" | "medium" | "small";
  metric: string;
  metricLabel: string;
  icon: React.ReactNode;
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Simuladores de Pista com IA Defensiva",
    category: "TECNOLOGIA_COGNITIVA",
    description:
      "Treino imersivo em cabines de realidade virtual que simulam cenários extremos de tráfego, clima adverso e falhas mecânicas com telemetria preditiva em tempo real.",
    size: "large",
    metric: "99.4%",
    metricLabel: "PRECISÃO_PREDITIVA",
    icon: <Shield className="w-5 h-5 text-cyan-400" />,
  },
  {
    id: 2,
    title: "Navegação Noturna & HUD",
    category: "SISTEMAS_AR",
    description:
      "Aprenda a conduzir com projeções de realidade aumentada no para-brisas, identificando obstáculos invisíveis a olho nu.",
    size: "small",
    metric: "0.02s",
    metricLabel: "LATÊNCIA_HUD",
    icon: <Eye className="w-5 h-5 text-sky-400" />,
  },
  {
    id: 3,
    title: "Controle de Derrapagem Avançado",
    category: "DINÂMICA_DE_PISTA",
    description:
      "Treino prático em pistas de baixa aderência com veículos elétricos equipados com sistemas dinâmicos de vetorização de torque.",
    size: "small",
    metric: "100%",
    metricLabel: "RECUPERAÇÃO_DE_EIXO",
    icon: <Flame className="w-5 h-5 text-orange-400" />,
  },
  {
    id: 4,
    title: "Análise Biométrica de Performance",
    category: "BIO_FEEDBACK",
    description:
      "Sensores integrados ao cockpit que analisam o seu nível de stress, batimento cardíaco e tempo de reação para adaptar dinamicamente o ritmo de aprendizagem.",
    size: "medium",
    metric: "O2 / BPM",
    metricLabel: "MÉTRICAS_VITAIS",
    icon: <HeartPulse className="w-5 h-5 text-emerald-400" />,
  },
  {
    id: 5,
    title: "Transição de Condução Autônoma Híbrida",
    category: "AUTONOMIA_NÍVEL_4",
    description:
      "Domine a interface de transição entre o piloto automático de inteligência artificial e o controle manual em frações de segundo, garantindo segurança absoluta em rodovias de alta velocidade.",
    size: "large",
    metric: "NÍVEL 4",
    metricLabel: "PADRÃO_SAE",
    icon: <Zap className="w-5 h-5 text-indigo-400" />,
  },
];

export const BentoServices: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header Reveal Animation
      gsap.fromTo(
        ".bento-header",
        { opacity: 0, y: 45 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".bento-header",
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Staggered Bento Cards Entrance
      gsap.fromTo(
        ".bento-card",
        { opacity: 0, scale: 0.92, y: 55 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: ".bento-grid-container",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );

      // Interactive 3D Tilt Hover Effect
      const cards = section.querySelectorAll<HTMLElement>(".bento-card");
      cards.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;

          gsap.to(card, {
            rotateY: x * 0.04,
            rotateX: -y * 0.04,
            transformPerspective: 1000,
            ease: "power2.out",
            duration: 0.4,
          });
        };

        const handleMouseLeave = () => {
          gsap.to(card, {
            rotateY: 0,
            rotateX: 0,
            ease: "power2.out",
            duration: 0.8,
          });
        };

        card.addEventListener("mousemove", handleMouseMove);
        card.addEventListener("mouseleave", handleMouseLeave);
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="servicos"
      ref={sectionRef}
      className="relative w-full py-28 bg-slate-950 overflow-hidden border-t border-slate-900"
    >
      {/* Background Cyber Grid */}
      <div className="absolute inset-0 bg-cyber-grid opacity-30 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="bento-header mb-16 text-left max-w-3xl">
          <div className="flex items-center gap-3 text-cyan-400 font-mono text-xs tracking-widest uppercase mb-4">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
            <span>PROGRAMA_DE_TREINO_SÉCULO_XXI</span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter uppercase text-white leading-none font-display">
            Módulos de <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500">
              Condução Adaptativa
            </span>
          </h2>
          <p className="mt-4 text-xs sm:text-sm font-mono tracking-wide text-slate-300 leading-relaxed">
            Substituímos os métodos mecânicos tradicionais por engenharia preditiva, bio-feedback e simulação espacial computorizada.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="bento-grid-container grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[260px]">
          {servicesData.map((service) => (
            <div
              key={service.id}
              onMouseEnter={() => {
                soundEngine.playHoverSwell();
                soundEngine.playCockpitHum(0.5);
              }}
              onClick={() => {
                soundEngine.playAiNotification();
              }}
              className={`bento-card group relative rounded-3xl border border-slate-800 bg-slate-900/50 backdrop-blur-xl p-6 md:p-8 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-cyan-500/40 hover:bg-slate-900/80 will-change-transform shadow-xl cursor-pointer ${
                service.size === "large"
                  ? "md:col-span-2 md:row-span-2"
                  : service.size === "medium"
                  ? "md:col-span-1 md:row-span-2"
                  : "md:col-span-1 md:row-span-1"
              }`}
            >
              {/* Background Glow */}
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/15 via-sky-500/10 to-orange-500/15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl blur-md pointer-events-none" />

              {/* Card Header */}
              <div className="relative z-10 flex justify-between items-center text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase">
                <span className="flex items-center gap-2">
                  {service.icon}
                  {service.category}
                </span>
                <div className="w-2 h-2 rounded-full bg-cyan-400 group-hover:scale-150 transition-transform duration-300" />
              </div>

              {/* Card Title & Description */}
              <div className="relative z-10 my-auto py-2">
                <h3
                  className={`font-bold tracking-tight text-white uppercase group-hover:text-cyan-300 transition-colors duration-300 ${
                    service.size === "large" ? "text-2xl md:text-4xl leading-tight" : "text-lg md:text-xl"
                  }`}
                >
                  {service.title}
                </h3>
                <p className="mt-2 text-xs text-slate-300 font-mono tracking-wide leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Card Footer Metrics */}
              <div className="relative z-10 border-t border-slate-800/80 pt-4 flex justify-between items-end">
                <div className="flex flex-col text-left">
                  <span className="text-[9px] font-mono tracking-widest text-slate-400 uppercase">
                    {service.metricLabel}
                  </span>
                  <span className="text-xl md:text-3xl font-black font-sans text-white mt-1 group-hover:text-cyan-400 transition-colors duration-300">
                    {service.metric}
                  </span>
                </div>

                <div className="w-9 h-9 rounded-full border border-slate-800 bg-slate-950 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:border-cyan-500/40 transition-all duration-300 shadow-inner">
                  <ArrowUpRight className="w-4 h-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoServices;
