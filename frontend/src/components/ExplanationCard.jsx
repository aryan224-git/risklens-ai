function ExplanationCard({ factors }) {
  if (!factors || factors.length === 0) {
    return null;
  }

  const maxImpact = Math.max(
    ...factors.map((factor) => factor.impact)
  );

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          Explainable AI
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Why this decision?
        </h2>

        <p className="mt-2 text-sm text-slate-400">
         Top features influencing the model's decision.
        </p>
      </div>

      <div className="space-y-5">
        {factors.map((factor) => {
          const increasesRisk =
            factor.direction === "increases risk";

          const width =
            (factor.impact / maxImpact) * 100;

          return (
            <div key={factor.feature}>
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-white">
                    {factor.feature}
                  </span>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      increasesRisk
                        ? "bg-red-500/10 text-red-300"
                        : "bg-emerald-500/10 text-emerald-300"
                    }`}
                  >
                    {increasesRisk ? "↑" : "↓"}{" "}
                    {factor.direction}
                  </span>
                </div>

                <span className="text-sm text-slate-400">
                  {factor.impact.toFixed(4)}
                </span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-800">
                <div
                  className={`h-full rounded-full ${
                    increasesRisk
                      ? "bg-red-500"
                      : "bg-emerald-500"
                  }`}
                  style={{
                    width: `${width}%`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <p className="text-xs leading-5 text-slate-400">
          Feature contributions are generated using SHAP. Positive
          contributions push the model toward fraud, while negative
          contributions push it toward a legitimate classification.
        </p>
      </div>
    </div>
  );
}

export default ExplanationCard;