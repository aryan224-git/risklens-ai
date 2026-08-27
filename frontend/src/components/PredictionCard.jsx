function PredictionCard({ result }) {
  if (!result) {
    return (
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
          Risk Intelligence
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Awaiting analysis
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-400">
          Submit a transaction to view fraud probability, risk level, and model
          decision.
        </p>
      </div>
    );
  }

  const isHigh = result.risk_level === "High";
  const isMedium = result.risk_level === "Medium";

  const riskStyles = isHigh
    ? "border-red-500/30 bg-red-500/10 text-red-300"
    : isMedium
      ? "border-amber-500/30 bg-amber-500/10 text-amber-300"
      : "border-emerald-500/30 bg-emerald-500/10 text-emerald-300";

  const probability = (result.fraud_probability * 100).toFixed(2);

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
        Risk Intelligence
      </p>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-slate-400">Prediction</p>
          <h2 className="mt-1 text-3xl font-bold text-white">
            {result.prediction}
          </h2>
        </div>

        <span
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${riskStyles}`}
        >
          {result.risk_level} Risk
        </span>
      </div>

      <div className="mt-8">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm text-slate-400">Fraud probability</span>
          <span className="font-semibold text-white">{probability}%</span>
        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-800">
          <div
            className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 transition-all duration-500"
            style={{ width: `${Math.min(Number(probability), 100)}%` }}
          />
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4">
        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Confidence
          </p>
          <p className="mt-2 text-xl font-semibold text-white">
            {result.confidence}
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-slate-950/40 p-4">
          <p className="text-xs uppercase tracking-wider text-slate-500">
            Risk Level
          </p>
          <p className="mt-2 text-xl font-semibold text-white">
            {result.risk_level}
          </p>
        </div>
      </div>
    </div>
  );
}

export default PredictionCard;