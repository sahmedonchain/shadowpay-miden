import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import type { DBType } from "@/lib/db";
import type { Role } from "@/lib/role";
import { useMidenFiWallet } from "@miden-sdk/miden-wallet-adapter-react";

export function Claim({ role }: { role: Role }) {
  const [data, setData] = useState<DBType | null>(null);
  const { address } = useMidenFiWallet();

  useEffect(() => {
    setData(blockchain.getState());
    return eventBus.subscribe(() => setData(blockchain.getState()));
  }, []);

  if (!data) return (
    <div className="flex h-64 items-center justify-center">
      <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"></div>
    </div>
  );

  const getName = (id: string) =>
    data.employees.find((e) => e.id === id)?.name ?? id.slice(0, 8);

  const approved = data.payrolls.filter((p) => p.status === "approved");
  const claimed = [...new Map(
    data.payrolls.filter((p) => p.status === "claimed").map((p) => [p.id, p])
  ).values()];

  const handleClaim = (payrollId: string) => {
    const result = blockchain.claimPayroll(payrollId, address ?? undefined);
    if (result === "wallet_mismatch") {
      alert("❌ Wallet mismatch. This payroll is assigned to a different wallet address.");
      return;
    }
    if (!result) {
      alert("Claim failed. Please try again.");
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl space-y-5">

      {/* HEADER */}
      <div>
        <h1 className="text-xl md:text-2xl font-bold text-white">Claim Salary</h1>
        <p className="mt-1 text-sm text-zinc-500">Proof-verified payroll claims</p>
      </div>

      {/* EMPLOYEE BANNER */}
      {role === "employee" && (
        <div className="bg-green-600/10 border border-green-600/20 rounded-xl p-4">
          <p className="text-green-300 text-sm font-medium">Employee Claim Portal</p>
          <p className="text-zinc-500 text-xs mt-0.5">
            Your approved salary payments are ready to claim. Each claim is proof-verified on Miden.
          </p>
          {address && (
            <p className="text-zinc-600 text-[10px] font-mono mt-2 truncate">
              Connected: {address}
            </p>
          )}
          {!address && (
            <p className="text-yellow-500 text-xs mt-2">
              ⚠ Connect your Miden Wallet to claim salary
            </p>
          )}
        </div>
      )}

      {/* APPROVED LIST */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">Ready to Claim</h3>
        {approved.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/30 bg-zinc-900/30 p-10 text-center">
            <p className="text-sm text-zinc-500">No approved payrolls</p>
            <p className="mt-1 text-xs text-zinc-700">
              {role === "employee"
                ? "Your employer needs to approve a payroll first"
                : "Approve payrolls from the Payroll page"}
            </p>
          </div>
        ) : (
          approved.map((p) => {
            const emp = data.employees.find((e) => e.id === p.employeeId);
            const isMyPayroll = !emp?.walletAddress || !address ||
              emp.walletAddress.toLowerCase() === address.toLowerCase();

            return (
              <div key={p.id} className="flex flex-col gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border ${
                    isMyPayroll
                      ? "border-green-800/30 bg-green-950/50"
                      : "border-zinc-700/30 bg-zinc-800/50"
                  }`}>
                    <span className={`text-sm font-bold ${isMyPayroll ? "text-green-400" : "text-zinc-500"}`}>
                      {getName(p.employeeId).charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">{getName(p.employeeId)}</p>
                    <p className="text-sm text-zinc-500">{p.amount.toLocaleString()}</p>
                    {emp?.walletAddress && (
                      <p className="text-[10px] text-zinc-700 font-mono truncate mt-0.5">
                        → {emp.walletAddress.slice(0, 20)}...
                      </p>
                    )}
                    {p.proof && (
                      <p className="mt-0.5 font-mono text-[10px] text-zinc-700 truncate">
                        🔐 {p.proof.hash.slice(0, 20)}...
                      </p>
                    )}
                    {!isMyPayroll && (
                      <p className="text-[10px] text-yellow-600 mt-0.5">
                        ⚠ Assigned to different wallet
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleClaim(p.id)}
                  disabled={!isMyPayroll}
                  className={`rounded-lg px-5 py-2 text-sm font-medium transition shrink-0 ${
                    isMyPayroll
                      ? "bg-green-600 hover:bg-green-500 text-white"
                      : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
                  }`}
                >
                  {isMyPayroll ? "Claim" : "Not yours"}
                </button>
              </div>
            );
          })
        )}
      </div>

      {/* HISTORY */}
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">Claim History</h3>
        {claimed.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-500">No claims yet</p>
        ) : (
          <div className="space-y-2">
            {claimed.map((p) => (
              <div key={p.id} className="flex items-center justify-between border-b border-zinc-800/50 py-2.5 last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-sm">✓</span>
                  <span className="text-sm text-zinc-400">{getName(p.employeeId)}</span>
                </div>
                <span className="font-medium text-green-400 text-sm">{p.amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}