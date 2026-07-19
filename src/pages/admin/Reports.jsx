import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";

const EXPORT_TYPES = [
  { label: "Roster", icon: "solar:users-group-rounded-linear", desc: "All players with jersey numbers and status" },
  { label: "Contacts", icon: "solar:letter-linear", desc: "Guardian contact info — admin scoped" },
  { label: "Schedule", icon: "solar:calendar-linear", desc: "All events with dates, locations, statuses" },
  { label: "RSVPs", icon: "solar:check-circle-linear", desc: "RSVP responses per event" },
  { label: "Snacks & Volunteers", icon: "solar:hand-stars-linear", desc: "Volunteer signups and snack assignments" },
  { label: "Sponsors", icon: "solar:wallet-linear", desc: "Sponsor placements and expiry dates" },
  { label: "Notifications", icon: "solar:bell-linear", desc: "Communication log with statuses" },
];

const ARCHIVE_CHECKLIST = [
  { label: "All rosters finalized", done: true },
  { label: "Schedule published and closed", done: true },
  { label: "All RSVPs recorded", done: true },
  { label: "Volunteer records complete", done: true },
  { label: "Sponsor records archived", done: true },
  { label: "Audit log reviewed", done: true },
];

export default function Reports() {
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [archived, setArchived] = useState(false);

  const doArchive = () => { setArchived(true); setShowArchiveConfirm(false); };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Reports & Archive
        </h2>
      </div>

      {/* Export options */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Export Options — Summer 2025</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {EXPORT_TYPES.map(ex => (
            <div key={ex.label} className="rounded-xl border bg-black border-emerald-800 p-4 flex items-center gap-4">
              <iconify-icon icon={ex.icon} width="22" className="text-emerald-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-100">{ex.label}</p>
                <p className="text-xs text-emerald-500 mt-0.5">{ex.desc}</p>
              </div>
              <button className="px-3 py-1.5 rounded-lg border border-emerald-800 text-emerald-100 text-xs font-medium hover:bg-emerald-950 transition-colors min-h-[36px] shrink-0">
                Export CSV
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Archive readiness */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Archive Readiness — Summer 2025</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-emerald-100">Summer 2025</p>
              <p className="text-xs text-emerald-500 mt-0.5">Riverside Youth Sports</p>
            </div>
            <StatusBadge status="active" />
          </div>

          <div className="divide-y divide-emerald-900">
            {ARCHIVE_CHECKLIST.map(item => (
              <div key={item.label} className="flex items-center gap-3 py-2.5">
                <iconify-icon
                  icon={item.done ? "solar:check-circle-linear" : "solar:close-circle-linear"}
                  width="16"
                  className={item.done ? "text-emerald-400" : "text-red-400"}
                />
                <span className={`text-sm ${item.done ? "text-emerald-300" : "text-red-300"}`}>{item.label}</span>
                {item.done && <StatusBadge status="pass" label="✓" className="ml-auto" />}
              </div>
            ))}
          </div>

          <div className="rounded-lg bg-red-950/30 border border-red-800 p-3 text-xs text-red-300">
            ⚠ This action preserves records as read-only and cannot be undone without admin intervention.
          </div>

          <p className="text-xs text-emerald-600">Chat retention policy: messages retained for 90 days after season close, then purged.</p>

          {!archived ? (
            !showArchiveConfirm ? (
              <button onClick={() => setShowArchiveConfirm(true)} className="px-4 py-2 rounded-lg border border-red-800 text-red-400 text-sm font-medium hover:bg-red-950 transition-colors min-h-[44px]">
                Close Season…
              </button>
            ) : (
              <div className="flex flex-col gap-2">
                <p className="text-sm text-red-300 font-semibold">Are you sure? This cannot be undone.</p>
                <div className="flex gap-2">
                  <button onClick={doArchive} className="px-4 py-2 rounded-lg bg-red-700 text-white text-sm font-semibold hover:bg-red-600 transition-colors min-h-[44px]">Yes, Close Season</button>
                  <button onClick={() => setShowArchiveConfirm(false)} className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">Cancel</button>
                </div>
              </div>
            )
          ) : (
            <div className="rounded-lg bg-gray-900 border border-gray-700 p-3 flex items-center gap-2">
              <iconify-icon icon="solar:check-circle-linear" width="16" className="text-gray-400" />
              <p className="text-xs text-gray-400">Season closed. Records are now read-only.</p>
            </div>
          )}
        </div>
      </section>

      {/* Archived seasons */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Archived Seasons</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm text-emerald-100 font-medium">Spring 2025</p>
              <p className="text-xs text-emerald-500">Riverside Youth Sports · Closed May 30, 2025</p>
            </div>
            <StatusBadge status="read-only" label="Read-only" />
          </div>
        </div>
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
