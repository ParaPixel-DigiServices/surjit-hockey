import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { heroImages } from "../../config/heroImages";
import CountdownTimer from "../layout/CountdownTimer";

export default function Hero() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!heroImages || heroImages.length === 0) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000); // 6 seconds per image

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden bg-black">
      {/* Background Slideshow */}
      <div className="absolute inset-0">
        {heroImages.map((src, index) => (
          <img
            key={src}
            src={src}
            alt="Surjit Hockey Tournament action"
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-1000 ease-in-out ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
            draggable="false"
          />
        ))}
      </div>

      {/* Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60"></div>

      {/* Hero Content - Timer at Bottom */}
      <div className="relative z-10 w-full min-h-[90vh] flex items-end justify-center pb-12">
        <div className="text-[#ffd700] text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-center px-6 py-6 rounded-2xl backdrop-blur-md bg-black/40 border-2 border-[#ffd700]/30 shadow-2xl">
          <CountdownTimer />
        </div>
      </div>
    </section>
  );
}
