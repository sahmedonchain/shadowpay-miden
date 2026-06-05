import { useEffect, useState } from "react";
import { blockchain } from "@/lib/blockchain";
import { eventBus } from "@/lib/event";
import type { DBType } from "@/lib/db";

export function Employees() {
  const [data, setData] = useState<DBType | null>(null);
  const [name, setName] = useState("");
  const [salary, setSalary] = useState("");

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

  const handleAdd = () => {
    const s = Number(salary);

    if (!name.trim() || !s || s <= 0) {
      alert("Name and valid salary required");
      return;
    }

    blockchain.addEmployee(name.trim(), s);

    setName("");
    setSalary("");
  };

  return (
    <div className="mx-auto w-full max-w-6xl p-4 sm:p-6 lg:p-8 space-y-5">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Employees
        </h1>

        <p className="mt-1 text-sm text-zinc-500">
          Manage your team members
        </p>
      </div>

      {/* ADD EMPLOYEE */}
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5">
        <h3 className="mb-4 text-sm font-semibold text-white">
          Add New Employee
        </h3>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleAdd()
            }
            placeholder="Employee Name"
            className="rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-violet-500"
          />

          <input
            type="number"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && handleAdd()
            }
            placeholder="Monthly Salary"
            className="rounded-lg border border-zinc-700/50 bg-zinc-800/50 px-3 py-3 text-sm text-white placeholder-zinc-600 outline-none transition focus:border-violet-500"
          />

          <button
            onClick={handleAdd}
            className="rounded-lg bg-violet-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            Add Employee
          </button>
        </div>
      </div>

      {/* EMPLOYEE COUNT */}
      <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4">
        <p className="text-sm text-zinc-500">
          Total Employees
        </p>

        <p className="mt-1 text-3xl font-bold text-white">
          {data.employees.length}
        </p>
      </div>

      {/* EMPLOYEE LIST */}
      <div className="space-y-3">
        {data.employees.length === 0 ? (
          <div className="rounded-xl border border-zinc-800/30 bg-zinc-900/30 p-10 text-center">
            <p className="text-sm text-zinc-500">
              No employees found
            </p>

            <p className="mt-1 text-xs text-zinc-700">
              Add your first employee above
            </p>
          </div>
        ) : (
          data.employees.map((emp) => (
            <div
              key={emp.id}
              className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-4"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-violet-600/30 bg-violet-600/20">
                    <span className="text-sm font-bold text-violet-400">
                      {emp.name.charAt(0).toUpperCase()}
                    </span>
                  </div>

                  <div className="min-w-0">
                    <p className="truncate font-medium text-white">
                      {emp.name}
                    </p>

                    <p className="text-sm text-zinc-500">
                      {emp.salary.toLocaleString()} / month
                    </p>
                  </div>
                </div>

                <button
                  onClick={() =>
                    blockchain.deleteEmployee(emp.id)
                  }
                  className="w-full rounded-lg bg-red-950/40 px-4 py-2 text-sm text-red-400 transition hover:bg-red-900/40 sm:w-auto"
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}