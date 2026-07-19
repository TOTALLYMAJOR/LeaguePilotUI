import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";

const SURFACES = [
  { label: "Navigation", contrast: "pass" },
  { label: "Mobile header", contrast: "pass" },
  { label: "Team portal", contrast: "pass" },
  { label: "Messages", contrast: "pass" },
  { label: "Sponsor docs", contrast: "warn" },
  { label: "Game-day", contrast: "pass" },
];

export default function Branding() {
  const [primaryColor, setPrimaryColor] = useState("#22d3ee");
  const [secondaryColor, setSecondaryColor] = useState("#10b981");
  const [teamName, setTeamName] = useState("Riverside Rockets");
  const [mascot, setMascot] = useState("Rockets");
  const [logoUrl, setLogoUrl] = useState("");

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Branding
        </h2>
      </div>

      {/* Org defaults */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Organization Defaults</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-4">
          <p className="text-xs text-emerald-500">Riverside Youth Sports — default color palette</p>
          <div className="flex gap-4">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-800" style={{ backgroundColor: primaryColor }} />
              <span className="text-xs text-emerald-500">Primary</span>
              <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-8 h-6 rounded cursor-pointer bg-transparent border-0" />
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full border-2 border-emerald-800" style={{ backgroundColor: secondaryColor }} />
              <span className="text-xs text-emerald-500">Secondary</span>
              <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-8 h-6 rounded cursor-pointer bg-transparent border-0" />
            </div>
          </div>
        </div>
      </section>

      {/* Per-team branding */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Per-Team Branding — Riverside Rockets</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-emerald-500 block mb-1">Team Name</label>
              <input value={teamName} onChange={e => setTeamName(e.target.value)} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="text-xs text-emerald-500 block mb-1">Mascot</label>
              <input value={mascot} onChange={e => setMascot(e.target.value)} className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500" />
            </div>
            <div>
              <label className="text-xs text-emerald-500 block mb-1">Sport</label>
              <select className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500">
                <option>Baseball</option>
                <option>Soccer</option>
                <option>Basketball</option>
                <option>Football</option>
              </select>
            </div>
            <div>
              <label className="text-xs text-emerald-500 block mb-1">Theme Colors</label>
              <div className="flex gap-2">
                <input type="color" value={primaryColor} onChange={e => setPrimaryColor(e.target.value)} className="w-8 h-9 rounded cursor-pointer bg-transparent border border-emerald-800" />
                <input type="color" value={secondaryColor} onChange={e => setSecondaryColor(e.target.value)} className="w-8 h-9 rounded cursor-pointer bg-transparent border border-emerald-800" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live preview */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Live Preview</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Nav header */}
          <div className="rounded-xl border border-emerald-900 overflow-hidden">
            <div className="px-3 py-2 flex items-center gap-2" style={{ backgroundColor: primaryColor }}>
              <span className="w-5 h-5 rounded-full bg-white/30 flex items-center justify-center text-xs font-bold text-white">
                {teamName.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </span>
              <span className="text-xs font-bold text-white truncate">{teamName}</span>
            </div>
            <div className="bg-gray-950 p-2 text-center text-xs text-emerald-600">Nav header</div>
          </div>

          {/* Team portal card */}
          <div className="rounded-xl border border-emerald-900 overflow-hidden">
            <div className="p-3 flex flex-col items-center gap-1" style={{ background: `linear-gradient(135deg, ${primaryColor}22, ${secondaryColor}22)` }}>
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold text-white border-2 border-white/30"
                style={{ backgroundColor: primaryColor }}>
                {teamName.split(" ").map(w => w[0]).join("").slice(0, 2)}
              </div>
              <span className="text-xs font-semibold text-emerald-100">{teamName}</span>
            </div>
            <div className="bg-gray-950 p-2 text-center text-xs text-emerald-600">Team portal card</div>
          </div>

          {/* Message bubble */}
          <div className="rounded-xl border border-emerald-900 p-3">
            <div className="rounded-lg px-3 py-2 text-xs text-white self-start inline-block max-w-full" style={{ backgroundColor: primaryColor }}>
              Great game today! 🎉
            </div>
            <div className="bg-gray-950 mt-2 rounded p-1 text-center text-xs text-emerald-600">Message bubble</div>
          </div>

          {/* Fallback avatar */}
          <div className="rounded-xl border border-emerald-900 p-3 flex flex-col items-center gap-2">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-base font-bold text-white"
              style={{ backgroundColor: primaryColor }}>
              {teamName.split(" ").map(w => w[0]).join("").slice(0, 2)}
            </div>
            <span className="text-xs text-emerald-600">Fallback avatar</span>
          </div>
        </div>
      </section>

      {/* Brand surface QA */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Brand Surface QA & Contrast</h3>
        <div className="rounded-xl border bg-black border-emerald-800 divide-y divide-emerald-900">
          {SURFACES.map(s => (
            <div key={s.label} className="flex items-center justify-between p-4">
              <div className="flex items-center gap-3">
                {s.contrast === "pass"
                  ? <iconify-icon icon="solar:check-circle-linear" width="16" className="text-emerald-400" />
                  : <iconify-icon icon="solar:warning-linear" width="16" className="text-yellow-400" />}
                <span className="text-sm text-emerald-100">{s.label}</span>
              </div>
              <StatusBadge status={s.contrast} />
            </div>
          ))}
        </div>
      </section>

      {/* Logo metadata */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Logo Upload</h3>
        <div className="rounded-xl border bg-black border-emerald-800 p-5 flex flex-col gap-3">
          <input value={logoUrl} onChange={e => setLogoUrl(e.target.value)} placeholder="https://..." className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2 text-sm text-emerald-100 placeholder-emerald-600 focus:outline-none focus:border-cyan-500" />
          {logoUrl && logoUrl.startsWith("https://") && (
            <div className="rounded-lg bg-emerald-950/30 border border-emerald-900 p-3">
              <img src={logoUrl} alt="Logo" className="h-12 object-contain" onError={e => { e.target.style.display='none'; }} />
            </div>
          )}
          {logoUrl && !logoUrl.startsWith("https://") && <p className="text-xs text-red-400">URL must begin with https://</p>}
          <button className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px]">Submit Logo</button>
        </div>
      </section>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
        <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-400">LeaguePilot is the product brand. Organization names and colors are tenant branding and do not affect the product UI chrome.</p>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
