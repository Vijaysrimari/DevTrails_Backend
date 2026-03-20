import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import TopNav from "../components/TopNav";
import { useAuth } from "../context/AuthContext";
import { apiClient } from "../services/api";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
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
      const response = await apiClient.post("/auth/login", form);
      const user = response.data;
      setAuthUser(user);
      navigate(user.role === "admin" ? "/admin" : "/dashboard");
    } catch (requestError) {
      setError(requestError?.response?.data?.detail || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#F7F8FC] pb-12">
      <TopNav />

      <section className="mx-auto flex max-w-md items-center px-4 py-14">
        <div className="w-full rounded-[20px] border border-[#E4E8F0] bg-white p-7">
          <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-[#E4E8F0] bg-[#F7F8FC]">
            <svg viewBox="0 0 24 24" className="h-6 w-6 text-[#0B1120]" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 3L4 7V12C4 16.97 7.41 21.62 12 23C16.59 21.62 20 16.97 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8.5 12.5L11 15L15.5 10.5" stroke="#00A87A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h1 className="mt-4 text-2xl font-semibold text-[#0B1120]">Welcome back</h1>
          <p className="mt-1 text-sm text-[#5A6578]">Login to your GigShield account</p>

          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            <label className="block text-sm">
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

            <label className="block text-sm">
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

            {error ? (
              <p className="rounded-2xl border border-[#F7D0D0] bg-[#FFF0F0] p-3 text-sm text-[#E03E3E]">{error}</p>
            ) : null}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl border border-[#0B1120] bg-[#0B1120] py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="mt-5 text-sm text-[#5A6578]">
            New user?{" "}
            <Link to="/signup" className="font-semibold text-[#0B1120] underline decoration-[#F5A623] decoration-2 underline-offset-4">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
