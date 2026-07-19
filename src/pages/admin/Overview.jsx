import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { HEALTH_INDICATORS, AUDIT_EVENTS, REGISTRATIONS, INVITATIONS } from "../../data/demo.js";

export default function Overview() {
  const pendingRegs = REGISTRATIONS.filter(r => r.status === "pending").length;
  const pendingInvites = INVITATIONS.filter(i => i.status === "pending").length;

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Page header */}
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          League Overview
        </h2>
      </div>

      {/* Context bar */}
      <div className="flex items-center gap-2 text-xs text-emerald-500 font-medium">
        <iconify-icon icon="solar:buildings-linear" width="14" />
        <span>Riverside Youth Sports · Summer 2025 · Administrator</span>
      </div>

      {/* Launch blocker alert */}
      <div className="rounded-xl border border-red-800 bg-red-950/40 p-4 flex items-start gap-3">
        <iconify-icon icon="solar:warning-linear" width="20" className="text-red-400 mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-semibold text-red-300">Launch Blocker</p>
          <p className="text-sm text-red-400 mt-0.5">Valley Stars missing coach assignment. Assign a coach before the season begins.</p>
        </div>
        <a href="#" className="ml-auto text-cyan-400 hover:text-cyan-300 text-sm font-medium whitespace-nowrap">Fix →</a>
      </div>

      {/* Health indicators */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Health Indicators</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {HEALTH_INDICATORS.map(h => (
            <div key={h.label} className="rounded-xl border bg-black border-emerald-800 p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-emerald-500">{h.label}</p>
                <p className="text-sm font-semibold text-emerald-100 mt-0.5">{h.value}</p>
              </div>
              {h.status === "ok" && <iconify-icon icon="solar:check-circle-linear" width="20" className="text-emerald-400" />}
              {h.status === "warn" && <iconify-icon icon="solar:warning-linear" width="20" className="text-yellow-400" />}
              {h.status === "fail" && <iconify-icon icon="solar:close-circle-linear" width="20" className="text-red-400" />}
            </div>
          ))}
        </div>
      </section>

      {/* Pending items queue */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Pending Items</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <iconify-icon icon="solar:document-text-linear" width="18" className="text-emerald-400" />
              <span className="text-sm text-emerald-100">Registrations awaiting review</span>
            </div>
            <span className="text-sm font-bold text-cyan-400">{pendingRegs}</span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <iconify-icon icon="solar:letter-linear" width="18" className="text-emerald-400" />
              <span className="text-sm text-emerald-100">Invitations pending</span>
            </div>
            <span className="text-sm font-bold text-cyan-400">{pendingInvites}</span>
          </div>
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <iconify-icon icon="solar:users-group-rounded-linear" width="18" className="text-emerald-400" />
              <span className="text-sm text-emerald-100">Family access gaps</span>
            </div>
            <span className="text-sm font-bold text-yellow-400">2</span>
          </div>
        </div>
      </section>

      {/* Quick actions */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">
            Review Registrations
          </button>
          <button className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">
            Manage Invitations
          </button>
          <button className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">
            Check Security
          </button>
        </div>
      </section>

      {/* Recent audit events */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Recent Audit Events</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          {AUDIT_EVENTS.slice(0, 5).map(ev => (
            <div key={ev.id} className="flex items-start gap-3 p-4">
              <iconify-icon icon="solar:shield-check-linear" width="16" className="text-emerald-500 mt-0.5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-emerald-100">{ev.action}</p>
                <p className="text-xs text-emerald-500 mt-0.5">{ev.subject}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs text-emerald-600">{ev.time}</p>
                <p className="text-xs text-emerald-600">{ev.admin}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
