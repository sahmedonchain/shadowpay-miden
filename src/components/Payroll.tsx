import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import type { DBType } from "@/lib/db";

export function Payroll() {
  const [data, setData] = useState<DBType | null>(null);
  const [selectedEmp, setSelectedEmp] = useState("");

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

  const statusStyle = (status: string) => {
    if (status === "pending") {
      return "bg-yellow-950/50 text-yellow-400 border-yellow-800/50";
    }

    if (status === "approved") {
      return "bg-blue-950/50 text-blue-400 border-blue-800/50";
    }

    return "bg-green-950/50 text-green-400 border-green-800/50";
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8 space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Payroll Engine
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Create and manage payroll batches
        </p>
      </div>

      {/* CREATE PAYROLL */}
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Create Payroll
        </h3>

        {data.employees.length === 0 ? (
          <p className="text-sm text-zinc-500">
            Add employees before creating payroll
          </p>
        ) : (
          <div className="flex flex-col gap-3 md:flex-row">
            <select
              value={selectedEmp}
              onChange={(e) => setSelectedEmp(e.target.value)}
              className="flex-1 rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-3 text-sm text-white outline-none transition focus:border-violet-500"
            >
              <option value="">Select Employee</option>

              {data.employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.name} — {emp.salary.toLocaleString()}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                const emp = data.employees.find(
                  (e) => e.id === selectedEmp
                );

                if (!emp) {
                  alert("Select an employee");
                  return;
                }

                blockchain.createPayroll(
                  emp.id,
                  emp.salary
                );

                setSelectedEmp("");
              }}
              className="rounded-lg bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              Create Payroll
            </button>
          </div>
        )}
      </div>

      {/* PAYROLL LIST */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-white">
          Payroll List
        </h3>

        {data.payrolls.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/30 bg-zinc-900/30 p-10 text-center">
            <p className="text-sm text-zinc-500">
              No payrolls yet
            </p>
          </div>
        ) : (
          [...new Map(
            data.payrolls.map((p) => [p.id, p])
          ).values()]
            .reverse()
            .map((p) => (
              <div
                key={p.id}
                className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  {/* LEFT */}
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-800">
                      <span className="text-sm font-bold text-zinc-400">
                        {getName(
                          p.employeeId
                        ).charAt(0).toUpperCase()}
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
                          🔐 {p.proof.proofId}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* RIGHT */}
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-3 py-1 text-xs font-medium ${statusStyle(
                        p.status
                      )}`}
                    >
                      {p.status}
                    </span>

                    {p.status === "pending" && (
                      <button
                        onClick={() => {
                          const ok =
                            blockchain.approvePayroll(
                              p.id
                            );

                          if (!ok) {
                            alert(
                              "Insufficient treasury"
                            );
                          }
                        }}
                        className="rounded-lg bg-blue-600 px-3 py-2 text-xs text-white transition hover:bg-blue-500"
                      >
                        Approve
                      </button>
                    )}

                    {p.status !== "claimed" && (
                      <button
                        onClick={() =>
                          blockchain.deletePayroll(
                            p.id
                          )
                        }
                        className="rounded-lg bg-red-950/40 px-3 py-2 text-xs text-red-400 transition hover:bg-red-900/40"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
        )}
      </div>
    </div>
  );
}