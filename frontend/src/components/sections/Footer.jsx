import React from "react";
import { motion } from "framer-motion";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
} from "react-icons/fa";

/**
 * Footer.jsx — Premium Large Footer
 * ---------------------------------
 * - Navy blue background (#1b2b4a)
 * - White text + gold accent
 * - Three main columns: About | Quick Links | Contact
 * - Gold border bottom bar with credit line
 * - Fully responsive, elegant, and animated
 */

export default function Footer() {
  return (
    <footer className="bg-[#1b2b4a] text-white font-[Sora] pt-16 md:pt-20 pb-10 relative overflow-hidden">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 md:gap-16">
        {/* About */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Surjit Hockey Society
          </h3>
          <div className="h-[3px] w-16 bg-[#ffd700] mb-5 rounded-full"></div>
          <p className="text-gray-300 leading-relaxed text-sm md:text-base">
            The Surjit Hockey Society is dedicated to preserving and promoting
            the spirit of Indian hockey through the Surjit Hockey Tournament —
            a celebration of sportsmanship, unity, and excellence.
          </p>
        </motion.div>

        {/* Quick Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Quick Links</h3>
          <div className="h-[3px] w-16 bg-[#ffd700] mb-5 rounded-full"></div>
          <ul className="space-y-3 text-gray-300 text-sm md:text-base">
            {["Home", "Tournament", "Gallery", "Messages", "Contact Us"].map(
              (link, i) => (
                <li key={i}>
                  <a
                    href="#"
                    className="relative inline-block hover:text-[#ffd700] transition-all duration-300 after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-[#ffd700] hover:after:w-full after:transition-all after:duration-300"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </motion.div>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold mb-3">Contact</h3>
          <div className="h-[3px] w-16 bg-[#ffd700] mb-5 rounded-full"></div>
          <ul className="space-y-3 text-gray-300 text-sm md:text-base">
            <li className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-[#ffd700] mt-[2px]" />
              <span>
                Guru Gobind Singh Stadium, Jalandhar, Punjab, India
              </span>
            </li>
            <li className="flex items-center gap-3">
              <FaPhoneAlt className="text-[#ffd700]" />
              <a href="tel:+919814095060" className="hover:text-[#ffd700]">
                +91 98140 95060
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-[#ffd700]" />
              <a
                href="mailto:info@surjithockey.in"
                className="hover:text-[#ffd700]"
              >
                info@surjithockey.in
              </a>
            </li>
          </ul>

          {/* Social Media Icons */}
          <div className="flex gap-4 mt-6">
            {[FaFacebookF, FaInstagram, FaTwitter, FaYoutube].map(
              (Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 flex items-center justify-center rounded-full border border-[#ffd700]/40 text-[#ffd700] hover:bg-[#ffd700] hover:text-[#1b2b4a] transition-all duration-300"
                >
                  <Icon size={16} />
                </a>
              )
            )}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#ffd700]/30 mt-16 pt-6 text-center text-gray-400 text-sm md:text-base">
        © 2025 Surjit Hockey Society | Designed & Developed by{" "}
        <span className="text-[#ffd700] font-semibold">
          Grabware Solutions Inc.
        </span>
      </div>
    </footer>
  );
}
