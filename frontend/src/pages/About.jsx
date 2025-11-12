import React from "react";
import AboutHeader from "../components/layout/AboutHeader"; // your scrolling navbar
import History from "../components/about/History"; // the section we just built
import AimsObjectives from "../components/about/AimsObjectives";
import Olympian from "../components/about/Olympian";
import President from "../components/about/President";
import WorkingPresidents from "../components/about/WorkingPresidents";
import HonorarySecretary from "../components/about/HonorarySecretary";
import SecretaryGeneral from "../components/about/SecretaryGeneral";
import FormerPresidents from "../components/about/FormerPresidents";
import FormerSecretaries from "../components/about/FormerSecretaries";
import ChiefAdvisor from "../components/about/ChiefAdvisor";
import Advisers from "../components/about/Advisers";
import Patrons from "../components/about/Patrons";
import NRIWellWishers from "../components/about/NRIWellWishers";
import { Form } from "react-router-dom";
import LestWeForget from "../components/about/LestWeForget";

/**
 * About.jsx
 * -------------------------------------
 * ✅ Uses AboutHeader (auto-scrolling nav)
 * ✅ Renders the first section: History
 * ✅ Structure ready to add other sections easily
 */

export default function About() {
  return (
    <div className="min-h-screen bg-white text-[#1b2b4a]">
      <AboutHeader />

      <main className="pt-4 sm:pt-6 md:pt-8">
        <History />
        <AimsObjectives />
        <Olympian />
        <President />
        <WorkingPresidents />
        <HonorarySecretary />
        <SecretaryGeneral />
        <FormerPresidents />
        <FormerSecretaries />
        <ChiefAdvisor />
        <Advisers />
        <Patrons />
        <NRIWellWishers />
        <LestWeForget />
      </main>
    </div>
  );
}

