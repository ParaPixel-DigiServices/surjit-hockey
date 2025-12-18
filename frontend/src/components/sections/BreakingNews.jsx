import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function BreakingNews() {
  // Hardcoded news items from the backup database
  const newsItems = [
    "42ND INDIANOIL SERVO SURJIT HOCKEY TOURNAMENT: THE WINNERS TEAM WILL BE AWARDED RS. 5.51 LAKHS WHEREAS THE RUNNERS UP TEAM WILL BE POCKETED RS. 2.50 LAKHS..",
    "40TH INDIAN OIL SERVO SURJIT HOCKEY TOURNAMENT: PUNJAB POLICE JALANDHAR AND CAG DELHI TEAMS ENTER THE LEAGUE ROUND",
    "38TH INDIAN OIL SERVO SURJIT HOCKEY TOURNAMENT BEGINS | PUNJAB POLICE BEAT RAIL COACH FACTORY KAPURTHALA BY 1-0",
    "REGISTRATIONS NOW OPEN FOR THE UPCOMING TOURNAMENT | TEAMS FROM ACROSS THE COUNTRY ARE INVITED TO PARTICIPATE",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % newsItems.length);
    }, 8000); // Change news every 8 seconds

    return () => clearInterval(interval);
  }, [newsItems.length]);

  return (
    <section
      className="w-full bg-black text-white py-3 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1920px] mx-auto px-6">
        <div className="flex items-center gap-4">
          {/* Breaking News Label */}
          <div className="relative flex-shrink-0">
            {/* Red Arrow Background */}
            <div className="relative bg-[#e31e24] px-6 py-2.5 flex items-center justify-center min-w-[180px]">
              <span className="text-white font-bold text-lg tracking-wider uppercase relative z-10">
                BREAKING NEWS
              </span>
              {/* Arrow Point */}
              <div className="absolute right-0 top-0 h-full w-0 translate-x-full">
                <svg
                  className="h-full"
                  width="20"
                  height="100%"
                  viewBox="0 0 20 40"
                  preserveAspectRatio="none"
                  fill="none"
                >
                  <polygon points="0,0 20,20 0,40" fill="#e31e24" />
                </svg>
              </div>
            </div>
          </div>

          {/* Scrolling News Content */}
          <div className="flex-1 overflow-hidden relative">
            <motion.div
              key={currentIndex}
              initial={{ x: "100%" }}
              animate={{ x: isHovered ? undefined : "-100%" }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: 0,
              }}
              className="whitespace-nowrap"
            >
              <span className="text-base md:text-lg font-medium tracking-wide">
                {newsItems[currentIndex]}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
