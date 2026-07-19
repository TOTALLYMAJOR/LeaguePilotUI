import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { ROSTER, TEAM } from "../../data/demo.js";

const RSVP_COLORS = {
  going: "text-emerald-300 bg-emerald-950/60",
  maybe: "text-yellow-300 bg-yellow-950/60",
  "not-going": "text-red-300 bg-red-950/60",
};

export default function Roster() {
  const [primaryColor, setPrimaryColor] = useState(TEAM.colors.primary);
  const [secondaryColor, setSecondaryColor] = useState(TEAM.colors.secondary);
  const [mascot, setMascot] = useState(TEAM.mascot);

  const confirmed = ROSTER.filter(p => p.rsvp === "going").length;
  const nextGame = "Riverside Hawks · Game — July 5";

  // Check for jersey conflicts
  const jerseyNums = ROSTER.map(p => p.jersey);
  const dupes = jerseyNums.filter((n, i) => jerseyNums.indexOf(n) !== i);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Team Roster
        </h2>
      </div>

      {/* Team header */}
      <div className="rounded-xl border p-5 bg-black border-emerald-800 flex items-center gap-4">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-black flex-shrink-0"
          style={{ backgroundColor: primaryColor }}
        >
          {TEAM.initials}
        </div>
        <div>
          <p className="text-emerald-100 font-semibold text-lg">{TEAM.name}</p>
          <p className="text-emerald-400 text-sm">{TEAM.division} · {TEAM.season}</p>
          <p className="text-emerald-500 text-xs">{ROSTER.length} players</p>
        </div>
      </div>

      {/* Readiness summary */}
      <div className="rounded-xl border p-5 bg-black border-emerald-800 flex flex-col gap-2">
        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Team Readiness — Next Game</p>
        <p className="text-sm text-emerald-400">{nextGame}</p>
        <div className="flex items-center gap-3 mt-1">
          <span className="text-2xl font-bold text-emerald-300">{confirmed}</span>
          <span className="text-emerald-500 text-sm">of {ROSTER.length} confirmed</span>
        </div>
        <div className="w-full bg-emerald-950 rounded-full h-2 mt-1">
          <div className="bg-emerald-400 h-2 rounded-full" style={{ width: `${Math.round((confirmed / ROSTER.length) * 100)}%` }} />
        </div>
      </div>

      {/* Family access gaps */}
      <div className="rounded-xl border p-4 bg-black border-emerald-800 flex items-center gap-3">
        <iconify-icon icon="solar:shield-check-linear" width="20" class="text-emerald-400 flex-shrink-0" />
        <div>
          <p className="text-sm text-emerald-100 font-medium">Family Access Gaps: <span className="text-emerald-300">0 gaps</span></p>
          <p className="text-xs text-emerald-500 mt-0.5">Note: 2 families have pending access in another team — see admin panel.</p>
        </div>
      </div>

      {/* Jersey conflict note */}
      {dupes.length > 0 ? (
        <div className="rounded-xl border p-4 bg-black border-yellow-800 flex items-center gap-3">
          <iconify-icon icon="solar:warning-linear" width="20" class="text-yellow-400 flex-shrink-0" />
          <p className="text-sm text-yellow-300">Jersey conflict: #{dupes.join(", #")} is assigned to multiple players.</p>
        </div>
      ) : (
        <div className="rounded-xl border p-4 bg-black border-emerald-800 flex items-center gap-3">
          <iconify-icon icon="solar:check-circle-linear" width="20" class="text-emerald-400 flex-shrink-0" />
          <p className="text-sm text-emerald-300">No jersey conflicts detected.</p>
        </div>
      )}

      {/* Roster table */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Player Roster</h3>
        <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 px-4 py-2 bg-emerald-950/30">
            <span className="col-span-2 text-xs font-semibold text-emerald-500 uppercase tracking-wider">#</span>
            <span className="col-span-5 text-xs font-semibold text-emerald-500 uppercase tracking-wider">Name</span>
            <span className="col-span-3 text-xs font-semibold text-emerald-500 uppercase tracking-wider">RSVP</span>
            <span className="col-span-2 text-xs font-semibold text-emerald-500 uppercase tracking-wider">Status</span>
          </div>
          {ROSTER.map((player, idx) => (
            <div key={player.id}>
              <div className="grid grid-cols-12 items-center px-4 py-3">
                <span className="col-span-2 text-emerald-500 text-sm font-mono">{player.jersey}</span>
                <span className="col-span-5 text-emerald-100 text-sm font-medium">{player.name}</span>
                <span className="col-span-3">
                  {player.rsvp ? (
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${RSVP_COLORS[player.rsvp] || "text-gray-400 bg-gray-900"}`}>
                      {player.rsvp === "not-going" ? "No" : player.rsvp.charAt(0).toUpperCase() + player.rsvp.slice(1)}
                    </span>
                  ) : (
                    <span className="text-xs text-gray-500">—</span>
                  )}
                </span>
                <span className="col-span-2">
                  <StatusBadge status={player.status} />
                </span>
              </div>
              {idx < ROSTER.length - 1 && <div className="h-px w-full bg-emerald-900/50" />}
            </div>
          ))}
        </div>
      </section>

      {/* Update team colors/mascot */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Team Colors &amp; Mascot</h3>
        <div className="rounded-xl border p-5 bg-black border-emerald-800 flex flex-col gap-4">
          <div className="flex flex-wrap gap-4 items-end">
            <div>
              <label className="text-xs text-emerald-400 mb-1 block font-medium">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={primaryColor}
                  onChange={e => setPrimaryColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-emerald-800 bg-transparent"
                />
                <span className="text-sm text-emerald-400 font-mono">{primaryColor}</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-emerald-400 mb-1 block font-medium">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={secondaryColor}
                  onChange={e => setSecondaryColor(e.target.value)}
                  className="w-10 h-10 rounded cursor-pointer border border-emerald-800 bg-transparent"
                />
                <span className="text-sm text-emerald-400 font-mono">{secondaryColor}</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-emerald-400 mb-1 block font-medium">Mascot</label>
              <input
                type="text"
                value={mascot}
                onChange={e => setMascot(e.target.value)}
                className="bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600 min-h-[44px]"
              />
            </div>
          </div>

          {/* Preview */}
          <div className="flex items-center gap-3 mt-1">
            <div className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0" style={{ backgroundColor: primaryColor, color: "#000" }}>
              {TEAM.initials}
            </div>
            <div>
              <p className="text-sm text-emerald-100 font-semibold">{TEAM.name}</p>
              <p className="text-xs" style={{ color: secondaryColor }}>{mascot}</p>
            </div>
          </div>

          <p className="text-xs text-emerald-600">Contact admin for roster changes (add/remove players).</p>
        </div>
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
