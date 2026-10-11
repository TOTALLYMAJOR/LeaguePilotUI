import { useState, type FormEvent } from "react";
import { ChevronLeft, Send } from "lucide-react";
import { Avatar, Badge, Card, PageHeader } from "../components/ui";
import { threads as seedThreads, type Thread } from "../data/team";

export default function Messages() {
  const [threads, setThreads] = useState<Thread[]>(seedThreads);
  const [activeId, setActiveId] = useState<string>(seedThreads[0].id);
  const [draft, setDraft] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);

  const active = threads.find((t) => t.id === activeId) ?? threads[0];
  const unread = threads.filter((t) => t.unread).length;

  const openThread = (id: string) => {
    setActiveId(id);
    setMobileOpen(true);
    setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, unread: false } : t)));
  };

  const send = (e: FormEvent) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    setThreads((ts) =>
      ts.map((t) =>
        t.id === active.id
          ? { ...t, time: "Just now", messages: [...t.messages, { from: "me", text, time: "Just now" }] }
          : t,
      ),
    );
    setDraft("");
  };

  return (
    <div>
      <PageHeader
        title="Messages"
        subtitle="Coach notes, team-parent reminders, and league announcements, all in one tidy inbox."
        badge={unread > 0 ? <Badge tone="candy">{unread} unread</Badge> : <Badge tone="zest">All caught up</Badge>}
      />

      <div className="animate-rise delay-1 grid gap-4 lg:grid-cols-[320px_1fr]">
        {/* Thread list */}
        <Card className={`${mobileOpen ? "hidden lg:block" : "block"} p-2`}>
          <ul className="divide-y divide-white/5">
            {threads.map((t) => (
              <li key={t.id}>
                <button
                  onClick={() => openThread(t.id)}
                  className={`flex w-full items-start gap-3 rounded-2xl p-3 text-left transition ${
                    t.id === active.id ? "bg-white/10" : "hover:bg-white/5"
                  }`}
                >
                  <Avatar initials={t.initials} color={t.color} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className={`truncate text-sm ${t.unread ? "font-bold text-white" : "font-semibold text-slate-200"}`}>{t.from}</p>
                      <span className="shrink-0 text-[11px] text-slate-500">{t.time}</span>
                    </div>
                    <p className={`truncate text-xs ${t.unread ? "text-slate-200" : "text-slate-400"}`}>{t.subject}</p>
                    <p className="truncate text-xs text-slate-500">{t.messages[t.messages.length - 1].text}</p>
                  </div>
                  {t.unread && <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-candy-500" />}
                </button>
              </li>
            ))}
          </ul>
        </Card>

        {/* Active thread */}
        <Card className={`${mobileOpen ? "flex" : "hidden lg:flex"} min-h-[520px] flex-col`}>
          <div className="flex items-center gap-3 border-b border-white/5 p-4">
            <button onClick={() => setMobileOpen(false)} className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/5 lg:hidden">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <Avatar initials={active.initials} color={active.color} />
            <div className="min-w-0">
              <p className="truncate font-display text-base font-semibold text-white">{active.subject}</p>
              <p className="text-xs text-slate-400">
                {active.from} · {active.role}
              </p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-3 overflow-y-auto p-4">
            {active.messages.map((m, i) => (
              <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.from === "me"
                      ? "rounded-br-md bg-rocket-500 text-ink-950"
                      : "rounded-bl-md bg-white/10 text-slate-100 ring-1 ring-white/10"
                  }`}
                >
                  <p>{m.text}</p>
                  <p className={`mt-1 text-[10px] ${m.from === "me" ? "text-ink-950/70" : "text-slate-500"}`}>{m.time}</p>
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={send} className="flex items-center gap-2 border-t border-white/5 p-3">
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder={`Reply to ${active.from}...`}
              className="h-11 flex-1 rounded-xl border border-white/10 bg-ink-800 px-4 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/60 focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-sky-400 text-ink-950 transition hover:bg-sky-300 disabled:opacity-40"
              disabled={!draft.trim()}
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </Card>
      </div>
    </div>
  );
}
