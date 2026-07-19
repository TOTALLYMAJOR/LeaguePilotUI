import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { WEATHER_ALERT, DRILL_VIDEOS, VOLUNTEERS } from "../../data/demo.js";

const FIELDS = [
  { name: "Field A", status: "open" },
  { name: "North B", status: "open" },
  { name: "South A", status: "closed", note: "Closed — maintenance" },
];

export default function Weather() {
  const [alertText, setAlertText] = useState(
    `⚠️ Heat Advisory for ${WEATHER_ALERT.event}: ${WEATHER_ALERT.temp}. Please bring extra water, apply sunscreen, and dress in light clothing. We will take additional water breaks. Source: ${WEATHER_ALERT.source}.`
  );
  const [alertStatus, setAlertStatus] = useState("draft");
  const [submitted, setSubmitted] = useState(false);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoSubmitted, setVideoSubmitted] = useState(false);
  const [videoValidated, setVideoValidated] = useState(false);

  const openRoles = VOLUNTEERS.flatMap(v =>
    v.roles.filter(r => r.status === "open").map(r => ({ ...r, eventTitle: v.eventTitle }))
  );

  const handleSubmitAlert = () => {
    setAlertStatus("awaiting approval");
    setSubmitted(true);
  };

  const handleValidateVideo = () => setVideoValidated(true);
  const handleSubmitVideo = () => setVideoSubmitted(true);

  return (
    <div className="flex flex-col gap-6 pb-8">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
          Weather &amp; Fields
        </h2>
      </div>

      {/* Current conditions card */}
      <div className="rounded-xl border p-5 bg-black border-yellow-700 flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <iconify-icon icon="solar:warning-linear" width="20" class="text-yellow-400" />
          <p className="text-xs font-semibold text-yellow-400 uppercase tracking-wider">Current Weather Alert</p>
        </div>
        <p className="text-emerald-100 font-semibold">{WEATHER_ALERT.event}</p>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-yellow-950/40 rounded-lg px-3 py-2">
            <p className="text-xs text-yellow-500">Condition</p>
            <p className="text-sm text-yellow-200 font-medium">{WEATHER_ALERT.condition}</p>
          </div>
          <div className="bg-yellow-950/40 rounded-lg px-3 py-2">
            <p className="text-xs text-yellow-500">Temperature</p>
            <p className="text-sm text-yellow-200 font-medium">{WEATHER_ALERT.temp}</p>
          </div>
          <div className="bg-yellow-950/40 rounded-lg px-3 py-2">
            <p className="text-xs text-yellow-500">Source</p>
            <p className="text-sm text-yellow-200 font-medium">{WEATHER_ALERT.source}</p>
          </div>
          <div className="bg-yellow-950/40 rounded-lg px-3 py-2">
            <p className="text-xs text-yellow-500">Freshness</p>
            <p className="text-sm text-yellow-200 font-medium">{WEATHER_ALERT.freshness}</p>
          </div>
        </div>
      </div>

      {/* Weather alert draft form */}
      <div className="rounded-xl border p-5 bg-black border-emerald-800 flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Weather Alert Draft</p>
          <StatusBadge status={alertStatus} />
        </div>
        <textarea
          rows={4}
          value={alertText}
          onChange={e => setAlertText(e.target.value)}
          disabled={submitted}
          className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600 resize-none disabled:opacity-60"
        />
        {!submitted ? (
          <button
            onClick={handleSubmitAlert}
            className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px] w-fit"
          >
            Submit for Review
          </button>
        ) : (
          <div className="flex items-center gap-2 text-sm text-emerald-300 bg-emerald-950/40 border border-emerald-700 rounded-lg px-3 py-2">
            <iconify-icon icon="solar:check-circle-linear" width="16" class="text-emerald-400" />
            Submitted for administrator review — not yet delivered.
          </div>
        )}
        <p className="text-xs text-emerald-600">Weather drafts are submitted for administrator review. Not a delivered alert.</p>
      </div>

      {/* Field status */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Field Status</h3>
        <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
          {FIELDS.map((field, idx) => (
            <div key={field.name}>
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <iconify-icon
                    icon={field.status === "open" ? "solar:check-circle-linear" : "solar:close-circle-linear"}
                    width="18"
                    class={field.status === "open" ? "text-emerald-400" : "text-red-400"}
                  />
                  <span className="text-emerald-100 text-sm font-medium">{field.name}</span>
                </div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  field.status === "open"
                    ? "bg-emerald-950/60 text-emerald-300"
                    : "bg-red-950/60 text-red-300"
                }`}>
                  {field.note || "Open"}
                </span>
              </div>
              {idx < FIELDS.length - 1 && <div className="h-px w-full bg-emerald-900/50" />}
            </div>
          ))}
        </div>
      </section>

      {/* Snack / Volunteer gaps */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Open Volunteer Roles</h3>
        {openRoles.length === 0 ? (
          <div className="rounded-xl border p-4 bg-black border-emerald-800 flex items-center gap-2 text-emerald-500 text-sm">
            <iconify-icon icon="solar:check-circle-linear" width="18" />
            All volunteer roles filled — no gaps!
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {openRoles.map(role => (
              <div key={role.id} className="rounded-xl border p-4 bg-black border-emerald-800 flex items-center justify-between gap-2">
                <div>
                  <p className="text-sm text-emerald-100 font-medium">{role.title}</p>
                  <p className="text-xs text-emerald-500">{role.eventTitle} · {role.description}</p>
                </div>
                <StatusBadge status="open" />
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Drill video references */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Drill Video References</h3>
        <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
          {DRILL_VIDEOS.map((video, idx) => (
            <div key={video.id}>
              <div className="flex items-center justify-between gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-emerald-100 font-medium">{video.title}</p>
                  <p className="text-xs text-emerald-500 mt-0.5 truncate">{video.url}</p>
                  {video.assignedTo && (
                    <p className="text-xs text-emerald-600 mt-0.5">Assigned: {video.assignedTo}</p>
                  )}
                </div>
                <StatusBadge status={video.status === "awaiting-review" ? "awaiting approval" : video.status} />
              </div>
              {idx < DRILL_VIDEOS.length - 1 && <div className="h-px w-full bg-emerald-900/50" />}
            </div>
          ))}
        </div>

        {/* Submit new video URL */}
        <div className="rounded-xl border p-4 bg-black border-emerald-800 flex flex-col gap-3">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider">Submit New Video URL</p>
          <textarea
            rows={2}
            value={videoUrl}
            onChange={e => { setVideoUrl(e.target.value); setVideoValidated(false); setVideoSubmitted(false); }}
            placeholder="Paste a YouTube or Vimeo URL…"
            className="w-full bg-emerald-950/30 border border-emerald-800 rounded-lg px-3 py-2 text-emerald-100 text-sm focus:outline-none focus:border-cyan-600 resize-none"
          />
          <div className="flex flex-wrap gap-2">
            <button
              onClick={handleValidateVideo}
              disabled={!videoUrl}
              className="px-4 py-2 rounded-lg border border-emerald-800 text-emerald-100 text-sm font-medium hover:bg-emerald-950 transition-colors min-h-[44px] disabled:opacity-40"
            >
              Validate URL
            </button>
            <button
              onClick={handleSubmitVideo}
              disabled={!videoValidated}
              className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px] disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Submit for Review
            </button>
          </div>
          {videoValidated && !videoSubmitted && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <iconify-icon icon="solar:check-circle-linear" width="13" class="text-emerald-500" />
              URL looks valid — submit for admin review.
            </p>
          )}
          {videoSubmitted && (
            <p className="text-xs text-emerald-400 flex items-center gap-1">
              <iconify-icon icon="solar:check-circle-linear" width="13" class="text-emerald-500" />
              Submitted for review — not yet live.
            </p>
          )}
        </div>
      </section>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
