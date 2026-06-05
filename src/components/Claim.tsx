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

  if (!data) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-violet-500 border-t-transparent"></div>
      </div>
    );
  }

  const getName = (id: string) =>
    data.employees.find((e) => e.id === id)?.name ??
    id.slice(0, 8);

  const approved = data.payrolls.filter(
    (p) => p.status === "approved"
  );

  const claimed = [
    ...new Map(
      data.payrolls
        .filter((p) => p.status === "claimed")
        .map((p) => [p.id, p])
    ).values(),
  ];

  return (
    <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8 space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Claim Salary
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Proof-verified payroll claims
        </p>
      </div>

      {/* APPROVED LIST */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">
          Ready to Claim
        </h3>

        {approved.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/30 bg-zinc-900/30 p-10 text-center">
            <p className="text-sm text-zinc-500">
              No approved payrolls
            </p>

            <p className="mt-1 text-xs text-zinc-700">
              Waiting for approval
            </p>
          </div>
        ) : (
          approved.map((p) => (
            <div
              key={p.id}
              className="flex flex-col gap-4 rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              {/* LEFT */}
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-green-800/30 bg-green-950/50">
                  <span className="text-sm font-bold text-green-400">
                    {getName(
                      p.employeeId
                    )
                      .charAt(0)
                      .toUpperCase()}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="truncate font-medium text-white">
                    {getName(p.employeeId)}
                  </p>

                  <p className="text-sm text-zinc-500">
                    {p.amount.toLocaleString()}
                  </p>

                  {p.proof && (
                    <p className="mt-1 break-all font-mono text-[10px] text-zinc-700">
                      🔐 {p.proof.hash}
                    </p>
                  )}
                </div>
              </div>

              {/* RIGHT */}
              <button
                onClick={() => {
                  const ok =
                    blockchain.claimPayroll(p.id);

                  if (!ok) {
                    alert("Claim failed");
                  }
                }}
                className="rounded-lg bg-green-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-green-500"
              >
                Claim
              </button>
            </div>
          ))
        )}
      </div>

      {/* HISTORY */}
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Claim History
        </h3>

        {claimed.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-500">
            No claims yet
          </p>
        ) : (
          <div className="space-y-2">
            {claimed.map((p) => (
              <div
                key={p.id}
                className="flex flex-col gap-2 border-b border-zinc-800/50 py-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-2">
                  <span className="text-green-400">
                    ✓
                  </span>

                  <span className="text-sm text-zinc-400">
                    {getName(p.employeeId)}
                  </span>
                </div>

                <span className="font-medium text-green-400">
                  {p.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}