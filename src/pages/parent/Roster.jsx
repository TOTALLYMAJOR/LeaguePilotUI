import { ROSTER } from "../../data/demo.js";
import StatusBadge from "../../components/StatusBadge.jsx";

const RSVP_LABEL = { going: "Going", maybe: "Maybe", "not-going": "Not Going" };
const RSVP_STATUS = { going: "confirmed", maybe: "changed", "not-going": "cancelled" };

export default function Roster() {
  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2
          className="text-2xl font-semibold tracking-tight text-emerald-100"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          Roster — Riverside Rockets
        </h2>
      </div>

      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">
          Players · {ROSTER.length} total
        </h3>

        <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
          {ROSTER.map((player, idx) => (
            <div key={player.id}>
              <div className="flex items-center gap-3 px-4 py-3">
                {/* Jersey badge */}
                <div className="w-9 h-9 rounded-lg bg-emerald-900 border border-emerald-700 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-cyan-400">#{player.jersey}</span>
                </div>

                {/* Name */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-emerald-100 truncate">{player.name}</p>
                </div>

                {/* RSVP status */}
                {player.rsvp ? (
                  <StatusBadge status={RSVP_STATUS[player.rsvp]} label={RSVP_LABEL[player.rsvp]} />
                ) : (
                  <span className="text-xs text-emerald-600 italic">No response</span>
                )}
              </div>
              {idx < ROSTER.length - 1 && <div className="h-px w-full bg-emerald-900 mx-0" />}
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-2 rounded-xl border bg-black border-emerald-800 px-4 py-3">
        <iconify-icon icon="solar:shield-check-linear" width="16" className="text-emerald-600 shrink-0" />
        <p className="text-xs text-emerald-600">
          Full contact info is only shared by your coach. RSVP statuses are for the next scheduled game.
        </p>
      </div>
    </div>
  );
}
