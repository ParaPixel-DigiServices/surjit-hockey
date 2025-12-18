import React from "react";
import Hero from "../components/sections/Hero";
import BreakingNews from "../components/sections/BreakingNews";
import EventsAndNews from "../components/sections/EventsAndNews";
import MatchSchedule from "../components/sections/MatchSchedule";
import Gallery from "../components/sections/Gallery";
import Messages from "../components/sections/Messages";
import SponsorsMarquee from "../components/sections/SponsorsMarquee";
import MessagesPreview from "../components/sections/MessagesPreview";
import BestPlayersHighlight from "../components/sections/BestPlayersHighlight";
import HonoursAndPointsHighlight from "../components/sections/HonoursAndPointsHighlight";

export default function Home() {
  return (
    <main className="bg-white min-h-screen text-[#1b2b4a] overflow-x-hidden">
      <Hero />
      <BreakingNews />
      <SponsorsMarquee />
      <MessagesPreview />
      <BestPlayersHighlight />
      <HonoursAndPointsHighlight />
      <EventsAndNews />
      <MatchSchedule />
      <Gallery />
      <Messages />
    </main>
  );
}
