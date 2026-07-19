import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { INVITATIONS } from "../../data/demo.js";

export default function Invitations() {
  const [invites, setInvites] = useState(INVITATIONS);
  const [form, setForm] = useState({ email: "", role: "Parent", team: "Riverside Rockets" });
  const [sent, setSent] = useState(false);

  const revoke = (id) => setInvites(inv => inv.map(i => i.id === id ? { ...i, status: "revoked" } : i));
  const regenerate = (id) => setInvites(inv => inv.map(i => i.id === id ? { ...i, status: "pending", expires: "July 26, 2025" } : i));

  const sendInvite = () => {
    if (!form.email) return;
    const newInv = { id: `i${Date.now()}`, email: form.email, role: form.role, team: form.team, status: "pending", expires: "July 26, 2025", sentAt: "Just now" };
    setInvites(inv => [newInv, ...inv]);
    setForm({ email: "", role: "Parent", team: "Riverside Rockets" });
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const stats = {
    pending: invites.filter(i => i.status === "pending").length,
    accepted: invites.filter(i => i.status === "accepted").length,
    expired: invites.filter(i => i.status === "expired").length,
    revoked: invites.filter(i => i.status === "revoked").length,
  };

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Invitations
        </h2>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Pending", value: stats.pending, color: "text-yellow-400" },
          { label: "Accepted", value: stats.accepted, color: "text-emerald-400" },
          { label: "Expired", value: stats.expired, color: "text-orange-400" },
          { label: "Revoked", value: stats.revoked, color: "text-red-400" },
        ].map(s => (
          <div key={s.label} className="rounded-xl border bg-black border-emerald-800 p-4 text-center">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-emerald-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Invitations table */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">All Invitations</h3>
        <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs min-w-[540px]">
              <thead>
                <tr className="border-b border-emerald-900">
                  <th className="text-left p-3 text-emerald-500 font-semibold">Email</th>
                  <th className="text-left p-3 text-emerald-500 font-semibold">Role</th>
                  <th className="text-left p-3 text-emerald-500 font-semibold">Team</th>
                  <th className="text-left p-3 text-emerald-500 font-semibold">Status</th>
                  <th className="text-left p-3 text-emerald-500 font-semibold">Expires</th>
                  <th className="text-left p-3 text-emerald-500 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invites.map(inv => (
                  <tr key={inv.id} className="border-b border-emerald-900/50">
                    <td className="p-3 text-emerald-100 font-mono text-xs">{inv.email}</td>
                    <td className="p-3 text-emerald-400">{inv.role}</td>
                    <td className="p-3 text-emerald-400">{inv.team}</td>
                    <td className="p-3"><StatusBadge status={inv.status} /></td>
                    <td className="p-3 text-emerald-500">{inv.expires}</td>
                    <td className="p-3 flex gap-2 flex-wrap">
                      {inv.status === "expired" && (
                        <button onClick={() => regenerate(inv.id)} className="text-cyan-400 hover:text-cyan-300 font-medium min-h-[32px]">Regenerate</button>
                      )}
                      {inv.status === "pending" && (
                        <button onClick={() => revoke(inv.id)} className="text-red-400 hover:text-red-300 font-medium min-h-[32px]">Revoke</button>
                      )}
                      {(inv.status === "accepted" || inv.status === "revoked") && (
                        <span className="text-emerald-700">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Send new invitation */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Send New Invitation</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
          {sent && (
            <div className="rounded-lg bg-emerald-950 border border-emerald-700 p-3 flex items-center gap-2">
              <iconify-icon icon="solar:check-circle-linear" width="16" className="text-emerald-400" />
              <p className="text-xs text-emerald-300">Invitation sent successfully.</p>
            </div>
          )}
          <input
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-cyan-500"
            placeholder="Email address"
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
              className="bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500"
            >
              <option>Parent</option>
              <option>Coach</option>
              <option>Admin</option>
            </select>
            <select
              value={form.team}
              onChange={e => setForm(f => ({ ...f, team: e.target.value }))}
              className="bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500"
            >
              <option>Riverside Rockets</option>
              <option>Valley Stars</option>
              <option>Eastside Tigers</option>
              <option>River Hawks</option>
            </select>
          </div>
          <button onClick={sendInvite} className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">
            Send Invitation
          </button>
        </div>
      </section>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex flex-col gap-2">
        <div className="flex items-start gap-3">
          <iconify-icon icon="solar:shield-check-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-400">Only safe token evidence is stored. Raw invite tokens are never displayed after issuance.</p>
        </div>
        <div className="flex items-start gap-3">
          <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
          <p className="text-xs text-emerald-400">Each invitation action is recorded with your administrator identity.</p>
        </div>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
