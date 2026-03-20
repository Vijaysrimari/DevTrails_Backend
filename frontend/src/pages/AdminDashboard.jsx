import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import Sidebar from "../components/Sidebar";
import StatCard from "../components/StatCard";
import { apiClient } from "../services/api";

const PIE_COLORS = ["#2a9d8f", "#fca311", "#e76f51"];

export default function AdminDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchAnalytics() {
      try {
        const response = await apiClient.get("/admin/analytics");
        setAnalytics(response.data);
      } catch {
        setError("Unable to load analytics data");
      }
    }
    fetchAnalytics();
  }, []);

  return (
    <main className="mx-auto grid max-w-7xl gap-6 px-4 py-8 lg:grid-cols-[280px_1fr]">
      <Sidebar />

      <div className="space-y-6">
        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Workers Insured" value={analytics?.total_workers_insured || "--"} />
          <StatCard label="Active Policies" value={analytics?.active_policies || "--"} tone="text-brand-mint" />
          <StatCard label="Claims Triggered" value={analytics?.claims_triggered || "--"} tone="text-brand-coral" />
          <StatCard
            label="Total Payouts"
            value={analytics ? `Rs ${analytics.total_payouts.toLocaleString()}` : "--"}
            tone="text-brand-ocean"
          />
        </section>

        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-600">{error}</p> : null}

        <section className="grid gap-4 xl:grid-cols-3">
          <article className="card-surface p-5 xl:col-span-1">
            <h3 className="font-heading text-lg text-brand-ink">Risk Distribution</h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie dataKey="value" data={analytics?.risk_distribution || []} outerRadius={90} label>
                    {(analytics?.risk_distribution || []).map((entry, index) => (
                      <Cell key={entry.name} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </article>

          <article className="card-surface p-5 xl:col-span-2">
            <h3 className="font-heading text-lg text-brand-ink">Premium Revenue</h3>
            <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={analytics?.premium_revenue || []}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#415a77" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </article>
        </section>

        <section className="card-surface p-5">
          <h3 className="font-heading text-lg text-brand-ink">Weather Disruptions</h3>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={analytics?.weather_disruptions || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="incidents" fill="#e76f51" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </section>
      </div>
    </main>
  );
}
