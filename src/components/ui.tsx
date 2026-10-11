import type { ReactNode } from "react";
import type { EventType } from "../data/team";

export function Card({
  children,
  className = "",
  glow,
}: {
  children: ReactNode;
  className?: string;
  glow?: "sky" | "rocket" | "candy" | "zest" | "violet";
}) {
  const glowClass = {
    sky: "from-sky-400/25 to-sky-400/0",
    rocket: "from-rocket-500/25 to-rocket-500/0",
    candy: "from-candy-500/25 to-candy-500/0",
    zest: "from-zest-500/25 to-zest-500/0",
    violet: "from-violet-500/25 to-violet-500/0",
  };
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-ink-900/80 ring-1 ring-white/10 shadow-lg backdrop-blur-sm transition-transform duration-300 ${className}`}
    >
      {glow && (
        <div
          className={`pointer-events-none absolute -left-12 -top-16 h-56 w-56 rounded-full bg-gradient-to-tr ${glowClass[glow]} blur-2xl`}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-400">{eyebrow}</p>
        )}
        <h2 className="font-display text-2xl font-semibold tracking-tight text-white sm:text-3xl">{title}</h2>
        {description && <p className="mt-1 max-w-[65ch] text-sm text-slate-400">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHeader({
  title,
  subtitle,
  badge,
}: {
  title: string;
  subtitle: string;
  badge?: ReactNode;
}) {
  return (
    <div className="animate-rise mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h1>
        <p className="mt-1 text-sm text-slate-400 sm:text-base">{subtitle}</p>
      </div>
      {badge}
    </div>
  );
}

const badgeTones = {
  sky: "bg-sky-400/15 text-sky-300 ring-sky-400/30",
  rocket: "bg-rocket-500/15 text-rocket-300 ring-rocket-500/30",
  candy: "bg-candy-500/15 text-candy-300 ring-candy-500/30",
  zest: "bg-zest-500/15 text-zest-300 ring-zest-500/30",
  violet: "bg-violet-500/15 text-violet-300 ring-violet-500/30",
  neutral: "bg-white/5 text-slate-300 ring-white/10",
};

export type Tone = keyof typeof badgeTones;

export function Badge({
  children,
  tone = "neutral",
  className = "",
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${badgeTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function ProgressBar({
  value,
  max = 100,
  color = "bg-sky-400",
  className = "",
}: {
  value: number;
  max?: number;
  color?: string;
  className?: string;
}) {
  const pct = Math.max(0, Math.min(100, Math.round((value / max) * 100)));
  return (
    <div className={`h-2.5 w-full overflow-hidden rounded-full bg-white/10 ${className}`}>
      <div
        className={`h-full rounded-full ${color} transition-[width] duration-700`}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function Avatar({
  initials,
  color = "bg-sky-500",
  size = "md",
  className = "",
}: {
  initials: string;
  color?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const sizes = { sm: "h-7 w-7 text-[10px]", md: "h-9 w-9 text-xs", lg: "h-12 w-12 text-sm" };
  return (
    <div
      className={`flex shrink-0 items-center justify-center rounded-full font-display font-semibold text-ink-950 ring-2 ring-ink-900 ${color} ${sizes[size]} ${className}`}
    >
      {initials}
    </div>
  );
}

export const eventTone: Record<EventType, Tone> = {
  game: "rocket",
  practice: "sky",
  event: "candy",
};

export const eventLabel: Record<EventType, string> = {
  game: "Game",
  practice: "Practice",
  event: "Team event",
};

export function Stat({
  label,
  value,
  hint,
  tone = "sky",
}: {
  label: string;
  value: string;
  hint?: string;
  tone?: Tone;
}) {
  const text = {
    sky: "text-sky-400",
    rocket: "text-rocket-400",
    candy: "text-candy-400",
    zest: "text-zest-400",
    violet: "text-violet-400",
    neutral: "text-white",
  }[tone];
  return (
    <div className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{label}</p>
      <p className={`mt-1 font-display text-2xl font-semibold ${text}`}>{value}</p>
      {hint && <p className="mt-0.5 text-xs text-slate-500">{hint}</p>}
    </div>
  );
}
