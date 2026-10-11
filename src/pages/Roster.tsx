import { useState } from "react";
import { Cookie, Megaphone, Search, Sparkles } from "lucide-react";
import { Avatar, Badge, Card, PageHeader, SectionTitle } from "../components/ui";
import { players, team } from "../data/team";

const coaches = [
  { name: team.coach, role: "Head coach", initials: "CM", color: "bg-rocket-500", fact: "Has never lost a game of rock-paper-scissors to a 6-year-old. Allegedly." },
  { name: team.assistant, role: "Assistant coach", initials: "CD", color: "bg-sky-500", fact: "Runs the tee station and the official high-five counter." },
];

export default function Roster() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const list = players.filter(
    (p) => !q || p.name.toLowerCase().includes(q) || p.position.toLowerCase().includes(q) || String(p.number) === q,
  );

  return (
    <div>
      <PageHeader
        title="Roster"
        subtitle={`${players.length} Rockets, 2 coaches, one very loud dugout. Tap a card to learn a superpower.`}
        badge={
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search name, number, position"
              className="h-11 w-full rounded-xl border border-white/10 bg-ink-900/80 pl-10 pr-3 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-400/60 focus:outline-none"
            />
          </div>
        }
      />

      <section className="mb-8">
        <SectionTitle eyebrow="Flight crew" title="Coaches" />
        <div className="grid gap-4 sm:grid-cols-2">
          {coaches.map((c, i) => (
            <Card key={c.name} glow={i === 0 ? "rocket" : "sky"} className={`animate-rise p-5 ${i === 0 ? "delay-1" : "delay-2"}`}>
              <div className="flex items-start gap-4">
                <Avatar initials={c.initials} color={c.color} size="lg" />
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-display text-lg font-semibold text-white">{c.name}</h3>
                    <Badge tone={i === 0 ? "rocket" : "sky"}>
                      <Megaphone className="h-3 w-3" /> {c.role}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-slate-400">{c.fact}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Rockets"
          title="Players"
          description="Jersey numbers, favorite spots on the field, and the snack that gets them running."
        />
        {list.length === 0 ? (
          <Card className="p-8 text-center text-sm text-slate-400">No Rockets match "{query}". Try a number or a position.</Card>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {list.map((p, i) => (
              <div key={p.id} className={`group animate-rise ${["delay-1", "delay-2", "delay-3", "delay-4"][i % 4]}`}>
                <Card className="h-full p-4 transition hover:-translate-y-1 hover:ring-white/25">
                  <div className="flex items-start justify-between">
                    <div className={`flex h-14 w-14 items-center justify-center rounded-2xl font-display text-2xl font-bold text-ink-950 shadow-lg ${p.color}`}>
                      {p.number}
                    </div>
                    {p.id === "p1" && <Badge tone="zest">Your kid</Badge>}
                  </div>
                  <h3 className="mt-3 font-display text-lg font-semibold text-white">{p.name}</h3>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{p.position}</p>
                  <div className="mt-3 space-y-1.5 text-xs text-slate-300">
                    <p className="flex items-start gap-1.5">
                      <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-candy-400" />
                      {p.superpower}
                    </p>
                    <p className="flex items-start gap-1.5">
                      <Cookie className="mt-0.5 h-3.5 w-3.5 shrink-0 text-zest-400" />
                      {p.snack}
                    </p>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
