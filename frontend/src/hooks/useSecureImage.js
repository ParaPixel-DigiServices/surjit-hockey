import { useState, useEffect } from "react";

/**
 * Hook to fetch an image with the ngrok-skip-browser-warning header
 * and return a Blob URL for use in img src or background-image.
 *
 * @param {string} src - The source URL of the image
 * @returns {string|null} - The Blob URL or null if loading/error
 */
export const useSecureImage = (src) => {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect(() => {
    if (!src) {
      setImageSrc(null);
      return;
    }

    // If it's not an ngrok URL (e.g. local or other), just use it directly
    // But for consistency in this specific environment, we try to fetch everything
    // that comes from our API config.

    let isMounted = true;
    const controller = new AbortController();

    const fetchImage = async () => {
      try {
        const response = await fetch(src, {
          signal: controller.signal,
          headers: {
            "ngrok-skip-browser-warning": "true",
          },
        });

        if (!response.ok) throw new Error("Failed to load image");

        const blob = await response.blob();
        if (isMounted) {
          const objectUrl = URL.createObjectURL(blob);
          setImageSrc(objectUrl);
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Error fetching secure image:", err);
          // Fallback to original src if fetch fails (might work if cached or not blocked)
          if (isMounted) setImageSrc(src);
        }
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
      controller.abort();
      if (imageSrc && imageSrc.startsWith("blob:")) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [src]);

  return imageSrc;
};
