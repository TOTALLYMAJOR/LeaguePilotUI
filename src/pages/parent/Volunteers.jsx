import { useState } from "react";
import { VOLUNTEERS } from "../../data/demo.js";
import StatusBadge from "../../components/StatusBadge.jsx";

export default function Volunteers() {
  const [claimed, setClaimed] = useState({});

  const myAssignment = VOLUNTEERS[1]; // Sarah's snack assignment
  const available = VOLUNTEERS[0];   // July 12 open roles

  function handleClaim(roleId) {
    setClaimed((c) => ({ ...c, [roleId]: true }));
  }

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2
          className="text-2xl font-semibold tracking-tight text-emerald-100"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          Volunteer &amp; Snacks
        </h2>
      </div>

      {/* Your assignments */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Your Assignments</h3>
        {myAssignment.roles.map((role) => (
          <div key={role.id} className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
            <iconify-icon icon="solar:hand-stars-linear" width="22" className="text-cyan-400 shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-emerald-100">{role.title}</p>
              <p className="text-sm text-emerald-400 mt-0.5">{role.description}</p>
              <p className="text-xs text-emerald-500 mt-1">{myAssignment.eventTitle}</p>
            </div>
            <StatusBadge status="filled" />
          </div>
        ))}
      </section>

      {/* Available opportunities */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">
          Available — {available.eventTitle}
        </h3>
        {available.roles.map((role) => {
          const isFilled = role.status === "filled" || claimed[role.id];
          const claimedBy = claimed[role.id] ? "Sarah Mitchell" : role.claimedBy;
          return (
            <div key={role.id} className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
              <iconify-icon
                icon={isFilled ? "solar:check-circle-linear" : "solar:add-circle-linear"}
                width="20"
                className={`shrink-0 mt-0.5 ${isFilled ? "text-emerald-500" : "text-cyan-400"}`}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap mb-0.5">
                  <span className="text-sm font-semibold text-emerald-100">{role.title}</span>
                  <StatusBadge status={isFilled ? "filled" : "open"} />
                </div>
                <p className="text-sm text-emerald-400">{role.description}</p>
                {isFilled && claimedBy && (
                  <p className="text-xs text-emerald-600 mt-1">Claimed by {claimedBy}</p>
                )}
              </div>
              {!isFilled && (
                <button
                  onClick={() => handleClaim(role.id)}
                  className="px-4 py-2 rounded-lg bg-cyan-400 text-black text-sm font-semibold hover:bg-cyan-300 transition-colors min-h-[44px] shrink-0"
                >
                  Claim
                </button>
              )}
            </div>
          );
        })}
      </section>

      <div className="flex items-center gap-2 rounded-xl border bg-black border-emerald-800 px-4 py-3">
        <iconify-icon icon="solar:info-circle-linear" width="16" className="text-emerald-600 shrink-0" />
        <p className="text-xs text-emerald-600">
          Volunteer sign-ups are not ranked or publicly visible. Only the coach can see who signed up.
        </p>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
