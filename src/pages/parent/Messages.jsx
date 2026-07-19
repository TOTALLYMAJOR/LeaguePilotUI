import { useState } from "react";
import { MESSAGES } from "../../data/demo.js";
import StatusBadge from "../../components/StatusBadge.jsx";

const TOPICS = ["Game Day", "Weather", "Schedule", "General"];

const ROLE_LABELS = { coach: "Coach", admin: "Admin", parent: "Parent" };
const ROLE_COLORS = {
  coach: "bg-cyan-950 text-cyan-300 border-cyan-800",
  admin: "bg-indigo-950 text-indigo-300 border-indigo-800",
  parent: "bg-gray-900 text-gray-400 border-gray-700",
};

export default function Messages() {
  const [activeTopic, setActiveTopic] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(MESSAGES);

  const pinned = messages.filter((m) => m.pinned);
  const thread = messages.filter((m) => !m.pinned);
  const filtered = activeTopic ? thread.filter((m) => m.topic === activeTopic) : thread;

  function handleSend() {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      {
        id: `m${Date.now()}`,
        sender: "Sarah Mitchell",
        senderAvatar: null,
        role: "parent",
        pinned: false,
        content: input.trim(),
        time: "Just now",
        read: true,
        topic: null,
      },
    ]);
    setInput("");
  }

  function Avatar({ msg }) {
    if (msg.senderAvatar) {
      return <img src={msg.senderAvatar} alt={msg.sender} className="w-9 h-9 rounded-full object-cover shrink-0" />;
    }
    return (
      <div className="w-9 h-9 rounded-full bg-emerald-900 flex items-center justify-center text-xs font-bold text-emerald-300 shrink-0">
        {msg.sender.split(" ").map((w) => w[0]).join("").slice(0, 2)}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Messages
        </h2>
      </div>

      {/* Pinned announcements */}
      {pinned.length > 0 && (
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Pinned Announcements</h3>
          {pinned.map((m) => (
            <div key={m.id} className="rounded-xl border bg-black border-emerald-800 p-4 flex gap-3">
              <Avatar msg={m} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-semibold text-emerald-100">{m.sender}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[m.role]}`}>
                    {ROLE_LABELS[m.role]}
                  </span>
                  {!m.read && <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />}
                </div>
                <p className="text-sm text-emerald-300">{m.content}</p>
                <p className="text-xs text-emerald-600 mt-1">{m.time}</p>
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Topic shortcuts */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setActiveTopic(null)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium border min-h-[36px] transition-colors ${
            activeTopic === null ? "bg-cyan-400 text-black border-cyan-400" : "border-emerald-800 text-emerald-400 hover:bg-emerald-950"
          }`}
        >
          All
        </button>
        {TOPICS.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTopic(activeTopic === t ? null : t)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium border min-h-[36px] transition-colors ${
              activeTopic === t ? "bg-cyan-400 text-black border-cyan-400" : "border-emerald-800 text-emerald-400 hover:bg-emerald-950"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Thread */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Thread</h3>
        {filtered.length === 0 ? (
          <div className="rounded-xl border bg-black border-emerald-800 p-8 flex flex-col items-center gap-2 text-center">
            <iconify-icon icon="solar:chat-round-line-linear" width="36" className="text-emerald-700" />
            <p className="text-emerald-500 text-sm">No messages in this topic yet.</p>
          </div>
        ) : (
          filtered.map((m) => (
            <div key={m.id} className="rounded-xl border bg-black border-emerald-800 p-4 flex gap-3">
              <Avatar msg={m} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-sm font-semibold text-emerald-100">{m.sender}</span>
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${ROLE_COLORS[m.role]}`}>
                    {ROLE_LABELS[m.role]}
                  </span>
                  {!m.read && <span className="w-2 h-2 rounded-full bg-blue-400 shrink-0" />}
                </div>
                <p className="text-sm text-emerald-300">{m.content}</p>
                <p className="text-xs text-emerald-600 mt-1">{m.time}</p>
              </div>
            </div>
          ))
        )}
      </section>

      {/* Text input */}
      <div className="flex gap-2 items-end">
        <textarea
          rows={2}
          placeholder="Write a message…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }}}
          className="flex-1 bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-700 focus:outline-none focus:border-emerald-600 resize-none"
        />
        <button
          onClick={handleSend}
          className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]"
        >
          Send
        </button>
      </div>

      <a href="#" className="text-xs text-cyan-400 hover:text-cyan-300 text-center">Manage notification preferences</a>

      <p className="text-xs text-emerald-600 text-center mt-2">Demo data — changes are not persisted.</p>
    </div>
  );
}
