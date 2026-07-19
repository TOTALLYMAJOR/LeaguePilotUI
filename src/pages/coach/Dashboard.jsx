import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { EVENTS, ATTENDANCE_SUMMARY, COACH_DRAFTS, VOLUNTEERS, WEATHER_ALERT } from "../../data/demo.js";

export default function CoachDashboard() {
  const nextEvent = EVENTS[0];
  const openVolunteerRoles = VOLUNTEERS.flatMap(v => v.roles.filter(r => r.status === "open"));

  const total = ATTENDANCE_SUMMARY.total;
  const goingPct = Math.round((ATTENDANCE_SUMMARY.going / total) * 100);

  return (
    <div className="flex flex-col gap-6 pb-8">
      {/* Page header */}
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Sideline Board
        </h2>
      </div>

      {/* Next 15 Minutes attention card */}
      <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-yellow-700">
        <div className="flex items-start gap-3">
          <iconify-icon icon="solar:bell-linear" width="22" class="text-yellow-400 mt-0.5" />
          <div className="flex flex-col gap-1">
            <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Next 15 Minutes</p>
            <p className="text-emerald-100 font-semibold">{nextEvent.title}</p>
            <ul className="mt-1 flex flex-col gap-1">
              <li className="text-sm text-yellow-300 flex items-center gap-2">
                <iconify-icon icon="solar:warning-linear" width="16" />
                1 late RSVP change — Aiden Chen changed to Not Going
              </li>
              <li className="text-sm text-yellow-300 flex items-center gap-2">
                <iconify-icon icon="solar:warning-linear" width="16" />
                Snack volunteer slot still open for Valley Stars game
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Attendance summary */}
      <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-emerald-800">
        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-3">Attendance — {ATTENDANCE_SUMMARY.eventTitle}</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
          <div className="flex flex-col items-center bg-emerald-950/50 rounded-lg p-3">
            <span className="text-2xl font-bold text-emerald-300">{ATTENDANCE_SUMMARY.going}</span>
            <span className="text-xs text-emerald-500 mt-1">Going</span>
          </div>
          <div className="flex flex-col items-center bg-yellow-950/50 rounded-lg p-3">
            <span className="text-2xl font-bold text-yellow-300">{ATTENDANCE_SUMMARY.maybe}</span>
            <span className="text-xs text-yellow-500 mt-1">Maybe</span>
          </div>
          <div className="flex flex-col items-center bg-red-950/50 rounded-lg p-3">
            <span className="text-2xl font-bold text-red-300">{ATTENDANCE_SUMMARY.notGoing}</span>
            <span className="text-xs text-red-500 mt-1">Not Going</span>
          </div>
          <div className="flex flex-col items-center bg-gray-900/80 rounded-lg p-3">
            <span className="text-2xl font-bold text-gray-300">{ATTENDANCE_SUMMARY.noResponse}</span>
            <span className="text-xs text-gray-500 mt-1">No Response</span>
          </div>
        </div>
        <div className="w-full bg-emerald-950 rounded-full h-2">
          <div className="bg-emerald-400 h-2 rounded-full transition-all" style={{ width: `${goingPct}%` }} />
        </div>
        <p className="text-xs text-emerald-500 mt-1">{goingPct}% confirmed going</p>
      </div>

      {/* Next event card */}
      <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-emerald-800">
        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-3">Next Event</p>
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-emerald-100 font-semibold text-lg">{nextEvent.title}</p>
            <p className="text-emerald-400 text-sm mt-1">{nextEvent.date} · {nextEvent.time}</p>
            <p className="text-emerald-400 text-sm">{nextEvent.location}</p>
            <p className="text-emerald-500 text-xs mt-1">{nextEvent.weather}</p>
          </div>
          <StatusBadge status={nextEvent.status} />
        </div>
        {nextEvent.changed && (
          <div className="mt-3 flex items-center gap-2 text-xs text-indigo-300 bg-indigo-950/50 rounded-lg px-3 py-2">
            <iconify-icon icon="solar:info-circle-linear" width="14" />
            {nextEvent.changeNote} · {nextEvent.changeTime}
          </div>
        )}
        {nextEvent.coachNote && (
          <div className="mt-3 text-sm text-emerald-300 bg-emerald-950/30 rounded-lg px-3 py-2">
            <span className="font-medium text-emerald-400">Coach note: </span>{nextEvent.coachNote}
          </div>
        )}
      </div>

      {/* Snack & Volunteer gaps */}
      <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-emerald-800">
        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-3">Snack &amp; Volunteer Gaps</p>
        {openVolunteerRoles.length === 0 ? (
          <div className="flex items-center gap-2 text-emerald-500 text-sm">
            <iconify-icon icon="solar:check-circle-linear" width="18" />
            All roles filled — no gaps!
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {openVolunteerRoles.map(role => (
              <div key={role.id} className="flex items-center justify-between gap-2 bg-cyan-950/30 rounded-lg px-3 py-2">
                <div>
                  <p className="text-sm text-emerald-100 font-medium">{role.title}</p>
                  <p className="text-xs text-emerald-500">{role.description}</p>
                </div>
                <StatusBadge status="open" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Unfinished drafts */}
      <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-emerald-800">
        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-3">Unfinished Drafts</p>
        <div className="flex flex-col gap-2">
          {COACH_DRAFTS.map(draft => (
            <div key={draft.id} className="flex items-center justify-between gap-2 rounded-lg px-3 py-2 hover:bg-emerald-950/40 transition-colors">
              <div>
                <p className="text-sm text-emerald-100 font-medium">{draft.title}</p>
                <p className="text-xs text-emerald-500">{draft.type} · {draft.updatedAt}</p>
              </div>
              <StatusBadge status={draft.status.toLowerCase()} />
            </div>
          ))}
        </div>
      </div>

      {/* Parent Replay status */}
      <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-emerald-800">
        <div className="flex items-center justify-between mb-2">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Parent Replay Status</p>
          <StatusBadge status="draft" label="Draft" />
        </div>
        <p className="text-sm text-emerald-300">Thursday Practice Replay is in draft — finish and submit for approval to notify families.</p>
        <button className="mt-3 px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">
          Open Replay Draft
        </button>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
