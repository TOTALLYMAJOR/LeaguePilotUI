// Reusable status badge — maps status strings to colours.
const VARIANTS = {
  // content states
  draft:           "bg-gray-900 text-gray-300 border-gray-700",
  "awaiting approval": "bg-yellow-950 text-yellow-300 border-yellow-800",
  published:       "bg-emerald-950 text-emerald-300 border-emerald-700",
  sent:            "bg-blue-950 text-blue-300 border-blue-800",
  queued:          "bg-indigo-950 text-indigo-300 border-indigo-800",
  failed:          "bg-red-950 text-red-300 border-red-800",
  suppressed:      "bg-gray-900 text-gray-400 border-gray-700",
  disconnected:    "bg-orange-950 text-orange-300 border-orange-800",
  // access states
  active:          "bg-emerald-950 text-emerald-300 border-emerald-700",
  pending:         "bg-yellow-950 text-yellow-300 border-yellow-800",
  "pending access":"bg-yellow-950 text-yellow-300 border-yellow-800",
  denied:          "bg-red-950 text-red-300 border-red-800",
  "read-only":     "bg-gray-900 text-gray-400 border-gray-700",
  "audit recorded":"bg-purple-950 text-purple-300 border-purple-800",
  // event states
  confirmed:       "bg-emerald-950 text-emerald-300 border-emerald-700",
  changed:         "bg-indigo-950 text-indigo-300 border-indigo-800",
  cancelled:       "bg-red-950 text-red-300 border-red-800",
  completed:       "bg-gray-900 text-gray-400 border-gray-700",
  "needs attention":"bg-yellow-950 text-yellow-300 border-yellow-800",
  // invite states
  accepted:        "bg-emerald-950 text-emerald-300 border-emerald-700",
  expired:         "bg-orange-950 text-orange-300 border-orange-800",
  revoked:         "bg-red-950 text-red-300 border-red-800",
  // misc
  approved:        "bg-emerald-950 text-emerald-300 border-emerald-700",
  rejected:        "bg-red-950 text-red-300 border-red-800",
  open:            "bg-cyan-950 text-cyan-300 border-cyan-800",
  filled:          "bg-gray-900 text-gray-400 border-gray-700",
  "coming up soon":"bg-indigo-950 text-indigo-300 border-indigo-800",
  pass:            "bg-emerald-950 text-emerald-300 border-emerald-700",
  warn:            "bg-yellow-950 text-yellow-300 border-yellow-800",
  fail:            "bg-red-950 text-red-300 border-red-800",
};

export default function StatusBadge({ status, label, className = "" }) {
  const key = (status || "").toLowerCase();
  const cls = VARIANTS[key] || "bg-gray-900 text-gray-300 border-gray-700";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${cls} ${className}`}>
      {label || status}
    </span>
  );
}
