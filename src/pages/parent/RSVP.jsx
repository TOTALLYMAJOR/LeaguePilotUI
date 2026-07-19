import { useState } from "react";
import { EVENTS } from "../../data/demo.js";
import StatusBadge from "../../components/StatusBadge.jsx";

const eligible = EVENTS.filter((e) => e.type === "game" || e.type === "practice").slice(0, 3);

const OPTIONS = [
  { value: "going", label: "Going", icon: "solar:check-circle-linear" },
  { value: "maybe", label: "Maybe", icon: "solar:question-circle-linear" },
  { value: "not-going", label: "Not Going", icon: "solar:close-circle-linear" },
];

export default function RSVP() {
  const [responses, setResponses] = useState({ e1: "going", e2: null, e3: null });
  const [notes, setNotes] = useState({});
  const [saved, setSaved] = useState({});

  function handleSave(id) {
    setSaved((s) => ({ ...s, [id]: true }));
    setTimeout(() => setSaved((s) => ({ ...s, [id]: false })), 2500);
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2
          className="text-2xl font-semibold tracking-tight text-emerald-100"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          RSVP
        </h2>
      </div>

      <p className="text-sm text-emerald-400">
        <iconify-icon icon="solar:users-group-rounded-linear" width="16" className="mr-1" />
        Responding for <span className="text-emerald-100 font-semibold">Jake Mitchell</span>
      </p>

      <section className="flex flex-col gap-4">
        {eligible.map((event) => (
          <div key={event.id} className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <span className="text-2xl">{event.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-emerald-100 font-semibold text-sm">{event.title}</span>
                  <StatusBadge status={event.status} label={event.statusLabel} />
                </div>
                <p className="text-sm text-emerald-400 mt-0.5">
                  {event.date} · {event.time}
                </p>
                <p className="text-sm text-emerald-500">{event.location}</p>
              </div>
            </div>

            {/* RSVP radio group */}
            <div className="flex gap-2 flex-wrap">
              {OPTIONS.map((opt) => {
                const selected = responses[event.id] === opt.value;
                return (
                  <button
                    key={opt.value}
                    onClick={() => setResponses((r) => ({ ...r, [event.id]: opt.value }))}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border text-sm font-medium min-h-[44px] transition-colors ${
                      selected
                        ? "bg-cyan-400 border-cyan-400 text-black"
                        : "border-emerald-800 text-emerald-300 hover:bg-emerald-950"
                    }`}
                  >
                    <iconify-icon icon={opt.icon} width="16" />
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {/* Optional note */}
            <textarea
              rows={2}
              placeholder="Optional note for the coach…"
              value={notes[event.id] || ""}
              onChange={(e) => setNotes((n) => ({ ...n, [event.id]: e.target.value }))}
              className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-emerald-600 resize-none"
            />

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleSave(event.id)}
                className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]"
              >
                Save Response
              </button>
              {saved[event.id] && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                  <iconify-icon icon="solar:check-circle-linear" width="16" />
                  Saved!
                </span>
              )}
            </div>
          </div>
        ))}
      </section>

      <div className="flex items-center gap-2 rounded-xl border bg-black border-emerald-800 px-4 py-3">
        <iconify-icon icon="solar:shield-check-linear" width="16" className="text-emerald-600 shrink-0" />
        <p className="text-xs text-emerald-600">Your responses are private to the team and coaching staff only.</p>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
