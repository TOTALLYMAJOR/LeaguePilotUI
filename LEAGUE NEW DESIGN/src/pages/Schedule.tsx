import { useState } from "react";
import { CalendarPlus, ChevronLeft, ChevronRight, Clock, MapPin, Users } from "lucide-react";
import { Badge, Card, PageHeader, ProgressBar, Stat, eventLabel, eventTone } from "../components/ui";
import { events, team, type EventType } from "../data/team";

type Filter = "all" | EventType;
type Rsvp = "yes" | "no" | null;

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "game", label: "Games" },
  { id: "practice", label: "Practices" },
  { id: "event", label: "Team events" },
];

const stripe: Record<EventType, string> = {
  game: "bg-rocket-500",
  practice: "bg-sky-400",
  event: "bg-candy-500",
};

const dateBox: Record<EventType, string> = {
  game: "bg-rocket-500/15 text-rocket-300 ring-rocket-500/30",
  practice: "bg-sky-400/15 text-sky-300 ring-sky-400/30",
  event: "bg-candy-500/15 text-candy-300 ring-candy-500/30",
};

export default function Schedule() {
  const [filter, setFilter] = useState<Filter>("all");
  const [rsvps, setRsvps] = useState<Record<string, Rsvp>>({ e1: "yes", e2: "yes", e3: "yes" });

  const list = events.filter((e) => filter === "all" || e.type === filter);
  const games = events.filter((e) => e.type === "game").length;
  const practices = events.filter((e) => e.type === "practice").length;

  return (
    <div>
      <PageHeader
        title="Schedule"
        subtitle="Every launch, drill, and party for the Rockets. RSVP right here so Coach can plan the lineup."
        badge={
          <div className="flex items-center gap-1 rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="px-3 font-display text-sm font-semibold text-white">July 2026</span>
            <button className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-white/10 hover:text-white">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        }
      />

      <div className="animate-rise delay-1 mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Stat label="Games this month" value={String(games)} tone="rocket" hint="Saturday mornings" />
        <Stat label="Practices" value={String(practices)} tone="sky" hint="Tue + Thu, 5:30 PM" />
        <Stat label="Season played" value={`${team.record.played}/${team.record.total}`} tone="zest" hint="Games done" />
        <Stat label="High-fives" value={String(team.record.highFives)} tone="candy" hint="Unofficial tally" />
      </div>

      <div className="animate-rise delay-2 mb-5 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`min-h-[40px] rounded-full px-4 text-sm font-semibold transition ${
              filter === f.id ? "bg-white text-ink-950" : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <ul className="space-y-4">
        {list.map((e, i) => {
          const total = e.rsvp.yes + e.rsvp.no + e.rsvp.pending;
          const mine = rsvps[e.id] ?? null;
          return (
            <li key={e.id} className={`animate-rise ${i % 2 ? "delay-2" : "delay-1"}`}>
              <Card className="p-5 sm:p-6">
                <span className={`absolute inset-y-0 left-0 w-1.5 ${stripe[e.type]}`} />
                <div className="flex flex-col gap-5 sm:flex-row">
                  <div className={`flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-2xl ring-1 ${dateBox[e.type]}`}>
                    <span className="text-xs font-bold uppercase tracking-wider">{e.weekday}</span>
                    <span className="font-display text-3xl font-semibold leading-none">{e.day}</span>
                    <span className="text-[11px] font-semibold">{e.month}</span>
                  </div>

                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <Badge tone={eventTone[e.type]}>{eventLabel[e.type]}</Badge>
                      {e.id === "e2" && <Badge tone="zest">Field changed</Badge>}
                    </div>
                    <h3 className="mt-2 font-display text-xl font-semibold text-white">{e.title}</h3>
                    <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-slate-500" />
                        {e.time} · arrive {e.arrive}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-slate-500" />
                        {e.location}
                      </span>
                    </div>
                    {e.note && <p className="mt-2 text-sm text-slate-400">{e.note}</p>}

                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="w-full sm:max-w-xs">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1 font-semibold text-slate-300">
                            <Users className="h-3.5 w-3.5" /> {e.rsvp.yes} of {total} Rockets coming
                          </span>
                          <span className="text-slate-500">{e.rsvp.pending} pending</span>
                        </div>
                        <ProgressBar value={e.rsvp.yes} max={total} color="bg-zest-400" className="mt-1.5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
                          <button
                            onClick={() => setRsvps((r) => ({ ...r, [e.id]: "yes" }))}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${mine === "yes" ? "bg-zest-400 text-ink-950" : "text-slate-400 hover:text-white"}`}
                          >
                            Going
                          </button>
                          <button
                            onClick={() => setRsvps((r) => ({ ...r, [e.id]: "no" }))}
                            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${mine === "no" ? "bg-candy-500 text-ink-950" : "text-slate-400 hover:text-white"}`}
                          >
                            Can't make it
                          </button>
                        </div>
                        <button
                          title="Add to calendar"
                          className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
                        >
                          <CalendarPlus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
