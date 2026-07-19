import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { WEATHER_ALERT } from "../../data/demo.js";

const CHECKLIST_ITEMS = [
  { id: "heat", label: "Heat Advisory Protocol", icon: "solar:sun-linear" },
  { id: "lightning", label: "Lightning / Thunderstorm Hold", icon: "solar:bolt-linear" },
  { id: "air", label: "Air Quality Check", icon: "solar:wind-linear" },
  { id: "closure", label: "Field Closure Confirmed", icon: "solar:close-circle-linear" },
  { id: "cancel", label: "Cancellation Issued", icon: "solar:calendar-linear" },
];

export default function Safety() {
  const [alertStatus, setAlertStatus] = useState("pending");
  const [checked, setChecked] = useState({});

  const approve = () => setAlertStatus("approved");
  const reject = () => setAlertStatus("rejected");
  const toggle = (id) => setChecked(c => ({ ...c, [id]: !c[id] }));

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Safety & Weather
        </h2>
      </div>

      {/* Alert queue */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Pending Weather Alert</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm font-semibold text-emerald-100">{WEATHER_ALERT.event}</p>
              <p className="text-xs text-emerald-500 mt-0.5">{WEATHER_ALERT.condition} · {WEATHER_ALERT.temp}</p>
            </div>
            <StatusBadge status={alertStatus === "pending" ? "pending" : alertStatus === "approved" ? "approved" : "rejected"} />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div><span className="text-emerald-500">Source:</span> <span className="text-emerald-300">{WEATHER_ALERT.source}</span></div>
            <div><span className="text-emerald-500">Freshness:</span> <span className="text-emerald-300">{WEATHER_ALERT.freshness}</span></div>
          </div>

          {/* Evidence panel */}
          <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-3 flex flex-col gap-2">
            <p className="text-xs font-semibold text-emerald-300">Evidence</p>
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <iconify-icon icon="solar:link-linear" width="14" className="text-emerald-500" />
                <span className="text-xs text-emerald-400">Primary: https://weather.gov/alert/placeholder</span>
              </div>
              <div className="flex items-center gap-2">
                <iconify-icon icon="solar:link-linear" width="14" className="text-emerald-500" />
                <span className="text-xs text-emerald-500">Fallback: Local NWS feed (cached)</span>
              </div>
            </div>
          </div>

          {alertStatus === "pending" ? (
            <div className="flex gap-2">
              <button onClick={approve} className="flex-1 px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">Approve</button>
              <button onClick={reject} className="flex-1 px-4 py-2 rounded-lg border border-red-800 text-red-400 text-sm font-medium hover:bg-red-950 transition-colors min-h-[44px]">Reject</button>
            </div>
          ) : alertStatus === "approved" ? (
            <div className="rounded-lg bg-emerald-950 border border-emerald-700 p-3 flex items-start gap-2">
              <iconify-icon icon="solar:check-circle-linear" width="16" className="text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-xs text-emerald-300">Alert approved. Queue for delivery separately in Communications.</p>
            </div>
          ) : (
            <div className="rounded-lg bg-red-950/40 border border-red-800 p-3 flex items-start gap-2">
              <iconify-icon icon="solar:close-circle-linear" width="16" className="text-red-400 shrink-0 mt-0.5" />
              <p className="text-xs text-red-300">Alert rejected. Audit record created.</p>
            </div>
          )}

          <div className="flex items-start gap-2 text-xs text-emerald-600">
            <iconify-icon icon="solar:shield-check-linear" width="14" className="shrink-0 mt-0.5" />
            <span>This decision is recorded with your administrator identity.</span>
          </div>
        </div>
      </section>

      {/* Field closure checklist */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Field Closure Checklist</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          {CHECKLIST_ITEMS.map(item => (
            <label key={item.id} className="flex items-center gap-3 p-4 cursor-pointer hover:bg-emerald-950/20 transition-colors min-h-[52px]">
              <input
                type="checkbox"
                checked={!!checked[item.id]}
                onChange={() => toggle(item.id)}
                className="w-4 h-4 rounded border-emerald-700 bg-gray-950 accent-cyan-400"
              />
              <iconify-icon icon={item.icon} width="16" className="text-emerald-500 shrink-0" />
              <span className={`text-sm ${checked[item.id] ? "line-through text-emerald-600" : "text-emerald-100"}`}>{item.label}</span>
              {checked[item.id] && <StatusBadge status="approved" label="Done" className="ml-auto" />}
            </label>
          ))}
        </div>
      </section>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
        <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-400">Safety recommendations are separate from externally delivered alerts. Approved alerts must be queued for delivery through the Communications page.</p>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
