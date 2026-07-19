import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

const PARENT_NAV = [
  { to: "/parent", icon: "solar:home-angle-linear", label: "Home", exact: true },
  { to: "/parent/schedule", icon: "solar:calendar-linear", label: "Schedule" },
  { to: "/parent/rsvp", icon: "solar:check-circle-linear", label: "RSVP" },
  { to: "/parent/messages", icon: "solar:chat-round-line-linear", label: "Messages" },
  { to: "/parent/roster", icon: "solar:users-group-rounded-linear", label: "Roster" },
  { to: "/parent/photos", icon: "solar:gallery-linear", label: "Photos" },
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
  { to: "/admin/registrations", icon: "solar:user-plus-linear", label: "Registrations" },
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

export default function MobileHeader() {
  const { user, team, switchRole } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const navItems =
    user.activeRole === "parent" ? PARENT_NAV
    : user.activeRole === "coach" ? COACH_NAV
    : ADMIN_NAV;

  function handleRoleSwitch(role) {
    switchRole(role);
    navigate(role === "parent" ? "/parent" : role === "coach" ? "/coach" : "/admin");
    setMenuOpen(false);
  }

  return (
    <>
      <header className="md:hidden sticky top-8 z-40 backdrop-blur-md border-b px-4 h-14 flex items-center justify-between bg-black/80 border-emerald-800">
        <div className="flex items-center gap-3">
          <div
            className="flex items-center justify-center rounded-full size-8 tracking-tight font-semibold shadow-sm bg-cyan-400 text-black"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            {team.initials}
          </div>
          <div>
            <h1
              className="text-sm font-semibold tracking-tight text-emerald-100"
              style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
            >
              {team.name}
            </h1>
            <p className="text-xs text-emerald-500 capitalize">{user.activeRole}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="relative text-emerald-500 transition-colors flex items-center justify-center min-h-[44px] min-w-[44px] hover:text-emerald-100"
            aria-label="Notifications"
          >
            <iconify-icon icon="solar:bell-linear" width="22" />
            <span className="absolute top-2 right-2 flex size-2.5 bg-sky-500 rounded-full border-2 border-black" />
          </button>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="text-emerald-400 flex items-center justify-center min-h-[44px] min-w-[44px] hover:text-emerald-100"
            aria-label="Menu"
          >
            <iconify-icon icon={menuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} width="22" />
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[88px] z-30 bg-black/95 overflow-y-auto">
          <div className="p-4 flex flex-col gap-1">
            {/* Role switcher */}
            {user.roles.length > 1 && (
              <div className="flex gap-2 mb-4">
                {user.roles.map((role) => (
                  <button
                    key={role}
                    onClick={() => handleRoleSwitch(role)}
                    className={`flex-1 py-2 rounded-lg text-sm capitalize font-medium transition-colors ${
                      user.activeRole === role
                        ? "bg-cyan-400 text-black"
                        : "bg-black/40 text-emerald-400 border border-emerald-800"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
            )}
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.exact}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-emerald-950 text-emerald-100 border border-emerald-800"
                      : "text-emerald-300 hover:bg-black/50 hover:text-emerald-100"
                  }`
                }
              >
                <iconify-icon icon={item.icon} width="20" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
