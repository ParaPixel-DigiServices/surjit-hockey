import React from "react";
import { motion } from "framer-motion";

// --- Sponsor logos ---
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
 * SponsorsMarquee - Auto-scrolling sponsor logos
 * Displayed below hero section with continuous animation
 */
export default function SponsorsMarquee() {
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
    // Duplicate for smooth infinite loop
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
  ];

  return (
    <section className="w-full bg-[#0b152d] py-8 overflow-hidden border-y border-[#ffd700]/20">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-2xl font-bold text-[#ffd700] text-center mb-6 uppercase tracking-wide">
          Our Proud Sponsors
        </h2>

        <div className="relative w-full overflow-hidden">
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
                alt={`Sponsor ${i + 1}`}
                className="h-16 md:h-20 object-contain brightness-110 hover:brightness-125 transition"
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
