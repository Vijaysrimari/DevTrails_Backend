import TopNav from "../components/TopNav";

const riskBars = [
  { label: "Rainfall", value: 34, color: "bg-[#00A87A]" },
  { label: "AQI", value: 41, color: "bg-[#F5A623]" },
  { label: "Flood Risk", value: 23, color: "bg-[#00A87A]" },
  { label: "Heat Index", value: 29, color: "bg-[#F5A623]" },
];

const payouts = [
  { event: "Heavy Rainfall Trigger", date: "15 Mar 2026", amount: "Rs 1,250", status: "PAID", tone: "bg-[#00A87A]" },
  { event: "AQI Disruption Compensation", date: "11 Mar 2026", amount: "Rs 920", status: "PAID", tone: "bg-[#00A87A]" },
  { event: "Flash Flood Route Shutdown", date: "08 Mar 2026", amount: "Rs 1,600", status: "PENDING", tone: "bg-[#E03E3E]" },
  { event: "Heatwave Surge Benefit", date: "03 Mar 2026", amount: "Rs 780", status: "PAID", tone: "bg-[#00A87A]" },
];

export default function WorkerDashboard() {
  return (
    <main className="min-h-screen bg-[#F7F8FC] pb-10">
      <TopNav />

      <section className="mx-auto mt-8 grid max-w-6xl gap-6 px-4 sm:px-6 lg:grid-cols-[1.1fr_1fr]">
        <article className="rounded-2xl border border-[#E4E8F0] bg-white p-6">
          <p className="text-sm font-medium uppercase tracking-[0.14em] text-[#5A6578]">Zone Risk Score</p>
          <div className="mt-4 flex flex-wrap items-end gap-3">
            <p className="text-6xl font-semibold leading-none text-[#00A87A]">27</p>
            <p className="pb-2 text-2xl text-[#5A6578]">/100</p>
            <span className="ml-auto rounded-full border border-[#BCEEDD] bg-[#E6FBF5] px-4 py-1 text-xs font-semibold text-[#00A87A]">
              LOW RISK
            </span>
          </div>

          <div className="mt-8 space-y-5">
            {riskBars.map((bar) => (
              <div key={bar.label}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-[#0B1120]">{bar.label}</span>
                  <span className="text-[#5A6578]">{bar.value}/100</span>
                </div>
                <div className="h-3 rounded-full border border-[#E4E8F0] bg-[#F7F8FC] p-[1px]">
                  <div className={`h-full rounded-full ${bar.color}`} style={{ width: `${bar.value}%` }} />
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="rounded-2xl border border-[#E4E8F0] bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#0B1120]">Recent Payouts</h2>
            <p className="text-sm text-[#5A6578]">Last 30 days</p>
          </div>

          <div className="mt-5 space-y-3">
            {payouts.map((payout) => (
              <div key={`${payout.event}-${payout.date}`} className="rounded-2xl border border-[#E4E8F0] bg-[#FBFCFF] p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className={`mt-2 h-2.5 w-2.5 rounded-full ${payout.tone}`} />
                    <div>
                      <p className="text-sm font-semibold text-[#0B1120]">{payout.event}</p>
                      <p className="text-xs text-[#5A6578]">{payout.date}</p>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#00A87A]">{payout.amount}</p>
                    <span
                      className={[
                        "mt-1 inline-flex rounded-full px-3 py-1 text-[11px] font-semibold",
                        payout.status === "PAID"
                          ? "border border-[#BCEEDD] bg-[#E6FBF5] text-[#00A87A]"
                          : "border border-[#F7D0D0] bg-[#FFF0F0] text-[#E03E3E]",
                      ].join(" ")}
                    >
                      {payout.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
