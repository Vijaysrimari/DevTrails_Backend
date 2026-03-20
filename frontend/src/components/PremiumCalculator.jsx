import { useState } from "react";

import { apiClient } from "../services/api";

const initialForm = {
  rainfall: "",
  flood_risk: "",
  aqi: "",
  disruption_days: "",
  worker_income: "",
  zone_risk: "",
};

export default function PremiumCalculator() {
  const [form, setForm] = useState(initialForm);
  const [premium, setPremium] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = Object.fromEntries(
        Object.entries(form).map(([key, value]) => [key, Number(value)])
      );
      const response = await apiClient.post("/predict", payload);
      setPremium(response.data.predicted_premium);
    } catch (requestError) {
      setError(
        requestError?.response?.data?.detail || "Unable to calculate premium. Please check inputs and retry."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card-surface p-6">
      <h3 className="font-heading text-xl text-brand-ink">Premium Calculator</h3>
      <p className="mt-2 text-sm text-slate-600">
        Enter weather and income signals to get AI-generated weekly premium recommendations.
      </p>

      <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2">
        {Object.entries(initialForm).map(([field]) => (
          <label key={field} className="text-sm">
            <span className="mb-1 block font-medium capitalize text-slate-700">{field.replaceAll("_", " ")}</span>
            <input
              name={field}
              type="number"
              min="0"
              required
              value={form[field]}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 bg-white px-3 py-2 outline-none transition focus:border-brand-ocean"
            />
          </label>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-brand-deep px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-ink disabled:opacity-70"
          >
            {loading ? "Calculating..." : "Calculate Premium"}
          </button>
        </div>
      </form>

      {premium !== null ? (
        <p className="mt-4 rounded-xl bg-brand-mint/15 p-4 text-lg font-semibold text-brand-deep">
          Recommended Weekly Premium: Rs {premium}
        </p>
      ) : null}

      {error ? <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p> : null}
    </section>
  );
}
