import React, { useState } from "react";
import { motion } from "framer-motion";

export default function TournamentParticipationRequest() {
  const [form, setForm] = useState({
    teamName: "",
    address: "",
    category: "",
    zip: "",
    city: "",
    email: "",
    country: "",
    mobile: "",
    officePhone: "",
    residencePhone: "",
    fax: "",
    members: "",
    uniformColor: "",
    comments: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <section
      id="online-registration"
      className="relative w-full py-24 md:py-32 bg-gradient-to-b from-[#0a1123] to-[#1b2b4a] text-white font-[Sora] overflow-hidden"
    >
      {/* glowing background orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 bg-[#ffd700]/10 rounded-full blur-3xl top-10 left-20 animate-pulse" />
        <div className="absolute w-96 h-96 bg-[#ffd700]/10 rounded-full blur-3xl bottom-10 right-20 animate-pulse" />
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-10 space-y-16">
        {/* --- Heading --- */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl font-extrabold uppercase text-center mb-4 text-[#ffd700]"
        >
          Online Participation Request
        </motion.h2>

        <div className="w-24 h-[3px] bg-[#ffd700] mx-auto mb-8" />

        {/* --- Letter --- */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="backdrop-blur-md bg-white/5 border-l-4 border-[#ffd700] shadow-lg p-8 md:p-12 rounded-2xl leading-relaxed space-y-5 text-white/90"
        >
          <p className="text-lg font-medium text-white/90">
            Dear Members Of The Worldwide Field Hockey Family,
          </p>
          <p>
            Welcome to the 39th Surjit Hockey Tournament, 2021, Jalandhar,
            Punjab, India. The Teams Online request Form for registration to the
            39th Edition of the tournament, scheduled to be held from Oct. 23rd
            to 31st, 2021, is given on this page also. Please complete this form
            accurately. Put special attention to details before mailing your
            application for same. No exception will be made for the teams who do
            not present "Complete" paper work. Please mail your form in a timely
            manner and well in advance of which the 20th August, 2021 is the
            deadline. All Communications should be mailed to:
          </p>

          <div className="bg-[#ffd700]/10 border border-[#ffd700]/20 rounded-xl p-4">
            <p>
              <strong className="text-[#ffd700]">
                Mr. Iqbal Singh Sandhu, PCS
              </strong>
              <br />
              Hony. Secretary, Surjit Hockey Society, ES 415, Street No. 5,
              Near/Opp. Orthonova Hospital, Nakodar Road, Abadpura, Jalandhar -
              144003 (Punjab-India)
            </p>
            <p className="mt-2">
              Email:{" "}
              <a
                href="mailto:iqbalpcs@surjithockey.in"
                className="text-[#ffd700] hover:underline"
              >
                iqbalpcs@surjithockey.in
              </a>{" "}
              /{" "}
              <a
                href="mailto:surjithockey@gmail.com"
                className="text-[#ffd700] hover:underline"
              >
                surjithockey@gmail.com
              </a>
            </p>
          </div>

          <ul className="list-disc list-inside space-y-2">
            <li>For Indian Teams, Latest Hockey India (HI) terms.</li>
            <li>
              For foreign teams, Transport will be provided from nearest Bus
              Stand / Railway Station / Airport (Amritsar or New Delhi) where
              team lands.
            </li>
            <li>
              Free Accommodation & Food to 20 members only (16 Players &
              Officials).
            </li>
            <li>
              Free local transportation for matches (From Accommodation place to
              Stadium & back).
            </li>
          </ul>
          <p>For Online Registration, Please fill the form given below:</p>
        </motion.div>

        {/* --- FORM --- */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="backdrop-blur-xl bg-white/5 border border-[#ffd700]/20 rounded-2xl p-8 md:p-12 shadow-2xl space-y-6"
        >
          {/* First Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <input
              type="text"
              name="teamName"
              value={form.teamName}
              onChange={handleChange}
              placeholder="Name Of The Team / Club / Department *"
              required
              className="form-input"
            />
            <input
              type="text"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="Full Address *"
              required
              className="form-input"
            />

            {/* Fixed Dropdown Styling */}
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              required
              className="form-input bg-[#0a1123]/60 text-[#ffd700] border-[#ffd700]/40 focus:ring-[#ffd700] cursor-pointer appearance-none"
            >
              <option value="" className="text-gray-400">
                Select Category *
              </option>
              <option value="Boys" className="text-black">
                Boys
              </option>
              <option value="Girls" className="text-black">
                Girls
              </option>
              <option value="Junior Boys" className="text-black">
                Junior Boys
              </option>
            </select>

            <input
              type="text"
              name="zip"
              value={form.zip}
              onChange={handleChange}
              placeholder="Zip Code *"
              required
              className="form-input"
            />
            <input
              type="text"
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="City & State / Province *"
              required
              className="form-input"
            />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email *"
              required
              className="form-input"
            />
            <input
              type="text"
              name="country"
              value={form.country}
              onChange={handleChange}
              placeholder="Country *"
              required
              className="form-input"
            />
            <input
              type="tel"
              name="mobile"
              value={form.mobile}
              onChange={handleChange}
              placeholder="Mobile Of Contact Person *"
              required
              className="form-input"
            />
            <input
              type="tel"
              name="officePhone"
              value={form.officePhone}
              onChange={handleChange}
              placeholder="Phone (Office)"
              className="form-input"
            />
            <input
              type="tel"
              name="residencePhone"
              value={form.residencePhone}
              onChange={handleChange}
              placeholder="Phone (Residence)"
              className="form-input"
            />
            <input
              type="text"
              name="fax"
              value={form.fax}
              onChange={handleChange}
              placeholder="Fax"
              className="form-input"
            />
          </div>

          {/* Text Areas */}
          <textarea
            name="members"
            value={form.members}
            onChange={handleChange}
            placeholder="Team Members' Name & Passport Number *"
            rows={3}
            required
            className="form-input"
          ></textarea>

          <input
            type="text"
            name="uniformColor"
            value={form.uniformColor}
            onChange={handleChange}
            placeholder="Team's Uniform Colour"
            className="form-input"
          />

          <textarea
            name="comments"
            value={form.comments}
            onChange={handleChange}
            placeholder="Comments (If Any)"
            rows={3}
            className="form-input"
          ></textarea>

          <div className="text-center pt-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="px-8 py-3 bg-[#ffd700] text-[#0a1123] rounded-lg font-semibold text-lg hover:bg-[#ffe680] transition"
            >
              Submit Registration
            </motion.button>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

/* Tailwind helper (index.css)
-------------------------------------
.form-input {
  @apply w-full p-3 rounded-lg bg-transparent border border-[#ffd700]/40 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#ffd700];
}
*/
