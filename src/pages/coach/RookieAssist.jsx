import { useState } from "react";

const RESET_TIPS = [
  "Freeze! Everyone sit cross-legged right where you are. Take 3 deep breaths together.",
  "Huddle up — everyone put a hand in the middle. Count down from 3 and shout the team name!",
  "Water break + 60-second stretch. Ask each player to wiggle their fingers and toes.",
];

const DRILLS = [
  { name: "Freeze Tag Relay", desc: "Tag a teammate, they freeze until another teammate crawls under their legs. Builds movement and teamwork." },
  { name: "Bucket Toss", desc: "Each player has 5 foam balls. Toss them into a bucket 6 feet away. Count out loud — celebrate every make!" },
  { name: "Follow the Leader Base Run", desc: "Coach leads kids around the bases in a silly walk. Teaches base paths while burning energy safely." },
];

const PHRASES_USE = [
  "Great hustle!",
  "Watch the ball all the way in.",
  "Nice try — let's do it again!",
  "I saw you cheer for your teammate — awesome!",
  "Shake it off, you'll get it next time.",
];

const PHRASES_AVOID = [
  "You should have caught that.",
  "Why aren't you paying attention?",
  "That's not how you do it.",
  "Hurry up, we're waiting.",
];

const ENERGY_DRILLS = {
  Low: ["Simon Says (baseball edition)", "Slow-motion base run race", "Statue batting stance holds"],
  Medium: ["Bucket toss relay", "Ground ball scoop stations", "Partner throwing with praise points"],
  High: ["Full relay drill with cheering", "Obstacle base running", "Freeze tag fielding game"],
};

export default function RookieAssist() {
  const [showReset, setShowReset] = useState(false);
  const [showDrills, setShowDrills] = useState(false);
  const [showPhrases, setShowPhrases] = useState(false);
  const [teamEnergy, setTeamEnergy] = useState("Medium");
  const [showEnergy, setShowEnergy] = useState(false);
  const [parentMsg, setParentMsg] = useState("");
  const [generatedMsg, setGeneratedMsg] = useState("");

  const handleGenerateMsg = () => {
    setGeneratedMsg(
      `Hi Rockets families! 🚀 Quick note from Thursday's practice — your player worked hard today and we had a lot of fun. ${parentMsg ? `Coach's note: ${parentMsg} ` : ""}At this age, showing up and having fun IS the win. See you next time! — Coach Mike`
    );
  };

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Rookie Coach Assist
        </h2>
      </div>

      {/* Intro */}
      <div className="rounded-xl border p-5 bg-black border-emerald-800 flex items-start gap-3">
        <iconify-icon icon="solar:hand-stars-linear" width="24" class="text-cyan-400 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-emerald-100 font-semibold">Get age-appropriate guidance for your 6U team</p>
          <p className="text-sm text-emerald-400 mt-1">Age group context: <span className="text-cyan-400 font-medium">6U (ages 5–6)</span> · Riverside Rockets</p>
          <p className="text-xs text-emerald-600 mt-2">Editable guidance, not autonomous instructions. Always review before using with players.</p>
        </div>
      </div>

      {/* Quick tools grid */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Quick Tools</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

          {/* Chaos Button */}
          <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:restart-circle-linear" width="20" class="text-red-400" />
              <p className="text-sm font-semibold text-emerald-100">Sideline Reset</p>
              <span className="text-xs text-red-400 bg-red-950/50 px-2 py-0.5 rounded-full">Chaos Button</span>
            </div>
            <p className="text-xs text-emerald-500">When the team loses focus — hit reset.</p>
            <button
              onClick={() => setShowReset(v => !v)}
              className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]"
            >
              {showReset ? "Hide Tips" : "Show Reset Tips"}
            </button>
            {showReset && (
              <ul className="flex flex-col gap-2">
                {RESET_TIPS.map((tip, i) => (
                  <li key={i} className="text-sm text-emerald-300 bg-emerald-950/40 rounded-lg px-3 py-2 flex items-start gap-2">
                    <span className="text-cyan-400 font-bold flex-shrink-0">{i + 1}.</span>
                    {tip}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Drill Generator */}
          <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:play-circle-linear" width="20" class="text-emerald-400" />
              <p className="text-sm font-semibold text-emerald-100">Practice Drill Generator</p>
            </div>
            <p className="text-xs text-emerald-500">Age-appropriate drills for 6U players.</p>
            <button
              onClick={() => setShowDrills(v => !v)}
              className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]"
            >
              {showDrills ? "Hide Drills" : "Generate Drills"}
            </button>
            {showDrills && (
              <ul className="flex flex-col gap-2">
                {DRILLS.map((drill, i) => (
                  <li key={i} className="bg-emerald-950/40 rounded-lg px-3 py-2">
                    <p className="text-sm font-semibold text-emerald-100">{drill.name}</p>
                    <p className="text-xs text-emerald-400 mt-0.5">{drill.desc}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Phrase Library */}
          <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:chat-round-line-linear" width="20" class="text-yellow-400" />
              <p className="text-sm font-semibold text-emerald-100">Phrase Library</p>
            </div>
            <p className="text-xs text-emerald-500">What to say (and avoid) with 5–6 year olds.</p>
            <button
              onClick={() => setShowPhrases(v => !v)}
              className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px]"
            >
              {showPhrases ? "Hide Phrases" : "Show Phrases"}
            </button>
            {showPhrases && (
              <div className="flex flex-col gap-3">
                <div>
                  <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Use These ✅</p>
                  <ul className="flex flex-col gap-1">
                    {PHRASES_USE.map((p, i) => (
                      <li key={i} className="text-sm text-emerald-300 flex items-center gap-2">
                        <iconify-icon icon="solar:check-circle-linear" width="14" class="text-emerald-500 flex-shrink-0" />
                        "{p}"
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-red-500 uppercase tracking-wider mb-1">Avoid These ❌</p>
                  <ul className="flex flex-col gap-1">
                    {PHRASES_AVOID.map((p, i) => (
                      <li key={i} className="text-sm text-red-300 flex items-center gap-2">
                        <iconify-icon icon="solar:close-circle-linear" width="14" class="text-red-500 flex-shrink-0" />
                        "{p}"
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>

          {/* Energy Adapter */}
          <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <iconify-icon icon="solar:bolt-linear" width="20" class="text-cyan-400" />
              <p className="text-sm font-semibold text-emerald-100">Energy Adapter</p>
            </div>
            <p className="text-xs text-emerald-500">Match drills to your team's energy level.</p>
            <div className="flex gap-2">
              {["Low", "Medium", "High"].map(lvl => (
                <button
                  key={lvl}
                  onClick={() => { setTeamEnergy(lvl); setShowEnergy(true); }}
                  className={`flex-1 py-2 rounded-lg text-xs font-semibold min-h-[44px] transition-colors border ${
                    teamEnergy === lvl && showEnergy
                      ? "bg-cyan-400 text-black border-transparent"
                      : "border-emerald-800 text-emerald-100 hover:bg-emerald-950"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
            {showEnergy && (
              <ul className="flex flex-col gap-1">
                {ENERGY_DRILLS[teamEnergy].map((d, i) => (
                  <li key={i} className="text-sm text-emerald-300 flex items-center gap-2">
                    <iconify-icon icon="solar:arrow-right-linear" width="14" class="text-cyan-400 flex-shrink-0" />
                    {d}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </section>

      {/* Parent reinforcement message generator */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Parent Reinforcement Message</h3>
        <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col gap-3">
          <p className="text-xs text-emerald-400">Draft a quick message to send to parents after practice.</p>
          <textarea
            rows={3}
            value={parentMsg}
            onChange={e => setParentMsg(e.target.value)}
            placeholder="Key highlights, what to reinforce at home, any shout-outs…"
            className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600 resize-none"
          />
          <button
            onClick={handleGenerateMsg}
            className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px] w-fit"
          >
            Generate Draft
          </button>
          {generatedMsg && (
            <div className="bg-emerald-950/30 border border-emerald-800 rounded-lg p-3">
              <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Generated Draft</p>
              <p className="text-sm text-emerald-200 leading-relaxed">{generatedMsg}</p>
              <p className="text-xs text-emerald-600 mt-2">Review and edit before submitting for approval.</p>
            </div>
          )}
        </div>
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
