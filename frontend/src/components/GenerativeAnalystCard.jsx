function GenerativeAnalystCard({ analysis }) {
  if (!analysis) {
    return null;
  }

  const isGemini = analysis.source === "gemini";

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-fuchsia-400">
            Generative AI Analyst
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-white">
            Investigation Brief
          </h2>
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-semibold ${
            isGemini
              ? "border-fuchsia-500/30 bg-fuchsia-500/10 text-fuchsia-300"
              : "border-slate-500/30 bg-slate-500/10 text-slate-300"
          }`}
        >
          {isGemini ? "Gemini" : "Fallback"}
        </span>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <p className="whitespace-pre-line leading-7 text-slate-300">
          {analysis.summary}
        </p>
      </div>

      <div className="mt-5 rounded-2xl border border-fuchsia-500/20 bg-fuchsia-500/5 p-4">
        <p className="text-xs uppercase tracking-wider text-fuchsia-400">
          Recommended Next Step
        </p>

        <p className="mt-2 leading-6 text-slate-200">
          {analysis.recommended_next_step}
        </p>
      </div>

      <p className="mt-4 text-xs text-slate-500">
        Generated from fraud probability, SHAP evidence, and the deterministic risk decision.
      </p>
    </div>
  );
}

export default GenerativeAnalystCard;