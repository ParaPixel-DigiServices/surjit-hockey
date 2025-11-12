import React from "react";
import { motion } from "framer-motion";

// --- Import Patron Images ---
import badal from "../../assets/badal.jpg";
import iqbal from "../../assets/iqbal.jpg";
import dpReady from "../../assets/dp-ready.jpg";
import gauravYadav from "../../assets/gaurav-yadav.jpg";
import kkBhatnagar from "../../assets/kk-bhatnagar.jpg";
import scAgrawal from "../../assets/sc-agarwal.jpg";
import sudhirMittal from "../../assets/sudhir-mittal.jpg";
import nsKang from "../../assets/ns-kang.jpg";
import skKakkar from "../../assets/sk-kakkar.jpg";
import mpSingh from "../../assets/mp-singh.jpg";
import somParkash from "../../assets/som_prakash.jpg";
import kShivaParshad from "../../assets/kshiva.jpg";
import ashokGupta from "../../assets/ashok-gupta.jpg";
import anuragVerma from "../../assets/anurag-verma.jpg";
import venuParsad from "../../assets/venu-prasad.jpg";
import ajeetPannu from "../../assets/ajeet-pannu.jpg";
import hsBedi from "../../assets/hs-bedi.jpg";
import rkArora from "../../assets/rk-arora.jpg";
import kayPee from "../../assets/kay-pee.jpg";
import priyankBharti from "../../assets/priyank-bharti.jpg";
import varunRoozam from "../../assets/varun-roozam.jpg";
import avinashChopra from "../../assets/avinash-chopra.jpg";

export default function Patrons() {
  const patrons = [
    { name: "Mr. Parkash Singh Badal", title: "Honorable Chief Minister, Punjab", image: badal },
    { name: "Dr. Iqbal Singh", title: "Former His Excellency, Ex. Lt. Governor of Pondicherry", image: iqbal },
    { name: "Mr. D. P. Readdy, IAS", title: "Patron of Society", image: dpReady },
    { name: "Mr. Gaurav Yadav, IPS", title: "Former Commissioner of Police, Jalandhar", image: gauravYadav },
    { name: "Mr. K. K. Bhatnagar, IAS", title: "Former Deputy Commissioner, Jalandhar", image: kkBhatnagar },
    { name: "Mr. S. C. Agrawal, IAS", title: "Former Deputy Commissioner, Jalandhar", image: scAgrawal },
    { name: "Mr. Sudhir Mittal, IAS", title: "Former Deputy Commissioner, Jalandhar", image: sudhirMittal },
    { name: "Mr. N. S. Kang, IAS", title: "Former Deputy Commissioner, Jalandhar and Now FCR, Punjab", image: nsKang },
    { name: "Mr. Karan A. Singh, IAS", title: "Former Deputy Commissioner, Jalandhar", image: null },
    { name: "Mr. S. K. Kakkar, IAS", title: "Former Deputy Commissioner, Jalandhar", image: skKakkar },
    { name: "Mr. M. P. Singh, IAS", title: "Former Deputy Commissioner, Jalandhar", image: mpSingh },
    { name: "Mr. Som Parkash, IAS", title: "Former Deputy Commissioner, Jalandhar & now MLA, Phagwara", image: somParkash },
    { name: "Mr. K Shiva Parshad, IAS", title: "Former Deputy Commissioner, Jalandhar", image: kShivaParshad },
    { name: "Mr. Ashok Kumar Gupta, IAS", title: "Former Deputy Commissioner, Jalandhar", image: ashokGupta },
    { name: "Mr. Anurag Verma, IAS", title: "Former Deputy Commissioner, Jalandhar", image: anuragVerma },
    { name: "Mr. A. Venu Parsad, IAS", title: "Former Deputy Commissioner, Jalandhar", image: venuParsad },
    { name: "Mr. Ajeet Singh Pannu, IAS", title: "Former Deputy Commissioner, Jalandhar", image: ajeetPannu },
    { name: "Mr. H. S. Bedi", title: "Executive Director, IndianOil Corporation Limited, Mumbai", image: hsBedi },
    { name: "Mr. R. K. Arora", title: "Executive Director, IndianOil Corporation Limited", image: rkArora },
    { name: "Mr. Mohinder Singh Kay Pee", title: "Former Cabinet Minister, Punjab & MP, Jalandhar", image: kayPee },
    { name: "Mr. Priyank Bharti, IAS", title: "Director, Local Govt; Punjab, Jalandhar", image: priyankBharti },
    { name: "Mr. Varun Roozam, IAS", title: "Deputy Commissioner, Patiala", image: varunRoozam },
    { name: "Mr. Avinash Chopra", title: "Joint Editor, Hind Samachar Group of Newspapers", image: avinashChopra },
  ];

  return (
    <section
      id="patrons"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 bg-[#1b2b4a] text-white font-[Sora]"
    >
      <div className="max-w-7xl mx-auto">
        {/* --- Section Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3 text-center"
          style={{ color: "#ffd700" }}
        >
          Chief Patrons & Patrons of Society
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#ffd700" }}
        ></div>

        {/* --- Grid Layout --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
          {patrons.map((p, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 text-center hover:shadow-lg hover:shadow-[#ffd700]/20 hover:-translate-y-1 transition duration-300"
            >
              {p.image && (
                <div className="w-28 h-28 mx-auto mb-4 rounded-lg overflow-hidden border-2 border-[#ffd700]/60 shadow-md">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-lg sm:text-xl font-bold mb-2 text-[#ffd700]">
                {p.name}
              </h3>
              {p.title && (
                <p className="text-sm sm:text-base text-white/90 mb-1">{p.title}</p>
              )}
              <p className="text-sm italic text-white/70">Patron of Society</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
