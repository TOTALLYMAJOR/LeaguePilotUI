import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { NOTIFICATION_QUEUE } from "../../data/demo.js";

const PROVIDER_STATUS = [
  { name: "Email", status: "disconnected", icon: "solar:letter-linear" },
  { name: "Push", status: "active", icon: "solar:bell-linear" },
  { name: "SMS", status: "disconnected", icon: "solar:chat-round-line-linear" },
];

export default function Communications() {
  const [queue, setQueue] = useState(NOTIFICATION_QUEUE);
  const [preview, setPreview] = useState("Email");
  const [form, setForm] = useState({ type: "Announcement", audience: "All families", channels: { push: true, email: false, sms: false }, body: "" });

  const approveNotif = (id) => setQueue(q => q.map(n => n.id === id ? { ...n, status: "Queued" } : n));
  const rejectNotif = (id) => setQueue(q => q.filter(n => n.id !== id));
  const sendNotif = (id) => setQueue(q => q.map(n => n.id === id ? { ...n, status: "Sent" } : n));

  const smsChars = form.body.length;
  const smsSegments = Math.ceil(smsChars / 160) || 0;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Communications
        </h2>
      </div>

      {/* Provider status */}
      <div className="flex flex-wrap gap-3">
        {PROVIDER_STATUS.map(p => (
          <div key={p.name} className="flex items-center gap-2 rounded-lg border border-emerald-900 bg-black px-3 py-2">
            <iconify-icon icon={p.icon} width="16" className={p.status === "active" ? "text-emerald-400" : "text-orange-400"} />
            <span className="text-xs text-emerald-400">{p.name}:</span>
            <StatusBadge status={p.status} />
          </div>
        ))}
      </div>

      {/* Notification queue */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Notification Queue</h3>
        <div className="flex flex-col gap-3">
          {queue.map(n => (
            <div key={n.id} className="rounded-xl border bg-black border-emerald-800 p-4 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-semibold text-emerald-100">{n.type}</p>
                  <p className="text-xs text-emerald-500 mt-0.5">{n.audience} · {n.channel}</p>
                </div>
                <StatusBadge status={n.status.toLowerCase()} label={n.status} />
              </div>
              <div className="flex gap-2 flex-wrap">
                {n.status === "Awaiting approval" && (
                  <>
                    <button onClick={() => approveNotif(n.id)} className="px-3 py-1.5 rounded-lg bg-cyan-400 text-black text-xs font-semibold hover:bg-cyan-300 transition-colors min-h-[36px]">Approve</button>
                    <button onClick={() => rejectNotif(n.id)} className="px-3 py-1.5 rounded-lg border border-red-800 text-red-400 text-xs font-medium hover:bg-red-950 transition-colors min-h-[36px]">Reject</button>
                  </>
                )}
                {n.status === "Queued" && (
                  <button onClick={() => sendNotif(n.id)} className="px-3 py-1.5 rounded-lg border border-emerald-800 text-emerald-100 text-xs font-medium hover:bg-emerald-950 transition-colors min-h-[36px]">Mark Sent</button>
                )}
                {n.status === "Sent" && <span className="text-xs text-emerald-600 italic">Delivered — cannot claim sent without provider evidence</span>}
                {n.status === "Draft" && <span className="text-xs text-emerald-600 italic">Draft — submit for approval to send</span>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Compose */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Compose New Communication</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-emerald-500 block mb-1">Type</label>
              <select value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500">
                <option>Announcement</option>
                <option>Schedule Change</option>
                <option>Weather Alert</option>
                <option>Weekly Digest</option>
                <option>Game Reminder</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-emerald-500 block mb-1">Audience</label>
              <select value={form.audience} onChange={e => setForm(f => ({ ...f, audience: e.target.value }))} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500">
                <option>All families</option>
                <option>Riverside Rockets families</option>
                <option>Valley Stars families</option>
                <option>Coaches only</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs text-emerald-500 block mb-2">Channels</label>
            <div className="flex gap-4">
              {["push", "email", "sms"].map(ch => (
                <label key={ch} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.channels[ch]}
                    onChange={e => setForm(f => ({ ...f, channels: { ...f.channels, [ch]: e.target.checked } }))}
                    className="rounded border-emerald-700 bg-gray-950"
                  />
                  <span className="text-sm text-emerald-300 capitalize">{ch.toUpperCase()}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="text-xs text-emerald-500 block mb-1">Message Body</label>
            <textarea
              value={form.body}
              onChange={e => setForm(f => ({ ...f, body: e.target.value }))}
              rows={4}
              placeholder="Write your message here…"
              className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-cyan-500 resize-none"
            />
            {form.channels.sms && (
              <p className="text-xs text-emerald-500 mt-1">{smsChars} chars · {smsSegments} SMS segment{smsSegments !== 1 ? "s" : ""}</p>
            )}
          </div>

          {/* Preview tabs */}
          <div>
            <div className="flex gap-1 rounded-lg bg-gray-950 p-1 border border-emerald-900 w-fit mb-3">
              {["Email", "SMS"].map(t => (
                <button key={t} onClick={() => setPreview(t)} className={`px-3 py-1.5 rounded text-xs font-semibold transition-colors min-h-[32px] ${preview === t ? "bg-emerald-800 text-emerald-100" : "text-emerald-500 hover:text-emerald-300"}`}>{t}</button>
              ))}
            </div>
            <div className="rounded-lg bg-gray-950 border border-emerald-900 p-4 min-h-[80px]">
              {preview === "Email" ? (
                <div>
                  <p className="text-xs font-semibold text-emerald-400 mb-1">Subject: {form.type} — Riverside Youth Sports</p>
                  <p className="text-sm text-emerald-300">{form.body || <span className="text-emerald-700 italic">No message body yet…</span>}</p>
                </div>
              ) : (
                <p className="text-sm text-emerald-300">{form.body || <span className="text-emerald-700 italic">No message body yet…</span>}</p>
              )}
            </div>
          </div>

          <p className="text-xs text-emerald-600">Recipient preferences are respected. Opted-out users will not receive messages.</p>
          <button className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]">
            Submit for Approval
          </button>
        </div>
      </section>

      {/* Status glossary */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Status Glossary</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-emerald-500">
            <StatusBadge status="draft" /> <span>→</span>
            <StatusBadge status="approved" /> <span>→</span>
            <StatusBadge status="published" /> <span>→</span>
            <StatusBadge status="queued" /> <span>→</span>
            <StatusBadge status="sent" /> <span>→</span>
            <StatusBadge status="failed" />
          </div>
        </div>
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
