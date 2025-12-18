import React, { useState } from "react";
import { motion } from "framer-motion";

export default function BreakingNews() {
  // Hardcoded news items from the backup database
  const newsItems = [
    "42ND INDIANOIL SERVO SURJIT HOCKEY TOURNAMENT: THE WINNERS TEAM WILL BE AWARDED RS. 5.51 LAKHS WHEREAS THE RUNNERS UP TEAM WILL BE POCKETED RS. 2.50 LAKHS",
    "40TH INDIAN OIL SERVO SURJIT HOCKEY TOURNAMENT: PUNJAB POLICE JALANDHAR AND CAG DELHI TEAMS ENTER THE LEAGUE ROUND",
    "38TH INDIAN OIL SERVO SURJIT HOCKEY TOURNAMENT BEGINS | PUNJAB POLICE BEAT RAIL COACH FACTORY KAPURTHALA BY 1-0",
    "REGISTRATIONS NOW OPEN FOR THE UPCOMING TOURNAMENT | TEAMS FROM ACROSS THE COUNTRY ARE INVITED TO PARTICIPATE",
  ];

  const [isHovered, setIsHovered] = useState(false);

  // Duplicate news items for seamless looping
  const allNews = [...newsItems, ...newsItems];

  return (
    <section
      className="w-full bg-[#015296] py-0.5 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-[1920px] mx-auto px-2">
        <div className="flex items-center gap-3 bg-white shadow-lg rounded-md px-4 py-2">
          {/* Breaking News Label */}
          <div className="relative flex-shrink-0">
            {/* Red Arrow Background */}
            <div className="relative bg-[#e31e24] px-4 py-1.5 flex items-center justify-center min-w-[150px]">
              <span className="text-white font-bold text-sm tracking-wider uppercase relative z-10">
                BREAKING NEWS
              </span>
              {/* Arrow Point */}
              <div className="absolute right-0 top-0 h-full w-0 translate-x-full">
                <svg
                  className="h-full"
                  width="16"
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
              className="flex gap-20"
              animate={{
                x: isHovered ? undefined : ["0%", "-50%"],
              }}
              transition={{
                duration: 60,
                ease: "linear",
                repeat: Infinity,
              }}
              style={{ width: "max-content" }}
            >
              {allNews.map((news, index) => (
                <span
                  key={index}
                  className="text-sm md:text-base font-medium tracking-wide text-[#1b2b4a] whitespace-nowrap"
                >
                  {news}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
