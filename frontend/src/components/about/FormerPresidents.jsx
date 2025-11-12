import React from "react";
import { motion } from "framer-motion";

// Import all images (replace with your actual paths)
import kkBhatnagar from "../../assets/kk-bhatnagar.jpg";
import scAgrawal from "../../assets/sc-agarwal.jpg";
import karanSingh from "../../assets/karan-singh.jpg";
import skKakkar from "../../assets/sk-kakkar.jpg";
import dpReady from "../../assets/dp-ready.jpg";
import mpSingh from "../../assets/mp-singh.jpg";
import somParkash from "../../assets/som_prakash.jpg";
import kshiva from "../../assets/kshiva.jpg";
import ashokGupta from "../../assets/ashok-gupta.jpg";
import anuragVerma from "../../assets/anurag-verma.jpg";
import venuParsad from "../../assets/venu-prasad.jpg";
import ajeetPannu from "../../assets/ajeet-pannu.jpg";
import priyankBharti from "../../assets/priyank-bharti.jpg";
import shrutiSingh from "../../assets/shruti-singh.jpg";
import varunRoozam from "../../assets/varun-roozam.jpg";
import kamalYadav from "../../assets/kamal-yadav.jpg";
import varinderSharma from "../../assets/presidents_22.jpg";
import ghanshyamThori from "../../assets/former_presidents_9.jpg";
import visheshSarangal from "../../assets/president_1.jpeg";

export default function FormerPresidents() {
  const presidents = [
    { name: "Mr. K. K. Bhatnagar, IAS", years: "1984 - 1985", image: kkBhatnagar },
    { name: "Mr. S. C. Agrawal, IAS", years: "1985 - 1987", image: scAgrawal },
    { name: "Mr. Karan A. Singh, IAS", years: "1992 - 1992", image: karanSingh },
    { name: "Mr. S. K. Kakkar, IAS", years: "1992 - 1995", image: skKakkar },
    { name: "Mr. D. P. Ready, IAS", years: "1995 - 1995", image: dpReady },
    { name: "Mr. M. P. Singh, IAS", years: "1995 - 1998", image: mpSingh },
    { name: "Mr. Som Parkash, IAS", years: "1998 - 2000", image: somParkash },
    { name: "Mr. K Shiva Parshad, IAS", years: "2000 - 2003", image: kshiva },
    { name: "Mr. Ashok Kumar Gupta, IAS", years: "2003 - 2006", image: ashokGupta },
    { name: "Mr. Anurag Verma, IAS", years: "2006 - 2006", image: anuragVerma },
    { name: "Mr. A. Venu Parsad, IAS", years: "2006 - 2007", image: venuParsad },
    { name: "Mr. Ajeet Singh Pannu, IAS", years: "2007 - 2009", image: ajeetPannu },
    { name: "Mr. Priyank Bharti, IAS", years: "2010 - 2013", image: priyankBharti },
    { name: "Mrs. Shruti Singh, IAS", years: "2013 - 2013", image: shrutiSingh },
    { name: "Mr. Varun Roozam, IAS", years: "2013 - 2014", image: varunRoozam },
    { name: "Mr. Kamal Kishore Yadav, IAS", years: "2014 - 2017", image: kamalYadav },
    { name: "Mr. Varinder Kumar Sharma, IAS", years: "2017 - 2020", image: varinderSharma },
    { name: "Mr. Ghanshyam Thori, IAS", years: "2020 - Present", image: ghanshyamThori },
    { name: "Mr. Vishesh Sarangal, IAS", years: "2020 - 2023", image: visheshSarangal },
  ];

  return (
    <section
      id="former-presidents"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-10 bg-[#1b2b4a] text-white font-[Sora]"
    >
      <div className="max-w-6xl mx-auto">
        {/* --- Header --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3 text-center"
          style={{ color: "#ffd700" }}
        >
          Former Presidents of the Society
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#ffd700" }}
        ></div>

        {/* --- Intro Paragraph --- */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-base sm:text-lg text-center max-w-3xl mx-auto mb-12 text-white/90"
        >
          As per the constitution of the Surjit Hockey Society, the Deputy
          Commissioner, Jalandhar is the Ex-Officio President. At present,{" "}
          <span className="text-[#ffd700] font-semibold">
            Mr. Ghanshayam Thori, IAS
          </span>
          , Deputy Commissioner, Jalandhar, is the 20th President of the
          Society. Other past Presidents were as under:
        </motion.p>

        {/* --- Presidents Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-10">
          {presidents.map((p, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col sm:flex-row items-center gap-6 hover:shadow-lg hover:shadow-[#ffd700]/20 hover:-translate-y-1 transition duration-300"
            >
              <div className="w-28 h-28 flex-shrink-0 rounded-full overflow-hidden border-2 border-[#ffd700]/60 shadow-md">
                <img
                  src={p.image}
                  alt={p.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-[#ffd700] mb-1">
                  {p.name}
                </h3>
                <p className="text-sm sm:text-base text-white/90">
                  Deputy Commissioner, Jalandhar
                </p>
                <p className="text-sm sm:text-base text-white/80 mt-2 italic">
                  {p.years}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
