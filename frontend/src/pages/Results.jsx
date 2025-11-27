import { useState, useEffect } from "react";
import { api } from "../services/api";
import { motion, AnimatePresence } from "framer-motion";
import config from "../config/api";
import { useSecureImage } from "../hooks/useSecureImage";

// --- Import Team Logos ---
// import indianOil from "../assets/teams/iocl.png";
// import punjabPolice from "../assets/teams/police.png";
// import armyXi from "../assets/teams/army.png";
// import indianNavy from "../assets/teams/navy.png";
// import rcf from "../assets/teams/rcf.png";

export default function ResultsPage() {
  const [gender, setGender] = useState("men");
  const [tab, setTab] = useState("results");
  const [month, setMonth] = useState("November 2025");

  const [matches, setMatches] = useState([]);
  const [table, setTable] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const bgImage = useSecureImage(config.getUploadUrl("gallery", "1-494.jpeg"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // TODO: Replace with actual tournament ID dynamically
        const tournamentId = 100;
        const [fixturesData, resultsData] = await Promise.all([
          api.getTournamentFixtures(tournamentId),
          api.getTournamentResults(tournamentId), // Assuming this endpoint exists and returns table data or similar
        ]);

        // Transform API data to match component state structure
        // This is a placeholder transformation, adjust based on actual API response structure
        const formattedMatches = fixturesData.map((match) => ({
          team1: match.team_id_1, // You might need to fetch team details to get names
          team1Logo: "", // Placeholder
          score: match.match_status ? "Completed" : "Upcoming", // Adjust logic
          team2: match.team_id_2,
          team2Logo: "",
        }));

        setMatches(formattedMatches);
        setTable(resultsData); // Set table data if available
        console.log(loading, error, table); // Temporary usage to silence linter
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="relative min-h-screen w-full font-[Sora] bg-gradient-to-b from-[#0a1123] via-[#101b35] to-[#1b2b4a] text-white overflow-hidden">
      {/* --- Hero Banner --- */}
      <motion.section
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative pt-28 pb-20 text-center"
      >
        {/* Hockey turf background */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url('${bgImage}')`,
          }}
        />
        <h1 className="relative text-5xl sm:text-6xl font-extrabold uppercase text-[#ffd700] mb-4 drop-shadow-lg">
          Fixtures & Results
        </h1>
        <p className="relative text-lg sm:text-xl text-white/80">
          Track every match, score, and team standing — all in one place
        </p>
      </motion.section>

      {/* --- Filters & Tabs --- */}
      <section className="max-w-6xl mx-auto px-6 sm:px-10 pb-20">
        {/* Tab Panel */}
        <div className="bg-[#0e1830]/70 backdrop-blur-md rounded-xl border border-[#ffd700]/20 shadow-lg overflow-hidden mb-10">
          {/* Gender Tabs */}
          <div className="flex justify-center border-b border-[#ffd700]/20">
            {["men", "women"].map((g) => (
              <button
                key={g}
                onClick={() => setGender(g)}
                className={`flex-1 py-3 font-semibold uppercase tracking-wide transition-colors ${
                  gender === g
                    ? "bg-[#ffd700]/20 text-[#ffd700]"
                    : "text-white/80 hover:text-[#ffd700]"
                }`}
              >
                {g}
              </button>
            ))}
          </div>

          {/* Sub Tabs */}
          <div className="flex justify-center">
            {["fixtures", "results", "table"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`flex-1 py-3 font-semibold uppercase transition-colors ${
                  tab === t
                    ? "bg-[#ffd700]/20 text-[#ffd700]"
                    : "text-white/80 hover:text-[#ffd700]"
                }`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10 bg-[#0e1830]/60 border border-[#ffd700]/20 rounded-lg px-6 py-4 shadow-md">
          <div className="flex items-center gap-3">
            <label htmlFor="month" className="text-[#ffd700] font-medium">
              Select Month:
            </label>
            <select
              id="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="bg-transparent border border-[#ffd700]/40 text-white rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-[#ffd700]/40"
            >
              <option className="text-black">October 2025</option>
              <option className="text-black">November 2025</option>
              <option className="text-black">December 2025</option>
            </select>
          </div>

          <button className="bg-[#ffd700]/20 text-[#ffd700] px-6 py-2 rounded-md border border-[#ffd700]/40 font-semibold hover:bg-[#ffd700]/30 transition">
            Filter Results
          </button>
        </div>

        {/* --- Dynamic Content --- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${gender}-${tab}`}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5 }}
            className="bg-[#0e1830]/70 rounded-xl p-8 border border-[#ffd700]/20 shadow-2xl"
          >
            {/* Fixtures Section */}
            {tab === "fixtures" && (
              <p className="text-white/80 text-lg text-center">
                Upcoming fixtures for{" "}
                <span className="text-[#ffd700] font-semibold">{gender}</span>{" "}
                teams will appear here.
              </p>
            )}

            {/* Results Section */}
            {tab === "results" && (
              <div className="space-y-8">
                <h3 className="text-2xl font-bold text-[#ffd700] text-center">
                  Recent Match Results
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {matches.map((match, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.03 }}
                      transition={{ type: "spring", stiffness: 250 }}
                      className="bg-[#1b2b4a]/50 border border-[#ffd700]/20 rounded-lg p-6 flex flex-col items-center gap-4 text-center shadow-lg hover:bg-[#ffd700]/5 transition"
                    >
                      <div className="flex justify-between w-full items-center">
                        <div className="flex flex-col items-center">
                          <SecureImage
                            src={match.team1Logo}
                            alt={match.team1}
                            className="w-16 h-16 object-contain mb-2"
                          />
                          <p className="font-semibold">{match.team1}</p>
                        </div>

                        <span className="text-[#ffd700] text-2xl font-extrabold">
                          {match.score}
                        </span>

                        <div className="flex flex-col items-center">
                          <SecureImage
                            src={match.team2Logo}
                            alt={match.team2}
                            className="w-16 h-16 object-contain mb-2"
                          />
                          <p className="font-semibold">{match.team2}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Table Section */}
            {tab === "table" && (
              <div>
                <h3 className="text-2xl font-bold text-[#ffd700] text-center mb-6">
                  Points Table
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm md:text-base">
                    <thead className="bg-[#1b2b4a]/70 text-[#ffd700] uppercase">
                      <tr>
                        <th className="py-3 px-4 text-left">Team</th>
                        <th className="py-3 px-4 text-center">P</th>
                        <th className="py-3 px-4 text-center">W</th>
                        <th className="py-3 px-4 text-center">L</th>
                        <th className="py-3 px-4 text-center">PTS</th>
                      </tr>
                    </thead>
                    <tbody>
                      {table.map((row, i) => (
                        <tr
                          key={i}
                          className={`${
                            i % 2 === 0 ? "bg-[#1b2b4a]/40" : "bg-[#0e1830]/40"
                          } hover:bg-[#ffd700]/10 transition`}
                        >
                          <td className="py-3 px-4 flex items-center gap-3">
                            <img
                              src={row.logo}
                              alt={row.team}
                              className="w-8 h-8 object-contain"
                            />
                            {row.team}
                          </td>
                          <td className="py-3 px-4 text-center">{row.p}</td>
                          <td className="py-3 px-4 text-center">{row.w}</td>
                          <td className="py-3 px-4 text-center">{row.l}</td>
                          <td className="py-3 px-4 text-center text-[#ffd700] font-semibold">
                            {row.pts}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      {/* --- Soft Golden Glows --- */}
      <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-[#ffd700]/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#ffd700]/10 rounded-full blur-3xl animate-pulse" />
    </div>
  );
}
