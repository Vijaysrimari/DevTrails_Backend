import { Link, useLocation } from "react-router-dom";
import { FiActivity, FiBarChart2, FiHome, FiShield, FiUser } from "react-icons/fi";

import { useAuth } from "../context/AuthContext";

const navByRole = {
  worker: [
    { to: "/dashboard", label: "Dashboard", icon: FiHome },
    { to: "/dashboard", label: "Policy & Claims", icon: FiShield },
  ],
  admin: [
    { to: "/admin", label: "Admin Dashboard", icon: FiBarChart2 },
    { to: "/admin", label: "Risk Monitor", icon: FiActivity },
  ],
};

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const navItems = navByRole[user?.role || "worker"];

  return (
    <aside className="card-surface h-fit w-full p-4 lg:w-72">
      <div className="mb-6 flex items-center gap-3 rounded-xl bg-brand-ink p-3 text-brand-mist">
        <FiUser className="text-lg" />
        <div>
          <p className="text-sm font-semibold">{user?.full_name || "Guest"}</p>
          <p className="text-xs uppercase tracking-wide text-brand-mist/80">{user?.role || "worker"}</p>
        </div>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = location.pathname === item.to;
          return (
            <Link
              key={`${item.to}-${item.label}`}
              to={item.to}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active
                  ? "bg-brand-deep text-brand-mist"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <Icon />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <button
        type="button"
        onClick={logout}
        className="mt-6 w-full rounded-xl bg-brand-coral px-4 py-3 text-sm font-semibold text-white transition hover:opacity-90"
      >
        Logout
      </button>
    </aside>
  );
}
