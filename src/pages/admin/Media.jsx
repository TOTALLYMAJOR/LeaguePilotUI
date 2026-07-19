import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { DRILL_VIDEOS, PHOTOS } from "../../data/demo.js";

export default function Media() {
  const [reportedAction, setReportedAction] = useState(null);
  const [visibility, setVisibility] = useState("team");
  const [videos, setVideos] = useState(DRILL_VIDEOS);
  const [mfk, setMfk] = useState({});

  const approveVideo = (id) => setVideos(v => v.map(x => x.id === id ? { ...x, status: "approved" } : x));
  const rejectVideo = (id) => setVideos(v => v.map(x => x.id === id ? { ...x, status: "rejected" } : x));

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Media Review
        </h2>
      </div>

      {/* Reported media queue */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Reported / Hidden Media</h3>
        {reportedAction ? (
          <div className="rounded-xl border bg-black border-emerald-800 p-6 text-center">
            <iconify-icon icon="solar:check-circle-linear" width="28" className="text-emerald-500 mb-2" />
            <p className="text-sm text-emerald-400">Item <span className="font-semibold text-emerald-100">{reportedAction}</span> — audit record created.</p>
          </div>
        ) : (
          <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-4">
            <div className="flex items-start gap-4">
              <img
                src={PHOTOS[0].url}
                alt="Reported"
                className="w-24 h-20 object-cover rounded-lg border border-emerald-900 shrink-0"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-emerald-100">{PHOTOS[0].caption}</p>
                <p className="text-xs text-emerald-500 mt-0.5">Uploaded by {PHOTOS[0].uploadedBy} · {PHOTOS[0].date}</p>
                <div className="mt-1 flex items-center gap-2">
                  <iconify-icon icon="solar:warning-linear" width="14" className="text-red-400" />
                  <span className="text-xs text-red-300">Report reason: Inappropriate content flag</span>
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs text-emerald-500 block mb-1">Visibility scope</label>
              <select value={visibility} onChange={e => setVisibility(e.target.value)} className="bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500">
                <option value="team">Team</option>
                <option value="organization">Organization</option>
              </select>
            </div>

            <div className="flex gap-2 flex-wrap">
              <button onClick={() => setReportedAction("Approved")} className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">Approve</button>
              <button onClick={() => setReportedAction("Hidden")} className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">Hide</button>
              <button onClick={() => setReportedAction("Removed")} className="px-4 py-2 rounded-lg border border-red-800 text-red-400 text-sm font-medium hover:bg-red-950 transition-colors min-h-[44px]">Remove</button>
            </div>
            <p className="text-xs text-emerald-600">Sensitive actions (Hide / Remove) are audit-recorded.</p>
          </div>
        )}
      </section>

      {/* Drill videos */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Submitted Drill Videos</h3>
        <div className="flex flex-col gap-3">
          {videos.map(v => (
            <div key={v.id} className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-emerald-100">{v.title}</p>
                  <a href={v.url} target="_blank" rel="noopener noreferrer" className="text-xs text-cyan-400 hover:text-cyan-300 truncate block">{v.url}</a>
                  {v.assignedTo && <p className="text-xs text-emerald-500 mt-0.5">Assigned to: {v.assignedTo}</p>}
                </div>
                <StatusBadge status={v.status === "awaiting-review" ? "awaiting approval" : v.status} label={v.status === "awaiting-review" ? "Awaiting Review" : undefined} />
              </div>

              {v.status === "awaiting-review" && (
                <div className="flex flex-col gap-2">
                  <div className="rounded-lg bg-yellow-950/30 border border-yellow-800 p-3 text-xs text-yellow-300 flex flex-col gap-1.5">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" checked={!!mfk[v.id]} onChange={() => setMfk(m => ({ ...m, [v.id]: !m[v.id] }))} className="accent-cyan-400" />
                      <span>Made-for-Kids (COPPA) confirmed</span>
                    </label>
                    <p className="text-yellow-400">Embeddable: check YouTube privacy settings</p>
                    <p className="text-yellow-400">Source channel allowlist: <span className="font-semibold">Not verified</span></p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => approveVideo(v.id)} className="flex-1 px-3 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[40px]">Approve</button>
                    <button onClick={() => rejectVideo(v.id)} className="flex-1 px-3 py-2 rounded-lg border border-red-800 text-red-400 text-sm font-medium hover:bg-red-950 transition-colors min-h-[40px]">Reject</button>
                  </div>
                </div>
              )}

              {v.status === "approved" && (
                <div className="rounded-lg bg-emerald-950/30 border border-emerald-800 p-2 text-xs text-emerald-400 flex items-center gap-2">
                  <iconify-icon icon="solar:check-circle-linear" width="14" />
                  Approved — available to coaches
                </div>
              )}

              {v.status === "rejected" && (
                <div className="rounded-lg bg-red-950/30 border border-red-800 p-2 text-xs text-red-400 flex items-center gap-2">
                  <iconify-icon icon="solar:close-circle-linear" width="14" />
                  Rejected — not visible to coaches or parents
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
        <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-400">Coach-only media requires another review cycle before becoming parent-facing.</p>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
