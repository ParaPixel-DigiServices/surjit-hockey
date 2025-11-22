import React from "react";
import Hero from "../components/sections/Hero";
import TrendingNow from "../components/sections/TrendingNow";
import MatchSchedule from "../components/sections/MatchSchedule";
import Gallery from "../components/sections/Gallery";
import Messages from "../components/sections/Messages";
import SponsorsMarquee from "../components/sections/SponsorsMarquee";

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-[#1b2b4a] overflow-x-hidden">
      <Hero />
      <SponsorsMarquee />
      <TrendingNow />
      <MatchSchedule />
      <Gallery />
      <Messages />
    </main>
  );
}
