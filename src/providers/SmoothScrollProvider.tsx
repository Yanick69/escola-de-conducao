import React, { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // 1. Initialize Lenis with smooth physics configuration
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
      infinite: false,
    });

    lenisRef.current = lenis;

    // 2. Sync ScrollTrigger on Lenis scroll
    lenis.on("scroll", ScrollTrigger.update);

    // 3. Add Lenis RAF to GSAP Ticker for synchronized 60 FPS rendering
    const updateGsapTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGsapTicker);

    // Disable internal lag smoothing to avoid visual jumping
    gsap.ticker.lagSmoothing(0);

    // 4. Cleanup on unmount
    return () => {
      gsap.ticker.remove(updateGsapTicker);
      lenis.destroy();
      ScrollTrigger.killAll();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScrollProvider;
