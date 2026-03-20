import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TopNav from "../components/TopNav";
import { useAuth } from "../context/AuthContext";
import { apiClient } from "../services/api";

const initialState = {
  full_name: "",
  phone_number: "",
  email: "",
  password: "",
  delivery_platform: "Zomato",
  city: "",
  pin_code: "",
  weekly_earnings: "",
  upi_id: "",
};

export default function SignupPage() {
  const [form, setForm] = useState(initialState);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuthUser } = useAuth();

  function onChange(event) {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        full_name: form.full_name,
        phone_number: form.phone_number,
        email: form.email,
        password: form.password,
        delivery_platform: form.delivery_platform,
        city: form.city,
        delivery_zone: form.pin_code,
        weekly_earnings: Number(form.weekly_earnings),
        upi_id: form.upi_id,
        role: "worker",
      };
      const response = await apiClient.post("/auth/signup", payload);
      setAuthUser(response.data);
      navigate(response.data.role === "admin" ? "/admin" : "/dashboard");
    } catch (requestError) {
      setError(requestError?.response?.data?.detail || "Signup failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] pb-12">
      <TopNav />

      <section className="mx-auto mt-10 max-w-5xl px-4 sm:px-6">
        <div className="rounded-[20px] border border-[#E4E8F0] bg-white p-6 md:p-8">
          <h1 className="font-heading text-3xl font-semibold text-[#0B1120]">Create your GigShield account</h1>
          <p className="mt-2 text-sm text-[#5A6578]">AI-powered income protection setup for delivery workers.</p>

          <form onSubmit={onSubmit} className="mt-7 grid gap-4 md:grid-cols-2">
            <label className="text-sm">
              <span className="mb-1 block font-medium text-[#0B1120]">Full Name</span>
              <input
                name="full_name"
                required
                value={form.full_name}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-[#0B1120]">Phone</span>
              <input
                name="phone_number"
                required
                value={form.phone_number}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-[#0B1120]">Email</span>
              <input
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-[#0B1120]">Password</span>
              <input
                name="password"
                type="password"
                required
                value={form.password}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-[#0B1120]">Delivery Platform</span>
              <select
                name="delivery_platform"
                value={form.delivery_platform}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              >
                <option>Zomato</option>
                <option>Swiggy</option>
                <option>Zepto</option>
                <option>Amazon</option>
                <option>Blinkit</option>
              </select>
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-[#0B1120]">City</span>
              <input
                name="city"
                required
                value={form.city}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-[#0B1120]">PIN Code</span>
              <input
                name="pin_code"
                required
                value={form.pin_code}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              />
            </label>

            <label className="text-sm">
              <span className="mb-1 block font-medium text-[#0B1120]">Weekly Earnings</span>
              <input
                name="weekly_earnings"
                type="number"
                min="0"
                required
                value={form.weekly_earnings}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              />
            </label>

            <label className="text-sm md:col-span-2">
              <span className="mb-1 block font-medium text-[#0B1120]">UPI ID</span>
              <input
                name="upi_id"
                required
                value={form.upi_id}
                onChange={onChange}
                className="w-full rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC] px-4 py-3 outline-none focus:border-[#0B1120]"
              />
            </label>

            {error ? (
              <p className="rounded-2xl border border-[#F7D0D0] bg-[#FFF0F0] p-3 text-sm text-[#E03E3E] md:col-span-2">
                {error}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 rounded-2xl border border-[#0B1120] bg-[#0B1120] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <p className="mt-6 text-sm text-[#5A6578]">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-[#0B1120] underline decoration-[#F5A623] decoration-2 underline-offset-4">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
