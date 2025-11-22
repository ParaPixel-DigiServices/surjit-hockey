import React, { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

/**
 * Contact Page
 * ------------
 * Contact information and inquiry form
 */
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement contact form submission
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-[#0b152d] text-white py-20 px-4 font-[Sora]">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Get In <span className="text-[#ffd700]">Touch</span>
          </h1>
          <p className="text-white/70 text-lg">
            Have questions? We'd love to hear from you
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div>
              <h2 className="text-2xl font-bold mb-6 text-[#ffd700]">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Mail
                    size={24}
                    className="text-[#ffd700] flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a
                      href="mailto:info@surjithockey.in"
                      className="text-white/70 hover:text-[#ffd700] transition"
                    >
                      info@surjithockey.in
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone
                    size={24}
                    className="text-[#ffd700] flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <a
                      href="tel:+911234567890"
                      className="text-white/70 hover:text-[#ffd700] transition"
                    >
                      +91 123 456 7890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MapPin
                    size={24}
                    className="text-[#ffd700] flex-shrink-0 mt-1"
                  />
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-white/70">
                      Surjit Hockey Stadium
                      <br />
                      Jalandhar, Punjab
                      <br />
                      India
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#1b2b4a] rounded-lg p-6 border border-white/10">
              <h3 className="text-xl font-bold mb-4 text-[#ffd700]">
                Tournament Office Hours
              </h3>
              <div className="space-y-2 text-white/70">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-[#1b2b4a] rounded-lg p-8 border border-white/10"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#ffd700]">
              Send Us a Message
            </h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-semibold mb-2"
                >
                  Your Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0b152d] border border-white/10 rounded-lg focus:border-[#ffd700] focus:outline-none text-white"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-semibold mb-2"
                >
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0b152d] border border-white/10 rounded-lg focus:border-[#ffd700] focus:outline-none text-white"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-semibold mb-2"
                >
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-[#0b152d] border border-white/10 rounded-lg focus:border-[#ffd700] focus:outline-none text-white"
                  placeholder="Tournament Inquiry"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-semibold mb-2"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full px-4 py-3 bg-[#0b152d] border border-white/10 rounded-lg focus:border-[#ffd700] focus:outline-none text-white resize-none"
                  placeholder="Tell us how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#ffd700] text-[#0b152d] font-bold py-3 px-6 rounded-lg hover:bg-[#ffd700]/90 transition flex items-center justify-center gap-2"
              >
                <Send size={18} />
                Send Message
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-green-400"
                >
                  ✓ Message sent successfully!
                </motion.div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
