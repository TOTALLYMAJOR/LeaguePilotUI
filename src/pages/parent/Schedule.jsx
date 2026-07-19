import { useState } from "react";
import { EVENTS } from "../../data/demo.js";
import StatusBadge from "../../components/StatusBadge.jsx";

const FILTERS = ["Today", "This Week", "Later"];

const filterMap = {
  Today: [],
  "This Week": EVENTS.slice(0, 3),
  Later: EVENTS.slice(3),
};

export default function Schedule() {
  const [active, setActive] = useState("This Week");
  const filtered = filterMap[active];

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2
          className="text-2xl font-semibold tracking-tight text-emerald-100"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          Schedule
        </h2>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 flex-wrap">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium min-h-[44px] border transition-colors ${
              active === f
                ? "bg-cyan-400 text-black border-cyan-400"
                : "border-emerald-800 text-emerald-300 hover:bg-emerald-950"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Event list */}
      <section className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border bg-black border-emerald-800 p-8 flex flex-col items-center gap-3 text-center">
            <iconify-icon icon="solar:calendar-linear" width="36" className="text-emerald-700" />
            <p className="text-emerald-400 font-medium">No events {active === "Today" ? "today" : "in this period"}</p>
            <p className="text-sm text-emerald-600">Check back soon or view another time range.</p>
          </div>
        ) : (
          filtered.map((event) => {
            const isCancelled = event.status === "cancelled";
            return (
              <div
                key={event.id}
                className={`rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-emerald-800 ${
                  isCancelled ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{event.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span
                        className={`text-emerald-100 font-semibold text-sm ${isCancelled ? "line-through" : ""}`}
                      >
                        {event.title}
                      </span>
                      <StatusBadge status={event.status} label={event.statusLabel} />
                    </div>
                    <p className="text-sm text-emerald-400">
                      {event.date} · {event.time}
                    </p>
                    <p className="text-sm text-emerald-500">{event.location}</p>
                  </div>
                </div>

                {event.changed && event.changeNote && (
                  <div className="mt-3 flex items-center gap-2 bg-indigo-950 border border-indigo-800 rounded-lg px-3 py-2">
                    <iconify-icon icon="solar:info-circle-linear" width="14" className="text-indigo-400 shrink-0" />
                    <span className="text-xs text-indigo-300">{event.changeNote}</span>
                  </div>
                )}

                {!isCancelled && event.rsvp === null && (
                  <div className="mt-3">
                    <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                      Open RSVP →
                    </a>
                  </div>
                )}
              </div>
            );
          })
        )}
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
