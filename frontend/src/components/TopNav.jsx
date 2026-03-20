import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Dashboard", to: "/dashboard" },
  { label: "Sign Up", to: "/signup" },
  { label: "Login", to: "/login" },
];

function LogoMark() {
  return (
    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#E4E8F0] bg-white">
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-[#0B1120]" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L4 7V12C4 16.97 7.41 21.62 12 23C16.59 21.62 20 16.97 20 12V7L12 3Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8.5 12.5L11 15L15.5 10.5" stroke="#00A87A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  );
}

export default function TopNav() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function onPrimaryAction() {
    if (user) {
      logout();
      navigate("/login");
      return;
    }
    navigate("/signup");
  }

  return (
    <header className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6">
      <nav className="flex flex-wrap items-center justify-between gap-3 rounded-[20px] border border-[#E4E8F0] bg-white p-3">
        <div className="flex items-center gap-3">
          <LogoMark />
          <div>
            <p className="font-heading text-lg font-semibold text-[#0B1120]">GigShield</p>
            <p className="text-xs text-[#6B7285]">AI income protection</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                [
                  "rounded-[20px] border px-4 py-2 text-sm font-medium transition",
                  isActive
                    ? "border-[#0B1120] bg-[#0B1120] text-white"
                    : "border-[#E4E8F0] bg-[#F7F8FC] text-[#0B1120] hover:-translate-y-0.5 hover:bg-white",
                ].join(" ")
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={onPrimaryAction}
          className="rounded-[20px] border border-[#0B1120] bg-[#0B1120] px-5 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5"
        >
          {user ? "Logout" : "Get Protected"}
        </button>
      </nav>
    </header>
  );
}
