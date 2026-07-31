import React, { useState } from "react";
import { Car, Award, Calendar, ChevronRight, Zap, Cpu, CheckCircle2 } from "lucide-react";
import { soundEngine } from "../utils/audio";

interface FleetVehicle {
  id: string;
  name: string;
  category: string;
  power: string;
  acceleration: string;
  range: string;
  hudType: string;
  image: string;
  features: string[];
}

interface Instructor {
  id: string;
  name: string;
  role: string;
  specialty: string;
  experience: string;
  rating: string;
  image: string;
  availableSlots: string[];
}

const fleetData: FleetVehicle[] = [
  {
    id: "taycan",
    name: "Porsche Taycan Cyber-AR",
    category: "SUPERCARRO DE TREINO",
    power: "1,050 CV",
    acceleration: "0-100 KM/H em 2.2s",
    range: "480 KM",
    hudType: "HUD VISUAL 3D HOLOGRÁFICO",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    features: ["Torque Vetorial Duplo", "Cockpit HUD de Pista", "Controle Anti-Derrapagem IA", "Telemetria Biométrica"],
  },
  {
    id: "teslamodels",
    name: "Tesla Model S Apex Edition",
    category: "SEDAN ELÉTRICO AUTÔNOMO",
    power: "1,020 CV",
    acceleration: "0-100 KM/H em 2.1s",
    range: "600 KM",
    hudType: "HUD COMPLETO LIDAR 360",
    image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80",
    features: ["Volante Yoke de Competição", "IA Autônoma Nível 4", "Suspensão Ativa Preditiva", "Visão Noturna Térmica"],
  },
  {
    id: "rimac",
    name: "Rimac Nevera Custom Academy",
    category: "HYPERCARRO VIRTUAL / PISTA",
    power: "1,914 CV",
    acceleration: "0-100 KM/H em 1.81s",
    range: "550 KM",
    hudType: "INTERFACE DIRETA COMPUTAÇÃO",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
    features: ["4 Motores Elétricos Individuais", "Treino de Reação F1", "Simulação de Força G", "Vetorização Preditiva"],
  },
];

const instructorData: Instructor[] = [
  {
    id: "marco",
    name: "Eng. Marco Santos",
    role: "INSTRUTOR-CHEFE DE PISTA",
    specialty: "Dinâmica de Veículos EV & Controle de Derrapagem",
    experience: "14 anos de experiência",
    rating: "4.99 / 5.0 (820+ ALUNOS)",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80",
    availableSlots: ["Amanhã - 10:00", "Amanhã - 15:30", "Sexta - 09:00"],
  },
  {
    id: "sofia",
    name: "Dra. Sofia Lima",
    role: "ESPECIALISTA BIOMÉTRICA",
    specialty: "Treino Cognitivo & Navegação Noturna HUD",
    experience: "9 anos de experiência",
    rating: "4.98 / 5.0 (640+ ALUNOS)",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80",
    availableSlots: ["Amanhã - 11:30", "Sábado - 14:00", "Sábado - 16:30"],
  },
  {
    id: "gemini",
    name: "Instrutor IA Gemini Omni",
    role: "SISTEMA DE CO-PILOTO 24/7",
    specialty: "Análise Preditiva de Tráfego & Correção de Erros",
    experience: "2,000,000+ Horas de Treino",
    rating: "5.00 / 5.0 (Ilimitado)",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=500&q=80",
    availableSlots: ["Disponível Instantaneamente 24/7"],
  },
];

interface FleetProps {
  onSelectVehicle: (carName: string) => void;
}

export const FleetAndInstructors: React.FC<FleetProps> = ({ onSelectVehicle }) => {
  const [activeTab, setActiveTab] = useState<"fleet" | "instructors">("fleet");
  const [selectedCar, setSelectedCar] = useState<FleetVehicle>(fleetData[0]);

  return (
    <section id="frota" className="relative w-full py-28 bg-slate-950 text-white overflow-hidden border-t border-slate-900">
      {/* Cyber Grid Background */}
      <div className="absolute inset-0 bg-cyber-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase mb-3">
              <Car className="w-4 h-4 text-orange-400" />
              <span>TECNOLOGIA DE PONTA // FROTA & EQUIPE</span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter font-display">
              Veículos Elétricos <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
                & Instrutores Certificados
              </span>
            </h2>
          </div>

          {/* Tab Switcher */}
          <div className="flex items-center gap-2 bg-slate-900/80 p-1.5 rounded-2xl border border-slate-800">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("fleet");
              }}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "fleet"
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Frota Elétrica Cyber
            </button>
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab("instructors");
              }}
              className={`px-5 py-2 rounded-xl text-xs font-mono font-bold transition-all ${
                activeTab === "instructors"
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              Corpo Docente IA
            </button>
          </div>
        </div>

        {/* Fleet Tab View */}
        {activeTab === "fleet" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Vehicle Specs Display (7 cols) */}
            <div className="lg:col-span-7 bg-slate-900/70 rounded-3xl border border-slate-800 p-6 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between">
              
              <div className="relative h-[280px] md:h-[340px] rounded-2xl overflow-hidden mb-6 border border-slate-800">
                <img
                  src={selectedCar.image}
                  alt={selectedCar.name}
                  className="w-full h-full object-cover filter brightness-90 hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <div>
                    <span className="text-[10px] font-mono text-cyan-400 bg-slate-950/80 px-2.5 py-1 rounded-md border border-cyan-500/30">
                      {selectedCar.category}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-black text-white uppercase font-display mt-2">
                      {selectedCar.name}
                    </h3>
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onSelectVehicle(selectedCar.name);
                    }}
                    className="px-4 py-2 rounded-full bg-cyan-500 text-slate-950 font-mono font-bold text-xs flex items-center gap-1.5 hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/30"
                  >
                    <span>Reservar Este Veículo</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Specs Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 font-mono">
                <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[9px] text-slate-400 uppercase">POTÊNCIA EV</span>
                  <div className="text-base font-bold text-cyan-400 mt-0.5">{selectedCar.power}</div>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800">
                  <span className="text-[9px] text-slate-400 uppercase">ACELERAÇÃO</span>
                  <div className="text-base font-bold text-orange-400 mt-0.5">{selectedCar.acceleration}</div>
                </div>

                <div className="bg-slate-950/80 p-3 rounded-2xl border border-slate-800 col-span-2 md:col-span-1">
                  <span className="text-[9px] text-slate-400 uppercase">AUTONOMIA</span>
                  <div className="text-base font-bold text-emerald-400 mt-0.5">{selectedCar.range}</div>
                </div>
              </div>

              {/* Feature Checklist */}
              <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs font-mono text-slate-300">
                {selectedCar.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

            </div>

            {/* Right Vehicle Selector List (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-slate-400 mb-2">
                SELECIONE UM VEÍCULO PARA EXAMINAR
              </h4>

              {fleetData.map((car) => (
                <div
                  key={car.id}
                  onClick={() => {
                    soundEngine.playClick();
                    setSelectedCar(car);
                  }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center gap-4 ${
                    selectedCar.id === car.id
                      ? "bg-slate-900 border-cyan-500 shadow-lg shadow-cyan-500/10"
                      : "bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60"
                  }`}
                >
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-20 h-16 object-cover rounded-xl border border-slate-800"
                  />
                  <div className="flex-1">
                    <div className="text-[9px] font-mono text-cyan-400">{car.category}</div>
                    <div className="text-sm font-bold text-white uppercase">{car.name}</div>
                    <div className="text-xs font-mono text-slate-400 mt-0.5 flex items-center gap-3">
                      <span>{car.power}</span>
                      <span className="text-slate-600">•</span>
                      <span className="text-orange-400">{car.acceleration}</span>
                    </div>
                  </div>
                  <ChevronRight className={`w-5 h-5 transition-transform ${selectedCar.id === car.id ? "text-cyan-400 translate-x-1" : "text-slate-600"}`} />
                </div>
              ))}
            </div>

          </div>
        )}

        {/* Instructors Tab View */}
        {activeTab === "instructors" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {instructorData.map((inst) => (
              <div
                key={inst.id}
                className="bg-slate-900/60 rounded-3xl border border-slate-800 p-6 backdrop-blur-xl hover:border-cyan-500/40 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  <div className="relative w-full h-48 rounded-2xl overflow-hidden mb-5 border border-slate-800">
                    <img
                      src={inst.image}
                      alt={inst.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3 bg-slate-950/80 px-2.5 py-1 rounded-full text-[10px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <Award className="w-3 h-3 text-emerald-400" />
                      <span>{inst.rating}</span>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-wider">
                    {inst.role}
                  </span>
                  <h3 className="text-xl font-bold font-display text-white mt-1">
                    {inst.name}
                  </h3>
                  <p className="text-xs font-mono text-slate-300 mt-2 leading-relaxed">
                    {inst.specialty}
                  </p>
                  <div className="text-[10px] font-mono text-slate-400 mt-1">
                    {inst.experience}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800">
                  <div className="text-[10px] font-mono text-slate-400 mb-2 uppercase">PRÓXIMOS SLOTS DISPONÍVEIS:</div>
                  <div className="space-y-1.5 mb-4">
                    {inst.availableSlots.map((slot) => (
                      <div
                        key={slot}
                        className="text-xs font-mono text-cyan-300 bg-slate-950/80 p-2 rounded-xl border border-slate-800 flex items-center gap-2"
                      >
                        <Calendar className="w-3.5 h-3.5 text-cyan-400" />
                        <span>{slot}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      soundEngine.playClick();
                      onSelectVehicle(`Sessão com ${inst.name}`);
                    }}
                    className="w-full py-2.5 rounded-xl bg-slate-900 border border-cyan-500/30 text-cyan-400 font-mono font-bold text-xs hover:bg-cyan-500 hover:text-slate-950 transition-colors flex items-center justify-center gap-2"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Reservar com {inst.name.split(" ")[1]}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FleetAndInstructors;
