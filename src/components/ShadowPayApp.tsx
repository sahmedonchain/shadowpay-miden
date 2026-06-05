import { useState } from "react";
import { useMiden } from "@miden-sdk/react";
import { useMidenFiWallet } from "@miden-sdk/miden-wallet-adapter-react";
import { WalletReadyState } from "@miden-sdk/miden-wallet-adapter-base";
import { Dashboard } from "./Dashboard";
import { Employees } from "./Employees";
import { Payroll } from "./Payroll";
import { Claim } from "./Claim";
import { Treasury } from "./Treasury";

type Page = "dashboard" | "employees" | "payroll" | "claim" | "treasury";

function WalletButton() {
  const { wallet, connected, connecting, connect, disconnect } = useMidenFiWallet();
  const readyState = wallet?.readyState;
  const walletReady =
    readyState === WalletReadyState.Installed ||
    readyState === WalletReadyState.Loadable;

  if (!walletReady) return (
    <button className="bg-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm" disabled>
      Install Miden Wallet
    </button>
  );
  if (connected) return (
    <button onClick={disconnect} className="bg-red-900 text-red-300 px-4 py-2 rounded-lg text-sm hover:bg-red-800">
      Disconnect
    </button>
  );
  if (connecting) return (
    <button disabled className="bg-zinc-700 text-zinc-400 px-4 py-2 rounded-lg text-sm">
      Connecting...
    </button>
  );
  return (
    <button onClick={connect} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200">
      Connect Miden Wallet
    </button>
  );
}

export function ShadowPayApp() {
  const [page, setPage] = useState<Page>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const { isReady, isInitializing, error } = useMiden();
  const { connected, address } = useMidenFiWallet();

  const navLinks: { id: Page; label: string }[] = [
    { id: "dashboard", label: "Dashboard" },
    { id: "treasury", label: "Treasury" },
    { id: "employees", label: "Employees" },
    { id: "payroll", label: "Payroll" },
    { id: "claim", label: "Claim" },
  ];

  if (error) return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-400 text-lg">Failed to initialize Miden client</p>
        <p className="text-zinc-500 text-sm mt-2">{error.message}</p>
      </div>
    </div>
  );

  if (isInitializing || !isReady) return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-zinc-400">Initializing Miden client...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex">

      {/* DESKTOP SIDEBAR */}
      <aside className="hidden md:flex w-60 bg-zinc-900 border-r border-zinc-800 flex-col p-6 fixed h-full">
        <h1 className="text-xl font-bold mb-1">ShadowPay</h1>
        <p className="text-xs text-zinc-500 mb-6">on Miden Testnet</p>

        <nav className="space-y-1 flex-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm transition ${
                page === link.id
                  ? "bg-white text-black font-medium"
                  : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="mt-4 space-y-2">
          {connected && address && (
            <p className="text-xs text-zinc-500 truncate">
              🟢 {address.slice(0, 20)}...
            </p>
          )}
          <WalletButton />
        </div>
      </aside>

      {/* MOBILE TOPBAR */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50 bg-zinc-900 border-b border-zinc-800 px-4 py-3 flex justify-between items-center">
        <h1 className="text-lg font-bold">ShadowPay</h1>
        <div className="flex items-center gap-2">
          <WalletButton />
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-zinc-300 text-xl ml-2">
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="md:hidden fixed top-14 left-0 right-0 z-40 bg-zinc-900 border-b border-zinc-800 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => { setPage(link.id); setMenuOpen(false); }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm ${
                page === link.id ? "bg-white text-black font-medium" : "text-zinc-400"
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* MAIN */}
      <main className="flex-1 md:ml-60 pt-16 md:pt-0 min-h-screen">
        {page === "dashboard" && <Dashboard />}
        {page === "treasury" && <Treasury />}
        {page === "employees" && <Employees />}
        {page === "payroll" && <Payroll />}
        {page === "claim" && <Claim />}
      </main>
    </div>
  );
}