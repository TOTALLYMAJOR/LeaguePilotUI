import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { EVENTS } from "../../data/demo.js";

const LENSES = ["Time", "Location", "Status"];

export default function Schedule() {
  const [selected, setSelected] = useState(EVENTS[0]);
  const [lens, setLens] = useState("Time");
  const [queued, setQueued] = useState(false);
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newStatus, setNewStatus] = useState("confirmed");

  const handleQueue = () => { setQueued(true); setTimeout(() => setQueued(false), 4000); };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Schedule & Venues
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* League calendar */}
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">All Events</h3>
          <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
            {EVENTS.map(ev => (
              <button
                key={ev.id}
                onClick={() => { setSelected(ev); setQueued(false); }}
                className={`w-full text-left p-4 flex items-start gap-3 transition-colors min-h-[64px] ${selected?.id === ev.id ? "bg-emerald-950/60" : "hover:bg-emerald-950/30"}`}
              >
                <span className="text-lg">{ev.emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-emerald-100 truncate">{ev.title}</p>
                  <p className="text-xs text-emerald-500 mt-0.5">{ev.date} · {ev.time}</p>
                  <p className="text-xs text-emerald-600">{ev.location}</p>
                </div>
                <StatusBadge status={ev.status} />
              </button>
            ))}
          </div>
        </section>

        {/* Event detail panel */}
        {selected && (
          <section className="flex flex-col gap-3">
            <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Event Detail</h3>
            <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-4">
              <div>
                <p className="text-base font-semibold text-emerald-100">{selected.title}</p>
                <p className="text-xs text-emerald-500 mt-1">{selected.date} · {selected.time} – {selected.endTime}</p>
                <p className="text-xs text-emerald-500">{selected.location} · {selected.address}</p>
                <div className="mt-2"><StatusBadge status={selected.status} /></div>
              </div>

              <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-3 text-xs text-emerald-400">
                <span className="font-semibold text-emerald-300">Affected families:</span> 8 confirmed RSVPs
              </div>

              <div className="h-px w-full bg-emerald-900" />

              {/* Change lens tabs */}
              <div>
                <p className="text-xs text-emerald-500 mb-2 font-semibold">Change Lens</p>
                <div className="flex gap-1 rounded-lg bg-gray-950 p-1 border border-emerald-900">
                  {LENSES.map(l => (
                    <button
                      key={l}
                      onClick={() => setLens(l)}
                      className={`flex-1 py-1.5 rounded text-xs font-semibold transition-colors min-h-[36px] ${lens === l ? "bg-emerald-800 text-emerald-100" : "text-emerald-500 hover:text-emerald-300"}`}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>

              {lens === "Time" && (
                <div className="flex flex-col gap-2">
                  <input type="date" value={newDate} onChange={e => setNewDate(e.target.value)} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500" />
                  <input type="time" value={newTime} onChange={e => setNewTime(e.target.value)} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500" />
                </div>
              )}
              {lens === "Location" && (
                <div className="flex flex-col gap-2">
                  <input value={newLocation} onChange={e => setNewLocation(e.target.value)} placeholder="Location name" className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-cyan-500" />
                  <input value={newAddress} onChange={e => setNewAddress(e.target.value)} placeholder="Address" className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-cyan-500" />
                </div>
              )}
              {lens === "Status" && (
                <select value={newStatus} onChange={e => setNewStatus(e.target.value)} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500">
                  <option value="confirmed">Confirmed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="changed">Changed</option>
                </select>
              )}

              {/* Preview */}
              <div className="rounded-lg bg-indigo-950/30 border border-indigo-800 p-3 text-xs text-indigo-300">
                8 confirmed RSVPs will be marked &apos;needs review&apos; when this change record is queued.
              </div>

              {queued ? (
                <div className="rounded-lg bg-emerald-950 border border-emerald-700 p-3 flex items-center gap-2">
                  <iconify-icon icon="solar:check-circle-linear" width="16" className="text-emerald-400" />
                  <p className="text-xs text-emerald-300">Record queued. Not yet delivered to families.</p>
                </div>
              ) : (
                <button onClick={handleQueue} className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">
                  Queue Change Record
                </button>
              )}
            </div>
          </section>
        )}
      </div>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
        <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-400">Review records are separate from delivered family alerts. Queue a change record first, then approve a notification separately.</p>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
