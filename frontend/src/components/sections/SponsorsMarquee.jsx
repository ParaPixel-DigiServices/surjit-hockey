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
    <section className="w-full overflow-hidden">
      <motion.div
        className="flex items-center"
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
              className="block h-auto max-h-20 w-auto object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </motion.div>
    </section>
  );
}
