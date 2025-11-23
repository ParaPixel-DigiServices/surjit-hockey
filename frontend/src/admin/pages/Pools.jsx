// src/admin/pages/Pools.jsx
import React, { useMemo, useState, useEffect } from "react";
import PoolCard from "@/admin/components/pools/PoolCard";
import { PoolDialog } from "@/admin/components/pools/PoolDialogs";
import ManageTeamsDialog from "@/admin/components/pools/ManageTeamsDialog";
import StatsDialog from "@/admin/components/pools/StatsDialog";
import CSVImportDialog from "@/admin/components/pools/CSVImportDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Plus, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { api } from "@/services/api";
import config from "../../config/api";

/**
 * Pools Page
 * Now integrated with backend APIs — Fetches pools and teams from database
 */

export default function Pools() {
  const [teams, setTeams] = useState([]);
  const [pools, setPools] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pools and teams from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch all teams
        const teamsData = await api.getTeams(0, 1000);
        const formattedTeams = teamsData.map((t) => ({
          id: t.id,
          name: t.team_name,
          logo: config.getUploadUrl("teams", t.team_logo),
        }));
        setTeams(formattedTeams);

        // Fetch all pools
        const poolsData = await api.getPools();

        // For each pool, fetch its teams
        const poolsWithTeams = await Promise.all(
          poolsData.map(async (pool) => {
            try {
              const poolTeamsData = await api.getPoolTeams(pool.id);
              const poolTeams = poolTeamsData
                .map((pt) => formattedTeams.find((t) => t.id === pt.team_id))
                .filter(Boolean);

              return {
                id: pool.id,
                name: pool.pool_name,
                category: pool.pool_category_type === 1 ? "Men" : "Women",
                teams: poolTeams,
                description: `Pool ${pool.pool_name}`,
                stats: {
                  matches: 0,
                  wins: 0,
                  losses: 0,
                  draws: 0,
                  goals_for: 0,
                  goals_against: 0,
                },
              };
            } catch (error) {
              console.error(
                `Failed to fetch teams for pool ${pool.id}:`,
                error
              );
              return {
                id: pool.id,
                name: pool.pool_name,
                category: pool.pool_category_type === 1 ? "Men" : "Women",
                teams: [],
                description: `Pool ${pool.pool_name}`,
                stats: {
                  matches: 0,
                  wins: 0,
                  losses: 0,
                  draws: 0,
                  goals_for: 0,
                  goals_against: 0,
                },
              };
            }
          })
        );

        setPools(poolsWithTeams);
      } catch (error) {
        console.error("Failed to fetch pools data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // dialog/UI state
  const [createOpen, setCreateOpen] = useState(false);
  const [manageOpen, setManageOpen] = useState(false);
  const [statsOpen, setStatsOpen] = useState(false);
  const [csvOpen, setCsvOpen] = useState(false);
  const [editingPool, setEditingPool] = useState(null);

  // sorting
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [search, setSearch] = useState("");

  const createPool = (form) => {
    console.log(
      "⚠️ CREATE POOL: Backend POST endpoint required - /additional/pools"
    );
    console.log("Pool data:", form);
    // TODO: Implement backend endpoint
    const p = {
      id: Date.now(),
      name: form.name,
      category: form.category,
      teams: form.teams || [],
      description: form.description || "",
      stats: {
        matches: 0,
        wins: 0,
        losses: 0,
        draws: 0,
        goals_for: 0,
        goals_against: 0,
      },
    };
    setPools((prev) => [p, ...prev]);
  };

  const updatePool = (form) => {
    console.log(
      "⚠️ UPDATE POOL: Backend PUT endpoint required - /additional/pools/{id}"
    );
    console.log("Pool data:", form);
    // TODO: Implement backend endpoint
    setPools((prev) =>
      prev.map((p) =>
        p.id === editingPool.id
          ? {
              ...p,
              name: form.name,
              category: form.category,
              teams: form.teams,
              description: form.description,
            }
          : p
      )
    );
  };

  const removePool = (pool) => {
    console.log(
      "⚠️ DELETE POOL: Backend DELETE endpoint required - /additional/pools/{id}"
    );
    console.log("Pool ID:", pool.id);
    // TODO: Implement backend endpoint
    setPools((prev) => prev.filter((p) => p.id !== pool.id));
  };

  const openEdit = (pool) => {
    setEditingPool(pool);
    setCreateOpen(true);
  };

  const openManageTeams = (pool) => {
    setEditingPool(pool);
    setManageOpen(true);
  };

  const saveManagedTeams = (newTeams) => {
    console.log(
      "⚠️ UPDATE POOL TEAMS: Backend PUT endpoint required - /additional/pools/{pool_id}/teams"
    );
    console.log("Pool ID:", editingPool.id, "Teams:", newTeams);
    // TODO: Implement backend endpoint
    setPools((prev) =>
      prev.map((p) => (p.id === editingPool.id ? { ...p, teams: newTeams } : p))
    );
  };

  const openStats = (pool) => {
    setEditingPool(pool);
    setStatsOpen(true);
  };

  const saveStats = (s) => {
    console.log(
      "⚠️ UPDATE POOL STATS: Backend PUT endpoint required - /additional/pools/{pool_id}/stats"
    );
    console.log("Pool ID:", editingPool.id, "Stats:", s);
    // TODO: Implement backend endpoint
    setPools((prev) =>
      prev.map((p) => (p.id === editingPool.id ? { ...p, stats: s } : p))
    );
  };

  const handleImport = (importedPools) => {
    console.log(
      "⚠️ IMPORT POOLS: Backend POST endpoint required - /additional/pools/import"
    );
    console.log("Imported pools:", importedPools);
    // TODO: Implement backend endpoint

    // merge imported teams into teams list and pools
    const newTeams = [...teams];
    importedPools.forEach((p) => {
      p.teams.forEach((t) => {
        if (!newTeams.some((nt) => nt.name === t.name)) {
          const id = Date.now() + Math.floor(Math.random() * 1000);
          newTeams.push({ id, name: t.name });
          t.id = id;
        } else {
          t.id = newTeams.find((nt) => nt.name === t.name).id;
        }
      });
    });
    setTeams(newTeams);

    // add pools
    setPools((prev) => [...importedPools.map((p) => ({ ...p })), ...prev]);
  };

  // sorted & filtered list
  const visible = useMemo(() => {
    let list = pools.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    );
    list = list.sort((a, b) => {
      let av =
        sortBy === "name"
          ? a.name
          : sortBy === "category"
            ? a.category
            : a.teams.length;
      let bv =
        sortBy === "name"
          ? b.name
          : sortBy === "category"
            ? b.category
            : b.teams.length;
      if (typeof av === "string") av = av.toLowerCase();
      if (typeof bv === "string") bv = bv.toLowerCase();
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return list;
  }, [pools, search, sortBy, sortDir]);

  return (
    <div className="space-y-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold text-white">Pools</h1>
          <p className="text-sm text-white/60">
            Manage tournament pools and assign teams.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <Input
              placeholder="Search pools..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-[#0f1e3a] text-white w-64"
            />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#0f1e3a] text-white py-2 rounded-md px-3"
          >
            <option value="name">Sort: Name</option>
            <option value="category">Sort: Category</option>
            <option value="teams">Sort: Team Count</option>
          </select>

          <button
            onClick={() =>
              setSortDir((dir) => (dir === "asc" ? "desc" : "asc"))
            }
            className="px-3 py-2 bg-white/6 rounded-md text-white"
          >
            {sortDir === "asc" ? "Asc" : "Desc"}
          </button>

          <Button
            className="bg-[#ffd700] text-[#071226] flex items-center gap-2"
            onClick={() => {
              setEditingPool(null);
              setCreateOpen(true);
            }}
          >
            <PlusIcon /> Create Pool
          </Button>

          <Button
            className="bg-white/6 text-white flex items-center gap-2"
            onClick={() => setCsvOpen(true)}
          >
            <Upload size={16} /> Import CSV
          </Button>
        </div>
      </div>

      {/* pools grid */}
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ffd700]"></div>
        </div>
      ) : visible.length === 0 ? (
        <div className="text-center py-20 text-white/60">
          <p>No pools found</p>
          <p className="text-xs mt-2 text-white/40">
            Note: Add/Edit/Delete requires backend endpoints
          </p>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {visible.map((p) => (
              <PoolCard
                key={p.id}
                pool={p}
                onEdit={(pool) => {
                  setEditingPool(pool);
                  setCreateOpen(true);
                }}
                onManageTeams={(pool) => openManageTeams(pool)}
                onDelete={removePool}
                onEditStats={openStats}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* dialogs */}
      <PoolDialog
        open={createOpen}
        onClose={() => {
          setCreateOpen(false);
          setEditingPool(null);
        }}
        onSave={(form) => {
          if (editingPool) {
            // update
            setPools((prev) =>
              prev.map((p) =>
                p.id === editingPool.id
                  ? {
                      ...p,
                      name: form.name,
                      category: form.category,
                      teams: form.teams,
                      description: form.description,
                    }
                  : p
              )
            );
            setEditingPool(null);
          } else {
            createPool(form);
          }
          setCreateOpen(false);
        }}
        initial={editingPool}
        teams={teams}
      />

      <ManageTeamsDialog
        open={manageOpen}
        onClose={() => {
          setManageOpen(false);
          setEditingPool(null);
        }}
        pool={editingPool}
        allTeams={teams}
        onSave={(newTeams) => {
          saveManagedTeams(newTeams);
          setEditingPool(null);
        }}
      />

      <StatsDialog
        open={statsOpen}
        onClose={() => setStatsOpen(false)}
        pool={editingPool}
        onSave={saveStats}
      />

      <CSVImportDialog
        open={csvOpen}
        onClose={() => setCsvOpen(false)}
        onImport={handleImport}
      />
    </div>
  );
}

/* small helper icons (avoid extra imports) */
function PlusIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="w-4 h-4"
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
        clipRule="evenodd"
      />
    </svg>
  );
}
