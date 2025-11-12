import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Facebook, Instagram, Youtube, Twitter } from "lucide-react";

// --- Example sponsor logos ---
import sponsor1 from "../../assets/sponsors/aig.jpeg";
import sponsor2 from "../../assets/sponsors/autogas.jpg";
import sponsor3 from "../../assets/sponsors/galib.jpg";
import sponsor4 from "../../assets/sponsors/garry.jpeg";
import sponsor5 from "../../assets/sponsors/gigs.jpeg";
import sponsor6 from "../../assets/sponsors/hdfc.jpeg";
import sponsor7 from "../../assets/sponsors/ij.jpeg";
import sponsor8 from "../../assets/sponsors/in.jpg";
import sponsor9 from "../../assets/sponsors/iocl.jpeg";
import sponsor10 from "../../assets/sponsors/iov.jpeg";
import sponsor11 from "../../assets/sponsors/lic.jpg";
import sponsor12 from "../../assets/sponsors/markfd.jpeg";
import sponsor13 from "../../assets/sponsors/nakidar.jpg";
import sponsor14 from "../../assets/sponsors/pnb.jpeg";
import sponsor15 from "../../assets/sponsors/pp.jpg";
import sponsor16 from "../../assets/sponsors/psb.jpeg";
import sponsor17 from "../../assets/sponsors/ptc.jpeg";
import sponsor18 from "../../assets/sponsors/ptc.jpg";
import sponsor19 from "../../assets/sponsors/ptc3.jpeg";
import sponsor20 from "../../assets/sponsors/ptcg.jpg";
import sponsor21 from "../../assets/sponsors/pukhraaj.jpeg";
import sponsor22 from "../../assets/sponsors/pyramid.jpeg";
import sponsor23 from "../../assets/sponsors/sonalika.jpeg";
import sponsor24 from "../../assets/sponsors/sts.jpeg";
import sponsor25 from "../../assets/sponsors/ucb.jpeg";
import sponsor26 from "../../assets/sponsors/upal.jpeg";
import sponsor27 from "../../assets/sponsors/victoria.jpeg";

/**
 * HomeTopBar.jsx — Premium Hockey Dashboard Strip
 * ------------------------------------------------
 * ✅ Auto-scrolling sponsor marquee
 * ✅ Social icons with glow hover
 * ✅ Live match countdown timer
 */

export default function HomeTopBar() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your next match date here
  const matchDate = new Date("2025-11-15T17:30:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = matchDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const sponsors = [
    sponsor1,
    sponsor2,
    sponsor3,
    sponsor4,
    sponsor5,
    sponsor6,
    sponsor7,
    sponsor8,
    sponsor9,
    sponsor10,
    sponsor11,
    sponsor12,
    sponsor13,
    sponsor14,
    sponsor15,
    sponsor16,
    sponsor17,
    sponsor18,
    sponsor19,
    sponsor20,
    sponsor21,
    sponsor22,
    sponsor23,
    sponsor24,
    sponsor25,
    sponsor26,
    sponsor27,
    sponsor1, // repeat for smooth loop
    sponsor2,
    sponsor3,
    sponsor4,
    sponsor5,
    sponsor6,
    sponsor7,
    sponsor8,
    sponsor9,
    sponsor10,
    sponsor11,
    sponsor12,
    sponsor13,
    sponsor14,
    sponsor15,
    sponsor16,
    sponsor17,
    sponsor18,
    sponsor19,
    sponsor20,
    sponsor21,
    sponsor22,
    sponsor23,
    sponsor24,
    sponsor25,
    sponsor26,
    sponsor27,
  ];

  return (
    <div className="w-full bg-[#0b152d] text-white py-3 border-b border-[#ffd700]/20 overflow-hidden font-[Sora] relative">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 px-6">
        {/* --- Sponsors Scrolling --- */}
        <div className="relative w-full md:w-2/3 overflow-hidden">
          <motion.div
            className="flex items-center gap-10 w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
          >
            {sponsors.map((logo, i) => (
              <img
                key={i}
                src={logo}
                alt={`Sponsor ${i}`}
                className="h-10 md:h-12 object-contain brightness-110 hover:brightness-125 transition"
              />
            ))}
          </motion.div>
        </div>

        {/* --- Divider Line (Mobile) --- */}
        <div className="md:hidden w-full h-[1px] bg-[#ffd700]/20" />

        {/* --- Timer + Social --- */}
        <div className="flex items-center gap-6 text-sm md:text-base text-[#ffd700] tracking-wide">
          {/* Countdown Timer */}
          <div className="flex flex-col items-center md:items-start">
            <p className="text-white/70 text-xs uppercase">Next Match In:</p>
            <div className="flex gap-2 font-bold">
              <span>
                {String(timeLeft.days).padStart(2, "0")}d
              </span>
              <span>
                {String(timeLeft.hours).padStart(2, "0")}h
              </span>
              <span>
                {String(timeLeft.minutes).padStart(2, "0")}m
              </span>
              <span>
                {String(timeLeft.seconds).padStart(2, "0")}s
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {[
              { icon: <Facebook />, href: "#" },
              { icon: <Instagram />, href: "#" },
              { icon: <Twitter />, href: "#" },
              { icon: <Youtube />, href: "#" },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.2 }}
                className="text-white/80 hover:text-[#ffd700] transition"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
