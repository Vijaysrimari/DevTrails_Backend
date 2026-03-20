export default function StatCard({ label, value, tone = "text-brand-ink" }) {
  return (
    <div className="kpi-card fade-in-up">
      <p className="text-sm text-slate-500">{label}</p>
      <p className={`mt-2 text-2xl font-semibold ${tone}`}>{value}</p>
    </div>
  );
}
