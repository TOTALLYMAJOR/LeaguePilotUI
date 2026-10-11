import { useState } from "react";
import {
  Cloud,
  CloudSun,
  Eye,
  EyeOff,
  Grid3x3,
  Layers,
  MapPin,
  Maximize2,
  Move,
  Rocket,
  RotateCw,
  Search,
  Shirt,
  Timer,
  ZoomIn,
} from "lucide-react";
import { events, players, team } from "../data/team";
import { ProgressBar } from "./ui";

const nextGame = events.find((e) => e.type === "game")!;
const lineup = players.slice(0, 9);

const positions: Record<string, { x: number; y: number }> = {
  Catcher: { x: 50, y: 86 },
  "Pitcher's circle": { x: 50, y: 58 },
  "First base": { x: 74, y: 62 },
  "Second base": { x: 50, y: 34 },
  "Third base": { x: 26, y: 62 },
  Shortstop: { x: 36, y: 44 },
  Outfield: { x: 60, y: 18 },
};

export default function MissionControl() {
  const [hidden, setHidden] = useState<Record<string, boolean>>({});
  const [tool, setTool] = useState("move");

  const toggle = (id: string) => setHidden((h) => ({ ...h, [id]: !h[id] }));
  const visibleLineup = lineup.filter((p) => !hidden[p.id]);
  const total = nextGame.rsvp.yes + nextGame.rsvp.no + nextGame.rsvp.pending;

  const tools = [
    { id: "move", icon: Move, label: "Move" },
    { id: "rotate", icon: RotateCw, label: "Rotate" },
    { id: "zoom", icon: ZoomIn, label: "Zoom" },
    { id: "grid", icon: Grid3x3, label: "Grid" },
    { id: "fit", icon: Maximize2, label: "Fit" },
  ];

  return (
    <div className="tilt-stage animate-rise delay-2 w-full">
      <div className="tilt-panel relative w-full">
        <div className="relative flex min-h-[560px] select-none flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#050711] shadow-glow md:h-[540px] md:flex-row">
          {/* Left: lineup "layers" panel */}
          <div className="order-2 border-t border-white/5 bg-ink-900/90 p-3 md:order-1 md:w-[230px] md:border-r md:border-t-0">
            <div className="flex items-center justify-between px-1">
              <p className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Layers className="h-3.5 w-3.5 text-sky-400" />
                Lineup
              </p>
              <span className="rounded border border-sky-400/20 bg-sky-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300">
                {visibleLineup.length} on field
              </span>
            </div>
            <div className="relative my-2">
              <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search players..."
                className="w-full rounded-lg border border-white/5 bg-ink-800 py-1.5 pl-8 pr-2 text-[11px] font-medium text-slate-200 placeholder:text-slate-500 focus:border-sky-400/50 focus:outline-none"
              />
            </div>
            <ul className="grid grid-cols-2 gap-0.5 md:block">
              {lineup.map((p) => {
                const off = !!hidden[p.id];
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => toggle(p.id)}
                      className={`flex w-full items-center justify-between rounded-lg px-2 py-1.5 text-left text-xs transition-colors hover:bg-white/5 ${
                        off ? "text-slate-600" : "text-slate-200"
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span
                          className={`flex h-5 w-5 items-center justify-center rounded-md font-display text-[10px] font-bold text-ink-950 ${
                            off ? "bg-slate-600" : p.color
                          }`}
                        >
                          {p.number}
                        </span>
                        <span className="font-medium">{p.name}</span>
                      </span>
                      {off ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5 text-slate-500" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Center: field viewport */}
          <div className="viewport-grid relative order-1 min-h-[360px] flex-1 md:order-2">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(77,216,255,0.12),transparent_55%)]" />

            {/* HUD top */}
            <div className="absolute left-3 top-3 z-10 flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-lg border border-white/10 bg-ink-900/80 px-2.5 py-1 text-[11px] font-semibold text-slate-200 backdrop-blur">
                <span className="animate-blip h-1.5 w-1.5 rounded-full bg-zest-400" />
                {nextGame.location}
              </span>
              <span className="hidden rounded-lg border border-white/10 bg-ink-900/80 px-2.5 py-1 text-[11px] font-medium text-slate-400 backdrop-blur sm:block">
                Live view
              </span>
            </div>
            <div className="absolute right-3 top-3 z-10 rounded-lg border border-rocket-500/30 bg-rocket-500/15 px-2.5 py-1 font-display text-[11px] font-semibold text-rocket-300 backdrop-blur">
              {nextGame.weekday} {nextGame.time}
            </div>

            {/* Diamond */}
            <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full" aria-hidden="true">
              <defs>
                <linearGradient id="grass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1C3A2A" />
                  <stop offset="100%" stopColor="#0F2219" />
                </linearGradient>
              </defs>
              <path d="M50 96 L4 50 A60 60 0 0 1 96 50 Z" fill="url(#grass)" opacity="0.9" />
              <path d="M50 92 L18 60 L50 28 L82 60 Z" fill="#6B4A2B" opacity="0.65" />
              <path d="M50 88 L22 60 L50 32 L78 60 Z" fill="#2E5B3F" />
              <circle cx="50" cy="58" r="7" fill="#6B4A2B" opacity="0.8" />
              {[
                [50, 88],
                [22, 60],
                [50, 32],
                [78, 60],
              ].map(([x, y], i) => (
                <rect key={i} x={x - 2.4} y={y - 2.4} width="4.8" height="4.8" fill="#F8FAFC" transform={`rotate(45 ${x} ${y})`} />
              ))}
              <path d="M50 88 L22 60 L50 32 L78 60 Z" fill="none" stroke="#F8FAFC" strokeWidth="0.6" strokeDasharray="2 2" opacity="0.6" />
            </svg>

            {/* Players on field */}
            {visibleLineup.map((p) => {
              const pos = positions[p.position] ?? { x: 50, y: 50 };
              const jitter = (p.number % 4) * 5 - 7;
              return (
                <div
                  key={p.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-500"
                  style={{ left: `${pos.x + jitter}%`, top: `${pos.y}%` }}
                >
                  <div className={`flex h-7 w-7 items-center justify-center rounded-full font-display text-[11px] font-bold text-ink-950 shadow-lg ring-2 ring-ink-950 ${p.color}`}>
                    {p.number}
                  </div>
                </div>
              );
            })}

            {/* Rocket mascot */}
            <div className="absolute right-[12%] top-[22%]">
              <div className="animate-floaty">
                <Rocket className="h-14 w-14 text-rocket-400 drop-shadow-[0_0_18px_rgba(255,122,26,0.6)]" strokeWidth={1.75} />
              </div>
              <div className="absolute -left-10 top-14 h-24 w-24 animate-orbit rounded-full border border-dashed border-sky-400/30">
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-sky-400" />
              </div>
            </div>

            {/* HUD bottom toolbar */}
            <div className="absolute bottom-3 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 rounded-xl border border-white/10 bg-ink-900/90 p-1 backdrop-blur">
              {tools.map(({ id, icon: Icon, label }) => (
                <button
                  key={id}
                  onClick={() => setTool(id)}
                  title={label}
                  className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${
                    tool === id ? "bg-sky-400 text-ink-950" : "text-slate-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: properties panel */}
          <div className="order-3 border-t border-white/5 bg-ink-900/90 p-4 md:w-[240px] md:border-l md:border-t-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Game details</p>
            <h3 className="mt-1 font-display text-lg font-semibold leading-tight text-white">{nextGame.title}</h3>

            <dl className="mt-4 space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <Timer className="mt-0.5 h-4 w-4 shrink-0 text-rocket-400" />
                <div>
                  <dt className="text-slate-500">Arrive by</dt>
                  <dd className="font-semibold text-slate-100">{nextGame.arrive} · first pitch {nextGame.time}</dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-sky-400" />
                <div>
                  <dt className="text-slate-500">Where</dt>
                  <dd className="font-semibold text-slate-100">
                    {nextGame.location} · {nextGame.address}
                  </dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Shirt className="mt-0.5 h-4 w-4 shrink-0 text-candy-400" />
                <div>
                  <dt className="text-slate-500">Wear</dt>
                  <dd className="font-semibold text-slate-100">{team.jerseyColor} jersey, cap, cleats</dd>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <CloudSun className="mt-0.5 h-4 w-4 shrink-0 text-zest-400" />
                <div>
                  <dt className="text-slate-500">Forecast</dt>
                  <dd className="font-semibold text-slate-100">Partly cloudy · 78°F</dd>
                </div>
              </div>
            </dl>

            <div className="mt-5 rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-200">Rockets confirmed</span>
                <span className="font-display font-semibold text-zest-400">
                  {nextGame.rsvp.yes}/{total}
                </span>
              </div>
              <ProgressBar value={nextGame.rsvp.yes} max={total} color="bg-zest-400" className="mt-2" />
              <p className="mt-2 text-[11px] text-slate-500">
                {nextGame.rsvp.pending} families still deciding
              </p>
            </div>

            <div className="mt-3 flex items-center gap-2 text-[11px] text-slate-500">
              <Cloud className="h-3.5 w-3.5" />
              Hourly forecast updates Friday night
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
