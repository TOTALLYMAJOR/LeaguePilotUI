import { useState } from "react";
import { PHOTOS } from "../../data/demo.js";

export default function Photos() {
  const [selected, setSelected] = useState(null);
  const newCount = PHOTOS.filter((p) => p.isNew).length;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2
          className="text-2xl font-semibold tracking-tight text-emerald-100"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          Photos
        </h2>
        {newCount > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-cyan-950 text-cyan-300 border-cyan-800">
            {newCount} new
          </span>
        )}
      </div>

      {/* Mobile header */}
      <div className="flex md:hidden items-center justify-between">
        <span className="text-sm text-emerald-400">Team photos</span>
        {newCount > 0 && (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border bg-cyan-950 text-cyan-300 border-cyan-800">
            {newCount} new
          </span>
        )}
      </div>

      {/* Gallery grid */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">All Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {PHOTOS.map((photo) => (
            <div
              key={photo.id}
              className="relative group rounded-xl overflow-hidden border border-emerald-800 cursor-pointer"
              onClick={() => setSelected(photo)}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {photo.isNew && (
                <span className="absolute top-2 left-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-400 text-black">
                  New
                </span>
              )}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors" />
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/80 to-transparent">
                <p className="text-xs text-emerald-200 truncate">{photo.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center gap-2 rounded-xl border bg-black border-emerald-800 px-4 py-3">
        <iconify-icon icon="solar:shield-check-linear" width="16" className="text-emerald-600 shrink-0" />
        <p className="text-xs text-emerald-600">Only approved team media is shown here.</p>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative max-w-2xl w-full rounded-2xl overflow-hidden border border-emerald-800 bg-black"
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.url} alt={selected.caption} className="w-full max-h-[60vh] object-cover" />
            <div className="p-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-emerald-100">{selected.caption}</p>
                <p className="text-xs text-emerald-500 mt-0.5">
                  By {selected.uploadedBy} · {selected.date}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button className="px-3 py-1.5 rounded-lg border border-red-800 text-red-400 text-xs font-medium hover:bg-red-950 transition-colors min-h-[36px]">
                  Report
                </button>
                <button
                  onClick={() => setSelected(null)}
                  className="px-3 py-1.5 rounded-lg border border-emerald-800 text-emerald-300 text-xs font-medium hover:bg-emerald-950 transition-colors min-h-[36px]"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
