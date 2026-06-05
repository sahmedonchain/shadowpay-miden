import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import type { DBType } from "@/lib/db";
import { useMidenFiWallet } from "@miden-sdk/miden-wallet-adapter-react";

export function Dashboard() {
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
  const health = data.treasury > 50000 ? "🟢 Healthy" : data.treasury > 10000 ? "🟡 Medium" : "🔴 Low";
  const transactions = Array.isArray(data.transactions) ? data.transactions : [];

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">Private payroll & treasury on Miden</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-wrap gap-4 text-sm">
        <span className="text-zinc-400">Miden Testnet</span>
        <span className="text-green-400">● Connected</span>
        {connected && address ? (
          <span className="text-zinc-500 truncate">Wallet: {address.slice(0, 16)}...</span>
        ) : (
          <span className="text-yellow-400">⚠ Connect wallet to transact</span>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs">Treasury</p>
          <h2 className="text-xl font-bold mt-1">{data.treasury.toLocaleString()}</h2>
          <p className="text-xs mt-1">{health}</p>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs">Employees</p>
          <h2 className="text-xl font-bold mt-1">{data.employees.length}</h2>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs">Total Paid</p>
          <h2 className="text-xl font-bold mt-1">{totalPaid.toLocaleString()}</h2>
        </div>
        <div className="bg-zinc-900 p-4 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs">Pending</p>
          <h2 className="text-xl font-bold mt-1">{pending}</h2>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-center">
          <p className="text-zinc-400 text-xs">Pending</p>
          <p className="text-lg font-bold text-yellow-400">{pending}</p>
        </div>
        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-center">
          <p className="text-zinc-400 text-xs">Approved</p>
          <p className="text-lg font-bold text-blue-400">{approved}</p>
        </div>
        <div className="bg-zinc-900 p-3 rounded-xl border border-zinc-800 text-center">
          <p className="text-zinc-400 text-xs">Claimed</p>
          <p className="text-lg font-bold text-green-400">{claimed}</p>
        </div>
      </div>

      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
        <h3 className="font-semibold mb-3 text-sm">Transaction Log</h3>
        {transactions.length === 0 ? (
          <p className="text-zinc-500 text-sm">No transactions yet</p>
        ) : (
          <div className="space-y-2">
            {[...transactions].reverse().slice(0, 8).map((t) => (
              <div key={t.id} className="flex justify-between text-xs gap-2">
                <span className={`font-medium shrink-0 ${t.type === "DEDUCT" ? "text-red-400" : "text-green-400"}`}>
                  {t.type === "DEDUCT" ? "−" : "+"}{t.amount}
                </span>
                <span className="text-zinc-400 truncate">{t.reason}</span>
                <span className="text-zinc-600 shrink-0">{new Date(t.timestamp).toLocaleTimeString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}