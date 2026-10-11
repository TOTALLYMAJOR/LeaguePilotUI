import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  Cookie,
  Image,
  Info,
  MapPin,
  MessageCircle,
  Rocket,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  Zap,
} from "lucide-react";
import MissionControl from "../components/MissionControl";
import { Badge, Card, ProgressBar, SectionTitle, eventLabel, eventTone } from "../components/ui";
import { events, packList, photos, skillMeter, team, threads } from "../data/team";

type Rsvp = "yes" | "no" | "maybe";

const week = [
  { day: "Mon", date: 30 },
  { day: "Tue", date: 1 },
  { day: "Wed", date: 2 },
  { day: "Thu", date: 3 },
  { day: "Fri", date: 4 },
  { day: "Sat", date: 5 },
  { day: "Sun", date: 6 },
];

const nextGame = events.find((e) => e.type === "game")!;
const unread = threads.filter((t) => t.unread).length;
const newPhotos = photos.filter((p) => p.isNew).length;

const changes = [
  { when: "2h ago", text: "Field moved: South A to North B", tone: "rocket" as const },
  { when: "Yesterday", text: "Picture Day added after the game", tone: "candy" as const },
  { when: "Mon", text: "July snack sign-ups opened", tone: "zest" as const },
];

export default function Home() {
  const [rsvp, setRsvp] = useState<Rsvp>("yes");
  const [packed, setPacked] = useState<Record<string, boolean>>({ "Orange jersey": true, Glove: true });
  const [selectedDay, setSelectedDay] = useState(3);

  const packedCount = packList.filter((i) => packed[i]).length;
  const dayEvents = events.filter((e) => e.day === selectedDay && e.month === "Jul");

  return (
    <div className="flex flex-col gap-10">
      {/* Greeting */}
      <section className="animate-rise flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Badge tone="rocket" className="mb-3">
            <Rocket className="h-3 w-3" />
            T-minus 2 days to launch
          </Badge>
          <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
            Hey Sarah, {team.child}'s next game is <span className="text-rocket-400">Saturday</span>.
          </h1>
          <p className="mt-2 max-w-[60ch] text-sm text-slate-400 sm:text-base">
            Everything your family needs for the Rockets this week: where to be, what to pack, and
            who's bringing snacks. No scrolling through 40 group texts.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/schedule"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-rocket-500 px-4 text-sm font-semibold text-ink-950 shadow-pop transition hover:-translate-y-0.5 hover:bg-rocket-400"
          >
            Full schedule
            <ArrowRight className="h-4 w-4" />
          </Link>
          <button className="relative hidden h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10 md:flex">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-candy-500 ring-2 ring-ink-950" />
          </button>
        </div>
      </section>

      {/* 3D Mission Control */}
      <section>
        <SectionTitle
          eyebrow="Mission control"
          title="Saturday's launch pad"
          description="Tap a player to pull them in or out of the lineup preview. Hover the panel to straighten it out."
        />
        <MissionControl />
      </section>

      {/* Bento grid */}
      <section>
        <SectionTitle
          eyebrow="This week"
          title="What you need to know"
          description="The short version. Everything here updates the moment a coach changes something."
        />
        <div className="space-y-5">
          {/* Row 1 */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Card glow="rocket" className="animate-rise delay-1 p-6 lg:col-span-2 md:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rocket-500/15 ring-1 ring-rocket-500/30">
                    <Trophy className="h-5 w-5 text-rocket-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-rocket-300">Next launch</p>
                    <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{nextGame.title}</h3>
                  </div>
                </div>
                <Badge tone="zest">Coming up soon</Badge>
              </div>

              <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-slate-300">
                <span className="font-semibold text-white">
                  {nextGame.weekday}, {nextGame.month} {nextGame.day} · {nextGame.time}
                </span>
                <span className="text-slate-600">|</span>
                <MapPin className="h-4 w-4 text-sky-400" />
                {nextGame.location} · {nextGame.address}
                <a href="#" className="inline-flex items-center gap-0.5 font-semibold text-sky-400 hover:text-sky-300">
                  Directions <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </p>

              {/* RSVP */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-slate-200">Is {team.child} coming?</span>
                  <div className="flex rounded-xl bg-white/5 p-1 ring-1 ring-white/10">
                    {(["yes", "maybe", "no"] as Rsvp[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => setRsvp(opt)}
                        className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize transition-colors ${
                          rsvp === opt
                            ? opt === "yes"
                              ? "bg-zest-400 text-ink-950"
                              : opt === "no"
                                ? "bg-candy-500 text-ink-950"
                                : "bg-sky-400 text-ink-950"
                            : "text-slate-400 hover:text-white"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="flex items-center gap-1.5 text-sm text-slate-400">
                  {rsvp === "yes" ? (
                    <>
                      <CheckCircle2 className="h-4 w-4 text-zest-400" /> {team.child} is confirmed. Coach sees it instantly.
                    </>
                  ) : rsvp === "maybe" ? (
                    <>
                      <Info className="h-4 w-4 text-sky-400" /> We'll nudge you Friday night.
                    </>
                  ) : (
                    <>
                      <Info className="h-4 w-4 text-candy-400" /> Coach Mike has been told. Catch you next time.
                    </>
                  )}
                </p>
              </div>

              {/* Pack list */}
              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Pack list</p>
                  <span className="text-xs font-semibold text-slate-300">
                    {packedCount}/{packList.length} packed
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-5 gap-3 md:gap-5">
                  {packList.map((item) => {
                    const done = !!packed[item];
                    return (
                      <button
                        key={item}
                        onClick={() => setPacked((p) => ({ ...p, [item]: !p[item] }))}
                        className="group flex flex-col items-center gap-2 text-center"
                      >
                        <span
                          className={`flex h-12 w-12 items-center justify-center rounded-full ring-1 transition-all ${
                            done
                              ? "bg-zest-400 text-ink-950 ring-zest-400 shadow-[0_0_20px_rgba(182,242,60,0.4)]"
                              : "bg-white/5 text-slate-400 ring-white/10 group-hover:bg-white/10"
                          }`}
                        >
                          {done ? <Check className="h-5 w-5" strokeWidth={3} /> : <Sparkles className="h-4 w-4" />}
                        </span>
                        <span className={`text-[11px] font-medium leading-tight ${done ? "text-white" : "text-slate-400"}`}>{item}</span>
                      </button>
                    );
                  })}
                </div>
                <ProgressBar value={packedCount} max={packList.length} color="bg-zest-400" className="mt-4" />
              </div>
            </Card>

            <Card glow="candy" className="animate-rise delay-2 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-candy-500/15 ring-1 ring-candy-500/30">
                  <Zap className="h-5 w-5 text-candy-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-candy-300">What changed</p>
                  <h3 className="font-display text-xl font-semibold text-white">3 updates</h3>
                </div>
              </div>
              <ol className="mt-6 space-y-0">
                {changes.map((c, i) => (
                  <li key={i} className="relative flex gap-3 pb-5 last:pb-0">
                    {i < changes.length - 1 && <span className="absolute left-[7px] top-4 h-full w-px bg-white/10" />}
                    <span
                      className={`relative mt-1 h-3.5 w-3.5 shrink-0 rounded-full ring-4 ring-ink-900 ${
                        c.tone === "rocket" ? "bg-rocket-400" : c.tone === "candy" ? "bg-candy-400" : "bg-zest-400"
                      }`}
                    />
                    <div>
                      <p className="text-sm font-medium text-slate-100">{c.text}</p>
                      <p className="text-xs text-slate-500">{c.when}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link to="/messages" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-candy-400 hover:text-candy-300">
                Read the full thread <ArrowRight className="h-4 w-4" />
              </Link>
            </Card>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
            <Card glow="zest" className="animate-rise delay-1 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zest-500/15 ring-1 ring-zest-500/30">
                  <Cookie className="h-5 w-5 text-zest-400" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zest-300">Your to-do</p>
                  <h3 className="font-display text-xl font-semibold text-white">Snack hero, Jul 12</h3>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-300">
                You're signed up for snacks at the Comets game. 14 kids, 2 coaches, zero peanuts.
              </p>
              <ul className="mt-4 space-y-2 text-sm">
                {["Orange slices (crowd favorite)", "Something crunchy", "Juice boxes x16"].map((t, i) => (
                  <li key={t} className="flex items-center gap-2 text-slate-300">
                    <span className={`flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold ${i === 0 ? "bg-zest-400 text-ink-950" : "bg-white/10 text-slate-400"}`}>
                      {i === 0 ? <Check className="h-3 w-3" strokeWidth={3} /> : i + 1}
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
              <Link to="/volunteer" className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-xl bg-white/5 px-4 text-sm font-semibold text-white ring-1 ring-white/10 transition hover:bg-white/10">
                View details
              </Link>
            </Card>

            <Card glow="sky" className="animate-rise delay-2 p-6 lg:col-span-2 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/15 ring-1 ring-sky-400/30">
                    <Target className="h-5 w-5 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">Coach's corner</p>
                    <h3 className="font-display text-xl font-semibold text-white md:text-2xl">{team.coach} · Thursday recap</h3>
                  </div>
                </div>
                <Badge tone="sky">Focus: listening at the plate</Badge>
              </div>
              <blockquote className="mt-5 border-l-2 border-sky-400 pl-4 text-sm italic leading-relaxed text-slate-200 md:text-base">
                "Great Thursday practice. Relay drills clicked today. Saturday focus: listening at the
                plate, then running like a rocket."
              </blockquote>

              <div className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2">
                {skillMeter.map((s) => (
                  <div key={s.label}>
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-200">{s.label}</span>
                      <span className="font-display text-slate-400">{s.value}%</span>
                    </div>
                    <ProgressBar value={s.value} color={s.color} className="mt-1.5" />
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-slate-500">
                {team.child}'s skill meter, as rated by Coach Mike's extremely scientific clipboard.
              </p>
            </Card>
          </div>

          {/* Row 3: quick links */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Link to="/messages" className="group">
              <Card className="p-5 transition hover:-translate-y-0.5 hover:ring-candy-500/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-candy-500/15 text-candy-400 ring-1 ring-candy-500/30">
                      <MessageCircle className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-candy-500 px-1 text-[10px] font-bold text-ink-950 ring-2 ring-ink-900">
                        {unread}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Messages</p>
                      <p className="text-sm font-semibold text-white">{unread} unread from coaches</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </Card>
            </Link>
            <Link to="/photos" className="group">
              <Card className="p-5 transition hover:-translate-y-0.5 hover:ring-sky-400/40">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-sky-400/15 text-sky-400 ring-1 ring-sky-400/30">
                      <Image className="h-5 w-5" />
                      <span className="absolute -right-1 -top-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-sky-400 px-1 text-[10px] font-bold text-ink-950 ring-2 ring-ink-900">
                        {newPhotos}
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Photos</p>
                      <p className="text-sm font-semibold text-white">{newPhotos} new from Thursday</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-white" />
                </div>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* Week strip */}
      <section>
        <SectionTitle
          eyebrow="This week"
          title="July at a glance"
          action={
            <Link to="/schedule" className="inline-flex items-center gap-1 text-sm font-semibold text-sky-400 hover:text-sky-300">
              Open calendar <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <Card className="p-3">
          <div className="hide-scrollbar flex gap-1 overflow-x-auto">
            {week.map(({ day, date }) => {
              const has = events.some((e) => e.day === date && e.month === "Jul");
              const active = selectedDay === date;
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(date)}
                  className={`flex min-w-[64px] flex-1 flex-col items-center gap-1 rounded-2xl px-2 py-3 transition ${
                    active ? "bg-rocket-500 text-ink-950 shadow-pop" : "text-slate-400 hover:bg-white/5"
                  }`}
                >
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${active ? "text-ink-950/70" : "text-slate-500"}`}>{day}</span>
                  <span className={`font-display text-lg font-semibold ${active ? "text-ink-950" : "text-slate-200"}`}>{date}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${has ? (active ? "bg-ink-950" : "bg-sky-400") : "bg-transparent"}`} />
                </button>
              );
            })}
          </div>
          <div className="mt-3 border-t border-white/5 pt-3">
            {dayEvents.length === 0 ? (
              <p className="px-2 py-2 text-sm text-slate-500">Nothing scheduled. A rare rest day for the Rockets.</p>
            ) : (
              <ul className="divide-y divide-white/5">
                {dayEvents.map((e) => (
                  <li key={e.id} className="flex flex-wrap items-center justify-between gap-2 px-2 py-2.5">
                    <div className="flex items-center gap-3">
                      <Badge tone={eventTone[e.type]}>{eventLabel[e.type]}</Badge>
                      <span className="text-sm font-semibold text-white">{e.title}</span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {e.time} · {e.location}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </Card>
      </section>

      <p className="flex flex-col items-center justify-center gap-2 text-center text-sm text-slate-500 sm:flex-row">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-zest-400" />
          Your family's info is private to the Rockets.
        </span>
        <a href="#" className="font-semibold text-slate-300 hover:underline">
          Privacy settings
        </a>
      </p>
    </div>
  );
}
