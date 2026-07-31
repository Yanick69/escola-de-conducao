import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowDown, Activity, Radio, Cpu } from "lucide-react";
import { soundEngine } from "../utils/audio";

gsap.registerPlugin(ScrollTrigger);

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    const hud = hudRef.current;

    if (!container) return;

    // Pause video to allow GSAP ScrollTrigger frame scrubbing by currentTime
    if (video) {
      video.pause();
    }

    // Create GSAP Context for memory safety & clean unmounting
    const ctx = gsap.context(() => {
      // 1. INTRO ANIMATION - Cinematic Reveal
      const tlIntro = gsap.timeline();

      // Video zoom & filter transition
      tlIntro.fromTo(
        video,
        { scale: 1.25, filter: "brightness(0.3) blur(6px)" },
        { scale: 1.1, filter: "brightness(0.7) blur(0px)", duration: 2.0, ease: "power4.out" }
      );

      // Character / Line Reveal for main heading
      const revealLines = title?.querySelectorAll(".char-reveal");
      if (revealLines && revealLines.length > 0) {
        tlIntro.fromTo(
          revealLines,
          { y: "115%" },
          { y: "0%", duration: 1.4, ease: "power4.out", stagger: 0.12 },
          "-=1.5"
        );
      }

      // Fade-in HUD overlay & subtitle
      tlIntro.fromTo(
        [subtitle, hud],
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        "-=0.9"
      );

      // Continuous pulse loop for HUD indicators
      gsap.to(".hud-pulse-element", {
        opacity: 0.35,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // 2. FULL SCROLL-SCRUB VIDEO TIMELINE (Driven by ScrollTrigger)
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.5,
        pin: true,
        onUpdate: (self) => {
          if (video && video.duration) {
            // Scrub video currentTime smoothly with scroll progress (0 to 1)
            video.currentTime = self.progress * video.duration;
          }

          // Trigger subtle sound feedback at key assembly points
          const step = Math.floor(self.progress * 4);
          if (step !== (video as any)?._lastStep) {
            (video as any)._lastStep = step;
            soundEngine.playCockpitHum(0.4);
          }
        },
      });

      // Animate HUD & Title fade out during scroll
      const tlScroll = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });

      tlScroll.to(
        video,
        {
          scale: 1.0,
          borderRadius: "24px",
          filter: "brightness(0.85) contrast(1.1)",
          ease: "none",
        },
        0
      );

      // Typography moves up with subtle fade out
      tlScroll.to(
        [title, subtitle],
        {
          y: -140,
          opacity: 0.1,
          ease: "none",
        },
        0
      );

      // HUD overlay transforms
      tlScroll.to(
        hud,
        {
          scale: 1.05,
          opacity: 0.4,
          ease: "none",
        },
        0
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-[200vh] bg-slate-950 flex flex-col justify-start items-center overflow-hidden"
    >
      {/* Sticky Hero Frame */}
      <div className="sticky top-0 left-0 w-full h-screen flex items-center justify-center overflow-hidden px-4 md:px-10">
        
        {/* Futuristic Cockpit HUD Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-slate-950">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster="https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=1600&q=80"
            className="w-full h-full object-cover origin-center will-change-transform opacity-90"
            style={{ filter: "brightness(0.75) contrast(1.15)" }}
            onError={(e) => {
              console.log("Hero video load error, switching fallback");
              const target = e.currentTarget;
              target.src = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4";
              target.play().catch(() => {});
            }}
          >
            {/* Primary & Backup High Definition Automotive Cockpit / Night Drive Video Loops */}
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4"
              type="video/mp4"
            />
            <source
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              type="video/mp4"
            />
          </video>

          {/* Optimized Gradient Overlay for HUD Readability without blocking video */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-slate-950/70 opacity-70 pointer-events-none" />
          <div className="absolute inset-0 scanline pointer-events-none opacity-20" />
        </div>

        {/* Projected AR HUD Cockpit Overlay */}
        <div
          ref={hudRef}
          className="absolute inset-0 pointer-events-none flex items-center justify-center z-10 p-4 md:p-12"
        >
          <div className="relative w-full max-w-6xl h-full max-h-[84vh] border border-cyan-500/25 rounded-3xl p-5 md:p-8 flex flex-col justify-between hud-glow">
            
            {/* Outer Cyber Frames */}
            <div className="absolute inset-0 border border-cyan-500/10 rounded-3xl scale-[0.98] pointer-events-none" />
            
            {/* Top HUD Technical Bar */}
            <div className="flex justify-between items-start text-[10px] md:text-xs font-mono tracking-widest text-cyan-400/70 uppercase">
              <div className="flex flex-col gap-1">
                <span className="flex items-center gap-2 text-cyan-300 font-bold">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  AR_TELEMETRIA_IA: ATIVA
                </span>
                <span className="text-slate-400 flex items-center gap-1">
                  <Cpu className="w-3 h-3 text-cyan-400" /> INSTRUTOR: GEMINI_GEN_3
                </span>
              </div>
              <div className="text-right flex flex-col items-end">
                <span className="text-slate-400 flex items-center gap-1">
                  <Radio className="w-3 h-3 text-orange-400 animate-ping" /> COCKPIT_HUD_v4.2
                </span>
                <span className="text-orange-400 hud-pulse-element font-bold mt-0.5">
                  ▲ VARREDURA EM REAL-TIME
                </span>
              </div>
            </div>

            {/* Central Holographic Reticle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-dashed border-cyan-500/30 rounded-full flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 border border-cyan-400/40 rounded-full flex items-center justify-center animate-radar">
                <div className="w-3 h-3 bg-orange-500 rounded-full animate-ping" />
              </div>
              <div className="absolute w-full h-[1px] bg-cyan-500/15" />
              <div className="absolute h-full w-[1px] bg-cyan-500/15" />
              
              {/* Radar Crosshair Labels */}
              <span className="absolute -top-5 text-[8px] font-mono text-cyan-400/60">ALINHAMENTO 100%</span>
              <span className="absolute -bottom-5 text-[8px] font-mono text-cyan-400/60">LIDAR: LIMPO</span>
            </div>

            {/* Bottom HUD Telemetry Metrics */}
            <div className="flex justify-between items-end text-[10px] md:text-xs font-mono tracking-widest text-cyan-400/60">
              <div className="space-y-1 text-left">
                <div className="flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-cyan-400" /> VELOCIDADE:{" "}
                  <span className="text-white font-bold font-sans text-sm md:text-base">0 KPH</span>
                </div>
                <div>AUTONOMIA_EV: <span className="text-emerald-400 font-bold">98% (480 KM)</span></div>
              </div>
              <div className="text-right space-y-1">
                <div>GPS: <span className="text-slate-200">38°43'20" N 9°08'21" W</span></div>
                <div>MODO_SIMULAÇÃO: <span className="text-cyan-300 font-bold">PRONTO</span></div>
              </div>
            </div>

          </div>
        </div>

        {/* Oversized Typography Container */}
        <div className="relative z-20 flex flex-col items-center text-center max-w-5xl pointer-events-none select-none px-4">
          
          {/* Badge Label */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-[11px] font-mono tracking-widest uppercase mb-6 shadow-xl">
            <Sparkles className="w-3.5 h-3.5 text-orange-400" />
            <span>A PRIMEIRA ESCOLA DE CONDUÇÃO 100% IA DA EUROPA</span>
          </div>

          <h1
            ref={titleRef}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white font-display leading-[0.9] flex flex-col items-center"
          >
            <span className="relative block overflow-hidden h-[1.1em] w-full">
              <span className="char-reveal block">DOMINE A</span>
            </span>
            <span className="relative block overflow-hidden h-[1.1em] w-full text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-500">
              <span className="char-reveal block">ESTRADA</span>
            </span>
          </h1>

          <p
            ref={subtitleRef}
            className="mt-6 text-xs sm:text-sm md:text-base font-mono tracking-wide text-slate-300 uppercase max-w-2xl leading-relaxed bg-slate-950/70 p-3.5 rounded-2xl border border-slate-800/80 backdrop-blur-md"
          >
            Simulação holográfica com inteligência artificial, cockpit com realidade aumentada e condução adaptativa a 60 FPS.
          </p>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#blueprint"
          onClick={(e) => {
            e.preventDefault();
            soundEngine.playClick();
            soundEngine.playCockpitHum(0.8);
            document.getElementById("blueprint")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-25 flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-[10px] font-mono tracking-widest text-cyan-400/80 uppercase animate-pulse flex items-center gap-1 group-hover:text-cyan-300 transition-colors">
            <ArrowDown className="w-3 h-3 text-orange-400 animate-bounce" /> Scroll para Conduzir
          </span>
          <div className="w-[1px] h-10 bg-gradient-to-b from-cyan-400 via-slate-600 to-transparent group-hover:h-14 transition-all" />
        </a>

      </div>
    </section>
  );
};

export default HeroSection;
