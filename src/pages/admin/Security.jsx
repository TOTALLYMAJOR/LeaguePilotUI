import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { SECURITY_CHECKS, AUDIT_EVENTS } from "../../data/demo.js";

const PROVIDER_STATUS = [
  { name: "Email", status: "disconnected", note: "Not configured" },
  { name: "Push", status: "active", note: "Connected" },
  { name: "SMS", status: "disconnected", note: "Not configured" },
];

export default function Security() {
  const [expandedCheck, setExpandedCheck] = useState(null);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Security & Audit
        </h2>
      </div>

      {/* Security checks grid */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Security Checks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SECURITY_CHECKS.map(check => (
            <button
              key={check.id}
              onClick={() => setExpandedCheck(expandedCheck === check.id ? null : check.id)}
              className={`rounded-xl border p-4 text-left flex flex-col gap-2 transition-colors min-h-[72px] ${
                check.status === "fail"
                  ? "bg-red-950/30 border-red-800"
                  : check.status === "warn"
                  ? "bg-yellow-950/20 border-yellow-800"
                  : "bg-black border-emerald-800 hover:bg-emerald-950/20"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  {check.status === "pass" && <iconify-icon icon="solar:check-circle-linear" width="16" className="text-emerald-400 shrink-0" />}
                  {check.status === "warn" && <iconify-icon icon="solar:warning-linear" width="16" className="text-yellow-400 shrink-0" />}
                  {check.status === "fail" && <iconify-icon icon="solar:close-circle-linear" width="16" className="text-red-400 shrink-0" />}
                  <span className={`text-sm font-medium ${check.status === "fail" ? "text-red-200" : check.status === "warn" ? "text-yellow-200" : "text-emerald-100"}`}>
                    {check.label}
                  </span>
                </div>
                <StatusBadge status={check.status} />
              </div>
              {expandedCheck === check.id && check.note && (
                <p className={`text-xs mt-1 ${check.status === "fail" ? "text-red-400" : "text-yellow-400"}`}>{check.note}</p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Role & membership boundaries */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Role & Membership Boundaries</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          {[
            { role: "Parent", boundary: "Own children's data only. No cross-family access." },
            { role: "Coach", boundary: "Team roster and events. No financial or admin data." },
            { role: "Admin", boundary: "Full org scope. Cannot cross tenant boundaries." },
          ].map(r => (
            <div key={r.role} className="flex items-start gap-3 p-4">
              <iconify-icon icon="solar:shield-check-linear" width="16" className="text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-emerald-100">{r.role}</p>
                <p className="text-xs text-emerald-500 mt-0.5">{r.boundary}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tenant isolation */}
      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-center gap-3">
        <iconify-icon icon="solar:check-circle-linear" width="18" className="text-emerald-400 shrink-0" />
        <p className="text-sm text-emerald-300">Tenant isolation verified <span className="text-emerald-400 font-semibold">✓</span> — Riverside Youth Sports data is fully scoped.</p>
      </div>

      {/* Provider readiness */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Provider Readiness</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          {PROVIDER_STATUS.map(p => (
            <div key={p.name} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {p.status === "active"
                  ? <iconify-icon icon="solar:check-circle-linear" width="16" className="text-emerald-400" />
                  : <iconify-icon icon="solar:warning-linear" width="16" className="text-orange-400" />}
                <span className="text-sm text-emerald-100">{p.name} provider</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs text-emerald-500">{p.note}</span>
                <StatusBadge status={p.status} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Audit events */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Recent Audit Events</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          {AUDIT_EVENTS.map(ev => (
            <div key={ev.id} className="flex items-start gap-3 p-4">
              <iconify-icon icon="solar:document-text-linear" width="16" className="text-emerald-500 shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-emerald-100">{ev.action}</p>
                <p className="text-xs text-emerald-500 mt-0.5">{ev.subject}</p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-xs text-emerald-600">{ev.time}</p>
                <p className="text-xs text-emerald-600">{ev.admin}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
        <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-400">Security diagnostics are not shown in normal parent or coach interfaces.</p>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
