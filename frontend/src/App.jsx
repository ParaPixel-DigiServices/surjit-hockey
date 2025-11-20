// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Tournaments from "./pages/Tournaments";
import Results from "./pages/Results";
import TournamentFixtures from "./components/tournaments/FixturesMen";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import NotFound from "./pages/NotFound";

// ADMIN
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/components/Dashboard";
import Teams from "./admin/pages/Teams";
import Pools from "./admin/pages/Pools";
import Fixtures from "./admin/pages/Fixtures";
import ResultsAdmin from "./admin/pages/Results";

export default function App() {
  return (
    <Routes>

      {/** ========= MAIN WEBSITE ROUTES ========= **/}

      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />

      <Route
        path="/gallery"
        element={
          <MainLayout>
            <Gallery />
          </MainLayout>
        }
      />

      <Route
        path="/news"
        element={
          <MainLayout>
            <News />
          </MainLayout>
        }
      />

      {/** 🚨 About page uses its OWN header — NOT MainLayout **/}
      <Route path="/about" element={<About />} />

      <Route path="/tournament" element={<Tournaments />} />
      <Route path="/tournaments" element={<Tournaments />} />
      <Route path="/fixtures" element={<TournamentFixtures />} />
      <Route path="/results" element={<Results />} />

      {/** ========= ADMIN ROUTES ========= **/}

      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="teams" element={<Teams />} />
        <Route path="pools" element={<Pools />} />
        <Route path="fixtures" element={<Fixtures />} />
        <Route path="results" element={<ResultsAdmin />} />
      </Route>

      {/** ========= 404 ========= **/}
      <Route path="*" element={<NotFound />} />

    </Routes>
  );
}
