function RiskAnalystCard({ summary }) {
  if (!summary) {
    return null;
  }

  const priorityStyles = {
    High: "border-red-500/30 bg-red-500/10 text-red-300",
    Medium: "border-amber-500/30 bg-amber-500/10 text-amber-300",
    Low: "border-emerald-500/30 bg-emerald-500/10 text-emerald-300",
  };

  const priorityStyle =
    priorityStyles[summary.priority] || priorityStyles.Low;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-violet-400">
            AI Risk Analyst
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            {summary.decision}
          </h2>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${priorityStyle}`}
        >
          {summary.priority} Priority
        </span>
      </div>

      <div className="mt-6">
        <p className="text-xs uppercase tracking-wider text-slate-500">
          Assessment
        </p>

        <p className="mt-2 leading-7 text-slate-300">
          {summary.reason}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-violet-500/20 bg-violet-500/5 p-4">
        <p className="text-xs uppercase tracking-wider text-violet-400">
          Recommended Action
        </p>

        <p className="mt-2 leading-6 text-slate-200">
          {summary.recommended_action}
        </p>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-slate-500">
          Fraud probability
        </span>

        <span className="font-semibold text-white">
          {summary.fraud_probability_percent.toFixed(2)}%
        </span>
      </div>
    </div>
  );
}

export default RiskAnalystCard;