import { useState, useRef } from "react";

const THEME_PRESETS = [
  { label: "Baseball · Classic", primary: "#22d3ee", accent: "#f59e0b" },
  { label: "Baseball · Midnight", primary: "#6366f1", accent: "#f43f5e" },
  { label: "Soccer · Matchday", primary: "#6d4aff", accent: "#ffca3a" },
  { label: "Basketball · Hardwood", primary: "#ef4444", accent: "#fbbf24" },
  { label: "Football · Friday Night", primary: "#10b981", accent: "#f97316" },
];

const SPORTS = ["Baseball", "Soccer", "Basketball", "Football", "Volleyball", "Softball"];

const SURFACES = [
  { label: "Web portal", key: "web" },
  { label: "Email header", key: "email" },
  { label: "Push identity", key: "push" },
  { label: "Fallback avatar", key: "avatar" },
];

function contrastRatio(hex, bg = "#ffffff") {
  const toLum = (h) => {
    const c = h.replace("#", "");
    const r = parseInt(c.slice(0, 2), 16) / 255;
    const g = parseInt(c.slice(2, 4), 16) / 255;
    const b = parseInt(c.slice(4, 6), 16) / 255;
    return [r, g, b].map((v) =>
      v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    ).reduce((acc, v, i) => acc + v * [0.2126, 0.7152, 0.0722][i], 0);
  };
  const L1 = Math.max(toLum(hex), toLum(bg));
  const L2 = Math.min(toLum(hex), toLum(bg));
  return (L1 + 0.05) / (L2 + 0.05);
}

function getSurfaceStatus(primary, accent, key) {
  const ratio = contrastRatio(primary, "#0a0a0a");
  if (key === "web") return ratio > 3 ? "pass" : "proof";
  if (key === "email") return contrastRatio(primary, "#ffffff") > 4.5 ? "pass" : "proof";
  if (key === "push") return contrastRatio(accent, "#0a0a0a") > 3 ? "pass" : "proof";
  if (key === "avatar") return ratio > 3 ? "pass" : "proof";
  return "pass";
}

function initials(name) {
  return name.split(" ").map((w) => w[0] || "").join("").slice(0, 2).toUpperCase() || "?";
}

function hexToRgba(hex, alpha) {
  const c = hex.replace("#", "");
  const r = parseInt(c.slice(0, 2), 16);
  const g = parseInt(c.slice(2, 4), 16);
  const b = parseInt(c.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function Branding() {
  const [preset, setPreset] = useState(0);
  const [displayName, setDisplayName] = useState("Riverside Rockets");
  const [shortName, setShortName] = useState("Rockets");
  const [mascot, setMascot] = useState("Rocket");
  const [sport, setSport] = useState("Baseball");
  const [heroMsg, setHeroMsg] = useState("One team.\nOne mission.\nRocket up.");
  const [primary, setPrimary] = useState("#22d3ee");
  const [accent, setAccent] = useState("#f59e0b");
  const [logoDataUrl, setLogoDataUrl] = useState(null);
  const [published, setPublished] = useState(false);
  const [previewing, setPreviewing] = useState(false);
  const fileRef = useRef(null);

  function applyPreset(idx) {
    const p = THEME_PRESETS[idx];
    setPreset(idx);
    setPrimary(p.primary);
    setAccent(p.accent);
  }

  function handleLogoFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setLogoDataUrl(ev.target.result);
    reader.readAsDataURL(file);
  }

  function handlePublish() {
    setPublished(true);
    setTimeout(() => setPublished(false), 2500);
  }

  const heroLines = heroMsg.split("\n");

  return (
    <div className="flex flex-col gap-0 pb-10">

      {/* ── Page header ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <h2
            className="text-2xl font-bold tracking-tight text-white"
            style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
          >
            Theme Studio
          </h2>
          <p className="text-sm text-emerald-400 mt-0.5">
            Design once, validate everywhere, and publish with confidence.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setPreviewing((v) => !v)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors min-h-[40px] ${
              previewing
                ? "border-cyan-500 text-cyan-400 bg-cyan-950/30"
                : "border-emerald-700 text-emerald-200 hover:bg-emerald-950/40"
            }`}
          >
            {previewing ? "Editing" : "Preview surfaces"}
          </button>
          <button
            onClick={handlePublish}
            className="px-4 py-2 rounded-lg text-sm font-semibold min-h-[40px] transition-all"
            style={{
              background: published ? "#10b981" : primary,
              color: "#000",
            }}
          >
            {published ? "✓ Published!" : "Publish changes"}
          </button>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-6 items-start">

        {/* ── LEFT: Brand controls ── */}
        <div className="rounded-2xl border border-emerald-800 bg-black/60 p-6 flex flex-col gap-5">
          <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            Brand controls
          </p>

          {/* Theme preset */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-emerald-500">Theme preset</label>
            <select
              value={preset}
              onChange={(e) => applyPreset(Number(e.target.value))}
              className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2.5 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {THEME_PRESETS.map((p, i) => (
                <option key={i} value={i}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Display name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-emerald-500">Display name</label>
            <input
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2.5 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500"
            />
          </div>

          {/* Short name + Mascot row */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-emerald-500">Short name</label>
              <input
                value={shortName}
                onChange={(e) => setShortName(e.target.value)}
                className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2.5 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-emerald-500">Mascot</label>
              <input
                value={mascot}
                onChange={(e) => setMascot(e.target.value)}
                className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2.5 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          {/* Sport */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-emerald-500">Sport</label>
            <select
              value={sport}
              onChange={(e) => setSport(e.target.value)}
              className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2.5 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              {SPORTS.map((s) => <option key={s}>{s}</option>)}
            </select>
          </div>

          {/* Hero message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-emerald-500">Hero message</label>
            <textarea
              value={heroMsg}
              onChange={(e) => setHeroMsg(e.target.value)}
              rows={3}
              className="w-full bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2.5 text-sm text-emerald-100 focus:outline-none focus:border-cyan-500 resize-none leading-relaxed"
            />
            <p className="text-xs text-emerald-700">Use line breaks to add visual weight.</p>
          </div>

          {/* Colors */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-emerald-500">Primary</label>
              <div className="flex items-center gap-3 bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2">
                <label className="relative w-7 h-7 rounded-md cursor-pointer shrink-0 overflow-hidden border border-white/10" style={{ backgroundColor: primary }}>
                  <input type="color" value={primary} onChange={(e) => setPrimary(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                </label>
                <span className="text-sm text-emerald-200 font-mono">{primary.toUpperCase()}</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-emerald-500">Accent</label>
              <div className="flex items-center gap-3 bg-gray-950 border border-emerald-800 rounded-lg px-3 py-2">
                <label className="relative w-7 h-7 rounded-md cursor-pointer shrink-0 overflow-hidden border border-white/10" style={{ backgroundColor: accent }}>
                  <input type="color" value={accent} onChange={(e) => setAccent(e.target.value)} className="absolute inset-0 opacity-0 cursor-pointer w-full h-full" />
                </label>
                <span className="text-sm text-emerald-200 font-mono">{accent.toUpperCase()}</span>
              </div>
            </div>
          </div>

          {/* Logo upload */}
          <div className="rounded-xl border border-emerald-800 bg-gray-950/60 p-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              {logoDataUrl ? (
                <img src={logoDataUrl} alt="Club logo" className="w-10 h-10 rounded-lg object-contain bg-white/5" />
              ) : (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-base font-bold text-white shrink-0"
                  style={{ backgroundColor: primary }}
                >
                  {initials(shortName || displayName)}
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-emerald-100">Club logo</p>
                <p className="text-xs text-emerald-600">SVG or PNG · 1024 px recommended</p>
              </div>
            </div>
            <button
              onClick={() => fileRef.current?.click()}
              className="px-3 py-1.5 rounded-lg border border-emerald-700 text-emerald-300 text-xs font-medium hover:bg-emerald-950/40 transition-colors"
            >
              Replace
            </button>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleLogoFile} />
          </div>
        </div>

        {/* ── RIGHT: Mobile preview ── */}
        <div className="flex flex-col gap-4 items-center lg:items-start">
          <div className="flex items-center justify-between w-full max-w-sm">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Mobile preview</p>
            <span className="text-xs text-emerald-500 border border-emerald-800 rounded px-2 py-0.5">AA contrast</span>
          </div>

          {/* Phone shell */}
          <div
            className="w-full max-w-sm rounded-[2.5rem] border-4 border-gray-700 overflow-hidden shadow-2xl"
            style={{ background: "#111" }}
          >
            {/* Phone notch */}
            <div className="h-6 bg-black flex items-center justify-center">
              <div className="w-20 h-1.5 rounded-full bg-gray-800" />
            </div>

            {/* Hero section */}
            <div className="px-5 pt-6 pb-7" style={{ background: primary }}>
              <div className="flex items-center gap-2 mb-4">
                {logoDataUrl ? (
                  <img src={logoDataUrl} alt="" className="w-8 h-8 rounded-lg object-contain bg-white/20" />
                ) : (
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{ background: hexToRgba("#ffffff", 0.2), color: "#fff" }}
                  >
                    {initials(shortName || displayName)}
                  </div>
                )}
              </div>
              <p className="text-xs font-semibold tracking-widest uppercase mb-2" style={{ color: hexToRgba("#ffffff", 0.7) }}>
                {displayName.toUpperCase()}
              </p>
              <div className="mb-5">
                {heroLines.map((line, i) => (
                  <p
                    key={i}
                    className="text-2xl font-bold leading-tight text-white"
                    style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
                  >
                    {line || <>&nbsp;</>}
                  </p>
                ))}
              </div>
              <button
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background: accent, color: "#000" }}
              >
                View next match
              </button>
            </div>

            {/* Next up card */}
            <div className="bg-white px-5 pt-5 pb-6">
              <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: primary }}>
                Next up
              </p>
              <p className="text-base font-bold text-gray-900 mb-0.5">
                {shortName} vs. River City
              </p>
              <p className="text-xs text-gray-500 mb-4">Saturday · 10:30 AM · Field 3</p>

              {/* Placeholder image row */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="flex-1 h-14 rounded-lg"
                    style={{ background: hexToRgba(primary, 0.12) }}
                  />
                ))}
              </div>
            </div>

            {/* Phone bottom */}
            <div className="h-5 bg-white flex items-center justify-center">
              <div className="w-24 h-1 rounded-full bg-gray-300" />
            </div>
          </div>
        </div>
      </div>

      {/* ── Surface validation ── */}
      <div className="mt-8 rounded-2xl border border-emerald-800 bg-black/60 p-6">
        <p className="text-sm font-semibold text-emerald-100 mb-4">Surface validation</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {SURFACES.map(({ label, key }) => {
            const status = getSurfaceStatus(primary, accent, key);
            const pass = status === "pass";
            return (
              <div
                key={key}
                className="flex items-center justify-between rounded-xl border px-4 py-3"
                style={{
                  borderColor: pass ? "#065f46" : "#78350f",
                  background: pass ? "rgba(6,95,70,0.1)" : "rgba(120,53,15,0.1)",
                }}
              >
                <span className="text-sm text-emerald-100">{label}</span>
                {pass ? (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-900/60 text-emerald-400 border border-emerald-700">
                    Pass
                  </span>
                ) : (
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-900/40 text-amber-400 border border-amber-700">
                    Proof needed
                  </span>
                )}
              </div>
            );
          })}
        </div>
        <p className="text-xs text-emerald-700 mt-3">
          Contrast checked against WCAG AA (4.5:1 text, 3:1 UI). Adjust colors above to resolve failures.
        </p>
      </div>

      <p className="text-xs text-emerald-700 text-center mt-6">Demo — changes are not persisted between sessions.</p>
    </div>
  );
}
