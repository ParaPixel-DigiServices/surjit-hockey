import React from "react";
import { useSecureImage } from "../../hooks/useSecureImage";
import { cn } from "../../lib/utils"; // Assuming you have a cn utility, if not I'll remove it

const SecureImage = ({ src, alt, className, ...props }) => {
  const secureSrc = useSecureImage(src);

  // While loading, we can show a placeholder or nothing.
  // For now, we render the img with the secureSrc (or null).
  // If secureSrc is null, the img won't show (or show broken icon).
  // We could add a skeleton here if needed.

  if (!secureSrc) {
    return <div className={`bg-gray-200 animate-pulse ${className}`} />;
  }

  return <img src={secureSrc} alt={alt} className={className} {...props} />;
};

export default SecureImage;
