import React from "react";
import { motion } from "framer-motion";
import presidentImg from "../../assets/president.jpg"; // replace with Dr. Himanshu's photo

/**
 * President.jsx — Profile of Dr. Himanshu Aggarwal, IAS
 * ------------------------------------------------------
 * ✅ Navy background with gold accent
 * ✅ Split layout (image left, text right)
 * ✅ Quote-style message in formal tone
 */

export default function President() {
  return (
    <section
      id="president"
      style={{ backgroundColor: "#1b2b4a", color: "#ffffff" }}
      className="w-full py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* --- President Photo --- */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="flex justify-center"
        >
          <img
            src={presidentImg}
            alt="Dr. Himanshu Aggarwal, IAS"
            className="w-64 sm:w-72 md:w-80 lg:w-96 h-auto object-cover rounded-xl shadow-2xl border-4 border-[#ffd700]/70"
          />
        </motion.div>

        {/* --- President Content --- */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-left"
        >
          <h2
            className="text-3xl sm:text-4xl font-extrabold uppercase mb-4"
            style={{ color: "#ffd700" }}
          >
            President of the Society
          </h2>
          <div
            className="w-24 h-[3px] mb-8"
            style={{ backgroundColor: "#ffd700" }}
          ></div>

          <h3 className="text-2xl sm:text-3xl font-bold mb-2 text-white">
            Dr. Himanshu Aggarwal, IAS
          </h3>
          <p className="text-sm text-[#ffd700] uppercase tracking-wide mb-6">
            Deputy Commissioner, Jalandhar <br />
            & President, Surjit Hockey Society, Jalandhar
          </p>

          {/* --- Message --- */}
          <div className="space-y-5 text-white/90 leading-relaxed text-base sm:text-lg text-justify">
            <p>
              “It is a matter of great pride and deep satisfaction that the
              Surjit Hockey Society, the organiser of India’s prestigious Surjit
              Hockey Tournament (Grade-I by Hockey India), is entering into the
              field of global Information Technology with the launch of its
              official website{" "}
              <span className="text-[#ffd700] font-semibold">
                surjithockey.in
              </span>
              . Every game — and so hockey — in the present day has become
              highly scientific. The launching of this website will help young
              players and coaches to improve and sharpen their skills through
              modern insights and knowledge.”
            </p>

            <p>
              “I feel confident that the website of Surjit Hockey Society will
              not only help in assimilating new ideas emerging in the game of
              hockey, but also acquaint the world at large with what Surjit
              Hockey stands for and what it continues to do for the promotion of
              our national game.”
            </p>

            <p>
              “I sincerely wish all success to this project and highly commend
              the efforts of everyone involved in making it a reality.”
            </p>
          </div>

          {/* --- Signature --- */}
          <div className="mt-8">
            <p className="text-lg font-semibold text-[#ffd700] mb-1">
              Dr. Himanshu Aggarwal, IAS
            </p>
            <p className="text-sm text-white/80">
              Deputy Commissioner, Jalandhar <br />
              & President, Surjit Hockey Society, Jalandhar
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
