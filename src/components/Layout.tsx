import { NavLink, Outlet, useLocation } from "react-router-dom";
import {
  Bell,
  CalendarDays,
  HeartHandshake,
  Home,
  Image,
  Megaphone,
  MessageCircle,
  Rocket,
  Settings,
  Users,
} from "lucide-react";
import { team, tickerItems, threads, photos } from "../data/team";
import { Avatar, ProgressBar } from "./ui";

const unreadCount = threads.filter((t) => t.unread).length;
const newPhotoCount = photos.filter((p) => p.isNew).length;

const navItems = [
  { to: "/", label: "Home", short: "Home", icon: Home },
  { to: "/schedule", label: "Schedule", short: "Schedule", icon: CalendarDays },
  { to: "/roster", label: "Roster", short: "Roster", icon: Users },
  { to: "/messages", label: "Messages", short: "Msgs", icon: MessageCircle, badge: unreadCount, tone: "bg-candy-500" },
  { to: "/photos", label: "Photos", short: "Photos", icon: Image, badge: newPhotoCount, tone: "bg-sky-400" },
  { to: "/volunteer", label: "Volunteer & Snacks", short: "Help", icon: HeartHandshake },
];

const pageTitles: Record<string, string> = {
  "/": "Home",
  "/schedule": "Schedule",
  "/roster": "Roster",
  "/messages": "Messages",
  "/photos": "Photos",
  "/volunteer": "Volunteer & Snacks",
};

function Ticker() {
  const items = [...tickerItems, ...tickerItems];
  return (
    <div className="fixed inset-x-0 top-0 z-50 flex h-8 items-center overflow-hidden bg-zest-500 text-ink-950">
      <div className="animate-ticker flex w-max whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center gap-2 px-8 text-xs font-semibold tracking-wide">
            <Megaphone className="h-3.5 w-3.5 shrink-0" />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rocket-400 to-candy-500 shadow-pop">
        <Rocket className="h-5 w-5 -rotate-12 text-ink-950" strokeWidth={2.5} />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-zest-400 ring-2 ring-ink-950" />
      </div>
      <div>
        <p className="font-display text-base font-semibold leading-tight text-white">{team.name}</p>
        {!compact && (
          <p className="text-[11px] font-medium text-sky-400">
            {team.division} · {team.season}
          </p>
        )}
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 top-8 z-40 hidden w-64 flex-col border-r border-white/5 bg-ink-900/80 backdrop-blur-xl md:flex">
      <div className="border-b border-white/5 p-5">
        <Logo />
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3 hide-scrollbar">
        {navItems.map(({ to, label, icon: Icon, badge, tone }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `group relative flex min-h-[44px] items-center justify-between rounded-xl px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white/10 text-white ring-1 ring-white/10 before:absolute before:inset-y-2 before:left-0 before:w-1 before:rounded-r-full before:bg-rocket-400"
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`
            }
          >
            <span className="flex items-center gap-3">
              <Icon className="h-[18px] w-[18px] group-hover:animate-wiggle" />
              {label}
            </span>
            {badge ? (
              <span className={`min-w-[20px] rounded-full px-1.5 py-0.5 text-center text-[11px] font-bold text-ink-950 ${tone}`}>
                {badge}
              </span>
            ) : null}
          </NavLink>
        ))}

        <div className="mt-4 rounded-2xl bg-gradient-to-br from-sky-400/15 to-violet-500/10 p-4 ring-1 ring-white/10">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">Season progress</p>
            <span className="font-display text-sm font-semibold text-white">
              {team.record.played}/{team.record.total}
            </span>
          </div>
          <ProgressBar value={team.record.played} max={team.record.total} color="bg-sky-400" className="mt-2" />
          <p className="mt-2 text-[11px] text-slate-400">
            We don't keep score in 6U, but we count high-fives:{" "}
            <span className="font-semibold text-zest-400">{team.record.highFives}</span>
          </p>
        </div>
      </nav>

      <div className="border-t border-white/5 p-3">
        <button className="flex min-h-[44px] w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="flex items-center">
              <Avatar initials="S" color="bg-candy-400" className="relative z-10" />
              <Avatar initials="J" color="bg-rocket-400" size="sm" className="-ml-2" />
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight text-white">{team.family}</p>
              <span className="mt-0.5 inline-block rounded border border-sky-400/30 bg-sky-400/10 px-1.5 py-0.5 text-[10px] font-semibold text-sky-300">
                Family plan
              </span>
            </div>
          </div>
          <Settings className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </aside>
  );
}

function MobileHeader({ title }: { title: string }) {
  return (
    <header className="sticky top-8 z-40 flex h-14 items-center justify-between border-b border-white/5 bg-ink-950/80 px-4 backdrop-blur-xl md:hidden">
      <Logo compact />
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs font-semibold text-slate-300 ring-1 ring-white/10">
          {title}
        </span>
        <button className="relative flex h-10 w-10 items-center justify-center rounded-full text-slate-300 hover:bg-white/5">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-candy-500 ring-2 ring-ink-950" />
        </button>
      </div>
    </header>
  );
}

function BottomNav() {
  return (
    <nav className="pb-safe fixed inset-x-0 bottom-0 z-40 flex h-16 items-center justify-between border-t border-white/5 bg-ink-900/95 px-1 backdrop-blur-xl md:hidden">
      {navItems.map(({ to, short, icon: Icon, badge, tone }) => (
        <NavLink
          key={to}
          to={to}
          end={to === "/"}
          className={({ isActive }) =>
            `relative flex h-full w-full flex-col items-center justify-center gap-1 text-[10px] font-semibold transition-colors ${
              isActive ? "text-rocket-400" : "text-slate-500 hover:text-white"
            }`
          }
        >
          <Icon className="h-5 w-5" />
          {short}
          {badge ? (
            <span className={`absolute right-2 top-2 h-2 w-2 rounded-full ring-2 ring-ink-900 ${tone}`} />
          ) : null}
        </NavLink>
      ))}
    </nav>
  );
}

export default function Layout() {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] ?? "Rockets";

  return (
    <div className="bg-stars min-h-screen overflow-x-hidden pt-8 text-slate-100">
      <Ticker />
      <Sidebar />
      <MobileHeader title={title} />
      <main className="mx-auto w-full max-w-6xl px-4 pb-28 pt-6 md:pl-72 md:pr-8 md:pb-16 md:pt-10">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
