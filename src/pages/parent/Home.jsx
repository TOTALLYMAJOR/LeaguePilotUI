import { useState } from "react";
import { EVENTS, MESSAGES, VOLUNTEERS } from "../../data/demo.js";
import StatusBadge from "../../components/StatusBadge.jsx";

const DAYS = [
  { label: "Mon", date: 1 },
  { label: "Tue", date: 2 },
  { label: "Wed", date: 3 },
  { label: "Thu", date: 4 },
  { label: "Fri", date: 5 },
  { label: "Sat", date: 6 },
  { label: "Sun", date: 7 },
];

export default function Home() {
  const event = EVENTS[0];
  const unread = MESSAGES.filter((m) => !m.read).length;
  const newPhotos = 3;

  return (
    <div className="flex flex-col gap-6 pb-10">
      {/* Page header */}
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2
          className="text-2xl font-semibold tracking-tight text-emerald-100"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          Home
        </h2>
      </div>

      {/* 7-day calendar ribbon */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {DAYS.map((d) => {
          const isToday = d.date === 5;
          return (
            <div
              key={d.date}
              className={`flex flex-col items-center justify-center min-w-[48px] h-[56px] rounded-xl border transition-colors ${
                isToday
                  ? "bg-cyan-400 border-cyan-400 text-black"
                  : "bg-black border-emerald-800 text-emerald-400"
              }`}
            >
              <span className={`text-[10px] font-semibold uppercase ${isToday ? "text-black" : "text-emerald-500"}`}>
                {d.label}
              </span>
              <span className={`text-lg font-bold leading-tight ${isToday ? "text-black" : "text-emerald-100"}`}>
                {d.date}
              </span>
            </div>
          );
        })}
      </div>

      {/* Next Event */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Next Event</h3>
        <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 bg-black border-emerald-800">
          <div className="flex items-start gap-3">
            <span className="text-3xl">{event.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-emerald-100 font-semibold text-base">{event.title}</span>
                <StatusBadge status="confirmed" label="Jake: Confirmed" />
              </div>
              <p className="text-sm text-emerald-400 mt-0.5">
                {event.date} · {event.time} – {event.endTime}
              </p>
              <p className="text-sm text-emerald-400">{event.location} · Arrive {event.arrivalTime}</p>
              <p className="text-sm text-emerald-500 mt-1">
                <iconify-icon icon="solar:cloud-sun-linear" width="14" className="mr-1" />
                {event.weather}
              </p>
            </div>
          </div>
          {event.changed && (
            <div className="mt-3 flex items-center gap-2 bg-indigo-950 border border-indigo-800 rounded-lg px-3 py-2">
              <iconify-icon icon="solar:bell-linear" width="16" className="text-indigo-300 shrink-0" />
              <span className="text-sm text-indigo-300">{event.changeNote}</span>
            </div>
          )}
        </div>
      </section>

      {/* What Changed */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">What Changed</h3>
        <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 bg-black border-emerald-800 flex items-start gap-3">
          <iconify-icon icon="solar:info-circle-linear" width="20" className="text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-100">{event.changeNote}</p>
            <p className="text-xs text-emerald-500 mt-0.5">Updated {event.changeTime}</p>
          </div>
        </div>
      </section>

      {/* What You Need To Do */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">What You Need To Do</h3>
        <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 bg-black border-emerald-800 flex items-start gap-3">
          <iconify-icon icon="solar:hand-stars-linear" width="20" className="text-cyan-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-emerald-100">You're signed up for snacks on July 12</p>
            <p className="text-xs text-emerald-500 mt-0.5">Post-game snacks for 12 kids · Valley Stars Game</p>
          </div>
        </div>
      </section>

      {/* From Your Coach */}
      {event.coachNote && (
        <section className="flex flex-col gap-3">
          <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">From Your Coach</h3>
          <div className="rounded-xl border shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 bg-black border-emerald-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-full bg-emerald-900 flex items-center justify-center text-xs font-bold text-emerald-300">
                CM
              </div>
              <span className="text-sm font-semibold text-emerald-100">{event.coachName}</span>
            </div>
            <p className="text-sm text-emerald-300 italic">"{event.coachNote}"</p>
          </div>
        </section>
      )}

      {/* Quick Links */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Quick Access</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-center gap-3 hover:bg-emerald-950 transition-colors cursor-pointer">
            <iconify-icon icon="solar:chat-round-line-linear" width="22" className="text-cyan-400" />
            <div>
              <p className="text-sm font-semibold text-emerald-100">Messages</p>
              {unread > 0 && (
                <span className="text-xs text-cyan-400 font-medium">{unread} unread</span>
              )}
            </div>
          </div>
          <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-center gap-3 hover:bg-emerald-950 transition-colors cursor-pointer">
            <iconify-icon icon="solar:gallery-linear" width="22" className="text-cyan-400" />
            <div>
              <p className="text-sm font-semibold text-emerald-100">Photos</p>
              {newPhotos > 0 && (
                <span className="text-xs text-cyan-400 font-medium">{newPhotos} new</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy footer */}
      <p className="text-xs text-emerald-600 text-center mt-2">
        <iconify-icon icon="solar:shield-check-linear" width="12" className="mr-1" />
        Your family's data is only shared with your team. Demo data — changes are not persisted.
      </p>
    </div>
  );
}
