import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { api } from "../../services/api";
import config from "../../config/api";
import SecureImage from "../ui/SecureImage";

export default function SponsorsMarquee() {
  const [sponsors, setSponsors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        const data = await api.getSponsors(0, 100);

        const activeSponsors = data
          .filter((s) => s.status === true)
          .map((s) => ({
            id: s.id,
            name: s.sponser_name,
            image: s.sponser_image
              ? config.getUploadUrl("sponsors", s.sponser_image)
              : null,
          }))
          .filter((s) => s.image);

        setSponsors(activeSponsors);
      } catch (error) {
        console.error("Failed to fetch sponsors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  const loopSponsors = useMemo(() => {
    if (!sponsors.length) return [];
    // Duplicate once so we can scroll through all then seamlessly continue
    return [...sponsors, ...sponsors];
  }, [sponsors]);

  if (loading || !loopSponsors.length) return null;

  return (
    <section className="w-full bg-[#0b152d] py-10 overflow-hidden border-y border-[#ffd700]/20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-6 grid grid-cols-[1fr_auto_1fr] items-center">
          <div />

          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-wide font-[Sora] uppercase text-white">
              Our Proud Sponsors
            </h2>
            <div className="mt-3 h-[3px] w-20 bg-[#ffd700] mx-auto rounded-full" />
          </div>

          <div className="flex justify-end">
            <Link
              to="/sponsors"
              className="text-xs md:text-sm font-medium text-[#ffd700]/70 underline underline-offset-4 decoration-dotted hover:text-[#ffd700] transition-colors"
            >
              View All Sponsors
            </Link>
          </div>
        </div>

        <div className="relative w-full overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 95,
              repeat: Infinity,
            }}
            style={{ width: "max-content" }}
          >
            {loopSponsors.map((sponsor, index) => (
              <div key={`${sponsor.id}-${index}`} className="shrink-0">
                <SecureImage
                  src={sponsor.image}
                  alt={sponsor.name}
                  className="block h-auto max-h-16 md:max-h-20 w-auto object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
