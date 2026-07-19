import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const PARENT_NAV = [
  { to: "/parent", icon: "solar:home-angle-linear", label: "Home", exact: true },
  { to: "/parent/schedule", icon: "solar:calendar-linear", label: "Schedule" },
  { to: "/parent/rsvp", icon: "solar:check-circle-linear", label: "RSVP" },
  { to: "/parent/messages", icon: "solar:chat-round-line-linear", label: "Messages", badge: 2 },
  { to: "/parent/roster", icon: "solar:users-group-rounded-linear", label: "Roster" },
  { to: "/parent/photos", icon: "solar:gallery-linear", label: "Photos", badge: 3 },
  { to: "/parent/volunteers", icon: "solar:hand-stars-linear", label: "Volunteer & Snacks" },
  { to: "/parent/replay", icon: "solar:play-circle-linear", label: "Practice Recap" },
  { to: "/parent/wallet", icon: "solar:wallet-linear", label: "Family Wallet" },
];

const COACH_NAV = [
  { to: "/coach", icon: "solar:home-angle-linear", label: "Sideline Board", exact: true },
  { to: "/coach/calendar", icon: "solar:calendar-linear", label: "Calendar" },
  { to: "/coach/attendance", icon: "solar:check-circle-linear", label: "Attendance" },
  { to: "/coach/messages", icon: "solar:chat-round-line-linear", label: "Messages" },
  { to: "/coach/replay", icon: "solar:play-circle-linear", label: "Parent Replay" },
  { to: "/coach/rookie-assist", icon: "solar:star-linear", label: "Rookie Assist" },
  { to: "/coach/ai-workspace", icon: "solar:magic-stick-linear", label: "AI Workspace" },
  { to: "/coach/roster", icon: "solar:users-group-rounded-linear", label: "Roster" },
  { to: "/coach/weather", icon: "solar:sun-linear", label: "Weather & Fields" },
];

const ADMIN_NAV = [
  { to: "/admin", icon: "solar:home-angle-linear", label: "Overview", exact: true },
  { to: "/admin/registrations", icon: "solar:user-plus-linear", label: "Registrations", badge: 2 },
  { to: "/admin/family-access", icon: "solar:shield-user-linear", label: "Family Access" },
  { to: "/admin/teams", icon: "solar:users-group-rounded-linear", label: "Teams & Seasons" },
  { to: "/admin/imports", icon: "solar:upload-linear", label: "Imports" },
  { to: "/admin/invitations", icon: "solar:letter-linear", label: "Invitations" },
  { to: "/admin/schedule", icon: "solar:calendar-linear", label: "Schedule & Venues" },
  { to: "/admin/communications", icon: "solar:chat-round-dots-linear", label: "Communications" },
  { to: "/admin/safety", icon: "solar:shield-warning-linear", label: "Safety & Weather" },
  { to: "/admin/media", icon: "solar:gallery-edit-linear", label: "Media Review" },
  { to: "/admin/sponsors", icon: "solar:hand-money-linear", label: "Sponsors & Finance" },
  { to: "/admin/branding", icon: "solar:palette-linear", label: "Branding" },
  { to: "/admin/reports", icon: "solar:document-text-linear", label: "Reports" },
  { to: "/admin/security", icon: "solar:lock-password-linear", label: "Security & Audit" },
];

function NavItem({ to, icon, label, badge, exact }) {
  return (
    <NavLink
      to={to}
      end={exact}
      className={({ isActive }) =>
        `flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors min-h-[44px] ${
          isActive
            ? "shadow-sm border font-medium relative before:absolute before:left-0 before:inset-y-1.5 before:w-1 before:bg-cyan-600 before:rounded-r-full text-emerald-100 bg-black/70 border-black/50"
            : "text-emerald-300 hover:text-emerald-100 hover:bg-black/50"
        }`
      }
    >
      <span className="flex items-center gap-3">
        <iconify-icon icon={icon} width="20" />
        {label}
      </span>
      {badge != null && (
        <span className="bg-sky-500 text-xs font-medium px-1.5 py-0.5 rounded-full min-w-[20px] text-center shadow-sm text-black">
          {badge}
        </span>
      )}
    </NavLink>
  );
}

export default function Sidebar() {
  const { user, team, switchRole } = useApp();
  const navigate = useNavigate();

  const navItems =
    user.activeRole === "parent"
      ? PARENT_NAV
      : user.activeRole === "coach"
      ? COACH_NAV
      : ADMIN_NAV;

  function handleRoleSwitch(role) {
    switchRole(role);
    navigate(role === "parent" ? "/parent" : role === "coach" ? "/coach" : "/admin");
  }

  return (
    <aside className="hidden md:flex w-60 flex-col fixed inset-y-0 top-8 left-0 border-r shadow-[inset_-1px_0_0_rgba(0,0,0,0.03)] z-40 overflow-hidden border-emerald-800/60">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/variants/f9c13282-71c2-4d97-a6d2-371f81f5480b/800w.jpg"
          className="w-full h-full object-cover opacity-60"
          alt=""
        />
        <div className="absolute inset-0 backdrop-blur-2xl bg-black/60" />
      </div>

      <div className="relative z-10 flex flex-col h-full w-full">
        {/* Team header */}
        <div className="p-6 border-b border-black/40">
          <div className="flex items-center gap-3 mb-3">
            <div
              className="flex items-center justify-center rounded-md size-9 text-lg tracking-tight font-semibold shadow-sm bg-cyan-400 text-black"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {team.initials}
            </div>
            <div>
              <h1
                className="text-base font-semibold tracking-tight text-emerald-100"
                style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
              >
                {team.name}
              </h1>
              <p className="text-xs font-medium text-emerald-400">{team.division}</p>
            </div>
          </div>

          {/* Role switcher */}
          {user.roles.length > 1 && (
            <div className="flex gap-1 mt-2">
              {user.roles.map((role) => (
                <button
                  key={role}
                  onClick={() => handleRoleSwitch(role)}
                  className={`flex-1 text-xs px-2 py-1 rounded-md capitalize font-medium transition-colors ${
                    user.activeRole === role
                      ? "bg-cyan-400 text-black"
                      : "text-emerald-400 hover:text-emerald-100 bg-black/30 hover:bg-black/50"
                  }`}
                >
                  {role}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto flex flex-col gap-1 hide-scrollbar z-0 pt-4 pr-3 pb-4 pl-3 relative">
          <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
            <img
              src="https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/11086022-668b-449b-8759-f5d27a0f6992_800w.jpg"
              className="w-full h-full object-cover opacity-30 blur-md scale-110"
              alt=""
            />
          </div>
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} />
          ))}
        </nav>

        {/* User footer */}
        <div className="p-4 border-t border-black/40 bg-black/20">
          <div className="flex items-center justify-between px-3 py-2 rounded-lg group hover:bg-black/40 transition-colors">
            <div className="flex items-center gap-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="size-8 rounded-full border-2 shadow-sm object-cover border-black/90"
              />
              <div className="flex flex-col">
                <span className="text-sm font-semibold leading-tight text-emerald-100">
                  {user.name}
                </span>
                <span className="text-xs font-medium text-emerald-400 capitalize">
                  {user.activeRole}
                </span>
              </div>
            </div>
            <iconify-icon icon="solar:settings-linear" width="20" className="text-emerald-500" />
          </div>
        </div>
      </div>
    </aside>
  );
}
