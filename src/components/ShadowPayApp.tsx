import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMiden } from "@miden-sdk/react";
import { useMidenFiWallet } from "@miden-sdk/miden-wallet-adapter-react";
import { WalletReadyState } from "@miden-sdk/miden-wallet-adapter-base";
import { Dashboard } from "./Dashboard";
import { Employees } from "./Employees";
import { Payroll } from "./Payroll";
import { Claim } from "./Claim";
import { Treasury } from "./Treasury";
import { RoleSelect } from "./RoleSelect";
import { LandingPage } from "./LandingPage";
import { roleStore, employerAuth, type Role } from "@/lib/role";

type Page = "dashboard" | "employees" | "payroll" | "claim" | "treasury";

const employerNav = [
  { id: "dashboard" as Page, label: "Home", icon: "⬡" },
  { id: "treasury" as Page, label: "Vault", icon: "◈" },
  { id: "employees" as Page, label: "Team", icon: "◎" },
  { id: "payroll" as Page, label: "Payroll", icon: "◆" },
] as const;

const employeeNav = [
  { id: "dashboard" as Page, label: "Home", icon: "⬡" },
  { id: "claim" as Page, label: "Claim", icon: "◉" },
] as const;

function WalletButton() {
  const { wallet, connected, connecting, connect, disconnect } = useMidenFiWallet();
  const ready =
    wallet?.readyState === WalletReadyState.Installed ||
    wallet?.readyState === WalletReadyState.Loadable;

  if (!ready) return (
    <button className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-xs text-zinc-500">
      Install Wallet
    </button>
  );
  if (connecting) return (
    <button className="w-full rounded-xl bg-zinc-900 px-3 py-2 text-xs text-zinc-400 animate-pulse">
      Connecting...
    </button>
  );
  if (connected) return (
    <button onClick={disconnect} className="w-full rounded-xl bg-red-950/40 border border-red-900/40 px-3 py-2 text-xs text-red-300">
      Disconnect
    </button>
  );
  return (
    <button onClick={connect} className="w-full rounded-xl bg-violet-600 px-3 py-2 text-xs font-medium text-white">
      Connect Wallet
    </button>
  );
}

export function ShadowPayApp() {
  const [showLanding, setShowLanding] = useState(true);
  const [role, setRole] = useState<Role | null>(null);
  const [page, setPage] = useState<Page>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isReady, isInitializing, error } = useMiden();
  const { address } = useMidenFiWallet();

  useEffect(() => {
    const saved = roleStore.get();
    if (saved) {
      if (saved === "employer" && !employerAuth.isAuthenticated()) {
        roleStore.clear();
        return;
      }
      setRole(saved);
      setShowLanding(false);
    }
  }, []);

  const handleRoleSelect = (r: Role) => {
    roleStore.set(r);
    setRole(r);
    setPage("dashboard");
    setShowLanding(false);
  };

  const handleRoleChange = () => {
    employerAuth.logout();
    roleStore.clear();
    setRole(null);
    setPage("dashboard");
    setMenuOpen(false);
    setShowLanding(true);
  };

  const handleLandingEnter = (r: Role) => {
    if (r === "employee") {
      roleStore.set("employee");
      setRole("employee");
      setPage("dashboard");
      setShowLanding(false);
    } else {
      // employer → PIN screen
      setShowLanding(false);
    }
  };

  if (error) return (
    <div className="flex min-h-screen items-center justify-center bg-black text-white">
      <div className="text-center">
        <p className="text-red-400">System Error</p>
        <p className="text-zinc-500 text-sm">{error.message}</p>
      </div>
    </div>
  );

  if (isInitializing || !isReady) return (
    <div className="min-h-screen bg-[#0a0a0c] flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mx-auto">
          <span className="text-white font-bold">S</span>
        </div>
        <div>
          <p className="text-white font-semibold text-sm">ShadowPay</p>
          <p className="text-zinc-500 text-xs mt-1">Connecting to Miden Testnet...</p>
        </div>
        <div className="flex items-center justify-center gap-1">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
          <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );

  if (showLanding) return <LandingPage onEnter={handleLandingEnter} />;

  if (!role) return <RoleSelect onSelect={handleRoleSelect} />;

  const navLinks = role === "employer" ? employerNav : employeeNav;

  return (
    <div className="flex min-h-screen w-full bg-black text-white overflow-hidden">

      {/* BACKDROP */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 z-40 bg-black/70 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-64 flex-col border-r border-zinc-900 bg-zinc-950">
        <div className="p-5 border-b border-zinc-900">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-violet-600 flex items-center justify-center">
              <span className="text-white text-xs font-bold">S</span>
            </div>
            <div>
              <h1 className="font-bold text-sm text-white">ShadowPay</h1>
              <p className="text-[10px] text-zinc-500">Miden Testnet</p>
            </div>
          </div>
        </div>

        {/* ROLE BADGE */}
        <div className="px-4 py-3 border-b border-zinc-900">
          <div className={`flex items-center justify-between px-3 py-2 rounded-xl border ${
            role === "employer"
              ? "bg-violet-600/10 border-violet-600/20"
              : "bg-green-600/10 border-green-600/20"
          }`}>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full ${role === "employer" ? "bg-violet-400" : "bg-green-400"}`}></div>
              <span className={`text-xs font-medium ${role === "employer" ? "text-violet-300" : "text-green-300"}`}>
                {role === "employer" ? "Employer" : "Employee"}
              </span>
            </div>
            <button onClick={handleRoleChange} className="text-[10px] text-zinc-600 hover:text-zinc-400 transition">
              {role === "employer" ? "Logout" : "Switch"}
            </button>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                page === l.id
                  ? role === "employer"
                    ? "bg-violet-500/10 text-violet-300"
                    : "bg-green-500/10 text-green-300"
                  : "text-zinc-500 hover:bg-zinc-900"
              }`}
            >
              <span>{l.icon}</span>
              {l.label}
            </button>
          ))}
        </nav>

        <div className="p-3 border-t border-zinc-900 space-y-2">
          <WalletButton />
          {address && (
            <p className="text-[10px] text-zinc-600 truncate">{address}</p>
          )}
        </div>
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="fixed top-0 left-0 right-0 z-30 md:hidden flex justify-between items-center px-4 py-3 bg-black border-b border-zinc-900">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center">
            <span className="text-white text-[10px] font-bold">S</span>
          </div>
          <span className="font-bold text-sm">ShadowPay</span>
          <span className={`text-[10px] px-1.5 py-0.5 rounded-full border ${
            role === "employer"
              ? "bg-violet-600/10 border-violet-600/20 text-violet-400"
              : "bg-green-600/10 border-green-600/20 text-green-400"
          }`}>
            {role === "employer" ? "Employer" : "Employee"}
          </span>
        </div>
        <button onClick={() => setMenuOpen(!menuOpen)} className="px-3 py-1 rounded bg-zinc-900 text-xs">
          ☰
        </button>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="fixed left-0 top-0 z-50 h-full w-72 bg-zinc-950 p-4 md:hidden"
          >
            <div className="mb-4 pb-4 border-b border-zinc-900 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-violet-600 flex items-center justify-center">
                <span className="text-white text-xs font-bold">S</span>
              </div>
              <div>
                <h1 className="font-bold text-sm">ShadowPay</h1>
                <p className="text-[10px] text-zinc-500">Miden Testnet</p>
              </div>
            </div>

            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => { setPage(l.id); setMenuOpen(false); }}
                className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-sm mb-1 ${
                  page === l.id
                    ? role === "employer" ? "bg-violet-500/10 text-violet-300" : "bg-green-500/10 text-green-300"
                    : "text-zinc-400 hover:bg-zinc-900"
                }`}
              >
                <span>{l.icon}</span>
                {l.label}
              </button>
            ))}

            <div className="mt-4 space-y-2 border-t border-zinc-900 pt-4">
              <WalletButton />
              <button
                onClick={handleRoleChange}
                className="w-full text-xs text-zinc-600 hover:text-zinc-400 py-2 transition"
              >
                {role === "employer" ? "Logout" : "Switch Role"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MAIN CONTENT */}
      <main className="flex-1 w-full min-w-0 md:w-[calc(100%-16rem)] pt-14 md:pt-6 pb-24 overflow-y-auto px-4 md:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={page}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {page === "dashboard" && <Dashboard role={role} />}
            {page === "treasury" && role === "employer" && <Treasury />}
            {page === "employees" && role === "employer" && <Employees />}
            {page === "payroll" && role === "employer" && <Payroll />}
            {page === "claim" && <Claim role={role} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* MOBILE BOTTOM NAV */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden border-t border-zinc-900 bg-black pb-[env(safe-area-inset-bottom)]">
        <div className="grid text-[10px]" style={{ gridTemplateColumns: `repeat(${navLinks.length}, 1fr)` }}>
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => setPage(l.id)}
              className={`py-2 flex flex-col items-center ${
                page === l.id
                  ? role === "employer" ? "text-violet-400" : "text-green-400"
                  : "text-zinc-500"
              }`}
            >
              <span className="text-base">{l.icon}</span>
              {l.label}
            </button>
          ))}
        </div>
      </div>

    </div>
  );
}