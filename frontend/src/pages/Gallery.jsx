import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import config from "../config/api";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
        const albumsData = await api.getGallery(0, 100);

        // Fetch images for each album
        const albumsWithImages = await Promise.all(
          albumsData.map(async (album) => {
            try {
              const images = await api.getGalleryImages(album.id);
              return {
                ...album,
                thumbnail: config.getUploadUrl("gallery", album.image_name),
                images: images.map((img) =>
                  config.getUploadUrl("gallery", img.image_name)
                ),
                description: album.description || "Gallery Album",
              };
            } catch (err) {
              console.error(
                `Failed to fetch images for album ${album.id}`,
                err
              );
              return {
                ...album,
                thumbnail: config.getUploadUrl("gallery", album.image_name),
                images: [],
                description: "Gallery Album",
              };
            }
          })
        );

        setAlbums(albumsWithImages);
      } catch (error) {
        console.error("Failed to fetch gallery:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGallery();
  }, []);

  const handleNext = React.useCallback(() => {
    if (selectedAlbum && selectedAlbum.images.length > 0)
      setCurrentIndex((prev) => (prev + 1) % selectedAlbum.images.length);
  }, [selectedAlbum]);

  const handlePrev = () => {
    if (selectedAlbum && selectedAlbum.images.length > 0)
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
      <div className="text-white text-center py-20 bg-[#0a1123] min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700]"></div>
      </div>
    );
  }

  return (
    <section
      id="gallery"
      className="relative w-full min-h-screen overflow-hidden font-[Sora] bg-[#0a1123]"
    >
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
        {albums.length === 0 ? (
          <div className="col-span-full text-center text-white/60">
            No albums found.
          </div>
        ) : (
          albums.map((album, i) => (
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
                onError={(e) => (e.target.src = "/icon.png")}
              />

              {/* Overlay Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-100 flex flex-col justify-end p-6">
                <h3 className="text-xl font-semibold text-[#ffd700] tracking-wide">
                  {album.title}
                </h3>
                <p className="text-white/80 text-sm mt-2">
                  {album.description}
                </p>
                <p className="text-white/60 text-xs mt-1">
                  {album.images.length} Photos
                </p>
              </div>
            </motion.div>
          ))
        )}
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
              {selectedAlbum.images.length > 0 ? (
                <img
                  src={selectedAlbum.images[currentIndex]}
                  alt="Slide"
                  className="w-full h-[70vh] object-cover"
                  onError={(e) => (e.target.src = "/icon.png")}
                />
              ) : (
                <div className="w-full h-[70vh] flex items-center justify-center text-white">
                  No images in this album
                </div>
              )}

              {/* Prev / Next Controls */}
              {selectedAlbum.images.length > 1 && (
                <>
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
                </>
              )}

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
                  {selectedAlbum.images.length > 0
                    ? `${currentIndex + 1} / ${selectedAlbum.images.length}`
                    : "0 / 0"}
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
