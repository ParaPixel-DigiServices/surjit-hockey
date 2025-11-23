import React, { useState, useEffect } from "react";
import config from "../../config/api";
import { api } from "../../services/api";

/**
 * CountdownTimer - Shows time remaining until next match OR a manually set event
 * Used in Header below the logo
 */
export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [targetDate, setTargetDate] = useState(null);
  const [label, setLabel] = useState("");

  // Fetch timer logic
  useEffect(() => {
    const fetchTimerData = async () => {
      try {
        // 1. Try to get manual timer first
        let manualDate = null;
        try {
          const response = await fetch(`${config.apiUrl}/additional/timer`);
          if (response.ok) {
            const data = await response.json();
            if (data.timer_time) {
              const parsed = new Date(data.timer_time);
              // Only use if it's in the future
              if (parsed > new Date()) {
                manualDate = parsed;
              }
            }
          }
        } catch (error) {
          console.warn(
            "Manual timer fetch failed, falling back to auto.",
            error
          );
        }

        if (manualDate) {
          setTargetDate(manualDate);
          setLabel("Event Starts In:");
          return;
        }

        // 2. Fallback to Next Match (Auto)
        const fixtures = await api.getTournamentFixtures(100).catch(() => []);
        const upcoming = fixtures
          .filter((f) => !f.match_status) // Not completed
          .map((f) => ({
            ...f,
            dateObj: new Date(`${f.match_date} ${f.match_time}`),
          }))
          .sort((a, b) => a.dateObj - b.dateObj); // Sort by nearest

        if (upcoming.length > 0) {
          setTargetDate(upcoming[0].dateObj);
          setLabel("Next Match:");
        }
      } catch (error) {
        console.error("Failed to fetch timer data:", error);
      }
    };

    fetchTimerData();
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const timer = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        setLabel("Live Now");
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
  }, [targetDate]);

  if (!targetDate) return null;

  return (
    <div className="flex flex-col items-center">
      {label && (
        <span className="text-[8px] uppercase tracking-widest opacity-80 mb-0.5">
          {label}
        </span>
      )}
      <div className="flex gap-2 items-center text-[10px] sm:text-xs">
        <span className="font-bold">{timeLeft.days}d</span>
        <span>:</span>
        <span className="font-bold">{timeLeft.hours}h</span>
        <span>:</span>
        <span className="font-bold">{timeLeft.minutes}m</span>
        <span>:</span>
        <span className="font-bold">{timeLeft.seconds}s</span>
      </div>
    </div>
  );
}
