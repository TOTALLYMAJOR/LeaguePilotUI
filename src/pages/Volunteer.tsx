import { useState } from "react";
import { Camera, Check, Cookie, HeartHandshake, Shield, Sun, Wrench } from "lucide-react";
import { Badge, Card, PageHeader, ProgressBar, SectionTitle } from "../components/ui";
import { team, volunteerSlots as seed, type VolunteerSlot } from "../data/team";

const roleMeta: Record<string, { icon: typeof Cookie; tone: string; blurb: string }> = {
  Snacks: { icon: Cookie, tone: "text-zest-400 bg-zest-500/15 ring-zest-500/30", blurb: "Feed 14 Rockets + 2 coaches. Nut-free, please." },
  "Dugout parent": { icon: Shield, tone: "text-sky-400 bg-sky-400/15 ring-sky-400/30", blurb: "Keep helmets on heads and kids in batting order." },
  "Team photographer": { icon: Camera, tone: "text-candy-400 bg-candy-500/15 ring-candy-500/30", blurb: "Snap the action, upload to Photos after." },
  "Field setup": { icon: Wrench, tone: "text-rocket-400 bg-rocket-500/15 ring-rocket-500/30", blurb: "Bases, tee, and the orange flags. Arrive 30 min early." },
  "Pool party host": { icon: Sun, tone: "text-violet-400 bg-violet-500/15 ring-violet-500/30", blurb: "Bring the floaties and a very big cooler." },
};

export default function Volunteer() {
  const [slots, setSlots] = useState<VolunteerSlot[]>(seed);

  const filled = slots.filter((s) => s.family).length;
  const mine = slots.filter((s) => s.family === team.family);
  const open = slots.filter((s) => !s.family);

  const toggle = (id: string) =>
    setSlots((all) =>
      all.map((s) =>
        s.id === id ? { ...s, family: s.family === team.family ? null : s.family ? s.family : team.family } : s,
      ),
    );

  const byDate = slots.reduce<Record<string, VolunteerSlot[]>>((acc, s) => {
    (acc[s.date] ||= []).push(s);
    return acc;
  }, {});

  return (
    <div>
      <PageHeader
        title="Volunteer & Snacks"
        subtitle="Many hands make light work, and many orange slices make happy Rockets."
        badge={<Badge tone={open.length ? "rocket" : "zest"}>{open.length ? `${open.length} open slots` : "Every slot filled"}</Badge>}
      />

      <div className="mb-6 grid gap-4 lg:grid-cols-3">
        <Card glow="zest" className="animate-rise delay-1 p-6 lg:col-span-2">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-zest-500/15 ring-1 ring-zest-500/30">
              <HeartHandshake className="h-5 w-5 text-zest-400" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-zest-300">July coverage</p>
              <h3 className="font-display text-xl font-semibold text-white">
                {filled} of {slots.length} slots have a hero
              </h3>
            </div>
          </div>
          <ProgressBar value={filled} max={slots.length} color="bg-zest-400" className="mt-5" />
          <p className="mt-3 text-sm text-slate-400">
            Tap "I'll do it" on any open slot. Tap again to give it back. Coach gets a heads-up either way.
          </p>
        </Card>

        <Card glow="rocket" className="animate-rise delay-2 p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-rocket-300">Your slots</p>
          {mine.length === 0 ? (
            <p className="mt-2 text-sm text-slate-400">Nothing yet. Grab one below.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {mine.map((s) => (
                <li key={s.id} className="flex items-center gap-2 rounded-xl bg-white/5 px-3 py-2 text-sm ring-1 ring-white/10">
                  <Check className="h-4 w-4 text-zest-400" strokeWidth={3} />
                  <span className="font-semibold text-white">{s.role}</span>
                  <span className="ml-auto text-xs text-slate-400">{s.date}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <SectionTitle eyebrow="Sign-up board" title="Who's bringing what" />
      <div className="space-y-4">
        {Object.entries(byDate).map(([date, list], i) => (
          <Card key={date} className={`animate-rise p-5 ${["delay-1", "delay-2", "delay-3"][i % 3]}`}>
            <h3 className="font-display text-lg font-semibold text-white">{date}</h3>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {list.map((s) => {
                const meta = roleMeta[s.role];
                const Icon = meta.icon;
                const isMine = s.family === team.family;
                const taken = !!s.family && !isMine;
                return (
                  <li
                    key={s.id}
                    className={`flex flex-col gap-3 rounded-2xl p-4 ring-1 transition ${
                      isMine ? "bg-zest-500/10 ring-zest-500/40" : "bg-white/5 ring-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ring-1 ${meta.tone}`}>
                        <Icon className="h-5 w-5" />
                      </span>
                      <div className="min-w-0">
                        <p className="font-semibold text-white">{s.role}</p>
                        <p className="text-xs text-slate-400">{meta.blurb}</p>
                      </div>
                    </div>
                    <div className="mt-auto flex items-center justify-between gap-2">
                      <span className={`text-xs font-semibold ${s.family ? "text-slate-300" : "text-rocket-300"}`}>
                        {s.family ?? "Needs a hero"}
                      </span>
                      <button
                        onClick={() => toggle(s.id)}
                        disabled={taken}
                        className={`min-h-[36px] rounded-lg px-3 text-xs font-semibold transition ${
                          isMine
                            ? "bg-zest-400 text-ink-950 hover:bg-zest-300"
                            : taken
                              ? "cursor-not-allowed bg-white/5 text-slate-500"
                              : "bg-rocket-500 text-ink-950 shadow-pop hover:bg-rocket-400"
                        }`}
                      >
                        {isMine ? "You're on it" : taken ? "Covered" : "I'll do it"}
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
