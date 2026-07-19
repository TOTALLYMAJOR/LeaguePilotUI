import { FAMILY_WALLET } from "../../data/demo.js";
import StatusBadge from "../../components/StatusBadge.jsx";

const STATUS_MAP = {
  paid: "confirmed",
  unpaid: "pending",
  applied: "approved",
};

export default function Wallet() {
  const paid = FAMILY_WALLET.filter((i) => i.status === "paid" || i.status === "applied");
  const outstanding = FAMILY_WALLET.filter((i) => i.status === "unpaid");

  function parseAmount(str) {
    return parseFloat(str.replace(/[^0-9.\-]/g, ""));
  }

  const totalPaid = paid.reduce((sum, i) => sum + parseAmount(i.amount), 0);
  const totalOwed = outstanding.reduce((sum, i) => sum + parseAmount(i.amount), 0);

  return (
    <div className="flex flex-col gap-6 pb-10">
      <div className="hidden md:flex items-center justify-between mb-2">
        <h2
          className="text-2xl font-semibold tracking-tight text-emerald-100"
          style={{ fontFamily: "'Plus Jakarta Sans',sans-serif" }}
        >
          Family Wallet
        </h2>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border bg-black border-emerald-800 p-4">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Total Paid</p>
          <p className="text-2xl font-bold text-emerald-100">${totalPaid.toFixed(2)}</p>
          <p className="text-xs text-emerald-600 mt-0.5">Confirmed payments</p>
        </div>
        <div className="rounded-xl border bg-black border-emerald-800 p-4">
          <p className="text-xs font-semibold text-emerald-500 uppercase tracking-wider mb-1">Outstanding</p>
          <p className={`text-2xl font-bold ${totalOwed > 0 ? "text-red-400" : "text-emerald-100"}`}>
            ${totalOwed.toFixed(2)}
          </p>
          <p className="text-xs text-emerald-600 mt-0.5">
            {totalOwed > 0 ? "Payment due" : "All clear"}
          </p>
        </div>
      </div>

      {/* Line items */}
      <section className="flex flex-col gap-3">
        <h3 className="text-xs font-semibold text-emerald-500 uppercase tracking-wider px-1">Charges &amp; Credits</h3>
        <div className="rounded-xl border bg-black border-emerald-800 overflow-hidden">
          {FAMILY_WALLET.map((item, idx) => (
            <div key={item.label}>
              <div className="flex items-center gap-3 px-4 py-3">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-emerald-100">{item.label}</p>
                  {item.proof && (
                    <p className="text-xs text-emerald-600 mt-0.5">{item.proof}</p>
                  )}
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span
                    className={`text-sm font-semibold ${
                      item.status === "unpaid" ? "text-red-400" : "text-emerald-100"
                    }`}
                  >
                    {item.amount}
                  </span>
                  <StatusBadge status={STATUS_MAP[item.status] || item.status} label={item.status.charAt(0).toUpperCase() + item.status.slice(1)} />
                </div>
              </div>
              {idx < FAMILY_WALLET.length - 1 && <div className="h-px w-full bg-emerald-900" />}
            </div>
          ))}
        </div>
      </section>

      {/* Note */}
      <div className="flex items-start gap-2 rounded-xl border bg-black border-emerald-800 px-4 py-3">
        <iconify-icon icon="solar:info-circle-linear" width="16" className="text-emerald-600 shrink-0 mt-0.5" />
        <p className="text-xs text-emerald-600">
          This wallet shows a summary only. Payments are processed separately through your league's payment provider.
        </p>
      </div>

      {/* Contact admin */}
      <div className="text-center">
        <p className="text-xs text-emerald-600 mb-1">Have a question about a charge?</p>
        <a href="#" className="text-cyan-400 hover:text-cyan-300 text-sm font-medium">
          Contact your league admin →
        </a>
      </div>

      <p className="text-xs text-emerald-600 text-center mt-2">Demo data — changes are not persisted.</p>
    </div>
  );
}
