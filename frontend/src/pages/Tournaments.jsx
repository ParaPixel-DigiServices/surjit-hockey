import React from "react";
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
