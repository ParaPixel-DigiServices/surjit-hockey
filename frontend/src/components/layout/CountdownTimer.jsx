import React, { useState, useEffect } from "react";

/**
 * CountdownTimer - Shows time remaining until next match
 * Used in Header below the logo
 */
export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Set your next match date here
  const matchDate = new Date("2025-11-15T17:30:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = matchDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex gap-2 items-center text-[10px] sm:text-xs">
      <span className="font-bold">{timeLeft.days}d</span>
      <span>:</span>
      <span className="font-bold">{timeLeft.hours}h</span>
      <span>:</span>
      <span className="font-bold">{timeLeft.minutes}m</span>
      <span>:</span>
      <span className="font-bold">{timeLeft.seconds}s</span>
    </div>
  );
}
