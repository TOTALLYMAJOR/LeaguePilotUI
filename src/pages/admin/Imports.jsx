import { useState } from "react";
import StatusBadge from "../../components/StatusBadge.jsx";
import { IMPORT_PREVIEW } from "../../data/demo.js";

export default function Imports() {
  const [skipped, setSkipped] = useState({});

  const toggleSkip = (row) => setSkipped(s => ({ ...s, [row]: !s[row] }));

  const unresolvedErrors = IMPORT_PREVIEW.errors.filter(e => e.severity === "error" && !skipped[e.row]);
  const canImport = unresolvedErrors.length === 0;

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2 className="text-2xl font-semibold tracking-tight text-emerald-100" style={{fontFamily:"'Plus Jakarta Sans',sans-serif"}}>
          Roster Import
        </h2>
      </div>

      {/* Upload zone */}
      <div className="rounded-xl border-2 border-dashed border-emerald-800 bg-black p-10 flex flex-col items-center justify-center gap-3 cursor-pointer hover:border-cyan-600 transition-colors">
        <iconify-icon icon="solar:upload-linear" width="36" className="text-emerald-600" />
        <p className="text-sm text-emerald-400 font-medium">Drag & drop a CSV file here, or click to browse</p>
        <p className="text-xs text-emerald-600">Supported: .csv — max 5 MB</p>
      </div>

      {/* File loaded preview */}
      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-center gap-3">
        <iconify-icon icon="solar:document-text-linear" width="20" className="text-cyan-400" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-emerald-100">{IMPORT_PREVIEW.filename}</p>
          <p className="text-xs text-emerald-500">{IMPORT_PREVIEW.total} rows detected</p>
        </div>
        <StatusBadge status="pending" label="Loaded" />
      </div>

      {/* Validation summary */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Validation Summary</h3>
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-xl border bg-black border-emerald-800 p-4 text-center">
            <p className="text-2xl font-bold text-emerald-400">{IMPORT_PREVIEW.valid}</p>
            <p className="text-xs text-emerald-500 mt-1">Valid rows</p>
          </div>
          <div className="rounded-xl border bg-black border-emerald-800 p-4 text-center">
            <p className="text-2xl font-bold text-red-400">{IMPORT_PREVIEW.errors.filter(e=>e.severity==="error").length}</p>
            <p className="text-xs text-emerald-500 mt-1">Errors</p>
          </div>
          <div className="rounded-xl border bg-black border-emerald-800 p-4 text-center">
            <p className="text-2xl font-bold text-yellow-400">{IMPORT_PREVIEW.errors.filter(e=>e.severity==="warn").length}</p>
            <p className="text-xs text-emerald-500 mt-1">Warnings</p>
          </div>
        </div>
      </section>

      {/* Errors table */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Row Issues</h3>
        <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-emerald-900">
                <th className="text-left p-3 text-emerald-500 font-semibold">Row</th>
                <th className="text-left p-3 text-emerald-500 font-semibold">Field</th>
                <th className="text-left p-3 text-emerald-500 font-semibold">Code</th>
                <th className="text-left p-3 text-emerald-500 font-semibold">Value</th>
                <th className="text-left p-3 text-emerald-500 font-semibold">Severity</th>
                <th className="text-left p-3 text-emerald-500 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {IMPORT_PREVIEW.errors.map(err => (
                <tr key={err.row} className={`border-b border-emerald-900/50 ${skipped[err.row] ? "opacity-40" : ""}`}>
                  <td className="p-3 text-emerald-300 font-mono">{err.row}</td>
                  <td className="p-3 text-emerald-400">{err.field}</td>
                  <td className="p-3 text-emerald-400 font-mono">{err.code}</td>
                  <td className="p-3 text-emerald-300">{err.value || <span className="text-emerald-600 italic">empty</span>}</td>
                  <td className="p-3"><StatusBadge status={err.severity === "error" ? "fail" : "warn"} label={err.severity} /></td>
                  <td className="p-3 flex gap-2">
                    <button onClick={() => toggleSkip(err.row)} className="text-cyan-400 hover:text-cyan-300 text-xs font-medium min-h-[32px]">
                      {skipped[err.row] ? "Unskip" : "Skip row"}
                    </button>
                    <button className="text-emerald-400 hover:text-emerald-300 text-xs font-medium min-h-[32px]">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Confirm import */}
      <div className="flex flex-col gap-3">
        {!canImport && (
          <div className="rounded-lg bg-red-950/30 border border-red-800 p-3 flex items-center gap-2">
            <iconify-icon icon="solar:warning-linear" width="16" className="text-red-400" />
            <p className="text-xs text-red-300">Resolve or skip all error rows before confirming import.</p>
          </div>
        )}
        <button
          disabled={!canImport}
          className={`px-4 py-2 rounded-lg text-sm font-semibold min-h-[44px] transition-colors ${
            canImport
              ? "bg-cyan-400 text-black hover:bg-cyan-300"
              : "bg-emerald-900 text-emerald-600 cursor-not-allowed"
          }`}
        >
          Confirm Import ({IMPORT_PREVIEW.valid + Object.values(skipped).filter(Boolean).length - IMPORT_PREVIEW.errors.filter(e=>e.severity!=="error").length} rows)
        </button>
      </div>

      <div className="rounded-xl border bg-black border-emerald-800 p-4 flex items-start gap-3">
        <iconify-icon icon="solar:info-circle-linear" width="18" className="text-emerald-500 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-400">Invitations are <strong className="text-emerald-200">NOT</strong> sent automatically on import. Send invitations separately after reviewing the roster.</p>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-4">Demo data — changes are not persisted.</p>
    </div>
  );
}
