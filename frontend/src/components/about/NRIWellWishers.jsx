import React from "react";
import { motion } from "framer-motion";

// --- Import NRI Images ---
import amolakh from "../../assets/amolakh.jpg";
import tirlok from "../../assets/tirlok.jpg";
import amarjit from "../../assets/amarjot.jpg";
import prabhjot from "../../assets/prabhjot.jpg";
import ravinder from "../../assets/ravinder.jpg";
import harjinder from "../../assets/harjinder.jpg";
import kamaljit from "../../assets/kamaljit.jpg";

export default function NRIWellWishers() {
  const wellWishers = [
    {
      name: "Mr. Amolakh Singh Gakhal, USA",
      text: "Mr. Amolakh Singh Gakhal is Chairman, Gold's Gym, Jalandhar, Mohali & Amritsar, resident of village Gakhal (now settled in USA), is a good sports promoter. In Surjit Hockey Tournament Jalandhar the cash prize of 2.5 Lakhs is sponsored by Mr. Gakhal since 2007.",
      image: amolakh,
    },
    {
      name: "Mr. Tirlok Singh Bhullar, Canada",
      text: "Mr. Tirlok Singh Bhullar who is NRI belongs to Jalandhar and is an active senior member of the Society. At presently, he is settled at Surry (Canada). Mr. Bhullar is a veteran hockey player and is an international Grade-I Hockey Umpire by the Federation of International Hockey (FIH). He participated in Barcelona Olympics-1992 as an Umpire.",
      image: tirlok,
    },
    {
      name: "Mr. Amarjit Singh Dhillon, USA",
      text: "Mr. Amarjit Singh Dhillon is a non resident Indian. He belongs to Jalandhar Cantt. He is popularly known as Ambi Dhillon. Mr. Dhillon is a National Level hockey player He is a sports promoter in USA as well as in India. His Contact No. is +001-940-321-7160.",
      image: amarjit,
    },
    {
      name: "Mr. Prabhjot Singh Bhatia, USA",
      text: "Mr. Prabhjot Singh Bhatia, resident of Jalandhar, now settled in USA, is a National Level hockey player & Umpire. He represented Guru Nanak Dev University (GNDU) in various Inter Universities Championships, and also represented Punjab State & Chandigarh in Junior & Senior National Hockey Championships.",
      image: prabhjot,
    },
    {
      name: "Mr. Ravinder Singh Powar, UK",
      text: "Mr. Ravinder Singh Powar, NRI, resident of Jalandhar, now settled in UK, is a National Level hockey player He is a sports promoter in UK as well as in India. He has sponsored all the Prizes like Refrigerator, Washing Machine, Color TV, Micro Wave and sports Kits etc. which were awarded to the best lucky spectators of the tournament.",
      image: ravinder,
    },
    {
      name: "Mr. Harjinder Singh Chahal, USA",
      text: "Mr. Harjinder Singh Chahal is a non resident Indian. He belongs to Chahlan, District Gurdaspur, Punjab. He is popularly known as Bhappi. Mr. Bhappi is running a transport business in USA. He is an international hockey player. He played for Rail Coach Facotry, Kapurthala & Punjab & Sind bank as Goal Keeper for so many years. He is also good sports promoter in USA as well as in India. His Contact No. is +001-972-375-8628.",
      image: harjinder,
    },
    {
      name: "Mr. Kamaljit Singh Gill Alias Kam Gill, USA",
      text: "Mr. Kamaljit Singh Gill is a non resident Indian. He belongs to village Dakoha near Jalandhar Cantt. He is popularly known as KAM GILL. Mr. Gill is a National Level hockey player. He is a sports promoter in USA as well as in India. He represented Guru Nanak Dev University (GNDU) in various Inter Universities Championships, and also represented Punjab State in Junior & Senior National Hockey Championships.",
      image: kamaljit,
    },
  ];

  return (
    <section
      id="nri-well-wishers"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 bg-[#0f1a30] text-white font-[Sora]"
    >
      <div className="max-w-6xl mx-auto">
        {/* --- Section Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3 text-center"
          style={{ color: "#ffd700" }}
        >
          Our NRI Well Wishers
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#ffd700" }}
        ></div>

        {/* --- Cards --- */}
        <div className="flex flex-col gap-10">
          {wellWishers.map((w, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              className={`flex flex-col sm:flex-row items-center gap-6 p-6 sm:p-8 rounded-xl border border-[#ffd700]/20 ${
                index % 2 === 0 ? "bg-[#142448]" : "bg-[#1b2b4a]"
              } hover:shadow-lg hover:shadow-[#ffd700]/20 transition duration-300`}
            >
              <div className="w-36 h-36 sm:w-40 sm:h-40 rounded-lg overflow-hidden border-2 border-[#ffd700]/60 flex-shrink-0">
                <img
                  src={w.image}
                  alt={w.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3
                  className="text-xl sm:text-2xl font-bold mb-2"
                  style={{ color: "#ffd700" }}
                >
                  {w.name}
                </h3>
                <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                  {w.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
