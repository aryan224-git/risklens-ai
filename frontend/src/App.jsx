import { useEffect, useState } from "react";
import TransactionForm from "./components/TransactionForm";
import PredictionCard from "./components/PredictionCard";
import ExplanationCard from "./components/ExplanationCard";
import {
  predictTransaction,
  checkHealth,
} from "./services/api";

function App() {
  const [backendOnline, setBackendOnline] = useState(false);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkBackend = async () => {
      try {
        await checkHealth();
        setBackendOnline(true);
      } catch {
        setBackendOnline(false);
      }
    };

    checkBackend();
  }, []);

  const handlePrediction = async (transaction) => {
    try {
      setLoading(true);
      setError("");

      const data = await predictTransaction(transaction);

      setResult(data);
      setBackendOnline(true);
    } catch (err) {
      console.error(err);

      setBackendOnline(false);

      setError(
        "Unable to analyze transaction. Please verify the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen text-slate-200">
      <header className="border-b border-white/10 bg-slate-950/40 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-white">
              RiskLens AI
            </h1>

            <p className="mt-1 text-sm text-slate-400">
              Intelligent fraud risk analysis for modern payment systems
            </p>
          </div>

          <div
            className={`hidden rounded-full border px-4 py-2 text-sm md:block ${
              backendOnline
                ? "border-emerald-500/20 bg-emerald-500/10 text-emerald-300"
                : "border-red-500/20 bg-red-500/10 text-red-300"
            }`}
          >
            ● {backendOnline ? "Model Online" : "Model Offline"}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        <section className="mb-8">
          <p className="text-sm font-medium text-cyan-400">
            AI Risk Operations Console
          </p>

          <h2 className="mt-2 max-w-3xl text-4xl font-bold leading-tight text-white">
            Detect suspicious transactions before they become losses.
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            RiskLens AI analyzes transaction behavior and returns fraud
            probability, model confidence, operational risk level, and
            explainable model insights.
          </p>
        </section>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-red-300">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <TransactionForm
            onSubmit={handlePrediction}
            loading={loading}
          />

          <div className="space-y-6">
            <PredictionCard result={result} />

            <ExplanationCard factors={result?.top_factors} />

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">
                System Status
              </p>

              <div className="mt-4 space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Backend API
                  </span>

                  <span
                    className={
                      backendOnline
                        ? "text-emerald-300"
                        : "text-red-300"
                    }
                  >
                    {backendOnline ? "Operational" : "Offline"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Fraud Model
                  </span>

                  <span
                    className={
                      backendOnline
                        ? "text-emerald-300"
                        : "text-red-300"
                    }
                  >
                    {backendOnline ? "Loaded" : "Unavailable"}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-slate-400">
                    Explainability
                  </span>

                  <span
                    className={
                      backendOnline
                        ? "text-emerald-300"
                        : "text-red-300"
                    }
                  >
                    {backendOnline ? "SHAP Active" : "Unavailable"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;