import React, { useState } from "react";
import { SmoothScrollProvider } from "./providers/SmoothScrollProvider";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import BentoServices from "./components/BentoServices";
import BlueprintToRender from "./components/BlueprintToRender";
import CockpitSimulator from "./components/CockpitSimulator";
import FleetAndInstructors from "./components/FleetAndInstructors";
import PricingAndPlans from "./components/PricingAndPlans";
import BookingModal from "./components/BookingModal";
import Footer from "./components/Footer";

export function App() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedModule, setSelectedModule] = useState("");

  const handleOpenBooking = (initialSelection = "") => {
    setSelectedModule(initialSelection);
    setBookingOpen(true);
  };

  return (
    <SmoothScrollProvider>
      <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-x-hidden selection:bg-cyan-500 selection:text-slate-950">
        
        {/* Futuristic Floating Header / Navbar */}
        <Navbar onOpenBooking={() => handleOpenBooking()} />

        {/* Main Content Sections */}
        <main>
          {/* 1. Hero Video Scroll with HUD Cockpit */}
          <HeroSection />

          {/* 2. Cybernetic Bento Grid Services */}
          <BentoServices />

          {/* 3. Blueprint to 3D Render Morph Transition */}
          <BlueprintToRender />

          {/* 4. Interactive Cockpit Reaction & AR Weather Simulator */}
          <CockpitSimulator />

          {/* 5. EV Cyber Fleet & AI Certified Instructors */}
          <FleetAndInstructors onSelectVehicle={(carName) => handleOpenBooking(carName)} />

          {/* 6. Training Plans & VIP Pricing */}
          <PricingAndPlans onSelectPlan={(planName) => handleOpenBooking(planName)} />
        </main>

        {/* Footer */}
        <Footer />

        {/* Interactive Booking Modal */}
        <BookingModal
          isOpen={bookingOpen}
          onClose={() => setBookingOpen(false)}
          initialSelection={selectedModule}
        />

      </div>
    </SmoothScrollProvider>
  );
}

export default App;
