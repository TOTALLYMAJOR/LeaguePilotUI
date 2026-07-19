import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";

const TEAMS_DATA = [
  { id: "t1", name: "Riverside Rockets", players: 12, coach: "Mike Henderson", coachStatus: "ok", access: "12/12", accessStatus: "complete" },
  { id: "t2", name: "Valley Stars", players: 14, coach: null, coachStatus: "missing", access: "12/14", accessStatus: "incomplete" },
  { id: "t3", name: "Eastside Tigers", players: 11, coach: "Dave Nguyen", coachStatus: "ok", access: "11/11", accessStatus: "complete" },
  { id: "t4", name: "River Hawks", players: 13, coach: "Lisa Park", coachStatus: "ok", access: "13/13", accessStatus: "complete" },
];

export default function Teams() {
  const [season] = useState("Summer 2025");
  const [showCreate, setShowCreate] = useState(false);
  const [showArchiveWarning, setShowArchiveWarning] = useState(false);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Teams & Seasons
        </h2>
        <button onClick={() => setShowCreate(v => !v)} className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">
          + Create Team
        </button>
      </div>

      {/* Season selector */}
      <div className="flex items-center gap-3">
        <iconify-icon icon="solar:calendar-linear" width="18" className="text-emerald-500" />
        <span className="text-sm font-semibold text-emerald-100">{season}</span>
        <StatusBadge status="active" label="Active" />
      </div>

      {/* Create team form */}
      {showCreate && (
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-emerald-100">New Team</h3>
          <input className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-cyan-500" placeholder="Team name" />
          <div className="flex gap-2">
            <button className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">Create</button>
            <button onClick={() => setShowCreate(false)} className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">Cancel</button>
          </div>
        </div>
      )}

      {/* Teams list */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Teams</h3>
        <div className="flex flex-col gap-3">
          {TEAMS_DATA.map(team => (
            <div key={team.id} className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-emerald-100">{team.name}</p>
                  <p className="text-xs text-emerald-500 mt-0.5">{team.players} players · {season}</p>
                </div>
                <button className="px-3 py-1.5 rounded-lg border border-emerald-800 text-emerald-100 text-xs font-medium hover:bg-emerald-950 transition-colors min-h-[36px]">Manage</button>
              </div>
              <div className="h-px w-full bg-emerald-900" />
              <div className="grid grid-cols-3 gap-2 text-xs">
                <div>
                  <p className="text-emerald-500 mb-1">Coach</p>
                  {team.coachStatus === "missing"
                    ? <span className="text-red-400 font-semibold flex items-center gap-1"><iconify-icon icon="solar:warning-linear" width="12" />MISSING</span>
                    : <span className="text-emerald-100">{team.coach}</span>}
                </div>
                <div>
                  <p className="text-emerald-500 mb-1">Roster</p>
                  <span className="text-emerald-100">{team.players} players</span>
                </div>
                <div>
                  <p className="text-emerald-500 mb-1">Family Access</p>
                  <span className={team.accessStatus === "complete" ? "text-emerald-300" : "text-yellow-300"}>{team.access}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Roster maker preview */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Roster Maker Preview</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
          <p className="text-sm text-emerald-400">Automatic team construction preview — balanced by age and skill.</p>
          <div className="rounded-lg bg-yellow-950/40 border border-yellow-800 p-3 flex items-start gap-2">
            <iconify-icon icon="solar:warning-linear" width="16" className="text-yellow-400 shrink-0 mt-0.5" />
            <p className="text-xs text-yellow-300">Balance warning: Valley Stars has 2 more players than Eastside Tigers. Consider redistributing before the season starts.</p>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {TEAMS_DATA.map(t => (
              <div key={t.id} className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-2">
                <p className="text-emerald-300 font-semibold">{t.players}</p>
                <p className="text-emerald-600 mt-0.5 truncate">{t.name.split(" ").pop()}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Season archive */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Season Archive</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
          <div className="rounded-lg bg-red-950/30 border border-red-800 p-3 flex items-start gap-2">
            <iconify-icon icon="solar:warning-linear" width="16" className="text-red-400 shrink-0 mt-0.5" />
            <p className="text-xs text-red-300">Archiving a season sets all records to read-only. This cannot be undone without admin intervention.</p>
          </div>
          {!showArchiveWarning ? (
            <button onClick={() => setShowArchiveWarning(true)} className="px-4 py-2 rounded-lg border border-red-800 text-red-400 text-sm font-medium hover:bg-red-950 transition-colors min-h-[44px]">
              Archive Summer 2025…
            </button>
          ) : (
            <div className="flex gap-2">
              <button className="px-4 py-2 rounded-lg bg-red-700 text-white text-sm font-semibold hover:bg-red-600 transition-colors min-h-[44px]">Confirm Archive</button>
              <button onClick={() => setShowArchiveWarning(false)} className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">Cancel</button>
            </div>
          )}
        </div>
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
