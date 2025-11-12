import React from "react";
import { motion } from "framer-motion";
import muneer from "../../assets/muneer.jpg";
import baljit from "../../assets/baljit.jpg";
import gowda from "../../assets/gowda.jpg";
import gurpreet from "../../assets/gurpreet.jpg";
import anand from "../../assets/anand.jpg";
import sourabh from "../../assets/sourabh.jpg";
import harsha from "../../assets/harsha.jpg";
import sumit from "../../assets/sumit.jpg";

export default function HockeyIndiaOfficials() {
  const officials = [
    {
      name: "Mr. Moghul Mohammed Muneer",
      role: "Tournament Director",
      dob: "25-12-1958",
      contact: "9444060408",
      email: "muneerchpt@gmail.com",
      address: "H No 10, 4th Street, Seva Nagar, Velachery, Chennai 600042",
      image: muneer,
    },
    {
      name: "Baljit Hira Singh",
      role: "Technical Official",
      dob: "05-08-1989",
      contact: "9780228100",
      email: "singh.baljit636@gmail.com",
      address: "Vill. Sant Nagar, Teh. Rania, Distt Sirsa, Haryana",
      image: baljit,
    },
    {
      name: "Prieyash K Gowda",
      role: "Umpire",
      dob: "11-12-1988",
      contact: "9886679773",
      email: "memine032000ster@gmail.com",
      address:
        "F301 Icon Happy Living Apartment, Hosur Main Road, Bengaluru 560100",
      image: gowda,
    },
    {
      name: "Gurpreet Singh",
      role: "Technical Official",
      dob: "17-12-1981",
      contact: "8054195001",
      email: "panesar.g95@gmail.com",
      address: "Sohian Road, Near Rajgarh Basti, Sangrur",
      image: gurpreet,
    },
    {
      name: "Anand Dangi",
      role: "Umpire",
      dob: "01-02-1986",
      contact: "9255547180",
      email: "dangihockey@gmail.com",
      address: "V.P.O. Mandian, Teh. Meham, Distt. Rohtak, Haryana",
      image: anand,
    },
    {
      name: "Sourabh Singh Rajput",
      role: "Umpire",
      dob: "31-01-1986",
      contact: "8007198686",
      email: "sraj_33322063@yahoo.com",
      address: "Near Aiyappa Temple, Banaswadi, Bengaluru 560043",
      image: sourabh,
    },
    {
      name: "G Harsha Vardhan",
      role: "Umpire Manager",
      dob: "20-07-1980",
      contact: "8885656667",
      email: "harshahockey@gmail.com",
      address:
        "Nethaji Nagar, 1st Line, Lalpuram Road, Guntur, Andhra Pradesh",
      image: harsha,
    },
    {
      name: "Sumit Kumar Pal",
      role: "Umpire",
      dob: "01-07-1992",
      contact: "8081335144",
      email: "sumitpal1792@gmail.com",
      address:
        "538A/626 Adarshpuram, Triveni Nagar 3, Lucknow, Uttar Pradesh",
      image: sumit,
    },
  ];

  const bgColors = [
    "bg-gradient-to-br from-[#0a1123] to-[#111c3d]", // dark
    "bg-[#f9f9f9]", // light
    "bg-gradient-to-br from-[#ffd700]/10 to-[#fff9e6]", // light
    "bg-gradient-to-br from-[#10204a] to-[#0e1833]", // dark
    "bg-[#fefefe]", // light
    "bg-gradient-to-r from-[#0d1630] to-[#12244f]", // dark
    "bg-[#fafafa]", // light
    "bg-gradient-to-t from-[#1b2b4a] to-[#0d1630]", // dark
  ];

  // helper: decide text color based on background type
  const isDarkBackground = (index) =>
    [0, 3, 5, 7].includes(index); // indices using dark backgrounds

  return (
    <section
      id="hockey-india-officials"
      className="relative w-full py-20 md:py-24 font-[Sora]"
    >
      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold uppercase text-center mb-3 text-[#ffd700]"
        >
          Hockey India Officials
        </motion.h2>

        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-12" />

        <div className="flex flex-col gap-16">
          {officials.map((person, index) => (
            <motion.div
              key={person.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col md:flex-row items-center gap-8 rounded-xl shadow-lg overflow-hidden ${
                bgColors[index % bgColors.length]
              } ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
            >
              {/* --- Image --- */}
              <div className="relative w-full md:w-1/3 flex items-center justify-center bg-black/10 p-4">
                <div className="aspect-[4/5] w-full max-w-[320px] overflow-hidden rounded-xl shadow-md">
                  <img
                    src={person.image}
                    alt={person.name}
                    className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 rounded-xl border border-[#ffd700]/40 pointer-events-none" />
                </div>
              </div>

              {/* --- Info --- */}
              <div
                className={`w-full md:w-2/3 p-6 sm:p-10 ${
                  isDarkBackground(index)
                    ? "text-white"
                    : "text-black"
                }`}
              >
                <h3
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{ color: "#ffd700" }}
                >
                  {person.name}
                </h3>
                <p
                  className={`text-lg font-semibold mb-4 ${
                    isDarkBackground(index)
                      ? "text-white/90"
                      : "text-black/80"
                  }`}
                >
                  {person.role}
                </p>

                <ul
                  className={`text-base space-y-1 ${
                    isDarkBackground(index)
                      ? "text-white/80"
                      : "text-black/80"
                  }`}
                >
                  <li>
                    <span className="font-semibold text-[#ffd700]">
                      Date of Birth:
                    </span>{" "}
                    {person.dob}
                  </li>
                  <li>
                    <span className="font-semibold text-[#ffd700]">
                      Contact No.:
                    </span>{" "}
                    {person.contact}
                  </li>
                  <li>
                    <span className="font-semibold text-[#ffd700]">
                      Email:
                    </span>{" "}
                    {person.email}
                  </li>
                  <li>
                    <span className="font-semibold text-[#ffd700]">
                      Address:
                    </span>{" "}
                    {person.address}
                  </li>
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
