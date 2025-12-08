import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import TournamentHeader from "../components/layout/TournamentHeader";
import HockeyIndiaOfficials from "../components/tournaments/HockeyOfficials";
import TournamentParticipationRequest from "../components/tournaments/TournamentParticipationRequest";
import ParticipatingTeams from "../components/tournaments/ParticipatingTeams";
import HockeyIndiaPostings from "../components/tournaments/HockeyIndiaPostings";
import QualifyingRoundTeams from "../components/tournaments/QualifyingRoundTeams";
import PointsEarnedMen from "../components/tournaments/PointsEarnedMen";
import FixturesMen from "../components/tournaments/FixturesMen";
import RollOfHonour from "../components/tournaments/RollOfHonour";
import ForeignTeams from "../components/tournaments/ForeignTeams";
import PlayersOfficialHonours from "../components/tournaments/PlayersOfficialHonours";
import MatchesConducted from "../components/tournaments/MatchesConducted";

export default function Tournament() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      setTimeout(() => {
        const targetId = location.hash.replace("#", "");
        const el = document.getElementById(targetId);
        if (el) {
          // Account for sticky header height (primary 80px + secondary 48px + extra padding)
          const headerOffset = 180;
          const elementPosition = el.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }, [location.hash]);

  return (
    <>
      <TournamentHeader />
      <main className="font-[Sora] bg-[#f9f9f9]">
        <HockeyIndiaOfficials />
        <TournamentParticipationRequest />
        <ParticipatingTeams />
        <HockeyIndiaPostings />
        <QualifyingRoundTeams />
        <PointsEarnedMen />
        <FixturesMen />
        <RollOfHonour />
        <ForeignTeams />
        <PlayersOfficialHonours />
        <MatchesConducted />
      </main>
    </>
  );
}
