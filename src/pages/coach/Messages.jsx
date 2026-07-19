import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { MESSAGES } from "../../data/demo.js";

export default function Messages() {
  const [draft, setDraft] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  const [status, setStatus] = useState("draft");
  const [saved, setSaved] = useState(false);

  const pinned = MESSAGES.filter(m => m.pinned);

  const handleSaveDraft = () => { setStatus("draft"); setSaved(true); };
  const handleSubmit = () => { setStatus("awaiting approval"); setSaved(true); };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Team Messages
        </h2>
      </div>

      {/* Compose area */}
      <div className="rounded-xl border p-5 bg-black border-emerald-800 flex flex-col gap-4">
        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">New Announcement</p>
        <textarea
          rows={4}
          value={draft}
          onChange={e => { setDraft(e.target.value); setSaved(false); }}
          placeholder="Write an announcement for your team…"
          className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600 resize-none"
        />
        <div className="flex items-center gap-2">
          <StatusBadge status={status} label={status === "awaiting approval" ? "Awaiting Approval" : "Draft"} />
          {saved && <span className="text-xs text-emerald-500">Saved</span>}
        </div>

        {showPreview && draft && (
          <div className="bg-emerald-950/30 border border-emerald-800 rounded-lg p-3">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">How families will see this</p>
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-cyan-700 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">CM</div>
              <div>
                <p className="text-xs text-emerald-400 mb-1">Coach Mike · Just now</p>
                <p className="text-sm text-emerald-100 leading-relaxed">{draft}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button onClick={() => setShowPreview(v => !v)} className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">
            {showPreview ? "Hide Preview" : "Preview"}
          </button>
          <button onClick={handleSaveDraft} className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">
            Save Draft
          </button>
          <button onClick={handleSubmit} disabled={!draft} className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed">
            Submit for Approval
          </button>
        </div>
      </div>

      {/* Pinned announcements */}
      {pinned.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Pinned Announcements</h3>
          {pinned.map(msg => (
            <div key={msg.id} className="rounded-xl border p-4 bg-black border-emerald-800 flex items-start gap-3">
              <iconify-icon icon="solar:pin-linear" width="18" class="text-cyan-400 flex-shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-emerald-100">{msg.sender}</span>
                  <span className="text-xs text-emerald-500">{msg.time}</span>
                  {msg.topic && <span className="text-xs bg-emerald-900 text-emerald-300 px-2 py-0.5 rounded-full">{msg.topic}</span>}
                </div>
                <p className="text-sm text-emerald-300 leading-relaxed">{msg.content}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Full message thread */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Message Thread</h3>
        <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
          {MESSAGES.map((msg, idx) => (
            <div key={msg.id}>
              <div className={`flex items-start gap-3 px-4 py-4 ${!msg.read ? "bg-emerald-950/20" : ""}`}>
                {msg.senderAvatar ? (
                  <img src={msg.senderAvatar} alt={msg.sender} className="w-8 h-8 rounded-full flex-shrink-0 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-400 flex-shrink-0">
                    {msg.sender.charAt(0)}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="text-sm font-semibold text-emerald-100">{msg.sender}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${msg.role === "coach" ? "bg-cyan-900 text-cyan-300" : msg.role === "admin" ? "bg-purple-900 text-purple-300" : "bg-gray-900 text-gray-400"}`}>
                      {msg.role}
                    </span>
                    <span className="text-xs text-emerald-500">{msg.time}</span>
                    {!msg.read && <span className="w-2 h-2 rounded-full bg-cyan-400 flex-shrink-0" />}
                  </div>
                  <p className="text-sm text-emerald-300 leading-relaxed">{msg.content}</p>
                </div>
              </div>
              {idx < MESSAGES.length - 1 && <div className="h-px w-full bg-emerald-900/50" />}
            </div>
          ))}
        </div>
      </section>

      {/* Weekly update draft card */}
      <div className="rounded-xl border p-5 bg-black border-emerald-800 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Weekly Update Draft</p>
          <StatusBadge status="awaiting approval" />
        </div>
        <p className="text-sm text-emerald-100 font-medium">Week 4 Update</p>
        <p className="text-sm text-emerald-400">Great week of practice! Reminder about Saturday's game at North B Field — arrive by 8:30 AM. Don't forget snacks signup for the July 12 game.</p>
        <div className="flex gap-2">
          <button className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">Edit</button>
        </div>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
