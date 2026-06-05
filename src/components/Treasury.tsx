import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import type { DBType } from "@/lib/db";

export function Treasury() {
  const [data, setData] = useState<DBType | null>(null);
  const [amount, setAmount] = useState("");

  useEffect(() => {
    setData(blockchain.getState());
    return eventBus.subscribe(() => setData(blockchain.getState()));
  }, []);

  if (!data) return <div className="p-6 text-zinc-400">Loading...</div>;

  const txs = Array.isArray(data.transactions) ? data.transactions : [];
  const totalOut = txs.filter((t) => t.type === "DEDUCT").reduce((s, t) => s + t.amount, 0);
  const totalIn = txs.filter((t) => t.type === "ADD").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Treasury</h1>
        <p className="text-zinc-500 text-sm mt-1">Fund management & audit trail</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs">Balance</p>
          <h2 className="text-2xl font-bold mt-1">{data.treasury.toLocaleString()}</h2>
        </div>
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs">Total Paid Out</p>
          <h2 className="text-2xl font-bold text-red-400 mt-1">{totalOut.toLocaleString()}</h2>
        </div>
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
          <p className="text-zinc-400 text-xs">Total Added</p>
          <h2 className="text-2xl font-bold text-green-400 mt-1">{totalIn.toLocaleString()}</h2>
        </div>
      </div>

      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 space-y-3">
        <h3 className="font-semibold text-sm">Fund Treasury</h3>
        <input
          className="w-full p-2 bg-zinc-800 rounded border border-zinc-700 text-white text-sm"
          placeholder="Amount" type="number" value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={() => { const a = Number(amount); if (!a || a <= 0) return alert("Enter valid amount"); blockchain.fundTreasury(a); setAmount(""); }}
          className="bg-white text-black px-5 py-2 rounded text-sm font-medium hover:bg-zinc-200"
        >Add Funds</button>
      </div>

      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
        <h3 className="font-semibold text-sm mb-3">Audit Log</h3>
        {txs.length === 0 ? (
          <p className="text-zinc-500 text-sm">No transactions</p>
        ) : [...txs].reverse().map((t) => (
          <div key={t.id} className="flex justify-between text-xs py-2 border-b border-zinc-800 gap-2">
            <span className={`font-medium shrink-0 ${t.type === "DEDUCT" ? "text-red-400" : "text-green-400"}`}>
              {t.type === "DEDUCT" ? "−" : "+"}{t.amount.toLocaleString()}
            </span>
            <span className="text-zinc-400 truncate">{t.reason}</span>
            <span className="text-zinc-600 shrink-0">{new Date(t.timestamp).toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}