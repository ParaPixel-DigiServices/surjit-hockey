import React from 'react';
import heroImage from '../../assets/hero.jpg'; // ✅ replace with your image

/**
 * Hero Section — Sporty Tournament Style
 * ----------------------------------------
 * - Bold Sora uppercase typography
 * - Dynamic accent bar under headline
 * - Subtle gradient overlay
 * - Responsive and cinematic
 */
export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <img
        src={heroImage}
        alt="Surjit Hockey Tournament"
        className="absolute inset-0 w-full h-full object-cover object-center"
        draggable="false"
      />

      {/* Gradient Overlay for Contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 sm:px-10 md:px-14 max-w-3xl mx-auto">
        {/* Subheading */}
        <h3 className="text-sm sm:text-base md:text-lg text-white font-semibold tracking-[0.35em] uppercase mb-3 drop-shadow-md">
          Established 1984 • Punjab
        </h3>

        {/* Main Heading */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white uppercase leading-[1.1] tracking-tight drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          The <span className="text-[var(--color-accent, #ffd700)]">Spirit</span> of  
          <br className="hidden sm:block" />
          Surjit Hockey Lives On
        </h1>

        {/* Accent underline bar */}
        <div className="mt-5 mb-6 w-20 h-[3px] bg-[var(--color-accent,#ffd700)] mx-auto rounded-full"></div>

        {/* Tagline */}
        <p className="text-white/85 text-base sm:text-lg md:text-xl font-medium leading-relaxed drop-shadow-[0_1px_5px_rgba(0,0,0,0.7)] tracking-wide">
          Celebrating a legacy of passion, precision, and pride on the field.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center">
          <button className="bg-[var(--color-accent,#ffd700)] text-[#1b2b4a] font-extrabold uppercase tracking-wide px-8 py-3 rounded-md hover:bg-yellow-400 transition-all duration-300 shadow-lg hover:shadow-xl">
            Explore Tournament
          </button>
        </div>
      </div>
    </section>
  );
}
