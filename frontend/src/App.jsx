import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Tournaments from "./pages/Tournaments";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";
import TournamentFixtures from "./components/tournaments/FixturesMen";
import Gallery from "./pages/Gallery";
import News from "./pages/News";

/**
 * App.jsx — Production Layout Routing
 * -----------------------------------
 * ✅ Uses MainLayout for core pages
 * ✅ Keeps About standalone (its own header)
 */

export default function App() {
  return (
    <Routes>
      {/* ✅ Pages that use MainLayout */}
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      {/* You can add more MainLayout pages here later */}
      {/* <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} /> */}

      {/* ✅ Standalone About page (no main header/footer) */}
      <Route path="/about" element={<About />} />

      <Route path="/tournament" element={<Tournaments />} />

      <Route path="/results" element={<Results />} />

      <Route path="/fixtures" element={<TournamentFixtures />} />

      <Route path="/gallery" element={<Gallery />} />

      <Route path="/news" element={<News />} />

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
