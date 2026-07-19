import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { EVENTS, ATTENDANCE_SUMMARY } from "../../data/demo.js";

const TABS = ["Now", "Next", "Later"];
const EVENT_GROUPS = {
  Now: [EVENTS[0]],
  Next: [EVENTS[1], EVENTS[2]],
  Later: [EVENTS[3], EVENTS[4]],
};

export default function CoachCalendar() {
  const [activeTab, setActiveTab] = useState("Now");
  const [selectedEvent, setSelectedEvent] = useState(EVENTS[0]);
  const [showChangeForm, setShowChangeForm] = useState(false);
  const [changeData, setChangeData] = useState({ time: "", location: "", status: "confirmed" });
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setShowChangeForm(false);
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Coach Calendar
        </h2>
      </div>

      {/* Tab switcher */}
      <div className="flex gap-2">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
              activeTab === tab
                ? "bg-cyan-400 text-black"
                : "border border-emerald-800 text-emerald-100 hover:bg-emerald-950"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Event list */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">{activeTab} Events</p>
          {EVENT_GROUPS[activeTab].map(event => (
            <button
              key={event.id}
              onClick={() => { setSelectedEvent(event); setSaved(false); setShowChangeForm(false); }}
              className={`w-full text-left rounded-xl border p-4 transition-colors min-h-[44px] ${
                selectedEvent?.id === event.id
                  ? "bg-emerald-950/60 border-cyan-700"
                  : "bg-black border-emerald-800 hover:bg-emerald-950"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-emerald-100 font-semibold">{event.title}</p>
                  <p className="text-emerald-400 text-sm mt-0.5">{event.date} · {event.time}</p>
                  <p className="text-emerald-500 text-xs">{event.location}</p>
                </div>
                <StatusBadge status={event.status} />
              </div>
              {event.changed && (
                <p className="text-xs text-indigo-300 mt-2 flex items-center gap-1">
                  <iconify-icon icon="solar:info-circle-linear" width="13" />
                  {event.changeNote}
                </p>
              )}
            </button>
          ))}
        </div>

        {/* Event detail panel */}
        {selectedEvent && (
          <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-emerald-800 flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Event Details</p>
              <p className="text-emerald-100 font-semibold text-lg">{selectedEvent.title}</p>
              <p className="text-emerald-400 text-sm mt-1">{selectedEvent.date} · {selectedEvent.time}–{selectedEvent.endTime}</p>
              <p className="text-emerald-400 text-sm">Arrive by {selectedEvent.arrivalTime}</p>
              <p className="text-emerald-400 text-sm">{selectedEvent.location} — {selectedEvent.address}</p>
            </div>

            <div className="h-px w-full bg-emerald-900" />

            {/* Readiness indicators */}
            <div>
              <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Readiness</p>
              <div className="grid grid-cols-2 gap-2">
                <div className="bg-emerald-950/40 rounded-lg px-3 py-2 text-sm">
                  <p className="text-emerald-500 text-xs">Attendance</p>
                  <p className="text-emerald-100 font-medium">{ATTENDANCE_SUMMARY.going}/{ATTENDANCE_SUMMARY.total} going</p>
                </div>
                <div className="bg-emerald-950/40 rounded-lg px-3 py-2 text-sm">
                  <p className="text-emerald-500 text-xs">Weather</p>
                  <p className="text-emerald-100 font-medium">{selectedEvent.weather}</p>
                </div>
                <div className="bg-emerald-950/40 rounded-lg px-3 py-2 text-sm">
                  <p className="text-emerald-500 text-xs">Snacks</p>
                  <p className={selectedEvent.snackOpen ? "text-yellow-300 font-medium" : "text-emerald-300 font-medium"}>
                    {selectedEvent.snackOpen ? "Open slot" : "Covered"}
                  </p>
                </div>
                <div className="bg-emerald-950/40 rounded-lg px-3 py-2 text-sm">
                  <p className="text-emerald-500 text-xs">Volunteers</p>
                  <p className={selectedEvent.volunteerOpen ? "text-yellow-300 font-medium" : "text-emerald-300 font-medium"}>
                    {selectedEvent.volunteerOpen ? "Open slot" : "Covered"}
                  </p>
                </div>
              </div>
            </div>

            <div className="h-px w-full bg-emerald-900" />

            {/* Propose Change */}
            {!showChangeForm && !saved && (
              <button
                onClick={() => setShowChangeForm(true)}
                className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]"
              >
                Propose Change
              </button>
            )}

            {showChangeForm && (
              <div className="flex flex-col gap-3">
                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Propose Change</p>
                <div>
                  <label className="text-xs text-emerald-400 mb-1 block">New Time (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. 10:00 AM"
                    value={changeData.time}
                    onChange={e => setChangeData(p => ({ ...p, time: e.target.value }))}
                    className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-400 mb-1 block">New Location (optional)</label>
                  <input
                    type="text"
                    placeholder="e.g. South A Field"
                    value={changeData.location}
                    onChange={e => setChangeData(p => ({ ...p, location: e.target.value }))}
                    className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600"
                  />
                </div>
                <div>
                  <label className="text-xs text-emerald-400 mb-1 block">Status</label>
                  <select
                    value={changeData.status}
                    onChange={e => setChangeData(p => ({ ...p, status: e.target.value }))}
                    className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600"
                  >
                    <option value="confirmed">Confirmed</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="changed">Changed</option>
                  </select>
                </div>
                <div className="bg-indigo-950/40 border border-indigo-800 rounded-lg px-3 py-2 text-xs text-indigo-300">
                  This change will affect <span className="font-semibold">12 families</span>. A notification record will be created but not delivered until approved.
                </div>
                <div className="flex gap-2">
                  <button onClick={handleSave} className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">
                    Save Change Record
                  </button>
                  <button onClick={() => setShowChangeForm(false)} className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">
                    Cancel
                  </button>
                </div>
              </div>
            )}

            {saved && (
              <div className="bg-emerald-950/40 border border-emerald-700 rounded-lg px-3 py-3 text-sm text-emerald-300 flex items-start gap-2">
                <iconify-icon icon="solar:check-circle-linear" width="16" class="mt-0.5 text-emerald-400" />
                <span>Saved as record (not yet delivered to families). Submit to admin to queue notification.</span>
              </div>
            )}
          </div>
        )}
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
