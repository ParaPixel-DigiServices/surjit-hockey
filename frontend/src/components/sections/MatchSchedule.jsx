import { useState, useMemo, useEffect } from "react";
import { api } from "../../services/api";
import { motion, AnimatePresence } from "framer-motion";

/**
 * MatchSchedule (Interactive)
 * ----------------------------
 * - White background, gold accents, navy text
 * - Auto month/year detection
 * - Click a date to filter matches by that day
 * - "Show All" button resets the view
 * - Framer Motion fade transitions
 * - Responsive and mobile-first
 */

export default function MatchSchedule() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual tournament ID dynamically
        const tournamentId = 100; 
        const fixturesData = await api.getTournamentFixtures(tournamentId);
        
        const formattedMatches = fixturesData.map(match => ({
          id: match.id,
          date: new Date(match.date_match).toISOString().split('T')[0],
          teams: `Team ${match.team_id_1} vs Team ${match.team_id_2}`, // Placeholder logic
          time: new Date(match.date_match).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          venue: "Surjit Hockey Stadium", // Placeholder
        }));
        
        setMatches(formattedMatches);
      } catch (error) {
        console.error("Failed to fetch matches:", error);
        // Fallback data
        setMatches([
            { id: 1, date: "2025-11-12", teams: "India vs Australia", time: "7:00 PM", venue: "Jalandhar Stadium" },
            { id: 2, date: "2025-11-15", teams: "Pakistan vs England", time: "5:00 PM", venue: "Ludhiana Ground" },
            { id: 3, date: "2025-11-20", teams: "India vs Pakistan", time: "8:00 PM", venue: "Amritsar Arena" },
            { id: 4, date: "2025-11-25", teams: "Australia vs England", time: "6:00 PM", venue: "Chandigarh Field" },
          ]);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) {
    return <div className="text-center py-20">Loading schedule...</div>;
  }

  // Utility functions
  function daysInMonth(year, month) {
    return new Date(year, month + 1, 0).getDate();
  }

  function monthMatrix(year, month) {
    const first = new Date(year, month, 1);
    const startDay = first.getDay();
    const totalDays = daysInMonth(year, month);
    const weeks = [];
    let day = 1;
    let week = new Array(7).fill(null);

    for (let i = startDay; i < 7; i++) week[i] = day++;
    weeks.push(week);

    while (day <= totalDays) {
      const w = new Array(7).fill(null);
      for (let i = 0; i < 7 && day <= totalDays; i++) w[i] = day++;
      weeks.push(w);
    }
    return weeks;
  }

  function pad(n) {
    return n < 10 ? `0${n}` : `${n}`;
  }

  function toISO(year, month, day) {
    return `${year}-${pad(month + 1)}-${pad(day)}`;
  }

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const [selectedDate, setSelectedDate] = useState(null);

  const weeks = useMemo(() => monthMatrix(year, month), [year, month]);
  const monthName = useMemo(() => today.toLocaleString(undefined, { month: "long" }), [today]);
  const weekdayShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Filter logic
  const filteredMatches = selectedDate
    ? matches.filter((m) => m.date === selectedDate)
    : matches;

  const handleDateClick = (date) => {
    if (selectedDate === date) setSelectedDate(null);
    else setSelectedDate(date);
  };

  const hasMatch = (iso) => matches.some((m) => m.date === iso);

  return (
    <section className="relative bg-white text-[#1b2b4a] py-16 px-4 md:px-12 font-[Sora]">
      {/* Heading */}
      <div className="max-w-6xl mx-auto mb-8 text-center">
        <h2 className="text-3xl md:text-4xl font-bold tracking-wide">MATCH SCHEDULE</h2>
        <div className="mt-3 h-[3px] w-24 bg-[#ffd700] mx-auto rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-8">
        {/* LEFT: Match List */}
        <motion.div
          className="md:w-2/3 space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {selectedDate && (
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-semibold">
                Showing matches for{" "}
                <span className="text-[#ffd700]">{selectedDate}</span>
              </p>
              <button
                onClick={() => setSelectedDate(null)}
                className="text-sm font-semibold text-[#1b2b4a] border border-[#ffd700] px-3 py-1 rounded-md hover:bg-[#ffd700] hover:text-white transition"
              >
                Show All
              </button>
            </div>
          )}

          <AnimatePresence mode="wait">
            {filteredMatches.length > 0 ? (
              filteredMatches.map((m, i) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 p-5 bg-[#f9fafb] border border-[#ffd700]/60 rounded-2xl shadow-sm hover:shadow-md transition"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div className="text-sm text-[#ffd700] font-semibold uppercase tracking-wide">
                        {m.date}
                      </div>
                      <div className="text-lg md:text-xl font-bold">{m.teams}</div>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <span className="mr-4">{m.time}</span>
                      <span className="italic">{m.venue}</span>
                    </div>
                  </div>
                  <div className="mt-3 md:mt-0">
                    <button
                      type="button"
                      className="bg-[#ffd700] text-[#1b2b4a] font-semibold px-4 py-2 rounded-md hover:brightness-95 transition"
                    >
                      View Details
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <motion.div
                key="no-matches"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-gray-500 italic text-center py-10"
              >
                No matches scheduled for this day.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* RIGHT: Calendar */}
        <motion.aside
          className="md:w-1/3 bg-[#f5f5f5] rounded-2xl p-4 border border-[#ffd700]/50"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center justify-between mb-4 px-2">
            <div>
              <div className="text-sm text-gray-500">Month</div>
              <div className="text-lg font-semibold">{`${monthName} ${year}`}</div>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-1 text-xs text-gray-600 px-1 mb-2">
            {weekdayShort.map((d) => (
              <div key={d} className="text-center font-semibold">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {weeks.flat().map((day, idx) => {
              if (!day) return <div key={idx} className="h-10" />;
              const iso = toISO(year, month, day);
              const isSelected = selectedDate === iso;
              const isMatchDay = hasMatch(iso);

              return (
                <button
                  key={iso}
                  onClick={() => handleDateClick(iso)}
                  className={`flex items-center justify-center w-10 h-10 rounded-full transition font-semibold ${
                    isSelected
                      ? "bg-[#ffd700] text-[#1b2b4a] shadow-md scale-105"
                      : isMatchDay
                      ? "border border-[#ffd700] text-[#1b2b4a] hover:bg-[#ffd700]/20"
                      : "text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 text-sm text-gray-700 flex items-center gap-2">
            <span className="inline-block w-3 h-3 rounded-full bg-[#ffd700]" />
            <span>Match Day</span>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}
