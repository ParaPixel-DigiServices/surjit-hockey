import React from "react";
import { motion } from "framer-motion";
import surjitImg from "../../assets/sardar_surjit.jpg";
import logo from "../../assets/icon.png";
import surjitImgRight from "../../assets/sardar_surjit_2.jpg";

export default function History() {
  return (
    <section
      id="history-of-society"
      className="relative w-full py-16 sm:py-20 md:py-24 px-6 sm:px-8 md:px-12"
      style={{ backgroundColor: "#ffffff" }} // 💥 Hard background
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        className="max-w-6xl mx-auto text-center"
      >
        {/* --- Heading --- */}
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase mb-6"
          style={{ color: "#ffd700" }}
        >
          History of the Society
        </h2>

        <div
          className="w-28 h-[3px] mx-auto mb-10"
          style={{ backgroundColor: "#ffd700" }}
        ></div>

        {/* --- Image Row --- */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 sm:gap-10 mb-10">
          <img
            src={surjitImg}
            alt="Surjit Singh Left"
            className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto object-contain rounded-lg shadow-md"
          />
          <img
            src={logo}
            alt="Surjit Hockey Society Logo"
            className="w-28 sm:w-32 md:w-40 lg:w-48 h-auto object-contain"
          />
          <img
            src={surjitImgRight}
            alt="Surjit Singh Right"
            className="w-40 sm:w-48 md:w-56 lg:w-64 h-auto object-contain rounded-lg shadow-md"
          />
        </div>
      </motion.div>

      {/* --- Text Content --- */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        viewport={{ once: true, amount: 0.2 }}
        className="max-w-5xl mx-auto space-y-6"
      >
        {[
          `Surjit Hockey Society (Regd.) came into existence in 1984 with a pledge to keep the name of Sardar Surjit Singh Randhawa, Olympian alive, who lost his life in a fatal car accident near Jalandhar on Jan 7th, 1984, while fighting hard for upliftment of the game of Hockey in our country. Sardar Surjit Singh Randhawa was a member of World XI, Asia Stars XI and he participated in number of international events such as the Olympics, World Cup, Champions Trophy, and Asian Games, besides many other international tournaments.`,
          `Born on October 10, 1951, Surjit Singh played for State College of Sports, Jalandhar under Guru Nanak Dev University and later for Combined Universities team as deep defender. Surjit Singh made his international debut in the second World Cup Hockey Tournament in Amsterdam in 1973. He was a member of the Indian team which, under the leadership of charismatic leader Ajit Pal Singh, won the third World Cup Hockey Tournament at Kuala Lumpur in 1975.`,
          `Mr. Surjit Singh also participated in the Fifth World Cup Hockey Tournament, the 1974 and 1978 Asian Games, and the 1976 Montreal Olympic Games. Surjit Singh was acclaimed as one of the best full backs in the world. In 1973 he was included in the World Hockey XI. Next year he was a member of the All-Star Hockey XI. Surjit Singh was also the top scorer both in the Esanda International Hockey Tournament at Perth in Australia and the 1978 Asian Games. During his hockey career Surjit Singh was deeply concerned about players’ causes. He served the Indian Airlines for a few years and later joined the Punjab Police.`,
          `It was tragic that Mr. Surjit Singh, after his retirement from the game, died in a road accident near Bidhipur in Jalandhar district. In Jalandhar, a hockey stadium is named after him, and a hockey academy bearing his name is also run by the Punjab Government. The Society's fine functioning has given such impetus to the game in the region that bright and talented players are emerging in every age group. What better tribute could there be to Surjit Singh, who always considered it his sacred duty to fight for the cause of hockey and players' rights.`,
          `With the earnest efforts of hockey-loving people of Punjab and players like Olympian Mr. Pargat Singh Padmashree, MLA, Jalandhar Cantt., who is presently Working President of the Surjit Hockey Society, the Society started holding the Surjit Memorial Hockey Tournament at Jalandhar every year. Initially, the tournament was started on the grassy ground of Shri Guru Gobind Singh Stadium, Jalandhar with top teams of Northern India, and the very first memorial tournament captured great crowd attention. Hockey lovers commended the organization, and the Society earned great fame. Top teams from Pakistan, Russia, Bangladesh, Yugoslavia, Canada, England, America, Croatia, and Malaysia have participated in this tournament, along with top Indian men’s and women’s teams.`,
          `The Society has consistently strived to keep the name and fame of the Hockey Legend alive by providing modern facilities to participating teams and officials, and through innovation and improvements year after year.`,
          `The Society, with its earnest efforts, succeeded in getting the name of the Stadium at Burlton Park, Jalandhar, renamed as "Olympian Surjit Singh Hockey Stadium", which itself honors the Hockey Legend. Furthermore, the Society was able to get the native village of Surjit Singh, "Dakhla", renamed as "Surjit Singh Wala" — again, a heartfelt tribute to the legend.`,
          `Under the slogan “Watch Surjit Hockey — Win ALTO Car”, every year the Society awards a Maruti Alto car, motorcycles, refrigerators, and LCDs to spectators attending matches. The idea is to attract and encourage public interest, especially among youth, in our national game. The lucky draw for prizes is held after the final match.`,
          `The Society also conducts coaching camps for young hockey enthusiasts every year to discover new "Surjits" among them. It has extended its social contribution further by helping poor families with their children’s marriages and honoring eminent Hockey Olympians, sports persons, and NRIs from time to time.`,
          `A key highlight for fans is that the Society does not charge any gate fee. Thousands of spectators watch matches in the stadium, while semi-finals are televised — offering sponsors a platform to advertise their brands. The annual tournament continues to promote hockey at the grassroots while identifying talent for state and national teams.`,
          `The Society is deeply grateful to the hockey-loving people of Punjab for their continuous financial support, and to sponsors such as IndianOil Corporation Limited, whose partnership since 1990 has enabled the Society to provide international-standard facilities and cash awards amounting to ₹10 lakh to outstanding players.`,
        ].map((text, i) => (
          <p
            key={i}
            style={{ color: "#1b2b4a" }}
            className="text-base sm:text-lg leading-relaxed text-justify"
          >
            {text}
          </p>
        ))}
      </motion.div>
    </section>
  );
}
