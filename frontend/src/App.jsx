// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

import MainLayout from "./components/layout/MainLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Tournaments from "./pages/Tournaments";
import Results from "./pages/Results";
import TournamentFixtures from "./components/tournaments/FixturesMen";
import Gallery from "./pages/Gallery";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

// New Pages
import Pools from "./pages/Pools";
import Honours from "./pages/Honours";
import Officials from "./pages/Officials";
import Players from "./pages/Players";
import Positions from "./pages/Positions";
import Streaming from "./pages/Streaming";
import Teams from "./pages/Teams";
import TeamDetail from "./pages/TeamDetail";
import Sponsors from "./pages/Sponsors";
import Messages from "./pages/Messages";
import Contact from "./pages/Contact";

// ADMIN
import AdminLayout from "./admin/layout/AdminLayout";
import Dashboard from "./admin/components/Dashboard";
import TeamsAdmin from "./admin/pages/Teams";
import PoolsAdmin from "./admin/pages/Pools";
import Fixtures from "./admin/pages/Fixtures";
import ResultsAdmin from "./admin/pages/Results";
import GalleryAdmin from "./admin/pages/Gallery";
import NewsAdmin from "./admin/pages/News";
import SponsorsAdmin from "./admin/pages/Sponsors";
import SettingsAdmin from "./admin/pages/Settings";

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        {/** ========= AUTH ROUTES ========= **/}
        <Route path="/login" element={<Login />} />

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

        <Route
          path="/news/:id"
          element={
            <MainLayout>
              <NewsDetail />
            </MainLayout>
          }
        />

        {/** 🚨 About page uses its OWN header — NOT MainLayout **/}
        <Route path="/about" element={<About />} />

        <Route path="/tournament" element={<Tournaments />} />
        <Route path="/tournaments" element={<Tournaments />} />
        <Route
          path="/fixtures"
          element={
            <MainLayout>
              <TournamentFixtures />
            </MainLayout>
          }
        />
        <Route
          path="/results"
          element={
            <MainLayout>
              <Results />
            </MainLayout>
          }
        />

        {/** ========= NEW DROPDOWN PAGES ========= **/}

        <Route
          path="/pools"
          element={
            <MainLayout>
              <Pools />
            </MainLayout>
          }
        />

        <Route
          path="/honours"
          element={
            <MainLayout>
              <Honours />
            </MainLayout>
          }
        />

        <Route
          path="/officials"
          element={
            <MainLayout>
              <Officials />
            </MainLayout>
          }
        />

        <Route
          path="/players"
          element={
            <MainLayout>
              <Players />
            </MainLayout>
          }
        />

        <Route
          path="/positions"
          element={
            <MainLayout>
              <Positions />
            </MainLayout>
          }
        />

        <Route
          path="/streaming"
          element={
            <MainLayout>
              <Streaming />
            </MainLayout>
          }
        />

        <Route
          path="/teams"
          element={
            <MainLayout>
              <Teams />
            </MainLayout>
          }
        />

        <Route
          path="/teams"
          element={
            <MainLayout>
              <Teams />
            </MainLayout>
          }
        />

        <Route
          path="/team/:id"
          element={
            <MainLayout>
              <TeamDetail />
            </MainLayout>
          }
        />

        <Route
          path="/messages"
          element={
            <MainLayout>
              <Messages />
            </MainLayout>
          }
        />

        <Route
          path="/contact"
          element={
            <MainLayout>
              <Contact />
            </MainLayout>
          }
        />

        <Route
          path="/sponsors"
          element={
            <MainLayout>
              <Sponsors />
            </MainLayout>
          }
        />

        {/** ========= ADMIN ROUTES (PROTECTED) ========= **/}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="teams" element={<TeamsAdmin />} />
          <Route path="pools" element={<PoolsAdmin />} />
          <Route path="fixtures" element={<Fixtures />} />
          <Route path="results" element={<ResultsAdmin />} />
          <Route path="gallery" element={<GalleryAdmin />} />
          <Route path="news" element={<NewsAdmin />} />
          <Route path="sponsors" element={<SponsorsAdmin />} />
          <Route path="settings" element={<SettingsAdmin />} />
        </Route>

        {/** ========= 404 ========= **/}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  );
}
