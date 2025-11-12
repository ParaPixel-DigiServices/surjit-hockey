import React from "react";
import { motion } from "framer-motion";
import secretaryImg from "../../assets/secretary-general.jpg"; // your file

export default function SecretaryGeneral() {
  return (
    <section
      id="secretary-general"
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12 bg-white"
      style={{
        color: "#1b2b4a",
      }}
    >
      {/* Scoped reset to kill inherited white color */}
      <style>{`
        #secretary-general * {
          color: #1b2b4a !important;
        }
      `}</style>

      <div className="max-w-6xl mx-auto font-[Sora]">
        {/* --- Section Header --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl font-extrabold uppercase mb-3 text-center"
          style={{ color: "#d4af37" }}
        >
          Secretary General of Society
        </motion.h2>

        <div
          className="w-24 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#d4af37" }}
        ></div>

        {/* --- Layout --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* --- Left: Image --- */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <img
              src={secretaryImg}
              alt="Secretary General of Society"
              className="w-64 h-auto rounded-lg border border-[#d4af37]/40 shadow-md object-cover"
            />
          </motion.div>

          {/* --- Right: Info --- */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-sm sm:text-base leading-relaxed"
          >
            <p>
              <strong>Date of Birth:</strong> 03-05-1951
            </p>
            <p>
              <strong>Service:</strong> Indian Revenue Service (1977 Batch)
            </p>
            <p>
              <strong>Designation:</strong> Chief Commissioner, Income Tax,
              Shimla (H.P. - India)
            </p>
            <p>
              <strong>Qualification:</strong> M.A., LLB.
            </p>
            <div className="mt-4">
              <strong>Mailing Address:</strong>
              <p>
                C/O Sh. P. S. Bala I.A.S. (Retd.) <br />
                112, Udham Singh Nagar, Jalandhar (Punjab), India.
              </p>
            </div>
          </motion.div>
        </div>

        {/* --- Training Table --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 overflow-x-auto"
        >
          <h3 className="text-2xl font-semibold mb-4" style={{ color: "#d4af37" }}>
            Professional Training
          </h3>
          <table className="w-full border border-gray-300 text-left text-sm sm:text-base bg-white">
            <thead className="bg-[#f7f7f7] font-semibold">
              <tr>
                <th className="border border-gray-300 px-3 py-2">Sr. No</th>
                <th className="border border-gray-300 px-3 py-2">Institute</th>
                <th className="border border-gray-300 px-3 py-2">Course</th>
                <th className="border border-gray-300 px-3 py-2">Period</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2">01</td>
                <td className="border border-gray-300 px-3 py-2">
                  L.B.S. National Academy of Administration
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  Mussorrie Foundation
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  1977 (15 Weeks)
                </td>
              </tr>
              <tr className="bg-[#f9f9f9]">
                <td className="border border-gray-300 px-3 py-2">02</td>
                <td className="border border-gray-300 px-3 py-2">
                  I.R.S. Staff College, Nagpur (Maharashtra)
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  Study Of Tax Law
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  1978 (50 Weeks)
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 px-3 py-2">03</td>
                <td className="border border-gray-300 px-3 py-2">
                  R.T.I. (D.T) Lucknow
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  General Management
                </td>
                <td className="border border-gray-300 px-3 py-2">
                  1987 (5 Weeks)
                </td>
              </tr>
            </tbody>
          </table>
        </motion.div>

        {/* --- Experience & Achievements --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mt-12 text-sm sm:text-base leading-relaxed"
        >
          <h3 className="text-2xl font-semibold mb-4" style={{ color: "#d4af37" }}>
            Job Experience
          </h3>
          <p className="mb-6">
            Worked at Nagpur, Mumbai, Chandigarh, Amritsar, Srinagar & New Delhi
          </p>

          <h3 className="text-2xl font-semibold mb-4" style={{ color: "#d4af37" }}>
            Election Observer
          </h3>
          <ul className="list-disc list-inside mb-6">
            <li>Andhra Pradesh: Warangal (Assembly Elections - 1996)</li>
            <li>Bihar: Muzaffarpur (Lok Sabha Elections - 1998)</li>
          </ul>

          <h3 className="text-2xl font-semibold mb-4" style={{ color: "#d4af37" }}>
            Extra Curricular Activities
          </h3>
          <p className="mb-6">
            Organized expeditions including river rafting, para sailing, snow
            skiing, trekking, mountaineering, jeep safari, hockey tournaments,
            and cultural events.
          </p>

          <h3 className="text-2xl font-semibold mb-4" style={{ color: "#d4af37" }}>
            Honorary Offices & Achievements
          </h3>
          <ul className="list-disc list-inside space-y-1">
            <li>Founder President, Service's Adventure & Cultural Association</li>
            <li>Vice President, Income Tax Trekking & Mountaineering Club</li>
            <li>
              Working President, Surjit Hockey Society, Jalandhar (since 1998)
            </li>
            <li>President, Uttarakhand Women's Hockey Association</li>
            <li>Vice President, Chandigarh Hockey Association</li>
            <li>Sr. Vice President, Punjab Judo Federation</li>
            <li>
              Sr. Vice President, Punjab Folk Art & Cultural Organisation
            </li>
            <li>Promoter, N.R.I. Sabha Punjab</li>
            <li>
              Attended major sports events including 1996 Atlanta Olympics,
              1998 World Cup (Holland), 13th Asian Games (Bangkok), 2002
              Commonwealth Games (Manchester), and 2003 Afro-Asian Games
              (Hyderabad).
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
