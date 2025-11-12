import React from "react";
import { motion } from "framer-motion";

// --- Import advisor images ---
import ashokGupta from "../../assets/ashok-gupta.jpg";
import venuParsad from "../../assets/venu-prasad.jpg";
import nitinKohli from "../../assets/nitin-kohli.jpg";
import romeshMittal from "../../assets/romesh-mittal.jpg";

export default function Advisors() {
  const advisors = [
    {
      name: "Mr. Ashok Kumar Gupta, IAS",
      designation: "Secretary to Govt. Punjab (Retd)",
      image: ashokGupta,
    },
    {
      name: "Mr. A Venu Parsad, IAS",
      designation: "Secretary to Govt. Punjab",
      image: venuParsad,
    },
    {
      name: "Mr. Nitin Kohli",
      designation: "Managing Director, Tracer Shoes, Jalandhar",
      image: nitinKohli,
    },
    {
      name: "Mr. Romesh Mittal",
      designation: "Chairman, Lovely Group, Jalandhar",
      image: romeshMittal,
    },
  ];

  return (
    <section
      id="advisors"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 bg-white text-[#1b2b4a] font-[Sora]"
    >
      <div className="max-w-6xl mx-auto">
        {/* --- Section Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3 text-center"
          style={{ color: "#d4af37" }}
        >
          Advisors of the Society
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#d4af37" }}
        ></div>

        {/* --- Advisors Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          {advisors.map((a, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-[#f8f8f8] border border-[#e0e0e0] rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg hover:shadow-[#d4af37]/20 hover:-translate-y-1 transition duration-300"
            >
              <div className="w-28 h-28 rounded-md overflow-hidden border-2 border-[#d4af37]/50 shadow-md">
                <img
                  src={a.image}
                  alt={a.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-bold mb-1 text-[#1b2b4a]">
                  {a.name}
                </h3>
                <p className="text-sm sm:text-base text-[#1b2b4a]/80">
                  {a.designation}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
