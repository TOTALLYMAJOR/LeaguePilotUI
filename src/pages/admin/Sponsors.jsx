import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { SPONSORS } from "../../data/demo.js";

export default function Sponsors() {
  const [sponsors, setSponsors] = useState(SPONSORS);
  const [editing, setEditing] = useState(null);
  const [logoUrl, setLogoUrl] = useState("");
  const [form, setForm] = useState({ name: "", placement: "Team Portal Header", expiry: "" });

  const expireSponsor = (id) => setSponsors(s => s.map(x => x.id === id ? { ...x, status: "expired" } : x));
  const removeSponsor = (id) => setSponsors(s => s.filter(x => x.id !== id));
  const addSponsor = () => {
    if (!form.name) return;
    setSponsors(s => [...s, { id: `s${Date.now()}`, name: form.name, logo: null, placement: form.placement, status: "active", expires: form.expiry || "TBD" }]);
    setForm({ name: "", placement: "Team Portal Header", expiry: "" });
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Sponsors & Finance
        </h2>
      </div>

      {/* Finance summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { label: "Total Receivables", value: "$180", sub: "3 families", color: "text-yellow-400" },
          { label: "Scholarship Applied", value: "$20", sub: "1 recipient", color: "text-emerald-400" },
          { label: "Renewal Risk", value: "1 sponsor", sub: "expires soon", color: "text-orange-400" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-black border-emerald-800 p-4">
            <p className="text-xs text-emerald-500">{s.label}</p>
            <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            <p className="text-xs text-emerald-600 mt-0.5">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-indigo-950/30 border border-indigo-800 p-3 flex items-start gap-2">
        <iconify-icon icon="solar:info-circle-linear" width="16" className="text-indigo-400 shrink-0 mt-0.5" />
        <p className="text-xs text-indigo-300">Valley Bank renewal due — consider offering new placement</p>
      </div>

      {/* Sponsors list */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Active Sponsors</h3>
        <div className="flex flex-col gap-3">
          {sponsors.map(sp => (
            <div key={sp.id} className="rounded-xl border bg-black border-emerald-800 p-4 flex flex-col gap-3">
              {editing === sp.id ? (
                <div className="flex flex-col gap-2">
                  <input defaultValue={sp.name} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500" />
                  <div className="flex gap-2">
                    <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-xs font-semibold hover:bg-cyan-300 transition-colors min-h-[36px]">Save</button>
                    <button onClick={() => setEditing(null)} className="px-3 py-1.5 rounded-lg border border-emerald-800 text-emerald-100 text-xs font-medium hover:bg-emerald-950 transition-colors min-h-[36px]">Cancel</button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold text-emerald-100">{sp.name}</p>
                      <p className="text-xs text-emerald-500 mt-0.5">{sp.placement}</p>
                      <p className="text-xs text-emerald-600">Expires {sp.expires}</p>
                    </div>
                    <StatusBadge status={sp.status} />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    <button onClick={() => setEditing(sp.id)} className="px-3 py-1.5 rounded-lg border border-emerald-800 text-emerald-100 text-xs font-medium hover:bg-emerald-950 transition-colors min-h-[36px]">Edit</button>
                    {sp.status === "active" && <button onClick={() => expireSponsor(sp.id)} className="px-3 py-1.5 rounded-lg border border-orange-800 text-orange-400 text-xs font-medium hover:bg-orange-950/30 transition-colors min-h-[36px]">Expire</button>}
                    <button onClick={() => removeSponsor(sp.id)} className="px-3 py-1.5 rounded-lg border border-red-800 text-red-400 text-xs font-medium hover:bg-red-950 transition-colors min-h-[36px]">Remove</button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Add sponsor form */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Add Sponsor</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
          <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Sponsor name" className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-cyan-500" />
          <select value={form.placement} onChange={e => setForm(f => ({ ...f, placement: e.target.value }))} className="bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500">
            <option>Team Portal Header</option>
            <option>Game Day Sheet Footer</option>
            <option>Schedule Page</option>
            <option>Email Footer</option>
          </select>
          <input type="date" value={form.expiry} onChange={e => setForm(f => ({ ...f, expiry: e.target.value }))} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500" />
          <button onClick={addSponsor} className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">Add Sponsor</button>
        </div>
      </section>

      {/* Logo metadata queue */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Logo Upload Queue</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
          <p className="text-sm text-emerald-300">Pending: Riverside Sporting Goods</p>
          <input value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://..." className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-cyan-500" />
          {logoUrl && logoUrl.startsWith("https://") ? (
            <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-3 flex items-center gap-3">
              <img src={logoUrl} alt="Logo preview" className="w-16 h-10 object-contain rounded" onError={e => { e.target.style.display='none'; }} />
              <p className="text-xs text-emerald-400">Preview (HTTPS verified)</p>
            </div>
          ) : logoUrl ? (
            <p className="text-xs text-red-400">Logo URL must begin with https://</p>
          ) : null}
          <button className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">Submit Logo</button>
        </div>
      </section>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-400">Live payment collection requires a configured Stripe workflow.</p>
        </div>
        <div className="flex items-start gap-3">
          <iconify-icon icon="solar:shield-check-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-400">Sponsor pages do not expose child profiles, contacts, or billing details.</p>
        </div>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
