import { useState } from "react";
import { PRACTICE_RECAPS } from "../../data/demo.js";
import StatusBadge from "../../components/StatusBadge.jsx";

const CHIP_COLORS = [
  "bg-cyan-950 text-cyan-300 border-cyan-800",
  "bg-emerald-950 text-emerald-300 border-emerald-700",
  "bg-indigo-950 text-indigo-300 border-indigo-800",
];

export default function Replay() {
  const [expanded, setExpanded] = useState({ pr1: true });

  function toggle(id) {
    setExpanded((e) => ({ ...e, [id]: !e[id] }));
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2
          className="text-2xl font-semibold tracking-tight text-emerald-100"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          Practice Recaps
        </h2>
      </div>

      <section className="flex flex-col gap-4">
        {PRACTICE_RECAPS.map((recap) => {
          const isOpen = expanded[recap.id];
          return (
            <div key={recap.id} className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
              {/* Header row */}
              <button
                onClick={() => toggle(recap.id)}
                className="w-full flex items-center gap-3 px-5 py-4 hover:bg-emerald-950 transition-colors min-h-[56px] text-left"
              >
                <iconify-icon icon="solar:play-circle-linear" width="22" className="text-cyan-400 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-semibold text-emerald-100">{recap.eventTitle}</span>
                    <StatusBadge status={recap.status} label="Published" />
                  </div>
                  <p className="text-xs text-emerald-500 mt-0.5">{recap.date} · {recap.coachName}</p>
                </div>
                <iconify-icon
                  icon={isOpen ? "solar:alt-arrow-up-linear" : "solar:alt-arrow-down-linear"}
                  width="18"
                  className="text-emerald-600 shrink-0"
                />
              </button>

              {isOpen && (
                <div className="px-5 pb-5 flex flex-col gap-5 border-t border-emerald-900">

                  {/* Focus areas */}
                  <div className="flex flex-wrap gap-2 pt-4">
                    {recap.focusAreas.map((area, i) => (
                      <span
                        key={area}
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${CHIP_COLORS[i % CHIP_COLORS.length]}`}
                      >
                        {area}
                      </span>
                    ))}
                  </div>

                  {/* Parent summary */}
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">What Your Player Did</h4>
                    <p className="text-sm text-emerald-300">{recap.parentSummary}</p>
                  </div>

                  {/* Skill cards */}
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Skills Practiced</h4>
                    <div className="flex flex-col gap-2">
                      {recap.skillCards.map((skill) => (
                        <div key={skill.title} className="flex items-start gap-3 bg-gray-950 rounded-lg border border-emerald-900 px-3 py-3">
                          <iconify-icon icon={skill.icon} width="18" className="text-cyan-400 shrink-0 mt-0.5" />
                          <div>
                            <p className="text-sm font-semibold text-emerald-100">{skill.title}</p>
                            <p className="text-xs text-emerald-400 mt-0.5">{skill.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Home activities */}
                  <div>
                    <h4 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-2">Try at Home</h4>
                    <ul className="flex flex-col gap-2">
                      {recap.homeActivities.map((act, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <iconify-icon icon="solar:check-circle-linear" width="16" className="text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-emerald-300">{act}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Parent tip */}
                  <div className="flex items-start gap-3 bg-cyan-950 border border-cyan-800 rounded-lg px-4 py-3">
                    <iconify-icon icon="solar:info-circle-linear" width="18" className="text-cyan-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">Parent Tip</p>
                      <p className="text-sm text-cyan-200">{recap.parentTip}</p>
                    </div>
                  </div>

                  {/* Team quest */}
                  <div className="flex items-start gap-3 bg-indigo-950 border border-indigo-800 rounded-lg px-4 py-3">
                    <iconify-icon icon="solar:shield-check-linear" width="18" className="text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mb-1">Team Quest</p>
                      <p className="text-sm text-indigo-200">{recap.teamQuest}</p>
                    </div>
                  </div>

                  {/* Memory moment */}
                  <div className="flex items-start gap-3 bg-emerald-950 border border-emerald-800 rounded-lg px-4 py-3">
                    <iconify-icon icon="solar:star-linear" width="18" className="text-emerald-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Memory Moment</p>
                      <p className="text-sm text-emerald-200">{recap.memoryMoment}</p>
                    </div>
                  </div>

                  {/* Coach approved note */}
                  <p className="text-xs text-emerald-600 flex items-center gap-1">
                    <iconify-icon icon="solar:shield-check-linear" width="12" />
                    Coach approved · {recap.coachName}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
