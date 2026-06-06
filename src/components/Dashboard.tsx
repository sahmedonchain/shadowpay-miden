import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import type { DBType } from "@/lib/db";
import type { Role } from "@/lib/role";
import { useMidenFiWallet } from "@miden-sdk/miden-wallet-adapter-react";

export function Dashboard({ role }: { role: Role }) {
  const [data, setData] = useState<DBType | null>(null);
  const { connected, address } = useMidenFiWallet();

  useEffect(() => {
    setData(blockchain.getState());
    return eventBus.subscribe(() => setData(blockchain.getState()));
  }, []);

  if (!data) return <div className="p-6 text-zinc-400">Loading...</div>;

  const pending = data.payrolls.filter((p) => p.status === "pending").length;
  const approved = data.payrolls.filter((p) => p.status === "approved").length;
  const claimed = data.payrolls.filter((p) => p.status === "claimed").length;
  const totalPaid = data.payrolls.filter((p) => p.status === "claimed").reduce((s, p) => s + p.amount, 0);
  const transactions = Array.isArray(data.transactions) ? data.transactions : [];

  const healthColor = data.treasury > 50000 ? "text-green-400" : data.treasury > 10000 ? "text-yellow-400" : "text-red-400";
  const healthLabel = data.treasury > 50000 ? "Healthy" : data.treasury > 10000 ? "Medium" : "Low";
  const healthDot = data.treasury > 50000 ? "bg-green-400" : data.treasury > 10000 ? "bg-yellow-400" : "bg-red-400";

  return (
    <div className="space-y-5 max-w-4xl">

      {/* HEADER */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-zinc-500 text-sm mt-0.5">Private payroll & treasury on Miden</p>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border ${
          connected ? "bg-green-950/50 border-green-800/50 text-green-400" : "bg-yellow-950/50 border-yellow-800/50 text-yellow-400"
        }`}>
          <div className={`w-1.5 h-1.5 rounded-full ${connected ? "bg-green-400" : "bg-yellow-400"}`}></div>
          {connected ? "Testnet Connected" : "Wallet Not Connected"}
        </div>
      </div>

      {/* ROLE BANNER */}
      <div className={`rounded-xl border p-4 flex items-center gap-3 ${
        role === "employer" ? "bg-violet-600/10 border-violet-600/20" : "bg-green-600/10 border-green-600/20"
      }`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
          role === "employer" ? "bg-violet-600/20" : "bg-green-600/20"
        }`}>
          <span className={`text-sm ${role === "employer" ? "text-violet-400" : "text-green-400"}`}>
            {role === "employer" ? "◆" : "◉"}
          </span>
        </div>
        <div>
          <p className="text-sm font-medium text-white">
            {role === "employer" ? "Employer Dashboard" : "Employee Dashboard"}
          </p>
          <p className="text-xs text-zinc-500">
            {role === "employer"
              ? "Manage treasury, team, and payroll approvals"
              : "View your pending salary claims below"}
          </p>
        </div>
      </div>

      {/* WALLET INFO */}
      {connected && address && (
        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-3 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-violet-600/20 border border-violet-600/30 flex items-center justify-center shrink-0">
            <span className="text-violet-400 text-xs">M</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs text-zinc-400">Connected Wallet</p>
            <p className="text-xs text-zinc-300 font-mono truncate">{address}</p>
          </div>
        </div>
      )}

      {/* STATS */}
      {role === "employer" ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">Treasury</p>
            <p className="text-xl font-bold text-white">{data.treasury.toLocaleString()}</p>
            <div className="flex items-center gap-1.5 mt-1.5">
              <div className={`w-1.5 h-1.5 rounded-full ${healthDot}`}></div>
              <span className={`text-xs ${healthColor}`}>{healthLabel}</span>
            </div>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">Employees</p>
            <p className="text-xl font-bold text-white">{data.employees.length}</p>
            <p className="text-xs text-zinc-600 mt-1.5">team members</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">Total Paid</p>
            <p className="text-xl font-bold text-white">{totalPaid.toLocaleString()}</p>
            <p className="text-xs text-zinc-600 mt-1.5">lifetime</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">Pending</p>
            <p className="text-xl font-bold text-yellow-400">{pending}</p>
            <p className="text-xs text-zinc-600 mt-1.5">awaiting approval</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">Ready to Claim</p>
            <p className="text-xl font-bold text-green-400">{approved}</p>
            <p className="text-xs text-zinc-600 mt-1.5">approved payments</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4">
            <p className="text-zinc-500 text-xs mb-1">Total Received</p>
            <p className="text-xl font-bold text-white">{totalPaid.toLocaleString()}</p>
            <p className="text-xs text-zinc-600 mt-1.5">claimed</p>
          </div>
        </div>
      )}

      {/* PAYROLL STATUS (employer only) */}
      {role === "employer" && (
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 text-center">
            <p className="text-zinc-500 text-xs mb-2">Pending</p>
            <p className="text-2xl font-bold text-yellow-400">{pending}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 text-center">
            <p className="text-zinc-500 text-xs mb-2">Approved</p>
            <p className="text-2xl font-bold text-blue-400">{approved}</p>
          </div>
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-4 text-center">
            <p className="text-zinc-500 text-xs mb-2">Claimed</p>
            <p className="text-2xl font-bold text-green-400">{claimed}</p>
          </div>
        </div>
      )}

      {/* TRANSACTION LOG */}
      <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">
          {role === "employer" ? "Recent Transactions" : "Payment History"}
        </h3>
        {transactions.length === 0 ? (
          <div className="text-center py-6">
            <p className="text-zinc-600 text-sm">No transactions yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {[...transactions].reverse().slice(0, 8).map((t) => (
              <div key={t.id} className="flex items-center justify-between py-2 border-b border-zinc-800/50 last:border-0 gap-3">
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 ${
                    t.type === "DEDUCT" ? "bg-red-950 text-red-400" : "bg-green-950 text-green-400"
                  }`}>
                    {t.type === "DEDUCT" ? "−" : "+"}
                  </div>
                  <span className="text-zinc-400 text-xs truncate max-w-[140px] md:max-w-xs">{t.reason}</span>
                </div>
                <div className="text-right shrink-0 ml-2">
                  <p className={`text-sm font-medium ${t.type === "DEDUCT" ? "text-red-400" : "text-green-400"}`}>
                    {t.type === "DEDUCT" ? "−" : "+"}{t.amount.toLocaleString()}
                  </p>
                  <p className="text-zinc-600 text-[10px]">{new Date(t.timestamp).toLocaleTimeString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}