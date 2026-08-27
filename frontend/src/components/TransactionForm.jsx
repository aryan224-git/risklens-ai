import { useState } from "react";

function TransactionForm({ onSubmit, loading }) {
  const emptyTransaction = {
    Time: 0,
    Amount: 100,
    V1: 0,
    V2: 0,
    V3: 0,
    V4: 0,
    V5: 0,
    V6: 0,
    V7: 0,
    V8: 0,
    V9: 0,
    V10: 0,
    V11: 0,
    V12: 0,
    V13: 0,
    V14: 0,
    V15: 0,
    V16: 0,
    V17: 0,
    V18: 0,
    V19: 0,
    V20: 0,
    V21: 0,
    V22: 0,
    V23: 0,
    V24: 0,
    V25: 0,
    V26: 0,
    V27: 0,
    V28: 0,
  };

  const legitimateSample = {
    ...emptyTransaction,
    Time: 406,
    Amount: 149.62,
  };

  const fraudSample = {
    ...emptyTransaction,
    Time: 472,
    Amount: 0,
    V1: -2.312226542,
    V2: 1.951992011,
    V3: -1.609850732,
    V4: 3.997905588,
    V5: -0.522187865,
    V6: -1.426545319,
    V7: -2.537387306,
    V8: 1.391657248,
    V9: -2.770089277,
    V10: -2.772272145,
    V11: 3.202033207,
    V12: -2.899907388,
    V13: -0.595221881,
    V14: -4.289253782,
    V15: 0.38972412,
    V16: -1.14074718,
    V17: -2.830055675,
    V18: -0.016822469,
    V19: 0.416955705,
    V20: 0.126910559,
    V21: 0.517232371,
    V22: -0.035049369,
    V23: -0.465211076,
    V24: 0.320198199,
    V25: 0.044519167,
    V26: 0.177839798,
    V27: 0.261145003,
    V28: -0.143275875,
  };

  const [formData, setFormData] = useState(emptyTransaction);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const featureKeys = Array.from({ length: 28 }, (_, i) => `V${i + 1}`);

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-xl"
    >
      <div className="mb-6">
        <p className="text-xs uppercase tracking-[0.3em] text-cyan-400">
          Transaction Analysis
        </p>

        <h2 className="mt-2 text-2xl font-semibold text-white">
          Analyze transaction risk
        </h2>

        <p className="mt-2 text-sm text-slate-400">
          Enter transaction features or load a demo sample.
        </p>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-slate-300">
          Transaction Details
        </p>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {["Time", "Amount"].map((key) => (
            <div key={key}>
              <label className="mb-1.5 block text-sm text-slate-400">
                {key}
              </label>

              <input
                type="number"
                step="any"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/70"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <p className="mb-3 text-sm font-semibold text-slate-300">
          Quick Demo
        </p>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={() => setFormData(legitimateSample)}
            className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 font-medium text-emerald-300 transition hover:bg-emerald-500/20"
          >
            Load Legitimate Sample
          </button>

          <button
            type="button"
            onClick={() => setFormData(fraudSample)}
            className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 font-medium text-red-300 transition hover:bg-red-500/20"
          >
            Load Fraud Sample
          </button>
        </div>
      </div>

      <div>
        <p className="mb-3 text-sm font-semibold text-slate-300">
          Model Features
        </p>

        <div className="grid max-h-[420px] grid-cols-1 gap-4 overflow-y-auto pr-2 md:grid-cols-2">
          {featureKeys.map((key) => (
            <div key={key}>
              <label className="mb-1.5 block text-sm text-slate-400">
                {key}
              </label>

              <input
                type="number"
                step="any"
                name={key}
                value={formData[key]}
                onChange={handleChange}
                className="w-full rounded-xl border border-white/10 bg-slate-950/60 px-4 py-3 text-white outline-none transition focus:border-cyan-400/70"
              />
            </div>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-3.5 font-semibold text-white shadow-lg transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Analyzing transaction..." : "Analyze Transaction"}
      </button>
    </form>
  );
}

export default TransactionForm;