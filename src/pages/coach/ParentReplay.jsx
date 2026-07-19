import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { EVENTS, PRACTICE_RECAPS } from "../../data/demo.js";

const FOCUS_OPTIONS = [
  "Relay Drills", "Plate Discipline", "Base Running", "Fielding", "Teamwork", "Communication"
];

const ENERGY_LEVELS = ["Low", "Medium", "High"];

export default function ParentReplay() {
  const practices = EVENTS.filter(e => e.type === "practice");

  const [selectedPractice, setSelectedPractice] = useState(practices[0]?.id || "");
  const [focusAreas, setFocusAreas] = useState([]);
  const [energy, setEnergy] = useState("Medium");
  const [coachNotes, setCoachNotes] = useState("");
  const [constraints, setConstraints] = useState("");
  const [generated, setGenerated] = useState(false);
  const [memoryMoment, setMemoryMoment] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [status, setStatus] = useState("draft");
  const [published, setPublished] = useState(false);

  const toggleFocus = (area) => {
    setFocusAreas(prev =>
      prev.includes(area) ? prev.filter(a => a !== area) : [...prev, area]
    );
  };

  const handleGenerate = () => { setGenerated(true); setStatus("draft"); };
  const handleApprove = () => setStatus("awaiting approval");
  const handlePublish = () => { setStatus("published"); setPublished(true); };

  const parentSummary = focusAreas.length > 0
    ? `Today your player worked on ${focusAreas.join(", ").toLowerCase()}. The team energy was ${energy.toLowerCase()} — ${energy === "High" ? "an exciting, fast-paced session!" : energy === "Medium" ? "a solid, productive session." : "a calm, focused session."}`
    : "Today your player had a productive practice with the Riverside Rockets.";

  const homeActivities = [
    focusAreas.includes("Relay Drills") && "Practice catching and quickly throwing to a partner (5 min)",
    focusAreas.includes("Plate Discipline") && "Take turns being the 'batter' — focus on watching an imaginary ball",
    focusAreas.includes("Base Running") && "Play 'stop and go' in the backyard — practice quick starts and stops",
    focusAreas.includes("Fielding") && "Roll a ball and practice getting low to pick it up with two hands",
    focusAreas.includes("Teamwork") && "Talk about one way they helped a teammate today",
    focusAreas.includes("Communication") && "Practice calling 'I got it!' when catching a tossed ball",
    "Ask your player to tell you their favorite part of practice!",
  ].filter(Boolean);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Parent Replay
        </h2>
      </div>

      {/* Create Form */}
      <div className="rounded-xl border p-5 bg-black border-emerald-800 flex flex-col gap-5">
        <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Create New Replay</p>

        {/* Step 1: Select practice */}
        <div>
          <label className="text-xs text-emerald-400 mb-2 block font-medium">1. Select Practice</label>
          <div className="flex flex-wrap gap-2">
            {practices.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedPractice(p.id)}
                className={`px-3 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors ${
                  selectedPractice === p.id
                    ? "bg-cyan-400 text-black"
                    : "border border-emerald-800 text-emerald-100 hover:bg-emerald-950"
                }`}
              >
                {p.title} — {p.date}
              </button>
            ))}
          </div>
        </div>

        {/* Step 2: Focus areas */}
        <div>
          <label className="text-xs text-emerald-400 mb-2 block font-medium">2. Focus Areas</label>
          <div className="flex flex-wrap gap-2">
            {FOCUS_OPTIONS.map(area => (
              <button
                key={area}
                onClick={() => toggleFocus(area)}
                className={`px-3 py-2 rounded-lg text-sm min-h-[44px] transition-colors border ${
                  focusAreas.includes(area)
                    ? "bg-emerald-700 border-emerald-500 text-emerald-100 font-semibold"
                    : "border-emerald-800 text-emerald-400 hover:bg-emerald-950"
                }`}
              >
                {area}
              </button>
            ))}
          </div>
        </div>

        {/* Step 3: Team energy */}
        <div>
          <label className="text-xs text-emerald-400 mb-2 block font-medium">3. Team Energy</label>
          <div className="flex gap-2">
            {ENERGY_LEVELS.map(lvl => (
              <button
                key={lvl}
                onClick={() => setEnergy(lvl)}
                className={`px-4 py-2 rounded-lg text-sm font-medium min-h-[44px] transition-colors border ${
                  energy === lvl
                    ? "bg-cyan-400 text-black border-transparent"
                    : "border-emerald-800 text-emerald-100 hover:bg-emerald-950"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Coach notes */}
        <div>
          <label className="text-xs text-emerald-400 mb-2 block font-medium">4. Coaching Notes</label>
          <textarea
            rows={3}
            value={coachNotes}
            onChange={e => setCoachNotes(e.target.value)}
            placeholder="What happened at practice? Key moments, what worked, what needs work…"
            className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600 resize-none"
          />
        </div>

        {/* Step 5: Constraints */}
        <div>
          <label className="text-xs text-emerald-400 mb-2 block font-medium">5. Constraints (optional)</label>
          <textarea
            rows={2}
            value={constraints}
            onChange={e => setConstraints(e.target.value)}
            placeholder="Any limits, sensitivities, or notes for the AI (e.g. avoid naming individual players)…"
            className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600 resize-none"
          />
        </div>

        <button
          onClick={handleGenerate}
          className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px] w-fit"
        >
          Generate Draft
        </button>
      </div>

      {/* Generated draft */}
      {generated && (
        <div className="rounded-xl border p-5 bg-black border-emerald-800 flex flex-col gap-5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Generated Draft</p>
            <div className="flex items-center gap-2">
              <StatusBadge status={status} />
              <button onClick={() => setPreviewMode(v => !v)} className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
                {previewMode ? "Edit View" : "Preview"}
              </button>
            </div>
          </div>

          {previewMode ? (
            <div className="bg-emerald-950/20 border border-emerald-800 rounded-xl p-4 flex flex-col gap-4">
              <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">How families will see this</p>
              <div>
                <p className="text-sm font-semibold text-emerald-100 mb-1">From Practice to Home 🏠</p>
                <p className="text-sm text-emerald-300 leading-relaxed">{parentSummary}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-100 mb-2">Home Activities</p>
                <ul className="flex flex-col gap-1">
                  {homeActivities.map((a, i) => (
                    <li key={i} className="text-sm text-emerald-300 flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-linear" width="15" class="text-emerald-500 mt-0.5 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
              {memoryMoment && (
                <div className="bg-yellow-950/40 border border-yellow-800 rounded-lg p-3">
                  <p className="text-xs font-semibold text-yellow-400 mb-1">Memory Moment ⭐</p>
                  <p className="text-sm text-yellow-200">{memoryMoment}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {/* Parent summary */}
              <div className="flex flex-col gap-1">
                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Parent-Friendly Summary</p>
                <p className="text-sm text-emerald-200 leading-relaxed">{parentSummary}</p>
              </div>

              <div className="h-px w-full bg-emerald-900" />

              {/* Home activities */}
              <div>
                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Home Activities</p>
                <ul className="flex flex-col gap-1.5">
                  {homeActivities.map((a, i) => (
                    <li key={i} className="text-sm text-emerald-300 flex items-start gap-2">
                      <iconify-icon icon="solar:check-circle-linear" width="15" class="text-emerald-400 mt-0.5 flex-shrink-0" />
                      {a}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Skill cards */}
              {focusAreas.length > 0 && (
                <>
                  <div className="h-px w-full bg-emerald-900" />
                  <div>
                    <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Skill Cards</p>
                    <div className="flex flex-wrap gap-2">
                      {focusAreas.map(area => (
                        <div key={area} className="bg-emerald-950/50 border border-emerald-800 rounded-lg px-3 py-2 text-xs text-emerald-300">
                          {area}
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}

              <div className="h-px w-full bg-emerald-900" />

              {/* Parent tip */}
              <div>
                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Parent Tip</p>
                <p className="text-sm text-emerald-300">Keep it fun! At this age, enjoyment and positive reinforcement matter more than technical perfection.</p>
              </div>

              {/* Team quest */}
              <div>
                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Team Quest</p>
                <p className="text-sm text-emerald-300">This week: cheer for 3 teammates by name during practice!</p>
              </div>

              {/* Memory moment */}
              <div>
                <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Memory Moment (fill in)</p>
                <textarea
                  rows={2}
                  value={memoryMoment}
                  onChange={e => setMemoryMoment(e.target.value)}
                  placeholder="Share a special moment from today's practice…"
                  className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600 resize-none"
                />
              </div>
            </div>
          )}

          {/* Publish workflow */}
          <div className="flex flex-wrap gap-2">
            <button onClick={handleApprove} disabled={status !== "draft"} className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px] disabled:opacity-40">
              Submit for Approval
            </button>
            <button onClick={handlePublish} disabled={status !== "awaiting approval"} className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed">
              Publish
            </button>
          </div>

          {published && (
            <div className="bg-emerald-950/40 border border-emerald-700 rounded-lg px-3 py-2 text-sm text-emerald-300 flex items-center gap-2">
              <iconify-icon icon="solar:check-circle-linear" width="16" class="text-emerald-400" />
              Pending notification records created. Send separately.
            </div>
          )}
        </div>
      )}

      {/* Existing recaps */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Previous Recaps</h3>
        {PRACTICE_RECAPS.map(recap => (
          <div key={recap.id} className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col gap-2">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <p className="text-sm font-semibold text-emerald-100">{recap.eventTitle}</p>
              <StatusBadge status={recap.status} />
            </div>
            <p className="text-xs text-emerald-500">{recap.date} · {recap.coachName}</p>
            <div className="flex flex-wrap gap-1">
              {recap.focusAreas.map(f => (
                <span key={f} className="text-xs bg-emerald-900/50 text-emerald-400 px-2 py-0.5 rounded-full">{f}</span>
              ))}
            </div>
            <p className="text-sm text-emerald-400 leading-relaxed">{recap.parentSummary}</p>
          </div>
        ))}
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
