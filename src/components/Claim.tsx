import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import type { DBType } from "@/lib/db";

export function Claim() {
  const [data, setData] = useState<DBType | null>(null);

  useEffect(() => {
    setData(blockchain.getState());
    return eventBus.subscribe(() => setData(blockchain.getState()));
  }, []);

  if (!data) return <div className="p-6 text-zinc-400">Loading...</div>;

  const getName = (id: string) => data.employees.find((e) => e.id === id)?.name ?? id.slice(0, 8);
  const approved = data.payrolls.filter((p) => p.status === "approved");
  const claimed = [...new Map(data.payrolls.filter((p) => p.status === "claimed").map((p) => [p.id, p])).values()];

  return (
    <div className="p-6 md:p-10 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Claim Salary</h1>
        <p className="text-zinc-500 text-sm mt-1">Proof-verified payroll claims</p>
      </div>

      {approved.length === 0 ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 text-zinc-500 text-sm">No approved payrolls to claim</div>
      ) : approved.map((p) => (
        <div key={p.id} className="bg-zinc-900 p-4 rounded-xl border border-zinc-800 flex justify-between items-center">
          <div>
            <p className="font-semibold text-sm">{getName(p.employeeId)}</p>
            <p className="text-zinc-400 text-xs">{p.amount.toLocaleString()}</p>
            {p.proof && <p className="text-xs text-zinc-600 mt-1">🔐 {p.proof.hash.slice(0, 16)}...</p>}
          </div>
          <button
            onClick={() => { const ok = blockchain.claimPayroll(p.id); if (!ok) alert("Claim failed"); }}
            className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-500"
          >Claim</button>
        </div>
      ))}

      <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800">
        <h3 className="font-semibold text-sm mb-3">Claim History</h3>
        {claimed.length === 0 ? (
          <p className="text-zinc-500 text-sm">No claims yet</p>
        ) : claimed.map((p) => (
          <div key={p.id} className="text-xs text-zinc-400 py-1 border-b border-zinc-800 flex justify-between">
            <span>✅ {getName(p.employeeId)}</span>
            <span>{p.amount.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </div>
  );
}