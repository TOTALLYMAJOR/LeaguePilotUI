import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";

const GAPS = [
  { id: "g1", parent: "Kevin Taylor", child: "Mia Taylor", jersey: "#2", issue: "link missing", parentStatus: "active" },
  { id: "g2", parent: "Brian Lee", child: "Olivia Lee", jersey: "#22", issue: "link unverified", parentStatus: "pending" },
];
const COMPLETED = [
  { id: "c1", parent: "Maria Torres", child: "Liam Torres", jersey: "#12", resolvedAt: "2 days ago" },
  { id: "c2", parent: "Sarah Mitchell", child: "Jake Mitchell", jersey: "#7", resolvedAt: "1 week ago" },
];

export default function FamilyAccess() {
  const [gaps, setGaps] = useState(GAPS);
  const [decisions, setDecisions] = useState({});

  const decide = (id, action) => {
    setDecisions(d => ({ ...d, [id]: action }));
    setGaps(g => g.filter(x => x.id !== id));
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Family Access
        </h2>
      </div>

      <p className="text-sm text-emerald-400">Review guardian-child links and access disputes.</p>

      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Pending Access Gaps</h3>
        {gaps.length === 0 ? (
          <div className="rounded-xl border bg-black border-emerald-800 p-8 text-center">
            <iconify-icon icon="solar:check-circle-linear" width="32" className="text-emerald-600 mb-2" />
            <p className="text-sm text-emerald-500">All family access gaps resolved</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {gaps.map(g => (
              <div key={g.id} className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-emerald-100">{g.parent} — {g.child} (jersey {g.jersey})</p>
                    <p className="text-xs text-emerald-500 mt-0.5 capitalize">Issue: {g.issue}</p>
                  </div>
                  <StatusBadge status="pending" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-emerald-500">Parent profile:</span> <StatusBadge status={g.parentStatus} className="ml-1" /></div>
                  <div><span className="text-emerald-500">Evidence:</span> <span className="text-emerald-400">Placeholder — upload required</span></div>
                </div>
                <div className="rounded-lg bg-emerald-950/40 border border-emerald-900 p-3 text-xs text-emerald-400">
                  Supporting evidence required before approval. Social login identity alone is not sufficient.
                </div>
                <div className="flex gap-2">
                  <button onClick={() => decide(g.id, "approved")} className="flex-1 px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">
                    Approve Link
                  </button>
                  <button onClick={() => decide(g.id, "rejected")} className="flex-1 px-4 py-2 rounded-lg border border-red-800 text-red-400 text-sm font-medium hover:bg-red-950 transition-colors min-h-[44px]">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {Object.keys(decisions).length > 0 && (
        <section className="flex flex-col gap-2">
          <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Just Decided</h3>
          <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
            {GAPS.filter(g => decisions[g.id]).map(g => (
              <div key={g.id} className="flex items-center justify-between p-4">
                <span className="text-sm text-emerald-100">{g.parent} — {g.child}</span>
                <StatusBadge status={decisions[g.id]} />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Completed Links</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          {COMPLETED.map(c => (
            <div key={c.id} className="flex items-center justify-between p-4">
              <div>
                <p className="text-sm text-emerald-100">{c.parent} — {c.child} (jersey {c.jersey})</p>
                <p className="text-xs text-emerald-500">Resolved {c.resolvedAt}</p>
              </div>
              <StatusBadge status="approved" />
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-400">Social login identity alone is not sufficient to grant access. Supporting evidence is required.</p>
        </div>
        <div className="flex items-start gap-3">
          <iconify-icon icon="solar:shield-check-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-400">Each access decision is recorded with your administrator identity.</p>
        </div>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
