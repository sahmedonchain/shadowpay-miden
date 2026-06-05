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

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  const txs = Array.isArray(data.transactions)
    ? data.transactions
    : [];

  const totalOut = txs
    .filter((t) => t.type === "DEDUCT")
    .reduce((s, t) => s + t.amount, 0);

  const totalIn = txs
    .filter((t) => t.type === "ADD")
    .reduce((s, t) => s + t.amount, 0);

  return (
    <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8 space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Treasury
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Fund management & audit trail
        </p>
      </div>

      {/* BALANCE CARDS */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
          <p className="text-xs text-zinc-500">
            Current Balance
          </p>

          <p className="text-2xl font-bold text-white">
            {data.treasury.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
          <p className="text-xs text-zinc-500">
            Total Paid Out
          </p>

          <p className="text-2xl font-bold text-red-400">
            {totalOut.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
          <p className="text-xs text-zinc-500">
            Total Added
          </p>

          <p className="text-2xl font-bold text-green-400">
            {totalIn.toLocaleString()}
          </p>
        </div>
      </div>

      {/* FUND TREASURY */}
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Fund Treasury
        </h3>

        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            type="number"
            className="flex-1 rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-3 text-sm text-white outline-none transition focus:border-violet-500"
          />

          <button
            onClick={() => {
              const a = Number(amount);

              if (!a || a <= 0) {
                alert("Enter valid amount");
                return;
              }

              blockchain.fundTreasury(a);
              setAmount("");
            }}
            className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Add Funds
          </button>
        </div>
      </div>

      {/* AUDIT LOG */}
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Audit Log
        </h3>

        {txs.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-500">
            No transactions yet
          </p>
        ) : (
          <div className="space-y-2">
            {[...txs]
              .reverse()
              .map((t) => (
                <div
                  key={t.id}
                  className="flex flex-col gap-3 border-b border-zinc-800/50 py-3 sm:flex-row sm:items-center sm:justify-between"
                >
                  {/* LEFT */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs ${
                        t.type === "DEDUCT"
                          ? "bg-red-950 text-red-400"
                          : "bg-green-950 text-green-400"
                      }`}
                    >
                      {t.type === "DEDUCT"
                        ? "−"
                        : "+"}
                    </div>

                    <span className="truncate text-xs text-zinc-400">
                      {t.reason}
                    </span>
                  </div>

                  {/* RIGHT */}
                  <div className="text-left sm:text-right">
                    <p
                      className={`font-medium ${
                        t.type === "DEDUCT"
                          ? "text-red-400"
                          : "text-green-400"
                      }`}
                    >
                      {t.type === "DEDUCT"
                        ? "−"
                        : "+"}
                      {t.amount.toLocaleString()}
                    </p>

                    <p className="text-[10px] text-zinc-600">
                      {new Date(
                        t.timestamp
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}