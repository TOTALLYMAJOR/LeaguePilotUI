import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { REGISTRATIONS } from "../../data/demo.js";

export default function Registrations() {
  const [regs, setRegs] = useState(REGISTRATIONS);

  const approve = (id) => setRegs(r => r.map(x => x.id === id ? { ...x, status: "approved", decidedBy: "Admin" } : x));
  const reject = (id) => setRegs(r => r.map(x => x.id === id ? { ...x, status: "rejected", decidedBy: "Admin" } : x));

  const pending = regs.filter(r => r.status === "pending");
  const decided = regs.filter(r => r.status !== "pending");

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Registrations
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending", value: regs.filter(r=>r.status==="pending").length, color: "text-yellow-400" },
          { label: "Approved", value: regs.filter(r=>r.status==="approved").length, color: "text-emerald-400" },
          { label: "Rejected", value: regs.filter(r=>r.status==="rejected").length, color: "text-red-400" },
          { label: "Total", value: regs.length, color: "text-emerald-100" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-black border-emerald-800 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-emerald-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pending queue */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Pending Review</h3>
        {pending.length === 0 ? (
          <div className="rounded-xl border bg-black border-emerald-800 p-8 text-center">
            <iconify-icon icon="solar:check-circle-linear" width="32" className="text-emerald-600 mb-2" />
            <p className="text-sm text-emerald-500">No pending registrations</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pending.map(reg => (
              <div key={reg.id} className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-emerald-100">{reg.parentName}</p>
                    <p className="text-xs text-emerald-500">{reg.email}</p>
                  </div>
                  <StatusBadge status={reg.status} />
                </div>
                <div className="h-px w-full bg-emerald-900" />
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-emerald-500">Child:</span> <span className="text-emerald-100">{reg.child}</span></div>
                  <div><span className="text-emerald-500">Team:</span> <span className="text-emerald-100">{reg.team}</span></div>
                  <div><span className="text-emerald-500">Season:</span> <span className="text-emerald-100">{reg.season}</span></div>
                  <div><span className="text-emerald-500">Submitted:</span> <span className="text-emerald-100">{reg.submittedAt}</span></div>
                </div>
                <div className="rounded-lg bg-emerald-950/40 border border-emerald-900 p-3 text-xs text-emerald-400">
                  <p className="font-semibold text-emerald-300 mb-1">Records created on approval:</p>
                  <ul className="list-disc list-inside space-y-0.5">
                    <li>Membership: {reg.child} → {reg.team}</li>
                    <li>Guardian link: {reg.parentName} → {reg.child}</li>
                    <li>Family access: {reg.org} / {reg.season}</li>
                  </ul>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => approve(reg.id)} className="flex-1 px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">
                    Approve
                  </button>
                  <button onClick={() => reject(reg.id)} className="flex-1 px-4 py-2 rounded-lg border border-red-800 text-red-400 text-sm font-medium hover:bg-red-950 transition-colors min-h-[44px]">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* History */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Decision History</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          {decided.map(reg => (
            <div key={reg.id} className="flex items-center justify-between p-4 gap-3">
              <div className="min-w-0">
                <p className="text-sm text-emerald-100 font-medium">{reg.parentName} — {reg.child}</p>
                <p className="text-xs text-emerald-500">{reg.team} · {reg.submittedAt}</p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
                <StatusBadge status={reg.status} />
                {reg.decidedBy && <p className="text-xs text-emerald-600">by {reg.decidedBy}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
        <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="text-xs text-emerald-400">Each decision is recorded with your administrator identity.</p>
          <p className="text-xs text-emerald-500">Cannot register into archived teams.</p>
        </div>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
