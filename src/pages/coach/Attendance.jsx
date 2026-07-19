import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { EVENTS, ATTENDANCE_SUMMARY, ROSTER } from "../../data/demo.js";

const RSVP_COLORS = {
  going: "text-emerald-300 bg-emerald-950/50",
  maybe: "text-yellow-300 bg-yellow-950/50",
  "not-going": "text-red-300 bg-red-950/50",
};

export default function Attendance() {
  const [selectedEventId, setSelectedEventId] = useState(EVENTS[0].id);
  const [showReminder, setShowReminder] = useState(false);

  const selectedEvent = EVENTS.find(e => e.id === selectedEventId);
  const responded = ROSTER.filter(p => p.rsvp !== null);
  const missing = ROSTER.filter(p => p.rsvp === null);
  const total = ROSTER.length;
  const respondedPct = Math.round((responded.length / total) * 100);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Attendance
        </h2>
      </div>

      {/* Event selector */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Select Event</p>
        <div className="flex flex-wrap gap-2">
          {EVENTS.map(event => (
            <button
              key={event.id}
              onClick={() => setSelectedEventId(event.id)}
              className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                selectedEventId === event.id
                  ? "bg-cyan-400 text-black"
                  : "border border-emerald-800 text-emerald-100 hover:bg-emerald-950"
              }`}
            >
              {event.title}
            </button>
          ))}
        </div>
      </div>

      {selectedEvent && (
        <>
          <div className="rounded-xl border p-4 bg-black border-emerald-800 text-sm text-emerald-300">
            Showing attendance for: <span className="text-emerald-100 font-semibold">{selectedEvent.title}</span> — {selectedEvent.date}
          </div>

          {/* Stats grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col items-center">
              <span className="text-3xl font-bold text-emerald-300">{ATTENDANCE_SUMMARY.going}</span>
              <span className="text-xs text-emerald-500 mt-1">Going</span>
            </div>
            <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col items-center">
              <span className="text-3xl font-bold text-yellow-300">{ATTENDANCE_SUMMARY.maybe}</span>
              <span className="text-xs text-yellow-500 mt-1">Maybe</span>
            </div>
            <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col items-center">
              <span className="text-3xl font-bold text-red-300">{ATTENDANCE_SUMMARY.notGoing}</span>
              <span className="text-xs text-red-500 mt-1">Not Going</span>
            </div>
            <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-300">{ATTENDANCE_SUMMARY.noResponse}</span>
              <span className="text-xs text-gray-500 mt-1">No Response</span>
            </div>
          </div>

          {/* Response reliability */}
          <div className="rounded-xl border p-5 bg-black border-emerald-800">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Response Reliability</p>
            <p className="text-sm text-emerald-300 mb-2">
              {responded.length} of {total} families responded ({respondedPct}%)
            </p>
            <div className="w-full bg-emerald-950 rounded-full h-2">
              <div className="bg-emerald-400 h-2 rounded-full transition-all" style={{ width: `${respondedPct}%` }} />
            </div>
          </div>

          {/* Roster list */}
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Player RSVPs</h3>
            <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
              {ROSTER.map((player, idx) => (
                <div key={player.id}>
                  <div className="flex items-center justify-between gap-3 px-4 py-3">
                    <div className="flex items-center gap-3">
                      <span className="text-emerald-600 text-xs w-6 text-right font-mono">#{player.jersey}</span>
                      <span className="text-emerald-100 text-sm font-medium">{player.name}</span>
                    </div>
                    {player.rsvp ? (
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${RSVP_COLORS[player.rsvp] || "text-gray-300 bg-gray-900"}`}>
                        {player.rsvp === "not-going" ? "Not Going" : player.rsvp.charAt(0).toUpperCase() + player.rsvp.slice(1)}
                      </span>
                    ) : (
                      <span className="text-xs font-semibold px-2.5 py-1 rounded-full text-gray-400 bg-gray-900/60">No Response</span>
                    )}
                  </div>
                  {idx < ROSTER.length - 1 && <div className="h-px w-full bg-emerald-900/50" />}
                </div>
              ))}
            </div>
          </section>

          {/* Missing responses */}
          {missing.length > 0 && (
            <section className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Missing Responses</h3>
              <div className="rounded-xl border bg-black border-yellow-800 p-4 flex flex-col gap-2">
                {missing.map(player => (
                  <div key={player.id} className="flex items-center gap-3 text-sm">
                    <iconify-icon icon="solar:warning-linear" width="16" class="text-yellow-400 flex-shrink-0" />
                    <span className="text-emerald-100">{player.name}</span>
                    <span className="text-emerald-500 text-xs">#{player.jersey} · {player.guardian}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowReminder(v => !v)}
                className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px] w-fit"
              >
                Prepare Reminder
              </button>
              {showReminder && (
                <div className="rounded-xl border bg-black border-emerald-800 p-4 flex flex-col gap-2">
                  <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Draft Reminder</p>
                  <p className="text-sm text-emerald-200 leading-relaxed">
                    Hi team! We still need RSVPs from a few families for <strong>{selectedEvent.title}</strong> on {selectedEvent.date}. Please update your attendance by tapping the RSVP link. Thanks! — Coach Mike
                  </p>
                  <p className="text-xs text-emerald-600 mt-1">This draft is not sent — submit for approval to queue notification.</p>
                </div>
              )}
            </section>
          )}
        </>
      )}

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
