import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

// --- Import Album Thumbnails and Images ---
import album1Thumb from "../assets/gallery1_thumb.jpeg";
import album2Thumb from "../assets/gallery2_thumb.jpeg";
import album3Thumb from "../assets/gallery3_thumb.jpeg";

import g1a from "../assets/gallery1_1.jpeg";
import g1b from "../assets/gallery1_2.jpeg";
import g1c from "../assets/gallery1_3.jpeg";
import g1d from "../assets/gallery1_4.jpeg";
import g1e from "../assets/gallery1_5.jpeg";
import g1f from "../assets/gallery1_6.jpeg";
import g1g from "../assets/gallery1_7.jpeg";
import g1h from "../assets/gallery1_8.jpeg";
import g1i from "../assets/gallery1_9.jpeg";
import g1j from "../assets/gallery1_10.jpeg";
import g1k from "../assets/gallery1_11.jpeg";
import g1l from "../assets/gallery1_12.jpg";
import g1m from "../assets/gallery1_13.jpg";
import g1n from "../assets/gallery1_14.JPG";
import g1o from "../assets/gallery1_15.JPG";
import g1p from "../assets/gallery1_16.JPG";
import g1q from "../assets/gallery1_17.JPG";
import g1r from "../assets/gallery1_18.JPG";
import g1s from "../assets/gallery1_19.JPG";
import g1t from "../assets/gallery1_20.JPG";
import g1u from "../assets/gallery1_21.JPG";

import g2a from "../assets/gallery2_1.jpg";
import g2b from "../assets/gallery2_2.jpg";
import g2c from "../assets/gallery2_3.jpg";
import g2d from "../assets/gallery2_4.jpg";
import g2e from "../assets/gallery2_5.jpg";
import g2f from "../assets/gallery2_6.jpg";
import g2g from "../assets/gallery2_7.jpg";

import g3a from "../assets/gallery3_1.jpeg";
import g3b from "../assets/gallery3_2.JPG";
import g3c from "../assets/gallery3_3.JPG";
import g3d from "../assets/gallery3_4.JPG";
import g3e from "../assets/gallery3_5.JPG";
import g3f from "../assets/gallery3_6.JPG";
import g3g from "../assets/gallery3_7.JPG";
import g3h from "../assets/gallery3_8.JPG";
import g3i from "../assets/gallery3_9.JPG";
import g3j from "../assets/gallery3_10.JPG";

/**
 * GALLERY SECTION — Surjit Hockey Tournament
 * --------------------------------------------
 * ✅ Album thumbnails with hover animations
 * ✅ Modal slideshow viewer with next/prev
 * ✅ Luxury golden UI with blur-glass panels
 */

export default function Gallery() {
  const navigate = useNavigate();

  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        setLoading(true);

        // Always use static albums data for now
        // The API integration can be added later when backend provides album groupings
        setAlbums([
          {
            title: "Opening Ceremony",
            description:
              "Inaugural moments of the Surjit Hockey Tournament with dignitaries and vibrant celebrations.",
            thumbnail: album1Thumb,
            images: [
              g1a,
              g1b,
              g1c,
              g1d,
              g1e,
              g1f,
              g1g,
              g1h,
              g1i,
              g1j,
              g1k,
              g1l,
              g1m,
              g1n,
              g1o,
              g1p,
              g1q,
              g1r,
              g1s,
              g1t,
              g1u,
            ],
          },
          {
            title: "Match Highlights",
            description:
              "Adrenaline-pumping match highlights showcasing the skill, speed, and passion of hockey.",
            thumbnail: album2Thumb,
            images: [g2a, g2b, g2c, g2d, g2e, g2f, g2g],
          },
          {
            title: "Closing Ceremony",
            description:
              "A grand evening to honor champions and relive the glory of the Surjit Hockey legacy.",
            thumbnail: album3Thumb,
            images: [g3a, g3b, g3c, g3d, g3e, g3f, g3g, g3h, g3i, g3j],
          },
        ]);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
        // If there's any error, still set the albums
        setAlbums([
          {
            title: "Opening Ceremony",
            description:
              "Inaugural moments of the Surjit Hockey Tournament with dignitaries and vibrant celebrations.",
            thumbnail: album1Thumb,
            images: [
              g1a,
              g1b,
              g1c,
              g1d,
              g1e,
              g1f,
              g1g,
              g1h,
              g1i,
              g1j,
              g1k,
              g1l,
              g1m,
              g1n,
              g1o,
              g1p,
              g1q,
              g1r,
              g1s,
              g1t,
              g1u,
            ],
          },
          {
            title: "Match Highlights",
            description:
              "Adrenaline-pumping match highlights showcasing the skill, speed, and passion of hockey.",
            thumbnail: album2Thumb,
            images: [g2a, g2b, g2c, g2d, g2e, g2f, g2g],
          },
          {
            title: "Closing Ceremony",
            description:
              "A grand evening to honor champions and relive the glory of the Surjit Hockey legacy.",
            thumbnail: album3Thumb,
            images: [g3a, g3b, g3c, g3d, g3e, g3f, g3g, g3h, g3i, g3j],
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleNext = React.useCallback(() => {
    if (selectedAlbum)
      setCurrentIndex((prev) => (prev + 1) % selectedAlbum.images.length);
  }, [selectedAlbum]);

  const handlePrev = () => {
    if (selectedAlbum)
      setCurrentIndex(
        (prev) =>
          (prev - 1 + selectedAlbum.images.length) % selectedAlbum.images.length
      );
  };

  // Optional autoplay slideshow
  useEffect(() => {
    if (selectedAlbum) {
      const timer = setInterval(handleNext, 3500);
      return () => clearInterval(timer);
    }
  }, [selectedAlbum, handleNext]);

  // Use loading state to show a spinner or something
  if (loading) {
    return (
      <div className="text-white text-center py-20">Loading gallery...</div>
    );
  }

  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen overflow-hidden font-[Sora]"
    >
      {/* --- Frosted Navbar --- */}
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-[#0b152d]/80 border-b border-[#ffd700]/20 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-lg sm:text-xl font-semibold text-[#ffd700] uppercase tracking-wider"
          >
            Surjit Hockey Tournament Gallery
          </motion.h1>

          <button
            onClick={() => navigate("/")}
            className="text-sm uppercase font-semibold text-white/90 hover:text-[#ffd700] transition"
          >
            ← Back to Home
          </button>
        </div>
      </header>

      {/* --- Animated Gradient Background --- */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_#0a1123_20%,_#1b2b4a_60%,_black_100%)] animate-[gradientShift_12s_ease_infinite]">
        <div className="absolute w-[600px] h-[600px] bg-[#ffd700]/10 blur-[180px] top-0 left-1/4 animate-pulse" />
        <div className="absolute w-[400px] h-[400px] bg-[#ffd700]/10 blur-[150px] bottom-0 right-1/3 animate-pulse" />
      </div>

      {/* --- Header --- */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative z-10 text-center pt-28 mb-16"
      >
        <h2 className="text-5xl font-extrabold uppercase text-[#ffd700] drop-shadow-lg">
          Tournament Gallery
        </h2>
        <p className="text-white/80 text-lg mt-3">
          Relive the unforgettable moments of the Surjit Hockey Tournament
        </p>
        <div className="w-24 h-[3px] mx-auto mt-6 bg-[#ffd700]" />
      </motion.div>

      {/* --- Albums Grid --- */}
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 px-6 pb-20">
        {albums.map((album, i) => (
          <motion.div
            key={i}
            whileHover={{
              scale: 1.05,
              rotateY: 5,
              boxShadow: "0 0 25px rgba(255,215,0,0.3)",
            }}
            transition={{ type: "spring", stiffness: 250, damping: 15 }}
            className="group relative rounded-2xl overflow-hidden border border-[#ffd700]/30 shadow-[0_0_15px_rgba(255,215,0,0.15)] hover:shadow-[0_0_25px_rgba(255,215,0,0.25)] bg-[#0e1830]/60 backdrop-blur-md cursor-pointer"
            onClick={() => {
              setSelectedAlbum(album);
              setCurrentIndex(0);
            }}
          >
            {/* Image */}
            <img
              src={album.thumbnail}
              alt={album.title}
              className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-700"
            />

            {/* Overlay Info */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 flex flex-col justify-end p-6">
              <h3 className="text-xl font-semibold text-[#ffd700] tracking-wide">
                {album.title}
              </h3>
              <p className="text-white/80 text-sm mt-2">{album.description}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* --- Modal Viewer --- */}
      <AnimatePresence>
        {selectedAlbum && (
          <motion.div
            className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0"
              onClick={() => setSelectedAlbum(null)}
            />

            <motion.div
              className="relative z-10 max-w-5xl w-full mx-4 bg-[#0b152d]/80 border border-[#ffd700]/40 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(255,215,0,0.25)]"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              {/* Image */}
              <img
                src={selectedAlbum.images[currentIndex]}
                alt="Slide"
                className="w-full h-[70vh] object-cover"
              />

              {/* Prev / Next Controls */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrev();
                }}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#ffd700]/10 hover:bg-[#ffd700]/20 rounded-full p-3 transition"
              >
                <ChevronLeft className="w-7 h-7 text-[#ffd700]" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNext();
                }}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#ffd700]/10 hover:bg-[#ffd700]/20 rounded-full p-3 transition"
              >
                <ChevronRight className="w-7 h-7 text-[#ffd700]" />
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedAlbum(null)}
                className="absolute top-3 right-3 bg-[#ffd700]/10 hover:bg-[#ffd700]/20 rounded-full p-2"
              >
                <X className="w-5 h-5 text-[#ffd700]" />
              </button>

              {/* Caption */}
              <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4 text-center">
                <h4 className="text-[#ffd700] text-lg font-semibold">
                  {selectedAlbum.title}
                </h4>
                <p className="text-white/70 text-sm mt-1">
                  {currentIndex + 1} / {selectedAlbum.images.length}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Keyframe Animation --- */}
      <style>
        {`
          @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>
    </section>
  );
}
